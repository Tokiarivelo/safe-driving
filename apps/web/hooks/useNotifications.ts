// hooks/useNotifications.ts
import { useEffect, useState } from 'react';
import { requestPermission, listenForMessages, showTestNotification } from '../utils/notifications';
import { FCMNotificationPayload } from '../utils/notifications';

interface UseNotificationsReturn {
  token: string | null;
  isSupported: boolean;
  permission: string;
  requestPermission: () => Promise<void>;
  showTest: () => void;
}

export function useNotifications(): UseNotificationsReturn {
  const [token, setToken] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [permission, setPermission] = useState<string>('default');

  useEffect(() => {
    const supported =
      typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;

    setIsSupported(supported);

    if (supported) {
      setPermission(Notification.permission);

      // Listen for messages
      listenForMessages((payload: FCMNotificationPayload) => {
        console.log('Push notification received:', payload);

        const WindowNotification = (window as any).Notification;
        if (payload.notification && WindowNotification.permission === 'granted') {
          try {
            const notification = new WindowNotification(payload.notification.title, {
              body: payload.notification.body,
              icon: payload.notification.icon || '/favicon.ico',
            });

            notification.onclick = () => {
              window.focus();
              notification.close();
            };
          } catch (error) {
            console.error('Error showing notification:', error);
          }
        }
      });
    }
  }, []);

  const handleRequestPermission = async (): Promise<void> => {
    try {
      const fcmToken = await requestPermission();
      if (fcmToken) {
        setToken(fcmToken);
        setPermission('granted');

        // Save token to backend
        await saveTokenToBackend(fcmToken);

        // Show test notification
        showTestNotification();
      } else {
        setPermission(Notification.permission);
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };

  return {
    token,
    isSupported,
    permission,
    requestPermission: handleRequestPermission,
    showTest: showTestNotification,
  };
}

async function saveTokenToBackend(token: string): Promise<void> {
  try {
    const response = await fetch('/api/save-fcm-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error('Failed to save token');
    }

    console.log('Token saved successfully');
  } catch (error) {
    console.error('Error saving token:', error);
  }
}
