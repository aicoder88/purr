import { requireAuth } from '@/lib/auth/session';
import { AutomatedContentGenerator } from '@/lib/blog/automated-content-generator';
import { GenerationHistoryManager } from '@/lib/blog/generation-history';
import { ContentTemplateManager } from '@/lib/blog/content-templates';

interface AIGenerationConfig {
  topic: string;
  tone: 'professional' | 'casual' | 'friendly' | 'authoritative';
  length: 'short' | 'medium' | 'long';
  targetAudience: 'beginners' | 'intermediate' | 'experts';
  keywords: string[];
  templateId?: string;
  includeImages: boolean;
  imageCount: number;
}

// AI generation rate limits - stricter due to API costs (~$3-15 per 1K tokens)
const AI_GENERATION_RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute window
  maxRequests: 3, // 3 generations per minute per user
  message: 'AI generation limit reached. Maximum 3 generations per minute allowed. Please wait before trying again.'
};

// In-memory store for per-user AI generation tracking
interface RateLimitEntry {
  count: number;
  resetTime: number;
  lastRequestTime: number;
}

const userRateLimits = new Map<string, RateLimitEntry>();

// Minimum delay between requests (in ms) - prevents rapid-fire requests
const MIN_REQUEST_DELAY = 2000; // 2 seconds minimum between requests

/**
 * Check per-user rate limit for AI generation
 */
function checkUserRateLimit(userId: string): { allowed: boolean; remaining: number; resetTime: number; retryAfter?: number } {
  const now = Date.now();
  const entry = userRateLimits.get(userId);

  if (!entry || entry.resetTime < now) {
    // Create new entry
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + AI_GENERATION_RATE_LIMIT.windowMs,
      lastRequestTime: now
    };
    userRateLimits.set(userId, newEntry);
    return {
      allowed: true,
      remaining: AI_GENERATION_RATE_LIMIT.maxRequests - 1,
      resetTime: newEntry.resetTime
    };
  }

  // Check minimum delay between requests
  const timeSinceLastRequest = now - entry.lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_DELAY) {
    const retryAfter = Math.ceil((MIN_REQUEST_DELAY - timeSinceLastRequest) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter
    };
  }

  // Increment count
  entry.count++;
  entry.lastRequestTime = now;

  const allowed = entry.count <= AI_GENERATION_RATE_LIMIT.maxRequests;
  const remaining = Math.max(0, AI_GENERATION_RATE_LIMIT.maxRequests - entry.count);

  return {
    allowed,
    remaining,
    resetTime: entry.resetTime
  };
}

/**
 * Delay function for adding artificial delay between requests
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [userId, entry] of userRateLimits.entries()) {
    // Clean up entries that have expired AND haven't been used recently
    if (entry.resetTime < now && (now - entry.lastRequestTime > 60 * 60 * 1000)) {
      userRateLimits.delete(userId);
    }
  }
}, 10 * 60 * 1000);

export async function POST(request: Request) {
  const { authorized, session } = await requireAuth();

  if (!authorized || !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get user identifier for rate limiting
  const userId = (session.user as { email?: string; id?: string })?.email || 
                 (session.user as { id?: string })?.id || 
                 'unknown';

  // Apply per-user rate limiting for AI generation
  const userRateLimit = checkUserRateLimit(userId);
  
  const headers = new Headers();
  headers.set('X-RateLimit-Limit', AI_GENERATION_RATE_LIMIT.maxRequests.toString());
  headers.set('X-RateLimit-Remaining', userRateLimit.remaining.toString());
  headers.set('X-RateLimit-Reset', new Date(userRateLimit.resetTime).toISOString());

  if (!userRateLimit.allowed) {
    console.warn(`[RATE LIMIT] User ${userId} exceeded AI generation limit`);
    return Response.json({
      error: AI_GENERATION_RATE_LIMIT.message,
      retryAfter: userRateLimit.retryAfter || Math.ceil((userRateLimit.resetTime - Date.now()) / 1000)
    }, { status: 429, headers });
  }

  // Add artificial delay to prevent rapid-fire requests
  await delay(1000); // 1 second delay before processing

  const config: AIGenerationConfig = await request.json();

  // Enhanced validation
  if (!config.topic || !config.topic.trim()) {
    return Response.json({ error: 'Topic is required' }, { status: 400, headers });
  }

  if (config.topic.length > 200) {
    return Response.json({ error: 'Topic exceeds maximum length of 200 characters' }, { status: 400, headers });
  }

  // Validate keywords
  if (config.keywords && Array.isArray(config.keywords)) {
    if (config.keywords.length > 20) {
      return Response.json({ error: 'Maximum 20 keywords allowed' }, { status: 400, headers });
    }
    for (const keyword of config.keywords) {
      if (typeof keyword !== 'string' || keyword.length > 50) {
        return Response.json({ error: 'Invalid keyword format' }, { status: 400, headers });
      }
    }
  }

  // Validate templateId if provided
  if (config.templateId) {
    const validTemplateIdPattern = /^[a-zA-Z0-9_-]+$/;
    if (!validTemplateIdPattern.test(config.templateId) || config.templateId.length > 100) {
      return Response.json({ error: 'Invalid template ID format' }, { status: 400, headers });
    }
  }

  try {
    const generator = new AutomatedContentGenerator();
    const historyManager = new GenerationHistoryManager();
    
    let result;

    // Check if using a template
    if (config.templateId) {
      const templateManager = new ContentTemplateManager();
      const template = templateManager.getTemplate(config.templateId);
      
      if (template) {
        const content = await generator.applyTemplate(template, {
          topic: config.topic,
          keywords: config.keywords
        });
        
        result = {
          title: config.topic,
          excerpt: `Learn everything you need to know about ${config.topic.toLowerCase()}.`,
          content,
          categories: ['tips'],
          tags: config.keywords,
          seoKeywords: config.keywords
        };
      } else {
        throw new Error('Template not found');
      }
    } else {
      // Use enhanced generation with config
      result = await generator.generateWithConfig(config);
    }

    // Save to history
    await historyManager.saveGeneration({
      config: {
        topic: config.topic,
        tone: config.tone,
        length: config.length,
        targetAudience: config.targetAudience,
        keywords: config.keywords
      },
      result: {
        title: result.title,
        excerpt: result.excerpt,
        content: result.content,
        categories: result.categories,
        tags: result.tags
      },
      approved: false
    });

    // Return the generated content
    return Response.json({
      title: result.title,
      excerpt: result.excerpt,
      content: result.content,
      categories: result.categories,
      tags: result.tags,
      seoKeywords: result.seoKeywords,
      rateLimit: {
        remaining: userRateLimit.remaining,
        resetTime: userRateLimit.resetTime
      }
    }, { headers });
  } catch (error) {
    console.error('Content generation error:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Failed to generate content'
    }, { status: 500, headers });
  }
}
