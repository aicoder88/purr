import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

// GET /api/reviews?productId=xxx&page=1&limit=10&sort=newest
export async function GET(request: NextRequest) {
  try {
    if (!prisma) {
      return NextResponse.json({ message: 'Database not available' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10')));
    const sort = searchParams.get('sort') || 'newest';
    const ratingFilter = searchParams.get('rating');
    const sizeFilter = searchParams.get('size');

    // Build where clause
    const where: Record<string, unknown> = { status: 'APPROVED' };
    if (productId) where.productId = productId;
    if (ratingFilter) where.rating = parseInt(ratingFilter);
    if (sizeFilter) where.productSize = sizeFilter;

    // Build orderBy
    const orderBy = (() => {
      switch (sort) {
        case 'oldest': return { createdAt: 'asc' as const };
        case 'highest': return { rating: 'desc' as const };
        case 'lowest': return { rating: 'asc' as const };
        case 'helpful': return { helpfulCount: 'desc' as const };
        default: return { createdAt: 'desc' as const };
      }
    })();

    const [reviews, totalCount, aggregateData] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          authorName: true,
          rating: true,
          title: true,
          content: true,
          productSize: true,
          catCount: true,
          usageDuration: true,
          wouldRecommend: true,
          helpfulCount: true,
          unhelpfulCount: true,
          orderId: true,
          createdAt: true,
        },
      }),
      prisma.review.count({ where }),
      prisma.review.aggregate({
        where: { status: 'APPROVED', ...(productId ? { productId } : {}) },
        _avg: { rating: true },
        _count: { rating: true },
      }),
    ]);

    // Calculate rating distribution
    const ratingDistribution = productId
      ? await prisma.review.groupBy({
          by: ['rating'],
          where: { status: 'APPROVED', productId },
          _count: { rating: true },
        })
      : [];

    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of ratingDistribution) {
      distribution[r.rating] = r._count.rating;
    }

    // Calculate recommendation percentage
    const recommendCount = productId
      ? await prisma.review.count({
          where: { status: 'APPROVED', productId, wouldRecommend: true },
        })
      : 0;

    return NextResponse.json({
      reviews: reviews.map((r) => ({
        ...r,
        verified: !!r.orderId,
        date: r.createdAt.toISOString(),
      })),
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      aggregate: {
        averageRating: aggregateData._avg.rating ?? 0,
        totalReviews: aggregateData._count.rating,
        ratingDistribution: distribution,
        recommendPercentage:
          aggregateData._count.rating > 0
            ? Math.round((recommendCount / aggregateData._count.rating) * 100)
            : 0,
      },
    });
  } catch {
    return NextResponse.json({ message: 'Error fetching reviews' }, { status: 500 });
  }
}

// POST /api/reviews - Submit a new review
export async function POST(request: NextRequest) {
  const headers = new Headers();
  headers.set('X-Content-Type-Options', 'nosniff');

  try {
    if (!prisma) {
      return NextResponse.json({ message: 'Database not available' }, { status: 503, headers });
    }

    // Rate limit review submissions
    const clientIp = getClientIp(request);
    const rateLimitResult = await checkRateLimit(clientIp, 'sensitive');
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { message: 'Too many review submissions. Please try again later.' },
        { status: 429, headers }
      );
    }

    const body = await request.json();
    const {
      productId,
      authorName,
      authorEmail,
      rating,
      title,
      content,
      productSize,
      catCount,
      usageDuration,
      wouldRecommend,
      orderId,
    } = body;

    // Validate required fields
    if (!productId || !authorName || !authorEmail || !rating || !title || !content) {
      return NextResponse.json(
        { message: 'Missing required fields: productId, authorName, authorEmail, rating, title, content' },
        { status: 400, headers }
      );
    }

    // Validate rating range
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json(
        { message: 'Rating must be an integer between 1 and 5' },
        { status: 400, headers }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authorEmail)) {
      return NextResponse.json(
        { message: 'Invalid email address' },
        { status: 400, headers }
      );
    }

    // Validate content length
    if (title.length > 200 || content.length > 2000) {
      return NextResponse.json(
        { message: 'Title must be under 200 characters and content under 2000 characters' },
        { status: 400, headers }
      );
    }

    // Validate product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404, headers });
    }

    // Check for duplicate review
    const existing = await prisma.review.findUnique({
      where: { authorEmail_productId: { authorEmail: authorEmail.toLowerCase().trim(), productId } },
    });
    if (existing) {
      return NextResponse.json(
        { message: 'You have already reviewed this product' },
        { status: 409, headers }
      );
    }

    // Verify purchase if orderId provided
    let verifiedOrderId: string | null = null;
    if (orderId) {
      const order = await prisma.order.findFirst({
        where: {
          id: orderId,
          status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
          customer: { email: authorEmail.toLowerCase().trim() },
        },
      });
      if (order) verifiedOrderId = order.id;
    }

    const review = await prisma.review.create({
      data: {
        productId,
        orderId: verifiedOrderId,
        authorName: authorName.trim().slice(0, 100),
        authorEmail: authorEmail.toLowerCase().trim(),
        rating,
        title: title.trim().slice(0, 200),
        content: content.trim().slice(0, 2000),
        productSize: productSize || null,
        catCount: catCount ? Math.min(20, Math.max(1, parseInt(catCount))) : null,
        usageDuration: usageDuration?.trim().slice(0, 50) || null,
        wouldRecommend: wouldRecommend !== false,
        status: 'PENDING', // Always start as pending for moderation
      },
      select: { id: true, status: true, createdAt: true },
    });

    return NextResponse.json(
      { message: 'Review submitted successfully and is pending moderation', review },
      { status: 201, headers }
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { message: 'You have already reviewed this product' },
        { status: 409, headers }
      );
    }
    return NextResponse.json({ message: 'Error submitting review' }, { status: 500, headers });
  }
}
