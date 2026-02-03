import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth/session';
import { AutomatedContentGenerator } from '@/lib/blog/automated-content-generator';
import { GenerationHistoryManager } from '@/lib/blog/generation-history';
import { ContentTemplateManager } from '@/lib/blog/content-templates';
import { checkRateLimit } from '@/lib/security/rate-limit';

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
// CRITICAL SECURITY FIX: Stricter limits to prevent API abuse
const AI_GENERATION_RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute window
  maxRequests: 3, // 3 generations per minute per user
  message: 'AI generation limit reached. Maximum 3 generations per minute allowed. Please wait before trying again.'
};

// In-memory store for per-user AI generation tracking
// In production, this should be replaced with Redis
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
 * This is in addition to the IP-based rate limiting
 * CRITICAL SECURITY FIX: Added minimum delay between requests
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

  // CRITICAL SECURITY FIX: Check minimum delay between requests
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
 * CRITICAL SECURITY FIX: Prevents rapid-fire API calls
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorized, session } = await requireAuth(req, res);

  if (!authorized || !session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get user identifier for rate limiting
  const userId = (session.user as { email?: string; id?: string })?.email || 
                 (session.user as { id?: string })?.id || 
                 'unknown';

  // CRITICAL SECURITY FIX: Apply per-user rate limiting for AI generation
  const userRateLimit = checkUserRateLimit(userId);
  
  // Set rate limit headers
  res.setHeader('X-RateLimit-Limit', AI_GENERATION_RATE_LIMIT.maxRequests.toString());
  res.setHeader('X-RateLimit-Remaining', userRateLimit.remaining.toString());
  res.setHeader('X-RateLimit-Reset', new Date(userRateLimit.resetTime).toISOString());

  if (!userRateLimit.allowed) {
    console.warn(`[RATE LIMIT] User ${userId} exceeded AI generation limit`);
    return res.status(429).json({
      error: AI_GENERATION_RATE_LIMIT.message,
      retryAfter: userRateLimit.retryAfter || Math.ceil((userRateLimit.resetTime - Date.now()) / 1000)
    });
  }

  // CRITICAL SECURITY FIX: Add artificial delay to prevent rapid-fire requests
  // This helps prevent API abuse and reduces costs
  await delay(1000); // 1 second delay before processing

  const config: AIGenerationConfig = req.body;

  // Enhanced validation
  if (!config.topic || !config.topic.trim()) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  if (config.topic.length > 200) {
    return res.status(400).json({ error: 'Topic exceeds maximum length of 200 characters' });
  }

  // Validate keywords
  if (config.keywords && Array.isArray(config.keywords)) {
    if (config.keywords.length > 20) {
      return res.status(400).json({ error: 'Maximum 20 keywords allowed' });
    }
    for (const keyword of config.keywords) {
      if (typeof keyword !== 'string' || keyword.length > 50) {
        return res.status(400).json({ error: 'Invalid keyword format' });
      }
    }
  }

  // Validate templateId if provided
  if (config.templateId) {
    const validTemplateIdPattern = /^[a-zA-Z0-9_-]+$/;
    if (!validTemplateIdPattern.test(config.templateId) || config.templateId.length > 100) {
      return res.status(400).json({ error: 'Invalid template ID format' });
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
    return res.status(200).json({
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
    });
  } catch (error) {
    console.error('Content generation error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to generate content'
    });
  }
}
