/**
 * POST /api/referrals/apply
 * Apply a referral code at checkout to get $5 off
 *
 * Sprint 6C: "Give $5, Get $5" Referral Program
 */

import { z } from 'zod';
import {
  validateReferralCodeFormat,
} from '@/lib/referral';
import { upsertPendingReferralRedemption } from '@/lib/referral-program';
import { verifyOrigin } from '@/lib/security/origin-check';

// Input validation schema
const applyReferralSchema = z.object({
  code: z.string().min(1, 'Referral code is required').max(20, 'Code too long'),
  email: z.string().email('Invalid email format'),
});

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
  // Verify request origin before exposing rate limit information
  if (!verifyOrigin(req)) {
    return Response.json({
      success: false,
      error: 'Forbidden',
    }, { status: 403 });
  }

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

    // Validate code format
    if (!validateReferralCodeFormat(normalizedCode)) {
      return Response.json({
        success: false,
        error: 'Invalid referral code format',
      }, { status: 400, headers });
    }

    const result = await upsertPendingReferralRedemption({
      code: normalizedCode,
      email: normalizedEmail,
    });

    return Response.json({
      success: true,
      data: {
        code: result.code,
        discount: result.discount,
        referrerName: result.referrerName,
        message: `$${result.discount} discount applied from ${result.referrerName}'s referral!`,
      },
    }, { headers });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to apply referral code. Please try again.';
    const status = message === 'Referral code not found' ? 404 : 400;

    return Response.json({
      success: false,
      error: message,
    }, { status, headers });
  }
}
