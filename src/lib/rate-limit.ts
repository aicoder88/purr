import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import {
  RATE_LIMIT_GENEROUS,
  RATE_LIMIT_STANDARD,
  RATE_LIMIT_SENSITIVE,
} from '@/lib/config/ui-constants';

// Rate limit configurations for different route types
const RATE_LIMIT_CONFIG = {
  // Sensitive routes: contact, checkout
  sensitive: {
    limit: RATE_LIMIT_SENSITIVE,
    windowSeconds: 60,
    blockDurationSeconds: 15 * 60, // 15 min block if exceeded
  },
  // Standard routes: affiliate, admin
  standard: {
    limit: RATE_LIMIT_STANDARD,
    windowSeconds: 60,
    blockDurationSeconds: 5 * 60, // 5 min block if exceeded
  },
  // Generous routes: public read APIs
  generous: {
    limit: RATE_LIMIT_GENEROUS,
    windowSeconds: 60,
    blockDurationSeconds: 60, // 1 min block if exceeded
  },
} as const;

type RateLimitType = keyof typeof RATE_LIMIT_CONFIG;

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

// In-memory fallback for when Redis is not available
const inMemoryStore = new Map<string, { count: number; resetTime: number; blocked?: boolean; blockExpiresAt?: number }>();

// Cleanup old entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of inMemoryStore.entries()) {
      if (entry.blockExpiresAt && now > entry.blockExpiresAt) {
        inMemoryStore.delete(key);
      } else if (!entry.blockExpiresAt && entry.resetTime < now) {
        inMemoryStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

// Track Redis availability for fail-closed logic
let redisAvailable = true;
let redisFallbackWarningLogged = false;

// Check if Upstash Redis is configured
function isRedisConfigured(): boolean {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

// Create Redis client (lazy initialization)
let redisClient: Redis | null = null;
function getRedisClient(): Redis | null {
  if (!isRedisConfigured()) return null;
  if (!redisClient) {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return redisClient;
}

// Create Ratelimit instances (lazy initialization)
const ratelimitInstances: Partial<Record<RateLimitType, Ratelimit>> = {};

function getRatelimitInstance(type: RateLimitType): Ratelimit | null {
  const redis = getRedisClient();
  if (!redis) return null;

  if (!ratelimitInstances[type]) {
    const config = RATE_LIMIT_CONFIG[type];
    ratelimitInstances[type] = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(config.limit, `${config.windowSeconds}s`),
      analytics: true,
      prefix: `ratelimit:${type}`,
    });
  }
  return ratelimitInstances[type]!;
}

/**
 * Check rate limit for an identifier (typically IP address)
 * Uses Redis if configured, falls back to in-memory store
 */
export async function checkRateLimit(
  identifier: string,
  type: RateLimitType = 'standard'
): Promise<RateLimitResult> {
  const config = RATE_LIMIT_CONFIG[type];
  const key = `${type}:${identifier}`;
  const redisConfigured = isRedisConfigured();

  // Try Redis first if configured
  const ratelimit = getRatelimitInstance(type);
  if (ratelimit) {
    try {
      const { success, limit, remaining, reset } = await ratelimit.limit(identifier);
      redisAvailable = true;
      return {
        success,
        limit,
        remaining,
        reset: Math.floor(reset / 1000), // Convert to seconds
        retryAfter: success ? undefined : Math.ceil((reset - Date.now()) / 1000),
      };
    } catch (error) {
      console.error('Redis rate limit error:', error);
      redisAvailable = false;
      // Fall through to in-memory fallback
    }
  } else {
    redisAvailable = false;
  }

  // Optional fail-closed mode for production if explicitly enabled
  if (
    process.env.NODE_ENV === 'production' &&
    redisConfigured &&
    !redisAvailable &&
    process.env.RATE_LIMIT_FAIL_CLOSED === 'true'
  ) {
    return {
      success: false,
      limit: 0,
      remaining: 0,
      reset: Date.now() + 60000,
      retryAfter: 60,
    };
  }

  // In-memory fallback keeps forms working when Redis is not configured/available.
  if (process.env.NODE_ENV === 'production' && !redisAvailable && !redisFallbackWarningLogged) {
    console.warn('Redis rate limiter unavailable; using in-memory fallback.');
    redisFallbackWarningLogged = true;
  }

  // In-memory fallback
  return checkInMemoryRateLimit(key, config);
}

/**
 * In-memory rate limit check (fallback when Redis is unavailable)
 */
function checkInMemoryRateLimit(
  key: string,
  config: typeof RATE_LIMIT_CONFIG[RateLimitType]
): RateLimitResult {
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const entry = inMemoryStore.get(key);

  // Check if currently blocked
  if (entry?.blocked && entry.blockExpiresAt && now < entry.blockExpiresAt) {
    const retryAfter = Math.ceil((entry.blockExpiresAt - now) / 1000);
    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      reset: Math.floor(entry.blockExpiresAt / 1000),
      retryAfter,
    };
  }

  if (entry) {
    if (now < entry.resetTime) {
      // Within window
      if (entry.count >= config.limit) {
        // Block the identifier
        const blockExpiresAt = now + config.blockDurationSeconds * 1000;
        inMemoryStore.set(key, {
          count: entry.count,
          resetTime: entry.resetTime,
          blocked: true,
          blockExpiresAt,
        });
        return {
          success: false,
          limit: config.limit,
          remaining: 0,
          reset: Math.floor(blockExpiresAt / 1000),
          retryAfter: config.blockDurationSeconds,
        };
      }
      entry.count += 1;
      return {
        success: true,
        limit: config.limit,
        remaining: Math.max(0, config.limit - entry.count),
        reset: Math.floor(entry.resetTime / 1000),
      };
    } else {
      // Window expired, reset
      inMemoryStore.set(key, { count: 1, resetTime: now + windowMs });
      return {
        success: true,
        limit: config.limit,
        remaining: config.limit - 1,
        reset: Math.floor((now + windowMs) / 1000),
      };
    }
  } else {
    // New entry
    inMemoryStore.set(key, { count: 1, resetTime: now + windowMs });
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      reset: Math.floor((now + windowMs) / 1000),
    };
  }
}

