'use client';

import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import { locales } from '@/lib/i18n';

const languages = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

interface LanguageSwitchProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function LanguageSwitch({ isOpen, onToggle }: LanguageSwitchProps) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (langCode: string) => {
    // Changer la langue via i18n
    i18n.changeLanguage(langCode);

    // Mettre à jour l'URL avec la nouvelle locale
    const segments = pathname.split('/');
    segments[1] = langCode;
    const newPath = segments.join('/');

    router.push(newPath);

    // Fermer le menu
    onToggle();
  };

  // Filtrer les langues disponibles selon les locales configurées
  const availableLanguages = languages.filter(lang => locales.includes(lang.code));

  // Langue actuelle basée sur i18n
  const currentLang = i18n.language || 'fr';
  const currentLanguage =
    availableLanguages.find(lang => lang.code === currentLang) || availableLanguages[0];

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 flex items-center space-x-2"
        aria-label="Change language"
      >
        <span className="text-sm">{currentLanguage?.flag}</span>
        <Icon
          icon="material-symbols:keyboard-arrow-down"
          className={`w-4 h-4 text-gray-700 dark:text-gray-300 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {availableLanguages.map((lang, index) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                index === 0 ? 'rounded-t-xl' : ''
              } ${index === availableLanguages.length - 1 ? 'rounded-b-xl' : ''} ${
                currentLang === lang.code ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <span>{lang.flag}</span>
              <span className="text-gray-700 dark:text-gray-300">{lang.label}</span>
              {currentLang === lang.code && (
                <Icon
                  icon="material-symbols:check"
                  className="w-4 h-4 text-blue-600 dark:text-blue-400 ml-auto"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
