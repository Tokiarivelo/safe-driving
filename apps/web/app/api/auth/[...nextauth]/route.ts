import { LoginDocument, User } from '@/graphql/generated/graphql';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const { handlers } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // 1. Créez un client Apollo pointant vers votre backend NestJS
        const client = new ApolloClient({
          link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
            fetch,
          }),
          cache: new InMemoryCache(),
        });

        console.log(
          'process.env.NEXT_PUBLIC_GRAPHQL_API_URL :>> ',
          process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
        );

        try {
          const { email, password } = credentials;

          console.log('credentials :>> ', credentials);

          // 2. Appelez la mutation
          const { data } = await client.mutate<{
            login: { token: string; user: User };
          }>({
            mutation: LoginDocument,
            variables: {
              data: {
                email,
                password,
              },
            },
          });

          if (data?.login?.token && data.login.user) {
            // 3. Retournez un "user" enrichi de votre token
            return {
              id: data.login.user.id,
              email: data.login.user.email,
              firstName: data.login.user.firstName,
              lastName: data.login.user.lastName,
              avatar: data.login.user.avatar?.url,
              token: data.login.token,
            };
          }
          return null;
        } catch (err) {
          console.error('GraphQL login error:', err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // Injecte le token dans le JWT
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as User & { token?: string }).token;

        const u = user as User;
        token.user = {
          id: u.id,
          email: u.email,
          firstName: u.firstName,
          lastName: u.lastName || '',
          avatar: u.avatar?.url || '',
        };
      }
      return token;
    },

    // Expose token + user dans useSession()
    async session({ session, token }) {
      if (token.user) {
        session.user = { ...session.user, ...token.user };
      }
      session.accessToken = token.accessToken as string; // même nom
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/user/form/pickrole');

      if (isOnDashboard) {
        // Si page /dashboard/* et pas loggé → reject
        return isLoggedIn;
      }
      if (isLoggedIn && nextUrl.pathname === '/login') {
        // Si déjà loggé et arrive sur /login → renvoi /dashboard
        return Response.redirect(new URL('/user/form/pickrole', nextUrl));
      }
      // Dans tous les autres cas, laisse faire
      return true;
    },
  },
  pages: {
    signIn: '/login',
  },
});
export const { GET, POST } = handlers;
