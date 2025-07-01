// src/server/trpc/routers/index.ts
import { router } from '@/server/trpc';
import { userRouter } from './user'; // later
import { habitRouter } from './habit';

export const appRouter = router({
  user: userRouter,
  habit: habitRouter,
});

export type AppRouter = typeof appRouter;