/**
 * Get client IP from request headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  
  // For NextRequest, try to get from socket (may not work in all environments)
  return 'unknown';
}

/**
 * Create rate limit headers for response
 */
export function createRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': Math.max(0, result.remaining).toString(),
    'X-RateLimit-Reset': result.reset.toString(),
  };

  if (!result.success && result.retryAfter) {
    headers['Retry-After'] = result.retryAfter.toString();
  }

  return headers;
}

/**
 * Convenience function to apply rate limiting to a route handler
 * Returns null if rate limit passed, or a Response if rate limited
 */
export async function applyRateLimit(
  request: Request,
  type: RateLimitType
): Promise<{ allowed: boolean; headers: Record<string, string> }> {
  const clientIp = getClientIp(request);
  const result = await checkRateLimit(clientIp, type);
  const headers = createRateLimitHeaders(result);

  return {
    allowed: result.success,
    headers,
  };
}

// Additional rate limit presets for common use cases
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

interface RateLimitPreset {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

type RouteHandler<T extends Request = Request> = (req: T) => Promise<Response> | Response;

/**
 * Middleware to apply rate limiting to route handlers
 * Provides similar API to the deprecated rate-limit-app.ts
 */
export function withRateLimit<T extends Request>(
  config: RateLimitPreset,
  handler: RouteHandler<T>
): RouteHandler<T> {
  // Simple in-memory store for withRateLimit (per-instance)
  const store = new Map<string, { count: number; resetTime: number }>();

  return async (req: T): Promise<Response> => {
    const clientIp = getClientIp(req);
    const url = new URL(req.url).pathname;
    const key = `${url}:${clientIp}`;
    const now = Date.now();

    // Get or create entry
    let entry = store.get(key);
    if (!entry || entry.resetTime < now) {
      entry = {
        count: 0,
        resetTime: now + config.windowMs,
      };
      store.set(key, entry);
    }

    // Increment count
    entry.count++;

    const allowed = entry.count <= config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - entry.count);

    if (!allowed) {
      return new Response(
        JSON.stringify({
          error: config.message || 'Too many requests',
          retryAfter: Math.ceil((entry.resetTime - now) / 1000),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': config.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(entry.resetTime).toISOString(),
            'Retry-After': Math.ceil((entry.resetTime - now) / 1000).toString(),
          },
        }
      );
    }

    // Execute handler
    const response = await handler(req);

    // Add rate limit headers to successful response
    try {
      response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', remaining.toString());
      response.headers.set('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());
    } catch {
      // Ignore if headers are immutable
    }

    return response;
  };
}

// Export types and config for use in other modules
export { RATE_LIMIT_CONFIG, type RateLimitType };
