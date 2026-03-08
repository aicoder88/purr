const DEFAULT_SEO_SITE_URL = 'https://www.purrify.ca';

export function normalizeSiteUrl(rawUrl: string): string {
  const normalized = new URL(rawUrl);
  return normalized.origin.replace(/\/$/, '');
}

export function getSeoSiteUrl(): string {
  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      DEFAULT_SEO_SITE_URL
  );
}

export function getSeoSitemapUrl(): string {
  return `${getSeoSiteUrl()}/sitemap.xml`;
}

export { DEFAULT_SEO_SITE_URL };
