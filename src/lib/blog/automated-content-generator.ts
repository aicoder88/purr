import type { BlogPost, GeneratedContent } from '@/types/blog';
import { ContentStore } from './content-store';
import { ImageOptimizer } from './image-optimizer';
import { SEOGenerator } from './seo-generator';

export class AutomatedContentGenerator {
  private contentStore: ContentStore;
  private imageOptimizer: ImageOptimizer;
  private seoGenerator: SEOGenerator;

  constructor() {
    this.contentStore = new ContentStore();
    this.imageOptimizer = new ImageOptimizer();
    this.seoGenerator = new SEOGenerator();
  }

  /**
   * Generate a complete blog post from a topic
   */
  async generateBlogPost(topic: string): Promise<BlogPost> {
    // Generate content using AI
    const content = await this.generateContent(topic);

    // Fetch and optimize images
    const images = await this.fetchRelevantImages(topic, 1);
    const featuredImage = images[0] || {
      url: '/purrify-logo.png',
      alt: topic,
      width: 1200,
      height: 630
    };

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

    return post;
  }

  /**
   * Generate content using OpenAI API
   */
  private async generateContent(topic: string): Promise<GeneratedContent> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const prompt = this.buildPrompt(topic);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert content writer for Purrify, a cat litter deodorizer company. Write SEO-optimized, helpful blog posts about cat care, odor control, and pet wellness. Always write in a friendly, informative tone.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2500
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.choices[0].message.content;

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
   * Fetch relevant images from Unsplash
   */
  private async fetchRelevantImages(topic: string, count: number): Promise<Array<{
    url: string;
    alt: string;
    width: number;
    height: number;
  }>> {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
      console.warn('UNSPLASH_ACCESS_KEY not configured, using placeholder');
      return [];
    }

    try {
      const searchQuery = this.buildImageSearchQuery(topic);
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=${count}&orientation=landscape`,
        {
          headers: {
            'Authorization': `Client-ID ${accessKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return await Promise.all(
          data.results.slice(0, count).map(async (photo: any) => {
            // Download and optimize the image
            const optimized = await this.imageOptimizer.optimizeImageFromUrl(
              photo.urls.regular,
              this.generateSlug(topic)
            );

            return {
              url: optimized.optimized.webp[0] || photo.urls.regular,
              alt: photo.alt_description || topic,
              width: optimized.width,
              height: optimized.height
            };
          })
        );
      }

      return [];
    } catch (error) {
      console.error('Error fetching images from Unsplash:', error);
      return [];
    }
  }

  /**
   * Build image search query from topic
   */
  private buildImageSearchQuery(topic: string): string {
    const keywords = topic.toLowerCase();

    if (keywords.includes('litter') || keywords.includes('cat')) {
      return 'cat litter box clean home';
    }
    if (keywords.includes('odor') || keywords.includes('smell')) {
      return 'fresh clean home interior';
    }
    if (keywords.includes('health') || keywords.includes('wellness')) {
      return 'happy healthy cat';
    }

    return 'cat home lifestyle';
  }

  /**
   * Publish a generated post
   */
  async publishPost(post: BlogPost): Promise<void> {
    await this.contentStore.savePost(post);
    console.log(`✅ Published new blog post: ${post.title}`);
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
   * Create post from provided content (for webhook publish mode)
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
  }): Promise<BlogPost> {
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
          url: '/purrify-logo.png',
          alt: data.title,
          width: 1200,
          height: 630
        };
      }
    } else {
      // Fetch default image from Unsplash
      const images = await this.fetchRelevantImages(data.title, 1);
      featuredImage = images[0] || {
        url: '/purrify-logo.png',
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
      categories: data.categories || ['Tips'],
      tags: data.tags || [],
      locale: 'en',
      translations: {},
      seo,
      readingTime
    };
    
    return post;
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
