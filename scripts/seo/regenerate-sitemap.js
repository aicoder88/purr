const fs = require('node:fs');
const path = require('node:path');

// Simple sitemap regeneration
const baseUrl = 'https://www.purrify.ca';
const today = new Date().toISOString().split('T')[0];

const urls = [
    { loc: '/', priority: 1.0, changefreq: 'daily' },
    { loc: '/products/trial-size', priority: 0.9, changefreq: 'weekly' },
    { loc: '/products/standard', priority: 0.9, changefreq: 'weekly' },
    { loc: '/products/family-pack', priority: 0.9, changefreq: 'weekly' },
    { loc: '/products/compare', priority: 0.7, changefreq: 'weekly' },
    { loc: '/learn/how-it-works', priority: 0.8, changefreq: 'monthly' },
    { loc: '/learn/cat-litter-guide', priority: 0.7, changefreq: 'monthly' },
    { loc: '/learn/faq', priority: 0.8, changefreq: 'weekly' },
    { loc: '/reviews', priority: 0.7, changefreq: 'weekly' },
    { loc: '/case-studies', priority: 0.6, changefreq: 'monthly' },
    { loc: '/contact', priority: 0.6, changefreq: 'monthly' },
    { loc: '/about/our-story', priority: 0.6, changefreq: 'monthly' },
    { loc: '/blog', priority: 0.8, changefreq: 'daily' },
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n';

urls.forEach(url => {
    xml += '  <url>\\n';
    xml += `    <loc>${baseUrl}${url.loc}</loc>\\n`;
    xml += `    <lastmod>${today}</lastmod>\\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\\n`;
    xml += `    <priority>${url.priority.toFixed(1)}</priority>\\n`;
    xml += '  </url>\\n';
});

xml += '</urlset>';

// Write to public/sitemap-0.xml
const outputPath = path.join(__dirname, '../public/sitemap-0.xml');
fs.writeFileSync(outputPath, xml, 'utf8');
console.log('✓ Sitemap regenerated successfully');
console.log(`  URLs: ${urls.length}`);
console.log(`  Output: ${outputPath}`);
