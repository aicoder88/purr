import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { ContentTemplateManager } from '@/lib/blog/content-templates';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const manager = new ContentTemplateManager();
    const templates = manager.getTemplates();

    return res.status(200).json(templates);
  } catch (error) {
    console.error('Templates API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
