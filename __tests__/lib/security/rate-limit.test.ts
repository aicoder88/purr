import { checkRateLimit, getClientIp, withRateLimit } from '../../../src/lib/rate-limit';

describe('Rate Limiting', () => {
  describe('getClientIp', () => {
    it('prefers x-forwarded-for', () => {
      const req = new Request('https://example.com/api/test', {
        headers: { 'x-forwarded-for': '127.0.0.1,10.0.0.1' },
      });

      expect(getClientIp(req)).toBe('127.0.0.1');
    });
  });

  describe('checkRateLimit', () => {
    it('returns standard shape', async () => {
      const result = await checkRateLimit('unit-test-ip', 'standard');

      expect(typeof result.success).toBe('boolean');
      expect(typeof result.limit).toBe('number');
      expect(typeof result.remaining).toBe('number');
      expect(typeof result.reset).toBe('number');
    });
  });

  describe('withRateLimit', () => {
    it('adds rate-limit headers', async () => {
      const handler = async () => new Response(JSON.stringify({ ok: true }), { status: 200 });
      const protectedHandler = withRateLimit({ windowMs: 1000, maxRequests: 5 }, handler);

      const response = await protectedHandler(new Request('https://example.com/api/test', {
        headers: { 'x-forwarded-for': '127.0.0.1' },
      }));

      expect(response.status).toBe(200);
      expect(response.headers.get('X-RateLimit-Limit')).toBe('5');
      expect(response.headers.get('X-RateLimit-Remaining')).toBe('4');
      expect(response.headers.get('X-RateLimit-Reset')).toBeTruthy();
    });
  });
});
