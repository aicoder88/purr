import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { SEOScorer } from '@/lib/blog/seo-scorer';
import { ContentStore } from '@/lib/blog/content-store';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, slug, data } = req.body;

  if (!action) {
    return res.status(400).json({ error: 'Action is required' });
  }

  const scorer = new SEOScorer();
  const store = new ContentStore();

  try {
    let result;

    switch (action) {
      case 'generate-alt-text':
        result = await scorer.generateAltText(data.imageUrl, data.context);
        break;

      case 'generate-meta-description':
        result = scorer.generateMetaDescription(data.content, data.keywords);
        break;

      case 'optimize-title':
        result = scorer.optimizeTitle(data.title, data.keywords);
        break;

      case 'suggest-internal-links':
        if (!slug) {
          return res.status(400).json({ error: 'Slug is required for internal link suggestions' });
        }
        const currentPost = await store.getPost(slug, 'en');
        if (!currentPost) {
          return res.status(404).json({ error: 'Post not found' });
        }
        const allPosts = await store.getAllPosts('en', false);
        result = await scorer.suggestInternalLinks(currentPost, allPosts);
        break;

      case 'check-cannibalization':
        if (!slug) {
          return res.status(400).json({ error: 'Slug is required for cannibalization check' });
        }
        const post = await store.getPost(slug, 'en');
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        const posts = await store.getAllPosts('en', false);
        result = await scorer.checkKeywordCannibalization(post, posts);
        break;

      case 'validate-schema':
        if (!slug) {
          return res.status(400).json({ error: 'Slug is required for schema validation' });
        }
        const postToValidate = await store.getPost(slug, 'en');
        if (!postToValidate) {
          return res.status(404).json({ error: 'Post not found' });
        }
        result = scorer.validateSchema(postToValidate);
        break;

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    return res.status(200).json({ result });
  } catch (error: any) {
    console.error('SEO autofix error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}
