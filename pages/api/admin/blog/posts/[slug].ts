import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { ContentStore } from '@/lib/blog/content-store';
import { AuditLogger } from '@/lib/blog/audit-logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorized, session } = await requireAuth(req, res);

  if (!authorized || !session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { slug } = req.query;
  const locale = (req.query.locale as string) || 'en';

  if (typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  const store = new ContentStore();
  const logger = new AuditLogger();

  try {
    if (req.method === 'GET') {
      // Get single post (including unpublished)
      const post = await store.getPost(slug, locale);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.status(200).json(post);
    }

    if (req.method === 'DELETE') {
      // Delete post
      const post = await store.getPost(slug, locale);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      await store.deletePost(slug, locale);

      // Log the deletion
      await logger.log({
        userId: session.user?.email || 'unknown',
        userEmail: session.user?.email || 'unknown',
        action: 'delete',
        resourceType: 'post',
        resourceId: slug,
        details: {
          title: post.title,
          locale
        }
      });

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling post request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
