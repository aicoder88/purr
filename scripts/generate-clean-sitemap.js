#!/usr/bin/env node
/**
 * Generate a clean sitemap.xml based on the app directory structure
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.purrify.ca';
const APP_DIR = path.join(process.cwd(), 'app');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'sitemap.xml');

// Routes to exclude (private, redirect, or utility pages)
const EXCLUDED_DIRS = new Set([
  'api',
  'admin',
  '_next',
  'static',
  'sentry-example-page',
  'offline',
  'error.tsx',
  'not-found.tsx',
  'loading.tsx',
  'layout.tsx',
  'page.tsx',
  'globals.css',
  'providers.tsx',
  'homepage-client.tsx',
]);

// Pages that redirect (should not be in sitemap)
const REDIRECT_PAGES = new Set([
  'free',
  'results',
  'montreal',
  'checkout',
  'cart-2',
  'thank-you',
]);

// Protected/authenticated pages
const PROTECTED_PAGES = new Set([
  'customer',
  'retailer',
  'affiliate',
  'tools',
  'documents',
  'refer',
  'referral',
]);

function getAllRoutes(dir, baseRoute = '') {
  const routes = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    // Skip hidden files and excluded directories
    if (item.name.startsWith('_') || item.name.startsWith('.')) continue;
    if (EXCLUDED_DIRS.has(item.name)) continue;
    
    const fullPath = path.join(dir, item.name);
    const routePath = baseRoute ? `${baseRoute}/${item.name}` : `/${item.name}`;

    if (item.isDirectory()) {
      // Skip redirect and protected pages
      if (REDIRECT_PAGES.has(item.name)) continue;
      if (PROTECTED_PAGES.has(item.name)) continue;
      
      // Check if this directory has a page.tsx or page.jsx
      const hasPage = fs.readdirSync(fullPath).some(f => 
        f === 'page.tsx' || f === 'page.jsx' || f === 'page.js'
      );
      
      if (hasPage) {
        routes.push(routePath);
      }
      
      // Recurse into subdirectories
      routes.push(...getAllRoutes(fullPath, routePath));
    }
  }

  return routes;
}

function getPagePriority(route) {
  if (route === '/') return { priority: '1.0', changefreq: 'daily' };
  if (route === '/products' || route.startsWith('/products/')) return { priority: '0.9', changefreq: 'weekly' };
  if (route === '/blog' || route.startsWith('/blog/')) return { priority: '0.8', changefreq: 'weekly' };
  if (route === '/us') return { priority: '0.85', changefreq: 'weekly' };
  if (route === '/fr' || route === '/es' || route === '/zh') return { priority: '0.9', changefreq: 'daily' };
  if (route.startsWith('/learn/')) return { priority: '0.7', changefreq: 'monthly' };
  if (route.startsWith('/locations/')) return { priority: '0.6', changefreq: 'monthly' };
  if (route.startsWith('/case-studies')) return { priority: '0.6', changefreq: 'monthly' };
  if (route === '/reviews') return { priority: '0.7', changefreq: 'weekly' };
  if (route === '/contact') return { priority: '0.6', changefreq: 'monthly' };
  if (route.startsWith('/about/')) return { priority: '0.6', changefreq: 'monthly' };
  if (route === '/privacy-policy' || route === '/terms') return { priority: '0.3', changefreq: 'monthly' };
  if (route.startsWith('/stores')) return { priority: '0.6', changefreq: 'monthly' };
  if (route.startsWith('/cat-cafes') || route.startsWith('/shelters') || route.startsWith('/groomers') || route.startsWith('/veterinarians') || route.startsWith('/hospitality')) return { priority: '0.6', changefreq: 'monthly' };
  return { priority: '0.7', changefreq: 'weekly' };
}

function generateSitemap() {
  const date = new Date().toISOString();
  
  // Get all routes from app directory
  let routes = getAllRoutes(APP_DIR);
  
  // Add root
  routes.unshift('/');
  
  // Remove duplicates and sort
  routes = [...new Set(routes)].sort();
  
  // Filter out unwanted routes
  routes = routes.filter(route => {
    // Skip paths with underscore prefix (private)
    if (route.split('/').some(part => part.startsWith('_'))) return false;
    // Skip API routes
    if (route.startsWith('/api/')) return false;
    // Skip admin
    if (route.startsWith('/admin')) return false;
    // Skip dynamic routes (with brackets)
    if (route.includes('[') || route.includes(']')) return false;
    return true;
  });

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  for (const route of routes) {
    const { priority, changefreq } = getPagePriority(route);
    const url = `${SITE_URL}${route}`;
    
    xml += '  <url>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  }
  
  xml += '</urlset>';

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');
  
  console.log('✓ Sitemap generated successfully!');
  console.log(`  Total URLs: ${routes.length}`);
  console.log(`  Output: ${OUTPUT_FILE}`);
  console.log('\n  Routes included:');
  routes.forEach(r => console.log(`    - ${r}`));
  
  return routes.length;
}

// Execute
try {
  const count = generateSitemap();
  process.exit(0);
} catch (err) {
  console.error('Error generating sitemap:', err);
  process.exit(1);
}
