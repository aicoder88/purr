import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { ContentStore } from '@/lib/blog/content-store';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import fs from 'fs/promises';
import path from 'node:path';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const store = new ContentStore();
  const tagsPath = path.join(process.cwd(), 'content', 'tags.json');

  try {
    if (req.method === 'DELETE') {
      // Read existing tags
      const tags = await store.getTags();

      // Filter out the tag to delete
      const filteredTags = tags.filter(tag => tag.id !== id);

      if (filteredTags.length === tags.length) {
        return res.status(404).json({ error: 'Tag not found' });
      }

      // Save to file
      await fs.writeFile(tagsPath, JSON.stringify(filteredTags, null, 2));

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling tag request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withRateLimit(RATE_LIMITS.CREATE, handler);
