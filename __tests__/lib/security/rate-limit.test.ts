const mockLimit = jest.fn();

jest.mock('@upstash/redis', () => ({
  Redis: jest.fn(() => ({})),
}));

jest.mock('@upstash/ratelimit', () => ({
  Ratelimit: class MockRatelimit {
    static slidingWindow = jest.fn();

    limit(identifier: string) {
      return mockLimit(identifier);
    }
  },
}));

const { checkRateLimit, getClientIp, withRateLimit } =
  require('../../../src/lib/rate-limit') as typeof import('../../../src/lib/rate-limit');

describe('Rate Limiting', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  describe('getClientIp', () => {
    it('prefers x-forwarded-for', () => {
      const req = new Request('https://example.com/api/test', {
        headers: { 'x-forwarded-for': '127.0.0.1,10.0.0.1' },
      });

      expect(getClientIp(req)).toBe('127.0.0.1');
    });
  });

  describe('checkRateLimit', () => {
    it('returns standard shape with in-memory fallback', async () => {
      const result = await checkRateLimit('unit-test-ip', 'standard');

      expect(typeof result.success).toBe('boolean');
      expect(typeof result.limit).toBe('number');
      expect(typeof result.remaining).toBe('number');
      expect(typeof result.reset).toBe('number');
    });

    it('uses Redis-backed limiter when configured', async () => {
      process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
      process.env.UPSTASH_REDIS_REST_TOKEN = 'token';
      mockLimit.mockResolvedValue({
        success: true,
        limit: 20,
        remaining: 19,
        reset: Date.now() + 60_000,
      });

      const result = await checkRateLimit('redis-ip', 'standard');

      expect(mockLimit).toHaveBeenCalledWith('redis-ip');
      expect(result.success).toBe(true);
      expect(result.limit).toBe(20);
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
