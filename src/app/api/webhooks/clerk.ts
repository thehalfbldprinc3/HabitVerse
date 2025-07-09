import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Webhook } from 'svix';
import type { WebhookRequiredHeaders } from 'svix';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/server/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const payload = (await buffer(req)).toString();
  const headers = req.headers as unknown as WebhookRequiredHeaders;

  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) return res.status(500).send('Missing webhook secret');

  const wh = new Webhook(secret);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch {
    return res.status(400).send('Invalid signature');
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

  res.status(200).send('OK');
}