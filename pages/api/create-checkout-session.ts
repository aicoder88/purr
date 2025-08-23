import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { z } from 'zod';
import { rateLimit } from 'express-rate-limit';
import { prisma } from '../../src/lib/prisma';

// Initialize Stripe with proper error handling
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    error: 'Too many checkout attempts, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Input validation schema
const createCheckoutSchema = z.object({
  orderId: z.string().uuid('Invalid order ID format'),
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

// Helper function to apply rate limiting in Next.js API route
function runMiddleware(
  req: NextApiRequest, 
  res: NextApiResponse, 
  fn: (req: NextApiRequest, res: NextApiResponse, callback: (result?: Error) => void) => void
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result?: Error) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Sanitize string input to prevent injection
function sanitizeString(input: string): string {
  return input.replace(/[<>\"'&]/g, '').trim().substring(0, 255);
}

// Validate and sanitize metadata
function sanitizeMetadata(metadata: Record<string, unknown>): Record<string, string> {
  const sanitized: Record<string, string> = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (typeof key === 'string' && key.length <= 40) {
      const sanitizedKey = key.replace(/[^a-zA-Z0-9_]/g, '');
      if (sanitizedKey.length > 0) {
        sanitized[sanitizedKey] = String(value).substring(0, 500);
      }
    }
  }
  return sanitized;
}

// Verify price against product catalog
function verifyItemPrice(item: OrderItemWithProduct): boolean {
  const productKey = item.product.id as keyof typeof ALLOWED_PRODUCTS;
  const allowedProduct = ALLOWED_PRODUCTS[productKey];
  
  if (!allowedProduct) {
    console.error(`Invalid product ID: ${item.product.id}`);
    return false;
  }
  
  const itemPriceInCents = Math.round(item.price * 100);
  if (itemPriceInCents > allowedProduct.maxPrice) {
    console.error(`Price too high for ${item.product.id}: ${itemPriceInCents} > ${allowedProduct.maxPrice}`);
    return false;
  }
  
  return true;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['POST'] 
    });
  }

  try {
    // Apply rate limiting
    await runMiddleware(req, res, limiter);

    // Validate and sanitize input
    const validationResult = createCheckoutSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: validationResult.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    const { orderId, customer } = validationResult.data;

    // Sanitize customer data
    const sanitizedCustomer = {
      email: sanitizeString(customer.email.toLowerCase()),
      name: customer.name ? sanitizeString(customer.name) : undefined,
    };

    // Get order from database with proper validation
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
      return res.status(404).json({ 
        error: 'Order not found',
        orderId: orderId 
      });
    }

    // Verify order hasn't already been paid
    if (order.status === 'paid') {
      return res.status(400).json({
        error: 'Order already paid',
        orderId: orderId
      });
    }

    // Verify all item prices against catalog
    for (const item of order.items) {
      if (!verifyItemPrice(item as OrderItemWithProduct)) {
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
      console.error(`Order total mismatch: calculated ${calculatedTotal}, stored ${order.totalAmount}`);
      return res.status(400).json({
        error: 'Order total verification failed'
      });
    }

    // Create line items with validated prices
    const lineItems = order.items.map((item: OrderItemWithProduct) => ({
      price_data: {
        currency: 'usd',
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
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?cancelled=true`,
      customer_email: sanitizedCustomer.email,
      shipping_address_collection: {
        allowed_countries: ['CA', 'US'], // Expand if needed
      },
      // Sanitize metadata
      metadata: sanitizeMetadata({
        orderId: order.id,
        customerEmail: sanitizedCustomer.email,
        itemCount: order.items.length,
      }),
      // Security settings
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
      payment_intent_data: {
        metadata: sanitizeMetadata({
          orderId: order.id,
          source: 'purrify_checkout',
        }),
      },
    });

    // Log successful checkout creation (without sensitive data)
    console.log(`Checkout session created: ${session.id} for order ${orderId}`);

    return res.status(200).json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    // Log error securely (don't expose sensitive data)
    const errorId = Math.random().toString(36).substring(2, 15);
    console.error(`Checkout error [${errorId}]:`, {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    // Return generic error to client
    return res.status(500).json({ 
      error: 'Failed to create checkout session',
      errorId: errorId 
    });
  }
}