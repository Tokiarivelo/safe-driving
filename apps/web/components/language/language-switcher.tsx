'use client';

import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import { locales } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: string) => {
    // Remplacer la locale actuelle dans l'URL
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');

    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      {locales.map(locale => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={`px-3 py-1 rounded ${
            i18n.language === locale
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
