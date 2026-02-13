#!/usr/bin/env node

/**
 * Link Validation Script
 * Scans all pages for broken internal and external links
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { glob } from 'glob';
import {
  validateExternalLinks,
  generateValidationReport,
  extractLinks,
  type LinkValidationResult,
} from '../../src/lib/seo/link-validator';

const APP_DIR = path.join(process.cwd(), 'app');
const PAGES_DIR = path.join(process.cwd(), 'pages');
const SUPPORTED_LOCALES = new Set(['en', 'fr', 'zh', 'es']);
const STATIC_INTERNAL_PATHS = ['/sitemap.xml', '/robots.txt', '/favicon.ico'];

// Known external links to check (social media, partners, etc.)
const PRIORITY_EXTERNAL_LINKS = [
  'https://x.com/PurrifyHQ',
  'https://www.instagram.com/purrifyhq/',
  'https://www.linkedin.com/company/purrify',
  'https://www.tiktok.com/@purrifyhq',
  'https://www.youtube.com/@PurrifyHQ',
];

function normalizeInternalRoute(link: string): string {
  let route = link.split('?')[0].split('#')[0] || '/';

  if (!route.startsWith('/')) {
    route = `/${route}`;
  }

  route = route.replaceAll(/\/+/g, '/');

  if (route.length > 1 && route.endsWith('/')) {
    route = route.slice(0, -1);
  }

  return route || '/';
}

function stripLocalePrefix(route: string): string {
  const parts = route.split('/').filter(Boolean);
  if (parts.length > 0 && SUPPORTED_LOCALES.has(parts[0])) {
    const withoutLocale = `/${parts.slice(1).join('/')}`;
    return withoutLocale === '/' ? '/' : withoutLocale;
  }
  return route;
}

function matchesRoutePattern(routePattern: string, route: string): boolean {
  if (routePattern.includes('[')) {
    const regexPattern = routePattern.replaceAll(/\[.*?\]/g, '[^/]+');
    return new RegExp(`^${regexPattern}$`).test(route);
  }

  return routePattern === route;
}

function isValidInternalLink(link: string, validRoutes: string[]): boolean {
  const normalizedRoute = normalizeInternalRoute(link);
  const strippedRoute = stripLocalePrefix(normalizedRoute);
  const candidates = strippedRoute === normalizedRoute
    ? [normalizedRoute]
    : [normalizedRoute, strippedRoute];

  return validRoutes.some((routePattern) =>
    candidates.some((candidate) => matchesRoutePattern(routePattern, candidate))
  );
}

function collectAppRoutes(dir: string, segments: string[], routes: Set<string>): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'api') continue;

      if (entry.name.startsWith('(') || entry.name.startsWith('@')) {
        collectAppRoutes(fullPath, segments, routes);
        continue;
      }

      collectAppRoutes(fullPath, [...segments, entry.name], routes);
      continue;
    }

    if (entry.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      const route = segments.length === 0 ? '/' : `/${segments.join('/')}`;
      routes.add(normalizeInternalRoute(route));
    }
  }
}

function collectPagesRoutes(dir: string, segments: string[], routes: Set<string>): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'api' || entry.name.startsWith('_')) continue;
      collectPagesRoutes(fullPath, [...segments, entry.name], routes);
      continue;
    }

    if (!entry.isFile() || !/\.(tsx|ts|jsx|js)$/.test(entry.name)) continue;
    if (entry.name.startsWith('_')) continue;

    const fileBase = entry.name.replace(/\.(tsx|ts|jsx|js)$/, '');
    const routeSegments = fileBase === 'index'
      ? segments
      : [...segments, fileBase];
    const route = routeSegments.length === 0 ? '/' : `/${routeSegments.join('/')}`;
    routes.add(normalizeInternalRoute(route));
  }
}

function getValidRoutes(): string[] {
  const routes = new Set<string>(STATIC_INTERNAL_PATHS.map(normalizeInternalRoute));

  if (fs.existsSync(APP_DIR)) {
    collectAppRoutes(APP_DIR, [], routes);
  }

  if (fs.existsSync(PAGES_DIR)) {
    collectPagesRoutes(PAGES_DIR, [], routes);
  }

  return Array.from(routes);
}

async function scanPageFiles(): Promise<{ internal: string[]; external: string[] }> {
  const allInternal = new Set<string>();
  const allExternal = new Set<string>();
  
  // Scan pages directory
  const pageFiles = await glob('pages/**/*.{tsx,ts,jsx,js}', {
    ignore: ['pages/api/**', 'pages/_*.tsx'],
  });
  
  // Scan components
  const componentFiles = await glob('src/components/**/*.{tsx,ts,jsx,js}');
  
  const allFiles = [...pageFiles, ...componentFiles];
  
  console.log(`Scanning ${allFiles.length} files for links...`);
  
  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const links = extractLinks(content);
    
    links.internal.forEach(link => allInternal.add(link));
    links.external.forEach(link => allExternal.add(link));
  }
  
  return {
    internal: Array.from(allInternal),
    external: Array.from(allExternal),
  };
}

