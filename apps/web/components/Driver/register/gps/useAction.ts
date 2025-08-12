'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { locationPermissionSchema, LocationPermissionValues } from './schema';
import { useRouter } from 'next/navigation';
import { useLocationContext } from './LocationContext';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

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
      locationEnabled: isEnabled,
      rememberChoice: rememberChoice
    }
  });

  useEffect(() => {
    form.setValue('locationEnabled', isEnabled);
    form.setValue('rememberChoice', rememberChoice);
  }, [isEnabled, rememberChoice, form]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (currentPosition && onLocationUpdate) {
      onLocationUpdate(currentPosition);
    }
  }, [currentPosition, onLocationUpdate]);

  const checkLocationSupport = () => {
    if (!isClient || typeof window === 'undefined') {
      return false;
    }
    return !!navigator.geolocation;
  };

  const getCurrentLocation = async () => {
    if (!hasPermission || !checkLocationSupport()) {
      throw new Error("Permission de géolocalisation requise");
    }

    setIsGettingLocation(true);
    try {
      await updateLocation();
      if (currentPosition && onLocationUpdate) {
        onLocationUpdate(currentPosition);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de position:', error);
      throw error;
    } finally {
      setIsGettingLocation(false);
    }
  };

  const onSubmit = async (data: LocationPermissionValues) => {
    setIsLoading(true);
    
    try {
      setLocationEnabled(data.locationEnabled);
      setRememberChoice(data.rememberChoice);

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

      router.push('/notif');
      
      return { success: true };
      
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur inconnue' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    isLoading,
    checkLocationSupport,
    isClient,
    currentPosition,
    hasPermission,
    isGettingLocation,
    getCurrentLocation
  };
};