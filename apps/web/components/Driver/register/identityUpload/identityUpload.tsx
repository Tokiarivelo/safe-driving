'use client';
import { FileUpload } from '@/components/ui/FileUpload';
import { useIdentityUploadAction } from './useAction';
import { Form } from '@/components/ui/form';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { CardFormContainer } from '@/components/ui/CardFormContainer';
import { StepListCard } from '@/components/ui/StepListCard';
import { StepIndicator } from '@/components/ui/PogressBar';
import styles from './identity.module.css';
import Image from 'next/image';
import * as icons from 'lucide-react';

export const IdentityUploadForm = () => {
  const { t } = useTranslation(['registerDriver/step3', 'registerDriver/stepList']);
  const { form, handleSubmit, removeFile, isSubmitting } = useIdentityUploadAction();

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

  return (
    <div className={`min-h-screen auth-background dark:bg-background flex flex-col items-center justify-start px-4 py-8`}>
      <div className="mt-10">
        <StepIndicator
          steps={[
            { number: 1, label: t('registerDriver/stepList:progressionInfo'), status: 'completed' },
            { number: 2, label: t('registerDriver/stepList:progressionIdentity'), status: 'active' },
          ]}
        />
      </div>

      <CardFormContainer title="" subtitle="" className="relative max-w-6xl w-full p-0 mt-5">
        <div className="flex flex-col md:flex-row w-full">
          <div className={`flex-1 p-12 pt-6 flex flex-col relative bg-[var(--color-auth-color-bg-white)] dark:bg-card`}>
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
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-10 max-w-3xl mx-auto">
                    {/* Section Carte d'identité */}
                    <div className="flex flex-col w-full">
                      <h4 className={`${styles.subtitle} text-left mb-4`}>
                        {t('id_card.front.title')}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Recto */}
                        <div className={styles.uploadBlock}>
                          <p className={styles.uploadSubtitle}>{t('id_card.front.subtitle')}</p>
                          <FileUpload
                            onUpload={(file) => form.setValue('idCardFront', file, { shouldValidate: true })}
                            onRemove={() => removeFile('idCardFront')}
                            file={form.watch('idCardFront')}
                            className={styles.uploadSmall}
                            accept="image/*,.pdf"
                            error={form.formState.errors.idCardFront?.message}
                          />
                        </div>

                        {/* Verso */}
                        <div className={styles.uploadBlock}>
                          <p className={styles.uploadSubtitle}>{t('id_card.back.subtitle')}</p>
                          <FileUpload
                            onUpload={(file) => form.setValue('idCardBack', file, { shouldValidate: true })}
                            onRemove={() => removeFile('idCardBack')}
                            file={form.watch('idCardBack')}
                            className={styles.uploadSmall}
                            accept="image/*,.pdf"
                            error={form.formState.errors.idCardBack?.message}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section Permis de conduire */}
                    <div className="flex flex-col w-full mt-10">
                      <h4 className={`${styles.subtitle} text-left mb-4`}>
                        {t('id_card.license.title')}
                      </h4>

                      <div className={styles.uploadBlock}>
                        <FileUpload
                          onUpload={(file) => form.setValue('license', file, { shouldValidate: true })}
                          onRemove={() => removeFile('license')}
                          file={form.watch('license')}
                          className={styles.uploadSmall}
                          accept="image/*,.pdf"
                          error={form.formState.errors.license?.message}
                        />
                      </div>
                    </div>

                    {/* Boutons */}
                    <div className={styles.buttonContainer}>
                      <Button
                        type="button"
                        variant="outline"
                        className={styles.buttonOutline}
                      >
                        {t('buttons.later')}
                      </Button>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.buttonPrimary}
                      >
                        {isSubmitting ? t('buttons.processing') : t('buttons.validate')}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <StepListCard steps={STEPS} currentStepId="step3" />
          </div>
        </div>
      </CardFormContainer>
    </div>
  );
};
