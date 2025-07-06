import { z } from 'zod';

export const habitCreateSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  frequency: z.string(),
  startDate: z.string().datetime(),
  reminderTime: z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid time format (HH:MM)",
  })
  .optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export const habitUpdateSchema = habitCreateSchema.extend({
  id: z.string(),
});

export const habitIdSchema = z.object({
  id: z.string(),
});