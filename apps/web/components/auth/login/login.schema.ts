import { z } from 'zod';
export const loginSchema = z.object({
  email: z
      .string()
      .email({
        message: 'Email invalide',
      })
      .toLowerCase()
      .trim(),
    password: z
      .string()
      .min(8, {
        message: 'Au moins 8 caractères',
      })
      .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule.')
      .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule.')
      .regex(/\d/, 'Le mot de passe doit contenir au moins un chiffre.')
      .regex(
        /[!@#$%^&*()_+={}\[\]|:;"'<>,.?/~`]/,
        'Le mot de passe doit contenir au moins un caractère spécial.',
      ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
