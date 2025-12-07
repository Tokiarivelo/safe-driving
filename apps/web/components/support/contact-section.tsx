'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

interface ContactOption {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  action?: () => void;
}

export default function ContactSection() {
  const { t } = useTranslation('support');

  const contactOptions: ContactOption[] = [
    {
      id: 'email',
      icon: 'bi:envelope-fill',
      iconColor: '#FCD34D',
      title: t('contactSection.options.email.title'),
      description: t('contactSection.options.email.description'),
      action: () => window.open('mailto:support@safedriving.com', '_blank'),
    },
    {
      id: 'chat',
      icon: 'bi:chat-dots-fill',
      iconColor: '#86EFAC',
      title: t('contactSection.options.chat.title'),
      description: t('contactSection.options.chat.description'),
      action: () => {
        // Navigate to messages or open chat
        console.log('Open chat');
      },
    },
    {
      id: 'phone',
      icon: 'bi:telephone-fill',
      iconColor: '#93C5FD',
      title: t('contactSection.options.phone.title'),
      description: t('contactSection.options.phone.description'),
      action: () => window.open('tel:+1234567890', '_blank'),
    },
    {
      id: 'facebook',
      icon: 'bi:facebook',
      iconColor: '#3B82F6',
      title: t('contactSection.options.facebook.title'),
      description: t('contactSection.options.facebook.description'),
      action: () => window.open('https://facebook.com', '_blank'),
    },
    {
      id: 'linkedin',
      icon: 'bi:linkedin',
      iconColor: '#0A66C2',
      title: t('contactSection.options.linkedin.title'),
      description: t('contactSection.options.linkedin.description'),
      action: () => window.open('https://linkedin.com', '_blank'),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-12">
        {t('contactSection.title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contactOptions.map((option) => (
          <button
            key={option.id}
            onClick={option.action}
            className="flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all bg-white group"
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: option.iconColor + '20' }}
            >
              <Icon
                icon={option.icon}
                className="w-10 h-10"
                style={{ color: option.iconColor }}
              />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2 text-center">
              {option.title}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {option.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
