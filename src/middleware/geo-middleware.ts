/**
 * GEO (Generative Engine Optimization) Middleware
 * Detects AI User-Agents and serves optimized content for AI consumption
 */

import { NextRequest, NextResponse } from 'next/server';
import { isAICrawler, getAICrawlerName, hasAIRequestHeaders } from '../lib/ai-user-agents';

export interface GEORequestConfig {
  /** Enable AI-first routing for crawlers */
  enableAIRouting?: boolean;
  /** Paths to exclude from AI routing */
  excludePaths?: string[];
  /** Custom headers to add to AI responses */
  customHeaders?: Record<string, string>;
  /** Enable markdown version for AI crawlers */
  enableMarkdownVersion?: boolean;
  /** Cache duration for AI-optimized responses */
  cacheDuration?: number;
}

const DEFAULT_CONFIG: GEORequestConfig = {
  enableAIRouting: true,
  excludePaths: ['/api/', '/_next/', '/static/', '/favicon.ico', '/robots.txt', '/sitemap.xml'],
  enableMarkdownVersion: true,
  cacheDuration: 3600, // 1 hour
};

/**
 * GEO Middleware for AI-first routing
 * Detects AI crawlers and returns optimized content
 */
export function geoMiddleware(
  request: NextRequest,
  config: GEORequestConfig = {}
): NextResponse | null {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  
  // Skip if AI routing is disabled
  if (!mergedConfig.enableAIRouting) {
    return null;
  }
  
  const userAgent = request.headers.get('user-agent');
  const pathname = request.nextUrl.pathname;
  
  // Check if path should be excluded
  if (mergedConfig.excludePaths?.some((path) => pathname.startsWith(path))) {
    return null;
  }
  
  // Check if this is an AI crawler
  const isAI = isAICrawler(userAgent) || hasAIRequestHeaders(request.headers);
  const aiCrawlerName = getAICrawlerName(userAgent);
  
  if (!isAI) {
    return null;
  }
  
  // Add GEO headers to inform upstream about AI detection
  const headers = new Headers({
    'X-GEO-Detected': 'true',
    'X-AI-Crawler': aiCrawlerName || 'unknown',
    'X-GEO-Version': '1.0',
  });
  
  // Add custom headers if configured
  if (mergedConfig.customHeaders) {
    Object.entries(mergedConfig.customHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }
  
  // Add cache headers
  if (mergedConfig.cacheDuration) {
    headers.set(
      'Cache-Control',
      `public, max-age=${mergedConfig.cacheDuration}, stale-while-revalidate=86400`
    );
  }
  
  // Set accept header to prefer markdown if enabled
  if (mergedConfig.enableMarkdownVersion) {
    headers.set('X-Accept-Format', 'text/markdown, text/plain, text/html');
  }
  
  // Rewrite to AI-optimized route
  const url = request.nextUrl.clone();
  url.searchParams.set('_ai', '1');
  url.searchParams.set('_ai_crawler', aiCrawlerName || 'unknown');
  
  return NextResponse.rewrite(url, { headers });
}

/**
 * Next.js middleware configuration
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};

/**
 * Default middleware export for Next.js
 */
export default function middleware(request: NextRequest): NextResponse {
  // Try GEO middleware first
  const geoResponse = geoMiddleware(request);
  if (geoResponse) {
    return geoResponse;
  }
  
  // Continue with normal request
  return NextResponse.next();
}
