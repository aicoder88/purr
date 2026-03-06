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
import { verifyOrigin } from '@/lib/security/origin-check';

// Rate limiting setup
import { checkRateLimit } from '@/lib/rate-limit';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface GenerateReferralRequestBody {
  email?: string;
  userName?: string;
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
  const { success, remaining, limit, reset, retryAfter } = await checkRateLimit(clientIp, 'standard');
  const headers = new Headers();

  if (!success) {
    headers.set('X-RateLimit-Remaining', '0');
    headers.set('X-RateLimit-Limit', limit.toString());
    headers.set('X-RateLimit-Reset', reset.toString());
    headers.set('Retry-After', retryAfter?.toString() || '60');

    return Response.json({
      success: false,
      error: 'Too many requests. Please try again later.',
    }, { status: 429, headers });
  }

  headers.set('X-RateLimit-Remaining', remaining.toString());

  try {
    const body = (await req.json().catch(() => ({}))) as GenerateReferralRequestBody;
    const session = await auth();

    if (!prisma) {
      return Response.json({
        success: false,
        error: 'Database not available',
      }, { status: 503, headers });
    }

    let userEmail = session?.user?.email?.toLowerCase().trim();
    const fallbackEmail = typeof body.email === 'string' ? body.email.toLowerCase().trim() : '';

    if (!userEmail) {
      if (!EMAIL_PATTERN.test(fallbackEmail)) {
        return Response.json({
          success: false,
          error: 'You must be logged in or provide a valid email to generate a referral code',
        }, { status: 401, headers });
      }
      userEmail = fallbackEmail;
    }

    const fallbackName = typeof body.userName === 'string' ? body.userName.trim() : '';
    const userName = (session?.user?.name || fallbackName || userEmail.split('@')[0] || 'Friend')
      .trim()
      .slice(0, 80);

    // Find user by email
    let user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { referralCode: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userEmail,
          name: userName,
        },
        include: { referralCode: true },
      });
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
  } catch {
    return Response.json({
      success: false,
      error: 'Failed to generate referral code. Please try again.',
    }, { status: 500, headers });
  }
}
