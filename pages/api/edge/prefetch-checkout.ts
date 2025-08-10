import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

interface PrefetchData {
  productId: string;
  quantity: number;
  userAgent?: string;
  location?: string;
}

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse('Method not allowed', { status: 405 });
  }

  try {
    const { productId, quantity, userAgent, location }: PrefetchData = await req.json();

    // Validate input
    if (!productId || !quantity) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Get product data (simulate database lookup with edge-friendly approach)
    const productData = await getProductData(productId);
    if (!productData) {
      return new NextResponse('Product not found', { status: 404 });
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

    return new NextResponse(JSON.stringify(response), {
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
    
    return new NextResponse('Internal server error', {
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
    '20g': {
      id: '20g',
      name: 'Purrify 20g Trial Size',
      price: 14.99,
      weight: 0.02, // kg
      sku: 'PURR-20G',
      stripe_price_id: 'price_trial_20g'
    },
    '60g': {
      id: '60g', 
      name: 'Purrify 60g Standard',
      price: 24.99,
      weight: 0.06,
      sku: 'PURR-60G',
      stripe_price_id: 'price_standard_60g'
    },
    '140g': {
      id: '140g',
      name: 'Purrify 140g Family Size', 
      price: 39.99,
      weight: 0.14,
      sku: 'PURR-140G',
      stripe_price_id: 'price_family_140g'
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

async function prepareStripeData(product: { id: string; name: string; price: number }, quantity: number, pricing: { subtotal: number; taxes: number; total: number; shipping: number }) {
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
            images: [`https://purrify.ca/optimized/${product.id}.webp`],
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
    success_url: 'https://purrify.ca/thank-you?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://purrify.ca/checkout?cancelled=true',
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
  console.log('Prefetch event:', event);
  
  return true;
}