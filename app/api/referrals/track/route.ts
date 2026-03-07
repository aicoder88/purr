import prisma from '@/lib/prisma';
import { REFERRAL_CONFIG } from '@/lib/referral';
import {
  completeReferralPurchase,
  normalizeEmail,
  normalizeReferralCode,
  validateReferralCodeForEmail,
} from '@/lib/referral-program';
import { verifyOrigin } from '@/lib/security/origin-check';

interface TrackingData {
  source?: string;
  medium?: string;
  campaign?: string;
  utmParameters?: Record<string, string>;
}

interface TrackingResponse {
  success: boolean;
  referralId?: string;
  rewardEligible?: boolean;
  rewards?: {
    referrer: {
      type: 'discount' | 'credit' | 'product';
      value: number;
      description: string;
    };
    referee: {
      type: 'discount' | 'credit' | 'product';
      value: number;
      description: string;
    };
  };
  message?: string;
  error?: string;
}

type TrackReferralAction = 'click' | 'signup' | 'purchase';

interface TrackReferralRequestBody {
  action?: TrackReferralAction;
  referralCode?: string;
  refereeEmail?: string;
  refereeId?: string;
  orderId?: string;
  orderValue?: number;
  trackingData?: TrackingData;
}

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': "default-src 'self'",
};

export async function POST(req: Request): Promise<Response> {
  // Verify request origin
  if (!verifyOrigin(req)) {
    return Response.json({ success: false, error: 'Forbidden' } satisfies TrackingResponse, { status: 403, headers: SECURITY_HEADERS });
  }

  try {
    const body = (await req.json()) as TrackReferralRequestBody;
    const {
      action,
      referralCode,
      refereeEmail,
      refereeId,
      orderId,
      orderValue,
    } = body;

    if (!action || !referralCode) {
      return Response.json({
        success: false,
        error: 'Missing required fields: action, referralCode'
      } satisfies TrackingResponse, { status: 400 });
    }

    if ((action === 'signup' || action === 'purchase') && !refereeEmail) {
      return Response.json({
        success: false,
        error: 'refereeEmail is required for signup and purchase tracking'
      } satisfies TrackingResponse, { status: 400 });
    }

    if (!prisma) {
      return Response.json({
        success: false,
        error: 'Database connection not available'
      } satisfies TrackingResponse, { status: 500 });
    }

    const normalizedCode = normalizeReferralCode(referralCode);
    const normalizedRefereeEmail = refereeEmail ? normalizeEmail(refereeEmail) : undefined;

    // Validate referral code exists and is active
    const referralCodeRecord = await prisma.referralCode.findUnique({
      where: { code: normalizedCode },
      include: { user: { select: { id: true, email: true } } },
    });

    if (!referralCodeRecord || !referralCodeRecord.isActive) {
      return Response.json({
        success: false,
        error: 'Invalid or inactive referral code'
      } satisfies TrackingResponse, { status: 404 });
    }

    // Check expiration
    if (referralCodeRecord.expiresAt && referralCodeRecord.expiresAt < new Date()) {
      return Response.json({
        success: false,
        error: 'Referral code has expired'
      } satisfies TrackingResponse, { status: 410 });
    }

    // Prevent self-referral
    if (
      normalizedRefereeEmail &&
      referralCodeRecord.user.email &&
      normalizeEmail(referralCodeRecord.user.email) === normalizedRefereeEmail
    ) {
      return Response.json({
        success: false,
        error: 'Cannot use your own referral code'
      } satisfies TrackingResponse, { status: 400 });
    }

    switch (action) {
      case 'click':
        return await handleClick(referralCodeRecord.id, normalizedRefereeEmail);

      case 'signup':
        return await handleSignup(referralCodeRecord.id, normalizedRefereeEmail!, refereeId);

      case 'purchase':
        return await handlePurchase(
          normalizedCode,
          normalizedRefereeEmail!,
          refereeId,
          orderId,
          orderValue
        );

      default:
        return Response.json({
          success: false,
          error: 'Invalid action. Must be: click, signup, or purchase'
        } satisfies TrackingResponse, { status: 400 });
    }
  } catch {
    return Response.json({
      success: false,
      error: 'Failed to track referral activity'
    } satisfies TrackingResponse, { status: 500 });
  }
}

