import { z } from 'zod';

export const vehicleInfoSchema = z.object({
  brand: z.string().min(2, 'La marque doit contenir au moins 2 caractères'),
  model: z.string().min(1, 'Le modèle est requis'),
  plate: z.string()
    .min(4, 'La plaque doit contenir au moins 4 caractères')
    .max(15, 'La plaque est trop longue'),
  seats: z.coerce.number()
    .min(2, 'Minimum 2 places')
    .max(10, 'Maximum 10 places'),
  type: z.string().min(2, 'Le type doit contenir au moins 2 caractères')
});

export type VehicleInfoFormValues = z.infer<typeof vehicleInfoSchema>;