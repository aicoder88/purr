import axios from 'axios';
import * as cheerio from 'cheerio';

export interface RedirectHop {
  url: string;
  statusCode: number;
  redirectType: 'permanent' | 'temporary';
}

export interface RedirectChain {
  startUrl: string;
  chain: RedirectHop[];
  finalUrl: string;
  totalHops: number;
  suggestion: string;
}

export class RedirectAnalyzer {
  async followRedirectChain(url: string): Promise<RedirectChain> {
    const chain: RedirectHop[] = [];
    let currentUrl = url;
    let hops = 0;
    const maxHops = 10;

    while (hops < maxHops) {
      try {
        const response = await axios.get(currentUrl, {
          maxRedirects: 0,
          validateStatus: () => true,
          timeout: 10000,
          headers: {
            'User-Agent': 'Purrify-SEO-Crawler/1.0'
          }
        });

        if (response.status >= 300 && response.status < 400) {
          const redirectType = [301, 308].includes(response.status) ? 'permanent' : 'temporary';

          chain.push({
            url: currentUrl,
            statusCode: response.status,
            redirectType
          });

          const location = response.headers.location;
          if (!location) {
            break;
          }

          // Handle relative redirects
          currentUrl = new URL(location, currentUrl).href;
          hops++;
        } else {
          // Reached final destination
          break;
        }
      } catch (error) {
        console.error(`Error following redirect from ${currentUrl}:`, error instanceof Error ? error.message : error);
        break;
      }
    }

    const suggestion = this.generateSuggestion(url, currentUrl, chain);

    return {
      startUrl: url,
      chain,
      finalUrl: currentUrl,
      totalHops: chain.length,
      suggestion
    };
  }

  private generateSuggestion(startUrl: string, finalUrl: string, chain: RedirectHop[]): string {
    if (chain.length === 0) {
      return 'No redirects';
    }

    if (chain.length > 1) {
      return `Update ${startUrl} to redirect directly to ${finalUrl} (currently ${chain.length} hops)`;
    }

    if (chain.length === 1 && chain[0].redirectType === 'temporary') {
      return `Change redirect from ${chain[0].statusCode} to 301 (permanent)`;
    }

    return 'Redirect is optimal';
  }

  async analyzeRedirects(siteUrl: string): Promise<RedirectChain[]> {
    const pages = await this.getAllPages(siteUrl);
    const chains: RedirectChain[] = [];

    console.log(`Analyzing redirects for ${pages.length} pages...`);

    for (const page of pages) {
      const chain = await this.followRedirectChain(page);
      if (chain.totalHops > 0) {
        chains.push(chain);
      }
    }

    return chains;
  }

  async findTemporaryRedirects(): Promise<RedirectHop[]> {
    // This would be called as part of analyzeRedirects
    // Returns all temporary redirects found
    return [];
  }

  async generateRedirectMap(): Promise<Map<string, string>> {
    const redirectMap = new Map<string, string>();
    // This would map all redirect sources to their final destinations
    return redirectMap;
  }

  async validateSitemapRedirects(siteUrl: string, sitemapUrl: string): Promise<RedirectChain[]> {
    const redirectsInSitemap: RedirectChain[] = [];

    try {
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

      console.log(`Checking ${urls.length} sitemap URLs for redirects...`);

      for (const url of urls) {
        const chain = await this.followRedirectChain(url);
        if (chain.totalHops > 0) {
          redirectsInSitemap.push(chain);
        }
      }
    } catch (error) {
      console.error('Error validating sitemap redirects:', error);
    }

    return redirectsInSitemap;
  }

  private async getAllPages(siteUrl: string): Promise<string[]> {
    try {
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
    } catch (error) {
      console.error('Error fetching sitemap:', error);
      return [];
    }
  }
}
