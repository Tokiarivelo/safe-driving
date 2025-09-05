import { z } from 'zod';

export const ClientSchema = z.object({
  typetrasport: z
    .array(z.string(), { message: 'Champ obligatoire' })
    .min(1, { message: 'Veuillez choisir un type de transport' }),
  country: z.string({ message: 'Choisissez un pays' }).min(1, { message: 'Sélectionnez un pays' }),
  theme: z
    .string({ message: 'Champ theme obligatoire' })
    .min(1, { message: 'Sélectionnez un thème : sombre ou clair' })
    .refine(val => ['dark', 'claire'].includes(val), {
      message: 'Sélectionnez un thème : sombre ou clair',
    }),
  preferedvelicles: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .optional(),
});

export type ClientSchemaType = z.infer<typeof ClientSchema>;
