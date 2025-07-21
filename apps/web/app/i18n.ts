'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import fr from '@/public/locales/fr/translation.json';
import en from '@/public/locales/en/translation.json';

const initializeI18n = () => {
  if (!i18next.isInitialized) {
    i18next.use(initReactI18next).init({
      resources: {
        fr: { translation: fr },
        en: { translation: en },
      },
      lng: 'fr',
      fallbackLng: 'fr',
      interpolation: {
        escapeValue: false,
      },
    });
  }
  return i18next;
};

export default initializeI18n();