import { z } from 'zod';

export const gpsSchema = z.object({
  activateLocation: z.boolean(),
});

export const userPreferenceSchema = z.object({
  id: z.string().optional(),
  activateLocation: z.boolean().optional(),
  activateNotifications: z.boolean().optional(),
  language: z.string().optional(),
  theme: z.string().optional(),
  vehicleTypeIds: z.array(z.string()).optional(),
});

export type GpsFormData = z.infer<typeof gpsSchema>;
export type UserPreferenceFormData = z.infer<typeof userPreferenceSchema>;