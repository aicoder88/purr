/**
 * Next.js 16 Proxy Configuration
 * Combines admin authentication, GEO (Generative Engine Optimization), 
 * i18n (next-intl), security, and performance middleware
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { isAICrawler, getAICrawlerName } from './src/lib/ai-user-agents';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';

// Define paths that should bypass middleware
const PUBLIC_PATHS = [
  '/_next/',
  '/static/',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/sitemap/',
  '/api/',
  '/images/',
  '/optimized/',
  '/fonts/',
];

// Define paths that should bypass i18n (API routes, etc.)
const I18N_SKIP_PATHS = [
  '/api/',
  '/_next/',
  '/static/',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap',
];

/**
 * Check if a path should bypass middleware processing
 */
function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

/**
 * Check if a path should skip i18n middleware
 */
function shouldSkipI18n(pathname: string): boolean {
  return I18N_SKIP_PATHS.some((path) => pathname.startsWith(path));
}

// Create next-intl middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: true,
});

// Countries to block
const BLOCKED_COUNTRIES = ['SG']; // Singapore

// Blocked User Agents
const BLOCKED_USER_AGENTS = [
  'SemrushBot', 'AhrefsBot', 'MJ12bot', 'DotBot',
  'DataForSeoBot', 'BLEXBot', 'YandexBot', 'BaiduSpider',
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  // @ts-expect-error - geo is added by Vercel edge runtime
  const country = request.geo?.country || request.headers.get('cf-ipcountry') || 'unknown';

  // Skip middleware for public assets
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Block known bad bots
  const blockedBot = BLOCKED_USER_AGENTS.find(bot =>
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );

  if (blockedBot) {
    return new NextResponse('Forbidden', {
      status: 403,
      headers: { 'X-Blocked-Reason': 'Bot detected' }
    });
  }

  // Block specific countries
  if (BLOCKED_COUNTRIES.includes(country)) {
    return new NextResponse('Forbidden', {
      status: 403,
      headers: {
        'X-Blocked-Reason': 'Country blocked',
        'X-Country': country,
      }
    });
  }

  // Handle i18n for non-API routes
  /*
  if (!shouldSkipI18n(pathname)) {
    const intlResponse = intlMiddleware(request);
    if (intlResponse) {
      // Continue with other middleware after i18n
      // Protect /admin routes (except login)
      if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        const token = await getToken({
          req: request,
          secret: process.env.NEXTAUTH_SECRET
        });

        if (!token) {
          const url = new URL('/admin/login', request.url);
          url.searchParams.set('callbackUrl', pathname);
          return NextResponse.redirect(url);
        }

        // Check role for specific routes
        const userRole = token.role as string;
        const adminOnlyRoutes = ['/admin/blog/categories', '/admin/blog/tags'];
        if (adminOnlyRoutes.some(route => pathname.startsWith(route))) {
          if (userRole !== 'admin') {
            return NextResponse.redirect(new URL('/admin/blog', request.url));
          }
        }
      }

      // Check for AI crawler
      const isAI = isAICrawler(userAgent);
      if (isAI) {
        const aiCrawlerName = getAICrawlerName(userAgent) || 'unknown';
        intlResponse.headers.set('X-GEO-Detected', 'true');
        intlResponse.headers.set('X-AI-Crawler', aiCrawlerName);
        intlResponse.headers.set('X-GEO-Version', '1.0.0');
        intlResponse.headers.set('X-Content-Optimized-For', 'AI-Consumption');
        intlResponse.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
      }

      // Add security headers
      intlResponse.headers.set('X-DNS-Prefetch-Control', 'on');
      intlResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
      intlResponse.headers.set('X-Content-Type-Options', 'nosniff');
      intlResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

      // Add GEO readiness header for debugging
      if (process.env.NODE_ENV === 'development') {
        intlResponse.headers.set('X-GEO-Ready', 'true');
      }

      return intlResponse;
    }
  }
  */

  // Protect /admin routes (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });

    if (!token) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    // Check role for specific routes
    const userRole = token.role as string;
    const adminOnlyRoutes = ['/admin/blog/categories', '/admin/blog/tags'];
    if (adminOnlyRoutes.some(route => pathname.startsWith(route))) {
      if (userRole !== 'admin') {
        return NextResponse.redirect(new URL('/admin/blog', request.url));
      }
    }
  }

  // Check for AI crawler
  const isAI = isAICrawler(userAgent);
  if (isAI) {
    const aiCrawlerName = getAICrawlerName(userAgent) || 'unknown';
    const url = request.nextUrl.clone();
    url.searchParams.set('_ai', '1');
    url.searchParams.set('_ai_crawler', aiCrawlerName);
    const response = NextResponse.rewrite(url);
    response.headers.set('X-GEO-Detected', 'true');
    response.headers.set('X-AI-Crawler', aiCrawlerName);
    response.headers.set('X-GEO-Version', '1.0.0');
    response.headers.set('X-Content-Optimized-For', 'AI-Consumption');
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    return response;
  }

  // For regular users, add security headers
  const response = NextResponse.next();
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-GEO-Ready', 'true');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
