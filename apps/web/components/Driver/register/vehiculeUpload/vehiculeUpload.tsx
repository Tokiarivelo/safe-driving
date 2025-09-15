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
  const { form, handleSubmit, isSubmitting } = useVehicleDocumentsAction(initialData);

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
                  files={form.watch('registrationFiles')}
                  buttonText={t('documents.registration.button')}
                  addMoreText=""
                  onUpload={(files) => form.setValue('registrationFiles', files, { shouldValidate: true })}
                  multiple
                  accept="image/*,.pdf"
                />
                {form.formState.errors.registrationFiles && (
                  <p className="text-xs text-destructive mt-1">{form.formState.errors.registrationFiles.message}</p>
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
                  <p className="text-xs text-destructive mt-1">{form.formState.errors.insuranceFiles.message}</p>
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
                  <p className="text-xs text-destructive mt-1">{form.formState.errors.vehiclePhotos.message}</p>
                )}
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