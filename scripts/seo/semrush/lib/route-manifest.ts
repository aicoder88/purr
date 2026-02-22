import fs from 'node:fs';
import path from 'node:path';

export interface RouteManifest {
  appRoutes: Set<string>;
  redirects: Array<{ source: string; destination: string }>;
  canonicalRoutes: Set<string>;
  isRoutablePath: (input: string) => boolean;
}

function normalizePath(input: string): string {
  if (!input) return '/';
  const withLeadingSlash = input.startsWith('/') ? input : `/${input}`;
  const withoutQuery = withLeadingSlash.split('?')[0]?.split('#')[0] ?? withLeadingSlash;
  const collapsed = withoutQuery.replace(/\/+/g, '/');
  if (collapsed === '/') return '/';
  return `${collapsed.replace(/\/+$/, '')}/`;
}

function isRouteGroup(segment: string): boolean {
  return /^\(.*\)$/.test(segment);
}

function toRouteFromPageFile(filePath: string, appRoot: string): string | null {
  const rel = path.relative(appRoot, filePath);
  if (!rel.endsWith('/page.tsx')) return null;

  const rawSegments = rel.replace(/\/page\.tsx$/, '').split(path.sep);
  const segments = rawSegments
    .filter((segment) => !isRouteGroup(segment))
    .filter((segment) => !segment.startsWith('_'))
    .filter((segment) => segment !== '');

  if (segments.length === 0) return '/';

  if (segments.some((segment) => segment.startsWith('(') || segment.startsWith('@'))) {
    return null;
  }

  return normalizePath(`/${segments.join('/')}`);
}

function collectPageFiles(dirPath: string, out: string[] = []): string[] {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collectPageFiles(full, out);
      continue;
    }

    if (entry.isFile() && full.endsWith('page.tsx')) {
      out.push(full);
    }
  }

  return out;
}

function loadRedirects(workspaceRoot: string): Array<{ source: string; destination: string }> {
  const redirectsPath = path.join(workspaceRoot, 'config/redirects.js');

  if (!fs.existsSync(redirectsPath)) {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const imported = require(redirectsPath) as { REDIRECTS?: Array<{ source?: string; destination?: string }> };

  return (imported.REDIRECTS ?? [])
    .filter((item) => typeof item.source === 'string' && typeof item.destination === 'string')
    .map((item) => ({
      source: normalizePath(item.source as string),
      destination: normalizePath(item.destination as string),
    }));
}

export function buildRouteManifest(workspaceRoot: string): RouteManifest {
  const appRoot = path.join(workspaceRoot, 'app');
  const pageFiles = collectPageFiles(appRoot);

  const appRoutes = new Set<string>();
  for (const filePath of pageFiles) {
    const route = toRouteFromPageFile(filePath, appRoot);
    if (route) {
      appRoutes.add(route);
    }
  }

  const redirects = loadRedirects(workspaceRoot);
  const redirectedSources = new Set(redirects.map((item) => item.source));

  const canonicalRoutes = new Set(
    [...appRoutes].filter((route) => !redirectedSources.has(route))
  );

  return {
    appRoutes,
    redirects,
    canonicalRoutes,
    isRoutablePath: (input: string) => {
      const normalized = normalizePath(input);
      return appRoutes.has(normalized);
    },
  };
}

export function normalizeRoutePath(input: string): string {
  return normalizePath(input);
}
