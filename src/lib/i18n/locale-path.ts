import type { Locale } from '@/i18n/config';

const LOCALE_SEGMENT_PATTERN = /^\/(en|fr)(?=\/|$)/i;

const LOCALIZED_ROUTE_PREFIXES = [
  '/products',
  '/learn',
  '/blog',
  '/locations/province',
] as const;

const LOCALIZED_EXACT_ROUTE_PATHS = new Set([
  '/',
  '/reviews',
  '/support',
  '/support/shipping',
  '/case-studies',
  '/canada',
  '/referral',
  '/ammonia-control',
]);

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

function hasLocalizedRoutePrefix(pathname: string): boolean {
  const normalizedPath = normalizeRoutePath(pathname);
  return LOCALIZED_ROUTE_PREFIXES.some((path) =>
    normalizedPath === path || normalizedPath.startsWith(`${path}/`)
  );
}

function supportsLocalePrefix(pathWithoutLocale: string): boolean {
  const normalizedPath = normalizeRoutePath(pathWithoutLocale);
  if (LOCALIZED_EXACT_ROUTE_PATHS.has(normalizedPath)) {
    return true;
  }

  return hasLocalizedRoutePrefix(normalizedPath);
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

  return match[1].toLowerCase() as Locale;
}

export function stripLocaleFromPath(pathname: string): string {
  const normalizedPath = normalizePathname(pathname);
  const stripped = normalizedPath.replace(LOCALE_SEGMENT_PATTERN, '');
  return stripped.length === 0 ? '/' : stripped;
}

export function normalizeLocalePathCasing(pathname: string): string {
  if (!pathname) {
    return '/';
  }

  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return withLeadingSlash.replace(
    LOCALE_SEGMENT_PATTERN,
    (_match, locale: string) => `/${locale.toLowerCase()}`
  );
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

function isLocalizableAbsoluteUrl(href: string): boolean {
  try {
    const url = new URL(href);
    return /(^|\.)purrify\.ca$/i.test(url.hostname);
  } catch {
    return false;
  }
}

export function localizeInternalHref(href: string, locale: Locale): string {
  if (!href || locale === 'en') {
    return href;
  }

  if (
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return href;
  }

  if (href.startsWith('/')) {
    return localizePath(href, locale);
  }

  if (!isLocalizableAbsoluteUrl(href)) {
    return href;
  }

  const url = new URL(href);
  return localizePath(`${url.pathname}${url.search}${url.hash}`, locale);
}

export function localizeInternalHrefAttributes(html: string, locale: Locale): string {
  if (!html || locale === 'en') {
    return html;
  }

  return html.replace(/\bhref\s*=\s*(["'])([^"']+)\1/gi, (_match, quote: string, href: string) => {
    const localizedHref = localizeInternalHref(href, locale);
    return `href=${quote}${localizedHref}${quote}`;
  });
}
