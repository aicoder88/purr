import { checkRateLimit, withRateLimit, RATE_LIMITS } from '../../../src/lib/security/rate-limit';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

describe('Rate Limiting', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    describe('checkRateLimit', () => {
        it('should allow requests within the limit', () => {
            const { req } = createMocks<NextApiRequest, NextApiResponse>({
                url: '/api/test',
                headers: { 'x-forwarded-for': '127.0.0.1' },
            });

            const config = { windowMs: 1000, maxRequests: 2 };

            // First request
            const result1 = checkRateLimit(req, config);
            expect(result1.allowed).toBe(true);
            expect(result1.remaining).toBe(1);

            // Second request
            const result2 = checkRateLimit(req, config);
            expect(result2.allowed).toBe(true);
            expect(result2.remaining).toBe(0);
        });

        it('should block requests exceeding the limit', () => {
            const { req } = createMocks<NextApiRequest, NextApiResponse>({
                url: '/api/test-block',
                headers: { 'x-forwarded-for': '127.0.0.1' },
            });

            const config = { windowMs: 1000, maxRequests: 1 };

            checkRateLimit(req, config); // 1st request
            const result = checkRateLimit(req, config); // 2nd request

            expect(result.allowed).toBe(false);
            expect(result.remaining).toBe(0);
        });

        it('should reset limit after window expires', () => {
            const { req } = createMocks<NextApiRequest, NextApiResponse>({
                url: '/api/test-reset',
                headers: { 'x-forwarded-for': '127.0.0.1' },
            });

            const config = { windowMs: 1000, maxRequests: 1 };

            checkRateLimit(req, config); // 1st request
            expect(checkRateLimit(req, config).allowed).toBe(false); // 2nd request (blocked)

            // Advance time past window
            jest.advanceTimersByTime(1001);

            // Should be allowed again
            expect(checkRateLimit(req, config).allowed).toBe(true);
        });

        it('should distinguish between different IPs', () => {
            const { req: req1 } = createMocks<NextApiRequest, NextApiResponse>({
                url: '/api/test-ip',
                headers: { 'x-forwarded-for': '127.0.0.1' },
            });

            const { req: req2 } = createMocks<NextApiRequest, NextApiResponse>({
                url: '/api/test-ip',
                headers: { 'x-forwarded-for': '10.0.0.1' },
            });

            const config = { windowMs: 1000, maxRequests: 1 };

            // Both should be allowed initially
            expect(checkRateLimit(req1, config).allowed).toBe(true);
            expect(checkRateLimit(req2, config).allowed).toBe(true);

            // Both should be blocked on 2nd attempt
            expect(checkRateLimit(req1, config).allowed).toBe(false);
            expect(checkRateLimit(req2, config).allowed).toBe(false);
        });

        it('should handle different RATE_LIMITS configs', () => {
            const { req } = createMocks<NextApiRequest, NextApiResponse>({
                url: '/api/auth',
                headers: { 'x-forwarded-for': '127.0.0.1' },
            });

            // Test AUTH limit
            const resultAuth = checkRateLimit(req, RATE_LIMITS.AUTH);
            expect(resultAuth.remaining).toBe(RATE_LIMITS.AUTH.maxRequests - 1);

            // Test READ limit (using same req object but treated as different key ideally if URL changed, 
            // but here we just check logic with different config)
            const { req: reqRead } = createMocks<NextApiRequest, NextApiResponse>({
                url: '/api/read',
                headers: { 'x-forwarded-for': '127.0.0.1' },
            });
            const resultRead = checkRateLimit(reqRead, RATE_LIMITS.READ);
            expect(resultRead.remaining).toBe(RATE_LIMITS.READ.maxRequests - 1);
        });
    });

    describe('withRateLimit', () => {
        it('should apply rate limit headers', async () => {
            const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
                url: '/api/middleware',
                headers: { 'x-forwarded-for': '127.0.0.1' },
            });

            const handler = jest.fn(async (req, res) => {
                res.status(200).json({ success: true });
            });

            const config = { windowMs: 1000, maxRequests: 5 };
            const protectedHandler = withRateLimit(config, handler);

            await protectedHandler(req, res);

            expect(res.getHeader('X-RateLimit-Limit')).toBe('5');
            expect(res.getHeader('X-RateLimit-Remaining')).toBe('4');
            expect(res.getHeader('X-RateLimit-Reset')).toBeDefined();
            expect(handler).toHaveBeenCalled();
        });

        it('should block request and return 429 when limit exceeded', async () => {
            const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
                url: '/api/middleware-block',
                headers: { 'x-forwarded-for': '127.0.0.1' },
            });

            const handler = jest.fn();
            const config = { windowMs: 1000, maxRequests: 0, message: 'Custom Error' };
            const protectedHandler = withRateLimit(config, handler);

            await protectedHandler(req, res);

            expect(res.statusCode).toBe(429);
            expect(res._getJSONData()).toEqual(expect.objectContaining({
                error: 'Custom Error'
            }));
            expect(handler).not.toHaveBeenCalled();
        });
    });
});
