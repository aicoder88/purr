import {
    generateCSRFToken,
    setCSRFToken,
    verifyCSRFToken,
    withCSRFProtection,
    getCSRFToken
} from '../../../src/lib/security/csrf';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

describe('CSRF Protection', () => {
    describe('generateCSRFToken', () => {
        it('should generate a token of correct length', () => {
            const token = generateCSRFToken();
            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
            expect(token.length).toBeGreaterThan(0);
        });

        it('should generate unique tickets', () => {
            const token1 = generateCSRFToken();
            const token2 = generateCSRFToken();
            expect(token1).not.toBe(token2);
        });
    });

    describe('setCSRFToken', () => {
        it('should set a cookie with the token', () => {
            const { res } = createMocks<NextApiRequest, NextApiResponse>();

            const token = setCSRFToken(res);
            const cookies = res.getHeader('Set-Cookie');

            expect(token).toBeDefined();
            expect(Array.isArray(cookies)).toBe(true);
            const cookieString = (cookies as string[])[0];
            expect(cookieString).toContain('csrf-token=');
            expect(cookieString).toContain('HttpOnly');
            expect(cookieString).toContain('SameSite=Strict');
        });
    });

    describe('verifyCSRFToken', () => {
        it('should return true when cookie and header tokens match', () => {
            const token = 'valid-token';
            const { req } = createMocks<NextApiRequest, NextApiResponse>({
                cookies: { 'csrf-token': token },
                headers: { 'x-csrf-token': token },
            });

            expect(verifyCSRFToken(req)).toBe(true);
        });

        it('should return true when cookie and body tokens match', () => {
            const token = 'valid-token';
            const { req } = createMocks<NextApiRequest, NextApiResponse>({
                cookies: { 'csrf-token': token },
                body: { csrfToken: token },
            });

            expect(verifyCSRFToken(req)).toBe(true);
        });

        it('should return false when tokens do not match', () => {
            const { req } = createMocks<NextApiRequest, NextApiResponse>({
                cookies: { 'csrf-token': 'token-1' },
                headers: { 'x-csrf-token': 'token-2' },
            });

            expect(verifyCSRFToken(req)).toBe(false);
        });

        it('should return false when cookie is missing', () => {
            const { req } = createMocks<NextApiRequest, NextApiResponse>({
                headers: { 'x-csrf-token': 'token' },
            });

            expect(verifyCSRFToken(req)).toBe(false);
        });

        it('should return false when request token is missing', () => {
            const { req } = createMocks<NextApiRequest, NextApiResponse>({
                cookies: { 'csrf-token': 'token' },
            });

            expect(verifyCSRFToken(req)).toBe(false);
        });
    });

    describe('withCSRFProtection', () => {
        const mockHandler = jest.fn(async (req, res) => {
            res.status(200).json({ success: true });
        });

        beforeEach(() => {
            jest.clearAllMocks();
            // Mock process.env.NEXT_PUBLIC_SITE_URL if needed, 
            // but the code falls back to 'https://purrify.ca'
        });

        it('should skip CSRF check for safe methods (GET)', async () => {
            const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
                method: 'GET',
            });

            const protectedHandler = withCSRFProtection(mockHandler);
            await protectedHandler(req, res);

            expect(mockHandler).toHaveBeenCalled();
            expect(res.statusCode).toBe(200);
        });

        it('should enforce Origin check for POST requests', async () => {
            const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
                method: 'POST',
                headers: {
                    // No origin/referer
                }
            });

            const protectedHandler = withCSRFProtection(mockHandler);
            await protectedHandler(req, res);

            expect(res.statusCode).toBe(403);
            expect(res._getJSONData().error).toBe('Invalid origin');
            expect(mockHandler).not.toHaveBeenCalled();
        });

        it('should allow POST requests with valid Origin', async () => {
            const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
                method: 'POST',
                headers: {
                    origin: 'https://purrify.ca'
                }
            });

            const protectedHandler = withCSRFProtection(mockHandler);
            await protectedHandler(req, res);

            expect(mockHandler).toHaveBeenCalled();
            expect(res.statusCode).toBe(200);
        });

        it('should validate CSRF token if cookie is present', async () => {
            const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
                method: 'POST',
                headers: {
                    origin: 'https://purrify.ca',
                    'x-csrf-token': 'wrong-token'
                },
                cookies: {
                    'csrf-token': 'valid-token'
                }
            });

            const protectedHandler = withCSRFProtection(mockHandler);
            await protectedHandler(req, res);

            expect(res.statusCode).toBe(403);
            expect(res._getJSONData().error).toBe('Invalid CSRF token');
            expect(mockHandler).not.toHaveBeenCalled();
        });

        it('should allow request with valid Origin and valid CSRF token', async () => {
            const token = 'valid-token';
            const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
                method: 'POST',
                headers: {
                    origin: 'https://purrify.ca',
                    'x-csrf-token': token
                },
                cookies: {
                    'csrf-token': token
                }
            });

            const protectedHandler = withCSRFProtection(mockHandler);
            await protectedHandler(req, res);

            expect(mockHandler).toHaveBeenCalled();
            expect(res.statusCode).toBe(200);
        });
    });

    describe('getCSRFToken', () => {
        it('should retrieve token from cookies', () => {
            const { req } = createMocks<NextApiRequest, NextApiResponse>({
                cookies: { 'csrf-token': 'cookie-token' }
            });

            expect(getCSRFToken(req)).toBe('cookie-token');
        });

        it('should return undefined if no token in cookies', () => {
            const { req } = createMocks<NextApiRequest, NextApiResponse>({});

            expect(getCSRFToken(req)).toBeUndefined();
        });
    });
});
