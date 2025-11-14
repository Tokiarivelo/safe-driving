'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  useUpsertUserPreferenceMutation,
  useCreateVehicleTypeMutation,
  useCreateUserQrsMutation,
  useUpdateUserMutation,
  UserPreferenceUpsertInput,
} from '@/graphql/generated/graphql';
import { useRouter } from 'next/navigation';
import { ClientSchemaType, ClientSchema } from './recapitulatuf.schema';
import { useGetVehicleTypesQuery } from '@/graphql/generated/graphql';

interface VehicleTypeCreateInput {
  name: string;
}

export const submitClientData = async (formData: ClientSchemaType) => {
  const validation = ClientSchema.safeParse(formData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.format(),
    };
  }

  try {
    const results = await Promise.all([]);

    toast.success(`Préférences sauvegardées 🎉`, {
      description: `Vos préférences ont été enregistrées avec succès !`,
    });

    return {
      success: true,
      data: results,
    };
  } catch (error) {
    console.error('Error submitting client data:', error);
    toast.error('Erreur lors de la sauvegarde', {
      description: 'Une erreur inattendue est survenue',
    });

    return {
      success: false,
      errors: { general: 'Une erreur inattendue est survenue' },
    };
  }
};

export const usePreference = () => {
  const {
    data,
    error,
    loading: queryLoading,
  } = useGetVehicleTypesQuery({
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
  const datas = data;
  const [upsertUserPreferenceMutation, { loading: userPrefLoading }] =
    useUpsertUserPreferenceMutation();
  const [createVehicleTypeMutation, { loading: vehicleLoading }] = useCreateVehicleTypeMutation();
  const [createUserQrMutation, { loading: qrLoading }] = useCreateUserQrsMutation();
  const [updateUser, { loading: loadingUpdateUser }] = useUpdateUserMutation();
  const [errors, setErrors] = useState<any>(null);
  const router = useRouter();

  const loading = useMemo(
    () => userPrefLoading || vehicleLoading || qrLoading || loadingUpdateUser || queryLoading,
    [userPrefLoading, vehicleLoading, qrLoading, loadingUpdateUser, queryLoading],
  );

  const handleCreateQr = async () => {
    try {
      const result = await (createUserQrMutation as any)({
        variables: {
          type: 'png',
        },
      });
      toast.success('QR code créé avec succès !🎉');
      return result;
    } catch (error: any) {
      console.error('Error creating QR:', error);

      // Check raha unique constraint error
      if (error.message?.includes('Unique constraint') || error.message?.includes('email')) {
        toast.warning('Utilisateur déjà existant', {
          description: 'QR code non créé car utilisateur existe déjà',
        });
        return { success: false, reason: 'user_exists' };
      }

      toast.error('Erreur lors de la création du QR code');
      throw error;
    }
  };

  const submitClientData = async (formData: ClientSchemaType) => {
    setErrors(null);
    const validation = ClientSchema.safeParse(formData);

    if (!validation.success) {
      const formattedErrors = validation.error.format();
      setErrors(formattedErrors);
      return {
        success: false,
        errors: formattedErrors,
      };
    }

    try {
      const validatedData = validation.data;
      const userPreferenceInput: UserPreferenceUpsertInput = {
        theme: validatedData.theme,
        language: validatedData.country,
        activateLocation: validatedData.activateLocation ?? false,
        activateNotifications: validatedData.activateNotifications ?? false,
        activateEmailNotifications: validatedData.activateNotifications ?? true,
        activateSmsNotifications: validatedData.activateNotifications ?? true,
        preferedVehicleTypeIds: validatedData.typetrasport,
      };

      const { data: userPrefData, errors: userPrefErrors } = await upsertUserPreferenceMutation({
        variables: { input: userPreferenceInput },
        errorPolicy: 'all',
      });

      await updateUser({
        variables: {
          input: {
            isVerified: {
              set: true,
            },
          },
        },
      });

      if (userPrefErrors && userPrefErrors.length > 0) {
        toast.error('Erreur lors de la sauvegarde des préférences', {
          description: userPrefErrors.map(err => err.message).join(', '),
        });
        return {
          success: false,
          errors: { general: userPrefErrors.map(err => err.message).join(', ') },
        };
      }

      try {
        await handleCreateQr();
      } catch (qrError) {
        console.warn('QR creation failed, continuing...', qrError);
      }

      toast.success(`Préférences sauvegardées 🎉`, {
        description: `Vos préférences ont été enregistrées avec succès ! Redirection en cours...`,
      });

      router.push('/user/form/codeqr');

      return {
        success: true,
        data: {
          userPreferences: userPrefData,
          vehicleTypes: validatedData.typetrasport,
        },
      };
    } catch (error) {
      console.error('Error submitting client data:', error);
      toast.error('Erreur lors de la sauvegarde', {
        description: 'Une erreur inattendue est survenue',
      });

      setErrors({ general: 'Une erreur inattendue est survenue' });
      return {
        success: false,
        errors: { general: 'Une erreur inattendue est survenue' },
      };
    }
  };

  const navigateToRecap = () => {
    // router.push('/user/form/codeqr');
  };

  return {
    datas,
    loading,
    errors,
    submitClientData,
    handleCreateQr,
    navigateToRecap,
    setErrors,
  };
};

export default usePreference;
