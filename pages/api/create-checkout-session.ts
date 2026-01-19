import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { z } from 'zod';
import * as Sentry from '@sentry/nextjs';
import prisma from '../../src/lib/prisma';
import { withCSRFProtection } from '../../src/lib/security/csrf';
import { withRateLimit, RATE_LIMITS } from '../../src/lib/security/rate-limit';

// Initialize Stripe with proper error handling
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

// Input validation schema
const createCheckoutSchema = z.object({
  orderId: z.string().uuid('Invalid order ID format'),
  currency: z.enum(['CAD', 'USD'], { message: 'Currency must be CAD or USD' }),
  customer: z.object({
    email: z.string().email('Invalid email format').max(254, 'Email too long'),
    name: z.string().min(1, 'Name is required').max(100, 'Name too long').optional(),
  }),
});

// Product catalog for price verification (in production, load from database)
const ALLOWED_PRODUCTS = {
  'trial-size': {
    maxPrice: 1999, // $19.99 in cents
    name: 'Purrify Trial Size',
  },
  'full-size': {
    maxPrice: 4999, // $49.99 in cents 
    name: 'Purrify Full Size',
  },
} as const;

interface OrderItemWithProduct {
  price: number;
  quantity: number;
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
  };
}

// Cookie name for affiliate tracking
const AFFILIATE_COOKIE_NAME = 'purrify_ref';

