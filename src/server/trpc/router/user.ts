// src/server/trpc/routers/user.ts
import { router, publicProcedure } from '@/server/trpc';

export const userRouter = router({
  getSelf: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.userId) return null;
    
    return ctx.db.user.findUnique({
      where: { externalId: ctx.userId },
    });
  }),
});