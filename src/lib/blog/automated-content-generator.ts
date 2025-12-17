import type { BlogPost, GeneratedContent } from '@/types/blog';
import { ContentStore } from './content-store';
import { ImageOptimizer } from './image-optimizer';
import { SEOGenerator } from './seo-generator';
import { ContentValidator, type ValidationResult } from './content-validator';

export interface GenerationResult {
  success: boolean;
  post?: BlogPost;
  validation: ValidationResult;
  attempts: number;
}

export class AutomatedContentGenerator {
  private contentStore: ContentStore;
  private imageOptimizer: ImageOptimizer;
  private seoGenerator: SEOGenerator;
  private validator: ContentValidator;
  private maxRetries: number = 3;

  constructor() {
    this.contentStore = new ContentStore();
    this.imageOptimizer = new ImageOptimizer();
    this.seoGenerator = new SEOGenerator();
    this.validator = new ContentValidator();
  }

  /**
   * Helper method to call Claude API
   */
  private async callClaudeAPI(systemPrompt: string, userPrompt: string, maxTokens: number = 4000): Promise<string> {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Claude API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  /**
   * Generate AI image using fal.ai Flux Pro
   */
  private async generateAIImage(prompt: string): Promise<{ url: string; alt: string; width: number; height: number } | null> {
    const apiKey = process.env.FAL_API_KEY;

    if (!apiKey) {
      console.warn('FAL_API_KEY not configured, skipping AI image generation');
      return null;
    }

    try {
      const response = await fetch('https://fal.run/fal-ai/flux-pro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Key ${apiKey}`
        },
        body: JSON.stringify({
          prompt: `Professional blog featured image: ${prompt}. High quality, clean, modern aesthetic. No text or watermarks.`,
          image_size: 'landscape_16_9',
          num_inference_steps: 28,
          guidance_scale: 3.5,
          num_images: 1,
          enable_safety_checker: true
        })
      });

      if (!response.ok) {
        throw new Error(`fal.ai API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.images && data.images.length > 0) {
        const imageUrl = data.images[0].url;
        
        // Download and optimize the generated image
        const imageResponse = await fetch(imageUrl);
        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Save to file system and optimize
        const fs = await import('fs/promises');
        const path = await import('path');
        const tempPath = path.join(process.cwd(), 'public', 'temp', `ai-${Date.now()}.png`);
        await fs.mkdir(path.dirname(tempPath), { recursive: true });
        await fs.writeFile(tempPath, buffer);
        
        // Optimize using existing image optimizer
        const file = new File([buffer], 'ai-generated.png', { type: 'image/png' });
        const optimized = await this.imageOptimizer.optimizeImage(file, `ai-${Date.now()}`);
        
        // Clean up temp file
        await fs.unlink(tempPath);
        
        return {
          url: optimized.optimized.webp[0] || imageUrl,
          alt: prompt,
          width: optimized.width,
          height: optimized.height
        };
      }

      return null;
    } catch (error) {
      console.error('Error generating AI image:', error);
      return null;
    }
  }

  /**
   * Generate a complete blog post from a topic with validation and retry logic
   */
  async generateBlogPost(topic: string): Promise<GenerationResult> {
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`Generating blog post for "${topic}" (attempt ${attempt}/${this.maxRetries})`);

        // Generate content using AI
        const content = await this.generateContent(topic);

        // Validate generated content for template variables
        if (this.validator.containsTemplateVariables(content.title)) {
          console.warn(`Attempt ${attempt}: Generated title contains template variables, retrying...`);
          continue;
        }

        if (this.validator.containsTemplateVariables(content.excerpt)) {
          console.warn(`Attempt ${attempt}: Generated excerpt contains template variables, retrying...`);
          continue;
        }

        if (this.validator.containsTemplateVariables(content.content)) {
          console.warn(`Attempt ${attempt}: Generated content contains template variables, retrying...`);
          continue;
        }

        // Ensure valid featured image
        const featuredImage = await this.ensureValidFeaturedImage(topic);

        // Create blog post
        const slug = this.generateSlug(content.title);
        const now = new Date().toISOString();

        const post: BlogPost = {
          id: Date.now().toString(),
          slug,
          title: content.title,
          excerpt: content.excerpt,
          content: content.content,
          author: {
            name: 'Purrify Team'
          },
          publishDate: now,
          modifiedDate: now,
          status: 'published',
          featuredImage,
          categories: content.categories,
          tags: content.tags,
          locale: 'en',
          translations: {},
          seo: {
            title: this.seoGenerator.optimizeTitle(content.title),
            description: this.seoGenerator.optimizeDescription(content.excerpt),
            keywords: content.seoKeywords
          },
          readingTime: this.calculateReadingTime(content.content)
        };

        // Validate complete post
        const validation = this.validator.validatePost(post);
        
        if (!validation.valid) {
          console.warn(`Attempt ${attempt}: Post validation failed:`, validation.errors);
          if (attempt < this.maxRetries) {
            continue;
          }
        }

        console.log(`✅ Successfully generated valid post: ${post.title}`);
        
        return {
          success: true,
          post,
          validation,
          attempts: attempt
        };

      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        
        if (attempt === this.maxRetries) {
          return {
            success: false,
            validation: {
              valid: false,
              errors: [{ field: 'system', message: `Generation failed after ${this.maxRetries} attempts: ${error}` }],
              warnings: []
            },
            attempts: attempt
          };
        }
      }
    }

    // Should never reach here, but TypeScript needs it
    return {
      success: false,
      validation: {
        valid: false,
        errors: [{ field: 'system', message: 'Generation failed unexpectedly' }],
        warnings: []
      },
      attempts: this.maxRetries
    };
  }

  /**
   * Ensure valid featured image with fallback
   */
  private async ensureValidFeaturedImage(topic: string): Promise<BlogPost['featuredImage']> {
    try {
      // Try to fetch relevant images
      const images = await this.fetchRelevantImages(topic, 1);
      
      if (images.length > 0 && images[0].url) {
        // Validate the image URL
        const isValid = this.validator.isValidURL(images[0].url);
        if (isValid) {
          return images[0];
        }
      }
    } catch (error) {
      console.warn('Failed to fetch relevant images, using fallback:', error);
    }

    // Fallback to default Purrify logo
    return {
      url: '/optimized/purrify-logo.avif',
      alt: `${topic} - Purrify Blog`,
      width: 1200,
      height: 630
    };
  }

  /**
   * Generate content using Claude API
   */
  private async generateContent(topic: string): Promise<GeneratedContent> {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const prompt = this.buildPrompt(topic);

    try {
      const systemPrompt = 'You are an expert content writer for Purrify, a cat litter deodorizer company. Write SEO-optimized, helpful blog posts about cat care, odor control, and pet wellness. Always write in a friendly, informative tone.';
      const generatedText = await this.callClaudeAPI(systemPrompt, prompt, 4000);

      // Parse JSON response
      const parsed = JSON.parse(generatedText);

      return {
        title: parsed.title,
        excerpt: parsed.excerpt,
        content: parsed.content,
        categories: parsed.categories || ['tips'],
        tags: parsed.tags || ['cat-litter', 'odor-elimination'],
        seoKeywords: parsed.seoKeywords || parsed.tags || []
      };
    } catch (error) {
      console.error('Error generating content:', error);
      // Return fallback content
      return this.getFallbackContent(topic);
    }
  }

  /**
   * Build prompt for AI content generation
   */
  private buildPrompt(topic: string): string {
    return `
Write a comprehensive, SEO-optimized blog post about "${topic}" for Purrify's blog.

Requirements:
- Title: 50-60 characters, engaging and keyword-rich
- Excerpt: 150-160 characters, compelling summary
- Content: 1000-1500 words in HTML format
- Include H2 and H3 headings for structure
- Focus on helping cat owners with practical advice
- Mention Purrify's activated carbon solution naturally (not salesy)
- Include actionable tips readers can use immediately
- Write in a friendly, conversational tone
- Use short paragraphs (2-3 sentences max)
- Include 2-3 relevant categories from: tips, odor-control, cat-health, product-guides
- Include 5-8 relevant tags

Format your response as valid JSON:
{
  "title": "...",
  "excerpt": "...",
  "content": "<h2>...</h2><p>...</p>...",
  "categories": ["tips", "odor-control"],
  "tags": ["cat-litter", "odor-elimination", "activated-carbon"],
  "seoKeywords": ["cat litter odor", "eliminate smell", "activated carbon"]
}

Make the content genuinely helpful and informative, not promotional.
`.trim();
  }

  /**
   * Fetch relevant images (AI-generated with fallback to default)
   */
  private async fetchRelevantImages(topic: string, count: number): Promise<Array<{
    url: string;
    alt: string;
    width: number;
    height: number;
  }>> {
    // Try AI image generation
    const aiImage = await this.generateAIImage(topic);
    if (aiImage) {
      return [aiImage];
    }

    // Fallback to default Purrify logo
    console.warn('AI image generation not available, using default image');
    return [];
  }

  /**
   * Publish a generated post with validation
   */
  async publishPost(post: BlogPost): Promise<GenerationResult> {
    const saveResult = await this.contentStore.savePost(post);
    
    if (saveResult.success) {
      console.log(`✅ Published new blog post: ${post.title}`);
    } else {
      console.error(`❌ Failed to publish post: ${post.title}`, saveResult.validation.errors);
    }

    return {
      success: saveResult.success,
      post: saveResult.post,
      validation: saveResult.validation,
      attempts: 1
    };
  }

  /**
   * Generate URL-friendly slug
   */
  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Calculate reading time
   */
  private calculateReadingTime(content: string): number {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    return Math.ceil(words / 200);
  }

  /**
   * Fallback content if AI generation fails
   */
  private getFallbackContent(topic: string): GeneratedContent {
    return {
      title: topic,
      excerpt: `Learn everything you need to know about ${topic.toLowerCase()} for your cat.`,
      content: `
        <h2>Understanding ${topic}</h2>
        <p>As cat owners, we all want the best for our feline friends. ${topic} is an important aspect of cat care that deserves attention.</p>
        
        <h2>Why This Matters</h2>
        <p>Taking care of your cat's needs helps ensure they live a happy, healthy life. Purrify's activated carbon solution can help with odor control naturally.</p>
        
        <h2>Practical Tips</h2>
        <p>Here are some actionable steps you can take today to improve your cat's environment and your home's freshness.</p>
      `,
      categories: ['tips'],
      tags: ['cat-litter', 'pet-care'],
      seoKeywords: ['cat care', 'pet tips']
    };
  }

  /**
   * Generate content with advanced configuration
   */
  async generateWithConfig(config: {
    topic: string;
    tone: 'professional' | 'casual' | 'friendly' | 'authoritative';
    length: 'short' | 'medium' | 'long';
    targetAudience: 'beginners' | 'intermediate' | 'experts';
    keywords: string[];
    includeImages: boolean;
    imageCount: number;
  }): Promise<GeneratedContent> {
    const wordCount = {
      short: '500-800',
      medium: '1000-1500',
      long: '2000-2500'
    }[config.length];

    const enhancedPrompt = `
Write a comprehensive, SEO-optimized blog post about "${config.topic}" for Purrify's blog.

Configuration:
- Tone: ${config.tone}
- Target Audience: ${config.targetAudience}
- Length: ${wordCount} words
- Keywords to include naturally: ${config.keywords.join(', ')}

Requirements:
- Title: 50-60 characters, engaging and keyword-rich
- Excerpt: 150-160 characters, compelling summary
- Content: ${wordCount} words in HTML format
- Include H2 and H3 headings for structure
- Focus on helping cat owners with practical advice
- Mention Purrify's activated carbon solution naturally (not salesy)
- Include actionable tips readers can use immediately
- Write in a ${config.tone} tone suitable for ${config.targetAudience}
- Use short paragraphs (2-3 sentences max)
- Include 2-3 relevant categories from: tips, odor-control, cat-health, product-guides
- Include 5-8 relevant tags

Format your response as valid JSON:
{
  "title": "...",
  "excerpt": "...",
  "content": "<h2>...</h2><p>...</p>...",
  "categories": ["tips", "odor-control"],
  "tags": ["cat-litter", "odor-elimination", "activated-carbon"],
  "seoKeywords": ["cat litter odor", "eliminate smell", "activated carbon"]
}

Make the content genuinely helpful and informative, not promotional.
`.trim();

    try {
      const systemPrompt = `You are an expert content writer for Purrify, a cat litter deodorizer company. Write SEO-optimized, helpful blog posts about cat care, odor control, and pet wellness. Always write in a ${config.tone} tone suitable for ${config.targetAudience}.`;
      const generatedText = await this.callClaudeAPI(systemPrompt, enhancedPrompt, 4000);

      // Parse JSON response
      const parsed = JSON.parse(generatedText);

      return {
        title: parsed.title,
        excerpt: parsed.excerpt,
        content: parsed.content,
        categories: parsed.categories || ['tips'],
        tags: parsed.tags || ['cat-litter', 'odor-elimination'],
        seoKeywords: parsed.seoKeywords || parsed.tags || []
      };
    } catch (error) {
      console.error('Error generating content with config:', error);
      return this.getFallbackContent(config.topic);
    }
  }

  /**
   * Regenerate a specific section of content
   */
  async regenerateSection(content: string, sectionIndex: number): Promise<string> {
    // Parse HTML to find sections (H2 tags)
    const sections = content.split(/<h2[^>]*>/i);
    
    if (sectionIndex >= sections.length) {
      throw new Error('Invalid section index');
    }

    // Extract the section to regenerate
    const sectionMatch = sections[sectionIndex].match(/^([^<]+)<\/h2>(.*?)(?=<h2|$)/is);
    if (!sectionMatch) {
      throw new Error('Could not parse section');
    }

    const [, sectionTitle, sectionContent] = sectionMatch;

    try {
      const systemPrompt = 'You are an expert content writer for Purrify. Rewrite the given section with fresh content while maintaining the same topic and structure.';
      const userPrompt = `Rewrite this section with new content:\n\nTitle: ${sectionTitle}\nContent: ${sectionContent}\n\nProvide only the new content in HTML format (paragraphs, lists, etc.) without the H2 heading.`;
      const newContent = await this.callClaudeAPI(systemPrompt, userPrompt, 1500);

      // Reconstruct the full content with the new section
      const newSection = `<h2>${sectionTitle}</h2>${newContent}`;
      sections[sectionIndex] = newSection;
      
      return sections.join('');
    } catch (error) {
      console.error('Error regenerating section:', error);
      throw error;
    }
  }

  /**
   * Get multiple variations of content
   */
  async getVariations(topic: string, count: number = 3): Promise<string[]> {
    const variations: string[] = [];

    for (let i = 0; i < count; i++) {
      try {
        const content = await this.generateContent(topic);
        variations.push(content.content);
      } catch (error) {
        console.error(`Error generating variation ${i + 1}:`, error);
      }
    }

    return variations;
  }

  /**
   * Apply a content template
   */
  async applyTemplate(template: {
    name: string;
    structure: Array<{
      type: 'heading' | 'paragraph' | 'list' | 'callout';
      content: string;
      required: boolean;
    }>;
  }, data: { topic: string; keywords: string[] }): Promise<string> {
    let html = '';

    for (const section of template.structure) {
      switch (section.type) {
        case 'heading':
          html += `<h2>${section.content}</h2>\n`;
          break;
        case 'paragraph':
          html += `<p>${section.content}</p>\n`;
          break;
        case 'list':
          html += `<ul>\n${section.content.split('\n').map(item => `  <li>${item}</li>`).join('\n')}\n</ul>\n`;
          break;
        case 'callout':
          html += `<div class="callout">\n<p>${section.content}</p>\n</div>\n`;
          break;
      }
    }

    // Use AI to fill in the template with actual content
    try {
      const systemPrompt = 'You are an expert content writer for Purrify. Fill in the provided template with relevant, helpful content.';
      const userPrompt = `Fill in this template about "${data.topic}" using these keywords: ${data.keywords.join(', ')}\n\nTemplate:\n${html}\n\nProvide the complete HTML with all sections filled in with relevant content.`;
      return await this.callClaudeAPI(systemPrompt, userPrompt, 4000);
    } catch (error) {
      console.error('Error applying template:', error);
      return html; // Return template as fallback
    }
  }

  /**
   * Check for duplicate posts
   */
  async checkDuplicates(title: string, existingPosts: BlogPost[]): Promise<boolean> {
    const titleWords = title.toLowerCase().split(/\s+/);
    
    for (const post of existingPosts) {
      const postWords = post.title.toLowerCase().split(/\s+/);
      const commonWords = titleWords.filter(word => 
        word.length > 3 && postWords.includes(word)
      );
      
      // If more than 50% of significant words match, consider it a duplicate
      if (commonWords.length / titleWords.length > 0.5) {
        console.log(`Duplicate detected: "${title}" similar to "${post.title}"`);
        return true;
      }
    }
    
    return false;
  }

  /**
   * Create post from provided content (for webhook publish mode) with validation
   */
  async createPostFromContent(data: {
    title: string;
    content: string;
    excerpt?: string;
    categories?: string[];
    tags?: string[];
    featuredImageUrl?: string;
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
  }): Promise<GenerationResult> {
    const slug = this.generateSlug(data.title);
    const now = new Date().toISOString();
    
    // Download and optimize featured image if URL provided
    let featuredImage;
    if (data.featuredImageUrl) {
      try {
        const response = await fetch(data.featuredImageUrl);
        const buffer = await response.arrayBuffer();
        const file = new File([buffer], 'featured-image.jpg', { type: 'image/jpeg' });
        
        const optimized = await this.imageOptimizer.optimizeImage(file, slug);
        featuredImage = {
          url: optimized.optimized.webp[0],
          alt: data.title,
          width: optimized.width,
          height: optimized.height
        };
      } catch (error) {
        console.error('Error downloading featured image:', error);
        // Fallback to default
        featuredImage = {
          url: '/optimized/purrify-logo.avif',
          alt: data.title,
          width: 1200,
          height: 630
        };
      }
    } else {
      // Fetch default image from Unsplash
      const images = await this.fetchRelevantImages(data.title, 1);
      featuredImage = images[0] || {
        url: '/optimized/purrify-logo.avif',
        alt: data.title,
        width: 1200,
        height: 630
      };
    }
    
    // Generate excerpt if not provided
    const excerpt = data.excerpt || this.generateExcerpt(data.content);
    
    // Calculate reading time
    const readingTime = this.calculateReadingTime(data.content);
    
    // Generate SEO if not provided
    const seo = {
      title: data.seo?.title || this.seoGenerator.optimizeTitle(data.title),
      description: data.seo?.description || this.seoGenerator.optimizeDescription(excerpt),
      keywords: data.seo?.keywords || data.tags || []
    };
    
    const post: BlogPost = {
      id: Date.now().toString(),
      slug,
      title: data.title,
      excerpt,
      content: data.content,
      author: {
        name: 'Purrify Team'
      },
      publishDate: now,
      modifiedDate: now,
      status: 'published',
      featuredImage,
      categories: data.categories || ['tips'],
      tags: data.tags || [],
      locale: 'en',
      translations: {},
      seo,
      readingTime
    };
    
    // Validate the post
    const validation = this.validator.validatePost(post);
    
    return {
      success: validation.valid,
      post: validation.valid ? post : undefined,
      validation,
      attempts: 1
    };
  }

  /**
   * Generate excerpt from content
   */
  private generateExcerpt(content: string): string {
    // Strip HTML tags
    const text = content.replace(/<[^>]*>/g, '');
    // Get first 160 characters
    const excerpt = text.substring(0, 157).trim();
    return excerpt + '...';
  }
}
