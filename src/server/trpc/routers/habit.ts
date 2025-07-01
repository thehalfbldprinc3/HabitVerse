import { router, protectedProcedure } from '@/server/trpc';
import { db } from '@/server/db';
import {
  habitCreateSchema,
  habitUpdateSchema,
  habitIdSchema,
} from '@/shared/schemas/habit';

export const habitRouter = router({
  create: protectedProcedure
    .input(habitCreateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        if (!ctx.tenant) throw new Error('Missing tenant');
        return await db.habit.create({
          data: {
            userId: ctx.userId,
            tenantId: ctx.tenant.id,
            title: input.title,
            frequency: input.frequency,
            startDate: new Date(input.startDate),
            description: input.description ?? null,
            reminderTime: input.reminderTime ? new Date(input.reminderTime) : null,
            icon: input.icon ?? null,
            color: input.color ?? null,
          },
        });
      } catch (err) {
        console.error('Habit creation failed:', JSON.stringify(err, null, 2));
        throw err;
      }
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await db.habit.findMany({
        where: {
          userId: ctx.userId as string,
          isArchived: false,
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (err) {
      console.error('Fetching habits failed:', JSON.stringify(err, null, 2));
      throw err;
    }
  }),

  getById: protectedProcedure
    .input(habitIdSchema)
    .query(async ({ input, ctx }) => {
      try {
        return await db.habit.findFirst({
          where: {
            id: input.id,
            userId: ctx.userId as string,
          },
        });
      } catch (err) {
        console.error('Fetching habit by ID failed:', JSON.stringify(err, null, 2));
        throw err;
      }
    }),

  update: protectedProcedure
    .input(habitUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...rest } = input;
      try {
        return await db.habit.update({
          where: {
            id,
            userId: ctx.userId as string,
          },
          data: {
            title: rest.title,
            frequency: rest.frequency,
            startDate: new Date(rest.startDate),
            description: rest.description ?? null,
            reminderTime: rest.reminderTime ? new Date(rest.reminderTime) : null,
            icon: rest.icon ?? null,
            color: rest.color ?? null,
          },
        });
      } catch (err) {
        console.error('Habit update failed:', JSON.stringify(err, null, 2));
        throw err;
      }
    }),

  archive: protectedProcedure
    .input(habitIdSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await db.habit.update({
          where: {
            id: input.id,
            userId: ctx.userId as string,
          },
          data: { isArchived: true },
        });
      } catch (err) {
        console.error('Habit archive failed:', JSON.stringify(err, null, 2));
        throw err;
      }
    }),
});