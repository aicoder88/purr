/**
 * POST /api/referrals/apply
 * Apply a referral code at checkout to get $5 off
 *
 * Sprint 6C: "Give $5, Get $5" Referral Program
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import prisma from '../../../src/lib/prisma';
import { withRateLimit, RATE_LIMITS } from '../../../src/lib/security/rate-limit';
import { withCSRFProtection } from '../../../src/lib/security/csrf';
import {
  validateReferralCodeFormat,
  REFERRAL_CONFIG,
} from '../../../src/lib/referral';
import * as Sentry from '@sentry/nextjs';

// Input validation schema
const applyReferralSchema = z.object({
  code: z.string().min(1, 'Referral code is required').max(20, 'Code too long'),
  email: z.string().email('Invalid email format'),
});

interface ApplyReferralResponse {
  success: boolean;
  data?: {
    code: string;
    discount: number;
    referrerName?: string;
    message: string;
  };
  error?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApplyReferralResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    // Validate input
    const validationResult = applyReferralSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error: validationResult.error.issues[0]?.message || 'Invalid input',
      });
    }

    const { code, email } = validationResult.data;
    const normalizedCode = code.toUpperCase().trim();
    const normalizedEmail = email.toLowerCase().trim();

    if (!prisma) {
      return res.status(503).json({
        success: false,
        error: 'Database not available',
      });
    }

    // Validate code format
    if (!validateReferralCodeFormat(normalizedCode)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid referral code format',
      });
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
      return res.status(404).json({
        success: false,
        error: 'Referral code not found',
      });
    }

    // Check if code is active
    if (!referralCode.isActive) {
      return res.status(400).json({
        success: false,
        error: 'This referral code is no longer active',
      });
    }

    // Check if code has expired
    if (referralCode.expiresAt && referralCode.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        error: 'This referral code has expired',
      });
    }

    // Check if user is trying to use their own code
    if (referralCode.user.email?.toLowerCase() === normalizedEmail) {
      return res.status(400).json({
        success: false,
        error: 'You cannot use your own referral code',
      });
    }

    // Check if this email has already used a referral code
    const existingRedemption = await prisma.referralRedemption.findFirst({
      where: {
        refereeEmail: normalizedEmail,
        status: { in: ['PENDING', 'COMPLETED'] },
      },
    });

    if (existingRedemption) {
      return res.status(400).json({
        success: false,
        error: 'You have already used a referral code',
      });
    }

    // Check if referrer has reached max referrals
    if (referralCode.totalOrders >= REFERRAL_CONFIG.MAX_REFERRALS_PER_USER) {
      return res.status(400).json({
        success: false,
        error: 'This referral code has reached its maximum uses',
      });
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

    return res.status(200).json({
      success: true,
      data: {
        code: normalizedCode,
        discount: REFERRAL_CONFIG.REFEREE_DISCOUNT,
        referrerName,
        message: `$${REFERRAL_CONFIG.REFEREE_DISCOUNT} discount applied from ${referrerName}'s referral!`,
      },
    });
  } catch (error) {
    console.error('Error applying referral code:', error);
    Sentry.captureException(error);

    return res.status(500).json({
      success: false,
      error: 'Failed to apply referral code. Please try again.',
    });
  }
}

export default withRateLimit(RATE_LIMITS.CREATE, withCSRFProtection(handler));
