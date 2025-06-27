// src/server/trpc/routers/index.ts
import { router } from '@/server/trpc';
// import { userRouter } from './user'; // later

export const appRouter = router({
  // user: userRouter
});

export type AppRouter = typeof appRouter;