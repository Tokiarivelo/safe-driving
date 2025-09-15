'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelfieVerificationAction } from './useAction';
import { Form } from '@/components/ui/form';
import PhotoCapture from '@/components/ui/Camera';
import styles from './selfieVerif.module.css';

export const SelfieVerification = () => {
  const { form, handleSubmit, isSubmitting } = useSelfieVerificationAction();
  const { t } = useTranslation(['registerDriver/step6']);

  const handleCapture = (image: string) => {
    form.setValue('selfie', image, { shouldValidate: true });
  };

  return (
    <div className="w-full px-4 py-8">
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.formContainer}>
          <Form {...form}>
            <form onSubmit={handleSubmit}>
              <PhotoCaptureWithCallback onCapture={handleCapture} />

              {form.formState.errors.selfie && (
                <p className={styles.errorMessage}>
                  {form.formState.errors.selfie.message}
                </p>
              )}

              <div className={styles.buttonContainer}>
                <button type="button" className={styles.buttonOutline}>
                  {t('buttons.later')}
                </button>
                <button type="submit" disabled={isSubmitting} className={styles.buttonPrimary}>
                  {isSubmitting ? t('buttons.processing') : t('buttons.validate')}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

function PhotoCaptureWithCallback({ onCapture }: { onCapture: (image: string) => void }) {
  return (
    <PhotoCapture
      onCapture={(image: string) => {
        onCapture(image);
      }}
    />
  );
}