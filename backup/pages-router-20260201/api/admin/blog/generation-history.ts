import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { GenerationHistoryManager } from '@/lib/blog/generation-history';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const historyManager = new GenerationHistoryManager();

  if (req.method === 'GET') {
    try {
      const count = parseInt(req.query.count as string) || 10;
      const history = await historyManager.getRecentGenerations(count);

      return res.status(200).json(history);
    } catch (error) {
      console.error('History API error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const record = await historyManager.saveGeneration(req.body);
      return res.status(201).json(record);
    } catch (error) {
      console.error('History save error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
