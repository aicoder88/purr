/**
 * Extract cron secret from request headers only.
 * Query parameters are NOT used because they appear in server logs.
 * 
 * Vercel Cron Jobs should be configured to use:
 * - Header: x-cron-secret
 * Or:
 * - Header: Authorization: Bearer <token>
 */
export function extractCronSecret(req: Pick<Request, 'headers'>): string | null {
  // First try the dedicated cron secret header
  const cronSecret = req.headers.get('x-cron-secret');
  if (cronSecret) {
    return cronSecret;
  }

  // Fall back to Authorization Bearer token
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  return null;
}
