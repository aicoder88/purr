import type { NextRequest } from 'next/server';

const mockUpsertEmailSubscriber = jest.fn();
const mockWithRateLimit = jest.fn((_config: unknown, handler: unknown) => handler);

jest.mock('@/lib/email-subscribers', () => ({
  upsertEmailSubscriber: mockUpsertEmailSubscriber,
}));

jest.mock('@/lib/rate-limit', () => ({
  RATE_LIMITS: {
    CREATE: {
      windowMs: 60 * 1000,
      maxRequests: 10,
      message: 'Too many requests. Please slow down.',
    },
  },
  withRateLimit: mockWithRateLimit,
}));

const { POST } = require('../../app/api/subscribe/route') as typeof import('../../app/api/subscribe/route');

function createRequest(
  body: unknown,
  sessionId?: string,
): NextRequest {
  return {
    json: jest.fn().mockResolvedValue(body),
    cookies: {
      get: jest.fn((name: string) => (name === 'purrify_freshness_session' && sessionId
        ? { value: sessionId }
        : undefined)),
    },
  } as unknown as NextRequest;
}

async function getResponseData(response: Response) {
  return response.json();
}

describe('/api/subscribe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpsertEmailSubscriber.mockResolvedValue({
      email: 'newuser@example.com',
      status: 'ACTIVE',
    });
  });

  it('creates a subscriber with provided source and locale', async () => {
    const response = await POST(createRequest({
      email: 'NewUser@Example.COM',
      source: 'homepage',
      locale: 'fr',
    }));

    expect(response.status).toBe(201);
    const data = await getResponseData(response);
    expect(data.success).toBe(true);
    expect(data.message).toContain('Successfully subscribed');
    expect(mockUpsertEmailSubscriber).toHaveBeenCalledWith({
      email: 'NewUser@Example.COM',
      source: 'homepage',
      locale: 'fr',
      sessionId: undefined,
    });
  });

  it('falls back to default source and locale', async () => {
    await POST(createRequest({
      email: 'newuser@example.com',
    }));

    expect(mockUpsertEmailSubscriber).toHaveBeenCalledWith({
      email: 'newuser@example.com',
      source: 'unknown',
      locale: 'en',
      sessionId: undefined,
    });
  });

  it('passes through session id from the freshness cookie', async () => {
    await POST(
      createRequest(
        {
          email: 'newuser@example.com',
          source: 'quiz',
        },
        'session_12345',
      ),
    );

    expect(mockUpsertEmailSubscriber).toHaveBeenCalledWith({
      email: 'newuser@example.com',
      source: 'quiz',
      locale: 'en',
      sessionId: 'session_12345',
    });
  });

  it('rejects invalid email addresses', async () => {
    const response = await POST(createRequest({
      email: 'not-an-email',
      source: 'homepage',
    }));

    expect(response.status).toBe(400);
    const data = await getResponseData(response);
    expect(data.success).toBe(false);
    expect(data.error).toBe('Please enter a valid email address');
    expect(mockUpsertEmailSubscriber).not.toHaveBeenCalled();
  });

  it('returns 500 when subscriber upsert fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    try {
      mockUpsertEmailSubscriber.mockRejectedValue(new Error('db unavailable'));

      const response = await POST(createRequest({
        email: 'newuser@example.com',
        source: 'homepage',
      }));

      expect(response.status).toBe(500);
      const data = await getResponseData(response);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Something went wrong. Please try again.');
    } finally {
      consoleErrorSpy.mockRestore();
    }
  });
});
