/**
 * GET /api/referrals/stats
 * Get user's referral statistics and dashboard data
 *
 * Sprint 6C: "Give $5, Get $5" Referral Program
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../src/lib/prisma';
import { withRateLimit, RATE_LIMITS } from '../../../src/lib/security/rate-limit';
import {
  generateShareUrls,
  calculateMilestoneProgress,
  maskEmail,
  REFERRAL_CONFIG,
} from '../../../src/lib/referral';
import * as Sentry from '@sentry/nextjs';

interface ReferralActivity {
  id: string;
  refereeEmail: string;
  status: string;
  refereeDiscount: number;
  referrerCredit: number;
  createdAt: string;
  purchasedAt?: string;
}

interface AvailableReward {
  id: string;
  amount: number;
  type: string;
  description: string;
  status: string;
  expiresAt?: string;
  createdAt: string;
}

interface StatsResponse {
  success: boolean;
  data?: {
    code: string;
    shareUrl: string;
    shareUrls: ReturnType<typeof generateShareUrls>;
    stats: {
      totalClicks: number;
      totalSignups: number;
      totalOrders: number;
      totalEarnings: number;
      pendingReferrals: number;
      availableCredit: number;
    };
    milestoneProgress: {
      current: number;
      target: number;
      progress: number;
      nextReward: string;
    };
    recentActivity: ReferralActivity[];
    availableRewards: AvailableReward[];
  };
  error?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatsResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    // Get session - user must be logged in
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({
        success: false,
        error: 'You must be logged in to view referral stats',
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

    // Find user with referral code and related data
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        referralCode: {
          include: {
            redemptions: {
              orderBy: { createdAt: 'desc' },
              take: 10,
            },
          },
        },
        referralRewards: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // If user doesn't have a referral code, return empty stats
    if (!user.referralCode) {
      return res.status(200).json({
        success: true,
        data: {
          code: '',
          shareUrl: '',
          shareUrls: generateShareUrls('', userName),
          stats: {
            totalClicks: 0,
            totalSignups: 0,
            totalOrders: 0,
            totalEarnings: 0,
            pendingReferrals: 0,
            availableCredit: 0,
          },
          milestoneProgress: calculateMilestoneProgress(0),
          recentActivity: [],
          availableRewards: [],
        },
      });
    }

    const referralCode = user.referralCode;

    // Calculate pending referrals
    const pendingReferrals = referralCode.redemptions.filter(
      (r) => r.status === 'PENDING'
    ).length;

    // Calculate available credit from rewards
    const availableCredit = user.referralRewards
      .filter((r) => r.status === 'AVAILABLE')
      .reduce((sum, r) => sum + r.amount, 0);

    // Format recent activity with masked emails
    const recentActivity: ReferralActivity[] = referralCode.redemptions.map((r) => ({
      id: r.id,
      refereeEmail: maskEmail(r.refereeEmail),
      status: r.status,
      refereeDiscount: r.refereeDiscount,
      referrerCredit: r.referrerCredit,
      createdAt: r.createdAt.toISOString(),
      purchasedAt: r.purchasedAt?.toISOString(),
    }));

    // Format available rewards
    const availableRewards: AvailableReward[] = user.referralRewards
      .filter((r) => r.status === 'AVAILABLE')
      .map((r) => ({
        id: r.id,
        amount: r.amount,
        type: r.type,
        description: r.description || `$${r.amount} referral credit`,
        status: r.status,
        expiresAt: r.expiresAt?.toISOString(),
        createdAt: r.createdAt.toISOString(),
      }));

    const shareUrls = generateShareUrls(referralCode.code, userName);

    return res.status(200).json({
      success: true,
      data: {
        code: referralCode.code,
        shareUrl: shareUrls.shareUrl,
        shareUrls,
        stats: {
          totalClicks: referralCode.totalClicks,
          totalSignups: referralCode.totalSignups,
          totalOrders: referralCode.totalOrders,
          totalEarnings: referralCode.totalEarnings,
          pendingReferrals,
          availableCredit,
        },
        milestoneProgress: calculateMilestoneProgress(referralCode.totalOrders),
        recentActivity,
        availableRewards,
      },
    });
  } catch (error) {
    console.error('Error fetching referral stats:', error);
    Sentry.captureException(error);

    return res.status(500).json({
      success: false,
      error: 'Failed to fetch referral statistics',
    });
  }
}

export default withRateLimit(RATE_LIMITS.READ, handler);
