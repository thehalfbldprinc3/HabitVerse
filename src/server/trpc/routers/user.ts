import { router, publicProcedure } from '@/server/trpc';
import { db } from '@/server/db';
import { currentUser } from '@clerk/nextjs/server';
import {
  userCreateSchema,
  userIdSchema,
  userUpdateSchema,
} from '@/shared/schemas/user';

export const userRouter = router({
  getOrCreate: publicProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.userId) return null;

      const existing = await db.user.findUnique({
        where: { externalId: ctx.userId },
      });
      if (existing) return existing;

      const clerkUser = await currentUser();
      if (!clerkUser) throw new Error('Clerk user not found');

      const tenant = await db.tenant.findFirst();
      if (!tenant) throw new Error('No tenant exists');

      return await db.user.create({
        data: {
          externalId: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          name: clerkUser.firstName || '',
          imageUrl: clerkUser.imageUrl || '',
          tenantId: tenant.id,
        },
      });
    } catch (error) {
      console.error('getOrCreate error:', error);
      throw new Error('Failed to get or create user');
    }
  }),

  create: publicProcedure.input(userCreateSchema).mutation(async ({ input }) => {
    try {
      return await db.user.create({ data: input });
    } catch (error) {
      console.error('create error:', error);
      throw new Error('Failed to create user');
    }
  }),

  getAll: publicProcedure.query(async () => {
    try {
      return await db.user.findMany({ orderBy: { createdAt: 'desc' } });
    } catch (error) {
      console.error('getAll error:', error);
      throw new Error('Failed to fetch users');
    }
  }),

  getById: publicProcedure.input(userIdSchema).query(async ({ input }) => {
    try {
      return await db.user.findUnique({ where: { id: input.id } });
    } catch (error) {
      console.error('getById error:', error);
      throw new Error('Failed to fetch user by ID');
    }
  }),

  update: publicProcedure.input(userUpdateSchema).mutation(async ({ input }) => {
    try {
      const { id, ...data } = input;
      return await db.user.update({ where: { id }, data });
    } catch (error) {
      console.error('update error:', error);
      throw new Error('Failed to update user');
    }
  }),

  delete: publicProcedure.input(userIdSchema).mutation(async ({ input }) => {
    try {
      return await db.user.delete({ where: { id: input.id } });
    } catch (error) {
      console.error('delete error:', error);
      throw new Error('Failed to delete user');
    }
  }),
});