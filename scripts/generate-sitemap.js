#!/usr/bin/env node
/**
 * This script generates an enhanced sitemap with additional metadata
 * beyond what next-sitemap provides by default.
 */

const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');
const prettier = require('prettier');

// Configuration
const SITE_URL = 'https://www.purrify.ca';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const PAGES_DIR = path.join(process.cwd(), 'pages');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'enhanced-sitemap.xml');

// Priority and change frequency settings by page type
const PAGE_SETTINGS = {
  index: { priority: '1.0', changefreq: 'daily' },
  blog: { priority: '0.8', changefreq: 'weekly' },
  products: { priority: '0.9', changefreq: 'weekly' },
  default: { priority: '0.7', changefreq: 'monthly' },
};

// Get all pages (excluding API routes, _app, _document, etc.)
function getPages() {
  const pages = glob.sync(`${PAGES_DIR}/**/*.{js,jsx,ts,tsx}`, {
    ignore: [
      '**/_*.{js,jsx,ts,tsx}',
      '**/api/**',
      '**/node_modules/**',
      '**/*.d.ts',
      '**/server-sitemap.xml.js',
    ],
  });

  return pages.map((page) => {
    // Convert file path to route
    const route = page
      .replace(PAGES_DIR, '')
      .replace(/\.(js|jsx|ts|tsx)$/, '')
      .replace(/\/index$/, '/');

    // Determine page type for priority and change frequency
    let type = 'default';
    if (route === '/') type = 'index';
    else if (route.startsWith('/blog')) type = 'blog';
    else if (route.includes('product')) type = 'products';

    // Handle dynamic routes
    const isDynamic = route.includes('[') && route.includes(']');

    return {
      route,
      type,
      isDynamic,
    };
  });
}

// Generate sitemap XML
async function generateSitemap() {
  const pages = getPages();
  const date = new Date().toISOString();

  // Filter out dynamic routes for static sitemap (these will be handled by server-sitemap.xml.js)
  const staticPages = pages.filter((page) => !page.isDynamic);

  // Create sitemap entries
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${staticPages
    .map((page) => {
      const { priority, changefreq } = PAGE_SETTINGS[page.type];
      const url = `${SITE_URL}${page.route}`;
      
      // Add alternate language versions if applicable
      const alternates = page.route === '/' || page.route === '/blog/' 
        ? `<xhtml:link rel="alternate" hreflang="en" href="${url}" />
           <xhtml:link rel="alternate" hreflang="fr" href="${url}fr/" />
           <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />`
        : '';
      
      // Add image data for important pages
      const imageData = page.type === 'index' || page.type === 'products'
        ? `<image:image>
             <image:loc>${SITE_URL}/purrify-logo.png</image:loc>
             <image:title>Purrify - Activated Carbon Cat Litter Additive</image:title>
           </image:image>`
        : '';
      
      return `
  <url>
    <loc>${url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${alternates}
    ${imageData}
  </url>`;
    })
    .join('')}
</urlset>`;

  // Format XML with prettier
  const formattedSitemap = await prettier.format(sitemap, {
    parser: 'html',
    printWidth: 100,
  });

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, formattedSitemap);
  console.log(`Enhanced sitemap generated at ${OUTPUT_FILE}`);
}

// Execute
generateSitemap().catch((err) => {
  console.error('Error generating enhanced sitemap:', err);
  process.exit(1);
});