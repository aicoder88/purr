import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import {
  getLocaleFromPath,
  localizePath,
  normalizeLocalePathCasing,
} from './src/lib/i18n/locale-path';
import { shouldRedirectToLocalizedPath } from './src/lib/i18n/locale-redirect';
import type { Locale } from './src/i18n/config';

const ADMIN_ONLY_ROUTES = ['/admin/blog/categories', '/admin/blog/tags'];
const ADMIN_LOGIN_PATH = '/admin/login';
const ADMIN_HOME_PATH = '/admin/blog';
const ADMIN_LOGIN_ROUTE = /^\/admin\/login(?:\/|$)/;
const CANONICAL_ORIGIN = 'https://www.purrify.ca';
const CANONICAL_HOST = 'www.purrify.ca';
const TRACKING_QUERY_PARAMS = new Set(['ref', 'src', 'ctx', 'med']);
const QUERY_POLICY_BYPASS_PREFIXES = [
  '/api',
  '/_next',
  '/admin',
  '/auth',
];
const FUNCTIONAL_QUERY_PARAMS_BY_PREFIX: Array<{
  prefix: string;
  keys: string[];
}> = [
    {
      prefix: '/search',
      keys: ['q'],
    },
    {
      prefix: '/fr/search',
      keys: ['q'],
    },
    {
      prefix: '/blog',
      keys: ['page'],
    },
    {
      prefix: '/fr/blog',
      keys: ['page'],
    },
    {
      prefix: '/tools/cat-litter-calculator',
      keys: ['cats', 'litter'],
    },
    {
      prefix: '/thank-you',
      keys: ['session_id', 'sessionId', 'checkout_session_id', 'payment_intent', 'redirect_status'],
    },
  ];
const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
const LOCALE_COOKIE_SOURCE_NAME = 'NEXT_LOCALE_SOURCE';
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const QUEBEC_REGION_CODES = new Set(['QC']);

function isLocalHost(hostname: string): boolean {
  return hostname === 'localhost'
    || hostname.startsWith('127.0.0.1')
    || hostname.endsWith('.local');
}

function normalizeRequestedLocale(locale: string | null | undefined): Locale | null {
  const normalizedLocale = locale?.trim().toLowerCase();
  return normalizedLocale === 'fr' || normalizedLocale === 'en' ? normalizedLocale : null;
}

function getCookieLocale(request: NextRequest): Locale | null {
  return normalizeRequestedLocale(request.cookies.get(LOCALE_COOKIE_NAME)?.value);
}

export function getLocaleFromGeo(country: string | null | undefined, region: string | null | undefined): Locale | null {
  const normalizedCountry = country?.toUpperCase();
  const normalizedRegion = region?.toUpperCase();

  if (normalizedCountry === 'CA' && normalizedRegion && QUEBEC_REGION_CODES.has(normalizedRegion)) {
    return 'fr';
  }

  return null;
}


export function detectPreferredLocale({
  cookieLocale,
  cookieSource,
  country,
  region,
}: {
  cookieLocale?: string | null;
  cookieSource?: string | null;
  country?: string | null;
  region?: string | null;
}): Locale {
  return (
    (cookieSource === 'manual' ? normalizeRequestedLocale(cookieLocale) : null)
    ?? getLocaleFromGeo(country, region)
    ?? 'en'
  );
}

function setLocaleCookie(response: NextResponse, request: NextRequest, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: 'strict',
    secure: request.nextUrl.protocol === 'https:',
  });
  response.cookies.set(LOCALE_COOKIE_SOURCE_NAME, 'manual', {
    path: '/',
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: 'strict',
    secure: request.nextUrl.protocol === 'https:',
  });
}

export function getAllowedQueryParams(pathname: string): Set<string> {
  const allowed = new Set(TRACKING_QUERY_PARAMS);
  for (const rule of FUNCTIONAL_QUERY_PARAMS_BY_PREFIX) {
    if (pathname === rule.prefix || pathname.startsWith(`${rule.prefix}/`)) {
      for (const key of rule.keys) {
        allowed.add(key);
      }
    }
  }
  return allowed;
}

