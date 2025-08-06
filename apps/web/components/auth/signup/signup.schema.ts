import { z } from 'zod';

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: 'Le prénom doit contenir au moins 2 lettres',
      })
      .regex(/^[a-zA-ZÀ-ÿ\s-']+$/, {
        message: 'Le prénom ne peut contenir que des lettres',
      }),
    lastName: z
      .string()
      .min(2, {
        message: 'Le nom doit contenir au moins 2 lettres',
      })
      .regex(/^[a-zA-ZÀ-ÿ\s-']+$/, {
        message: 'Le nom ne peut contenir que des lettres',
      }),
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
    confirmPassword: z.string().min(8, {
      message: 'Au moins 8 caractères',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signupSchema>;
