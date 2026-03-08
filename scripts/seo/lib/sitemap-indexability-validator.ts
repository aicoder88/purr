import fs from 'node:fs';
import path from 'node:path';
import fg from 'fast-glob';
import { getSeoSiteUrl } from './site-config';

import type { SitemapCanonicalAllowlistEntry } from './sitemap-indexability-allowlist';
import { SITEMAP_CANONICAL_ALLOWLIST } from './sitemap-indexability-allowlist';

const SITE_URL = getSeoSiteUrl();

export interface SitemapIndexabilityIssue {
  url: string;
  path: string;
  type: 'redirect' | 'missing' | 'noindex' | 'non-canonical' | 'invalid-allowlist';
  message: string;
  routeFile?: string;
  canonicalUrl?: string;
  redirectDestination?: string;
  justification?: string;
}

export interface SitemapIndexabilityValidationResult {
  passed: boolean;
  checkedUrls: number;
  issues: SitemapIndexabilityIssue[];
  stats: {
    redirects: number;
    missing: number;
    noindex: number;
    nonCanonical: number;
    allowlistedCanonicalMismatches: number;
    invalidAllowlistEntries: number;
  };
}

export interface RedirectRule {
  source: string;
  destination: string;
  has?: unknown[];
}

export interface RouteInspection {
  exists: boolean;
  routeFile?: string;
  noindex: boolean;
  canonicalUrl: string | null;
}

interface RouteCandidate {
  filePath: string;
  matcher: (pathname: string) => boolean;
  staticSegments: number;
  dynamicSegments: number;
  totalSegments: number;
}

interface ValidationDependencies {
  redirects: RedirectRule[];
  inspectPath: (pathname: string) => RouteInspection;
  allowlist?: SitemapCanonicalAllowlistEntry[];
}

function normalizePath(input: string): string {
  if (!input || input === '/') {
    return '/';
  }

  const withLeadingSlash = input.startsWith('/') ? input : `/${input}`;
  const withoutQuery = withLeadingSlash.split('?')[0]?.split('#')[0] ?? withLeadingSlash;
  const collapsed = withoutQuery.replace(/\/+/g, '/');

  if (collapsed === '/') {
    return '/';
  }

  return `${collapsed.replace(/\/+$/, '')}/`;
}

function toAbsoluteUrl(pathname: string): string {
  return pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalizePath(pathname)}`;
}

function toAbsoluteCanonicalUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return toAbsoluteUrl(url);
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function createPathMatcher(pattern: string): (pathname: string) => boolean {
  const normalizedPattern = normalizePath(pattern);

  if (normalizedPattern === '/') {
    return (pathname) => normalizePath(pathname) === '/';
  }

  const segments = normalizedPattern.split('/').filter(Boolean);
  let regexSource = '^';

  for (const segment of segments) {
    regexSource += '/';

    if (!segment.startsWith(':')) {
      regexSource += escapeRegex(segment);
      continue;
    }

    const paramExpression = segment.slice(1);
    const repeatModifier = paramExpression.endsWith('*')
      ? '*'
      : paramExpression.endsWith('+')
        ? '+'
        : '';
    const coreExpression = repeatModifier ? paramExpression.slice(0, -1) : paramExpression;
    const constrainedMatch = coreExpression.match(/^([^()]+)\((.+)\)$/);
    const segmentPattern = constrainedMatch ? `(?:${constrainedMatch[2]})` : '[^/]+';

    if (repeatModifier === '*') {
      regexSource += `(?:${segmentPattern}(?:/${segmentPattern})*)?`;
    } else if (repeatModifier === '+') {
      regexSource += `${segmentPattern}(?:/${segmentPattern})*`;
    } else {
      regexSource += segmentPattern;
    }
  }

  regexSource += '/$';
  const matcher = new RegExp(regexSource);

  return (pathname: string) => matcher.test(normalizePath(pathname));
}

function stripQuotes(value: string): string {
  return value.replace(/^['"`]|['"`]$/g, '');
}

