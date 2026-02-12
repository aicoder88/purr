/**
 * Next.js 16 Proxy Configuration
 * Combines admin authentication, GEO (Generative Engine Optimization),
 * locale preference handling, and security middleware.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { isAICrawler, getAICrawlerName } from './src/lib/ai-user-agents';
import { defaultLocale, isValidLocale, type Locale } from './src/i18n/config';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

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
  '/manifest.json',
];

// Countries to block
const BLOCKED_COUNTRIES = ['SG']; // Singapore

// Blocked User Agents
const BLOCKED_USER_AGENTS = [
  'SemrushBot', 'AhrefsBot', 'MJ12bot', 'DotBot',
  'DataForSeoBot', 'BLEXBot', 'YandexBot', 'BaiduSpider',
];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

function applySecurityHeaders(response: NextResponse): void {
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-GEO-Ready', 'true');
  }
}

function getLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;

  const normalized = header.toLowerCase();

  if (normalized.includes('fr')) return 'fr';
  if (normalized.includes('zh')) return 'zh';
  if (normalized.includes('es')) return 'es';

  return defaultLocale;
}

function getPathLocale(pathname: string): Locale | null {
  const segment = pathname.split('/')[1];
  return isValidLocale(segment) ? segment : null;
}

function getPathWithoutLocale(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) {
    return '/';
  }

  if (isValidLocale(parts[0])) {
    const remaining = parts.slice(1);
    if (remaining.length === 0) {
      return '/';
    }

    return `/${remaining.join('/')}${pathname.endsWith('/') ? '/' : ''}`;
  }

  return pathname;
}

// Only these routes are explicitly implemented under /[locale]/...
function supportsLocalePrefix(pathWithoutLocale: string): boolean {
  if (pathWithoutLocale === '/') return true;
  return pathWithoutLocale === '/blog' || pathWithoutLocale === '/blog/' || pathWithoutLocale.startsWith('/blog/');
}

function resolveLocale(request: NextRequest, pathLocale: Locale | null): Locale {
  if (pathLocale) return pathLocale;

  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  return getLocaleFromAcceptLanguage(request.headers.get('accept-language'));
}

function buildRequestHeaders(request: NextRequest, locale: Locale): Headers {
  const headers = new Headers(request.headers);
  headers.set('x-purrify-locale', locale);
  return headers;
}

function persistLocale(response: NextResponse, locale: Locale): void {
  response.cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';

  // @ts-expect-error - geo is added by Vercel edge runtime
  const country = request.geo?.country || request.headers.get('cf-ipcountry') || 'unknown';

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const blockedBot = BLOCKED_USER_AGENTS.find((bot) =>
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );

  if (blockedBot) {
    return new NextResponse('Forbidden', {
      status: 403,
      headers: { 'X-Blocked-Reason': 'Bot detected' }
    });
  }

  if (BLOCKED_COUNTRIES.includes(country)) {
    return new NextResponse('Forbidden', {
      status: 403,
      headers: {
        'X-Blocked-Reason': 'Country blocked',
        'X-Country': country,
      }
    });
  }

  const pathLocale = getPathLocale(pathname);
  const resolvedLocale = resolveLocale(request, pathLocale);
  const requestHeaders = buildRequestHeaders(request, resolvedLocale);

  if (pathLocale) {
    const pathWithoutLocale = getPathWithoutLocale(pathname);

    if (!supportsLocalePrefix(pathWithoutLocale)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = pathWithoutLocale;

      const redirectResponse = NextResponse.redirect(redirectUrl);
      persistLocale(redirectResponse, pathLocale);
      applySecurityHeaders(redirectResponse);
      return redirectResponse;
    }
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
      const response = NextResponse.redirect(url);
      persistLocale(response, resolvedLocale);
      applySecurityHeaders(response);
      return response;
    }

    const userRole = token.role as string;
    const adminOnlyRoutes = ['/admin/blog/categories', '/admin/blog/tags'];
    if (adminOnlyRoutes.some((route) => pathname.startsWith(route))) {
      if (userRole !== 'admin') {
        const response = NextResponse.redirect(new URL('/admin/blog', request.url));
        persistLocale(response, resolvedLocale);
        applySecurityHeaders(response);
        return response;
      }
    }
  }

  const isAI = isAICrawler(userAgent);
  if (isAI) {
    const aiCrawlerName = getAICrawlerName(userAgent) || 'unknown';
    const url = request.nextUrl.clone();
    url.searchParams.set('_ai', '1');
    url.searchParams.set('_ai_crawler', aiCrawlerName);

    const response = NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });

    response.headers.set('X-GEO-Detected', 'true');
    response.headers.set('X-AI-Crawler', aiCrawlerName);
    response.headers.set('X-GEO-Version', '1.0.0');
    response.headers.set('X-Content-Optimized-For', 'AI-Consumption');
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    persistLocale(response, resolvedLocale);
    applySecurityHeaders(response);
    return response;
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  persistLocale(response, resolvedLocale);
  applySecurityHeaders(response);
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
