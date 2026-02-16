/**
 * POST /api/referrals/apply
 * Apply a referral code at checkout to get $5 off
 *
 * Sprint 6C: "Give $5, Get $5" Referral Program
 */

import { z } from 'zod';
import prisma from '@/lib/prisma';
import {
  validateReferralCodeFormat,
  REFERRAL_CONFIG,
} from '@/lib/referral';
import * as Sentry from '@sentry/nextjs';

// Input validation schema
const applyReferralSchema = z.object({
  code: z.string().min(1, 'Referral code is required').max(20, 'Code too long'),
  email: z.string().email('Invalid email format'),
});

interface _ApplyReferralResponse {
  success: boolean;
  data?: {
    code: string;
    discount: number;
    referrerName?: string;
    message: string;
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
    // Validate input
    const body = await req.json();
    const validationResult = applyReferralSchema.safeParse(body);
    if (!validationResult.success) {
      return Response.json({
        success: false,
        error: validationResult.error.issues[0]?.message || 'Invalid input',
      }, { status: 400, headers });
    }

    const { code, email } = validationResult.data;
    const normalizedCode = code.toUpperCase().trim();
    const normalizedEmail = email.toLowerCase().trim();

    if (!prisma) {
      return Response.json({
        success: false,
        error: 'Database not available',
      }, { status: 503, headers });
    }

    // Validate code format
    if (!validateReferralCodeFormat(normalizedCode)) {
      return Response.json({
        success: false,
        error: 'Invalid referral code format',
      }, { status: 400, headers });
    }

    // Find the referral code
    const referralCode = await prisma.referralCode.findUnique({
      where: { code: normalizedCode },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!referralCode) {
      return Response.json({
        success: false,
        error: 'Referral code not found',
      }, { status: 404, headers });
    }

    // Check if code is active
    if (!referralCode.isActive) {
      return Response.json({
        success: false,
        error: 'This referral code is no longer active',
      }, { status: 400, headers });
    }

    // Check if code has expired
    if (referralCode.expiresAt && referralCode.expiresAt < new Date()) {
      return Response.json({
        success: false,
        error: 'This referral code has expired',
      }, { status: 400, headers });
    }

    // Check if user is trying to use their own code
    if (referralCode.user.email?.toLowerCase() === normalizedEmail) {
      return Response.json({
        success: false,
        error: 'You cannot use your own referral code',
      }, { status: 400, headers });
    }

    // Check if this email has already used a referral code
    const existingRedemption = await prisma.referralRedemption.findFirst({
      where: {
        refereeEmail: normalizedEmail,
        status: { in: ['PENDING', 'COMPLETED'] },
      },
    });

    if (existingRedemption) {
      return Response.json({
        success: false,
        error: 'You have already used a referral code',
      }, { status: 400, headers });
    }

    // Check if referrer has reached max referrals
    if (referralCode.totalOrders >= REFERRAL_CONFIG.MAX_REFERRALS_PER_USER) {
      return Response.json({
        success: false,
        error: 'This referral code has reached its maximum uses',
      }, { status: 400, headers });
    }

    // Create pending redemption
    await prisma.referralRedemption.create({
      data: {
        referralCodeId: referralCode.id,
        refereeEmail: normalizedEmail,
        status: 'PENDING',
        refereeDiscount: REFERRAL_CONFIG.REFEREE_DISCOUNT,
        referrerCredit: REFERRAL_CONFIG.REFERRER_CREDIT,
        clickedAt: new Date(),
      },
    });

    // Increment click count
    await prisma.referralCode.update({
      where: { id: referralCode.id },
      data: {
        totalClicks: { increment: 1 },
      },
    });

    const referrerName = referralCode.user.name?.split(' ')[0] || 'A friend';

    return Response.json({
      success: true,
      data: {
        code: normalizedCode,
        discount: REFERRAL_CONFIG.REFEREE_DISCOUNT,
        referrerName,
        message: `$${REFERRAL_CONFIG.REFEREE_DISCOUNT} discount applied from ${referrerName}'s referral!`,
      },
    }, { headers });
  } catch (error) {
    console.error('Error applying referral code:', error);
    Sentry.captureException(error);

    return Response.json({
      success: false,
      error: 'Failed to apply referral code. Please try again.',
    }, { status: 500, headers });
  }
}
