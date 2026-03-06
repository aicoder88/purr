import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { calculateMilestoneProgress, generateShareUrls } from '@/lib/referral';
import { verifyOrigin } from '@/lib/security/origin-check';

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

// Rate limit for dashboard access: 30 requests per minute per IP
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;
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

function maskEmail(email: string): string {
  return email.replace(/(.{2}).+(@.+)/, '$1***$2');
}

function mapRewardType(type: string): Reward['type'] {
  if (type === 'MILESTONE_BONUS') {
    return 'free_product';
  }

  if (type === 'PROMOTIONAL') {
    return 'discount';
  }

  return 'credit';
}

function mapActivityStatus(redemption: {
  status: string;
  signedUpAt: Date | null;
  purchasedAt: Date | null;
}): ReferralActivity['status'] {
  if (redemption.status === 'COMPLETED' || redemption.purchasedAt) {
    return 'purchased';
  }

  if (redemption.status === 'EXPIRED' || redemption.status === 'CANCELLED') {
    return 'expired';
  }

  if (redemption.signedUpAt) {
    return 'signed_up';
  }

  return 'clicked';
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
): Promise<Response> {
  if (!verifyOrigin(req)) {
    return Response.json({
      success: false,
      error: 'Forbidden',
    }, { status: 403 });
  }

  const { userId } = await params;
  const identifier = decodeURIComponent(userId || '').trim();

  // Get client IP for rate limiting
  const forwardedFor = req.headers.get('x-forwarded-for');
  const clientIp = forwardedFor?.split(',')[0] || 'unknown';

  // Apply rate limiting
  const { allowed, remaining } = checkRateLimit(clientIp);
  const headers = new Headers();
  headers.set('X-RateLimit-Remaining', remaining.toString());

  if (!allowed) {
    return Response.json({
      success: false,
      error: 'Too many dashboard requests. Please try again later.'
    }, { status: 429, headers });
  }

  if (!identifier) {
    return Response.json({
      success: false,
      error: 'User ID is required'
    }, { status: 400, headers });
  }

  if (!prisma) {
    return Response.json({
      success: false,
      error: 'Database not available',
    }, { status: 503, headers });
  }

  try {
    const session = await auth();

    if (session?.user) {
      const sessionUser = session.user as { id?: string; userId?: string; email?: string; role?: string };
      const isAdmin = ['admin', 'superadmin'].includes(sessionUser.role || '');

      if (!isAdmin) {
        const normalizedIdentifier = identifier.toLowerCase();
        const isEmailLookup = normalizedIdentifier.includes('@');
        const isOwnerByEmail = isEmailLookup && sessionUser.email?.toLowerCase() === normalizedIdentifier;
        const sessionId = sessionUser.userId || sessionUser.id;
        const isOwnerById = !isEmailLookup && !!sessionId && sessionId === identifier;

        if (!isOwnerByEmail && !isOwnerById) {
          return Response.json({
            success: false,
            error: 'Forbidden: You can only view your own referral dashboard'
          }, { status: 403, headers });
        }
      }
    }

    const normalizedIdentifier = identifier.toLowerCase();
    const isEmailLookup = normalizedIdentifier.includes('@');

    const user = await prisma.user.findUnique({
      where: isEmailLookup ? { email: normalizedIdentifier } : { id: identifier },
      include: {
        referralCode: {
          include: {
            redemptions: {
              orderBy: { createdAt: 'desc' },
              take: 20,
            },
          },
        },
        referralRewards: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!user) {
      return Response.json({
        success: false,
        error: 'User not found',
      }, { status: 404, headers });
    }

    const userName = user.name?.split(' ')[0] || user.email?.split('@')[0] || 'Friend';

    if (!user.referralCode) {
      const emptyStats: ReferralStats = {
        userId: user.id,
        referralCode: '',
        shareUrl: '',
        totalReferrals: 0,
        completedReferrals: 0,
        pendingReferrals: 0,
        totalEarnings: 0,
        availableRewards: [],
        recentActivity: [],
        milestoneProgress: {
          current: 0,
          target: 5,
          nextReward: '$10 bonus',
          progress: 0,
        },
        socialShares: {
          email: 0,
          sms: 0,
          facebook: 0,
          twitter: 0,
          whatsapp: 0,
          linkedin: 0,
          total: 0,
        },
      };

      return Response.json({
        success: true,
        data: emptyStats,
      }, { headers });
    }

    const codeRecord = user.referralCode;
    const pendingReferrals = codeRecord.redemptions.filter((r) => r.status === 'PENDING').length;
    const completedReferrals = codeRecord.totalOrders;
    const totalReferrals = Math.max(
      codeRecord.totalSignups,
      codeRecord.totalClicks,
      completedReferrals + pendingReferrals
    );

    const shareUrls = generateShareUrls(codeRecord.code, userName);
    const milestone = calculateMilestoneProgress(completedReferrals);

    const availableRewards: Reward[] = user.referralRewards
      .filter((reward) => reward.status === 'AVAILABLE')
      .map((reward) => ({
        id: reward.id,
        type: mapRewardType(reward.type),
        value: reward.amount,
        description: reward.description || `$${reward.amount.toFixed(2)} referral credit`,
        expiresAt: reward.expiresAt?.toISOString() || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        isUsed: reward.status === 'USED',
        createdAt: reward.createdAt.toISOString(),
      }));

    const recentActivity: ReferralActivity[] = codeRecord.redemptions.slice(0, 10).map((redemption) => ({
      id: redemption.id,
      refereeEmail: maskEmail(redemption.refereeEmail),
      status: mapActivityStatus(redemption),
      createdAt: redemption.clickedAt?.toISOString() || redemption.createdAt.toISOString(),
      completedAt: redemption.purchasedAt?.toISOString() || redemption.signedUpAt?.toISOString(),
      orderValue: redemption.referrerCredit || undefined,
      rewardIssued: redemption.status === 'COMPLETED',
    }));

    const stats: ReferralStats = {
      userId: user.id,
      referralCode: codeRecord.code,
      shareUrl: shareUrls.shareUrl,
      totalReferrals,
      completedReferrals,
      pendingReferrals,
      totalEarnings: codeRecord.totalEarnings,
      availableRewards,
      recentActivity,
      milestoneProgress: {
        current: milestone.current,
        target: milestone.target,
        nextReward: milestone.nextReward,
        progress: milestone.progress,
      },
      socialShares: {
        email: 0,
        sms: 0,
        facebook: 0,
        twitter: 0,
        whatsapp: 0,
        linkedin: 0,
        total: 0,
      },
    };

    return Response.json({
      success: true,
      data: stats,
    }, { headers });
  } catch {
    return Response.json({
      success: false,
      error: 'Failed to fetch referral dashboard data'
    }, { status: 500, headers });
  }
}
