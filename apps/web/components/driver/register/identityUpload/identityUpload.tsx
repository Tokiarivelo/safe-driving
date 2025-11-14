'use client';
import { FileUpload } from '@/components/ui/FileUpload';
import { useIdentityUploadAction } from './useAction';
import { Form } from '@/components/ui/form';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import styles from './identity.module.css';

export const IdentityUploadForm = () => {
  const { t } = useTranslation(['registerDriver/step3']);
  const { form, handleSubmit, removeFile, isSubmitting } = useIdentityUploadAction();

  return (
    <div className="w-full px-4 py-8">
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.formContainer}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-3xl mx-auto">
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
  );
};