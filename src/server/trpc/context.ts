import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '../db';

export async function createContext(opts: FetchCreateContextFnOptions) {
  const req = opts.req as NextRequest;
  const { userId: externalId } = await getAuth(req);

  return {
    db,
    userId: externalId ?? null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;