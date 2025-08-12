import { z } from 'zod';

export const locationPermissionSchema = z.object({
  locationEnabled: z.boolean(),
  rememberChoice: z.boolean()
});

export type LocationPermissionValues = z.infer<typeof locationPermissionSchema>;