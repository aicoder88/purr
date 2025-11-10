import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { ContentStore } from '@/lib/blog/content-store';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import fs from 'fs/promises';
import path from 'path';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const store = new ContentStore();
  const categoriesPath = path.join(process.cwd(), 'content', 'categories.json');

  try {
    if (req.method === 'DELETE') {
      // Read existing categories
      const categories = await store.getCategories();

      // Filter out the category to delete
      const filteredCategories = categories.filter(cat => cat.id !== id);

      if (filteredCategories.length === categories.length) {
        return res.status(404).json({ error: 'Category not found' });
      }

      // Save to file
      await fs.writeFile(categoriesPath, JSON.stringify(filteredCategories, null, 2));

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling category request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withRateLimit(RATE_LIMITS.CREATE, handler);
