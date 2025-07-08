import { z } from 'zod';

export const habitCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  frequency: z.string().min(1, "Frequency is required"),
  startDate: z.string().datetime({ message: "Invalid datetime format" }),
  reminderTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Invalid time format (HH:MM)",
    })
    .optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
  groupId: z.string().cuid({ message: "Invalid group ID" }),
});

export const habitUpdateSchema = habitCreateSchema.extend({
  id: z.string().cuid({ message: "Invalid habit ID" }),
});

export const habitIdSchema = z.object({
  id: z.string().cuid({ message: "Invalid habit ID" }),
});