import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { SitemapGenerator } from '@/lib/blog/sitemap-generator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const generator = new SitemapGenerator();
    await generator.updateAllSitemaps();

    return res.status(200).json({
      success: true,
      message: 'Sitemaps updated successfully'
    });
  } catch (error) {
    console.error('Error updating sitemaps:', error);
    return res.status(500).json({
      error: 'Failed to update sitemaps',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
