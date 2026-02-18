/**
 * GET /api/referrals/stats
 * Get user's referral statistics and dashboard data
 *
 * Sprint 6C: "Give $5, Get $5" Referral Program
 */

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import {
  generateShareUrls,
  calculateMilestoneProgress,
  maskEmail,

} from '@/lib/referral';

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

interface _StatsResponse {
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

// Rate limiting setup
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 100;
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

export async function GET(): Promise<Response> {
  // Note: We can't get IP from Request without access to headers
  // Using 'unknown' for rate limiting in App Router
  const clientIp = 'unknown';

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
    // Get session - user must be logged in
    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({
        success: false,
        error: 'You must be logged in to view referral stats',
      }, { status: 401, headers });
    }

    if (!prisma) {
      return Response.json({
        success: false,
        error: 'Database not available',
      }, { status: 503, headers });
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
      return Response.json({
        success: false,
        error: 'User not found',
      }, { status: 404, headers });
    }

    // If user doesn't have a referral code, return empty stats
    if (!user.referralCode) {
      return Response.json({
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
      }, { headers });
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

    return Response.json({
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
    }, { headers });
  } catch (error) {
    console.error('Error fetching referral stats:', error);

    return Response.json({
      success: false,
      error: 'Failed to fetch referral statistics',
    }, { status: 500, headers });
  }
}
