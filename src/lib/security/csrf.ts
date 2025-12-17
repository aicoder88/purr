import { randomBytes } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

const CSRF_TOKEN_LENGTH = 32;
const CSRF_COOKIE_NAME = 'csrf-token';

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(): string {
  return randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
}

/**
 * Set CSRF token in cookie
 */
export function setCSRFToken(res: NextApiResponse): string {
  const token = generateCSRFToken();
  
  res.setHeader('Set-Cookie', [
    `${CSRF_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`,
  ]);
  
  return token;
}

/**
 * Verify CSRF token from request
 */
export function verifyCSRFToken(req: NextApiRequest): boolean {
  // Get token from cookie
  const cookieToken = req.cookies[CSRF_COOKIE_NAME];
  
  // Get token from header or body
  const headerToken = req.headers['x-csrf-token'] as string;
  const bodyToken = req.body?.csrfToken;
  
  const requestToken = headerToken || bodyToken;
  
  // Both must exist and match
  if (!cookieToken || !requestToken) {
    return false;
  }
  
  return cookieToken === requestToken;
}

/**
 * Verify Origin header matches expected domain
 */
function verifyOrigin(req: NextApiRequest): boolean {
  const origin = req.headers.origin || req.headers.referer;

  if (!origin) {
    // Allow requests without origin (same-origin requests from older browsers)
    return true;
  }

  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL || 'https://purrify.ca',
    'http://localhost:3000',
    'http://localhost:3001'
  ];

  // Check if origin matches any allowed origin
  return allowedOrigins.some(allowed => origin.startsWith(allowed));
}

/**
 * Middleware to protect API routes with CSRF
 */
export function withCSRFProtection(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Only check CSRF for state-changing methods
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method || '')) {
      // Check Origin header first
      if (!verifyOrigin(req)) {
        return res.status(403).json({ error: 'Invalid origin' });
      }

      // Then check CSRF token (but allow requests without token for now during migration)
      // if (!verifyCSRFToken(req)) {
      //   return res.status(403).json({ error: 'Invalid CSRF token' });
      // }
    }

    return handler(req, res);
  };
}

/**
 * Get CSRF token for client-side use
 */
export function getCSRFToken(req: NextApiRequest): string | undefined {
  return req.cookies[CSRF_COOKIE_NAME];
}
