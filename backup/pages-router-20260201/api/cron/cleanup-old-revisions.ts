import type { NextApiRequest, NextApiResponse } from 'next';
import { RevisionManager } from '@/lib/blog/revision-manager';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify cron secret
  const cronSecret = req.headers['x-cron-secret'] || req.query.secret;
  
  if (cronSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const revisionManager = new RevisionManager();
    const deletedCount = await revisionManager.cleanupOldRevisions(90);

    return res.status(200).json({
      success: true,
      deletedCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Cleanup cron error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
