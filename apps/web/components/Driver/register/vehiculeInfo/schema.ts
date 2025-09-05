import { z } from 'zod';

export const vehicleInfoSchema = z.object({
  brand: z.string().min(1, 'La marque est requise'),
  model: z.string().min(1, 'Le modèle est requis'),
  plate: z.string().min(1, 'La plaque d\'immatriculation est requise'),
  seats: z.number().min(1, 'Le nombre de places doit être au moins 1').max(10, 'Le nombre de places ne peut pas dépasser 10'),
  type: z.string().min(1, 'Le type de véhicule est requis'),
});

export type VehicleInfoFormValues = z.infer<typeof vehicleInfoSchema>;