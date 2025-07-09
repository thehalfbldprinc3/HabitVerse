// src/app/api/trpc/[trpc]/route.ts

import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/trpc/routers';
import { createContext } from '@/server/trpc/context';

export const runtime = 'nodejs'; // or 'edge' if you're targeting edge runtime
export const dynamic = 'force-dynamic'; // prevents Next.js from trying to prerender

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };