import type { NextRequest } from 'next/server';

const mockEmailSubscriberFindUnique = jest.fn();
const mockEmailSubscriberCreate = jest.fn();
const mockEmailSubscriberUpdate = jest.fn();

const mockWithRateLimit = jest.fn((_config: unknown, handler: unknown) => handler);

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    emailSubscriber: {
      findUnique: mockEmailSubscriberFindUnique,
      create: mockEmailSubscriberCreate,
      update: mockEmailSubscriberUpdate,
    },
  },
}));



jest.mock('@/lib/security/rate-limit-app', () => ({
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

function createRequest(body: unknown): NextRequest {
  return {
    json: jest.fn().mockResolvedValue(body),
  } as unknown as NextRequest;
}

async function getResponseData(response: Response) {
  return response.json();
}

describe('/api/subscribe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a new subscriber', async () => {
    mockEmailSubscriberFindUnique.mockResolvedValue(null);
    mockEmailSubscriberCreate.mockResolvedValue({
      email: 'newuser@example.com',
      status: 'ACTIVE',
    });

    const response = await POST(createRequest({
      email: 'NewUser@Example.COM',
      source: 'homepage',
      locale: 'fr',
    }));

    expect(response.status).toBe(201);
    const data = await getResponseData(response);
    expect(data.success).toBe(true);
    expect(data.message).toContain('Successfully subscribed');

    expect(mockEmailSubscriberFindUnique).toHaveBeenCalledWith({
      where: { email: 'newuser@example.com' },
    });
    expect(mockEmailSubscriberCreate).toHaveBeenCalledWith({
      data: {
        email: 'newuser@example.com',
        source: 'homepage',
        locale: 'fr',
        status: 'ACTIVE',
        welcomeEmailSent: false,
      },
    });
  });

  it('returns already subscribed for duplicate active subscriber', async () => {
    mockEmailSubscriberFindUnique.mockResolvedValue({
      email: 'existing@example.com',
      status: 'ACTIVE',
    });

    const response = await POST(createRequest({
      email: 'existing@example.com',
      source: 'footer',
    }));

    expect(response.status).toBe(200);
    const data = await getResponseData(response);
    expect(data.success).toBe(true);
    expect(data.message).toBe('You are already subscribed!');
    expect(mockEmailSubscriberCreate).not.toHaveBeenCalled();
    expect(mockEmailSubscriberUpdate).not.toHaveBeenCalled();
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
    expect(mockEmailSubscriberFindUnique).not.toHaveBeenCalled();
  });
});
