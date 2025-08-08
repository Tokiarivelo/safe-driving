import { z } from 'zod';

const fileSchema = z.custom<File>((val) => {
  return val instanceof File || (typeof val === 'object' && val !== null && 'name' in val && 'size' in val && 'type' in val);
}, {
  message: 'Un fichier valide est requis'
});

export const identityUploadSchema = z.object({
  idCardFront: fileSchema.refine(
    (file) => file.size <= 5_000_000, 
    'Le fichier doit faire moins de 5MB'
  ),
  idCardBack: fileSchema.refine(
    (file) => file.size <= 5_000_000,
    'Le fichier doit faire moins de 5MB'
  ),
  license: fileSchema
    .refine((file) => file.size <= 5_000_000, 'Le fichier doit faire moins de 5MB')
    .optional()
});

export type IdentityUploadFormValues = z.infer<typeof identityUploadSchema>;