/**
 * Affiliate Click Tracking API
 *
 * This endpoint:
 * 1. Validates the affiliate code from ?ref=CODE
 * 2. Sets a 90-day cookie with affiliate tracking data
 * 3. Records the click in the database
 * 4. Redirects to the clean URL (without ?ref= param)
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { createHash, randomUUID } from 'crypto';
import prisma from '@/lib/prisma';

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
function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || '0.0.0.0';
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ref, redirect } = req.query;

  // Validate ref parameter
  if (!ref || typeof ref !== 'string') {
    // If no ref, redirect to home
    return res.redirect(302, '/');
  }

  // Validate affiliate code format
  const affiliateCode = ref.toUpperCase();
  if (!AFFILIATE_CODE_REGEX.test(affiliateCode)) {
    console.warn(`Invalid affiliate code format: ${ref}`);
    // Redirect without setting cookie
    const redirectUrl = typeof redirect === 'string' ? redirect : '/';
    return res.redirect(302, redirectUrl);
  }

  try {
    // Check database connection
    if (!prisma) {
      console.error('Database connection not established');
      const redirectUrl = typeof redirect === 'string' ? redirect : '/';
      return res.redirect(302, redirectUrl);
    }

    // Check if we already have a valid cookie for this session
    const existingCookie = parseAffiliateCookie(req.cookies[AFFILIATE_COOKIE_NAME]);

    // If same affiliate code, just redirect (don't record duplicate click)
    if (existingCookie && existingCookie.code === affiliateCode) {
      const redirectUrl = typeof redirect === 'string' ? redirect : '/';
      return res.redirect(302, redirectUrl);
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
      const redirectUrl = typeof redirect === 'string' ? redirect : '/';
      return res.redirect(302, redirectUrl);
    }

    // Generate session ID for tracking this visit
    const sessionId = randomUUID();

    // Prepare click data
    const clientIP = getClientIP(req);
    const ipHash = hashIP(clientIP);
    const userAgent = req.headers['user-agent'] || null;
    const referrer = req.headers['referer'] || null;
    const redirectUrl = typeof redirect === 'string' ? redirect : '/';

    // Record the click in database
    await prisma.affiliateClick.create({
      data: {
        affiliateId: affiliate.id,
        ipHash,
        userAgent,
        referrer,
        landingPage: redirectUrl,
        sessionId,
      },
    });

    // Set affiliate cookie (90 days)
    const cookieValue = `${affiliate.code}:${sessionId}`;
    res.setHeader(
      'Set-Cookie',
      `${AFFILIATE_COOKIE_NAME}=${cookieValue}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax; Secure`
    );

    // Redirect to clean URL
    return res.redirect(302, redirectUrl);

  } catch (error) {
    console.error('Affiliate tracking error:', error);
    // On error, redirect anyway (don't block user experience)
    const redirectUrl = typeof redirect === 'string' ? redirect : '/';
    return res.redirect(302, redirectUrl);
  }
}
