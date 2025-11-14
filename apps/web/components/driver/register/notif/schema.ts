import { z } from 'zod';

export const notificationPreferencesSchema = z.object({
  sms: z.boolean(),
  email: z.boolean(),
  push: z.boolean()
    .refine((val) => {
      if (!val) return true;
      
      if (typeof window === 'undefined' || !('Notification' in window)) {
        return false;
      }
      
      return Notification.permission === 'granted' || Notification.permission === 'default';
    }, {
      message: "Les notifications push doivent être autorisées dans le navigateur"
    })
});

export type NotificationPreferencesValues = z.infer<typeof notificationPreferencesSchema>;