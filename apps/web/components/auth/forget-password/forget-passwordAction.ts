'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useForgotPasswordMutation } from '@/graphql/generated/graphql';
import { useParams, useRouter } from 'next/navigation';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const useForgotPassword = () => {
  const [forgotPasswordMutation, { loading, error }] = useForgotPasswordMutation();
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || 'en-US';

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const transformResetUrl = (originalUrl: string): string => {
    try {
      const url = new URL(originalUrl);
      const token = url.searchParams.get('token');

      if (token) {
        return `/${locale}/reset-password?token=${token}`;
      }

      return originalUrl;
    } catch {
      return originalUrl;
    }
  };

  const submit = async (values: ForgotPasswordFormValues) => {
    try {
      const { data, errors } = await forgotPasswordMutation({
        variables: { email: values.email },
      });

      if (errors || !data?.forgotPassword?.resetLink) {
        toast.error('Échec de la demande de réinitialisation', {
          description: 'Aucun lien reçu. Veuillez réessayer.',
        });
        return;
      }

      const localResetLink = transformResetUrl(data.forgotPassword.resetLink);

      toast.success('Lien envoyé 🎉', {
        description: 'Redirection vers la page de réinitialisation...',
        duration: 4000,
      });

      //redirect automatique
      setTimeout(() => {
        router.push(localResetLink);
      }, 1500);

      // form.reset();
    } catch (e) {
      console.error('Forgot password error:', e);
      toast.error('Erreur inattendue', {
        description: 'Veuillez réessayer plus tard.',
      });
    }
  };

  return {
    form,
    loading,
    error,
    submit,
  };
};
