'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

export default function TutorialsSection() {
  const { t } = useTranslation('support');

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        {t('tutorialsSection.title')}
      </h2>

      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center mb-6">
          <Icon icon="mdi:video-outline" className="w-16 h-16 text-red-500" />
        </div>
        <h3 className="text-2xl font-medium text-gray-800 mb-3">
          {t('tutorialsSection.comingSoon')}
        </h3>
        <p className="text-gray-600 text-center max-w-md">
          {t('tutorialsSection.description')}
        </p>
      </div>
    </div>
  );
}
