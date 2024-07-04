import { AppDispatch, store } from './../../../redux/store';
const { default: NextAuth } = require("next-auth/next");
import GoogleProvider from "next-auth/providers/google";
import { getClient } from "@/app/apollo/client";
import { GET_USER } from "@/app/graphql/user";
import { addUser } from "@/app/redux/auth/auth.Thunk";
import { AddUserDto } from "@/app/types/user";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GG_CLIENT_ID
        ? process.env.NEXTAUTH_GG_CLIENT_ID
        : "",
      clientSecret: process.env.NEXTAUTH_GG_CLIENT_SECRET
        ? process.env.NEXTAUTH_GG_CLIENT_SECRET
        : "",
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn(user: any) {
      if (user.account.provider == "google") {
        const userDto : AddUserDto = {
          name: user.user.name,
          email: user.user.email,
          provider: "google",
        }

        await store.dispatch(addUser(userDto));

        return true;
      }
    },
    async jwt({ token, account }: any) {
      console.log("jwt token", token);
      console.log("jwt account ", account);

      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      console.log("session session", session);
      console.log("session token", token);
      console.log("session user", user);
      const client = getClient();
      const { data } = await client.query({
        query: GET_USER,
        variables: {
          email: token.email,
        },
      });
      console.log("session data", data.findUser._id);
      session.accessToken = token;
      if (data) {
        session.user._id = data.findUser._id;
        return session;
      }
    },
  },
});

export { handler as GET, handler as POST };
