#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🗺️  Generating comprehensive sitemap...');

// Define all important pages with their priorities
const pages = [
  // Main pages
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/fr', priority: '0.9', changefreq: 'daily' },
  
  // Blog pages
  { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  { url: '/fr/blog', priority: '0.8', changefreq: 'weekly' },
  
  // Free sample pages
  { url: '/free', priority: '0.8', changefreq: 'weekly' },
  { url: '/fr/free', priority: '0.8', changefreq: 'weekly' },
  
  // Product pages
  { url: '/products/purrify-20g', priority: '0.9', changefreq: 'weekly' },
  { url: '/products/purrify-60g', priority: '0.9', changefreq: 'weekly' },
  { url: '/products/purrify-120g', priority: '0.9', changefreq: 'weekly' },
  
  // Legal pages
  { url: '/privacy-policy', priority: '0.4', changefreq: 'monthly' },
  { url: '/fr/privacy-policy', priority: '0.4', changefreq: 'monthly' },
  { url: '/terms', priority: '0.4', changefreq: 'monthly' },
  { url: '/fr/terms', priority: '0.4', changefreq: 'monthly' },
];

// Sample blog posts (replace with actual blog posts from your CMS)
const blogPosts = [
  { url: '/blog/how-to-eliminate-cat-litter-odor', title: 'How to Eliminate Cat Litter Odor' },
  { url: '/blog/activated-carbon-technology', title: 'Activated Carbon Technology Explained' },
  { url: '/blog/natural-pet-care-tips', title: 'Natural Pet Care Tips' },
  { url: '/blog/eco-friendly-cat-litter-solutions', title: 'Eco-Friendly Cat Litter Solutions' },
];

// Generate XML sitemap
function generateSitemapXML(pages, baseUrl = 'https://purrify.ca') {
  const now = new Date().toISOString();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
  xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  
  // Add static pages
  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    
    // Add hreflang for bilingual pages
    if (page.url.startsWith('/fr')) {
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url.replace('/fr', '')}"/>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}${page.url}"/>\n`;
    } else if (!page.url.startsWith('/fr') && page.url !== '/') {
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}"/>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/fr${page.url}"/>\n`;
    }
    
    xml += '  </url>\n';
  });
  
  // Add blog posts
  blogPosts.forEach(post => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${post.url}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

// Generate sitemap index
function generateSitemapIndex(baseUrl = 'https://purrify.ca') {
  const now = new Date().toISOString();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  xml += '  <sitemap>\n';
  xml += `    <loc>${baseUrl}/sitemap.xml</loc>\n`;
  xml += `    <lastmod>${now}</lastmod>\n`;
  xml += '  </sitemap>\n';
  
  xml += '  <sitemap>\n';
  xml += `    <loc>${baseUrl}/server-sitemap.xml</loc>\n`;
  xml += `    <lastmod>${now}</lastmod>\n`;
  xml += '  </sitemap>\n';
  
  xml += '  <sitemap>\n';
  xml += `    <loc>${baseUrl}/sitemap-blog.xml</loc>\n`;
  xml += `    <lastmod>${now}</lastmod>\n`;
  xml += '  </sitemap>\n';
  
  xml += '  <sitemap>\n';
  xml += `    <loc>${baseUrl}/sitemap-products.xml</loc>\n`;
  xml += `    <lastmod>${now}</lastmod>\n`;
  xml += '  </sitemap>\n';
  
  xml += '</sitemapindex>';
  
  return xml;
}

// Generate blog-specific sitemap
function generateBlogSitemap(baseUrl = 'https://purrify.ca') {
  const now = new Date().toISOString();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  blogPosts.forEach(post => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${post.url}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

// Generate product-specific sitemap
function generateProductSitemap(baseUrl = 'https://purrify.ca') {
  const now = new Date().toISOString();
  
  const products = [
    { url: '/products/purrify-20g', name: 'Purrify 20g' },
    { url: '/products/purrify-60g', name: 'Purrify 60g' },
    { url: '/products/purrify-120g', name: 'Purrify 120g' },
  ];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  products.forEach(product => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${product.url}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.9</priority>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

// Write sitemaps to public directory
const publicDir = path.join(__dirname, '../public');

// Main sitemap
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateSitemapXML(pages));
console.log('✅ Generated sitemap.xml');

// Sitemap index
fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), generateSitemapIndex());
console.log('✅ Generated sitemap-index.xml');

// Blog sitemap
fs.writeFileSync(path.join(publicDir, 'sitemap-blog.xml'), generateBlogSitemap());
console.log('✅ Generated sitemap-blog.xml');

// Product sitemap
fs.writeFileSync(path.join(publicDir, 'sitemap-products.xml'), generateProductSitemap());
console.log('✅ Generated sitemap-products.xml');

// Create a comprehensive sitemap.txt for easy reading
const sitemapTxt = pages.map(page => `https://purrify.ca${page.url}`).join('\n');
fs.writeFileSync(path.join(publicDir, 'sitemap.txt'), sitemapTxt);
console.log('✅ Generated sitemap.txt');

console.log('\n🎉 Comprehensive sitemap generation completed!');
console.log('\n📊 Sitemap Statistics:');
console.log(`- Total pages: ${pages.length}`);
console.log(`- Blog posts: ${blogPosts.length}`);
console.log(`- Product pages: 3`);
console.log(`- Total URLs: ${pages.length + blogPosts.length + 3}`);

console.log('\n🔗 Sitemap URLs:');
console.log('- https://purrify.ca/sitemap.xml (Main sitemap)');
console.log('- https://purrify.ca/sitemap-index.xml (Sitemap index)');
console.log('- https://purrify.ca/sitemap-blog.xml (Blog sitemap)');
console.log('- https://purrify.ca/sitemap-products.xml (Product sitemap)');
console.log('- https://purrify.ca/robots.txt (Robots file)');

console.log('\n📝 Next steps:');
console.log('1. Submit sitemap to Google Search Console');
console.log('2. Submit sitemap to Bing Webmaster Tools');
console.log('3. Monitor indexing progress');
console.log('4. Update blog posts array with actual content'); 