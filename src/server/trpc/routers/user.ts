import { router, publicProcedure } from '@/server/trpc';
import { db } from '@/server/db';
import { currentUser } from '@clerk/nextjs/server';
import {
  userCreateSchema,
  userIdSchema,
  userUpdateSchema
} from '@/shared/schemas/user';

export const userRouter = router({
  getOrCreate: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.userId) return null;

    const existing = await db.user.findUnique({
      where: { externalId: ctx.userId },
    });

    if (existing) return existing;

    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error('Clerk user not found');

    const tenant = await db.tenant.findFirst();
    if (!tenant) throw new Error('No tenant exists');

    return db.user.create({
      data: {
        externalId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        name: clerkUser.firstName || '',
        imageUrl: clerkUser.imageUrl || '',
        tenantId: tenant.id,
      },
    });
  }),

  create: publicProcedure
    .input(userCreateSchema)
    .mutation(async ({ input }) => {
      return db.user.create({ data: input });
    }),

  getAll: publicProcedure.query(() => {
    return db.user.findMany({ orderBy: { createdAt: 'desc' } });
  }),

  getById: publicProcedure
    .input(userIdSchema)
    .query(async ({ input }) => {
      return db.user.findUnique({ where: { id: input.id } });
    }),

  update: publicProcedure
    .input(userUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return db.user.update({ where: { id }, data });
    }),

  delete: publicProcedure
    .input(userIdSchema)
    .mutation(async ({ input }) => {
      return db.user.delete({ where: { id: input.id } });
    }),
});