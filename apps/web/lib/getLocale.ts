'use server';

import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';

const SUPPORTED_LOCALES = ['en-US', 'en', 'fr', 'es'];
const DEFAULT_LOCALE = 'fr';

function getLocale(request: NextRequest): string {
  // Vérifier si une locale est dans l'URL
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = SUPPORTED_LOCALES.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameLocale) return pathnameLocale;

  // Fallback vers Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? '';

  const negotiator = new Negotiator({ headers: { 'accept-language': acceptLang } });
  const userLanguages = negotiator.languages();
  const detectedLocale = match(userLanguages, SUPPORTED_LOCALES, DEFAULT_LOCALE);

  return detectedLocale;
}

export { getLocale, SUPPORTED_LOCALES as supportedLocales, DEFAULT_LOCALE as defaultLocale };
