import { NextApiRequest, NextApiResponse } from 'next';
import { getProductPrice } from '../../../src/lib/pricing';

interface TrackingData {
  source?: string;
  medium?: string;
  campaign?: string;
  utmParameters?: Record<string, string>;
}

interface ReferralTracking {
  referralId?: string;
  referrerId: string;
  refereeEmail: string;
  refereeId?: string;
  status: 'pending' | 'completed' | 'expired' | 'cancelled';
  trackingData?: TrackingData;
  orderId?: string;
  orderValue?: number;
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

interface ReferralRewardRecord {
  userId: string;
  type: 'referral_discount' | 'free_product';
  value?: number;
  percentage?: boolean;
  description: string;
  referralId: string;
  createdAt: string;
  expiresAt: string;
  isUsed: boolean;
  productId?: string;
  orderId?: string;
  orderValue?: number;
}

type GtagEventParams = Record<string, string | number | boolean | undefined>;

type AnalyticsGlobal = typeof globalThis & {
  gtag?: (command: 'event', eventName: string, params?: GtagEventParams) => void;
};

// In-memory storage for demo - replace with database
const referralActivities = new Map<string, ReferralTracking>();
const referralRewards = new Map<string, ReferralRewardRecord>();

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
    } = req.body as TrackReferralRequestBody;

    if (!action || !referralCode || !refereeEmail) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: action, referralCode, refereeEmail'
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
  trackingData?: TrackingData
): Promise<void> {
  const tracking: ReferralTracking = {
    referralId,
    referrerId,
    refereeEmail,
    status: 'pending',
    trackingData
  };

  referralActivities.set(referralId, tracking);

  // Analytics tracking
  const analyticsGlobal = globalThis as AnalyticsGlobal;
  if (analyticsGlobal.gtag) {
    analyticsGlobal.gtag('event', 'referral_click', {
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
  trackingData?: TrackingData
): Promise<void> {
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
  const analyticsGlobal = globalThis as AnalyticsGlobal;
  if (analyticsGlobal.gtag) {
    analyticsGlobal.gtag('event', 'referral_signup', {
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
  trackingData?: TrackingData
): Promise<TrackingResponse['rewards']> {
  // Update referral status to completed
  const tracking: ReferralTracking = {
    referralId,
    referrerId,
    refereeEmail,
    refereeId,
    status: 'completed',
    trackingData,
    orderId,
    orderValue
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
      value: getProductPrice('trial'),
      description: 'Free 12g Trial Size'
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
    isUsed: false,
    orderId,
    orderValue
  });

  // Check for milestone rewards (every 3 referrals = free 50g)
  const referrerCompletedReferrals = await getReferrerCompletedCount(referrerId);
  if (referrerCompletedReferrals % 3 === 0 && referrerCompletedReferrals > 0) {
    referralRewards.set(`${referrerId}_milestone_${Date.now()}`, {
      userId: referrerId,
      type: 'free_product',
      productId: '50g',
      description: 'Free 50g Standard Size (Milestone Reward)',
      referralId,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(), // 6 months
      isUsed: false,
      orderId,
      orderValue
    });
  }

  // Analytics tracking
  const analyticsGlobal = globalThis as AnalyticsGlobal;
  if (analyticsGlobal.gtag) {
    analyticsGlobal.gtag('event', 'referral_conversion', {
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
interface MockReferralCode {
  userId: string;
  code: string;
  referrerName: string;
  isActive: boolean;
}

function getMockReferralCode(code: string): MockReferralCode | null {
  const mockCodes: Record<string, MockReferralCode> = {
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

  return mockCodes[code] ?? null;
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
