'use client';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vehicleDocumentsSchema, VehicleDocumentsFormValues } from './schema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type UseVehicleDocumentsActionReturn = {
  form: UseFormReturn<VehicleDocumentsFormValues>;
  handleSubmit: ReturnType<UseFormReturn<VehicleDocumentsFormValues>['handleSubmit']>;
  isSubmitting: boolean;
};

export const useVehicleDocumentsAction = (
  initialData: Partial<VehicleDocumentsFormValues> = {}
): UseVehicleDocumentsActionReturn => {
  const router = useRouter();
  const form = useForm<VehicleDocumentsFormValues>({
    resolver: zodResolver(vehicleDocumentsSchema),
    defaultValues: {
      registrationFiles: initialData.registrationFiles || [],
      insuranceFiles: initialData.insuranceFiles || [],
      vehiclePhotos: initialData.vehiclePhotos || []
    }
  });

  const onSubmit = async (data: VehicleDocumentsFormValues): Promise<void> => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    try {
      const formData = new FormData();
      
      data.registrationFiles.forEach((file, index) => {
        formData.append(`registration_${index}`, file);
      });
      
      data.insuranceFiles.forEach((file, index) => {
        formData.append(`insurance_${index}`, file);
      });
      
      data.vehiclePhotos.forEach((file, index) => {
        formData.append(`photo_${index}`, file);
      });

      console.log('Envoi des documents véhicule...');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Documents enregistrés avec succès');
      router.push('/selfieVerif');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de l\'enregistrement des documents');
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting
  };
};