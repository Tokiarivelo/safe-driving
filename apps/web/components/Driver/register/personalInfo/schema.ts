import { z } from 'zod';

export const personalInfoSchema = z.object({
  name: z.string().min(1, 'Le nom complet est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;