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
  ImageType 
} from '@/graphql/generated/graphql';
import { uploadMultipleWithLimit } from '@/components/ui/upload/upload-component.service';
import { v4 as uuidv4 } from 'uuid';

export const useIdentityUploadAction = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  
  const [createPresignedUrls] = useCreateBatchPresignedUrlsMutation();
  const [completeUploadBulk] = useCompleteUploadBulkMutation();

  const form = useForm<IdentityUploadFormValues>({
    resolver: zodResolver(identityUploadSchema),
    defaultValues: {
      idCardFront: undefined,
      idCardBack: undefined,
      license: undefined
    }
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
        uniqueId?: string;
      }> = [];

      // Carte d'identité recto
      if (data.idCardFront) {
        filesToUpload.push(data.idCardFront);
        fileMetas.push({
          originalName: data.idCardFront.name,
          contentType: data.idCardFront.type || 'application/octet-stream',
          uniqueId: uuidv4(),
        });
      }

      // Carte d'identité verso
      if (data.idCardBack) {
        filesToUpload.push(data.idCardBack);
        fileMetas.push({
          originalName: data.idCardBack.name,
          contentType: data.idCardBack.type || 'application/octet-stream',
          uniqueId: uuidv4(),
        });
      }

      // Permis de conduire
      if (data.license) {
        filesToUpload.push(data.license);
        fileMetas.push({
          originalName: data.license.name,
          contentType: data.license.type || 'application/octet-stream',
          uniqueId: uuidv4(),
        });
      }

      if (filesToUpload.length === 0) {
        toast.error('Aucun fichier à uploader');
        return;
      }

      const { data: presignedData } = await createPresignedUrls({
        variables: {
          files: fileMetas,
          type: ImageType.USER,
        },
      });

      if (!presignedData?.createBatchPresignedUrls) {
        throw new Error('Erreur lors de la génération des URLs de téléchargement');
      }

      const results = await uploadMultipleWithLimit(
        presignedData.createBatchPresignedUrls,
        filesToUpload,
        () => {}, 
        3, 
        3 
      );

      const successResults = results.filter(r => r.success);
      
      if (successResults.length > 0) {
        await completeUploadBulk({
          variables: {
            keys: successResults.map(r => r.key || ''),
            type: ImageType.USER,
          },
        });
      }

      if (successResults.length !== filesToUpload.length) {
        throw new Error('Certains fichiers n\'ont pas pu être uploadés');
      }

      toast.success('Documents uploadés avec succès');
      router.push('/vehiculeInfo');
    } catch (error: any) {
      console.error('Erreur lors du processus:', error);
      toast.error(error.message || 'Erreur lors du traitement des documents');
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