// Sanitize string input to prevent injection
function sanitizeString(input: string): string {
  return input.replaceAll(/[<>\"'&]/g, '').trim().substring(0, 255);
}

// Parse affiliate cookie (format: "CODE:SESSION_ID")
function parseAffiliateCookie(cookie: string | undefined): string | null {
  if (!cookie) return null;
  // Validate format: alphanumeric code, colon, UUID session ID
  const pattern = /^[A-Za-z0-9]{6,12}:[a-f0-9-]{36}$/;
  if (pattern.test(cookie)) {
    return cookie;
  }
  return null;
}

// Validate and sanitize metadata
function sanitizeMetadata(metadata: Record<string, unknown>): Record<string, string> {
  const sanitized: Record<string, string> = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (typeof key === 'string' && key.length <= 40) {
      const sanitizedKey = key.replaceAll(/[^a-zA-Z0-9_]/g, '');
      if (sanitizedKey.length > 0) {
        sanitized[sanitizedKey] = String(value).substring(0, 500);
      }
    }
  }
  return sanitized;
}

// Verify price against product catalog
function verifyItemPrice(item: OrderItemWithProduct): boolean {
  const { logger } = Sentry;
  const productKey = item.product.id as keyof typeof ALLOWED_PRODUCTS;
  const allowedProduct = ALLOWED_PRODUCTS[productKey];

  if (!allowedProduct) {
    logger.error('Invalid product ID in price verification', {
      productId: item.product.id
    });
    return false;
  }

  const itemPriceInCents = Math.round(item.price * 100);
  if (itemPriceInCents > allowedProduct.maxPrice) {
    logger.error('Price exceeds maximum allowed', {
      productId: item.product.id,
      price: itemPriceInCents,
      maxPrice: allowedProduct.maxPrice
    });
    return false;
  }

  return true;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return Sentry.startSpan(
    {
      op: 'http.server',
      name: 'POST /api/create-checkout-session',
    },
    async (span) => {
      const { logger } = Sentry;

      // Only allow POST requests
      if (req.method !== 'POST') {
        logger.warn('Invalid HTTP method for checkout', {
          method: req.method,
          ip: req.socket.remoteAddress
        });

        return res.status(405).json({
          error: 'Method not allowed',
          allowedMethods: ['POST']
        });
      }

      try {
        logger.info('Processing checkout session request');

        // Validate and sanitize input
    logger.debug('Validating checkout request data');
    const validationResult = createCheckoutSchema.safeParse(req.body);
    if (!validationResult.success) {
      logger.warn('Invalid checkout request data', {
        errors: validationResult.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });

      return res.status(400).json({
        error: 'Invalid request data',
        details: validationResult.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    const { orderId, currency, customer } = validationResult.data;

    span.setAttribute('orderId', orderId);
    span.setAttribute('currency', currency);
    span.setAttribute('customerEmail', customer.email);

    // Sanitize customer data
    const sanitizedCustomer = {
      email: sanitizeString(customer.email.toLowerCase()),
      name: customer.name ? sanitizeString(customer.name) : undefined,
    };

    // Get order from database with proper validation
    logger.debug(logger.fmt`Fetching order from database: ${orderId}`);
    if (!prisma) {
      throw new Error('Database connection not established');
    }
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      logger.warn('Order not found', { orderId });
      return res.status(404).json({
        error: 'Order not found',
        orderId: orderId
      });
    }

    span.setAttribute('orderItemCount', order.items.length);
    span.setAttribute('orderTotal', order.totalAmount);

    // Verify order hasn't already been paid
    if (order.status === 'PAID') {
      logger.warn('Attempted checkout for already paid order', {
        orderId,
        status: order.status
      });

      return res.status(400).json({
        error: 'Order already paid',
        orderId: orderId
      });
    }

    // Verify currency matches order currency
    if (order.currency !== currency) {
      logger.error('Currency mismatch detected', {
        orderId,
        requestCurrency: currency,
        orderCurrency: order.currency
      });

      return res.status(400).json({
        error: 'Currency mismatch',
        message: `Order currency (${order.currency}) does not match request currency (${currency})`
      });
    }

    // Verify all item prices against catalog
    logger.debug('Verifying item prices against catalog');
    for (const item of order.items) {
      if (!verifyItemPrice(item as OrderItemWithProduct)) {
        logger.error('Price verification failed', {
          orderId,
          productId: item.product.id,
          price: item.price
        });

        return res.status(400).json({
          error: 'Invalid product or price detected',
          productId: item.product.id
        });
      }
    }

    // Calculate total and verify it matches order total
    const calculatedTotal = order.items.reduce((sum: number, item: OrderItemWithProduct) => {
      return sum + (item.price * item.quantity);
    }, 0);

    if (Math.abs(calculatedTotal - order.totalAmount) > 0.01) {
      logger.error('Order total mismatch detected', {
        orderId,
        calculated: calculatedTotal,
        stored: order.totalAmount,
        difference: Math.abs(calculatedTotal - order.totalAmount)
      });

      return res.status(400).json({
        error: 'Order total verification failed'
      });
    }

    // Create line items with validated prices
    const lineItems = order.items.map((item: OrderItemWithProduct) => ({
      price_data: {
        currency: currency.toLowerCase(), // Use currency from request (validated above)
        product_data: {
          name: sanitizeString(item.product.name),
          description: sanitizeString(item.product.description),
          images: [item.product.image].filter(Boolean),
        },
        unit_amount: Math.round(item.price * 100), // Already validated above
      },
      quantity: Math.max(1, Math.min(99, Math.floor(item.quantity))), // Clamp quantity
    }));

    // Create Stripe checkout session with security settings
    logger.info('Creating Stripe checkout session', {
      orderId,
      itemCount: order.items.length,
      totalAmount: order.totalAmount
    });

    // Note: Using payment_method_configuration to enable Klarna, Link, and other
    // payment methods configured in Stripe Dashboard. If not set, falls back to
    // dynamic payment methods (Apple Pay, Google Pay, cards) based on device/location.
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?cancelled=true`,
      customer_email: sanitizedCustomer.email,
      shipping_address_collection: {
        allowed_countries: ['CA', 'US'], // Expand if needed
      },
      // Sanitize metadata (include affiliate tracking if present)
      metadata: sanitizeMetadata({
        orderId: order.id,
        customerEmail: sanitizedCustomer.email,
        itemCount: order.items.length,
        // Include affiliate tracking data if cookie is present
        ...(parseAffiliateCookie(req.cookies[AFFILIATE_COOKIE_NAME]) && {
          affiliate_ref: parseAffiliateCookie(req.cookies[AFFILIATE_COOKIE_NAME]),
        }),
      }),
      // Security settings
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
      payment_intent_data: {
        metadata: sanitizeMetadata({
          orderId: order.id,
          source: 'purrify_checkout',
        }),
      },
    };

    // Add payment method configuration if available (for Klarna, Link, etc.)
    if (process.env.STRIPE_PAYMENT_METHOD_CONFIG_ID) {
      sessionConfig.payment_method_configuration = process.env.STRIPE_PAYMENT_METHOD_CONFIG_ID;
      logger.debug('Using payment method configuration', {
        configId: process.env.STRIPE_PAYMENT_METHOD_CONFIG_ID
      });
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Log successful checkout creation (without sensitive data)
    span.setAttribute('sessionId', session.id);
    logger.info('Checkout session created successfully', {
      sessionId: session.id,
      orderId,
      itemCount: order.items.length,
      totalAmount: order.totalAmount
    });

    return res.status(200).json({
      sessionId: session.id,
      url: session.url
    });

      } catch (error) {
        // Capture exception in Sentry
        Sentry.captureException(error);

        // Log error securely (don't expose sensitive data)
        const errorId = Math.random().toString(36).substring(2, 15);
        logger.error('Failed to create checkout session', {
          errorId,
          message: error instanceof Error ? error.message : 'Unknown error',
          orderId: req.body.orderId,
          timestamp: new Date().toISOString(),
        });

        // Return generic error to client
        return res.status(500).json({
          error: 'Failed to create checkout session',
          errorId: errorId
        });
      }
    }
  );
}

// Apply rate limiting first, then CSRF protection middleware
export default withRateLimit(RATE_LIMITS.CREATE, withCSRFProtection(handler));