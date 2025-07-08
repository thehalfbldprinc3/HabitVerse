import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { db } from '../db';

export async function createContext(opts: FetchCreateContextFnOptions) {
  const req = opts.req as NextRequest;
  const { userId: externalId } = await getAuth(req);

  if (!externalId) {
    return {
      db,
      user: null,
      userId: null,
    };
  }

  let user = await db.user.findUnique({ where: { externalId } });

  if (!user) {
    const clerkUser = await clerkClient.users.getUser(externalId);
    const name = clerkUser.firstName ?? clerkUser.username ?? clerkUser.id;
    const email = clerkUser.emailAddresses[0]?.emailAddress ?? 'unknown@example.com';

    user = await db.user.create({
      data: {
        externalId,
        email,
        name,
        imageUrl: clerkUser.imageUrl ?? null,
      },
    });
  }

  return {
    db,
    user,
    userId: user.id,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;