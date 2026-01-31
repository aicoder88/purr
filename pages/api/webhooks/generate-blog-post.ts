import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import crypto from 'crypto';
import { AutomatedContentGenerator } from '../../../src/lib/blog/automated-content-generator';
import { ContentStore } from '../../../src/lib/blog/content-store';

// Validation schema for webhook payload
const webhookSchema = z.object({
  secret: z.string(),
  mode: z.enum(['generate', 'publish']),
  topic: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  targetWordCount: z.number().optional(),
  locale: z.string().optional(),
  post: z.object({
    title: z.string(),
    content: z.string(),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    featuredImageUrl: z.string().optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional()
    }).optional()
  }).optional()
});

export type WebhookPayload = z.infer<typeof webhookSchema>;

export interface WebhookResponse {
  success: boolean;
  post?: {
    id: string;
    slug: string;
    title: string;
    url: string;
    publishDate: string;
  };
  error?: string;
  details?: any;
}

// Rate limiting for webhooks (5 requests per minute per IP)
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetTime < now) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  entry.count++;
  return entry.count <= MAX_REQUESTS;
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(ip);
    }
  }
}, 5 * 60 * 1000);

/**
 * Verify HMAC signature of the webhook payload
 * This ensures the webhook came from an authorized source
 */
function verifyWebhookSignature(
  payload: string,
  signature: string | undefined,
  secret: string
): boolean {
  if (!signature) {
    console.error('[SECURITY] Webhook signature missing');
    return false;
  }

  // Support both 'sha256=' prefix and raw signature
  const sig = signature.startsWith('sha256=') ? signature.slice(7) : signature;

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(sig, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('[SECURITY] Webhook signature verification error:', error);
    return false;
  }
}

/**
 * Get client IP address
 */
function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded)) {
    return forwarded[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WebhookResponse>
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  }

  // Apply rate limiting
  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    console.warn(`[RATE LIMIT] Webhook rate limit exceeded for IP: ${clientIp}`);
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please try again later.'
    });
  }
  
  // Check if webhook automation is enabled
  if (process.env.ENABLE_WEBHOOK_AUTOMATION !== 'true') {
    return res.status(503).json({
      success: false,
      error: 'Webhook automation is disabled'
    });
  }

  // Get the raw body for signature verification
  const rawBody = JSON.stringify(req.body);
  const signature = req.headers['x-webhook-signature'] as string | undefined;
  const webhookSecret = process.env.WEBHOOK_SECRET || '';

  try {
    // Validate payload
    const payload = webhookSchema.parse(req.body);
    
    // CRITICAL SECURITY FIX: Verify HMAC signature
    // This prevents unauthorized webhook calls
    const hmacSecret = process.env.WEBHOOK_HMAC_SECRET || webhookSecret;
    
    if (!hmacSecret) {
      console.error('[SECURITY] WEBHOOK_HMAC_SECRET not configured');
      return res.status(500).json({
        success: false,
        error: 'Webhook security not configured'
      });
    }

    if (!verifyWebhookSignature(rawBody, signature, hmacSecret)) {
      console.error(`[SECURITY] Invalid webhook signature from IP: ${clientIp}`);
      return res.status(401).json({
        success: false,
        error: 'Invalid signature'
      });
    }
    
    // Also verify the legacy secret for backward compatibility during transition
    if (payload.secret !== webhookSecret) {
      console.error('[SECURITY] Invalid webhook secret');
      return res.status(401).json({ 
        success: false,
        error: 'Invalid secret' 
      });
    }

    // Validate topic if provided
    if (payload.topic) {
      if (payload.topic.length > 200) {
        return res.status(400).json({
          success: false,
          error: 'Topic exceeds maximum length of 200 characters'
        });
      }
      
      // Check for potentially malicious content in topic
      const suspiciousPatterns = /[<>\"'&]|javascript:|data:|onclick|onerror/i;
      if (suspiciousPatterns.test(payload.topic)) {
        console.warn(`[SECURITY] Suspicious topic detected in webhook: ${payload.topic.substring(0, 50)}`);
        return res.status(400).json({
          success: false,
          error: 'Invalid topic format'
        });
      }
    }

    // Validate locale if provided
    if (payload.locale) {
      const validLocales = ['en', 'fr', 'zh', 'es'];
      if (!validLocales.includes(payload.locale)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid locale'
        });
      }
    }
    
    const generator = new AutomatedContentGenerator();
    const store = new ContentStore();
    
    let post: any;
    
    if (payload.mode === 'generate') {
      // Generate new content with AI
      const topic = payload.topic || 'Cat Litter Odor Control Tips';
      const locale = payload.locale || 'en';
      
      console.log(`Generating blog post for topic: ${topic}`);
      
      // Check for duplicate posts
      const existingPosts = await store.getAllPosts(locale);
      const isDuplicate = await generator.checkDuplicates(topic, existingPosts);
      
      if (isDuplicate) {
        return res.status(409).json({ 
          success: false,
          error: 'Similar post already exists',
          details: {
            suggestion: 'Try a different topic or check existing posts'
          }
        });
      }
      
      // Generate post
      post = await generator.generateBlogPost(topic);
      
    } else if (payload.mode === 'publish') {
      // Publish provided content
      if (!payload.post) {
        return res.status(400).json({ 
          success: false,
          error: 'Post data required for publish mode' 
        });
      }
      
      console.log(`Publishing blog post: ${payload.post.title}`);
      
      // Create post object from provided data
      post = await generator.createPostFromContent(payload.post);
    }
    
    if (!post) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create post'
      });
    }
    
    // Publish the post
    await generator.publishPost(post);
    
    console.log(`Successfully published post: ${post.slug}`);
    
    // Return success response
    return res.status(200).json({
      success: true,
      post: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        url: `https://purrify.ca/blog/${post.slug}`,
        publishDate: post.publishDate
      }
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid payload',
        details: error.issues
      });
    }
    
    return res.status(500).json({ 
      success: false,
      error: 'Failed to process webhook',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}

// Configure API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};
