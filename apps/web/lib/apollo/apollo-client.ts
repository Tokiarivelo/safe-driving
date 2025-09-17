import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getSession } from 'next-auth/react';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// 1. Le lien d’upload à la place de HttpLink
const uploadLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  credentials: 'include',
});

// 2. Le lien d’authentification
const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  const token = session?.accessToken;
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// 3. Web drivers link pour les subscriptions (graphql-ws)
const wsClient = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL!,
    connectionParams: async () => {
      const session = await getSession();
      const token = session?.accessToken;
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    },
  }),
);
// Use ApolloLink.split to route subscription ops to wsLink, others to http (with auth)
const splitLink =
  typeof window !== 'undefined' && wsClient
    ? ApolloLink.split(
        operation => {
          const def = getMainDefinition(operation.query);
          return def.kind === 'OperationDefinition' && def.operation === 'subscription';
        },
        wsClient as unknown as ApolloLink,
        authLink.concat(uploadLink),
      )
    : authLink.concat(uploadLink);

// 4. On concatène : authLink BEFORE uploadLink
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
