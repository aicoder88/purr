export interface RouteCachePolicy {
  cacheControl: string;
  vary?: string[];
}

const AUTH_ROUTE_PREFIXES = ['/admin', '/customer', '/affiliate', '/retailer'];

const COMMERCIAL_DYNAMIC_ROUTES = ['/products', '/learn', '/reviews'];

const BLOG_ROUTE_REGEX = /^\/(?:en|fr)?\/?blog(?:\/.*)?$/;

const LOCALE_OPTIONAL_PREFIX = /^(?:\/(?:en|fr))(\/.*)$/;

function normalizeRoutePath(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }

  const stripped = pathname.replace(/\/+$/, '');
  return stripped.length === 0 ? '/' : stripped;
}

function stripLocalePrefix(pathname: string): string {
  const match = normalizeRoutePath(pathname).match(LOCALE_OPTIONAL_PREFIX);
  return match?.[1] || pathname;
}

function isCommercialDynamicRoute(pathname: string): boolean {
  const basePath = stripLocalePrefix(pathname);
  return COMMERCIAL_DYNAMIC_ROUTES.includes(basePath);
}

function isAuthenticatedAppRoute(pathname: string): boolean {
  const normalizedPath = normalizeRoutePath(pathname);
  return AUTH_ROUTE_PREFIXES.some((prefix) => normalizedPath.startsWith(prefix));
}

export function getRouteCachePolicy(pathname: string): RouteCachePolicy | null {
  const normalizedPath = normalizeRoutePath(pathname);

  if (isAuthenticatedAppRoute(normalizedPath)) {
    return {
      cacheControl: 'private, no-store, no-cache, must-revalidate',
      vary: ['Cookie'],
    };
  }

  if (isCommercialDynamicRoute(normalizedPath)) {
    return {
      cacheControl: 'public, s-maxage=300, stale-while-revalidate=1800',
      vary: ['x-purrify-locale'],
    };
  }

  if (BLOG_ROUTE_REGEX.test(normalizedPath)) {
    return {
      cacheControl: 'public, s-maxage=1800, stale-while-revalidate=86400',
      vary: ['x-purrify-locale'],
    };
  }

  return null;
}
