'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { identityUploadSchema, IdentityUploadFormValues } from './schema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  useCreateBatchPresignedUrlsMutation,
  useCompleteUploadBulkMutation,
  FileType,
  useUploadUserDocumentMutation,
  UserDocumentType,
} from '@/graphql/generated/graphql';

import { uploadMultipleWithLimit } from '@/components/ui/upload/upload-component.service';
import { v4 as uuidv4 } from 'uuid';

export const useIdentityUploadAction = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isUploading, setIsUploading] = useState(false);

  const [createPresignedUrls] = useCreateBatchPresignedUrlsMutation();
  const [completeUploadBulk] = useCompleteUploadBulkMutation();
  const [uploadUserDocument] = useUploadUserDocumentMutation();

  const form = useForm<IdentityUploadFormValues>({
    resolver: zodResolver(identityUploadSchema),
    defaultValues: {
      idCardFront: undefined,
      idCardBack: undefined,
      license: undefined,
    },
  });

  const handleSubmit = async (data: IdentityUploadFormValues) => {
    if (!session?.user?.id) {
      toast.error('Utilisateur non connecté');
      return;
    }

    setIsUploading(true);

    try {
      const filesToUpload: File[] = [];
      const fileMetas: Array<{
        originalName: string;
        contentType: string;
        size: number;
        uniqueId: string;
        documentType: UserDocumentType;
      }> = [];

      // Carte d'identité recto
      if (data.idCardFront) {
        filesToUpload.push(data.idCardFront);
        fileMetas.push({
          originalName: data.idCardFront.name,
          contentType: data.idCardFront.type || 'application/octet-stream',
          size: data.idCardFront.size,
          uniqueId: uuidv4(),
          documentType: UserDocumentType.ID_CARD_FRONT,
        });
      }

      // Carte d'identité verso
      if (data.idCardBack) {
        filesToUpload.push(data.idCardBack);
        fileMetas.push({
          originalName: data.idCardBack.name,
          contentType: data.idCardBack.type || 'application/octet-stream',
          size: data.idCardBack.size,
          uniqueId: uuidv4(),
          documentType: UserDocumentType.ID_CARD_BACK,
        });
      }

      // Permis de conduire
      if (data.license) {
        filesToUpload.push(data.license);
        fileMetas.push({
          originalName: data.license.name,
          contentType: data.license.type || 'application/octet-stream',
          size: data.license.size,
          uniqueId: uuidv4(),
          documentType: UserDocumentType.DRIVER_LICENSE,
        });
      }

      if (filesToUpload.length === 0) {
        toast.error('Aucun fichier à uploader');
        return;
      }

      // 1. Obtenir les URLs présignées
      const { data: presignedData } = await createPresignedUrls({
        variables: {
          files: fileMetas.map(fm => ({
            originalName: fm.originalName,
            size: fm.size,
            contentType: fm.contentType,
          })),
          type: FileType.USER,
        },
      });

      if (!presignedData?.createBatchPresignedUrls) {
        throw new Error('Erreur lors de la génération des URLs de téléchargement');
      }

      // 2. Uploader les fichiers vers LocalStack
      const results = await uploadMultipleWithLimit(
        presignedData.createBatchPresignedUrls,
        filesToUpload,
        () => {},
        3,
        3,
      );

      const successResults = results.filter(r => r.success);

      if (successResults.length > 0) {
        // 3. Marquer les uploads comme complétés
        await completeUploadBulk({
          variables: {
            keys: successResults.map(r => r.key || ''),
            type: FileType.USER,
          },
        });

        const uploadInput = successResults.map((result, index) => ({
          documentType: fileMetas[index].documentType,
          name: fileMetas[index].originalName, // Utiliser le nom original comme "name"
          file: {
            key: result.key || '', // Format attendu par votre backend
          },
        }));

        await uploadUserDocument({
          variables: {
            input: uploadInput,
          },
        });
      }

      if (successResults.length !== filesToUpload.length) {
        throw new Error("Certains fichiers n'ont pas pu être uploadés");
      }

      toast.success('Documents uploadés et liés avec succès');
      router.push('/vehiculeInfo');
    } catch (error) {
      console.error('Erreur lors du processus:', error);
      toast.error(
        error instanceof Error ? error.message : 'Erreur lors du traitement des documents',
      );
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (field: keyof IdentityUploadFormValues) => {
    form.setValue(field, undefined, { shouldValidate: true });
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    removeFile,
    isSubmitting: form.formState.isSubmitting || isUploading,
  };
};
