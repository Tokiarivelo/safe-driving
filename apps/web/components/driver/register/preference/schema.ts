import { z } from 'zod';

export const experiencePreferencesSchema = z.object({
  theme: z.object({
    light: z.boolean(),
    dark: z.boolean()
  }),
  language: z.enum(['french', 'english'])
});

export type ExperiencePreferencesValues = z.infer<typeof experiencePreferencesSchema>;