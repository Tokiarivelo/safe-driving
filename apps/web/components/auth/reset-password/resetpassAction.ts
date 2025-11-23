'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useResetPasswordMutation } from '@/graphql/generated/graphql';
import { useRouter, useSearchParams } from 'next/navigation';
import { RessetpassFormValues, resetpassSchema } from './ressetpass.schema';

export const useResetPassword = () => {
  const [mutationResetPassword, { loading, error }] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setSessionToken(token);
    } else {
      toast.error('Lien invalide ou expiré', {
        description: 'Aucun jeton trouvé dans l’URL',
      });
    }
  }, [searchParams]);

  const form = useForm<RessetpassFormValues>({
    resolver: zodResolver(resetpassSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleShowPassword = () => setShowPassword(prev => !prev);
  const handleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const resetPassword = async (values: RessetpassFormValues) => {
    try {
      const { password } = values;

      if (!sessionToken) {
        toast.error('Jeton manquant', {
          description: 'Impossible de réinitialiser le mot de passe sans jeton.',
        });
        return;
      }

      const { data, errors } = await mutationResetPassword({
        variables: {
          newPassword: password,
          sessionToken,
        },
      });

      if (errors && errors.length > 0) {
        toast.error('Erreur serveur', {
          description: errors.map(e => e.message).join(', '),
        });
        return;
      }

      const success = data?.resetPassword;
      if (!success) {
        toast.error('Échec de la réinitialisation', {
          description: 'Le mot de passe n’a pas été mis à jour.',
        });
        return;
      }

      toast.success('Mot de passe mis à jour 🎉', {
        description: 'Vous allez être redirigé vers la connexion...',
      });

      router.replace('/login');
    } catch (err) {
      console.error('Reset error:', err);
      toast.error('Erreur inattendue', {
        description: 'Merci de réessayer plus tard.',
      });
    }
  };

  return {
    form,
    loading,
    showPassword,
    showConfirmPassword,
    resetPassword,
    handleShowPassword,
    handleShowConfirmPassword,
    error,
  };
};

export default useResetPassword;
