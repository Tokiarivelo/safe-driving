'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelfieVerificationAction } from './useAction';
import { Form } from '@/components/ui/form';
import PhotoCapture from '@/components/ui/Camera';
import { CardFormContainer } from '@/components/ui/CardFormContainer';
import { StepIndicator } from '@/components/ui/PogressBar';
import { StepListCard } from '@/components/ui/StepListCard';
import styles from './selfieVerif.module.css';
import Image from 'next/image';
import * as icons from 'lucide-react';

export const SelfieVerification = () => {
  const { form, handleSubmit, isSubmitting } = useSelfieVerificationAction();
  const { t } = useTranslation(['registerDriver/step6', 'registerDriver/stepList']);

  const iconNames = [
    'User', 'UserRound', 'IdCard', 'CarFront', 'FileUp', 'Camera',
    'MapPin', 'Bell', 'Settings', 'ClipboardList', 'CheckCircle'
  ];

  const STEPS = Array.from({ length: 11 }, (_, i) => {
    const stepNum = i + 1;
    const iconName = iconNames[i];
    const IconComponent = (icons as Record<string, React.FC<any>>)[iconName] ?? icons.Hand;

    return {
      id: `step${stepNum}`,
      icon: <IconComponent size={18} />,
      title: t(`registerDriver/stepList:step${stepNum}`),
    };
  });

  const handleCapture = (image: string) => {
    form.setValue('selfie', image, { shouldValidate: true });
  };

  return (
    <div className="min-h-screen auth-background dark:bg-background flex flex-col items-center justify-start px-4 py-8">
      <div className="mt-10">
        <StepIndicator
          steps={[
            { number: 1, label: t('registerDriver/stepList:progressionRole'), status: 'completed' },
            { number: 2, label: t('registerDriver/stepList:progressionInfo'), status: 'active' },
          ]}
        />
      </div>

      <CardFormContainer
        title=""
        subtitle=""
        className="relative max-w-6xl w-full p-0 mt-5"
      >
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex-1 p-12 pt-6 flex flex-col relative bg-[var(--color-auth-color-bg-white)] dark:bg-card">
            <div className="absolute top-6 left-6">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={64}
                height={64}
                className="dark:invert dark:brightness-0 dark:contrast-200"
              />
            </div>

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
                      <button
                        type="button"
                        className={styles.buttonOutline}
                      >
                        {t('buttons.later')}
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.buttonPrimary}
                      >
                        {isSubmitting ? t('buttons.processing') : t('buttons.validate')}
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <StepListCard
              steps={STEPS}
              currentStepId="step6"
            />
          </div>
        </div>
      </CardFormContainer>
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
