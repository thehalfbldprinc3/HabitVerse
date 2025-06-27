// src/server/db.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `var` usage for hot-reloading in dev
  // Prevent multiple PrismaClient instances in dev
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // Optional: Remove in production
  });

if (process.env.NODE_ENV !== 'production') global.prisma = db;