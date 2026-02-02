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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreatePostResponse | { error: string }>
) {
  // Auth check
  const { authorized } = await requireAuth(req, res);
  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { content, platforms, scheduledAt } = req.body as CreatePostRequest;

    // Validation
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Content is required' });
    }

    if (!platforms || platforms.length === 0) {
      return res.status(400).json({ error: 'At least one platform must be selected' });
    }

    // Validate platforms
    const validPlatforms = ['facebook', 'linkedin', 'twitter', 'instagram', 'blog'];
    const invalidPlatforms = platforms.filter(p => !validPlatforms.includes(p));
    if (invalidPlatforms.length > 0) {
      return res.status(400).json({ 
        error: `Invalid platforms: ${invalidPlatforms.join(', ')}` 
      });
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

    res.status(201).json({
      id: post.id,
      content: post.content,
      platforms: post.platforms,
      status: post.status,
      createdAt: post.createdAt.toISOString()
    });
  } catch (error) {
    console.error('Error creating social post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
}
