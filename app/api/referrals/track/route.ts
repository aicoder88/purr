import prisma from '@/lib/prisma';
import { getProductPrice } from '@/lib/pricing';
import {
  REFERRAL_MAX_CREDITS_PER_USER,
  REFERRAL_CREDIT_AMOUNT,
  REFERRAL_MILESTONE_INTERVAL,
} from '@/lib/config/ui-constants';

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

// Maximum milestone rewards a single user can accumulate
const MAX_MILESTONE_REWARDS_PER_USER = 5;
const REWARD_EXPIRY_DAYS = 90;
const MILESTONE_EXPIRY_DAYS = 180;

export async function POST(req: Request): Promise<Response> {
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

    if (!action || !referralCode || !refereeEmail) {
      return Response.json({
        success: false,
        error: 'Missing required fields: action, referralCode, refereeEmail'
      } satisfies TrackingResponse, { status: 400 });
    }

    if (!prisma) {
      return Response.json({
        success: false,
        error: 'Database connection not available'
      } satisfies TrackingResponse, { status: 500 });
    }

    // Validate referral code exists and is active
    const referralCodeRecord = await prisma.referralCode.findUnique({
      where: { code: referralCode },
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
    if (referralCodeRecord.user.email && referralCodeRecord.user.email === refereeEmail.toLowerCase()) {
      return Response.json({
        success: false,
        error: 'Cannot use your own referral code'
      } satisfies TrackingResponse, { status: 400 });
    }

    switch (action) {
      case 'click':
        return await handleClick(referralCodeRecord.id, refereeEmail);

      case 'signup':
        return await handleSignup(referralCodeRecord.id, refereeEmail, refereeId);

      case 'purchase':
        return await handlePurchase(
          referralCodeRecord,
          refereeEmail,
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
  } catch (error) {
    console.error('Error tracking referral:', error);
    return Response.json({
      success: false,
      error: 'Failed to track referral activity'
    } satisfies TrackingResponse, { status: 500 });
  }
}

async function handleClick(
  referralCodeId: string,
  refereeEmail: string
): Promise<Response> {
  // Find or create a redemption record for this click
  const existing = await prisma!.referralRedemption.findFirst({
    where: {
      referralCodeId,
      refereeEmail: refereeEmail.toLowerCase(),
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
      refereeEmail: refereeEmail.toLowerCase(),
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
      refereeEmail: refereeEmail.toLowerCase(),
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
      refereeEmail: refereeEmail.toLowerCase(),
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

interface ReferralCodeWithUser {
  id: string;
  code: string;
  userId: string;
  isActive: boolean;
  totalOrders: number;
  totalEarnings: number;
  user: { id: string; email: string | null };
}

async function handlePurchase(
  referralCodeRecord: ReferralCodeWithUser,
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

  // Check if this order was already tracked (idempotency)
  const existingForOrder = await prisma!.referralRedemption.findFirst({
    where: {
      referralCodeId: referralCodeRecord.id,
      refereeOrderId: orderId,
      status: 'COMPLETED',
    },
  });

  if (existingForOrder) {
    return Response.json({
      success: true,
      referralId: existingForOrder.id,
      message: 'Referral purchase already tracked'
    } satisfies TrackingResponse);
  }

  // Check reward caps for the referrer
  const existingRewardCount = await prisma!.referralReward.count({
    where: {
      userId: referralCodeRecord.userId,
      type: 'REFERRAL_CREDIT',
      status: { in: ['AVAILABLE', 'USED'] },
    },
  });

  if (existingRewardCount >= REFERRAL_MAX_CREDITS_PER_USER) {
    // Still track the redemption but don't issue more rewards
    return Response.json({
      success: true,
      rewardEligible: false,
      message: 'Referral tracked but referrer has reached maximum rewards'
    } satisfies TrackingResponse);
  }

  const now = new Date();

  // Find pending redemption or create completed one
  const pendingRedemption = await prisma!.referralRedemption.findFirst({
    where: {
      referralCodeId: referralCodeRecord.id,
      refereeEmail: refereeEmail.toLowerCase(),
      status: 'PENDING',
    },
  });

  let redemptionId: string;

  if (pendingRedemption) {
    await prisma!.referralRedemption.update({
      where: { id: pendingRedemption.id },
      data: {
        status: 'COMPLETED',
        refereeOrderId: orderId,
        purchasedAt: now,
        rewardIssuedAt: now,
      },
    });
    redemptionId = pendingRedemption.id;
  } else {
    const newRedemption = await prisma!.referralRedemption.create({
      data: {
        referralCodeId: referralCodeRecord.id,
        refereeEmail: refereeEmail.toLowerCase(),
        refereeOrderId: orderId,
        status: 'COMPLETED',
        purchasedAt: now,
        rewardIssuedAt: now,
      },
    });
    redemptionId = newRedemption.id;
  }

  // Issue referrer reward ($5 credit)
  await prisma!.referralReward.create({
    data: {
      userId: referralCodeRecord.userId,
      amount: REFERRAL_CREDIT_AMOUNT,
      type: 'REFERRAL_CREDIT',
      description: `Referral from ${refereeEmail}`,
      status: 'AVAILABLE',
      expiresAt: new Date(now.getTime() + REWARD_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
    },
  });

  // Update referral code stats
  await prisma!.referralCode.update({
    where: { id: referralCodeRecord.id },
    data: {
      totalOrders: { increment: 1 },
      totalEarnings: { increment: REFERRAL_CREDIT_AMOUNT },
    },
  });

  // Check for milestone rewards (every 3 referrals = free 50g)
  const completedCount = referralCodeRecord.totalOrders + 1; // +1 for this one
  const existingMilestoneCount = await prisma!.referralReward.count({
    where: {
      userId: referralCodeRecord.userId,
      type: 'MILESTONE_BONUS',
      status: { in: ['AVAILABLE', 'USED'] },
    },
  });

  if (
    completedCount % REFERRAL_MILESTONE_INTERVAL === 0 &&
    completedCount > 0 &&
    existingMilestoneCount < MAX_MILESTONE_REWARDS_PER_USER
  ) {
    await prisma!.referralReward.create({
      data: {
        userId: referralCodeRecord.userId,
        amount: getProductPrice('standard'),
        type: 'MILESTONE_BONUS',
        description: `Free 50g Standard Size (${completedCount} referrals milestone)`,
        status: 'AVAILABLE',
        expiresAt: new Date(now.getTime() + MILESTONE_EXPIRY_DAYS * 24 * 60 * 60 * 1000),
      },
    });
  }

  const rewards: TrackingResponse['rewards'] = {
    referrer: {
      type: 'credit',
      value: REFERRAL_CREDIT_AMOUNT,
      description: `$${REFERRAL_CREDIT_AMOUNT} credit on your next purchase`
    },
    referee: {
      type: 'product',
      value: getProductPrice('trial'),
      description: 'Free 12g Trial Size'
    }
  };

  return Response.json({
    success: true,
    referralId: redemptionId,
    rewardEligible: true,
    rewards,
    message: 'Referral purchase completed - rewards issued!'
  } satisfies TrackingResponse);
}
