import { z } from 'zod';

export const selfieVerificationSchema = z.object({
  selfie: z.string().min(1, 'Une photo selfie est requise')
});

export type SelfieVerificationValues = z.infer<typeof selfieVerificationSchema>;