// types/notification.ts
export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface FCMToken {
  token: string;
  userId?: string;
  deviceInfo?: {
    userAgent: string;
    timestamp: number;
  };
}

export interface NotificationConfig {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: Record<string, any>;
  actions?: NotificationAction[];
}

// Ovaina ny anarana mba hisoroka conflict amin'ny Firebase types
export interface CustomNotificationPayload {
  notification: {
    title: string;
    body: string;
    icon?: string;
  };
  data?: Record<string, string>;
}