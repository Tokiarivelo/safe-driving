'use client';

import { useVehicleDocumentsAction } from './useAction';
import { Form } from '@/components/ui/form';
import { MultiFileUpload } from '@/components/ui/MultiFileUpload';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import styles from './vehiculeUp.module.css';

interface VehicleDocumentsFormProps {
  initialData?: {
    registrationFiles?: File[];
    insuranceFiles?: File[];
    vehiclePhotos?: File[];
  };
}

export const VehicleDocumentsForm = ({ initialData }: VehicleDocumentsFormProps) => {
  const { t } = useTranslation(['registerDriver/step5']);
  const {
    form,
    handleSubmit,
    isSubmitting,
    initialRegistrationFiles,
    initialInsuranceFiles,
    initialVehiclePhotos,
    loadingVehicle,
  } = useVehicleDocumentsAction(initialData);

  if (loadingVehicle) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
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
                  files={form.watch('registrationFiles') || []}
                  initialFiles={initialRegistrationFiles}
                  buttonText={t('documents.registration.button')}
                  addMoreText=""
                  onUpload={files =>
                    form.setValue('registrationFiles', files, { shouldValidate: true })
                  }
                  multiple
                  accept="image/*,.pdf"
                  error={form.formState.errors.registrationFiles?.message}
                />
              </div>

              {/* Attestation d'assurance */}
              <div className={styles.formSection}>
                <h4 className={styles.formSubtitle}>{t('sections.insurance')}</h4>
                <MultiFileUpload
                  uniqueId="insurance"
                  files={form.watch('insuranceFiles') || []}
                  initialFiles={initialInsuranceFiles}
                  buttonText={t('documents.insurance.button')}
                  addMoreText=""
                  onUpload={files =>
                    form.setValue('insuranceFiles', files, { shouldValidate: true })
                  }
                  multiple
                  accept="image/*,.pdf"
                  error={form.formState.errors.insuranceFiles?.message}
                />
              </div>

              {/* Photos du véhicule */}
              <div className={styles.formSection}>
                <h4 className={styles.formSubtitle}>{t('sections.photos')}</h4>
                <MultiFileUpload
                  uniqueId="photos"
                  files={form.watch('vehiclePhotos') || []}
                  initialFiles={initialVehiclePhotos}
                  buttonText={t('documents.photos.button')}
                  addMoreText=""
                  onUpload={files =>
                    form.setValue('vehiclePhotos', files, { shouldValidate: true })
                  }
                  multiple
                  accept="image/*"
                  error={form.formState.errors.vehiclePhotos?.message}
                />
              </div>

              <div className={styles.buttonContainer}>
                <Button type="button" variant="outline" className={styles.buttonOutline}>
                  {t('buttons.later')}
                </Button>
                <Button type="submit" disabled={isSubmitting} className={styles.buttonPrimary}>
                  {isSubmitting ? t('buttons.processing') : t('buttons.validate')}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
