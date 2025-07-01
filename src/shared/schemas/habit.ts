import { z } from 'zod';

export const habitCreateSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  frequency: z.string(),
  startDate: z.string().datetime(),
  reminderTime: z.string().datetime().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export const habitUpdateSchema = habitCreateSchema.extend({
  id: z.string(),
});

export const habitIdSchema = z.object({
  id: z.string(),
});