async function handleClick(
  referralCodeId: string,
  refereeEmail?: string
): Promise<Response> {
  if (!refereeEmail) {
    await prisma!.referralCode.update({
      where: { id: referralCodeId },
      data: { totalClicks: { increment: 1 } },
    });

    return Response.json({
      success: true,
      message: 'Referral click tracked successfully'
    } satisfies TrackingResponse);
  }

  // Find or create a redemption record for this click
  const existing = await prisma!.referralRedemption.findFirst({
    where: {
      referralCodeId,
      refereeEmail,
      status: 'PENDING',
    },
  });

  if (existing) {
    // Update click timestamp
    await prisma!.referralRedemption.update({
      where: { id: existing.id },
      data: { clickedAt: new Date() },
    });

    return Response.json({
      success: true,
      referralId: existing.id,
      message: 'Referral click tracked successfully'
    } satisfies TrackingResponse);
  }

  const redemption = await prisma!.referralRedemption.create({
    data: {
      referralCodeId,
      refereeEmail,
      status: 'PENDING',
      clickedAt: new Date(),
    },
  });

  // Increment click count on the referral code
  await prisma!.referralCode.update({
    where: { id: referralCodeId },
    data: { totalClicks: { increment: 1 } },
  });

  return Response.json({
    success: true,
    referralId: redemption.id,
    message: 'Referral click tracked successfully'
  } satisfies TrackingResponse);
}

async function handleSignup(
  referralCodeId: string,
  refereeEmail: string,
  refereeId?: string
): Promise<Response> {
  // Find existing pending redemption or create one
  const existing = await prisma!.referralRedemption.findFirst({
    where: {
      referralCodeId,
      refereeEmail,
      status: 'PENDING',
    },
  });

  if (existing) {
    await prisma!.referralRedemption.update({
      where: { id: existing.id },
      data: {
        signedUpAt: new Date(),
        ...(refereeId && { refereeOrderId: refereeId }),
      },
    });

    // Increment signup count
    await prisma!.referralCode.update({
      where: { id: referralCodeId },
      data: { totalSignups: { increment: 1 } },
    });

    return Response.json({
      success: true,
      referralId: existing.id,
      rewardEligible: false,
      message: 'Referral signup tracked - rewards pending purchase completion'
    } satisfies TrackingResponse);
  }

  const redemption = await prisma!.referralRedemption.create({
    data: {
      referralCodeId,
      refereeEmail,
      status: 'PENDING',
      signedUpAt: new Date(),
    },
  });

  await prisma!.referralCode.update({
    where: { id: referralCodeId },
    data: { totalSignups: { increment: 1 } },
  });

  return Response.json({
    success: true,
    referralId: redemption.id,
    rewardEligible: false,
    message: 'Referral signup tracked - rewards pending purchase completion'
  } satisfies TrackingResponse);
}

async function handlePurchase(
  referralCode: string,
  refereeEmail: string,
  _refereeId?: string,
  orderId?: string,
  _orderValue?: number // Accepted for future percentage-based rewards
): Promise<Response> {
  if (!orderId) {
    return Response.json({
      success: false,
      error: 'orderId is required for purchase tracking'
    } satisfies TrackingResponse, { status: 400 });
  }

  const validation = await validateReferralCodeForEmail(referralCode, refereeEmail);
  const completion = await completeReferralPurchase({
    referralCode,
    refereeEmail,
    orderId,
    orderValue: _orderValue,
  });

  if (completion.alreadyProcessed) {
    return Response.json({
      success: true,
      referralId: completion.referralId,
      rewardEligible: completion.rewardIssued,
      rewards: completion.rewards,
      message: 'Referral purchase already tracked',
    } satisfies TrackingResponse);
  }

  return Response.json({
    success: true,
    referralId: completion.referralId,
    rewardEligible: completion.rewardIssued,
    rewards: completion.rewardIssued
      ? completion.rewards
      : {
          referrer: {
            type: 'credit',
            value: REFERRAL_CONFIG.REFERRER_CREDIT,
            description: `$${REFERRAL_CONFIG.REFERRER_CREDIT} credit on the next order`,
          },
          referee: {
            type: 'discount',
            value: validation.discount,
            description: `$${validation.discount} off the first order`,
          },
        },
    message: completion.rewardIssued
      ? 'Referral purchase completed - rewards issued!'
      : 'Referral purchase completed - referral recorded',
  } satisfies TrackingResponse);
}
