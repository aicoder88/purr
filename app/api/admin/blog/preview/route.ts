import { requireAuth } from '@/lib/auth/session';
import crypto from 'node:crypto';

// Store preview tokens in memory (in production, use Redis or database)
const previewTokens = new Map<string, { slug: string; locale: string; expiresAt: number }>();

export async function POST(request: Request) {
  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Generate preview token
  const { slug, locale } = await request.json();

  if (!slug || !locale) {
    return Response.json({ error: 'Missing slug or locale' }, { status: 400 });
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

  return Response.json({
    token,
    previewUrl: `/blog/preview/${token}`,
    expiresAt: new Date(expiresAt).toISOString()
  });
}

export async function GET(request: Request) {
  const { authorized } = await requireAuth();

  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Validate preview token
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return Response.json({ error: 'Invalid token' }, { status: 400 });
  }

  const preview = previewTokens.get(token);

  if (!preview) {
    return Response.json({ error: 'Preview not found' }, { status: 404 });
  }

  if (preview.expiresAt < Date.now()) {
    previewTokens.delete(token);
    return Response.json({ error: 'Preview expired' }, { status: 410 });
  }

  return Response.json(preview);
}