async function main() {
  console.log('🔍 Starting link validation...\n');
  
  try {
    // Scan files for links
    const { internal, external } = await scanPageFiles();
    const validRoutes = getValidRoutes();
    
    console.log(`Found ${internal.length} internal links`);
    console.log(`Found ${external.length} external links\n`);
    console.log(`Discovered ${validRoutes.length} valid internal routes\n`);
    
    // Validate internal links
    console.log('Validating internal links...');
    const internalResults: LinkValidationResult[] = internal.map((link) => {
      const isValid = isValidInternalLink(link, validRoutes);
      return {
        url: link,
        status: isValid ? 'valid' : 'broken',
        statusCode: isValid ? 200 : 404,
      };
    });
    const brokenInternal = internalResults.filter(r => r.status === 'broken');
    
    if (brokenInternal.length > 0) {
      console.log(`❌ Found ${brokenInternal.length} broken internal links:`);
      brokenInternal.forEach(link => {
        console.log(`  - ${link.url}`);
      });
    } else {
      console.log('✅ All internal links are valid');
    }
    
    console.log('\n');
    
    // Validate external links (prioritize social media and partner links)
    console.log('Validating external links...');
    console.log('Checking priority external links first...\n');
    
    const priorityResults = await validateExternalLinks(PRIORITY_EXTERNAL_LINKS);
    const brokenPriority = priorityResults.filter(r => r.status !== 'valid');
    
    if (brokenPriority.length > 0) {
      console.log(`❌ Found ${brokenPriority.length} broken priority links:`);
      brokenPriority.forEach(link => {
        console.log(`  - ${link.url} (${link.statusCode || link.error})`);
      });
    } else {
      console.log('✅ All priority external links are valid');
    }
    
    console.log('\n');
    
    // Validate other external links (sample to avoid overwhelming)
    const otherExternal = external.filter(url => !PRIORITY_EXTERNAL_LINKS.includes(url));
    const sampleSize = Math.min(otherExternal.length, 20);
    const sampleExternal = otherExternal.slice(0, sampleSize);
    
    if (sampleExternal.length > 0) {
      console.log(`Checking sample of ${sampleSize} other external links...`);
      const externalResults = await validateExternalLinks(sampleExternal);
      const brokenExternal = externalResults.filter(r => r.status !== 'valid');
      
      if (brokenExternal.length > 0) {
        console.log(`❌ Found ${brokenExternal.length} broken external links:`);
        brokenExternal.forEach(link => {
          console.log(`  - ${link.url} (${link.statusCode || link.error})`);
        });
      } else {
        console.log('✅ All sampled external links are valid');
      }
    }
    
    // Generate report
    const allResults: LinkValidationResult[] = [
      ...internalResults,
      ...priorityResults,
    ];
    
    const report = generateValidationReport(allResults);
    
    // Ensure reports directory exists
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    // Write report
    const reportPath = path.join(reportsDir, 'broken-links.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n📊 Report saved to ${reportPath}`);
    console.log(`\nSummary:`);
    console.log(`  Total links checked: ${report.totalLinks}`);
    console.log(`  Valid: ${report.validLinks}`);
    console.log(`  Broken: ${report.brokenLinks}`);
    console.log(`  Errors: ${report.errorLinks}`);
    
    // Exit with error if broken links found
    if (report.brokenLinks > 0 || report.errorLinks > 0) {
      console.log('\n⚠️  Broken or error links detected!');
      process.exit(1);
    }
    
    console.log('\n✅ Link validation complete!');
  } catch (error) {
    console.error('❌ Error during link validation:', error);
    process.exit(1);
  }
}

main();
