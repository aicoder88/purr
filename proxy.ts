/**
 * Next.js 16 Proxy Configuration
 * Combines admin authentication, GEO (Generative Engine Optimization), 
 * security, and performance middleware
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { isAICrawler, getAICrawlerName } from './src/lib/ai-user-agents';

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

/**
 * Check if a path should bypass middleware processing
 */
function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';

  // Skip middleware for public assets
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

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

    // Only admins can access certain routes
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

    // Clone the URL and add AI markers
    const url = request.nextUrl.clone();
    url.searchParams.set('_ai', '1');
    url.searchParams.set('_ai_crawler', aiCrawlerName);

    // Create response with AI detection headers
    const response = NextResponse.rewrite(url);

    // Add GEO headers for downstream processing
    response.headers.set('X-GEO-Detected', 'true');
    response.headers.set('X-AI-Crawler', aiCrawlerName);
    response.headers.set('X-GEO-Version', '1.0.0');
    response.headers.set('X-Content-Optimized-For', 'AI-Consumption');

    // Add cache control for AI crawlers (respect crawl rate)
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');

    return response;
  }

  // For regular users, add security headers
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Add GEO readiness header for debugging
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-GEO-Ready', 'true');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
