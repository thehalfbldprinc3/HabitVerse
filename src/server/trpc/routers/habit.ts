import { router, protectedProcedure } from '@/server/trpc';
import { db } from '@/server/db';
import {
  habitCreateSchema,
  habitUpdateSchema,
  habitIdSchema,
} from '@/shared/schemas/habit';

function buildReminderDate(date: string, time?: string): Date | null {
  if (!time) return null;
  const [hh, mm] = time.split(":").map(Number);
  if (
    Number.isNaN(hh) || Number.isNaN(mm) ||
    hh < 0 || hh > 23 || mm < 0 || mm > 59
  ) return null;
  const d = new Date(date);
  d.setUTCHours(hh, mm, 0, 0);
  return d;
}

export const habitRouter = router({
  create: protectedProcedure
    .input(habitCreateSchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.tenant) throw new Error('Missing tenant');
      return await db.habit.create({
        data: {
          userId: ctx.userId,
          tenantId: ctx.tenant.id,
          title: input.title,
          frequency: input.frequency,
          startDate: new Date(input.startDate),
          description: input.description ?? null,
          reminderTime: buildReminderDate(input.startDate, input.reminderTime),
          icon: input.icon ?? null,
          color: input.color ?? null,
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await db.habit.findMany({
      where: {
        userId: ctx.userId as string,
        isArchived: false,
      },
      orderBy: { createdAt: 'desc' },
    });
  }),

  getById: protectedProcedure
    .input(habitIdSchema)
    .query(async ({ input, ctx }) => {
      return await db.habit.findFirst({
        where: {
          id: input.id,
          userId: ctx.userId as string,
        },
      });
    }),

  update: protectedProcedure
    .input(habitUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...rest } = input;
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
          reminderTime: buildReminderDate(rest.startDate, rest.reminderTime),
          icon: rest.icon ?? null,
          color: rest.color ?? null,
        },
      });
    }),

  archive: protectedProcedure
    .input(habitIdSchema)
    .mutation(async ({ input, ctx }) => {
      return await db.habit.update({
        where: {
          id: input.id,
          userId: ctx.userId as string,
        },
        data: { isArchived: true },
      });
    }),
});