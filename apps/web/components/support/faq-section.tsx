'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const { t } = useTranslation('support');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqItems: FaqItem[] = [
    {
      question: t('faqSection.questions.reserveCourse.question'),
      answer: t('faqSection.questions.reserveCourse.answer'),
    },
    {
      question: t('faqSection.questions.cancelCourse.question'),
      answer: t('faqSection.questions.cancelCourse.answer'),
    },
    {
      question: t('faqSection.questions.paymentMethods.question'),
      answer: t('faqSection.questions.paymentMethods.answer'),
    },
    {
      question: t('faqSection.questions.shareTrip.question'),
      answer: t('faqSection.questions.shareTrip.answer'),
    },
    {
      question: t('faqSection.questions.lateDriver.question'),
      answer: t('faqSection.questions.lateDriver.answer'),
    },
  ];

  const filteredFaqs = faqItems.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        {t('faqSection.title')}
      </h2>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Icon
            icon="material-symbols:search-rounded"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
          />
          <input
            type="text"
            placeholder={t('faqSection.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggleExpand(index)}
              className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="text-left font-medium text-gray-800">
                {item.question}
              </span>
              <Icon
                icon={expandedIndex === index ? 'mdi:minus' : 'mdi:plus'}
                className="w-6 h-6 text-gray-600 flex-shrink-0 ml-4"
              />
            </button>
            {expandedIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {t('faqSection.noResultsFound')}
        </div>
      )}
    </div>
  );
}
