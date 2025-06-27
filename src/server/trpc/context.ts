// src/server/trpc/context.ts
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '../db';

export async function createContext(opts: FetchCreateContextFnOptions) {
  const req = opts.req as NextRequest;
  const { userId } = getAuth(req);
  return { db, userId };
}

export type Context = Awaited<ReturnType<typeof createContext>>;