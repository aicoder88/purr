import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Read the existing sitemap.xml from public folder
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');

    if (fs.existsSync(sitemapPath)) {
      const sitemap = fs.readFileSync(sitemapPath, 'utf8');

      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      res.status(200).send(sitemap);
    } else {
      // Generate a basic sitemap if the file doesn't exist
      const basicSitemap = generateBasicSitemap(req);

      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.status(200).send(basicSitemap);
    }
  } catch (error) {
    console.error('Error serving sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}

function generateBasicSitemap(req: NextApiRequest): string {
  const host = req.headers.host || 'www.purrify.ca';
  const protocol = req.headers['x-forwarded-proto'] || 'https';

  // Determine the base URL based on the host
  let baseUrl = `${protocol}://${host}`;

  // Force canonical www domain for main site
  if (host.includes('purrify.ca') && !host.includes('fr.') && !host.includes('zh.')) {
    baseUrl = 'https://www.purrify.ca';
  }

  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/products/trial-size', priority: '0.9', changefreq: 'weekly' },
    { loc: '/products/standard', priority: '0.9', changefreq: 'weekly' },
    { loc: '/products/family-pack', priority: '0.9', changefreq: 'weekly' },
    { loc: '/products/compare', priority: '0.7', changefreq: 'weekly' },
    { loc: '/learn/how-it-works', priority: '0.8', changefreq: 'monthly' },
    { loc: '/learn/cat-litter-guide', priority: '0.7', changefreq: 'monthly' },
    { loc: '/learn/faq', priority: '0.8', changefreq: 'weekly' },
    { loc: '/support/contact', priority: '0.6', changefreq: 'monthly' },
    { loc: '/about/our-story', priority: '0.6', changefreq: 'monthly' },
    { loc: '/blog', priority: '0.8', changefreq: 'daily' },
    { loc: '/blog/activated-carbon-litter-additive-benefits', priority: '0.6', changefreq: 'monthly' },
    { loc: '/blog/how-to-use-cat-litter-deodorizer', priority: '0.6', changefreq: 'monthly' },
    { loc: '/blog/best-litter-odor-remover-small-apartments', priority: '0.6', changefreq: 'monthly' },
    { loc: '/blog/safe-for-kittens', priority: '0.6', changefreq: 'monthly' },
    { loc: '/blog/activated-carbon-vs-baking-soda-comparison', priority: '0.6', changefreq: 'monthly' },
    { loc: '/case-studies', priority: '0.6', changefreq: 'monthly' },
    { loc: '/customers/testimonials', priority: '0.7', changefreq: 'weekly' }
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