function resolveTemplateLiteral(value: string, content: string): string | null {
  let resolved = stripQuotes(value);

  const variables = resolved.match(/\$\{([^}]+)\}/g) ?? [];
  for (const variableReference of variables) {
    const variableName = variableReference.slice(2, -1).trim();

    if (variableName === 'SITE_URL') {
      resolved = resolved.replace(variableReference, SITE_URL);
      continue;
    }

    const variableMatch = content.match(
      new RegExp(String.raw`(?:const|let|var)\s+${variableName}\s*=\s*(['"\`][^'"\`]+['"\`])`)
    );

    if (variableMatch) {
      resolved = resolved.replace(variableReference, stripQuotes(variableMatch[1]));
      continue;
    }

    return null;
  }

  return resolved;
}

function buildLocalizedAbsoluteUrl(basePath: string, pathname: string): string {
  const normalizedBasePath = normalizePath(basePath);
  const localizedBasePath = pathname.startsWith('/fr/')
    ? normalizePath(`/fr${normalizedBasePath}`)
    : normalizedBasePath;

  return toAbsoluteUrl(localizedBasePath);
}

function resolveVariableExpression(
  variableName: string,
  content: string,
  pathname: string,
): string | null {
  const declarationMatch = content.match(
    new RegExp(String.raw`(?:const|let|var)\s+${variableName}\s*=\s*([\s\S]*?);`)
  );

  if (!declarationMatch) {
    return null;
  }

  const expression = declarationMatch[1].trim();

  const localizedMetadataMatch = expression.match(
    /buildLocalizedMetadataAlternates\(\s*(['"`][^'"`]+['"`])\s*,/
  );
  if (localizedMetadataMatch) {
    return buildLocalizedAbsoluteUrl(stripQuotes(localizedMetadataMatch[1]), pathname);
  }

  const localizedUrlMatch = expression.match(/getLocalizedUrl\(\s*(['"`][^'"`]+['"`])\s*,/);
  if (localizedUrlMatch) {
    return buildLocalizedAbsoluteUrl(stripQuotes(localizedUrlMatch[1]), pathname);
  }

  if (/^['"`]/.test(expression)) {
    return resolveTemplateLiteral(expression, content);
  }

  return null;
}

function extractCanonicalUrl(content: string, pathname: string): string | null {
  const localizedMetadataMatch = content.match(
    /buildLocalizedMetadataAlternates\(\s*(['"`][^'"`]+['"`])\s*,/
  );
  if (localizedMetadataMatch) {
    return buildLocalizedAbsoluteUrl(stripQuotes(localizedMetadataMatch[1]), pathname);
  }

  const localizedUrlMatch = content.match(/getLocalizedUrl\(\s*(['"`][^'"`]+['"`])\s*,/);
  if (localizedUrlMatch) {
    return buildLocalizedAbsoluteUrl(stripQuotes(localizedUrlMatch[1]), pathname);
  }

  const alternatesMatch = content.match(
    /alternates:\s*\{\s*[\s\S]*?canonical:\s*(['"`](?:[^'"`]+|\$\{[\s\S]*?\})+['"`]|[a-zA-Z0-9_]+)/
  );

  if (!alternatesMatch) {
    return null;
  }

  const canonicalExpression = alternatesMatch[1].trim();
  if (/^['"`]/.test(canonicalExpression)) {
    return resolveTemplateLiteral(canonicalExpression, content);
  }

  return resolveVariableExpression(canonicalExpression, content, pathname);
}

function hasNoindex(content: string): boolean {
  const robotsBlocks = content.match(/robots:\s*\{[\s\S]*?\}/g) ?? [];
  return robotsBlocks.some((block) => /index:\s*false/.test(block));
}

function isRouteGroup(segment: string): boolean {
  return /^\(.*\)$/.test(segment);
}

function pageFileToRoutePattern(relativeFilePath: string): string {
  const withoutPageSuffix = relativeFilePath.replace(/\/page\.tsx$/, '').replace(/^page\.tsx$/, '');
  const rawSegments = withoutPageSuffix.split('/');
  const segments = rawSegments
    .filter((segment) => segment.length > 0)
    .filter((segment) => !isRouteGroup(segment))
    .filter((segment) => !segment.startsWith('_'))
    .map((segment) => {
      if (/^\[\[\.\.\.[^/]+\]\]$/.test(segment)) {
        return `:${segment.slice(5, -2)}*`;
      }

      if (/^\[\.\.\.[^/]+\]$/.test(segment)) {
        return `:${segment.slice(4, -1)}+`;
      }

      if (/^\[[^/]+\]$/.test(segment)) {
        return `:${segment.slice(1, -1)}`;
      }

      return segment;
    });

  if (segments.length === 0) {
    return '/';
  }

  return normalizePath(`/${segments.join('/')}`);
}

function buildRouteCandidates(workspaceRoot: string): RouteCandidate[] {
  const pageFiles = fg.sync('app/**/page.tsx', {
    cwd: workspaceRoot,
    onlyFiles: true,
    ignore: ['app/api/**', 'app/admin/**'],
  });

  return pageFiles
    .map((filePath) => {
      const routePattern = pageFileToRoutePattern(filePath.replace(/^app\//, ''));
      const segments = routePattern === '/' ? [] : routePattern.split('/').filter(Boolean);
      const staticSegments = segments.filter((segment) => !segment.startsWith(':')).length;
      const dynamicSegments = segments.length - staticSegments;

      return {
        filePath,
        matcher: createPathMatcher(routePattern),
        staticSegments,
        dynamicSegments,
        totalSegments: segments.length,
      };
    })
    .sort((left, right) => {
      if (left.staticSegments !== right.staticSegments) {
        return right.staticSegments - left.staticSegments;
      }

      if (left.dynamicSegments !== right.dynamicSegments) {
        return left.dynamicSegments - right.dynamicSegments;
      }

      return right.totalSegments - left.totalSegments;
    });
}

function inspectMatchedRoute(
  workspaceRoot: string,
  routeCandidates: RouteCandidate[],
  pathname: string,
): RouteInspection {
  const normalizedPathname = normalizePath(pathname);
  const matchedRoute = routeCandidates.find((candidate) => candidate.matcher(normalizedPathname));

  if (!matchedRoute) {
    return {
      exists: false,
      noindex: false,
      canonicalUrl: null,
    };
  }

  const absoluteRouteFile = path.join(workspaceRoot, matchedRoute.filePath);
  const metadataFile = path.join(path.dirname(absoluteRouteFile), 'metadata.ts');
  const contentParts = [fs.readFileSync(absoluteRouteFile, 'utf-8')];

  if (fs.existsSync(metadataFile)) {
    contentParts.push(fs.readFileSync(metadataFile, 'utf-8'));
  }

  const combinedContent = contentParts.join('\n');

  return {
    exists: true,
    routeFile: matchedRoute.filePath,
    noindex: hasNoindex(combinedContent),
    canonicalUrl: extractCanonicalUrl(combinedContent, normalizedPathname),
  };
}

function loadRedirectRules(workspaceRoot: string): RedirectRule[] {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const redirectsModule = require(path.join(workspaceRoot, 'config/redirects.js')) as {
    REDIRECTS?: RedirectRule[];
  };

  return redirectsModule.REDIRECTS ?? [];
}

function findRedirectMatch(pathname: string, redirects: RedirectRule[]): RedirectRule | null {
  const normalizedPathname = normalizePath(pathname);

  for (const redirect of redirects) {
    if (Array.isArray(redirect.has) && redirect.has.length > 0) {
      continue;
    }

    const source = normalizePath(redirect.source);
    const matcher = createPathMatcher(source);
    if (matcher(normalizedPathname)) {
      return redirect;
    }
  }

  return null;
}

function findAllowlistedCanonical(
  pathname: string,
  canonicalUrl: string,
  allowlist: SitemapCanonicalAllowlistEntry[],
): SitemapCanonicalAllowlistEntry | null {
  const normalizedPathname = normalizePath(pathname);
  const normalizedCanonical = normalizePath(new URL(toAbsoluteCanonicalUrl(canonicalUrl)).pathname);

  for (const entry of allowlist) {
    const matcher = createPathMatcher(entry.pattern);
    if (!matcher(normalizedPathname)) {
      continue;
    }

    const entryCanonicalPath = normalizePath(new URL(toAbsoluteCanonicalUrl(entry.canonicalUrl)).pathname);
    if (entryCanonicalPath === normalizedCanonical) {
      return entry;
    }
  }

  return null;
}

export function validateSitemapUrls(
  urls: string[],
  {
    redirects,
    inspectPath,
    allowlist = SITEMAP_CANONICAL_ALLOWLIST,
  }: ValidationDependencies,
): SitemapIndexabilityValidationResult {
  const issues: SitemapIndexabilityIssue[] = [];
  let allowlistedCanonicalMismatches = 0;
  let invalidAllowlistEntries = 0;

  for (const entry of allowlist) {
    if (!entry.justification.trim()) {
      invalidAllowlistEntries++;
      issues.push({
        url: entry.canonicalUrl,
        path: normalizePath(entry.pattern),
        type: 'invalid-allowlist',
        canonicalUrl: entry.canonicalUrl,
        message: `Allowlist entry for "${entry.pattern}" is missing justification`,
      });
    }
  }

  for (const url of urls) {
    const pathname = normalizePath(new URL(url).pathname);

    const redirect = findRedirectMatch(pathname, redirects);
    if (redirect) {
      issues.push({
        url,
        path: pathname,
        type: 'redirect',
        redirectDestination: redirect.destination,
        message: `Sitemap URL resolves through redirect rule "${redirect.source}" -> "${redirect.destination}"`,
      });
      continue;
    }

    const inspection = inspectPath(pathname);
    if (!inspection.exists) {
      issues.push({
        url,
        path: pathname,
        type: 'missing',
        message: 'Sitemap URL does not resolve to an application route',
      });
      continue;
    }

    if (inspection.noindex) {
      issues.push({
        url,
        path: pathname,
        type: 'noindex',
        routeFile: inspection.routeFile,
        message: 'Sitemap URL maps to a noindex route',
      });
    }

    const canonicalUrl = toAbsoluteCanonicalUrl(inspection.canonicalUrl ?? toAbsoluteUrl(pathname));
    if (canonicalUrl !== url) {
      const allowlisted = findAllowlistedCanonical(pathname, canonicalUrl, allowlist);

      if (allowlisted && allowlisted.justification.trim()) {
        allowlistedCanonicalMismatches++;
      } else {
        issues.push({
          url,
          path: pathname,
          type: 'non-canonical',
          routeFile: inspection.routeFile,
          canonicalUrl,
          justification: allowlisted?.justification,
          message: `Sitemap URL canonicalizes to "${canonicalUrl}"`,
        });
      }
    }
  }

  return {
    passed: issues.length === 0,
    checkedUrls: urls.length,
    issues,
    stats: {
      redirects: issues.filter((issue) => issue.type === 'redirect').length,
      missing: issues.filter((issue) => issue.type === 'missing').length,
      noindex: issues.filter((issue) => issue.type === 'noindex').length,
      nonCanonical: issues.filter((issue) => issue.type === 'non-canonical').length,
      allowlistedCanonicalMismatches,
      invalidAllowlistEntries,
    },
  };
}

export async function validateGeneratedSitemapIndexability(
  workspaceRoot: string = process.cwd(),
): Promise<SitemapIndexabilityValidationResult> {
  const sitemapModule = await import(path.join(workspaceRoot, 'app/sitemap.ts'));
  const sitemapFactory = sitemapModule.default?.default ?? sitemapModule.default;
  const entries = await sitemapFactory();
  const urls = entries.map((entry: { url: string }) => entry.url);
  const redirects = loadRedirectRules(workspaceRoot);
  const routeCandidates = buildRouteCandidates(workspaceRoot);

  return validateSitemapUrls(urls, {
    redirects,
    allowlist: SITEMAP_CANONICAL_ALLOWLIST,
    inspectPath: (pathname) => inspectMatchedRoute(workspaceRoot, routeCandidates, pathname),
  });
}
