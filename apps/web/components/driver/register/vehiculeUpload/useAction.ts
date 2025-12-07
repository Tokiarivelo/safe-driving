'use client';
import { useForm, UseFormReturn, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vehicleDocumentsSchema, VehicleDocumentsFormValues } from './schema';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import {
  useCreateBatchPresignedUrlsMutation,
  useCompleteUploadBulkMutation,
  FileType,
  VehicleDocumentType,
  useUpdateDriverVehicleMutation,
  useGetVehiclesQuery,
} from '@/graphql/generated/graphql';
import { uploadMultipleWithLimit } from '@/components/ui/upload/upload-component.service';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';

type UseVehicleDocumentsActionReturn = {
  form: UseFormReturn<VehicleDocumentsFormValues>;
  handleSubmit: ReturnType<UseFormReturn<VehicleDocumentsFormValues>['handleSubmit']>;
  isSubmitting: boolean;
  vehicleId: string | null;
  initialRegistrationFiles: { url: string; name: string; key?: string }[];
  initialInsuranceFiles: { url: string; name: string; key?: string }[];
  initialVehiclePhotos: { url: string; name: string; key?: string }[];
  loadingVehicle: boolean;
};

export const useVehicleDocumentsAction = (
  initialData: Partial<VehicleDocumentsFormValues> = {},
): UseVehicleDocumentsActionReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [createPresignedUrls] = useCreateBatchPresignedUrlsMutation();
  const [completeUploadBulk] = useCompleteUploadBulkMutation();
  const [updateDriverVehicle] = useUpdateDriverVehicleMutation();

  // Récupérer le vehicleId depuis les paramètres d'URL ou le localStorage
  const vehicleId = searchParams.get('vehicleId') || localStorage.getItem('currentVehicleId');

  const { data: vehicleDataRes, loading: loadingVehicle } = useGetVehiclesQuery({
    fetchPolicy: 'cache-and-network',
    skip: !vehicleId,
  });

  const currentVehicle = vehicleDataRes?.vehicles?.find(v => v.id === vehicleId);

  const initialRegistrationFiles =
    currentVehicle?.VehicleDocument?.filter(
      (doc: { documentType: VehicleDocumentType }) =>
        doc.documentType === VehicleDocumentType.REGISTRATION,
    ).map(
      (doc: {
        file: {
          url?: string | null;
          originalName?: string | null;
          name?: string | null;
          key: string;
        };
      }) => ({
        url: doc.file.url || '',
        name: doc.file.originalName || doc.file.name || 'Document',
        key: doc.file.key,
      }),
    ) || [];

  const initialInsuranceFiles =
    currentVehicle?.VehicleDocument?.filter(
      (doc: { documentType: VehicleDocumentType }) =>
        doc.documentType === VehicleDocumentType.INSURANCE,
    ).map(
      (doc: {
        file: {
          url?: string | null;
          originalName?: string | null;
          name?: string | null;
          key: string;
        };
      }) => ({
        url: doc.file.url || '',
        name: doc.file.originalName || doc.file.name || 'Document',
        key: doc.file.key,
      }),
    ) || [];

  const initialVehiclePhotos =
    currentVehicle?.VehicleImage?.map(
      (img: {
        file: {
          url?: string | null;
          originalName?: string | null;
          name?: string | null;
          key: string;
        };
      }) => ({
        url: img.file.url || '',
        name: img.file.originalName || img.file.name || 'Photo',
        key: img.file.key,
      }),
    ) || [];

  const form = useForm<VehicleDocumentsFormValues>({
    resolver: zodResolver(vehicleDocumentsSchema) as Resolver<VehicleDocumentsFormValues>,
    defaultValues: {
      registrationFiles: initialData.registrationFiles || [],
      insuranceFiles: initialData.insuranceFiles || [],
      vehiclePhotos: initialData.vehiclePhotos || [],
    },
  });

  const onSubmit = async (data: VehicleDocumentsFormValues): Promise<void> => {
    if (!session?.user?.id) {
      toast.error('Utilisateur non connecté');
      return;
    }

    if (!vehicleId) {
      toast.error("ID du véhicule manquant. Veuillez créer un véhicule d'abord.");
      return;
    }

    const registrationFiles = data.registrationFiles || [];
    const insuranceFiles = data.insuranceFiles || [];
    const vehiclePhotos = data.vehiclePhotos || [];

    // Validation manuelle prenant en compte les fichiers existants
    const totalRegistration = registrationFiles.length + initialRegistrationFiles.length;
    const totalInsurance = insuranceFiles.length + initialInsuranceFiles.length;
    const totalPhotos = vehiclePhotos.length + initialVehiclePhotos.length;

    if (totalRegistration < 1) {
      toast.error("Le certificat d'immatriculation est requis");
      return;
    }

    if (totalInsurance < 1) {
      toast.error("L'attestation d'assurance est requise");
      return;
    }

    if (totalPhotos < 3) {
      toast.error('Minimum 3 photos du véhicule sont requises');
      return;
    }

    try {
      const allFiles: File[] = [...registrationFiles, ...insuranceFiles, ...vehiclePhotos];

      // Si aucun nouveau fichier, on passe directement à l'étape suivante
      if (allFiles.length === 0) {
        router.push('selfieVerif');
        return;
      }

      // Générer les métadonnées pour chaque fichier
      const fileMetas = allFiles.map(file => ({
        originalName: file.name,
        contentType: file.type || 'application/octet-stream',
        uniqueId: uuidv4(),
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
        3,
      );

      const successResults = results.filter(r => r.success);

      if (successResults.length === 0) {
        throw new Error("Aucun fichier n'a pu être uploadé");
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
        ...registrationFiles.map((file, index) => ({
          documentType: VehicleDocumentType.REGISTRATION,
          file: {
            key: successResults[index]?.key || '',
          },
        })),
        ...insuranceFiles.map((file, index) => ({
          documentType: VehicleDocumentType.INSURANCE,
          file: {
            key: successResults[registrationFiles.length + index]?.key || '',
          },
        })),
      ];

      // Mapper les photos du véhicule
      const uploadImages = vehiclePhotos.map((file, index) => ({
        key: successResults[registrationFiles.length + insuranceFiles.length + index]?.key || '',
      }));

      // Mise à jour du véhicule côté backend
      await updateDriverVehicle({
        variables: {
          vehicleId: vehicleId,
          input: {
            uploadDocuments,
            uploadImages,
          },
        },
      });

      toast.success('Documents véhicule uploadés avec succès');
      router.push('selfieVerif');
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de l'enregistrement des documents",
      );
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    vehicleId,
    initialRegistrationFiles,
    initialInsuranceFiles,
    initialVehiclePhotos,
    loadingVehicle,
  };
};
