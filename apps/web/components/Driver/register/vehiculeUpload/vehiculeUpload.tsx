'use client';

import { useVehicleDocumentsAction } from './useAction';
import { Form } from '@/components/ui/form';
import { MultiFileUpload } from '@/components/ui/MultiFileUpload';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { CardFormContainer } from '@/components/ui/CardFormContainer';
import { StepListCard } from '@/components/ui/StepListCard';
import { StepIndicator } from '@/components/ui/PogressBar';
import styles from './vehiculeUp.module.css';
import Image from 'next/image';
import * as icons from 'lucide-react';

interface VehicleDocumentsFormProps {
  initialData?: {
    registrationFiles?: File[];
    insuranceFiles?: File[];
    vehiclePhotos?: File[];
  };
}

export const VehicleDocumentsForm = ({ initialData }: VehicleDocumentsFormProps) => {
  const { t } = useTranslation(['registerDriver/step5', 'registerDriver/stepList']);
  const { form, handleSubmit, isSubmitting } = useVehicleDocumentsAction(initialData);

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
    <div className={styles.pageContainer}>
      <div className={styles.progressBarContainer}>
        <StepIndicator
          steps={[
            { number: 1, label: t('registerDriver/stepList:progressionVehicle'), status: 'completed' },
            { number: 2, label: t('registerDriver/stepList:progressionDocuments'), status: 'active' },
          ]}
        />
      </div>

      <CardFormContainer title="" subtitle="" className={styles.cardContainer}>
        <div className={styles.cardContent}>
          <div className={styles.cardLeft}>
            <div className={styles.logoContainer}>
              <Image
                src="/logo.svg"
                alt="Logo"
                width={64}
                height={64}
                className={styles.logo}
              />
            </div>

            <div className={styles.contentContainer}>
              <div className={styles.textContainer}>
                <h1 className={styles.title}>{t('title')}</h1>
                <p className={styles.subtitle}>{t('subtitle')}</p>
              </div>

              <div className={styles.formContainer}>
                <Form {...form}>
                <form onSubmit={handleSubmit} className={styles.form}> 
                    {/* Certificat d'immatriculation */}
                    <div className={styles.formSection}>
                      <h4 className={styles.formSubtitle}>{t('sections.registration')}</h4>
                      <MultiFileUpload
                        uniqueId="registration"
                        files={form.watch('registrationFiles')}
                        buttonText={t('documents.registration.button')}
                        addMoreText=""
                        onUpload={(files) => form.setValue('registrationFiles', files, { shouldValidate: true })}
                        multiple
                        accept="image/*,.pdf"
                      />
                        {form.formState.errors.registrationFiles && (
                            <p className="text-xs text-destructive mt-1">
                            {form.formState.errors.registrationFiles.message}
                            </p>
                        )}
                    </div>

                    {/* Attestation d'assurance */}
                    <div className={styles.formSection}>
                      <h4 className={styles.formSubtitle}>{t('sections.insurance')}</h4>
                      <MultiFileUpload
                        uniqueId="insurance"
                        files={form.watch('insuranceFiles')}
                        buttonText={t('documents.insurance.button')}
                        addMoreText=""
                        onUpload={(files) => form.setValue('insuranceFiles', files, { shouldValidate: true })}
                        multiple
                        accept="image/*,.pdf"
                      />
                        {form.formState.errors.insuranceFiles && (
                            <p className="text-xs text-destructive mt-1">
                            {form.formState.errors.insuranceFiles.message}
                            </p>
                        )}
                    </div>

                    {/* Photos du véhicule */}
                    <div className={styles.formSection}>
                      <h4 className={styles.formSubtitle}>{t('sections.photos')}</h4>
                      <MultiFileUpload
                        uniqueId="photos"
                        files={form.watch('vehiclePhotos')}
                        buttonText={t('documents.photos.button')}
                        addMoreText=""
                        onUpload={(files) => form.setValue('vehiclePhotos', files, { shouldValidate: true })}
                        multiple
                        accept="image/*"
                      />
                        {form.formState.errors.vehiclePhotos && (
                            <p className="text-xs text-destructive mt-1">
                            {form.formState.errors.vehiclePhotos.message}
                            </p>
                        )}                    
                    </div>

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
            <StepListCard steps={STEPS} currentStepId="step5" />
          </div>
        </div>
      </CardFormContainer>
    </div>
  );
};
