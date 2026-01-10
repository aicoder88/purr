/**
 * Next.js Middleware
 *
 * Handles:
 * 1. Affiliate link tracking - intercepts ?ref= params and redirects to tracking API
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Regex for valid affiliate codes (alphanumeric, 6-12 characters)
const AFFILIATE_CODE_REGEX = /^[A-Za-z0-9]{6,12}$/;

// Paths to exclude from affiliate tracking
const EXCLUDED_PATHS = [
  '/api/',
  '/_next/',
  '/favicon',
  '/robots.txt',
  '/sitemap',
  '/manifest.json',
];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Check if this request has a ?ref= parameter
  const refCode = searchParams.get('ref');

  // Skip if no ref parameter or already on the track API
  if (!refCode) {
    return NextResponse.next();
  }

  // Skip excluded paths
  for (const excluded of EXCLUDED_PATHS) {
    if (pathname.startsWith(excluded)) {
      return NextResponse.next();
    }
  }

  // Validate affiliate code format
  if (!AFFILIATE_CODE_REGEX.test(refCode)) {
    // Invalid code format - remove the param and continue
    const cleanUrl = new URL(request.url);
    cleanUrl.searchParams.delete('ref');
    return NextResponse.redirect(cleanUrl);
  }

  // Build the redirect URL (original path without ?ref=)
  const destinationUrl = new URL(request.url);
  destinationUrl.searchParams.delete('ref');

  // Build tracking URL
  const trackingUrl = new URL('/api/affiliate/track', request.url);
  trackingUrl.searchParams.set('ref', refCode);
  trackingUrl.searchParams.set('redirect', destinationUrl.pathname + destinationUrl.search);

  // Redirect to tracking API
  return NextResponse.redirect(trackingUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - API routes (they don't need affiliate tracking redirect)
     * - Static files (images, etc.)
     * - Next.js internals
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)',
  ],
};
