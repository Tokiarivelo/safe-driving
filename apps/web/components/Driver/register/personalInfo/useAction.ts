'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema } from './schema';
import type { PersonalInfoFormValues } from './schema';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useMeQuery, useUpdateUserMutation } from '@/graphql/generated/graphql';

export const usePersonalInfoAction = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { data: userData, loading: queryLoading, error: queryError } = useMeQuery({
    skip: status !== 'authenticated', 
  });
  
  const [updateUser, { loading: updateLoading, error: updateError }] = useUpdateUserMutation();

  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (userData?.me) {
      form.reset({
        name: `${userData.me.firstName || ''} ${userData.me.lastName || ''}`.trim(),
        email: userData.me.email || '',
        phone: userData.me.phone || '',
      });
    }
  }, [userData, form]);

  const handleFormSubmit = async (values: PersonalInfoFormValues) => {
    try {
      const nameParts = values.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
  
      const { data } = await updateUser({
        variables: {
          input: {
            firstName: { set: firstName },
            lastName: { set: lastName },
            email: { set: values.email },
            phone: { set: values.phone },
          },
        },
      });
  
      if (data?.updateUser) {
        toast.success('Informations mises à jour avec succès');
        router.push('/identityUpload');
        return true;
      } else {
        toast.error('Erreur lors de la mise à jour');
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast.error('Erreur lors de la mise à jour');
      return false;
    }
  };

  return {
    form,
    handleFormSubmit,
    loading: queryLoading || updateLoading,
    error: queryError || updateError,
    userData: userData?.me,
  };
};