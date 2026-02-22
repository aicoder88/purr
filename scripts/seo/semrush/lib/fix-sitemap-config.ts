import fs from 'node:fs';
import { RouteManifest, normalizeRoutePath } from './route-manifest';

export interface SitemapFixResult {
  changed: boolean;
  removed: string[];
}

const LOC_BLOCK_REGEX = /\{\s*loc:\s*'([^']+)'[\s\S]*?\},?/g;

function shouldPrune(loc: string, manifest: RouteManifest): boolean {
  const normalized = normalizeRoutePath(loc);

  if (!manifest.appRoutes.has(normalized)) {
    return true;
  }

  const redirected = manifest.redirects.some((item) => item.source === normalized);
  if (redirected) {
    return true;
  }

  return false;
}

export function fixSitemapConfig(filePath: string, manifest: RouteManifest): SitemapFixResult {
  const current = fs.readFileSync(filePath, 'utf-8');
  const removed: string[] = [];

  const next = current.replace(LOC_BLOCK_REGEX, (block, loc: string) => {
    if (shouldPrune(loc, manifest)) {
      removed.push(normalizeRoutePath(loc));
      return '';
    }

    return block;
  });

  if (next !== current) {
    fs.writeFileSync(filePath, next, 'utf-8');
  }

  return {
    changed: next !== current,
    removed,
  };
}
