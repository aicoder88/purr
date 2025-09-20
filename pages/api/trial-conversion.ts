import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { recordTrialConversion } from '../../src/lib/trial-conversion';

const BodySchema = z.object({
  email: z.string().email(),
  productId: z.string().min(1),
  source: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const parsed = BodySchema.parse(req.body);

    const ua = req.headers['user-agent'] as string | undefined;
    const ip = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() || req.socket.remoteAddress || undefined;

    const event = await recordTrialConversion({
      ...parsed,
      userAgent: ua,
      ip,
    });

    return res.status(200).json({ ok: true, event });
  } catch (err) {
     
    console.error('trial-conversion error', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
