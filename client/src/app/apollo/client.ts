import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';

const removeTypenameLink = removeTypenameFromVariables();

const link = from([removeTypenameLink,  new HttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND
})]);

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: link
  })
})

