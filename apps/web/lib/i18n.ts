import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const locales = ['en', 'fr'];
const defaultLocale = 'fr';

i18n
  .use(
    Backend((language: string, namespace: string) => {
      // Chargement dynamique des fichiers de traduction
      return import(`../public/locales/${language}/${namespace}.json`);
    }),
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: defaultLocale,
    supportedLngs: locales,

    detection: {
      order: ['path', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
export type Locale = (typeof locales)[number];
export { locales, defaultLocale };
