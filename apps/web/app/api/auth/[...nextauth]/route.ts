import { LoginDocument } from '@/graphql/generated/graphql';
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

        try {
          const { email, password } = credentials;
          // 2. Appelez la mutation
          const { data } = await client.mutate<{
            login: { token: string; user: any };
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
              name: `${data.login.user.firstName} ${data.login.user.lastName}`,
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
        token.accessToken = (user as any).token;
        token.user = {
          id: (user as any).id,
          email: (user as any).email,
          name: (user as any).name,
          image: (user as any).image,
        };
      }
      return token;
    },

    // Expose token + user dans useSession()
    async session({ session, token }) {
      session.user = token.user as any;
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
