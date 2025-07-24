// app/middleware.ts
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

let headers = { 'accept-language': 'en-US,en;q=0.5' };

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ['en-US', 'en', 'fr', 'es'];
const DEFAULT_LOCALE = 'fr';

export const config = {
  // On capture toutes les requêtes et on filtre ensuite en code
  matcher: ['/:path*'],
};

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // 1. Skip API, Next.js internals & assets statiques
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // 2️⃣ Si la route est déjà préfixée par une locale connue, on continue
  const segments = pathname.split('/'); // [ '', 'fr', 'dashboard', ... ]

  const localeInPath = segments[1];

  if (!SUPPORTED_LOCALES.includes(localeInPath)) {
    const acceptLang = req.headers.get('accept-language') ?? '';

    const negotiator = new Negotiator({ headers: { 'accept-language': acceptLang } });
    const userLanguages = negotiator.languages();
    const detectedLocale = match(userLanguages, SUPPORTED_LOCALES, DEFAULT_LOCALE);

    const url = req.nextUrl.clone();
    url.pathname = `/${detectedLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // 3. Authentification pour la partie "dashboard"
  // Récupère le JWT (clé = NEXTAUTH_SECRET)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Reconstitue le chemin **sans** le préfixe locale
  // Ex : "/fr/dashboard/settings" → ["", "fr", "dashboard", "settings"] → "dashboard/settings"
  const afterLocale = segments.slice(2).join('/');

  if (afterLocale.startsWith('dashboard')) {
    if (token) {
      // user authentifié → accès autorisé
      return NextResponse.next();
    }
    // non authentifié → redirection vers la page de login locale
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = `/${localeInPath}/login`;
    return NextResponse.redirect(loginUrl);
  }

  // 4. Toutes les autres requêtes passent
  return NextResponse.next();
}
