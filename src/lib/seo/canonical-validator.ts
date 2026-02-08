import axios from 'axios';
import * as cheerio from 'cheerio';

export interface CanonicalIssue {
  pageUrl: string;
  canonicalUrl: string;
  issueType: 'points-to-redirect' | 'missing' | 'conflict' | 'invalid-protocol' | 'self-reference-mismatch';
  statusCode?: number;
  finalUrl?: string;
  suggestion: string;
}

export class CanonicalValidator {
  private canonicalMap = new Map<string, string[]>(); // canonical -> pages claiming it
  private debug: boolean;

  constructor(debug: boolean = true) {
    this.debug = debug;
  }

  private log(...args: unknown[]): void {
    if (this.debug) {
      console.log(...args);
    }
  }

  async validateCanonicals(siteUrl: string): Promise<CanonicalIssue[]> {
    const issues: CanonicalIssue[] = [];
    this.canonicalMap.clear();

    const pages = await this.getAllPages(siteUrl);
    this.log(`Validating canonical tags for ${pages.length} pages...`);

    for (const pageUrl of pages) {
      try {
        const response = await axios.get(pageUrl, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Purrify-SEO-Crawler/1.0'
          }
        });

        const $ = cheerio.load(response.data);
        const canonicalUrl = $('link[rel="canonical"]').attr('href');

        if (!canonicalUrl) {
          issues.push({
            pageUrl,
            canonicalUrl: '',
            issueType: 'missing',
            suggestion: `Add canonical tag: <link rel="canonical" href="${pageUrl}" />`
          });
          continue;
        }

        // Track canonical usage for conflict detection
        if (!this.canonicalMap.has(canonicalUrl)) {
          this.canonicalMap.set(canonicalUrl, []);
        }
        this.canonicalMap.get(canonicalUrl)!.push(pageUrl);

        // Check if canonical points to redirect
        try {
          const canonicalCheck = await axios.get(canonicalUrl, {
            maxRedirects: 0,
            validateStatus: () => true,
            timeout: 10000,
            headers: {
              'User-Agent': 'Purrify-SEO-Crawler/1.0'
            }
          });

          if (canonicalCheck.status >= 300 && canonicalCheck.status < 400) {
            const finalUrl = canonicalCheck.headers.location;
            issues.push({
              pageUrl,
              canonicalUrl,
              issueType: 'points-to-redirect',
              statusCode: canonicalCheck.status,
              finalUrl,
              suggestion: `Update canonical to point directly to ${finalUrl}`
            });
          }
        } catch {
          // Network error checking canonical
        }

        // Check protocol
        if (canonicalUrl.startsWith('http://')) {
          issues.push({
            pageUrl,
            canonicalUrl,
            issueType: 'invalid-protocol',
            suggestion: `Update canonical to use https:// instead of http://`
          });
        }

        // Check self-reference
        const normalizedPage = this.normalizeUrl(pageUrl);
        const normalizedCanonical = this.normalizeUrl(canonicalUrl);

        if (normalizedPage === normalizedCanonical) {
          // Self-referencing is good, but check exact match
          if (pageUrl !== canonicalUrl) {
            issues.push({
              pageUrl,
              canonicalUrl,
              issueType: 'self-reference-mismatch',
              suggestion: `Ensure canonical exactly matches page URL: ${pageUrl}`
            });
          }
        }
      } catch (err) {
        console.error(`Error validating canonical for ${pageUrl}:`, err instanceof Error ? err.message : err);
      }
    }

    // Check for canonical conflicts
    const conflicts = this.findCanonicalConflicts();
    issues.push(...conflicts);

    return issues;
  }

  async checkCanonicalUrl(pageUrl: string, canonicalUrl: string): Promise<CanonicalIssue | null> {
    try {
      const response = await axios.get(canonicalUrl, {
        maxRedirects: 0,
        validateStatus: () => true,
        timeout: 10000,
        headers: {
          'User-Agent': 'Purrify-SEO-Crawler/1.0'
        }
      });

      if (response.status >= 300 && response.status < 400) {
        return {
          pageUrl,
          canonicalUrl,
          issueType: 'points-to-redirect',
          statusCode: response.status,
          finalUrl: response.headers.location,
          suggestion: `Update canonical to point directly to ${response.headers.location}`
        };
      }

      if (response.status >= 400) {
        return {
          pageUrl,
          canonicalUrl,
          issueType: 'points-to-redirect',
          statusCode: response.status,
          suggestion: `Canonical URL returns ${response.status} error`
        };
      }

      return null;
    } catch (err) {
      return {
        pageUrl,
        canonicalUrl,
        issueType: 'points-to-redirect',
        suggestion: `Cannot reach canonical URL: ${err instanceof Error ? err.message : 'Unknown error'}`
      };
    }
  }

  findCanonicalConflicts(): CanonicalIssue[] {
    const conflicts: CanonicalIssue[] = [];

    for (const [canonical, pages] of this.canonicalMap.entries()) {
      if (pages.length > 1) {
        // Multiple pages claiming the same canonical
        // This is only an issue if none of the pages IS the canonical
        const isOneOfThem = pages.some(page => this.normalizeUrl(page) === this.normalizeUrl(canonical));

        if (!isOneOfThem) {
          for (const page of pages) {
            conflicts.push({
              pageUrl: page,
              canonicalUrl: canonical,
              issueType: 'conflict',
              suggestion: `Multiple pages (${pages.length}) claim canonical ${canonical}, but none match it exactly`
            });
          }
        }
      }
    }

    return conflicts;
  }

  async fixCanonicalUrl(pageUrl: string, correctCanonical: string): Promise<void> {
    // This would require file system access to update the page
    // Implementation depends on how pages are generated (static, SSR, etc.)
    this.log(`Would fix canonical for ${pageUrl} to ${correctCanonical}`);
  }

  private normalizeUrl(url: string): string {
    try {
      const parsed = new URL(url);
      // Remove trailing slash, lowercase hostname
      return `${parsed.protocol}//${parsed.hostname.toLowerCase()}${parsed.pathname.replace(/\/$/, '')}${parsed.search}`;
    } catch {
      return url.toLowerCase().replace(/\/$/, '');
    }
  }

  private async getAllPages(siteUrl: string): Promise<string[]> {
    try {
      // Try to fetch from sitemap first
      const sitemapUrl = `${siteUrl}/sitemap.xml`;
      const response = await axios.get(sitemapUrl, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Purrify-SEO-Crawler/1.0'
        }
      });

      const $ = cheerio.load(response.data, { xmlMode: true });

      const urls: string[] = [];
      $('url > loc').each((_, el) => {
        urls.push($(el).text());
      });

      return urls;
    } catch (err) {
      console.error('Error fetching sitemap:', err);
      return [];
    }
  }
}
