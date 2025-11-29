import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user?: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      avatar?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    user?: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      avatar?: string;
    };
  }
}
