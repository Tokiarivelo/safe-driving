'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { selfieVerificationSchema, SelfieVerificationValues } from './schema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { 
  useCreateBatchPresignedUrlsMutation, 
  useCompleteUploadBulkMutation,
  FileType,
  UserDocumentType,
  useUploadUserDocumentMutation
} from '@/graphql/generated/graphql';
import { uploadMultipleWithLimit } from '@/components/ui/upload/upload-component.service';
import { v4 as uuidv4 } from 'uuid';

// Convertit Base64 en File
function base64ToFile(base64: string, filename: string): File {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export const useSelfieVerificationAction = () => {
  const router = useRouter();

  const [createPresignedUrls] = useCreateBatchPresignedUrlsMutation();
  const [completeUploadBulk] = useCompleteUploadBulkMutation();
  const [uploadUserDocument] = useUploadUserDocumentMutation();

  const form = useForm<SelfieVerificationValues>({
    resolver: zodResolver(selfieVerificationSchema),
    defaultValues: {
      selfie: '' // Base64
    }
  });

  const onSubmit = async (data: SelfieVerificationValues) => {
    try {
      if (!data.selfie) {
        toast.error("Veuillez prendre une photo avant de continuer");
        return { success: false };
      }

      const file = base64ToFile(data.selfie, 'selfie.png');

      // Générer les métadonnées pour l’URL présignée
      const fileMeta = {
        originalName: file.name,
        contentType: file.type || 'application/octet-stream',
        uniqueId: uuidv4(),
      };

      // Obtenir l’URL présignée
      const { data: presignedData } = await createPresignedUrls({
        variables: {
          files: [fileMeta],
          type: FileType.USER,
        },
      });

      if (!presignedData?.createBatchPresignedUrls) {
        throw new Error("Impossible de générer une URL d’upload");
      }

      // Upload du fichier
      const results = await uploadMultipleWithLimit(
        presignedData.createBatchPresignedUrls,
        [file],
        () => {},
        1,
        1
      );

      const successResults = results.filter(r => r.success);
      if (successResults.length === 0) {
        throw new Error("L’upload du selfie a échoué");
      }

      // Confirmer l’upload
      await completeUploadBulk({
        variables: {
          keys: successResults.map(r => r.key || ''),
          type: FileType.USER,
        },
      });

      // Associer le fichier au UserDocument
      await uploadUserDocument({
        variables: {
          input: {
            documentType: UserDocumentType.OTHER,
            file: { key: successResults[0]?.key || '' }
          }
        }
      });

      toast.success("Selfie uploadé avec succès");
      router.push('gps');
      return { success: true };

    } catch (error) {
      console.error("Erreur:", error);
      toast.error(error instanceof Error ? error.message : "Erreur lors de l’envoi du selfie");
      return { success: false, error };
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
  };
};
