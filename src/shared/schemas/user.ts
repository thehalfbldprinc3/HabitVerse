import { z } from 'zod';

export const userCreateSchema = z.object({
  externalId: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  imageUrl: z.string().optional(),
  role: z.enum(['OWNER', 'ADMIN', 'USER']).optional(),
  tenantId: z.string(),
});

export const userUpdateSchema = userCreateSchema.extend({
  id: z.string(),
});

export const userIdSchema = z.object({
  id: z.string(),
});