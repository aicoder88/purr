import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
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
  
  // Check if webhook automation is enabled
  if (process.env.ENABLE_WEBHOOK_AUTOMATION !== 'true') {
    return res.status(503).json({
      success: false,
      error: 'Webhook automation is disabled'
    });
  }
  
  try {
    // Validate payload
    const payload = webhookSchema.parse(req.body);
    
    // Verify webhook secret
    if (payload.secret !== process.env.WEBHOOK_SECRET) {
      console.error('Invalid webhook secret');
      return res.status(401).json({ 
        success: false,
        error: 'Invalid secret' 
      });
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
