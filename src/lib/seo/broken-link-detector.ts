import axios from 'axios';
import * as cheerio from 'cheerio';

export interface BrokenLink {
  sourceUrl: string;
  targetUrl: string;
  statusCode: number;
  linkText: string;
  linkType: 'internal' | 'external';
  suggestedFix?: string;
}

export interface LinkCheckResult {
  totalLinks: number;
  brokenLinks: BrokenLink[];
  redirects: BrokenLink[];
  validLinks: number;
}

export class BrokenLinkDetector {
  private visited = new Set<string>();
  private brokenLinks: BrokenLink[] = [];
  private linkMap = new Map<string, Set<{ source: string; text: string }>>();
  private baseUrl: string = '';
  private debug: boolean;

  constructor(debug: boolean = true) {
    this.debug = debug;
  }

  private log(..._args: unknown[]): void {
    // Debug logging disabled for production
  }

  async crawlSite(baseUrl: string, useSitemap: boolean = false): Promise<LinkCheckResult> {
    this.baseUrl = baseUrl;
    this.visited.clear();
    this.brokenLinks = [];
    this.linkMap.clear();

    let queue: string[] = [];
    
    if (useSitemap) {
      // Get all URLs from sitemap for complete coverage
      this.log(`Loading URLs from sitemap...`);
      queue = await this.getUrlsFromSitemap(baseUrl);
      this.log(`Found ${queue.length} URLs in sitemap`);
    } else {
      queue = [baseUrl];
    }

    const allLinks = new Set<string>();

    this.log(`Starting crawl of ${baseUrl}...`);

    while (queue.length > 0) {
      const url = queue.shift()!;
      if (this.visited.has(url)) continue;
      this.visited.add(url);

      try {
        const response = await axios.get(url, {
          maxRedirects: 5,
          validateStatus: () => true,
          timeout: 10000,
          headers: {
            'User-Agent': 'Purrify-SEO-Crawler/1.0'
          }
        });

        if (response.status === 200) {
          const $ = cheerio.load(response.data);

          // Extract all links
          $('a[href]').each((_, el) => {
            const href = $(el).attr('href');
            const linkText = $(el).text().trim();

            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
              try {
                const absoluteUrl = new URL(href, url).href;
                allLinks.add(absoluteUrl);

                // Track source of this link
                if (!this.linkMap.has(absoluteUrl)) {
                  this.linkMap.set(absoluteUrl, new Set());
                }
                this.linkMap.get(absoluteUrl)!.add({ source: url, text: linkText });

                // Add internal links to queue
                if (absoluteUrl.startsWith(baseUrl)) {
                  queue.push(absoluteUrl);
                }
              } catch {
                // Invalid URL, skip
              }
            }
          });
        }

        this.log(`Crawled: ${url} (${response.status}) - Queue: ${queue.length}`);
      } catch (_error) {
        // Error crawling URL, continue
      }
    }

    this.log(`\nCrawl complete. Found ${allLinks.size} unique links. Checking status...`);

    // Check all found links
    let checked = 0;
    for (const link of allLinks) {
      const result = await this.checkUrl(link);
      checked++;

      if (checked % 10 === 0) {
        this.log(`Checked ${checked}/${allLinks.size} links...`);
      }

      if (result.statusCode >= 400 || result.statusCode === 0) {
        const sources = this.linkMap.get(link);
        const firstSource = sources ? Array.from(sources)[0] : { source: '', text: '' };

        this.brokenLinks.push({
          sourceUrl: firstSource.source,
          targetUrl: link,
          statusCode: result.statusCode,
          linkText: firstSource.text,
          linkType: link.startsWith(baseUrl) ? 'internal' : 'external'
        });
      }
    }

