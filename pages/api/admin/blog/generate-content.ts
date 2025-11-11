import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { AutomatedContentGenerator } from '@/lib/blog/automated-content-generator';

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

  try {
    const config = req.body;

    if (!config.topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const generator = new AutomatedContentGenerator();
    
    // Generate content with the provided configuration
    const post = await generator.generateBlogPost(config.topic);

    return res.status(200).json({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      categories: post.categories,
      tags: post.tags
    });
  } catch (error) {
    console.error('Content generation error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate content',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
