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
  if (isNaN(hh) || isNaN(mm) || hh < 0 || hh > 23 || mm < 0 || mm > 59) return null;
  const d = new Date(date);
  d.setUTCHours(hh, mm, 0, 0);
  return d;
}

export const habitRouter = router({
  create: protectedProcedure
    .input(habitCreateSchema)
    .mutation(async ({ input, ctx }) => {
      return await db.groupHabit.create({
        data: {
          title: input.title,
          frequency: input.frequency,
          startDate: new Date(input.startDate),
          description: input.description ?? null,
          reminderTime: buildReminderDate(input.startDate, input.reminderTime),
          icon: input.icon ?? null,
          color: input.color ?? null,
          group: {
            connect: { id: input.groupId },
          },
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await db.groupHabit.findMany({
      where: {
        group: {
          members: {
            some: {
              userId: ctx.userId as string,
            },
          },
        },
        isArchived: false,
      },
      orderBy: { createdAt: 'desc' },
    });
  }),

  getById: protectedProcedure
    .input(habitIdSchema)
    .query(async ({ input, ctx }) => {
      return await db.groupHabit.findFirst({
        where: {
          id: input.id,
          group: {
            members: {
              some: {
                userId: ctx.userId as string,
              },
            },
          },
        },
      });
    }),

  update: protectedProcedure
    .input(habitUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...rest } = input;
      return await db.groupHabit.update({
        where: { id },
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
    .mutation(async ({ input }) => {
      return await db.groupHabit.update({
        where: { id: input.id },
        data: { isArchived: true },
      });
    }),
});