import { z } from 'zod';

export const termsAcceptanceSchema = z.object({
  CGU: z.boolean().refine(val => val, {
    message: "Vous devez accepter les CGU",
  }),
  politiqueConf: z.boolean().refine(val => val, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
});

export type TermsAcceptanceValues = z.infer<typeof termsAcceptanceSchema>;