'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vehicleInfoSchema, VehicleInfoFormValues } from './schema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useVehicleInfoAction = (
  initialData: Partial<VehicleInfoFormValues> = {}
) => {
  const router = useRouter();
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
      // Simuler un traitement
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Données véhicule:', data);
      toast.success('Informations enregistrées');
      router.push('/driver/register/next-step');
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  return {
    form,
    handleSubmit,
    isSubmitting: form.formState.isSubmitting
  };
};