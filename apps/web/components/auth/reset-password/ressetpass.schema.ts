import { z } from 'zod';

export const resetpassSchema = z.object({
  password: z
    .string()
    .min(8, 'Au moins 8 caractères')
    .max(128, 'Le mot de passe ne peut pas dépasser 128 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule.')
      .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une lettre minuscule.')
      .regex(/\d/, 'Le mot de passe doit contenir au moins un chiffre.')
      .regex(
        /[!@#$%^&*()_+={}\[\]|:;"'<>,.?/~`]/,
        'Le mot de passe doit contenir au moins un caractère spécial.',
      ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export type RessetpassFormValues = z.infer<typeof resetpassSchema>;