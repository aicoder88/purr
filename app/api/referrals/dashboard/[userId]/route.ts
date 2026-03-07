import { auth } from '@/auth';
import { getReferralDashboardData, normalizeEmail } from '@/lib/referral-program';
import { verifyOrigin } from '@/lib/security/origin-check';

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;
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

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
): Promise<Response> {
  if (!verifyOrigin(req)) {
    return Response.json(
      {
        success: false,
        error: 'Forbidden',
      },
      { status: 403 }
    );
  }

  const { userId } = await params;
  const identifier = decodeURIComponent(userId || '').trim();
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const { allowed, remaining } = checkRateLimit(clientIp);
  const headers = new Headers();
  headers.set('X-RateLimit-Remaining', remaining.toString());

  if (!allowed) {
    return Response.json(
      {
        success: false,
        error: 'Too many dashboard requests. Please try again later.',
      },
      { status: 429, headers }
    );
  }

  if (!identifier) {
    return Response.json(
      {
        success: false,
        error: 'User ID is required',
      },
      { status: 400, headers }
    );
  }

  try {
    const session = await auth();

    if (session?.user) {
      const sessionUser = session.user as { id?: string; userId?: string; email?: string; role?: string };
      const isAdmin = ['admin', 'superadmin'].includes(sessionUser.role || '');
      const normalizedIdentifier = normalizeEmail(identifier);
      const isEmailLookup = normalizedIdentifier.includes('@');
      const isOwnerByEmail =
        isEmailLookup &&
        !!sessionUser.email &&
        normalizeEmail(sessionUser.email) === normalizedIdentifier;
      const sessionId = sessionUser.userId || sessionUser.id;
      const isOwnerById = !isEmailLookup && !!sessionId && sessionId === identifier;

      if (!isAdmin && !isOwnerByEmail && !isOwnerById) {
        return Response.json(
          {
            success: false,
            error: 'Forbidden: You can only view your own referral dashboard',
          },
          { status: 403, headers }
        );
      }
    }

    const data = await getReferralDashboardData(identifier);
    if (!data) {
      return Response.json(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404, headers }
      );
    }

    return Response.json(
      {
        success: true,
        data,
      },
      { headers }
    );
  } catch {
    return Response.json(
      {
        success: false,
        error: 'Failed to fetch referral dashboard data',
      },
      { status: 500, headers }
    );
  }
}
