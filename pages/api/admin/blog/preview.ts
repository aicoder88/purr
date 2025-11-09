import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import crypto from 'crypto';

// Store preview tokens in memory (in production, use Redis or database)
const previewTokens = new Map<string, { slug: string; locale: string; expiresAt: number }>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    // Generate preview token
    const { slug, locale } = req.body;

    if (!slug || !locale) {
      return res.status(400).json({ error: 'Missing slug or locale' });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    previewTokens.set(token, { slug, locale, expiresAt });

    // Clean up expired tokens
    for (const [key, value] of previewTokens.entries()) {
      if (value.expiresAt < Date.now()) {
        previewTokens.delete(key);
      }
    }

    return res.status(200).json({
      token,
      previewUrl: `/blog/preview/${token}`,
      expiresAt: new Date(expiresAt).toISOString()
    });
  }

  if (req.method === 'GET') {
    // Validate preview token
    const { token } = req.query;

    if (typeof token !== 'string') {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const preview = previewTokens.get(token);

    if (!preview) {
      return res.status(404).json({ error: 'Preview not found' });
    }

    if (preview.expiresAt < Date.now()) {
      previewTokens.delete(token);
      return res.status(410).json({ error: 'Preview expired' });
    }

    return res.status(200).json(preview);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
