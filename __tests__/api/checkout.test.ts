import type { NextRequest } from 'next/server';

const mockStripeSessionsCreate = jest.fn();
const mockStripeConstructor = jest.fn().mockImplementation(() => ({
  checkout: {
    sessions: {
      create: mockStripeSessionsCreate,
    },
  },
}));

const mockOrderFindUnique = jest.fn();
const mockCheckRateLimit = jest.fn();
const mockCreateRateLimitHeaders = jest.fn();
const mockGetCommercialAssignments = jest.fn();
const mockSerializeAssignments = jest.fn();
const mockCaptureException = jest.fn();

jest.mock('stripe', () => ({
  __esModule: true,
  default: mockStripeConstructor,
}));

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    order: {
      findUnique: mockOrderFindUnique,
    },
  },
}));

jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: mockCheckRateLimit,
  createRateLimitHeaders: mockCreateRateLimitHeaders,
}));

jest.mock('@/lib/experiments/commercial', () => ({
  getCommercialAssignmentsFromCookieReader: mockGetCommercialAssignments,
  serializeAssignments: mockSerializeAssignments,
}));

jest.mock('@sentry/nextjs', () => ({
  captureException: mockCaptureException,
}));

const { POST } = require('../../app/api/checkout/route') as typeof import('../../app/api/checkout/route');

function createRequest(body: unknown): NextRequest {
  return {
    headers: new Headers({
      'x-forwarded-for': '203.0.113.10',
    }),
    cookies: {
      get: jest.fn(),
    },
    json: jest.fn().mockResolvedValue(body),
  } as unknown as NextRequest;
}

async function getResponseData(response: Response) {
  return response.json();
}

describe('/api/checkout', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    process.env.STRIPE_SECRET_KEY = 'sk_test_checkout';
    process.env.NEXTAUTH_URL = 'https://www.purrify.ca';

    mockCheckRateLimit.mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      reset: Math.floor(Date.now() / 1000) + 60,
    });
    mockCreateRateLimitHeaders.mockReturnValue({
      'X-RateLimit-Limit': '5',
      'X-RateLimit-Remaining': '4',
      'X-RateLimit-Reset': '1234567890',
    });
    mockGetCommercialAssignments.mockReturnValue([]);
    mockSerializeAssignments.mockReturnValue('');
  });

  it('creates a Stripe checkout session for a valid order', async () => {
    const orderId = '550e8400-e29b-41d4-a716-446655440000';
    mockGetCommercialAssignments.mockReturnValue([
      { testSlug: 'commercial-headline-test', variant: 'variant' },
    ]);
    mockSerializeAssignments.mockReturnValue('commercial-headline-test:variant');
    mockOrderFindUnique.mockResolvedValue({
      id: orderId,
      items: [
        {
          price: 14.99,
          quantity: 2,
          product: {
            name: 'Purrify Trial Size',
            description: 'Activated carbon cat litter additive',
            image: 'https://www.purrify.ca/optimized/trial.webp',
          },
        },
      ],
    });
    mockStripeSessionsCreate.mockResolvedValue({
      id: 'cs_test_123',
      url: 'https://checkout.stripe.com/c/pay/cs_test_123',
    });

    const response = await POST(createRequest({
      orderId,
      currency: 'USD',
      customer: {
        email: 'jane@example.com',
        name: 'Jane Doe',
      },
    }));

    expect(response.status).toBe(200);
    const data = await getResponseData(response);
    expect(data).toEqual({
      sessionId: 'cs_test_123',
      url: 'https://checkout.stripe.com/c/pay/cs_test_123',
    });

    expect(mockOrderFindUnique).toHaveBeenCalledWith({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });
    expect(mockStripeSessionsCreate).toHaveBeenCalledTimes(1);

    const stripePayload = mockStripeSessionsCreate.mock.calls[0][0];
    expect(stripePayload.customer_email).toBe('jane@example.com');
    expect(stripePayload.mode).toBe('payment');
    expect(stripePayload.line_items).toHaveLength(1);
    expect(stripePayload.line_items[0]).toMatchObject({
      quantity: 2,
      price_data: {
        currency: 'usd',
        unit_amount: 1499,
        product_data: {
          name: 'Purrify Trial Size',
          description: 'Activated carbon cat litter additive',
        },
      },
    });
    expect(stripePayload.metadata).toMatchObject({
      orderId,
      customerName: 'Jane Doe',
      abAssignments: 'commercial-headline-test:variant',
    });
  });

  it('returns 404 when order lookup fails', async () => {
    mockOrderFindUnique.mockResolvedValue(null);

    const response = await POST(createRequest({
      orderId: '550e8400-e29b-41d4-a716-446655440000',
      currency: 'CAD',
      customer: { email: 'jane@example.com' },
    }));

    expect(response.status).toBe(404);
    const data = await getResponseData(response);
    expect(data.error).toBe('Order not found');
    expect(mockStripeSessionsCreate).not.toHaveBeenCalled();
  });

  it('returns 400 for missing required fields', async () => {
    const response = await POST(createRequest({
      currency: 'CAD',
      customer: { email: 'jane@example.com' },
    }));

    expect(response.status).toBe(400);
    const data = await getResponseData(response);
    expect(data.error).toBe('Invalid request data');
    expect(data.details).toBeDefined();
    expect(mockOrderFindUnique).not.toHaveBeenCalled();
    expect(mockStripeSessionsCreate).not.toHaveBeenCalled();
  });

  it('returns 500 and captures exception when Stripe session creation fails', async () => {
    mockOrderFindUnique.mockResolvedValue({
      id: '550e8400-e29b-41d4-a716-446655440000',
      items: [
        {
          price: 12.5,
          quantity: 1,
          product: {
            name: 'Purrify Standard',
            description: 'Activated carbon additive',
            image: null,
          },
        },
      ],
    });
    mockStripeSessionsCreate.mockRejectedValue(new Error('Stripe unavailable'));

    const response = await POST(createRequest({
      orderId: '550e8400-e29b-41d4-a716-446655440000',
      currency: 'CAD',
      customer: { email: 'jane@example.com' },
    }));

    expect(response.status).toBe(500);
    const data = await getResponseData(response);
    expect(data.error).toBe('Failed to create checkout session');
    expect(mockCaptureException).toHaveBeenCalledTimes(1);
  });
});
