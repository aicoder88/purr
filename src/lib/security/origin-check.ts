const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL,
  'https://purrify.ca',
  'https://www.purrify.ca',
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean) as string[];

/**
 * Verify that a request originates from an allowed origin.
 * Checks the Origin header first, then falls back to Referer.
 * Returns false (and should result in a 403) if neither header matches.
 */
export function verifyOrigin(req: Request): boolean {
  const origin = req.headers.get('origin') || req.headers.get('referer');

  if (!origin) {
    return false;
  }

  return ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed));
}
