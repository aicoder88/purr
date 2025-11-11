import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { CategoryManager } from '@/lib/blog/category-manager';
import { AuditLogger } from '@/lib/blog/audit-logger';
import type { Category } from '@/types/blog';

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
      const withStats = req.query.stats === 'true';
      
      if (withStats) {
        const categories = await categoryManager.getCategoriesWithStats();
        return res.status(200).json(categories);
      } else {
        const categories = await categoryManager.getCategoriesWithStats();
        return res.status(200).json(categories);
      }
    }

    if (req.method === 'POST') {
      const category: Category = req.body;

      await categoryManager.createCategory(category);

      await logger.log({
        userId: session.user?.email || 'unknown',
        userEmail: session.user?.email || 'unknown',
        action: 'create',
        resourceType: 'category',
        resourceId: category.id,
        details: { name: category.name }
      });

      return res.status(201).json({ success: true, category });
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;

      await categoryManager.updateCategory(id, updates);

      await logger.log({
        userId: session.user?.email || 'unknown',
        userEmail: session.user?.email || 'unknown',
        action: 'update',
        resourceType: 'category',
        resourceId: id,
        details: updates
      });

      return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
      const { id, reassignTo } = req.query;

      await categoryManager.deleteCategory(id as string, reassignTo as string | undefined);

      await logger.log({
        userId: session.user?.email || 'unknown',
        userEmail: session.user?.email || 'unknown',
        action: 'delete',
        resourceType: 'category',
        resourceId: id as string,
        details: { reassignTo }
      });

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Category management error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}
