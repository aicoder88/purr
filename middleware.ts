import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Vercel Edge Middleware - Geo-blocking & Optimization
 * 
 * This middleware runs at the edge (before hitting your functions)
 * to block unwanted traffic and add security headers.
 * 
 * Benefits:
 * - Blocks bot/scraper traffic from non-target countries
 * - Reduces Edge Requests and Function Invocations
 * - Adds security headers to all responses
 */

// Countries to block (based on analytics showing no legitimate customers)
// Singapore has been identified as a major source of bot traffic
const BLOCKED_COUNTRIES = [
  'SG', // Singapore - high bot traffic, no customers
  // Add more as needed:
  // 'CN', // China (if no customers)
  // 'RU', // Russia (high bot traffic)
  // 'IN', // India (if no customers)
];

// Countries where we have customers (allow list approach - optional)
// If defined, only these countries + unknown countries are allowed
const ALLOWED_COUNTRIES: string[] | null = null; // ['CA', 'US'] if you want strict allow-list

// Paths that should never be blocked (APIs, webhooks, etc.)
const EXEMPT_PATHS = [
  '/api/webhooks/',
  '/api/cron/',
  '/api/health',
  '/_next/',
  '/favicon',
  '/robots.txt',
  '/sitemap',
];

// Known bot user agents to block
const BLOCKED_USER_AGENTS = [
  'SemrushBot',
  'AhrefsBot',
  'MJ12bot',
  'DotBot',
  'DataForSeoBot',
  'BLEXBot',
  'YandexBot',
  'BaiduSpider',
];

export function middleware(request: NextRequest) {
  const { headers, nextUrl } = request;
  
  // Geo data comes from Vercel's edge network
  // @ts-expect-error - geo is added by Vercel edge runtime but not in types
  const country = request.geo?.country || headers.get('cf-ipcountry') || 'unknown';
  const userAgent = headers.get('user-agent') || '';
  const pathname = nextUrl.pathname;

  // Check if path is exempt from blocking
  const isExempt = EXEMPT_PATHS.some(path => pathname.startsWith(path));
  if (isExempt) {
    return NextResponse.next();
  }

  // Block known bad bots by User-Agent
  const blockedBot = BLOCKED_USER_AGENTS.find(bot => 
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );
  
  if (blockedBot) {
    console.log(`[Middleware] Blocked bot: ${blockedBot} from ${country} - ${pathname}`);
    return new NextResponse('Forbidden', { 
      status: 403,
      headers: {
        'X-Blocked-Reason': 'Bot detected',
      }
    });
  }

  // Check country blocking
  if (ALLOWED_COUNTRIES) {
    // Allow-list mode: only allow specific countries
    if (!ALLOWED_COUNTRIES.includes(country) && country !== 'unknown') {
      console.log(`[Middleware] Blocked country (not in allow-list): ${country} - ${pathname}`);
      return new NextResponse('Forbidden', { 
        status: 403,
        headers: {
          'X-Blocked-Reason': 'Country not allowed',
          'X-Country': country,
        }
      });
    }
  } else {
    // Block-list mode: block specific countries
    if (BLOCKED_COUNTRIES.includes(country)) {
      console.log(`[Middleware] Blocked country (in block-list): ${country} - ${pathname}`);
      return new NextResponse('Forbidden', { 
        status: 403,
        headers: {
          'X-Blocked-Reason': 'Country blocked',
          'X-Country': country,
        }
      });
    }
  }

  // Add helpful headers for debugging
  const response = NextResponse.next();
  
  // Add geo headers for analytics (optional, helps debugging)
  if (country !== 'unknown') {
    response.headers.set('X-Country', country);
  }
  
  // Add cache hint for static assets
  if (pathname.match(/\.(js|css|woff|woff2|png|jpg|jpeg|gif|svg|webp|avif|ico)$/)) {
    response.headers.set('X-Cache-Hint', 'static');
  }

  return response;
}

/**
 * Matcher configuration
 * Run middleware on all paths except static files and API routes we want to skip
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (handled automatically)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
