import { auth } from '@/auth';
import { generateShareUrls } from '@/lib/referral';
import { getReferralDashboardData } from '@/lib/referral-program';

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 100;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || now > record.resetTime) {
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
  const clientIp = 'unknown';
  const { allowed, remaining } = checkRateLimit(clientIp);
  const headers = new Headers();
  headers.set('X-RateLimit-Remaining', remaining.toString());

  if (!allowed) {
    return Response.json(
      {
        success: false,
        error: 'Too many requests. Please try again later.',
      },
      { status: 429, headers }
    );
  }

  try {
    const session = await auth();
    if (!session?.user?.email) {
      return Response.json(
        {
          success: false,
          error: 'You must be logged in to view referral stats',
        },
        { status: 401, headers }
      );
    }

    const userName = session.user.name || session.user.email.split('@')[0];
    const data = await getReferralDashboardData(session.user.email);

    if (!data) {
      return Response.json(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404, headers }
      );
    }

    const shareUrls = data.referralCode
      ? generateShareUrls(data.referralCode, userName)
      : generateShareUrls('', userName);

    return Response.json(
      {
        success: true,
        data: {
          code: data.referralCode,
          shareUrl: data.shareUrl,
          shareUrls,
          stats: {
            totalClicks: data.totalReferrals,
            totalSignups: data.totalReferrals - data.pendingReferrals,
            totalOrders: data.completedReferrals,
            totalEarnings: data.totalEarned,
            pendingReferrals: data.pendingReferrals,
            availableCredit: data.availableCredit,
          },
          milestoneProgress: data.milestoneProgress,
          recentActivity: data.recentActivity,
          availableRewards: data.availableRewards.map((reward) => ({
            id: reward.id,
            amount: reward.value,
            type: reward.type,
            description: reward.description,
            status: reward.isUsed ? 'USED' : 'AVAILABLE',
            expiresAt: reward.expiresAt,
            createdAt: reward.createdAt,
          })),
        },
      },
      { headers }
    );
  } catch {
    return Response.json(
      {
        success: false,
        error: 'Failed to fetch referral statistics',
      },
      { status: 500, headers }
    );
  }
}
