import { Webhook } from 'svix';
import { db } from '@/server/db';
import { NextRequest, NextResponse } from 'next/server';
import type { WebhookEvent } from '@clerk/nextjs/server';
import type { WebhookRequiredHeaders } from 'svix';

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const headers = Object.fromEntries(req.headers.entries()) as unknown as WebhookRequiredHeaders;
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) return new NextResponse('Missing webhook secret', { status: 500 });

  const wh = new Webhook(secret);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch {
    return new NextResponse('Invalid signature', { status: 400 });
  }

  if (evt.type === 'user.created') {
    const user = evt.data;
    const externalId = user.id;

    const existing = await db.user.findUnique({ where: { externalId } });

    if (!existing) {
      await db.user.create({
        data: {
          externalId,
          email: user.email_addresses?.[0]?.email_address ?? 'unknown@example.com',
          name: user.first_name ?? user.username ?? user.id,
          imageUrl: user.image_url ?? null,
        },
      });
    }
  }

  return new NextResponse('OK', { status: 200 });
}