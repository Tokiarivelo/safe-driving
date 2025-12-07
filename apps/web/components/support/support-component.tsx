'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import FaqSection from './faq-section';
import ContactSection from './contact-section';
import TutorialsSection from './tutorials-section';
import FeedbackSection from './feedback-section';

type TabType = 'faq' | 'contact' | 'tutorials' | 'feedback';

export default function SupportComponent() {
  const { t } = useTranslation('support');
  const [activeTab, setActiveTab] = useState<TabType>('faq');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'faq', label: t('tabs.faq') },
    { id: 'contact', label: t('tabs.contact') },
    { id: 'tutorials', label: t('tabs.tutorials') },
    { id: 'feedback', label: t('tabs.feedback') },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'faq':
        return <FaqSection />;
      case 'contact':
        return <ContactSection />;
      case 'tutorials':
        return <TutorialsSection />;
      case 'feedback':
        return <FeedbackSection />;
      default:
        return <FaqSection />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg">
      {/* Header with tabs */}
      <div className="flex items-center gap-8 px-8 pt-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <Icon icon="flat-color-icons:online-support" className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">{t('assistance')}</h1>
        </div>
        
        <div className="flex gap-1 ml-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-gray-900 border-b-2 border-red-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}
