import { NextApiRequest, NextApiResponse } from 'next';

type GtagFunction = (command: 'event' | 'config', action: string, params?: Record<string, unknown>) => void;

const getGtag = (): GtagFunction | undefined => {
  if (typeof global === 'undefined') {
    return undefined;
  }
  const maybeGtag = (global as typeof globalThis & { gtag?: unknown }).gtag;
  return typeof maybeGtag === 'function' ? (maybeGtag as GtagFunction) : undefined;
};

interface ReferralStats {
  userId: string;
  referralCode: string;
  shareUrl: string;
  totalReferrals: number;
  completedReferrals: number;
  pendingReferrals: number;
  totalEarnings: number;
  availableRewards: Reward[];
  recentActivity: ReferralActivity[];
  milestoneProgress: MilestoneProgress;
  socialShares: SocialShareStats;
}

interface Reward {
  id: string;
  type: 'discount' | 'credit' | 'free_product';
  value: number;
  description: string;
  code?: string;
  expiresAt: string;
  isUsed: boolean;
  createdAt: string;
}

interface ReferralActivity {
  id: string;
  refereeEmail: string;
  refereeName?: string;
  status: 'clicked' | 'signed_up' | 'purchased' | 'expired';
  createdAt: string;
  completedAt?: string;
  orderValue?: number;
  rewardIssued?: boolean;
}

interface MilestoneProgress {
  current: number;
  target: number;
  nextReward: string;
  progress: number; // percentage
}

interface SocialShareStats {
  email: number;
  sms: number;
  facebook: number;
  twitter: number;
  whatsapp: number;
  linkedin: number;
  total: number;
}

interface DashboardResponse {
  success: boolean;
  data?: ReferralStats;
  error?: string;
}

// Mock data - replace with database queries
const getMockReferralStats = (userId: string): ReferralStats => {
  return {
    userId,
    referralCode: 'SARAH15-CAT',
    shareUrl: 'https://www.purrify.ca/refer/SARAH15-CAT',
    totalReferrals: 12,
    completedReferrals: 8,
    pendingReferrals: 4,
    totalEarnings: 47.94, // 8 * $5.99 (estimated value per successful referral)
    availableRewards: [
      {
        id: 'reward_001',
        type: 'discount',
        value: 15,
        description: '15% off your next purchase',
        code: 'REF15-SARAH',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        isUsed: false,
        createdAt: '2024-01-20T10:30:00Z'
      },
      {
        id: 'reward_002',
        type: 'free_product',
        value: 19.99,
        description: 'Free 50g Standard Size (Milestone Reward)',
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        isUsed: false,
        createdAt: '2024-01-22T15:45:00Z'
      }
    ],
    recentActivity: [
      {
        id: 'activity_001',
        refereeEmail: 'jen@example.com',
        refereeName: 'Jennifer L.',
        status: 'purchased',
        createdAt: '2024-01-22T10:30:00Z',
        completedAt: '2024-01-22T11:15:00Z',
        orderValue: 19.99,
        rewardIssued: true
      },
      {
        id: 'activity_002',
        refereeEmail: 'mike@example.com',
        refereeName: 'Mike K.',
        status: 'signed_up',
        createdAt: '2024-01-21T14:20:00Z',
        rewardIssued: false
      },
      {
        id: 'activity_003',
        refereeEmail: 'anna@example.com',
        status: 'clicked',
        createdAt: '2024-01-20T16:45:00Z',
        rewardIssued: false
      }
    ],
    milestoneProgress: {
      current: 8,
      target: 9, // Next milestone at 9 referrals
      nextReward: 'Free 120g Family Pack',
      progress: 88.9 // (8/9) * 100
    },
    socialShares: {
      email: 15,
      sms: 8,
      facebook: 12,
      twitter: 5,
      whatsapp: 20,
      linkedin: 3,
      total: 63
    }
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<DashboardResponse>) {
  const { userId } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'User ID is required'
    });
  }

  try {
    // In production, this would be database queries
    // const referralStats = await getReferralStatsFromDB(userId);
    const referralStats = getMockReferralStats(userId);

    // Track dashboard view
    const gtag = getGtag();
    if (gtag) {
      gtag('event', 'referral_dashboard_view', {
        event_category: 'referrals',
        event_label: 'dashboard_access',
        custom_parameter_1: userId
      });
    }

    res.status(200).json({
      success: true,
      data: referralStats
    });

  } catch (error) {
    console.error('Error fetching referral dashboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch referral dashboard data'
    });
  }
}

// Helper function to calculate referral performance metrics
export function calculateReferralMetrics(stats: ReferralStats) {
  const conversionRate = stats.totalReferrals > 0
    ? (stats.completedReferrals / stats.totalReferrals) * 100
    : 0;

  const averageOrderValue = stats.recentActivity
    .filter(activity => activity.orderValue)
    .reduce((sum, activity) => sum + (activity.orderValue || 0), 0) /
    stats.completedReferrals || 0;

  const earningsPerReferral = stats.totalEarnings / stats.completedReferrals || 0;

  return {
    conversionRate: Math.round(conversionRate * 10) / 10,
    averageOrderValue: Math.round(averageOrderValue * 100) / 100,
    earningsPerReferral: Math.round(earningsPerReferral * 100) / 100,
    socialShareEffectiveness: stats.socialShares.total / stats.totalReferrals || 0
  };
}

// Helper function to generate achievement badges
export function generateAchievementBadges(completedReferrals: number) {
  const badges = [];

  if (completedReferrals >= 1) badges.push({ name: 'First Referral', icon: '🎯' });
  if (completedReferrals >= 3) badges.push({ name: 'Triple Threat', icon: '🏆' });
  if (completedReferrals >= 5) badges.push({ name: 'High Five', icon: '🖐️' });
  if (completedReferrals >= 10) badges.push({ name: 'Perfect Ten', icon: '💎' });
  if (completedReferrals >= 25) badges.push({ name: 'Super Referrer', icon: '⭐' });
  if (completedReferrals >= 50) badges.push({ name: 'Referral Master', icon: '👑' });

  return badges;
}
