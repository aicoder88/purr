import { requireAuth } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { SocialPostStatus } from '@/generated/client/client';
import { checkRateLimit, createRateLimitHeaders } from '@/lib/rate-limit';

function getPrisma() {
  if (!prisma) {
    throw new Error('Database not configured');
  }
  return prisma;
}

interface CreatePostRequest {
  content: string;
  platforms: string[];
  scheduledAt?: string;
}

interface CreatePostResponse {
  id: string;
  content: string;
  platforms: string[];
  status: SocialPostStatus;
  createdAt: string;
}

export async function POST(req: Request) {
  // Apply rate limiting (standard: 20 req/min for writes)
  const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
  const rateLimitResult = await checkRateLimit(clientIp, 'standard');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return Response.json(
      { error: 'Too many requests' },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  // Auth check
  const { authorized } = await requireAuth();
  if (!authorized) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { content, platforms, scheduledAt } = await req.json() as CreatePostRequest;

    // Validation
    if (!content || !content.trim()) {
      return Response.json({ error: 'Content is required' }, { status: 400 });
    }

    if (!platforms || platforms.length === 0) {
      return Response.json({ error: 'At least one platform must be selected' }, { status: 400 });
    }

    // Validate platforms
    const validPlatforms = ['facebook', 'linkedin', 'twitter', 'instagram', 'blog'];
    const invalidPlatforms = platforms.filter(p => !validPlatforms.includes(p));
    if (invalidPlatforms.length > 0) {
      return Response.json({ 
        error: `Invalid platforms: ${invalidPlatforms.join(', ')}` 
      }, { status: 400 });
    }

    // Determine status
    let status: SocialPostStatus = SocialPostStatus.DRAFT;
    let parsedScheduledAt: Date | null = null;

    if (scheduledAt) {
      parsedScheduledAt = new Date(scheduledAt);
      if (parsedScheduledAt > new Date()) {
        status = SocialPostStatus.SCHEDULED;
      }
    }

    // Create the post
    const post = await getPrisma().socialPost.create({
      data: {
        content: content.trim(),
        platforms,
        status,
        scheduledAt: parsedScheduledAt
      }
    });

    const response: CreatePostResponse = {
      id: post.id,
      content: post.content,
      platforms: post.platforms,
      status: post.status,
      createdAt: post.createdAt.toISOString()
    };

    return Response.json(response, { status: 201, headers: rateLimitHeaders });
  } catch (error) {
    console.error('Error creating social post:', error);
    return Response.json({ error: 'Failed to create post' }, { status: 500, headers: rateLimitHeaders });
  }
}
