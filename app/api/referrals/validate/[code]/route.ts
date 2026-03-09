/**
 * GET /api/referrals/validate/[code]
 * Validate a referral code and return referrer details.
 */

import { REFERRAL_CONFIG } from '@/lib/referral';
import { validateReferralCodeForEmail } from '@/lib/referral-program';
import { checkRateLimit, createRateLimitHeaders, getClientIp } from '@/lib/rate-limit';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ code: string }> }
): Promise<Response> {
  const rateLimitResult = await checkRateLimit(getClientIp(req), 'generous');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return Response.json(
      {
        isValid: false,
        error: 'Too many requests. Please try again later.',
      },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  const { code } = await params;

  if (!code) {
    return Response.json(
      {
        isValid: false,
        error: 'Referral code is required',
      },
      { status: 400, headers: rateLimitHeaders }
    );
  }

  try {
    const result = await validateReferralCodeForEmail(code);

    return Response.json({
      isValid: true,
      code: result.code,
      referrerName: result.referrerName,
      discount: {
        type: 'fixed',
        value: REFERRAL_CONFIG.REFEREE_DISCOUNT,
        description: `$${REFERRAL_CONFIG.REFEREE_DISCOUNT} off qualifying orders over $${REFERRAL_CONFIG.MINIMUM_QUALIFYING_ORDER_SUBTOTAL}`,
      },
      expiresAt: result.expiresAt,
      usesRemaining: result.usesRemaining,
      message: `${result.referrerName} has shared Purrify with you! Get $${REFERRAL_CONFIG.REFEREE_DISCOUNT} off qualifying orders over $${REFERRAL_CONFIG.MINIMUM_QUALIFYING_ORDER_SUBTOTAL}.`,
    }, { headers: rateLimitHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to validate referral code';
    const status = message === 'Referral code not found' ? 404 : 400;

    return Response.json(
      {
        isValid: false,
        error: message,
      },
      { status, headers: rateLimitHeaders }
    );
  }
}
