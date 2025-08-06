import { z } from 'zod';
export const signupShema = z
  .object({
       email: z
      .string()
      .email({
        message: 'Email invalide',
      })
      .toLowerCase()
      .trim(),
  })
export type ShowPasswordFormValues = z.infer<typeof signupShema>;
