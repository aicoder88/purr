import { getProductPrice } from '@/lib/pricing';

export const runtime = 'edge';

interface PrefetchData {
  productId: string;
  quantity: number;
  userAgent?: string;
  location?: string;
}

export async function POST(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { productId, quantity, userAgent, location }: PrefetchData = await req.json();

    // Validate input
    if (!productId || !quantity) {
      return new Response('Missing required fields', { status: 400 });
    }

    // Get product data (simulate database lookup with edge-friendly approach)
    const productData = await getProductData(productId);
    if (!productData) {
      return new Response('Product not found', { status: 404 });
    }

    // Calculate pricing and shipping
    const pricing = calculatePricing(productData, quantity, location);

    // Prepare Stripe checkout data
    const checkoutData = await prepareStripeData(productData, quantity, pricing);

    // Generate prefetch cache key
    const cacheKey = generateCacheKey(productId, quantity, location);

    // Store in edge cache for ultra-fast retrieval
    await storeInEdgeCache(cacheKey, {
      product: productData,
      pricing,
      checkout: checkoutData,
      timestamp: Date.now(),
      expiresAt: Date.now() + (5 * 60 * 1000) // 5 minutes
    });

    // Track prefetch analytics
    await trackPrefetchEvent({
      productId,
      quantity,
      userAgent,
      location,
      timestamp: Date.now()
    });

    const response = {
      success: true,
      cacheKey,
      estimatedTotal: pricing.total,
      shipping: pricing.shipping,
      taxes: pricing.taxes,
      currency: 'CAD',
      expiresIn: 300 // 5 minutes
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        'CDN-Cache-Control': 'max-age=300',
        'Vercel-CDN-Cache-Control': 'max-age=300'
      }
    });

  } catch (error) {
    console.error('Prefetch error:', error);

    return new Response('Internal server error', {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
  }
}

async function getProductData(productId: string) {
  // Edge-optimized product lookup
  const products = {
    '12g': {
      id: '12g',
      name: 'Purrify 12g Trial Size',
      price: getProductPrice('trial'),
      weight: 0.012, // kg
      sku: 'PURR-12G',
      stripe_price_id: 'price_trial_12g',
      image: '17g-transparent-v2.webp'
    },
    '50g': {
      id: '50g',
      name: 'Purrify 50g Standard',
      price: getProductPrice('standard'),
      weight: 0.05,
      sku: 'PURR-50G',
      stripe_price_id: 'price_standard_50g',
      image: '60g-transparent.webp'
    },
    '120g': {
      id: '120g',
      name: 'Purrify 120g The Goldilocks Bag',
      price: getProductPrice('family'),
      weight: 0.12,
      sku: 'PURR-120G',
      stripe_price_id: 'price_family_120g',
      image: '60g-transparent.webp'
    }
  };

  return products[productId as keyof typeof products] || null;
}

function calculatePricing(product: { price: number; taxable?: boolean }, quantity: number, location?: string) {
  const subtotal = product.price * quantity;

  // Calculate shipping (free over $35 in Canada)
  let shipping = 0;
  if (subtotal < 35) {
    shipping = 9.99;
  }

  // Calculate taxes based on location (simplified)
  const taxRates = {
    'ON': 0.13, // HST
    'BC': 0.12, // PST + GST
    'QC': 0.14975, // QST + GST
    'AB': 0.05, // GST only
    'MB': 0.12, // PST + GST
    'SK': 0.11, // PST + GST
    'NS': 0.15, // HST
    'NB': 0.15, // HST
    'NL': 0.15, // HST
    'PE': 0.15, // HST
    'YT': 0.05, // GST only
    'NT': 0.05, // GST only
    'NU': 0.05  // GST only
  };

  const province = location?.toUpperCase() || 'ON';
  const taxRate = taxRates[province as keyof typeof taxRates] || 0.13;
  const taxes = Math.round((subtotal + shipping) * taxRate * 100) / 100;

  const total = Math.round((subtotal + shipping + taxes) * 100) / 100;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    taxes,
    total,
    taxRate,
    province
  };
}

async function prepareStripeData(product: { id: string; name: string; price: number; image?: string }, quantity: number, pricing: { subtotal: number; taxes: number; total: number; shipping: number }) {
  // Prepare Stripe checkout session data for ultra-fast creation
  return {
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: product.name,
            description: `Activated carbon cat litter additive - ${product.id}`,
            images: ['https://www.purrify.ca/optimized/17g-transparent-v2.webp'],
          },
          unit_amount: Math.round(product.price * 100), // Stripe uses cents
        },
        quantity: quantity,
      },
    ],
    shipping_options: pricing.shipping > 0 ? [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: Math.round(pricing.shipping * 100), currency: 'cad' },
          display_name: 'Standard Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 2 },
            maximum: { unit: 'business_day', value: 5 },
          },
        },
      },
    ] : [],
    automatic_tax: { enabled: true },
    success_url: 'https://www.purrify.ca/thank-you?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://www.purrify.ca/checkout?cancelled=true',
    metadata: {
      product_id: product.id,
      quantity: quantity.toString(),
      prefetched: 'true',
      cache_timestamp: Date.now().toString()
    }
  };
}

function generateCacheKey(productId: string, quantity: number, location?: string): string {
  const baseKey = `prefetch:${productId}:${quantity}`;
  return location ? `${baseKey}:${location}` : baseKey;
}

async function storeInEdgeCache(key: string, data: Record<string, unknown>) {
  // In production, this would use Vercel's Edge Config or similar
  // For now, we'll simulate with a simple in-memory approach

  // Edge cache simulation - in production use proper edge storage
  const cache = new Map();
  cache.set(key, JSON.stringify(data));

  // Set expiration
  setTimeout(() => {
    cache.delete(key);
  }, 5 * 60 * 1000); // 5 minutes

  return true;
}

async function trackPrefetchEvent(data: Record<string, unknown>) {
  // Track prefetch analytics for optimization
  const event = {
    type: 'checkout_prefetch',
    timestamp: data.timestamp,
    product_id: data.productId,
    quantity: data.quantity,
    user_agent: typeof data.userAgent === 'string' ? data.userAgent.substring(0, 100) : 'unknown', // Truncate for privacy
    location: data.location,
    edge_region: process.env.VERCEL_REGION || 'unknown'
  };

  // In production, send to analytics service
  return true;
}
