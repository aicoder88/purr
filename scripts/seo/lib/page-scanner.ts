/**
 * Page Scanner Utility
 * Scans all pages in app/ directory (Next.js App Router) and identifies indexable pages
 */

import fg from 'fast-glob';
import path from 'path';

export interface ScannedPage {
  filePath: string;
  routePath: string;
  pageType: 'static' | 'dynamic' | 'catch-all';
  isIndexable: boolean;
  reason?: string; // If not indexable
}

/**
 * Scan all pages in the app directory (Next.js App Router)
 * @returns Array of scanned pages with metadata
 */
export async function scanAllPages(): Promise<ScannedPage[]> {
  const appDir = path.join(process.cwd(), 'app');

  // Check if app directory exists
  const fs = await import('fs');
  if (!fs.existsSync(appDir)) {
    console.log('  ⚠️  App directory not found, falling back to pages/');
    return scanPagesDirectory();
  }

  // Scan for all page.tsx files in app directory
  const files = await fg('**/page.tsx', {
    cwd: appDir,
    ignore: [
      'api/**', // API routes
      'admin/**', // Admin pages
      '**/portal/**', // Customer/retailer portals
    ],
  });

  const pages: ScannedPage[] = files.map((file) => {
    const routePath = appFilePathToRoute(file);
    const pageType = determinePageType(file);
    const isIndexable = shouldIndex(file, routePath);

    return {
      filePath: `app/${file}`,
      routePath,
      pageType,
      isIndexable,
      reason: !isIndexable ? getNoindexReason(file) : undefined,
    };
  });

  return pages;
}

/**
 * Fallback: Scan legacy pages directory
 */
async function scanPagesDirectory(): Promise<ScannedPage[]> {
  const pagesDir = path.join(process.cwd(), 'pages');
  
  const fs = await import('fs');
  if (!fs.existsSync(pagesDir)) {
    console.log('  ⚠️  No pages directory found either');
    return [];
  }

  const files = await fg('**/*.tsx', {
    cwd: pagesDir,
    ignore: [
      'api/**',
      '_*.tsx',
      '404.tsx',
      '500.tsx',
      'admin/**',
      '**/portal/**',
    ],
  });

  const pages: ScannedPage[] = files.map((file) => {
    const routePath = filePathToRoute(file);
    const pageType = determinePageType(file);
    const isIndexable = shouldIndex(file, routePath);

    return {
      filePath: `pages/${file}`,
      routePath,
      pageType,
      isIndexable,
      reason: !isIndexable ? getNoindexReason(file) : undefined,
    };
  });

  return pages;
}

/**
 * Convert app directory file path to route
 * @param filePath Relative file path from app/ directory
 * @returns Route path
 */
function appFilePathToRoute(filePath: string): string {
  // Convert file path to route for App Router
  // app/blog/my-post/page.tsx -> /blog/my-post
  // app/page.tsx -> /
  // app/products/[id]/page.tsx -> /products/[id]
  // app/(group)/about/page.tsx -> /about (group routes)
  
  // Remove page.tsx
  let route = filePath.replace(/\/page\.tsx$/, '').replace(/page\.tsx$/, '');
  
  // Remove group routes (group) 
  route = route.replace(/\([^)]+\)\//g, '').replace(/\([^)]+\)$/g, '');
  
  // Handle catch-all and dynamic routes
  route = route.replace(/\[\.\.\..*\]/, '[...]');

  if (route === '' || route === '/') {
    return '/';
  }

  return `/${route}`;
}

/**
 * Convert file path to route (legacy pages router)
 * @param filePath Relative file path from pages/ directory
 * @returns Route path
 */
function filePathToRoute(filePath: string): string {
  // Convert file path to route
  // pages/blog/my-post.tsx -> /blog/my-post
  // pages/index.tsx -> /
  // pages/products/[id].tsx -> /products/[id] (mark as dynamic)

  let route = filePath
    .replace(/\.tsx$/, '')
    .replace(/\/index$/, '')
    .replace(/\[\.\.\..*\]/, '[...]'); // Catch-all routes

  if (route === 'index' || route === '') {
    return '/';
  }

  return `/${route}`;
}

/**
 * Determine page type based on file path
 * @param filePath Relative file path
 * @returns Page type
 */
function determinePageType(filePath: string): 'static' | 'dynamic' | 'catch-all' {
  if (filePath.includes('[...')) {
    return 'catch-all';
  } else if (filePath.includes('[')) {
    return 'dynamic';
  } else {
    return 'static';
  }
}

/**
 * Determine if a page should be indexed
 * @param filePath Relative file path
 * @param routePath Route path
 * @returns True if page should be indexed
 */
function shouldIndex(filePath: string, routePath: string): boolean {
  // Don't index dynamic routes (they need explicit handling)
  if (filePath.includes('[')) {
    return false;
  }

  // Don't index admin pages
  if (routePath.startsWith('/admin')) {
    return false;
  }

  // Don't index portals
  if (routePath.includes('/portal')) {
    return false;
  }

  // Don't index auth pages
  if (routePath.startsWith('/auth')) {
    return false;
  }

  // Don't index test pages
  if (routePath.includes('/test')) {
    return false;
  }

  // Index everything else
  return true;
}

/**
 * Get reason why a page is not indexed
 * @param filePath Relative file path
 * @returns Reason string
 */
function getNoindexReason(filePath: string): string {
  if (filePath.includes('[')) {
    return 'Dynamic route (requires explicit handling)';
  }
  if (filePath.includes('admin')) {
    return 'Admin page (noindex by design)';
  }
  if (filePath.includes('portal')) {
    return 'Portal page (requires authentication)';
  }
  if (filePath.includes('auth')) {
    return 'Authentication page (noindex by design)';
  }
  if (filePath.includes('test')) {
    return 'Test page (development only)';
  }
  return 'Unknown reason';
}

/**
 * Get all indexable pages
 * @returns Array of indexable pages
 */
export async function getIndexablePages(): Promise<ScannedPage[]> {
  const allPages = await scanAllPages();
  return allPages.filter((page) => page.isIndexable);
}

/**
 * Get non-indexable pages
 * @returns Array of non-indexable pages with reasons
 */
export async function getNonIndexablePages(): Promise<ScannedPage[]> {
  const allPages = await scanAllPages();
  return allPages.filter((page) => !page.isIndexable);
}

/**
 * Get page statistics
 * @returns Page statistics object
 */
export async function getPageStats(): Promise<{
  total: number;
  indexable: number;
  nonIndexable: number;
  static: number;
  dynamic: number;
  catchAll: number;
}> {
  const allPages = await scanAllPages();

  return {
    total: allPages.length,
    indexable: allPages.filter((p) => p.isIndexable).length,
    nonIndexable: allPages.filter((p) => !p.isIndexable).length,
    static: allPages.filter((p) => p.pageType === 'static').length,
    dynamic: allPages.filter((p) => p.pageType === 'dynamic').length,
    catchAll: allPages.filter((p) => p.pageType === 'catch-all').length,
  };
}
