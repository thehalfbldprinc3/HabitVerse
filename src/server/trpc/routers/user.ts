import { router, publicProcedure, protectedProcedure } from '@/server/trpc';
import { db } from '@/server/db';
import {
  userCreateSchema,
  userIdSchema,
  userUpdateSchema,
} from '@/shared/schemas/user';
import { clerkClient } from '@clerk/clerk-sdk-node';

export const userRouter = router({

  getOrCreate: protectedProcedure.query(async ({ ctx }) => {
    const externalId = ctx.userId;
    if (!externalId) return null;

    const existing = await db.user.findUnique({
      where: { externalId },
    });

    if (existing) return existing;

    const clerkUser = await clerkClient.users.getUser(externalId);
    return await db.user.create({
      data: {
        externalId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? 'unknown@example.com',
        name: clerkUser.firstName ?? clerkUser.username ?? clerkUser.id,
        imageUrl: clerkUser.imageUrl ?? null,
      },
    });
  }),

  create: publicProcedure.input(userCreateSchema).mutation(async ({ input }) => {
    try {
      return await db.user.create({ data: input });
    } catch (error) {
      console.error('create error:', error);
      throw new Error('Failed to create user');
    }
  }),

  getAll: protectedProcedure.query(async () => {
    try {
      return await db.user.findMany({ orderBy: { createdAt: 'desc' } });
    } catch (error) {
      console.error('getAll error:', error);
      throw new Error('Failed to fetch users');
    }
  }),

  getById: protectedProcedure.input(userIdSchema).query(async ({ input }) => {
    try {
      return await db.user.findUnique({ where: { id: input.id } });
    } catch (error) {
      console.error('getById error:', error);
      throw new Error('Failed to fetch user by ID');
    }
  }),

  update: protectedProcedure.input(userUpdateSchema).mutation(async ({ input }) => {
    try {
      const { id, ...data } = input;
      return await db.user.update({ where: { id }, data });
    } catch (error) {
      console.error('update error:', error);
      throw new Error('Failed to update user');
    }
  }),

  delete: protectedProcedure.input(userIdSchema).mutation(async ({ input }) => {
    try {
      return await db.user.delete({ where: { id: input.id } });
    } catch (error) {
      console.error('delete error:', error);
      throw new Error('Failed to delete user');
    }
  }),
});