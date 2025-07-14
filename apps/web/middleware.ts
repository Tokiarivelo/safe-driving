// export default NextAuth(authConfig).auth;

// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Récupère le JWT (key = NEXTAUTH_SECRET)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isOnDashboard = pathname.startsWith('/dashboard');

  if (isOnDashboard) {
    if (token) return NextResponse.next();
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Sinon, passe à la page demandée
  return NextResponse.next();
}

// Appliquer le middleware sur toutes les pages sauf publiques
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
