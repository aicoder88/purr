/**
 * Affiliate Click Tracking API
 *
 * This endpoint:
 * 1. Validates the affiliate code from ?ref=CODE
 * 2. Sets a 90-day cookie with affiliate tracking data
 * 3. Records the click in the database
 * 4. Redirects to the clean URL (without ?ref= param)
 */

import { createHash, randomUUID } from 'crypto';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Cookie configuration
const AFFILIATE_COOKIE_NAME = 'purrify_ref';
const COOKIE_MAX_AGE = 90 * 24 * 60 * 60; // 90 days in seconds

// Regex for valid affiliate codes (alphanumeric, 6-12 characters)
const AFFILIATE_CODE_REGEX = /^[A-Za-z0-9]{6,12}$/;

/**
 * Hash the IP address for privacy
 */
function hashIP(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').substring(0, 32);
}

/**
 * Get client IP from request headers
 */
function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return '0.0.0.0';
}

/**
 * Parse existing affiliate cookie
 */
function parseAffiliateCookie(cookie: string | undefined): { code: string; sessionId: string } | null {
  if (!cookie) return null;
  try {
    const [code, sessionId] = cookie.split(':');
    if (code && sessionId && AFFILIATE_CODE_REGEX.test(code)) {
      return { code, sessionId };
    }
  } catch {
    return null;
  }
  return null;
}

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const ref = searchParams.get('ref');
  const redirectParam = searchParams.get('redirect');

  // Validate ref parameter
  if (!ref) {
    // If no ref, redirect to home
    redirect('/');
  }

  // Validate affiliate code format
  const affiliateCode = ref.toUpperCase();
  if (!AFFILIATE_CODE_REGEX.test(affiliateCode)) {
    console.warn(`Invalid affiliate code format: ${ref}`);
    // Redirect without setting cookie
    const redirectUrl = redirectParam || '/';
    redirect(redirectUrl);
  }

  try {
    // Check database connection
    if (!prisma) {
      console.error('Database connection not established');
      const redirectUrl = redirectParam || '/';
      redirect(redirectUrl);
    }

    // Check if we already have a valid cookie for this session
    const cookieStore = await cookies();
    const existingCookieValue = cookieStore.get(AFFILIATE_COOKIE_NAME)?.value;
    const existingCookie = parseAffiliateCookie(existingCookieValue);

    // If same affiliate code, just redirect (don't record duplicate click)
    if (existingCookie && existingCookie.code === affiliateCode) {
      const redirectUrl = redirectParam || '/';
      redirect(redirectUrl);
    }

    // Verify affiliate exists and is active
    const affiliate = await prisma.affiliate.findFirst({
      where: {
        code: affiliateCode,
        status: 'ACTIVE',
      },
      select: {
        id: true,
        code: true,
      },
    });

    if (!affiliate) {
      console.warn(`Affiliate not found or inactive: ${affiliateCode}`);
      // Redirect without setting cookie
      const redirectUrl = redirectParam || '/';
      redirect(redirectUrl);
    }

    // Generate session ID for tracking this visit
    const sessionId = randomUUID();

    // Prepare click data
    const clientIP = getClientIP(req);
    const ipHash = hashIP(clientIP);
    const userAgent = req.headers.get('user-agent') || null;
    const referrer = req.headers.get('referer') || null;
    const landingPage = redirectParam || '/';

    // Record the click in database
    await prisma.affiliateClick.create({
      data: {
        affiliateId: affiliate.id,
        ipHash,
        userAgent,
        referrer,
        landingPage,
        sessionId,
      },
    });

    // Set affiliate cookie (90 days)
    const cookieValue = `${affiliate.code}:${sessionId}`;
    cookieStore.set(AFFILIATE_COOKIE_NAME, cookieValue, {
      path: '/',
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });

    // Redirect to clean URL
    redirect(landingPage);
  } catch (error) {
    console.error('Affiliate tracking error:', error);
    // On error, redirect anyway (don't block user experience)
    const redirectUrl = redirectParam || '/';
    redirect(redirectUrl);
  }
}
