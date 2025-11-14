"use client";
import { z } from 'zod';

const fileSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  lastModified: z.number().optional(),
}).refine(
  (file) => file.size <= 5_000_000,
  'Le fichier doit faire moins de 5MB'
).transform((obj) => {
  if (typeof File !== 'undefined' && obj instanceof File) {
    return obj;
  }
  return new File([], obj.name, { 
    type: obj.type,
    lastModified: obj.lastModified 
  });
});

export const vehicleDocumentsSchema = z.object({
  registrationFiles: z.array(fileSchema).min(1, 'Le certificat est requis'),
  insuranceFiles: z.array(fileSchema).min(1, "L'attestation est requise"),
  vehiclePhotos: z.array(fileSchema).min(3, 'Minimum 3 photos requises')
});

export type VehicleDocumentsFormValues = z.infer<typeof vehicleDocumentsSchema>;