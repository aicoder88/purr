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

export async function GET(req: Request) {
  // Auth check
  const { authorized } = await requireAuth();
  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1') || 1;
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '10') || 10, 50);
    const status = url.searchParams.get('status') as SocialPostStatus | undefined;
    const platform = url.searchParams.get('platform') || undefined;

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

    const response: SubmissionsResponse = {
      posts: formattedPosts,
      total,
      page,
      limit
    };

    return Response.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching social posts:', error);
    return Response.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
