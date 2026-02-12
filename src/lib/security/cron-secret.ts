/**
 * Extract cron secret from request headers or query params.
 * Header takes precedence over query.
 */
export function extractCronSecret(req: Pick<Request, 'headers' | 'url'>): string | null {
  const headerSecret = req.headers.get('x-cron-secret');
  if (headerSecret) {
    return headerSecret;
  }

  const { searchParams } = new URL(req.url);
  return searchParams.get('secret');
}
