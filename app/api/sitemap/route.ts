import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Read the existing sitemap.xml from public folder
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    let sitemapContent: string;

    if (fs.existsSync(sitemapPath)) {
      sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    } else {
      // Generate a basic sitemap if the file doesn't exist
      sitemapContent = generateBasicSitemap();
    }

    return new NextResponse(sitemapContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (err) {
    console.error('Error serving sitemap:', err);
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    );
  }
}

function generateBasicSitemap(): string {
  const baseUrl = 'https://www.purrify.ca';

  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/products/trial-size', priority: '0.9', changefreq: 'weekly' },
    { loc: '/products/standard', priority: '0.9', changefreq: 'weekly' },
    { loc: '/products/family-pack', priority: '0.9', changefreq: 'weekly' },
    { loc: '/products', priority: '0.7', changefreq: 'weekly' },
    { loc: '/learn/how-it-works', priority: '0.8', changefreq: 'monthly' },
    { loc: '/learn/cat-litter-guide', priority: '0.7', changefreq: 'monthly' },
    { loc: '/learn/faq', priority: '0.8', changefreq: 'weekly' },
    { loc: '/contact', priority: '0.6', changefreq: 'monthly' },
    { loc: '/about/our-story', priority: '0.6', changefreq: 'monthly' },
    { loc: '/blog', priority: '0.8', changefreq: 'daily' },
    { loc: '/blog/activated-carbon-litter-additive-benefits', priority: '0.6', changefreq: 'monthly' },
    { loc: '/blog/how-to-use-cat-litter-deodorizer', priority: '0.6', changefreq: 'monthly' },
    { loc: '/blog/best-litter-odor-remover-small-apartments', priority: '0.6', changefreq: 'monthly' },
    { loc: '/blog/using-deodorizers-with-kittens', priority: '0.6', changefreq: 'monthly' },
    { loc: '/blog/activated-carbon-vs-baking-soda-comparison', priority: '0.6', changefreq: 'monthly' },
    { loc: '/case-studies', priority: '0.6', changefreq: 'monthly' },
    { loc: '/reviews', priority: '0.7', changefreq: 'weekly' }
  ];

  const lastmod = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${url.loc}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}
