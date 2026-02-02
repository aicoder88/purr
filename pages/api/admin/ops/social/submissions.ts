import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { SocialPostStatus } from '@/generated/client/client';

function getPrisma() {
  if (!prisma) {
    throw new Error('Database not configured');
  }
  return prisma;
}

interface SocialPostItem {
  id: string;
  content: string;
  platforms: string[];
  status: SocialPostStatus;
  scheduledAt: string | null;
  publishedAt: string | null;
  createdAt: string;
}

interface SubmissionsResponse {
  posts: SocialPostItem[];
  total: number;
  page: number;
  limit: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubmissionsResponse | { error: string }>
) {
  // Auth check
  const { authorized } = await requireAuth(req, res);
  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
    const status = req.query.status as SocialPostStatus | undefined;
    const platform = req.query.platform as string | undefined;

    // Build where clause
    const where: {
      status?: SocialPostStatus;
      platforms?: { has: string };
    } = {};

    if (status && Object.values(SocialPostStatus).includes(status)) {
      where.status = status;
    }

    if (platform) {
      where.platforms = { has: platform };
    }

    const db = getPrisma();

    // Get total count
    const total = await db.socialPost.count({ where });

    // Get posts
    const posts = await db.socialPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    const formattedPosts: SocialPostItem[] = posts.map(post => ({
      id: post.id,
      content: post.content,
      platforms: post.platforms,
      status: post.status,
      scheduledAt: post.scheduledAt?.toISOString() || null,
      publishedAt: post.publishedAt?.toISOString() || null,
      createdAt: post.createdAt.toISOString()
    }));

    res.status(200).json({
      posts: formattedPosts,
      total,
      page,
      limit
    });
  } catch (error) {
    console.error('Error fetching social posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
