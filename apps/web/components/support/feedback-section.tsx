'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

type RatingType = 1 | 2 | 3 | 4 | 5;
type CategoryType = 'feedback' | 'suggestion' | 'other';

const ratingEmojis = {
  1: { icon: 'twemoji:grinning-face-with-smiling-eyes', color: '#FCD34D' },
  2: { icon: 'twemoji:slightly-smiling-face', color: '#86EFAC' },
  3: { icon: 'twemoji:neutral-face', color: '#D1D5DB' },
  4: { icon: 'twemoji:frowning-face', color: '#FBBF24' },
  5: { icon: 'twemoji:angry-face', color: '#EF4444' },
};

export default function FeedbackSection() {
  const { t } = useTranslation('support');
  const [rating, setRating] = useState<RatingType | null>(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('feedback');
  const [otherCategory, setOtherCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !description.trim()) {
      toast.error(t('feedbackSection.validationError'));
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Here you would send the feedback to your backend
      console.log({
        rating,
        description,
        category,
        otherCategory: category === 'other' ? otherCategory : null,
      });

      toast.success(t('feedbackSection.successMessage'));
      
      // Reset form
      setRating(null);
      setDescription('');
      setCategory('feedback');
      setOtherCategory('');
    } catch {
      toast.error(t('feedbackSection.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        {t('feedbackSection.title')}
      </h2>

      {/* Rating Question */}
      <div className="mb-8">
        <p className="text-lg text-gray-700 mb-6 text-center">
          {t('feedbackSection.subtitle')}
        </p>

        {/* Rating Emojis */}
        <div className="flex justify-center gap-4 mb-8">
          {(Object.keys(ratingEmojis) as unknown as RatingType[]).map((key) => (
            <button
              key={key}
              onClick={() => setRating(key)}
              className={`w-16 h-16 rounded-full transition-all transform hover:scale-110 ${
                rating === key
                  ? 'ring-4 ring-red-400 scale-110'
                  : 'hover:ring-2 hover:ring-gray-300'
              }`}
            >
              <Icon
                icon={ratingEmojis[key].icon}
                className="w-16 h-16"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <div className="relative">
          <Icon
            icon="mdi:text"
            className="absolute left-4 top-4 text-gray-400 w-5 h-5"
          />
          <textarea
            placeholder={t('feedbackSection.descriptionPlaceholder')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
          />
        </div>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <div className="flex gap-3 mb-4">
          {(['feedback', 'suggestion', 'other'] as CategoryType[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
              }`}
            >
              {t(`feedbackSection.categories.${cat}`)}
            </button>
          ))}
        </div>

        {category === 'other' && (
          <div className="relative">
            <Icon
              icon="mdi:diamond-outline"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            />
            <input
              type="text"
              placeholder={t('feedbackSection.otherPlaceholder')}
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !rating || !description.trim()}
          className="px-12 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg hover:from-pink-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Icon icon="mdi:loading" className="animate-spin w-5 h-5" />
              {t('feedbackSection.submittingText')}
            </span>
          ) : (
            t('feedbackSection.submitButton')
          )}
        </button>
      </div>
    </div>
  );
}