    return {
      totalLinks: allLinks.size,
      brokenLinks: this.brokenLinks,
      redirects: this.brokenLinks.filter(l => l.statusCode >= 300 && l.statusCode < 400),
      validLinks: allLinks.size - this.brokenLinks.length
    };
  }

  async checkUrl(url: string): Promise<{ statusCode: number; finalUrl: string }> {
    try {
      const response = await axios.get(url, {
        maxRedirects: 5,
        validateStatus: () => true,
        timeout: 10000,
        headers: {
          'User-Agent': 'Purrify-SEO-Crawler/1.0'
        }
      });

      return {
        statusCode: response.status,
        finalUrl: response.request?.res?.responseUrl || url
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
          return { statusCode: 0, finalUrl: url };
        }
        if (error.response) {
          return { statusCode: error.response.status, finalUrl: url };
        }
      }
      return { statusCode: 0, finalUrl: url };
    }
  }

  async findBrokenLinks(): Promise<BrokenLink[]> {
    return this.brokenLinks;
  }

  async suggestReplacement(brokenUrl: string): Promise<string | null> {
    // Try common variations
    const variations = [
      brokenUrl.replace(/\/$/, ''), // Remove trailing slash
      brokenUrl + '/', // Add trailing slash
      brokenUrl.replace(/\.html$/, ''), // Remove .html
      brokenUrl.replace(/\.html$/, '') + '/', // Remove .html and add slash
      brokenUrl.toLowerCase(), // Lowercase
      brokenUrl.replace(/\/index\.html$/, '/'), // Remove index.html
    ];

    for (const variant of variations) {
      if (variant === brokenUrl) continue;

      const result = await this.checkUrl(variant);
      if (result.statusCode === 200) {
        return variant;
      }
    }

    return null;
  }

  async validateSitemapUrls(sitemapUrl: string): Promise<BrokenLink[]> {
    const brokenSitemapLinks: BrokenLink[] = [];

    try {
      const response = await axios.get(sitemapUrl);
      const $ = cheerio.load(response.data, { xmlMode: true });

      const urls: string[] = [];
      $('url > loc').each((_, el) => {
        urls.push($(el).text());
      });

      this.log(`Validating ${urls.length} URLs from sitemap...`);

      for (const url of urls) {
        const result = await this.checkUrl(url);

        if (result.statusCode !== 200) {
          brokenSitemapLinks.push({
            sourceUrl: sitemapUrl,
            targetUrl: url,
            statusCode: result.statusCode,
            linkText: 'Sitemap Entry',
            linkType: 'internal'
          });
        }
      }
    } catch (_error) {
      // Error validating sitemap, ignore
    }

    return brokenSitemapLinks;
  }

  private async getUrlsFromSitemap(baseUrl: string): Promise<string[]> {
    const urls: string[] = [];
    
    try {
      // Try main sitemap
      const sitemapUrl = `${baseUrl}/sitemap.xml`;
      const response = await axios.get(sitemapUrl, {
        timeout: 10000,
        headers: { 'User-Agent': 'Purrify-SEO-Crawler/1.0' }
      });

      const $ = cheerio.load(response.data, { xmlMode: true });

      // Check if it's a sitemap index
      const sitemapTags = $('sitemap > loc');
      if (sitemapTags.length > 0) {
        // It's a sitemap index, fetch all sub-sitemaps
        for (let i = 0; i < sitemapTags.length; i++) {
          const subSitemapUrl = $(sitemapTags[i]).text();
          try {
            const subResponse = await axios.get(subSitemapUrl, {
              timeout: 10000,
              headers: { 'User-Agent': 'Purrify-SEO-Crawler/1.0' }
            });
            const sub$ = cheerio.load(subResponse.data, { xmlMode: true });
            sub$('url > loc').each((_, el) => {
              urls.push(sub$(el).text());
            });
          } catch (_error) {
            // Error fetching sub-sitemap, continue
          }
        }
      } else {
        // Regular sitemap
        $('url > loc').each((_, el) => {
          urls.push($(el).text());
        });
      }
    } catch (_error) {
      // Error fetching sitemap, ignore
    }

    return urls;
  }
}
