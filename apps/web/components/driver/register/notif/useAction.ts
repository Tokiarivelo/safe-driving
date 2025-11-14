'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  useUpsertUserPreferenceMutation, 
  useGetMyUserPreferenceQuery 
} from '@/graphql/generated/graphql';
import { toast } from 'sonner';
import { notificationPreferencesSchema, NotificationPreferencesValues } from './schema';

export const useNotificationPreferences = (initialPrefs?: Partial<NotificationPreferencesValues>) => {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [upsertUserPreference] = useUpsertUserPreferenceMutation();
  const { data: preferenceData } = useGetMyUserPreferenceQuery({
    skip: !session?.user?.id
  });

  const [browserPermission, setBrowserPermission] = useState<NotificationPermission>('default');
  const [isRequesting, setIsRequesting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NotificationPreferencesValues>({
    resolver: zodResolver(notificationPreferencesSchema),
    defaultValues: {
      sms: initialPrefs?.sms ?? false,
      email: initialPrefs?.email ?? false,
      push: initialPrefs?.push ?? false
    },
    mode: 'onChange'
  });

  // Synchroniser les valeurs du formulaire avec les données de la base
  useEffect(() => {
    if (preferenceData?.userPreference) {
      const dbNotifications = preferenceData.userPreference.activateNotifications;
      const dbSmsNotifications = preferenceData.userPreference.activateSmsNotifications;
      const dbEmailNotifications = preferenceData.userPreference.activateEmailNotifications;
      
      if (dbNotifications !== null) {
        form.setValue('push', dbNotifications);
      }
      
      if (dbSmsNotifications !== null) {
        form.setValue('sms', dbSmsNotifications);
      }
      
      if (dbEmailNotifications !== null) {
        form.setValue('email', dbEmailNotifications);
      }
    }
  }, [preferenceData, form]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setBrowserPermission(Notification.permission);
    }
  }, []);

  const requestBrowserNotification = async () => {
    if (!('Notification' in window)) return false;
    
    setIsRequesting(true);
    try {
      const permission = await Notification.requestPermission();
      setBrowserPermission(permission);
      
      if (permission === 'granted') {
        new Notification('Notifications activées', {
          body: 'Vous recevrez maintenant les notifications de cette application.',
          icon: '/favicon.ico'
        });
      }
      
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    } finally {
      setIsRequesting(false);
    }
  };

  const handlePreferenceChange = async (field: keyof NotificationPreferencesValues, value: boolean) => {
    if (!session?.user?.id) {
      toast.error('Utilisateur non connecté');
      return false;
    }

    if (field === 'push' && value) {
      const granted = await requestBrowserNotification();
      if (!granted) return false;
    }

    form.setValue(field, value, { shouldValidate: true });

    // Sauvegarder immédiatement en base de données
    try {
      let input: any = {};
      
      switch (field) {
        case 'push':
          input = { activateNotifications: value };
          break;
        case 'sms':
          input = { activateSmsNotifications: value };
          break;
        case 'email':
          input = { activateEmailNotifications: value };
          break;
      }

      const { errors } = await upsertUserPreference({
        variables: { input }
      });

      if (errors) {
        console.error('Erreurs GraphQL lors de la sauvegarde:', errors);
        toast.error('Erreur lors de la sauvegarde');
        return false;
      }

      const notificationTypes = {
        push: 'notifications push',
        sms: 'notifications SMS',
        email: 'notifications email'
      };

      toast.success(`${notificationTypes[field]} ${value ? 'activées' : 'désactivées'}`);
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde');
      return false;
    }
  };

  const onSubmit = async (data: NotificationPreferencesValues) => {
    if (!session?.user?.id) {
      toast.error('Utilisateur non connecté');
      return { success: false, error: 'Utilisateur non connecté' };
    }

    setIsSubmitting(true);
    
    try {
      // Sauvegarder toutes les préférences de notifications en base de données
      const { errors } = await upsertUserPreference({
        variables: {
          input: {
            activateNotifications: data.push,
            activateSmsNotifications: data.sms,
            activateEmailNotifications: data.email
          }
        }
      });

      if (errors) {
        console.error('Erreurs GraphQL:', errors);
        throw new Error(errors.map(e => e.message).join(', '));
      }
      
      toast.success('Préférences de notifications sauvegardées avec succès');
      router.push('/preference');
      
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences de notifications:', error);
      toast.error('Erreur lors de la sauvegarde des préférences de notifications');
      
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur inconnue' 
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    preferences: form.watch(),
    browserPermission,
    isRequesting,
    isSubmitting,
    handlePreferenceChange,
    onSubmit: form.handleSubmit(onSubmit),
    isPushSupported: typeof window !== 'undefined' && 'Notification' in window,
    userPreference: preferenceData?.userPreference
  };
};