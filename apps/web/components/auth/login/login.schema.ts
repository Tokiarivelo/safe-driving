import { z } from 'zod';
export const loginSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Email invalide',
    })
    .toLowerCase()
    .trim(),
  password: z.string(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
