'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRegisterUserMutation } from '@/graphql/generated/graphql';
import { useRouter } from 'next/navigation';
import { SignUpFormValues, signupSchema } from './signup.schema';

export const useRegister = () => {
  const [mutationRegister, { loading, error }] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Fonction pour capitaliser le texte en temps réel
  const capitalizeText = (text: string) => {
    return text
      .toLowerCase()
      .split(/(\s+|-)/)
      .map(part => {
        if (part.match(/\s+|-/)) return part; // Garde les espaces et traits d'union
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
      .join('');
  };

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowPasswords = () => setShowPasswords(!showPasswords);

  const register = async (values: SignUpFormValues) => {
    try {
      const { confirmPassword, ...dataInput } = values;

      const { data, errors } = await mutationRegister({
        variables: {
          data: { ...dataInput },
          // data: {...dataInput, username: dataInput.email},
        },
      });

      if (errors) {
        return toast.error('Erreur lors de la création du compte', {
          description: errors.map(err => err.message).join(', '),
        });
      }

      const user = data?.register?.id;
      if (!user) {
        return toast.error('Erreur lors de la création du compte', {
          description: 'Aucune donnée utilisateur retournée',
        });
      }

      toast.success(`Inscription réussie 🎉`, {
        description: `Votre inscription a été enregistrée ! Redirection en cours...`,
      });

      router.replace('/login');
      return data;
    } catch (err) {
      toast.error('Erreur lors de la création du compte', {
        description: 'Une erreur inattendue est survenue',
      });
      console.error(err);
    }
  };

  return {
    form,
    loading,
    showPassword,
    showPasswords,
    register,
    handleShowPassword,
    handleShowPasswords,
    capitalizeText, // Nouvelle fonction exportée
    error,
  };
};

export default useRegister;
