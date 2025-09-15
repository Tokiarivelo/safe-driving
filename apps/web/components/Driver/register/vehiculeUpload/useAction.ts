'use client';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vehicleDocumentsSchema, VehicleDocumentsFormValues } from './schema';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { 
  useCreateBatchPresignedUrlsMutation, 
  useCompleteUploadBulkMutation,
  FileType,
  VehicleDocumentType,
  useUpdateDriverVehicleMutation
} from '@/graphql/generated/graphql';
import { uploadMultipleWithLimit } from '@/components/ui/upload/upload-component.service';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';

type UseVehicleDocumentsActionReturn = {
  form: UseFormReturn<VehicleDocumentsFormValues>;
  handleSubmit: ReturnType<UseFormReturn<VehicleDocumentsFormValues>['handleSubmit']>;
  isSubmitting: boolean;
  vehicleId: string | null;
};

export const useVehicleDocumentsAction = (
  initialData: Partial<VehicleDocumentsFormValues> = {}
): UseVehicleDocumentsActionReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  
  const [createPresignedUrls] = useCreateBatchPresignedUrlsMutation();
  const [completeUploadBulk] = useCompleteUploadBulkMutation();
  const [updateDriverVehicle] = useUpdateDriverVehicleMutation();

  // Récupérer le vehicleId depuis les paramètres d'URL ou le localStorage
  const vehicleId = searchParams.get('vehicleId') || localStorage.getItem('currentVehicleId');

  const form = useForm<VehicleDocumentsFormValues>({
    resolver: zodResolver(vehicleDocumentsSchema),
    defaultValues: {
      registrationFiles: initialData.registrationFiles || [],
      insuranceFiles: initialData.insuranceFiles || [],
      vehiclePhotos: initialData.vehiclePhotos || []
    }
  });

  const onSubmit = async (data: VehicleDocumentsFormValues): Promise<void> => {
    if (!session?.user?.id) {
      toast.error('Utilisateur non connecté');
      return;
    }

    if (!vehicleId) {
      toast.error('ID du véhicule manquant. Veuillez créer un véhicule d\'abord.');
      return;
    }

    try {
      const allFiles: File[] = [
        ...data.registrationFiles,
        ...data.insuranceFiles,
        ...data.vehiclePhotos
      ];

      if (allFiles.length === 0) {
        toast.error('Aucun fichier à uploader');
        return;
      }

      // Générer les métadonnées pour chaque fichier
      const fileMetas = allFiles.map((file) => ({
        originalName: file.name,
        contentType: file.type || 'application/octet-stream',
        uniqueId: uuidv4()
      }));

      // Récupérer les URLs présignées
      const { data: presignedData } = await createPresignedUrls({
        variables: {
          files: fileMetas,
          type: FileType.VEHICLE,
        },
      });

      if (!presignedData?.createBatchPresignedUrls) {
        throw new Error('Erreur lors de la génération des URLs');
      }

      // Upload effectif
      const results = await uploadMultipleWithLimit(
        presignedData.createBatchPresignedUrls,
        allFiles,
        () => {},
        3,
        3
      );

      const successResults = results.filter(r => r.success);
      
      if (successResults.length === 0) {
        throw new Error('Aucun fichier n\'a pu être uploadé');
      }

      // Marquer les fichiers comme complets
      await completeUploadBulk({
        variables: {
          keys: successResults.map(r => r.key || ''),
          type: FileType.VEHICLE,
        },
      });

      // Mapper les documents (carte grise, assurance, etc.)
      const uploadDocuments = [
        ...data.registrationFiles.map((file, index) => ({
          documentType: VehicleDocumentType.REGISTRATION,
          file: {
            key: successResults[index]?.key || ''
          }
        })),
        ...data.insuranceFiles.map((file, index) => ({
          documentType: VehicleDocumentType.INSURANCE,
          file: {
            key: successResults[data.registrationFiles.length + index]?.key || ''
          }
        }))
      ];

      // Mapper les photos du véhicule
      const uploadImages = data.vehiclePhotos.map((file, index) => ({
        key: successResults[data.registrationFiles.length + data.insuranceFiles.length + index]?.key || ''
      }));

      // Mise à jour du véhicule côté backend
      await updateDriverVehicle({
        variables: {
          vehicleId: vehicleId,
          input: {
            uploadDocuments,
            uploadImages
          }
        }
      });

      toast.success('Documents véhicule uploadés avec succès');
      router.push('/selfieVerif');
      
    } catch (error: any) {
      console.error('Erreur lors de l\'upload:', error);
      toast.error(error.message || 'Erreur lors de l\'enregistrement des documents');
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    vehicleId
  };
};
