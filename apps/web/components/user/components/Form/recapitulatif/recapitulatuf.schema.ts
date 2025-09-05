import { z } from 'zod';

export const ClientSchema = z.object({
  typetrasport: z
    .array(z.string(), { message: 'Champ obligatoire' })
    .min(1, { message: 'Veuillez choisir au moins un type de transport' }),

  country: z.string({ message: 'Choisissez un pays' }).min(1, { message: 'Sélectionnez un pays' }),

  theme: z
    .string({ message: 'Champ thème obligatoire' })
    .min(1, { message: 'Sélectionnez un thème : sombre ou clair' })
    .refine(val => ['dark', 'claire'].includes(val), {
      message: 'Sélectionnez un thème : sombre ou clair',
    }),

  activateNotifications: z.boolean().optional(),
  activateEmailNotifications: z.boolean().optional(),
  activateSmsNotifications: z.boolean().optional(),
  activateLocation: z.boolean().optional(),
});

export const ClientSchemaCore = z.object({
  typetrasport: z
    .array(z.string(), { message: 'Champ obligatoire' })
    .min(1, { message: 'Veuillez choisir au moins un type de transport' }),
  country: z.string({ message: 'Choisissez un pays' }).min(1, { message: 'Sélectionnez un pays' }),
  theme: z
    .string({ message: 'Champ thème obligatoire' })
    .min(1, { message: 'Sélectionnez un thème : sombre ou clair' })
    .refine(val => ['dark', 'claire'].includes(val), {
      message: 'Sélectionnez un thème : sombre ou clair',
    }),
});

export type ClientSchemaType = z.infer<typeof ClientSchema>;
export type ClientSchemaCoreType = z.infer<typeof ClientSchemaCore>;
