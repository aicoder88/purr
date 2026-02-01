/**
 * POST /api/referrals/generate
 * Generate a unique referral code for a user
 *
 * Sprint 6C: "Give $5, Get $5" Referral Program
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/auth';
import prisma from '../../../src/lib/prisma';
import { withRateLimit, RATE_LIMITS } from '../../../src/lib/security/rate-limit';
import { withCSRFProtection } from '../../../src/lib/security/csrf';
import {
  generateReferralCode,
  generateShareUrls,
  REFERRAL_CONFIG,
} from '../../../src/lib/referral';
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

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateReferralResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    // Get session - user must be logged in
    const session = await auth();

    if (!session?.user?.email) {
      return res.status(401).json({
        success: false,
        error: 'You must be logged in to generate a referral code',
      });
    }

    if (!prisma) {
      return res.status(503).json({
        success: false,
        error: 'Database not available',
      });
    }

    const userEmail = session.user.email;
    const userName = session.user.name || userEmail.split('@')[0];

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { referralCode: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Check if user already has a referral code
    if (user.referralCode) {
      const shareUrls = generateShareUrls(user.referralCode.code, userName);
      return res.status(200).json({
        success: true,
        data: {
          code: user.referralCode.code,
          shareUrl: shareUrls.shareUrl,
          shareUrls,
          expiresAt: user.referralCode.expiresAt?.toISOString(),
          maxReferrals: REFERRAL_CONFIG.MAX_REFERRALS_PER_USER,
        },
      });
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

    // Log audit event
    await prisma.auditLog.create({
      data: {
        action: 'REFERRAL_CODE_GENERATED',
        entity: 'referral_codes',
        entityId: referralCode.id,
        userId: user.id,
        ipAddress: req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
        changes: {
          code: referralCode.code,
          generatedAt: new Date().toISOString(),
        },
      },
    });

    const shareUrls = generateShareUrls(code, userName);

    return res.status(201).json({
      success: true,
      data: {
        code: referralCode.code,
        shareUrl: shareUrls.shareUrl,
        shareUrls,
        expiresAt: referralCode.expiresAt?.toISOString(),
        maxReferrals: REFERRAL_CONFIG.MAX_REFERRALS_PER_USER,
      },
    });
  } catch (error) {
    console.error('Error generating referral code:', error);
    Sentry.captureException(error);

    return res.status(500).json({
      success: false,
      error: 'Failed to generate referral code. Please try again.',
    });
  }
}

export default withRateLimit(RATE_LIMITS.CREATE, withCSRFProtection(handler));
