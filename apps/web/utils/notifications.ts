// utils/notifications.ts
import { messaging } from '../lib/firebase';
import { getToken, onMessage } from 'firebase/messaging';

interface FCMNotificationPayload {
  notification: {
    title: string;
    body: string;
    icon?: string;
  };
  data?: Record<string, string>;
}

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || 'your-vapid-key-here';

export async function requestPermission(): Promise<string | null> {
  if (typeof window === 'undefined' || !messaging) {
    console.log('Window or messaging not available');
    return null;
  }

  try {
    if (!('Notification' in window)) {
      console.log('Browser tsy manohana notifications');
      return null;
    }

    console.log('Current permission:', Notification.permission);

    let permission = Notification.permission;

    if (permission === 'default') {
      permission = await Notification.requestPermission();
      console.log('New permission:', permission);
    }

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
      });
      console.log('FCM Token:', token);
      return token;
    } else {
      console.log('Permission denied');
      return null;
    }
  } catch (error) {
    console.error('Error getting permission:', error);
    return null;
  }
}

export function listenForMessages(callback: (payload: FCMNotificationPayload) => void): void {
  if (typeof window === 'undefined' || !messaging) {
    return;
  }

  onMessage(messaging, payload => {
    console.log('Message received:', payload);
    callback(payload as FCMNotificationPayload);
  });
}

export function showTestNotification(): void {
  if ('Notification' in window && Notification.permission === 'granted') {
    const notification = new (window as any).Notification('Test Notification', {
      body: "🎉Notification push fonctionne bien !🔔",
      icon: '/favicon.ico',
      badge: '/favicon.ico',
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  }
}

export function isNotificationSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  );
}

export function getNotificationPermission(): NotificationPermission {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'default';
  }
  return Notification.permission;
}

export async function registerServiceWorker(): Promise<void> {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
}
export type { FCMNotificationPayload };
