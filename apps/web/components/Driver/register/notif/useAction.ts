'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { notificationPreferencesSchema, NotificationPreferencesValues } from './schema';

export const useNotificationPreferences = (initialPrefs?: Partial<NotificationPreferencesValues>) => {
  const router = useRouter();
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
    if (field === 'push' && value) {
      const granted = await requestBrowserNotification();
      if (!granted) return false;
    }
    
    form.setValue(field, value, { shouldValidate: true });
    return true;
  };

  const onSubmit = async (data: NotificationPreferencesValues) => {
    setIsSubmitting(true);
    try {
      router.push('/preference');
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
    onSubmit,
    isPushSupported: typeof window !== 'undefined' && 'Notification' in window
  };
};