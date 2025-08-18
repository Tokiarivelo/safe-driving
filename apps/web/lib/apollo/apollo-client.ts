import { useAuthStore } from '@/components/auth/stores/useAuthStore';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { getSession } from 'next-auth/react';

// 1. Le lien d’upload à la place de HttpLink
const uploadLink = createUploadLink({
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

// 3. On concatène : authLink BEFORE uploadLink
const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

export default client;
