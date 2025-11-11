import type { NextApiRequest, NextApiResponse } from 'next';
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const config: AIGenerationConfig = req.body;

  if (!config.topic || !config.topic.trim()) {
    return res.status(400).json({ error: 'Topic is required' });
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
      seoKeywords: result.seoKeywords
    });
  } catch (error: any) {
    console.error('Content generation error:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to generate content' 
    });
  }
}

