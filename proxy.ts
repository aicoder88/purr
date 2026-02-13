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
import { getRouteCachePolicy } from './src/lib/cache/route-cache-policy-map';
import {
  COMMERCIAL_EXPERIMENTS,
  isCommercialRoute,
  isExperimentVariant,
  normalizeRoutePath,
  type ExperimentVariant,
} from './src/lib/experiments/commercial';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
const EXPERIMENT_VISITOR_COOKIE_NAME = 'purrify_exp_vid';

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
  'SemrushBot', 'MJ12bot', 'DotBot',
  'DataForSeoBot', 'BLEXBot', 'YandexBot', 'BaiduSpider',
];

const COUNTRY_BLOCK_EXEMPT_USER_AGENTS = ['AhrefsBot', 'AhrefsSiteAudit'];

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
  const normalizedPath = normalizeRoutePath(pathWithoutLocale);
  if (normalizedPath === '/') return true;
  if (normalizedPath === '/blog' || normalizedPath.startsWith('/blog/')) return true;
  return isCommercialRoute(normalizedPath);
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

function mergeVaryHeaders(existing: string | null, additional: string[]): string {
  const merged = new Set<string>();

  if (existing) {
    existing
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .forEach((item) => merged.add(item));
  }

  additional
    .map((item) => item.trim())
    .filter(Boolean)
    .forEach((item) => merged.add(item));

  return Array.from(merged).join(', ');
}

function applyRouteCachePolicy(response: NextResponse, pathname: string): void {
  const policy = getRouteCachePolicy(pathname);
  if (!policy) {
    return;
  }

  response.headers.set('Cache-Control', policy.cacheControl);

  if (policy.vary && policy.vary.length > 0) {
    response.headers.set('Vary', mergeVaryHeaders(response.headers.get('Vary'), policy.vary));
  }
}

function getDeterministicBucket(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 10000;
  }
  return Math.abs(hash) % 100;
}

function assignExperimentVariant(visitorId: string, testSlug: string, trafficSplit: number): ExperimentVariant {
  const bucket = getDeterministicBucket(`${visitorId}:${testSlug}`);
  return bucket < trafficSplit ? 'variant' : 'control';
}

function resolveCommercialExperimentContext(
  request: NextRequest,
  pathWithoutLocale: string
): {
  requestHeaders: Headers;
  cookiesToSet: Array<{ name: string; value: string; maxAge: number }>;
} {
  const requestHeaders = new Headers();
  const cookiesToSet: Array<{ name: string; value: string; maxAge: number }> = [];

  if (!isCommercialRoute(pathWithoutLocale)) {
    return { requestHeaders, cookiesToSet };
  }

  const existingVisitorId = request.cookies.get(EXPERIMENT_VISITOR_COOKIE_NAME)?.value;
  const visitorId = existingVisitorId && existingVisitorId.length > 0
    ? existingVisitorId
    : crypto.randomUUID();

  if (!existingVisitorId) {
    cookiesToSet.push({
      name: EXPERIMENT_VISITOR_COOKIE_NAME,
      value: visitorId,
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  for (const experiment of COMMERCIAL_EXPERIMENTS) {
    const cookieVariant = request.cookies.get(experiment.cookieName)?.value;
    const variant = isExperimentVariant(cookieVariant)
      ? cookieVariant
      : assignExperimentVariant(visitorId, experiment.slug, experiment.trafficSplit);

    requestHeaders.set(experiment.headerName, variant);

    if (!isExperimentVariant(cookieVariant)) {
      cookiesToSet.push({
        name: experiment.cookieName,
        value: variant,
        maxAge: 60 * 60 * 24 * 30,
      });
    }
  }

  return { requestHeaders, cookiesToSet };
}

function persistExperimentCookies(
  response: NextResponse,
  cookiesToSet: Array<{ name: string; value: string; maxAge: number }>
): void {
  for (const cookie of cookiesToSet) {
    response.cookies.set(cookie.name, cookie.value, {
      path: '/',
      maxAge: cookie.maxAge,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const userAgentLower = userAgent.toLowerCase();
  const isCountryBlockExempt = COUNTRY_BLOCK_EXEMPT_USER_AGENTS.some((bot) =>
    userAgentLower.includes(bot.toLowerCase())
  );

  // @ts-expect-error - geo is added by Vercel edge runtime
  const country = request.geo?.country || request.headers.get('cf-ipcountry') || 'unknown';

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const blockedBot = BLOCKED_USER_AGENTS.find((bot) =>
    userAgentLower.includes(bot.toLowerCase())
  );

  if (blockedBot) {
    return new NextResponse('Forbidden', {
      status: 403,
      headers: { 'X-Blocked-Reason': 'Bot detected' }
    });
  }

  if (BLOCKED_COUNTRIES.includes(country) && !isCountryBlockExempt) {
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
  const pathWithoutLocale = getPathWithoutLocale(pathname);
  const requestHeaders = buildRequestHeaders(request, resolvedLocale);
  const experimentContext = resolveCommercialExperimentContext(request, pathWithoutLocale);

  experimentContext.requestHeaders.forEach((value, key) => {
    requestHeaders.set(key, value);
  });

  if (pathLocale) {
    if (!supportsLocalePrefix(pathWithoutLocale)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = pathWithoutLocale;

      const redirectResponse = NextResponse.redirect(redirectUrl);
      persistLocale(redirectResponse, pathLocale);
      persistExperimentCookies(redirectResponse, experimentContext.cookiesToSet);
      applySecurityHeaders(redirectResponse);
      applyRouteCachePolicy(redirectResponse, pathname);
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
      persistExperimentCookies(response, experimentContext.cookiesToSet);
      applySecurityHeaders(response);
      applyRouteCachePolicy(response, pathname);
      return response;
    }

    const userRole = token.role as string;
    const adminOnlyRoutes = ['/admin/blog/categories', '/admin/blog/tags'];
    if (adminOnlyRoutes.some((route) => pathname.startsWith(route))) {
      if (userRole !== 'admin') {
        const response = NextResponse.redirect(new URL('/admin/blog', request.url));
        persistLocale(response, resolvedLocale);
        persistExperimentCookies(response, experimentContext.cookiesToSet);
        applySecurityHeaders(response);
        applyRouteCachePolicy(response, pathname);
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
    persistExperimentCookies(response, experimentContext.cookiesToSet);
    applySecurityHeaders(response);
    applyRouteCachePolicy(response, pathname);
    return response;
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  persistLocale(response, resolvedLocale);
  persistExperimentCookies(response, experimentContext.cookiesToSet);
  applySecurityHeaders(response);
  applyRouteCachePolicy(response, pathname);
  return response;
}

export const config = {
  matcher: [
    // Exclude API routes from middleware to avoid counting health checks (and other API traffic)
    // as Vercel Edge Requests. Locale/experiments/country-bot logic is not needed for /api/*.
    // Also exclude Sentry tunnel route to keep client error delivery out of middleware.
    '/((?!_next/static|_next/image|favicon.ico|api|monitoring|.*\\.).*)',
  ],
};
