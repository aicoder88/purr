import type { Locale } from '@/i18n/config';

const LOCALE_SEGMENT_PATTERN = /^\/(en|fr|zh|es)(?=\/|$)/;

const COMMERCIAL_ROUTE_PATHS = [
  '/products',
  '/learn',
  '/try-free',
  '/reviews',
] as const;

function normalizeRoutePath(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }

  // Collapse multiple slashes to single slash
  const cleanPath = pathname.replace(/\/+/g, '/');
  const stripped = cleanPath.replace(/\/+$/, '');
  return stripped.length === 0 ? '/' : stripped;
}

function normalizePathname(pathname: string): string {
  if (!pathname) {
    return '/';
  }

  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  // Collapse multiple slashes to single slash
  const cleanPath = withLeadingSlash.replace(/\/+/g, '/');
  const trimmed = cleanPath.replace(/\/+$/, '');
  return trimmed.length === 0 ? '/' : trimmed;
}

function isCommercialRoute(pathname: string): boolean {
  return COMMERCIAL_ROUTE_PATHS.includes(normalizeRoutePath(pathname) as (typeof COMMERCIAL_ROUTE_PATHS)[number]);
}

function supportsLocalePrefix(pathWithoutLocale: string): boolean {
  const normalizedPath = normalizeRoutePath(pathWithoutLocale);
  if (normalizedPath === '/') {
    return true;
  }

  if (normalizedPath === '/blog' || normalizedPath.startsWith('/blog/')) {
    return true;
  }

  return isCommercialRoute(normalizedPath);
}

function splitPathAndSuffix(path: string): { pathname: string; suffix: string } {
  const queryIndex = path.indexOf('?');
  const hashIndex = path.indexOf('#');

  if (queryIndex === -1 && hashIndex === -1) {
    return { pathname: path, suffix: '' };
  }

  const splitIndex =
    queryIndex === -1 ? hashIndex :
      hashIndex === -1 ? queryIndex :
        Math.min(queryIndex, hashIndex);

  return {
    pathname: path.slice(0, splitIndex),
    suffix: path.slice(splitIndex),
  };
}

export function getLocaleFromPath(pathname: string): Locale | null {
  const normalizedPath = normalizePathname(pathname);
  const match = normalizedPath.match(LOCALE_SEGMENT_PATTERN);

  if (!match) {
    return null;
  }

  return match[1] as Locale;
}

export function stripLocaleFromPath(pathname: string): string {
  const normalizedPath = normalizePathname(pathname);
  const stripped = normalizedPath.replace(LOCALE_SEGMENT_PATTERN, '');
  return stripped.length === 0 ? '/' : stripped;
}

export function localizePath(path: string, locale: Locale): string {
  const { pathname, suffix } = splitPathAndSuffix(path);
  const pathWithoutLocale = stripLocaleFromPath(pathname);

  if (!supportsLocalePrefix(pathWithoutLocale)) {
    return `${pathWithoutLocale}${suffix}`;
  }

  const normalizedPath = normalizeRoutePath(pathWithoutLocale);
  const isBlogPath = normalizedPath === '/blog' || normalizedPath.startsWith('/blog/');

  if (locale === 'en') {
    const englishPath = isBlogPath
      ? `${pathWithoutLocale === '/' ? '/en' : `/en${pathWithoutLocale}`}`
      : pathWithoutLocale;

    return `${englishPath}${suffix}`;
  }

  const localizedPath = pathWithoutLocale === '/'
    ? `/${locale}`
    : `/${locale}${pathWithoutLocale}`;

  return `${localizedPath}${suffix}`;
}
