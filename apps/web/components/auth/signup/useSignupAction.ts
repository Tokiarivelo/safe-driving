'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRegisterMutation } from '@/graphql/generated/graphql';
import { useRouter } from 'next/navigation';
import { SignUpFormValues, signupShema } from './signup.schema';

export const useRegister = () => {
  const [mutationLogin, { loading, error }] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupShema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      username: '',
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const register = async (values: SignUpFormValues) => {
    try {
      const { confirmPassword, ...dataInput } = values;
      const { data, errors } = await mutationLogin({
        variables: {
          data: dataInput,
        },
      });

      if (errors) {
        return toast.error('Erreur lors de la création du compte', {
          description: 'Une erreur est survenue',
        });
      }

      const user = data?.register?.id;

      if (!user) {
        return toast.error('Erreur lors de la création du compte', {
          description: 'Une erreur est survenue',
        });
      }

      toast.success(`Inscription réussie 🎉`, {
        description: `Votre inscription a été enregistré ! Redirection en cours...`,
      });

      router.replace('/login'); // Redirection vers la page d'accueil
      return data;

      // Redirection ou gestion de la réussite
    } catch (error) {
      toast.error('Erreur lors de la création du compte', {
        description: 'Une erreur est survenue',
      });
    }
  };

  return {
    form,
    loading,
    showPassword,
    register,
    handleShowPassword,
    error,
  };
};
