'use client';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useUpsertUserPreferenceMutation, UserPreferenceUpsertInput } from '@/graphql/generated/graphql';

export const useNotificationSettings = () => {
  const [gpsEnabled, setGpsEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [upsertUserPreferenceMutation] = useUpsertUserPreferenceMutation();

  const toggleGps = useCallback(
    async (enable: boolean, retryCount = 0): Promise<boolean> => {
      setLoading(true);

      try {
        const input: UserPreferenceUpsertInput = { activateNotifications: enable };

        const { data, errors } = await upsertUserPreferenceMutation({
          variables: { input },
          errorPolicy: 'all',
        });

        if (data && data.upsertUserPreference) {
          const newState = data.upsertUserPreference.activateLocation ?? false;
          setGpsEnabled(newState);

          const message = newState
            ? '🎉 Notification activé ! Position détectée 📍'
            : '⚠️ Notification désactivé ! Position non détectée 🚫';

          toast.success(message, { duration: 2000, position: 'top-right' });
          return true;
        }

          if (!data && errors && retryCount < 1) {
          return toggleGps(enable, retryCount + 1);
        }

        let serverMessage = 'Erreur lors de la mise à jour du Notification.';
        if (errors && errors.length > 0) {
          serverMessage = errors[0].message || serverMessage;
        }
        throw new Error(serverMessage);
      } catch (err: any) {
        let message = 'Un problème inconnu est survenu avec le Notification.';
        if (err.networkError) message = 'Impossible de se connecter au serveur.';
        else if (err.graphQLErrors?.length) message = err.graphQLErrors[0].message || message;
        else if (err.message) message = err.message;

        toast.error(message, { duration: 2000, position: 'top-right' });
        return false;
      } finally {
        setLoading(false);
      }
    },
    [upsertUserPreferenceMutation]
  );

  return {
    gpsEnabled,
    toggleGps,
    loading,
  };
};
