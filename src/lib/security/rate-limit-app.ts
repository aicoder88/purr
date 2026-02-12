import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (use Redis in production for multi-instance deployments)
const store: RateLimitStore = {};

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  message?: string;
}

/**
 * Default rate limit configurations
 */
export const RATE_LIMITS = {
  // Strict limits for authentication
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    message: 'Too many login attempts. Please try again later.',
  },
  // Moderate limits for content creation
  CREATE: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    message: 'Too many requests. Please slow down.',
  },
  // Lenient limits for reading
  READ: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    message: 'Too many requests. Please slow down.',
  },
  // Image upload limits
  UPLOAD: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 15,
    message: 'Too many uploads. Please wait a moment.',
  },
  // Bulk operations - stricter limits
  BULK: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
    message: 'Too many bulk operations. Please wait a moment.',
  },
  // Export operations - strict limits to prevent abuse
  EXPORT: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 3,
    message: 'Too many export requests. Please wait a moment.',
  },
};

/**
 * Get client identifier (IP address or user ID)
 */
function getClientId(request: NextRequest): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded
    ? forwarded.split(',')[0].trim()
    : 'unknown';

  return ip;
}

/**
 * Check if request exceeds rate limit
 */
export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  const clientId = getClientId(request);
  const url = request.nextUrl.pathname;
  const key = `${url}:${clientId}`;
  const now = Date.now();

  // Get or create entry
  let entry = store[key];

  if (!entry || entry.resetTime < now) {
    // Create new entry
    entry = {
      count: 0,
      resetTime: now + config.windowMs,
    };
    store[key] = entry;
  }

  // Increment count
  entry.count++;

  const allowed = entry.count <= config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - entry.count);

  return {
    allowed,
    remaining,
    resetTime: entry.resetTime,
  };
}

type RouteHandler = (req: NextRequest, context?: any) => Promise<Response> | Response;

/**
 * Middleware to apply rate limiting to App Router routes
 */
export function withRateLimit(
  config: RateLimitConfig,
  handler: RouteHandler
): RouteHandler {
  return async (req: NextRequest, context?: any) => {
    const { allowed, remaining, resetTime } = checkRateLimit(req, config);

    // If rate limited, return error response immediately
    if (!allowed) {
      return Response.json(
        {
          error: config.message || 'Too many requests',
          retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': config.maxRequests.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(resetTime).toISOString(),
            'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Execute handler
    const response = await handler(req, context);

    // Add rate limit headers to successful response
    // Clone response if needed to add headers (Headers are immutable in some contexts, but Response.headers might be mutable)
    // For simplicity, we'll try to set them if possible, but Response objects are often immutable.
    // However, in Next.js App Router, we return a Response. We can create a new one or set headers if mutable.

    try {
      response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', remaining.toString());
      response.headers.set('X-RateLimit-Reset', new Date(resetTime).toISOString());
    } catch (e) {
      // Ignore if headers are immutable
    }

    return response;
  };
}
