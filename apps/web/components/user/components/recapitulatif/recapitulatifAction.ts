import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  useUpsertUserPreferenceMutation, 
  useGetMyUserPreferenceQuery,
  useGetVehicleTypesQuery,
  UserPreferenceUpsertInput 
} from '@/graphql/generated/graphql';
import { useRouter } from 'next/navigation';
import { ClientSchemaType, ClientSchema, ClientSchemaCore } from './recapitulatuf.schema';

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
    const results = await Promise.all([
    ]);

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

export const useRegister = () => {
  const [upsertUserPreferenceMutation, { loading: userPrefLoading }] = useUpsertUserPreferenceMutation();
  
  const { 
    data: userPreferenceData, 
    loading: loadingUserPref, 
    refetch: refetchUserPreference 
  } = useGetMyUserPreferenceQuery({
    errorPolicy: 'all'
  });
  
  const { 
    data: vehicleTypesData, 
    loading: loadingVehicleTypes 
  } = useGetVehicleTypesQuery({
    errorPolicy: 'all'
  });
  
  const [errors, setErrors] = useState<any>(null);
  const router = useRouter();

  const loading = userPrefLoading || loadingUserPref;
  const availableVehicleTypes = vehicleTypesData?.vehicleTypes || [];
  const currentUserPreference = userPreferenceData?.userPreference;

  const submitClientData = async (formData: ClientSchemaType) => {
    setErrors(null);
    
    const coreValidation = ClientSchemaCore.safeParse({
      typetrasport: formData.typetrasport,
      country: formData.country,
      theme: formData.theme,
    });
    
    if (!coreValidation.success) {
      const formattedErrors = coreValidation.error.format();
      setErrors(formattedErrors);
      return {
        success: false,
        errors: formattedErrors,
      };
    }

    try {
      const validatedData = coreValidation.data;
      const userPreferenceInput: UserPreferenceUpsertInput = {
        theme: validatedData.theme,
        language: validatedData.country,
        activateNotifications: formData.activateNotifications,
        activateEmailNotifications: formData.activateEmailNotifications,
        activateSmsNotifications: formData.activateSmsNotifications,
        activateLocation: formData.activateLocation,
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

      await refetchUserPreference();

      toast.success(`Préférences sauvegardées 🎉`, {
        description: `Vos préférences ont été enregistrées avec succès ! Redirection en cours...`,
      });

      router.push('/user/form/name/recapitulatif');

      return {
        success: true,
        data: { 
          userPreferences: userPrefData,
          preferedVehicles: userPrefData?.upsertUserPreference?.preferedvelicles || []
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

  const getInitialFormData = (): ClientSchemaType => {
    if (currentUserPreference) {
      return {
        theme: currentUserPreference.theme || '',
        country: currentUserPreference.language || '',
        typetrasport: currentUserPreference.preferedvelicles?.map(v => v.name) || [],
        activateNotifications: currentUserPreference.activateNotifications || false,
        activateEmailNotifications: currentUserPreference.activateEmailNotifications || false,
        activateSmsNotifications: currentUserPreference.activateSmsNotifications || false,
        activateLocation: currentUserPreference.activateLocation || false,
      };
    }
    return {
      theme: '',
      country: '',
      typetrasport: [],
      activateNotifications: false,
      activateEmailNotifications: false,
      activateSmsNotifications: false,
      activateLocation: false,
    };
  };

  return {
    loading,
    errors,
    submitClientData,
    navigateToRecap,
    setErrors,
    currentUserPreference,
    availableVehicleTypes,
    loadingUserPref,
    loadingVehicleTypes,
    getInitialFormData,
    refetchUserPreference,
  };
};

export default useRegister;