import { z } from 'zod';

export const personalInfoSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide')
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;