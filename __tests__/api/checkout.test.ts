import type { NextRequest } from 'next/server';
import { signOrderId, ORDER_MAX_AGE_MS } from '@/lib/security/checkout-token';

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
    process.env.NEXTAUTH_SECRET = 'test-secret-for-checkout-tokens';

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
  });

  it('creates a Stripe checkout session for a valid order with valid token', async () => {
    const orderId = '550e8400-e29b-41d4-a716-446655440000';
    const checkoutToken = signOrderId(orderId);

    mockOrderFindUnique.mockResolvedValue({
      id: orderId,
      status: 'PENDING',
      createdAt: new Date(),
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
      checkoutToken,
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
    });
  });

  it('returns 404 when order lookup fails', async () => {
    const orderId = '550e8400-e29b-41d4-a716-446655440000';
    const checkoutToken = signOrderId(orderId);

    mockOrderFindUnique.mockResolvedValue(null);

    const response = await POST(createRequest({
      orderId,
      checkoutToken,
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

  it('returns 400 for missing checkout token', async () => {
    const response = await POST(createRequest({
      orderId: '550e8400-e29b-41d4-a716-446655440000',
      currency: 'CAD',
      customer: { email: 'jane@example.com' },
      // checkoutToken is missing
    }));

    expect(response.status).toBe(400);
    const data = await getResponseData(response);
    expect(data.error).toBe('Invalid request data');
    expect(mockOrderFindUnique).not.toHaveBeenCalled();
    expect(mockStripeSessionsCreate).not.toHaveBeenCalled();
  });

  it('returns 403 for invalid checkout token', async () => {
    const orderId = '550e8400-e29b-41d4-a716-446655440000';

    const response = await POST(createRequest({
      orderId,
      checkoutToken: 'invalid-token',
      currency: 'CAD',
      customer: { email: 'jane@example.com' },
    }));

    expect(response.status).toBe(403);
    const data = await getResponseData(response);
    expect(data.error).toBe('Invalid checkout token');
    expect(mockOrderFindUnique).not.toHaveBeenCalled();
    expect(mockStripeSessionsCreate).not.toHaveBeenCalled();
  });

  it('returns 403 for tampered checkout token (wrong orderId)', async () => {
    const orderId = '550e8400-e29b-41d4-a716-446655440000';
    const wrongOrderId = '660e8400-e29b-41d4-a716-446655440001';
    // Token signed for a different order
    const tamperedToken = signOrderId(wrongOrderId);

    const response = await POST(createRequest({
      orderId,
      checkoutToken: tamperedToken,
      currency: 'CAD',
      customer: { email: 'jane@example.com' },
    }));

    expect(response.status).toBe(403);
    const data = await getResponseData(response);
    expect(data.error).toBe('Invalid checkout token');
    expect(mockOrderFindUnique).not.toHaveBeenCalled();
    expect(mockStripeSessionsCreate).not.toHaveBeenCalled();
  });

  it('returns 409 when order is already paid', async () => {
    const orderId = '550e8400-e29b-41d4-a716-446655440000';
    const checkoutToken = signOrderId(orderId);

    mockOrderFindUnique.mockResolvedValue({
      id: orderId,
      status: 'PAID',
      createdAt: new Date(),
      items: [
        {
          price: 14.99,
          quantity: 1,
          product: {
            name: 'Purrify Trial Size',
            description: 'Activated carbon cat litter additive',
            image: null,
          },
        },
      ],
    });

    const response = await POST(createRequest({
      orderId,
      checkoutToken,
      currency: 'CAD',
      customer: { email: 'jane@example.com' },
    }));

    expect(response.status).toBe(409);
    const data = await getResponseData(response);
    expect(data.error).toBe('Order already processed');
    expect(mockStripeSessionsCreate).not.toHaveBeenCalled();
  });

  it('returns 409 when order is already cancelled', async () => {
    const orderId = '550e8400-e29b-41d4-a716-446655440000';
    const checkoutToken = signOrderId(orderId);

    mockOrderFindUnique.mockResolvedValue({
      id: orderId,
      status: 'CANCELLED',
      createdAt: new Date(),
      items: [
        {
          price: 14.99,
          quantity: 1,
          product: {
            name: 'Purrify Trial Size',
            description: 'Activated carbon cat litter additive',
            image: null,
          },
        },
      ],
    });

    const response = await POST(createRequest({
      orderId,
      checkoutToken,
      currency: 'CAD',
      customer: { email: 'jane@example.com' },
    }));

    expect(response.status).toBe(409);
    const data = await getResponseData(response);
    expect(data.error).toBe('Order already processed');
    expect(mockStripeSessionsCreate).not.toHaveBeenCalled();
  });

  it('returns 410 when order has expired (> 1 hour old)', async () => {
    const orderId = '550e8400-e29b-41d4-a716-446655440000';
    const checkoutToken = signOrderId(orderId);

    // Create a date 2 hours ago (older than ORDER_MAX_AGE_MS)
    const twoHoursAgo = new Date(Date.now() - (ORDER_MAX_AGE_MS + 60 * 60 * 1000));

    mockOrderFindUnique.mockResolvedValue({
      id: orderId,
      status: 'PENDING',
      createdAt: twoHoursAgo,
      items: [
        {
          price: 14.99,
          quantity: 1,
          product: {
            name: 'Purrify Trial Size',
            description: 'Activated carbon cat litter additive',
            image: null,
          },
        },
      ],
    });

    const response = await POST(createRequest({
      orderId,
      checkoutToken,
      currency: 'CAD',
      customer: { email: 'jane@example.com' },
    }));

    expect(response.status).toBe(410);
    const data = await getResponseData(response);
    expect(data.error).toBe('Order expired');
    expect(mockStripeSessionsCreate).not.toHaveBeenCalled();
  });

  it('returns 500 and captures exception when Stripe session creation fails', async () => {
    const orderId = '550e8400-e29b-41d4-a716-446655440000';
    const checkoutToken = signOrderId(orderId);

    mockOrderFindUnique.mockResolvedValue({
      id: orderId,
      status: 'PENDING',
      createdAt: new Date(),
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
      orderId,
      checkoutToken,
      currency: 'CAD',
      customer: { email: 'jane@example.com' },
    }));

    expect(response.status).toBe(500);
    const data = await getResponseData(response);
    expect(data.error).toBe('Failed to create checkout session');
  });
});
