import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/reviews/aggregate?productId=xxx
// Returns aggregate review data for SEO schema and display
export async function GET(request: NextRequest) {
  try {
    if (!prisma) {
      return NextResponse.json({ message: 'Database not available' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    const where = { status: 'APPROVED' as const, ...(productId ? { productId } : {}) };

    const [aggregateData, recommendCount] = await Promise.all([
      prisma.review.aggregate({
        where,
        _avg: { rating: true },
        _count: { rating: true },
      }),
      prisma.review.count({ where: { ...where, wouldRecommend: true } }),
    ]);

    const totalReviews = aggregateData._count.rating;
    const averageRating = aggregateData._avg.rating
      ? Math.round(aggregateData._avg.rating * 10) / 10
      : 0;

    return NextResponse.json({
      averageRating,
      totalReviews,
      recommendPercentage: totalReviews > 0 ? Math.round((recommendCount / totalReviews) * 100) : 0,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch {
    return NextResponse.json({ message: 'Error fetching aggregate data' }, { status: 500 });
  }
}
