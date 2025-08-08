import { z } from 'zod';

const fileSchema = z.instanceof(File).refine(
  (file) => file.size <= 5_000_000,
  'Le fichier doit faire moins de 5MB'
);

export const vehicleDocumentsSchema = z.object({
  registrationFiles: z.array(fileSchema).min(1, 'Le certificat est requis'),
  insuranceFiles: z.array(fileSchema).min(1, "L'attestation est requise"),
  vehiclePhotos: z.array(fileSchema).min(3, 'Minimum 3 photos requises')
});

export type VehicleDocumentsFormValues = z.infer<typeof vehicleDocumentsSchema>;