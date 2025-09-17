'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { locationPermissionSchema, LocationPermissionValues } from './schema';
import { useRouter } from 'next/navigation';
import { useLocationContext } from './LocationContext';
import { useSession } from 'next-auth/react';
import { 
  useUpsertUserPreferenceMutation, 
  useGetMyUserPreferenceQuery
} from '@/graphql/generated/graphql';
import { toast } from 'sonner';

type UseLocationPermissionActionProps = {
  onSuccess?: (data: {
    locationEnabled: boolean;
    rememberChoice: boolean;
    hasPermission: boolean;
    position?: GeolocationPosition;
  }) => void;
  onLocationUpdate?: (position: GeolocationPosition) => void;
};

export const useLocationPermissionAction = ({
  onSuccess,
  onLocationUpdate
}: UseLocationPermissionActionProps = {}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [upsertUserPreference] = useUpsertUserPreferenceMutation();
  const { data: preferenceData } = useGetMyUserPreferenceQuery({
    skip: !session?.user?.id
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const hasInitialized = useRef(false);
  const lastPreferenceData = useRef<any>(null);

  const {
    isEnabled,
    hasPermission,
    currentPosition,
    rememberChoice,
    setLocationEnabled,
    setRememberChoice,
    requestPermission,
    updateLocation,
  } = useLocationContext();

  const form = useForm<LocationPermissionValues>({
    resolver: zodResolver(locationPermissionSchema),
    defaultValues: {
      locationEnabled: false,
      rememberChoice: false
    }
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (preferenceData?.userPreference && 
        (!hasInitialized.current || lastPreferenceData.current?.activateLocation !== preferenceData.userPreference.activateLocation)) {
      
      lastPreferenceData.current = preferenceData.userPreference;
      hasInitialized.current = true;
      
      const activateLocation = preferenceData.userPreference.activateLocation;
      form.setValue('locationEnabled', activateLocation);
      
      setTimeout(() => {
        setLocationEnabled(activateLocation);
      }, 0);
    }
  }, [preferenceData?.userPreference?.activateLocation]); 

  useEffect(() => {
    if (currentPosition && onLocationUpdate) {
      onLocationUpdate(currentPosition);
    }
  }, [currentPosition]); 

  const checkLocationSupport = useCallback(() => {
    if (!isClient || typeof window === 'undefined') {
      return false;
    }
    return !!navigator.geolocation;
  }, [isClient]);

  const getCurrentLocation = useCallback(async () => {
    if (!hasPermission || !checkLocationSupport()) {
      throw new Error("Permission de géolocalisation requise");
    }

    setIsGettingLocation(true);
    try {
      await updateLocation();
    } catch (error) {
      console.error('Erreur lors de la récupération de position:', error);
      throw error;
    } finally {
      setIsGettingLocation(false);
    }
  }, [hasPermission, checkLocationSupport, updateLocation]);

  const onSubmit = useCallback(async (data: LocationPermissionValues) => {
    if (!session?.user?.id) {
      toast.error('Utilisateur non connecté');
      return { success: false, error: 'Utilisateur non connecté' };
    }

    setIsLoading(true);
    
    try {
      const { errors } = await upsertUserPreference({
        variables: {
          input: {
            activateLocation: data.locationEnabled
          }
        }
      });

      if (errors) {
        console.error('Erreurs GraphQL:', errors);
        throw new Error(errors.map(e => e.message).join(', '));
      }

      setTimeout(() => {
        setLocationEnabled(data.locationEnabled);
        setRememberChoice(data.rememberChoice);
      }, 0);

      if (data.locationEnabled) {
        try {
          const permissionGranted = await requestPermission();
          
          if (!permissionGranted) {
            throw new Error("Permission de géolocalisation refusée par l'utilisateur");
          }

          console.log('Permission accordée, position récupérée');
          
        } catch (err) {
          console.error("Erreur lors de la demande de permission GPS:", err);
          throw err;
        }
      }

      if (onSuccess) {
        onSuccess({
          locationEnabled: data.locationEnabled,
          rememberChoice: data.rememberChoice,
          hasPermission: data.locationEnabled ? hasPermission : false,
          position: currentPosition || undefined
        });
      }

      toast.success('Préférences de localisation enregistrées');
      
      setTimeout(() => {
        router.push('/notif');
      }, 100);
      
      return { success: true };
      
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error('Erreur lors de la sauvegarde des préférences');
      
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur inconnue' 
      };
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id, upsertUserPreference, requestPermission, hasPermission, currentPosition, onSuccess, router]);

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isLoading,
    checkLocationSupport,
    isClient,
    currentPosition,
    hasPermission,
    isGettingLocation,
    getCurrentLocation,
    userPreference: preferenceData?.userPreference,
    isLocationEnabled: isEnabled,
    locationRememberChoice: rememberChoice
  };
};