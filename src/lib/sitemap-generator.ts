// Advanced Sitemap Generation for Purrify
import fs from 'node:fs';
import path from 'node:path';
import { buildLanguageAlternates, getLocalizedUrl, LanguageAlternate } from './seo-utils';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: LanguageAlternate[];
}

interface SitemapConfig {
  baseUrl: string;
  outputPath: string;
  defaultChangefreq: SitemapUrl['changefreq'];
  defaultPriority: number;
  excludePatterns?: string[];
  includeAlternates?: boolean;
}

class SitemapGenerator {
  private config: SitemapConfig;
  private urls: SitemapUrl[] = [];

  constructor(config: SitemapConfig) {
    this.config = {
      includeAlternates: true,
      ...config
    };
  }

  // Add a URL to the sitemap
  addUrl(url: SitemapUrl): void {
    // Use canonical www domain
    const canonicalBaseUrl = this.config.baseUrl.replace('https://purrify.ca', 'https://www.purrify.ca');
    const normalizedPath = this.normalizePath(url.loc, canonicalBaseUrl);

    const fullUrl = {
      ...url,
      loc: url.loc.startsWith('http') ? url.loc : getLocalizedUrl(normalizedPath, 'en'),
      changefreq: url.changefreq || this.config.defaultChangefreq,
      priority: url.priority || this.config.defaultPriority,
      lastmod: url.lastmod || new Date().toISOString().split('T')[0]
    };

    // Add multilingual alternates if enabled - using domain-based i18n
    if (this.config.includeAlternates && !url.alternates) {
      if (!normalizedPath.startsWith('/fr/') && !normalizedPath.startsWith('/zh/')) {
        fullUrl.alternates = buildLanguageAlternates(normalizedPath === '' ? '/' : normalizedPath);
      }
    }

    this.urls.push(fullUrl);
  }

  private normalizePath(loc: string, canonicalBaseUrl: string): string {
    if (!loc) {
      return '/';
    }

    if (loc.startsWith('http')) {
      try {
        return new URL(loc).pathname || '/';
      } catch {
        return '/';
      }
    }

    const cleaned = loc.replace(canonicalBaseUrl, '').trim();
    if (cleaned === '') {
      return '/';
    }

    return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  }

  // Add multiple URLs
  addUrls(urls: SitemapUrl[]): void {
    urls.forEach(url => this.addUrl(url));
  }

  // Generate static pages sitemap
  generateStaticPages(): void {
    const staticPages: SitemapUrl[] = [
      // Homepage
      {
        loc: '/',
        changefreq: 'daily',
        priority: 1.0
      },

      // Product pages (using current canonical URLs only)
      {
        loc: '/products/trial-size',
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: '/products/standard',
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: '/products/family-pack',
        changefreq: 'weekly',
        priority: 0.9
      },

      // Learning pages
      {
        loc: '/learn/how-it-works',
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: '/learn/cat-litter-guide',
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: '/learn/faq',
        changefreq: 'weekly',
        priority: 0.8
      },

      // Customer pages
      {
        loc: '/reviews',
        changefreq: 'weekly',
        priority: 0.7
      },
      {
        loc: '/case-studies',
        changefreq: 'monthly',
        priority: 0.6
      },

      // Support pages
      {
        loc: '/contact',
        changefreq: 'monthly',
        priority: 0.6
      },
      {
        loc: '/support/shipping',
        changefreq: 'monthly',
        priority: 0.5
      },

      // About pages
      {
        loc: '/about/our-story',
        changefreq: 'monthly',
        priority: 0.6
      },

      // Product comparison
      {
        loc: '/products/compare',
        changefreq: 'weekly',
        priority: 0.7
      },

      // Blog (if exists)
      {
        loc: '/blog',
        changefreq: 'daily',
        priority: 0.8
      }
    ];

    this.addUrls(staticPages);
  }

