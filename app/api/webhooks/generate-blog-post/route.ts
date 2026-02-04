import { z } from 'zod';
import crypto from 'crypto';
import { AutomatedContentGenerator } from '@/lib/blog/automated-content-generator';
import { ContentStore } from '@/lib/blog/content-store';

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
  signature: string | null,
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
function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return 'unknown';
}

export async function POST(req: Request): Promise<Response> {
  // Apply rate limiting
  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    console.warn(`[RATE LIMIT] Webhook rate limit exceeded for IP: ${clientIp}`);
    return Response.json({
      success: false,
      error: 'Too many requests. Please try again later.'
    }, { status: 429 });
  }
  
  // Check if webhook automation is enabled
  if (process.env.ENABLE_WEBHOOK_AUTOMATION !== 'true') {
    return Response.json({
      success: false,
      error: 'Webhook automation is disabled'
    }, { status: 503 });
  }

  // Get the raw body for signature verification
  const rawBody = await req.text();
  const signature = req.headers.get('x-webhook-signature');
  const webhookSecret = process.env.WEBHOOK_SECRET || '';

  try {
    // Validate payload
    const payload = webhookSchema.parse(JSON.parse(rawBody));
    
    // CRITICAL SECURITY FIX: Verify HMAC signature
    // This prevents unauthorized webhook calls
    const hmacSecret = process.env.WEBHOOK_HMAC_SECRET || webhookSecret;
    
    if (!hmacSecret) {
      console.error('[SECURITY] WEBHOOK_HMAC_SECRET not configured');
      return Response.json({
        success: false,
        error: 'Webhook security not configured'
      }, { status: 500 });
    }

    if (!verifyWebhookSignature(rawBody, signature, hmacSecret)) {
      console.error(`[SECURITY] Invalid webhook signature from IP: ${clientIp}`);
      return Response.json({
        success: false,
        error: 'Invalid signature'
      }, { status: 401 });
    }
    
    // Also verify the legacy secret for backward compatibility during transition
    if (payload.secret !== webhookSecret) {
      console.error('[SECURITY] Invalid webhook secret');
      return Response.json({ 
        success: false,
        error: 'Invalid secret' 
      }, { status: 401 });
    }

    // Validate topic if provided
    if (payload.topic) {
      if (payload.topic.length > 200) {
        return Response.json({
          success: false,
          error: 'Topic exceeds maximum length of 200 characters'
        }, { status: 400 });
      }
      
      // Check for potentially malicious content in topic
      const suspiciousPatterns = /[<>\"'&]|javascript:|data:|onclick|onerror/i;
      if (suspiciousPatterns.test(payload.topic)) {
        console.warn(`[SECURITY] Suspicious topic detected in webhook: ${payload.topic.substring(0, 50)}`);
        return Response.json({
          success: false,
          error: 'Invalid topic format'
        }, { status: 400 });
      }
    }

    // Validate locale if provided
    if (payload.locale) {
      const validLocales = ['en', 'fr', 'zh', 'es'];
      if (!validLocales.includes(payload.locale)) {
        return Response.json({
          success: false,
          error: 'Invalid locale'
        }, { status: 400 });
      }
    }
    
    const generator = new AutomatedContentGenerator();
    const store = new ContentStore();
    
    let post: any;
    
    if (payload.mode === 'generate') {
      // Generate new content with AI
      const topic = payload.topic || 'Cat Litter Odor Control Tips';
      const locale = payload.locale || 'en';
      
      // Check for duplicate posts
      const existingPosts = await store.getAllPosts(locale);
      const isDuplicate = await generator.checkDuplicates(topic, existingPosts);
      
      if (isDuplicate) {
        return Response.json({ 
          success: false,
          error: 'Similar post already exists',
          details: {
            suggestion: 'Try a different topic or check existing posts'
          }
        }, { status: 409 });
      }
      
      // Generate post
      post = await generator.generateBlogPost(topic);
      
    } else if (payload.mode === 'publish') {
      // Publish provided content
      if (!payload.post) {
        return Response.json({ 
          success: false,
          error: 'Post data required for publish mode' 
        }, { status: 400 });
      }
      
      // Create post object from provided data
      post = await generator.createPostFromContent(payload.post);
    }
    
    if (!post) {
      return Response.json({
        success: false,
        error: 'Failed to create post'
      }, { status: 500 });
    }
    
    // Publish the post
    await generator.publishPost(post);
    
    // Return success response
    return Response.json({
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
      return Response.json({ 
        success: false,
        error: 'Invalid payload',
        details: error.issues
      }, { status: 400 });
    }
    
    return Response.json({ 
      success: false,
      error: 'Failed to process webhook',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

// Configure body size limit for this route
export const runtime = 'nodejs';
