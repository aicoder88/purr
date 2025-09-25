import { NextApiRequest, NextApiResponse } from 'next';

interface ReferralTracking {
  referralId?: string;
  referrerId: string;
  refereeEmail: string;
  refereeId?: string;
  status: 'pending' | 'completed' | 'expired' | 'cancelled';
  trackingData?: {
    source?: string;
    medium?: string;
    campaign?: string;
    utmParameters?: Record<string, string>;
  };
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

// In-memory storage for demo - replace with database
const referralActivities = new Map<string, ReferralTracking>();
const referralRewards = new Map<string, any>();

export default async function handler(req: NextApiRequest, res: NextApiResponse<TrackingResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const {
      action,
      referralCode,
      refereeEmail,
      refereeId,
      orderId,
      orderValue,
      trackingData
    } = req.body;

    if (!action || !referralCode) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: action, referralCode'
      });
    }

    // Validate referral code exists (this would be a database lookup)
    const referralCodeData = getMockReferralCode(referralCode);
    if (!referralCodeData) {
      return res.status(404).json({
        success: false,
        error: 'Invalid referral code'
      });
    }

    const referralId = `ref_activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    switch (action) {
      case 'click':
        // Track referral link click
        await trackReferralClick(referralId, referralCodeData.userId, refereeEmail, trackingData);

        res.status(200).json({
          success: true,
          referralId,
          message: 'Referral click tracked successfully'
        });
        break;

      case 'signup':
        // Track referee signup
        await trackReferralSignup(referralId, referralCodeData.userId, refereeEmail, refereeId, trackingData);

        res.status(200).json({
          success: true,
          referralId,
          rewardEligible: false,
          message: 'Referral signup tracked - rewards pending purchase completion'
        });
        break;

      case 'purchase':
        // Track completed purchase and issue rewards
        const rewards = await trackReferralPurchase(
          referralId,
          referralCodeData.userId,
          refereeEmail,
          refereeId,
          orderId,
          orderValue,
          trackingData
        );

        res.status(200).json({
          success: true,
          referralId,
          rewardEligible: true,
          rewards,
          message: 'Referral purchase completed - rewards issued!'
        });
        break;

      default:
        res.status(400).json({
          success: false,
          error: 'Invalid action. Must be: click, signup, or purchase'
        });
    }

  } catch (error) {
    console.error('Error tracking referral:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track referral activity'
    });
  }
}

// Helper functions for tracking different referral events
async function trackReferralClick(
  referralId: string,
  referrerId: string,
  refereeEmail: string,
  trackingData?: any
) {
  const tracking: ReferralTracking = {
    referralId,
    referrerId,
    refereeEmail,
    status: 'pending',
    trackingData
  };

  referralActivities.set(referralId, tracking);

  // Analytics tracking
  if (typeof global !== 'undefined' && (global as any).gtag) {
    (global as any).gtag('event', 'referral_click', {
      event_category: 'referrals',
      event_label: 'link_click',
      custom_parameter_1: referrerId,
      custom_parameter_2: refereeEmail
    });
  }
}

async function trackReferralSignup(
  referralId: string,
  referrerId: string,
  refereeEmail: string,
  refereeId?: string,
  trackingData?: any
) {
  const tracking: ReferralTracking = {
    referralId,
    referrerId,
    refereeEmail,
    refereeId,
    status: 'pending',
    trackingData
  };

  referralActivities.set(referralId, tracking);

  // Analytics tracking
  if (typeof global !== 'undefined' && (global as any).gtag) {
    (global as any).gtag('event', 'referral_signup', {
      event_category: 'referrals',
      event_label: 'user_signup',
      custom_parameter_1: referrerId,
      custom_parameter_2: refereeEmail
    });
  }
}

async function trackReferralPurchase(
  referralId: string,
  referrerId: string,
  refereeEmail: string,
  refereeId?: string,
  orderId?: string,
  orderValue?: number,
  trackingData?: any
) {
  // Update referral status to completed
  const tracking: ReferralTracking = {
    referralId,
    referrerId,
    refereeEmail,
    refereeId,
    status: 'completed',
    trackingData
  };

  referralActivities.set(referralId, tracking);

  // Calculate rewards
  const rewards = {
    referrer: {
      type: 'discount' as const,
      value: 15, // 15% discount
      description: '15% off your next purchase'
    },
    referee: {
      type: 'product' as const,
      value: 6.99, // Free trial value
      description: 'Free 17g Trial Size'
    }
  };

  // Store rewards for later redemption
  referralRewards.set(`${referrerId}_${Date.now()}`, {
    userId: referrerId,
    type: 'referral_discount',
    value: 15,
    percentage: true,
    description: rewards.referrer.description,
    referralId,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
    isUsed: false
  });

  // Check for milestone rewards (every 3 referrals = free 60g)
  const referrerCompletedReferrals = await getReferrerCompletedCount(referrerId);
  if (referrerCompletedReferrals % 3 === 0 && referrerCompletedReferrals > 0) {
    referralRewards.set(`${referrerId}_milestone_${Date.now()}`, {
      userId: referrerId,
      type: 'free_product',
      productId: '60g',
      description: 'Free 60g Standard Size (Milestone Reward)',
      referralId,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(), // 6 months
      isUsed: false
    });
  }

  // Analytics tracking
  if (typeof global !== 'undefined' && (global as any).gtag) {
    (global as any).gtag('event', 'referral_conversion', {
      event_category: 'referrals',
      event_label: 'purchase_completed',
      value: orderValue || 0,
      custom_parameter_1: referrerId,
      custom_parameter_2: refereeEmail
    });
  }

  return rewards;
}

// Helper function to get referral code data (mock)
function getMockReferralCode(code: string) {
  const mockCodes = {
    'SARAH15-CAT': {
      userId: 'user_001',
      code: 'SARAH15-CAT',
      referrerName: 'Sarah M.',
      isActive: true
    },
    'MIKE42-CAT': {
      userId: 'user_002',
      code: 'MIKE42-CAT',
      referrerName: 'Michael R.',
      isActive: true
    }
  };

  return (mockCodes as any)[code] || null;
}

// Helper function to count completed referrals for a user
async function getReferrerCompletedCount(referrerId: string): Promise<number> {
  let count = 0;
  for (const [, activity] of referralActivities) {
    if (activity.referrerId === referrerId && activity.status === 'completed') {
      count++;
    }
  }
  return count;
}