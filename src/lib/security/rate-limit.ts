import { NextApiRequest, NextApiResponse } from 'next';

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
    maxRequests: 30,
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
};

/**
 * Get client identifier (IP address or user ID)
 */
function getClientId(req: NextApiRequest): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded 
    ? (typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded[0])
    : req.socket.remoteAddress || 'unknown';
  
  return ip;
}

/**
 * Check if request exceeds rate limit
 */
export function checkRateLimit(
  req: NextApiRequest,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  const clientId = getClientId(req);
  const key = `${req.url}:${clientId}`;
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

/**
 * Middleware to apply rate limiting to API routes
 */
export function withRateLimit(
  config: RateLimitConfig,
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { allowed, remaining, resetTime } = checkRateLimit(req, config);
    
    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', config.maxRequests.toString());
    res.setHeader('X-RateLimit-Remaining', remaining.toString());
    res.setHeader('X-RateLimit-Reset', new Date(resetTime).toISOString());
    
    if (!allowed) {
      return res.status(429).json({
        error: config.message || 'Too many requests',
        retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
      });
    }
    
    return handler(req, res);
  };
}

/**
 * Combine multiple middleware functions
 */
export function combineMiddleware(
  ...middlewares: Array<(handler: any) => any>
) {
  return (handler: any) => {
    return middlewares.reduceRight((acc, middleware) => {
      return middleware(acc);
    }, handler);
  };
}
