'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vehicleInfoSchema, VehicleInfoFormValues } from './schema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@apollo/client';
import { 
  CreateDriverVehicleDocument, 
  GetVehicleTypesDocument 
} from '@/graphql/generated/graphql';
import { useState } from 'react';

export const useVehicleInfoAction = (
  initialData: Partial<VehicleInfoFormValues> = {}
) => {
  const router = useRouter();
  const [createdVehicleId, setCreatedVehicleId] = useState<string>('');
  
  const [createDriverVehicle, { loading: creating }] = useMutation(CreateDriverVehicleDocument);
  
  // Récupérer les types de véhicules depuis l'API
  const { data: vehicleTypesData, loading: loadingTypes } = useQuery(GetVehicleTypesDocument);
  
  const vehicleTypes = vehicleTypesData?.vehicleTypes || [];

  const form = useForm<VehicleInfoFormValues>({
    resolver: zodResolver(vehicleInfoSchema),
    defaultValues: {
      brand: initialData.brand || '',
      model: initialData.model || '',
      plate: initialData.plate || '',
      seats: initialData.seats || 4,
      type: initialData.type || ''
    }
  });

  const handleSubmit = async (data: VehicleInfoFormValues) => {
    try {
      // Vérifier qu'un type de véhicule est sélectionné
      if (!data.type) {
        toast.error('Veuillez sélectionner un type de véhicule');
        return;
      }

      // Appeler la mutation GraphQL pour créer le véhicule
      const result = await createDriverVehicle({
        variables: {
          input: {
            brand: data.brand,
            model: data.model,
            registrationNumber: data.plate,
            place: data.seats,
            vehicleTypeId: data.type,
            uploadDocuments: [], // Vide pour l'instant
            uploadImages: []     // Vide pour l'instant
          }
        }
      });

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      if (!result.data?.createDriverVehicle) {
        throw new Error('Erreur lors de la création du véhicule');
      }

      // Stocker l'ID du véhicule créé
      const vehicleId = result.data.createDriverVehicle.id;
      setCreatedVehicleId(vehicleId);
      
      // Stocker aussi dans le localStorage pour la navigation
      localStorage.setItem('currentVehicleId', vehicleId);

      toast.success('Véhicule enregistré avec succès');
      
      // Rediriger vers la page d'upload avec l'ID du véhicule
      router.push(`vehiculeUpload?vehicleId=${vehicleId}`);
      
    } catch (error: any) {
      console.error('Erreur lors de l\'enregistrement:', error);
      toast.error(error.message || 'Erreur lors de l\'enregistrement du véhicule');
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    isSubmitting: form.formState.isSubmitting || creating,
    vehicleTypes,
    loadingTypes,
    createdVehicleId // Retourner l'ID créé
  };
};