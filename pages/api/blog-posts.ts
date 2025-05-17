import type { NextApiRequest, NextApiResponse } from 'next';
import { sampleBlogPosts, BlogPost } from '../../src/data/blog-posts';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogPost[]>
) {
  // Return sample blog posts
  res.status(200).json(sampleBlogPosts);
}