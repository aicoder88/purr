import type { NextRequest } from 'next/server';

const mockResendSend = jest.fn();
const mockResendConstructor = jest.fn().mockImplementation(() => ({
  emails: {
    send: mockResendSend,
  },
}));

const mockCheckRateLimit = jest.fn();
const mockCreateRateLimitHeaders = jest.fn();
const mockIsResendConfigured = jest.fn();
const mockIsZendeskConfigured = jest.fn();
const mockCreateContactTicket = jest.fn();
const mockCaptureException = jest.fn();

jest.mock('resend', () => ({
  Resend: mockResendConstructor,
}));

jest.mock('@/lib/rate-limit', () => ({
  checkRateLimit: mockCheckRateLimit,
  createRateLimitHeaders: mockCreateRateLimitHeaders,
}));

jest.mock('@/lib/resend-config', () => ({
  RESEND_CONFIG: {
    apiKey: 're_test_123',
    fromName: 'Purrify',
    fromEmail: 'noreply@purrify.ca',
    toEmail: 'support@purrify.ca',
  },
  isResendConfigured: mockIsResendConfigured,
}));

jest.mock('@/lib/zendesk', () => ({
  createContactTicket: mockCreateContactTicket,
  isZendeskConfigured: mockIsZendeskConfigured,
}));

jest.mock('@sentry/nextjs', () => ({
  captureException: mockCaptureException,
}));

const { POST } = require('../../app/api/contact/route') as typeof import('../../app/api/contact/route');

function createRequest(body: unknown): NextRequest {
  return {
    headers: new Headers({
      'x-forwarded-for': '198.51.100.8',
    }),
    json: jest.fn().mockResolvedValue(body),
  } as unknown as NextRequest;
}

async function getResponseData(response: Response) {
  return response.json();
}

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();

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
    mockIsZendeskConfigured.mockReturnValue(false);
    mockIsResendConfigured.mockReturnValue(true);
    mockResendSend.mockResolvedValue({
      data: { id: 'email_123' },
      error: null,
    });
  });

  it('accepts a valid submission and sends via Resend', async () => {
    const response = await POST(createRequest({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'I need help with my recent order and shipping timeline.',
    }));

    expect(response.status).toBe(200);
    const data = await getResponseData(response);
    expect(data.success).toBe(true);
    expect(data.message).toContain('Thank you for contacting us');

    expect(mockResendConstructor).toHaveBeenCalledTimes(1);
    expect(mockResendSend).toHaveBeenCalledTimes(1);
    expect(mockResendSend).toHaveBeenCalledWith(
      expect.objectContaining({
        replyTo: 'jane@example.com',
        to: 'support@purrify.ca',
      })
    );
    expect(mockCreateContactTicket).not.toHaveBeenCalled();
  });

  it('returns 400 when required fields are missing', async () => {
    const response = await POST(createRequest({
      name: 'Jane Doe',
      email: 'jane@example.com',
    }));

    expect(response.status).toBe(400);
    const data = await getResponseData(response);
    expect(data.success).toBe(false);
    expect(data.message).toContain('Invalid form data');
    expect(mockResendSend).not.toHaveBeenCalled();
  });

  it('returns 429 when rate limit is exceeded', async () => {
    mockCheckRateLimit.mockResolvedValue({
      success: false,
      limit: 5,
      remaining: 0,
      reset: Math.floor(Date.now() / 1000) + 60,
      retryAfter: 60,
    });
    mockCreateRateLimitHeaders.mockReturnValue({
      'X-RateLimit-Limit': '5',
      'X-RateLimit-Remaining': '0',
      'X-RateLimit-Reset': '1234567890',
      'Retry-After': '60',
    });

    const response = await POST(createRequest({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'This is a valid message with enough length.',
    }));

    expect(response.status).toBe(429);
    const data = await getResponseData(response);
    expect(data.success).toBe(false);
    expect(data.message).toBe('Too many requests. Please try again later.');
    expect(mockResendSend).not.toHaveBeenCalled();
  });
});
