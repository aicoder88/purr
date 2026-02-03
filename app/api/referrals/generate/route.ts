/**
 * POST /api/referrals/generate
 * Generate a unique referral code for a user
 *
 * Sprint 6C: "Give $5, Get $5" Referral Program
 */

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import {
  generateReferralCode,
  generateShareUrls,
  REFERRAL_CONFIG,
} from '@/lib/referral';
import * as Sentry from '@sentry/nextjs';

interface GenerateReferralResponse {
  success: boolean;
  data?: {
    code: string;
    shareUrl: string;
    shareUrls: ReturnType<typeof generateShareUrls>;
    expiresAt?: string;
    maxReferrals: number;
  };
  error?: string;
}

// Rate limiting setup
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count };
}

export async function POST(req: Request): Promise<Response> {
  // Get client IP for rate limiting
  const forwardedFor = req.headers.get('x-forwarded-for');
  const clientIp = forwardedFor?.split(',')[0] || 'unknown';

  // Apply rate limiting
  const { allowed, remaining } = checkRateLimit(clientIp);
  const headers = new Headers();
  headers.set('X-RateLimit-Remaining', remaining.toString());

  if (!allowed) {
    return Response.json({
      success: false,
      error: 'Too many requests. Please try again later.',
    }, { status: 429, headers });
  }

  // CSRF protection - check origin for state-changing operations
  const origin = req.headers.get('origin') || req.headers.get('referer');
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL || 'https://purrify.ca',
    'https://purrify.ca',
    'https://www.purrify.ca',
    'http://localhost:3000',
    'http://localhost:3001'
  ];

  if (!origin || !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
    return Response.json({
      success: false,
      error: 'Invalid origin',
    }, { status: 403, headers });
  }

  try {
    // Get session - user must be logged in
    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({
        success: false,
        error: 'You must be logged in to generate a referral code',
      }, { status: 401, headers });
    }

    if (!prisma) {
      return Response.json({
        success: false,
        error: 'Database not available',
      }, { status: 503, headers });
    }

    const userEmail = session.user.email;
    const userName = session.user.name || userEmail.split('@')[0];

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { referralCode: true },
    });

    if (!user) {
      return Response.json({
        success: false,
        error: 'User not found',
      }, { status: 404, headers });
    }

    // Check if user already has a referral code
    if (user.referralCode) {
      const shareUrls = generateShareUrls(user.referralCode.code, userName);
      return Response.json({
        success: true,
        data: {
          code: user.referralCode.code,
          shareUrl: shareUrls.shareUrl,
          shareUrls,
          expiresAt: user.referralCode.expiresAt?.toISOString(),
          maxReferrals: REFERRAL_CONFIG.MAX_REFERRALS_PER_USER,
        },
      }, { headers });
    }

    // Generate new unique code
    let code = generateReferralCode(userName);
    let attempts = 0;
    const maxAttempts = 10;

    // Ensure code is unique
    while (attempts < maxAttempts) {
      const existingCode = await prisma.referralCode.findUnique({
        where: { code },
      });

      if (!existingCode) {
        break;
      }

      // Regenerate with different random suffix
      code = generateReferralCode(userName);
      attempts++;
    }

    if (attempts >= maxAttempts) {
      // Fallback: use a completely random code
      code = `REF${Date.now().toString(36).toUpperCase()}-PURR`;
    }

    // Create the referral code
    const referralCode = await prisma.referralCode.create({
      data: {
        code,
        userId: user.id,
        isActive: true,
        totalClicks: 0,
        totalSignups: 0,
        totalOrders: 0,
        totalEarnings: 0,
      },
    });

    // Get client info from headers
    const ipAddress = forwardedFor?.split(',')[0] || 'unknown';
    const userAgent = req.headers.get('user-agent');

    // Log audit event
    await prisma.auditLog.create({
      data: {
        action: 'REFERRAL_CODE_GENERATED',
        entity: 'referral_codes',
        entityId: referralCode.id,
        userId: user.id,
        ipAddress,
        userAgent: userAgent || undefined,
        changes: {
          code: referralCode.code,
          generatedAt: new Date().toISOString(),
        },
      },
    });

    const shareUrls = generateShareUrls(code, userName);

    return Response.json({
      success: true,
      data: {
        code: referralCode.code,
        shareUrl: shareUrls.shareUrl,
        shareUrls,
        expiresAt: referralCode.expiresAt?.toISOString(),
        maxReferrals: REFERRAL_CONFIG.MAX_REFERRALS_PER_USER,
      },
    }, { status: 201, headers });
  } catch (error) {
    console.error('Error generating referral code:', error);
    Sentry.captureException(error);

    return Response.json({
      success: false,
      error: 'Failed to generate referral code. Please try again.',
    }, { status: 500, headers });
  }
}
