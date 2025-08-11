'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { selfieVerificationSchema, SelfieVerificationValues } from './schema';
import { useRouter } from 'next/navigation'

export const useSelfieVerificationAction = () => {
  const router = useRouter()
  const form = useForm<SelfieVerificationValues>({
    resolver: zodResolver(selfieVerificationSchema),
    defaultValues: {
      selfie: ''
    }
  });

  const onSubmit = async (data: SelfieVerificationValues) => {
    try {
      console.log('Selfie soumis:', data);
      router.push('/gps');
      return { success: true };
    } catch (error) {
      console.error('Erreur:', error);
      return { success: false, error };
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting
  };
};