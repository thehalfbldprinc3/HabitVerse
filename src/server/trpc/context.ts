import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { db } from '../db';

function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
}

export async function createContext(opts: FetchCreateContextFnOptions) {
  const req = opts.req as NextRequest;
  const { userId: externalId } = getAuth(req);

  if (!externalId) return { db, user: null, tenant: null, userId: null };

  let user = await db.user.findUnique({ where: { externalId } });
  let tenant;

  if (!user) {
    const clerkUser = await clerkClient.users.getUser(externalId);
    const name = clerkUser.firstName || clerkUser.username || 'user';
    const email = clerkUser.emailAddresses[0]?.emailAddress ?? 'unknown@example.com';

    tenant = await db.tenant.create({
      data: {
        name: name,
        slug: slugify(name),
      },
    });

    user = await db.user.create({
      data: {
        externalId,
        email,
        name: clerkUser.firstName ?? null,
        imageUrl: clerkUser.imageUrl ?? null,
        tenantId: tenant.id,
      },
    });
  } else {
    tenant = await db.tenant.findUnique({ where: { id: user.tenantId } });
  }

  return {
    db,
    user,
    tenant,
    userId: user.id,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;