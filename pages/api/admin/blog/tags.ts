import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { CategoryManager } from '@/lib/blog/category-manager';
import { AuditLogger } from '@/lib/blog/audit-logger';
import type { Tag } from '@/types/blog';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorized, session } = await requireAuth(req, res);

  if (!authorized || !session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const categoryManager = new CategoryManager();
  const logger = new AuditLogger();

  try {
    if (req.method === 'GET') {
      const tags = await categoryManager.getTagsWithStats();
      return res.status(200).json(tags);
    }

    if (req.method === 'POST') {
      const action = req.body.action;

      if (action === 'merge') {
        const { sourceIds, targetId } = req.body;
        await categoryManager.mergeTags(sourceIds, targetId);

        await logger.log({
          userId: session.user?.email || 'unknown',
          userEmail: session.user?.email || 'unknown',
          action: 'update',
          resourceType: 'tag',
          resourceId: targetId,
          details: { action: 'merge', sourceIds }
        });

        return res.status(200).json({ success: true });
      }

      // Create new tag
      const tag: Tag = req.body;
      await categoryManager.createTag(tag);

      await logger.log({
        userId: session.user?.email || 'unknown',
        userEmail: session.user?.email || 'unknown',
        action: 'create',
        resourceType: 'tag',
        resourceId: tag.id,
        details: { name: tag.name }
      });

      return res.status(201).json({ success: true, tag });
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;

      await categoryManager.updateTag(id, updates);

      await logger.log({
        userId: session.user?.email || 'unknown',
        userEmail: session.user?.email || 'unknown',
        action: 'update',
        resourceType: 'tag',
        resourceId: id,
        details: updates
      });

      return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;

      await categoryManager.deleteTag(id as string);

      await logger.log({
        userId: session.user?.email || 'unknown',
        userEmail: session.user?.email || 'unknown',
        action: 'delete',
        resourceType: 'tag',
        resourceId: id as string,
        details: {}
      });

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Tag management error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}