  // Generate dynamic pages (products, blog posts, etc.)
  generateDynamicPages(): void {
    // Skip old product URLs - they're now handled in static pages with proper canonical URLs

    // Add current blog posts (canonical URLs only)
    const blogPosts = [
      { slug: 'activated-carbon-litter-additive-benefits', date: '2024-01-15' },
      { slug: 'how-to-use-cat-litter-deodorizer', date: '2024-01-10' },
      { slug: 'best-litter-odor-remover-small-apartments', date: '2024-01-08' },
      { slug: 'using-deodorizers-with-kittens', date: '2024-01-05' },
      { slug: 'activated-carbon-vs-baking-soda-comparison', date: '2024-01-15' }
    ];

    blogPosts.forEach(post => {
      this.addUrl({
        loc: `/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: post.date
      });
    });
  }

  // Generate French language pages
  generateFrenchPages(): void {
    const frenchPages: SitemapUrl[] = [
      {
        loc: '/fr/',
        changefreq: 'daily',
        priority: 1.0
      },
      {
        loc: '/fr/products/trial-size',
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: '/fr/products/standard',
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: '/fr/products/family-pack',
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: '/fr/learn/how-it-works',
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: '/fr/learn/cat-litter-guide',
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: '/fr/learn/faq',
        changefreq: 'weekly',
        priority: 0.8
      },
      {
        loc: '/fr/reviews',
        changefreq: 'weekly',
        priority: 0.7
      },
      {
        loc: '/fr/contact',
        changefreq: 'monthly',
        priority: 0.6
      },
      {
        loc: '/fr/about/our-story',
        changefreq: 'monthly',
        priority: 0.6
      }
    ];

    this.addUrls(frenchPages);
  }

  // Generate XML sitemap
  generateXML(): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';

    if (this.config.includeAlternates) {
      xml += ' xmlns:xhtml="http://www.w3.org/1999/xhtml"';
    }

    xml += '>\n';

    this.urls.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${this.escapeXml(url.loc)}</loc>\n`;

      if (url.lastmod) {
        xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      }

      if (url.changefreq) {
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      }

      if (url.priority !== undefined) {
        xml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
      }

      // Add hreflang alternates
      if (url.alternates && url.alternates.length > 0) {
        url.alternates.forEach(alternate => {
          xml += `    <xhtml:link rel="alternate" hreflang="${alternate.hrefLang}" href="${this.escapeXml(alternate.href)}" />\n`;
        });
      }

      xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
  }

  // Generate sitemap index for large sites
  generateSitemapIndex(sitemaps: Array<{ loc: string; lastmod?: string }>): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    sitemaps.forEach(sitemap => {
      xml += '  <sitemap>\n';
      xml += `    <loc>${this.escapeXml(sitemap.loc)}</loc>\n`;

      if (sitemap.lastmod) {
        xml += `    <lastmod>${sitemap.lastmod}</lastmod>\n`;
      }

      xml += '  </sitemap>\n';
    });

    xml += '</sitemapindex>';
    return xml;
  }

  // Save sitemap to file
  async saveSitemap(): Promise<void> {
    const xml = this.generateXML();
    const outputDir = path.dirname(this.config.outputPath);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(this.config.outputPath, xml, 'utf8');
    console.log(`Sitemap generated: ${this.config.outputPath}`);
  }

  // Generate robots.txt
  generateRobotsTxt(): string {
    // Use canonical domain with www for consistency
    const canonicalBaseUrl = this.config.baseUrl.replace('https://purrify.ca', 'https://www.purrify.ca');

    return `User-agent: *
Allow: /

# Block private areas and API endpoints
Disallow: /api/*
Disallow: /admin/*
Disallow: /_next/*
Disallow: /static/*
Disallow: /demo/*

# Allow specific SEO endpoints
Allow: /api/og/*

# Host (canonical domain)
Host: ${canonicalBaseUrl}

# Sitemaps (using canonical domain)
Sitemap: ${canonicalBaseUrl}/sitemap.xml
Sitemap: ${canonicalBaseUrl}/server-sitemap.xml

# Crawl delay for better server performance
Crawl-delay: 1
`;
  }

  // Save robots.txt
  saveRobotsTxt(outputPath: string): void {
    const robotsTxt = this.generateRobotsTxt();
    fs.writeFileSync(outputPath, robotsTxt, 'utf8');
    console.log(`Robots.txt generated: ${outputPath}`);
  }

  // Utility function to escape XML characters
  private escapeXml(unsafe: string): string {
    return unsafe.replaceAll(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }

  // Get sitemap statistics
  getStats(): { totalUrls: number; byPriority: Record<string, number>; byChangefreq: Record<string, number> } {
    const stats = {
      totalUrls: this.urls.length,
      byPriority: {} as Record<string, number>,
      byChangefreq: {} as Record<string, number>
    };

    this.urls.forEach(url => {
      const priority = url.priority?.toString() || 'undefined';
      const changefreq = url.changefreq || 'undefined';

      stats.byPriority[priority] = (stats.byPriority[priority] || 0) + 1;
      stats.byChangefreq[changefreq] = (stats.byChangefreq[changefreq] || 0) + 1;
    });

    return stats;
  }
}

// Main function to generate Purrify sitemap
export async function generatePurrifySitemap(): Promise<void> {
  const config: SitemapConfig = {
    baseUrl: 'https://www.purrify.ca',
    outputPath: path.join(process.cwd(), 'public', 'sitemap.xml'),
    defaultChangefreq: 'weekly',
    defaultPriority: 0.5,
    includeAlternates: true
  };

  const generator = new SitemapGenerator(config);

  // Generate all pages
  generator.generateStaticPages();
  generator.generateDynamicPages();
  generator.generateFrenchPages();

  // Save sitemap
  await generator.saveSitemap();

  // Generate and save robots.txt
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  generator.saveRobotsTxt(robotsPath);

  // Log statistics
  const stats = generator.getStats();
  console.log('Sitemap Statistics:', stats);
}

// Export for use in build scripts
export default SitemapGenerator;
