export interface SitemapCanonicalAllowlistEntry {
  pattern: string;
  canonicalUrl: string;
  justification: string;
}

export const SITEMAP_CANONICAL_ALLOWLIST: SitemapCanonicalAllowlistEntry[] = [];
