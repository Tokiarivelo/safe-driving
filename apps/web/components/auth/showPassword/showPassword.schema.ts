import { z } from 'zod';
export const signupShema = z
  .object({
    firstName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Veuillez entrer une adresse email valide'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    confirmPassword: z.string(),
    username: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signupShema>;
