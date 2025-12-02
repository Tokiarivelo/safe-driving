'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCreateUserQrsMutation, useUpdateUserMutation } from '@/graphql/generated/graphql';

export const useQrCodeForRecap = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const router = useRouter();

  const [createUserQrMutation] = useCreateUserQrsMutation();
  const [updateUserMutation] = useUpdateUserMutation();

  const handleCreateQrAndRedirect = async () => {
    setLoading(true);
    setError(null);

    try {
      await updateUserMutation({
        variables: {
          input: {
            isVerified: {
              set: true,
            },
          },
        },
      });
      const result = await createUserQrMutation({
        variables: { type: 'png' },
      });

      const url = result?.data?.createUserQr;
      if (!url) throw new Error('QR code non créé');

      setQrUrl(url);
      toast.success('QR code créé avec succès ! 🎉');

      router.push(`qrCode?qrUrl=${encodeURIComponent(url)}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la création du QR code');
      toast.error('Erreur lors de la création du QR code');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCreateQrAndRedirect,
    loading,
    error,
    qrUrl,
  };
};