function shouldBypassQueryPolicy(pathname: string): boolean {
  return QUERY_POLICY_BYPASS_PREFIXES.some((prefix) =>
    pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  const requestHasQueryParams = request.nextUrl.searchParams.size > 0;

  const nextWithPathnameHeader = (setNoindexForQueryParams = false) => {
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    if (setNoindexForQueryParams) {
      response.headers.set('x-robots-tag', 'noindex, follow');
    }
    return response;
  };

  const incomingHost = request.nextUrl.hostname.toLowerCase();
  const forwardedProto = (request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '')).toLowerCase();
  const shouldNormalizeHost =
    !isLocalHost(incomingHost)
    && (incomingHost === 'purrify.ca' || incomingHost === CANONICAL_HOST)
    && (incomingHost !== CANONICAL_HOST || forwardedProto !== 'https');

  if (shouldNormalizeHost) {
    const canonicalUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, CANONICAL_ORIGIN);
    return NextResponse.redirect(canonicalUrl, 301);
  }

  if (request.nextUrl.searchParams.size > 0 && !shouldBypassQueryPolicy(pathname)) {
    const allowedParams = getAllowedQueryParams(pathname);
    const sanitizedUrl = request.nextUrl.clone();
    let hasRemovedParam = false;

    for (const key of [...sanitizedUrl.searchParams.keys()]) {
      if (!allowedParams.has(key)) {
        sanitizedUrl.searchParams.delete(key);
        hasRemovedParam = true;
      }
    }

    if (hasRemovedParam) {
      return NextResponse.redirect(sanitizedUrl, 301);
    }
  }

  const normalizedLocalePath = normalizeLocalePathCasing(pathname);
  if (normalizedLocalePath !== pathname) {
    const normalizedUrl = request.nextUrl.clone();
    normalizedUrl.pathname = normalizedLocalePath;
    return NextResponse.redirect(normalizedUrl, 301);
  }

  const pathnameLocale = getLocaleFromPath(pathname);
  if (!pathname.startsWith('/admin')) {
    if (pathnameLocale) {
      const response = nextWithPathnameHeader(requestHasQueryParams);
      if (getCookieLocale(request) !== pathnameLocale) {
        setLocaleCookie(response, request, pathnameLocale);
      }
      return response;
    }

    const preferredLocale = detectPreferredLocale({
      cookieLocale: request.cookies.get(LOCALE_COOKIE_NAME)?.value,
      cookieSource: request.cookies.get(LOCALE_COOKIE_SOURCE_NAME)?.value,
      country: request.headers.get('x-vercel-ip-country'),
      region: request.headers.get('x-vercel-ip-country-region'),
    });
    if (preferredLocale === 'fr') {
      const localizedPath = localizePath(pathname, preferredLocale);
      if (shouldRedirectToLocalizedPath(pathname, localizedPath)) {
        const localizedUrl = request.nextUrl.clone();
        localizedUrl.pathname = localizedPath;

        return NextResponse.redirect(localizedUrl, 307);
      }
    }
  }

  if (!pathname.startsWith('/admin')) {
    return nextWithPathnameHeader(requestHasQueryParams);
  }

  // Login page is intentionally public.
  if (ADMIN_LOGIN_ROUTE.test(pathname)) {
    return nextWithPathnameHeader();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: forwardedProto === 'https' || request.nextUrl.protocol === 'https:',
  });

  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = ADMIN_LOGIN_PATH;
    loginUrl.search = '';
    loginUrl.searchParams.set('callbackUrl', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = token.role as string | undefined;
  if (ADMIN_ONLY_ROUTES.some((route) => pathname.startsWith(route)) && userRole !== 'admin') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = ADMIN_HOME_PATH;
    redirectUrl.search = '';
    return NextResponse.redirect(redirectUrl);
  }

  return nextWithPathnameHeader();
}

export const config = {
  matcher: [
    // Only run proxy logic for app routes. Static assets and file requests
    // bypass proxy execution so they do not pay middleware overhead.
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
