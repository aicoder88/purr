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
