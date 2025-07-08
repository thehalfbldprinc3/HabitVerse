import { z } from "zod";

export const groupBaseSchema = z.object({
  name: z
    .string()
    .min(3, "Group name must be at least 3 characters")
    .max(100, "Group name must be under 100 characters"),
  description: z.string().max(500, "Description too long").optional(),
});

export const groupCreateSchema = groupBaseSchema;

export const groupUpdateSchema = groupBaseSchema.extend({
  id: z.string().cuid(),
});

export const groupIdSchema = z.object({
  id: z.string().cuid(),
});