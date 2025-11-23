'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  useUpsertUserPreferenceMutation,
  useCreateVehicleTypeMutation,
} from '@/graphql/generated/graphql';
import { useRouter } from 'next/navigation';
import { ClientSchemaType, ClientSchema } from './preference.shema';
import { useGetVehicleTypesQuery } from '@/graphql/generated/graphql';

interface UserPreferenceUpsertInput {
  theme: string;
  language: string;
  preferedVehicleTypeIds: string[];
}

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

export const usepreference = () => {
  const {
    data,
  } = useGetVehicleTypesQuery({
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
  const datas = data;
  const [upsertUserPreferenceMutation, { loading: userPrefLoading }] =
    useUpsertUserPreferenceMutation();
  const [createVehicleTypeMutation, { loading: vehicleLoading }] = useCreateVehicleTypeMutation();
  const [errors, setErrors] = useState<any>(null);
  const router = useRouter();

  const loading = userPrefLoading || vehicleLoading;

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
        preferedVehicleTypeIds: validatedData.typetrasport || [],
      };

      const { data: userPrefData, errors: userPrefErrors } = await upsertUserPreferenceMutation({
        variables: { input: userPreferenceInput },
        errorPolicy: 'all',
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

      toast.success(`Préférences sauvegardées 🎉`, {
        description: `Vos préférences ont été enregistrées avec succès ! Redirection en cours...`,
      });

      router.push('/user/form/name/recapitulatif');

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
    router.push('/user/form/name/recapitulatif');
  };

  return {
    datas,
    loading,
    errors,
    submitClientData,
    navigateToRecap,
    setErrors,
  };
};

export default usepreference;
