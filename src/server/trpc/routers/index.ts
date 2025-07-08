import { router } from '@/server/trpc';
import { userRouter } from './user';
import { habitRouter } from './habit';
import { groupRouter } from './group';


export const appRouter = router({
  user: userRouter,
  habit: habitRouter,
  group: groupRouter,
});

export type AppRouter = typeof appRouter;