import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { ContentStore } from '@/lib/blog/content-store';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import type { Tag } from '@/types/blog';
import fs from 'fs/promises';
import path from 'path';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const store = new ContentStore();
  const tagsPath = path.join(process.cwd(), 'content', 'tags.json');

  try {
    if (req.method === 'GET') {
      const tags = await store.getTags();
      return res.status(200).json(tags);
    }

    if (req.method === 'POST') {
      const newTag: Tag = req.body;

      if (!newTag.name || !newTag.slug) {
        return res.status(400).json({ error: 'Name and slug are required' });
      }

      // Read existing tags
      const tags = await store.getTags();

      // Check for duplicate slug
      if (tags.some(tag => tag.slug === newTag.slug)) {
        return res.status(400).json({ error: 'Tag with this slug already exists' });
      }

      // Add new tag
      tags.push(newTag);

      // Save to file
      await fs.writeFile(tagsPath, JSON.stringify(tags, null, 2));

      return res.status(201).json({ success: true, tag: newTag });
    }

    if (req.method === 'PUT') {
      const updatedTag: Tag = req.body;

      if (!updatedTag.id || !updatedTag.name || !updatedTag.slug) {
        return res.status(400).json({ error: 'ID, name, and slug are required' });
      }

      // Read existing tags
      const tags = await store.getTags();

      // Find and update tag
      const index = tags.findIndex(tag => tag.id === updatedTag.id);
      if (index === -1) {
        return res.status(404).json({ error: 'Tag not found' });
      }

      tags[index] = { ...tags[index], ...updatedTag };

      // Save to file
      await fs.writeFile(tagsPath, JSON.stringify(tags, null, 2));

      return res.status(200).json({ success: true, tag: tags[index] });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling tags request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withRateLimit(RATE_LIMITS.CREATE, handler);
