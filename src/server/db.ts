import { PrismaClient } from '@/generated/prisma/client';

declare global {
  // Allow global `prisma` variable in dev to prevent hot-reload duplicates
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db =
  global.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = db;