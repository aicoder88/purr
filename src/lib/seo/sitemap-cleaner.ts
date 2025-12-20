import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'node:fs';
import path from 'node:path';

export interface SitemapIssue {
  url: string;
  issue: 'returns-404' | 'returns-5xx' | 'non-canonical' | 'has-noindex' | 'is-redirect';
  action: string;
  canonicalUrl?: string;
  statusCode?: number;
}

export interface CleanSitemapResult {
  originalUrls: number;
  validUrls: number;
  removedUrls: number;
  issues: SitemapIssue[];
}

export class SitemapCleaner {
  async validateSitemap(sitemapUrl: string): Promise<SitemapIssue[]> {
    const issues: SitemapIssue[] = [];

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

      console.log(`Validating ${urls.length} URLs from sitemap...`);

      for (const url of urls) {
        const urlIssues = await this.validateUrl(url);
        issues.push(...urlIssues);
      }
    } catch (error) {
      console.error('Error validating sitemap:', error);
    }

    return issues;
  }

  private async validateUrl(url: string): Promise<SitemapIssue[]> {
    const issues: SitemapIssue[] = [];

    try {
      // Check status code
      const response = await axios.get(url, {
        maxRedirects: 0,
        validateStatus: () => true,
        timeout: 10000,
        headers: {
          'User-Agent': 'Purrify-SEO-Crawler/1.0'
        }
      });

      // Check for redirects
      if (response.status >= 300 && response.status < 400) {
        issues.push({
          url,
          issue: 'is-redirect',
          action: 'replace-with-final-destination',
          statusCode: response.status
        });
        return issues; // Don't check further if it's a redirect
      }

      // Check for 404
      if (response.status === 404) {
        issues.push({
          url,
          issue: 'returns-404',
          action: 'remove-from-sitemap',
          statusCode: 404
        });
        return issues;
      }

      // Check for 5xx
      if (response.status >= 500) {
        issues.push({
          url,
          issue: 'returns-5xx',
          action: 'investigate-and-fix-or-remove',
          statusCode: response.status
        });
        return issues;
      }

      // If 200, check canonical and noindex
      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        // Check for noindex
        const robotsMeta = $('meta[name="robots"]').attr('content');
        const xRobotsTag = response.headers['x-robots-tag'];

        if (robotsMeta?.includes('noindex') || xRobotsTag?.includes('noindex')) {
          issues.push({
            url,
            issue: 'has-noindex',
            action: 'remove-from-sitemap'
          });
        }

        // Check canonical
        const canonicalUrl = $('link[rel="canonical"]').attr('href');
        if (canonicalUrl) {
          const normalizedUrl = this.normalizeUrl(url);
          const normalizedCanonical = this.normalizeUrl(canonicalUrl);

          if (normalizedUrl !== normalizedCanonical) {
            issues.push({
              url,
              issue: 'non-canonical',
              action: 'replace-with-canonical',
              canonicalUrl
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error validating ${url}:`, error instanceof Error ? error.message : error);
    }

    return issues;
  }

  async cleanSitemap(sitemapPath: string, outputPath?: string): Promise<CleanSitemapResult> {
    const issues = await this.validateSitemap(`file://${sitemapPath}`);

    // Read original sitemap
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    const $ = cheerio.load(sitemapContent, { xmlMode: true });

    const originalUrls: string[] = [];
    $('url > loc').each((_, el) => {
      originalUrls.push($(el).text());
    });

    // Determine which URLs to keep
    const urlsToRemove = new Set<string>();
    const urlsToReplace = new Map<string, string>();

    for (const issue of issues) {
      if (issue.action === 'remove-from-sitemap') {
        urlsToRemove.add(issue.url);
      } else if (issue.action === 'replace-with-canonical' && issue.canonicalUrl) {
        urlsToReplace.set(issue.url, issue.canonicalUrl);
      }
    }

    // Build clean sitemap
    const validUrls = originalUrls
      .filter(url => !urlsToRemove.has(url))
      .map(url => urlsToReplace.get(url) || url);

    // Remove duplicates
    const uniqueValidUrls = Array.from(new Set(validUrls));

    // Generate new sitemap
    const newSitemap = this.generateSitemapXML(uniqueValidUrls);

    // Write to output path
    const output = outputPath || sitemapPath.replace('.xml', '-clean.xml');
    fs.writeFileSync(output, newSitemap);

    console.log(`\n✅ Clean sitemap generated: ${output}`);
    console.log(`   Original URLs: ${originalUrls.length}`);
    console.log(`   Valid URLs: ${uniqueValidUrls.length}`);
    console.log(`   Removed URLs: ${originalUrls.length - uniqueValidUrls.length}`);

    return {
      originalUrls: originalUrls.length,
      validUrls: uniqueValidUrls.length,
      removedUrls: originalUrls.length - uniqueValidUrls.length,
      issues
    };
  }

  private generateSitemapXML(urls: string[]): string {
    const urlEntries = urls.map(url => `
  <url>
    <loc>${this.escapeXml(url)}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
  }

  async splitLargeSitemap(sitemapPath: string, maxUrls: number = 50000): Promise<string[]> {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    const $ = cheerio.load(sitemapContent, { xmlMode: true });

    const urls: string[] = [];
    $('url > loc').each((_, el) => {
      urls.push($(el).text());
    });

    if (urls.length <= maxUrls) {
      console.log(`Sitemap has ${urls.length} URLs, no splitting needed`);
      return [sitemapPath];
    }

    console.log(`Splitting sitemap with ${urls.length} URLs into chunks of ${maxUrls}...`);

    const chunks: string[][] = [];
    for (let i = 0; i < urls.length; i += maxUrls) {
      chunks.push(urls.slice(i, i + maxUrls));
    }

    const sitemapFiles: string[] = [];
    const dir = path.dirname(sitemapPath);
    const basename = path.basename(sitemapPath, '.xml');

    for (let i = 0; i < chunks.length; i++) {
      const chunkPath = path.join(dir, `${basename}-${i + 1}.xml`);
      const chunkXml = this.generateSitemapXML(chunks[i]);
      fs.writeFileSync(chunkPath, chunkXml);
      sitemapFiles.push(chunkPath);
      console.log(`  Created ${chunkPath} with ${chunks[i].length} URLs`);
    }

    // Generate sitemap index
    const indexPath = path.join(dir, `${basename}-index.xml`);
    const indexXml = this.generateSitemapIndex(sitemapFiles);
    fs.writeFileSync(indexPath, indexXml);
    console.log(`  Created sitemap index: ${indexPath}`);

    return sitemapFiles;
  }

  private generateSitemapIndex(sitemapFiles: string[]): string {
    const sitemapEntries = sitemapFiles.map(file => {
      const filename = path.basename(file);
      return `
  <sitemap>
    <loc>https://purrify.ca/${filename}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`;
    }).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
  }

  private normalizeUrl(url: string): string {
    try {
      const parsed = new URL(url);
      return `${parsed.protocol}//${parsed.hostname.toLowerCase()}${parsed.pathname.replace(/\/$/, '')}${parsed.search}`;
    } catch {
      return url.toLowerCase().replace(/\/$/, '');
    }
  }

  private escapeXml(str: string): string {
    return str
      .replaceAll(/&/g, '&amp;')
      .replaceAll(/</g, '&lt;')
      .replaceAll(/>/g, '&gt;')
      .replaceAll(/"/g, '&quot;')
      .replaceAll(/'/g, '&apos;');
  }
}
