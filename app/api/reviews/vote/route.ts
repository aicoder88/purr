import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { createHash } from 'node:crypto';

// POST /api/reviews/vote - Vote on a review's helpfulness
export async function POST(request: NextRequest) {
  try {
    if (!prisma) {
      return NextResponse.json({ message: 'Database not available' }, { status: 503 });
    }

    const clientIp = getClientIp(request);
    const rateLimitResult = await checkRateLimit(clientIp, 'standard');
    if (!rateLimitResult.success) {
      return NextResponse.json({ message: 'Too many requests' }, { status: 429 });
    }

    const { reviewId, isHelpful } = await request.json();

    if (!reviewId || typeof isHelpful !== 'boolean') {
      return NextResponse.json(
        { message: 'reviewId and isHelpful (boolean) are required' },
        { status: 400 }
      );
    }

    // Verify review exists and is approved
    const review = await prisma.review.findFirst({
      where: { id: reviewId, status: 'APPROVED' },
    });
    if (!review) {
      return NextResponse.json({ message: 'Review not found' }, { status: 404 });
    }

    const ipHash = createHash('sha256').update(clientIp).digest('hex');

    // Upsert vote (allows changing vote)
    const existingVote = await prisma.reviewVote.findUnique({
      where: { reviewId_ipHash: { reviewId, ipHash } },
    });

    if (existingVote) {
      if (existingVote.isHelpful === isHelpful) {
        return NextResponse.json({ message: 'Already voted' }, { status: 200 });
      }
      // Change vote
      await prisma.reviewVote.update({
        where: { id: existingVote.id },
        data: { isHelpful },
      });
    } else {
      await prisma.reviewVote.create({
        data: { reviewId, ipHash, isHelpful },
      });
    }

    // Recalculate counts
    const [helpfulCount, unhelpfulCount] = await Promise.all([
      prisma.reviewVote.count({ where: { reviewId, isHelpful: true } }),
      prisma.reviewVote.count({ where: { reviewId, isHelpful: false } }),
    ]);

    await prisma.review.update({
      where: { id: reviewId },
      data: { helpfulCount, unhelpfulCount },
    });

    return NextResponse.json({ helpfulCount, unhelpfulCount });
  } catch {
    return NextResponse.json({ message: 'Error voting' }, { status: 500 });
  }
}
