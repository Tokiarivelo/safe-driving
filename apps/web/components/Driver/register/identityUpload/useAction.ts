'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { identityUploadSchema, IdentityUploadFormValues } from './schema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useIdentityUploadAction = () => {
  const router = useRouter();
  const form = useForm<IdentityUploadFormValues>({
    resolver: zodResolver(identityUploadSchema),
    defaultValues: {
      idCardFront: undefined,
      idCardBack: undefined,
      license: undefined
    }
  });

  const handleSubmit = async (data: IdentityUploadFormValues) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Fichiers à envoyer:', {
        idCardFront: data.idCardFront.name,
        idCardBack: data.idCardBack.name,
        license: data.license?.name
      });

      toast.success('Documents prêts pour envoi');
      router.push('/driver/register/next-step');
    } catch (error) {
      toast.error('Erreur lors du traitement');
    }
  };

  const removeFile = (field: keyof IdentityUploadFormValues) => {
    form.setValue(field, undefined, { shouldValidate: true });
  };

  return {
    form,
    handleSubmit,
    removeFile,
    isSubmitting: form.formState.isSubmitting
  };
};