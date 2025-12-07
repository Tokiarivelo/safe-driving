'use client';
import { FileUpload } from '@/components/ui/FileUpload';
import { useIdentityUploadAction } from './useAction';
import { Form } from '@/components/ui/form';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import styles from './identity.module.css';

import { useMeQuery, UserDocumentType } from '@/graphql/generated/graphql';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { IdentityUploadFormValues } from './schema';

interface IdentityDocumentFieldProps {
  form: UseFormReturn<IdentityUploadFormValues>;
  fieldName: keyof IdentityUploadFormValues;
  existingFile?: { url?: string | null; originalName?: string | null };
  subtitleKey?: string;
  onRemove: (field: keyof IdentityUploadFormValues) => void;
  t: (key: string) => string;
}

const IdentityDocumentField = ({
  form,
  fieldName,
  existingFile,
  subtitleKey,
  onRemove,
  t,
}: IdentityDocumentFieldProps) => {
  const currentFile = form.watch(fieldName);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (currentFile && currentFile instanceof File) {
      const objectUrl = URL.createObjectURL(currentFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [currentFile]);

  const activePreview = previewUrl || existingFile?.url;
  const showUpload = !currentFile;

  return (
    <div className={styles.uploadBlock}>
      {subtitleKey && <p className={styles.uploadSubtitle}>{t(subtitleKey)}</p>}

      {activePreview && (
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden border border-gray-200 group">
          <Image src={activePreview} alt="Document Preview" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-sm font-medium truncate px-4">
              {currentFile?.name || existingFile?.originalName}
            </p>
          </div>

          {currentFile && (
            <button
              type="button"
              onClick={() => onRemove(fieldName)}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      )}

      {showUpload && (
        <FileUpload
          onUpload={file => form.setValue(fieldName, file, { shouldValidate: true })}
          onRemove={() => onRemove(fieldName)}
          file={currentFile}
          className={styles.uploadSmall}
          accept="image/*,.pdf"
          error={form.formState.errors[fieldName]?.message}
        />
      )}
    </div>
  );
};

export const IdentityUploadForm = () => {
  const { t } = useTranslation(['registerDriver/step3']);
  const { form, handleSubmit, removeFile, isSubmitting } = useIdentityUploadAction();

  const { data } = useMeQuery({
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  const getExistingDocument = (type: UserDocumentType) => {
    return data?.me?.UserDocument?.find(doc => doc.documentType === type)?.file;
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
            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
              {/* Section Carte d'identité */}
              <div className="flex flex-col w-full">
                <h4 className={`${styles.subtitle} text-left mb-4`}>{t('id_card.front.title')}</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Recto */}
                  <IdentityDocumentField
                    form={form}
                    fieldName="idCardFront"
                    existingFile={getExistingDocument(UserDocumentType.ID_CARD_FRONT)}
                    subtitleKey="id_card.front.subtitle"
                    onRemove={removeFile}
                    t={t}
                  />

                  {/* Verso */}
                  <IdentityDocumentField
                    form={form}
                    fieldName="idCardBack"
                    existingFile={getExistingDocument(UserDocumentType.ID_CARD_BACK)}
                    subtitleKey="id_card.back.subtitle"
                    onRemove={removeFile}
                    t={t}
                  />
                </div>
              </div>

              {/* Section Permis de conduire */}
              <div className="flex flex-col w-full mt-10">
                <h4 className={`${styles.subtitle} text-left mb-4`}>
                  {t('id_card.license.title')}
                </h4>

                <IdentityDocumentField
                  form={form}
                  fieldName="license"
                  existingFile={getExistingDocument(UserDocumentType.DRIVER_LICENSE)}
                  onRemove={removeFile}
                  t={t}
                />
              </div>

              {/* Boutons */}
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
