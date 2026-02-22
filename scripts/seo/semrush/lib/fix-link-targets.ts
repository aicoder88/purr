import fs from 'node:fs';
import { RouteManifest, normalizeRoutePath } from './route-manifest';

export interface LinkFixResult {
  changed: boolean;
  mutations: number;
}

const DEAD_TARGET_MAP: Record<string, string> = {
  '/faq/': '/learn/faq/',
  '/science/': '/learn/science/',
  '/how-it-works/': '/learn/how-it-works/',
  '/about/': '/about/our-story/',
  '/support/contact/': '/contact/',
};

function normalizeLiteralHref(href: string, manifest: RouteManifest): string {
  if (!href.startsWith('/')) {
    return href;
  }

  const normalized = normalizeRoutePath(href);

  if (DEAD_TARGET_MAP[normalized]) {
    return DEAD_TARGET_MAP[normalized];
  }

  if (manifest.appRoutes.has(normalized)) {
    return normalized;
  }

  return href;
}

export function fixLinkTargetsInFile(filePath: string, manifest: RouteManifest): LinkFixResult {
  const current = fs.readFileSync(filePath, 'utf-8');
  let mutations = 0;

  const next = current.replace(/(href\s*=\s*['"])(\/[^'"?#]*\/?)(['"])/g, (_match, prefix: string, href: string, suffix: string) => {
    const normalized = normalizeLiteralHref(href, manifest);
    if (normalized !== href) {
      mutations += 1;
    }
    return `${prefix}${normalized}${suffix}`;
  });

  if (next !== current) {
    fs.writeFileSync(filePath, next, 'utf-8');
  }

  return { changed: next !== current, mutations };
}
