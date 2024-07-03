"use client";
import { SessionProvider } from "next-auth/react";


const SessionProviders = (props: any) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default SessionProviders;