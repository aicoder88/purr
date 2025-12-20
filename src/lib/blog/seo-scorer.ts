import type { BlogPost } from '@/types/blog';

export interface SEOScore {
  overall: number; // 0-100
  breakdown: {
    title: number;
    description: number;
    keywords: number;
    headings: number;
    content: number;
    images: number;
    links: number;
  };
  suggestions: SEOSuggestion[];
  internalLinkSuggestions?: InternalLinkSuggestion[];
  keywordCannibalization?: KeywordCannibalization[];
}

export interface SEOSuggestion {
  category: 'title' | 'description' | 'keywords' | 'headings' | 'content' | 'images' | 'links';
  priority: 'high' | 'medium' | 'low';
  message: string;
  autoFixable: boolean;
  autoFixAction?: string;
}

export interface InternalLinkSuggestion {
  anchor: string;
  suggestedPost: {
    slug: string;
    title: string;
    relevanceScore: number;
  };
  context: string;
}

export interface KeywordCannibalization {
  keyword: string;
  competingPosts: Array<{
    slug: string;
    title: string;
    score: number;
  }>;
}

export class SEOScorer {
  /**
   * Calculate overall SEO score for a blog post
   */
  calculateScore(post: BlogPost): SEOScore {
    const breakdown = {
      title: this.scoreTitleOptimization(post),
      description: this.scoreDescriptionOptimization(post),
      keywords: this.scoreKeywordOptimization(post),
      headings: this.scoreHeadingStructure(post.content),
      content: this.scoreContentQuality(post.content),
      images: this.scoreImageOptimization(post),
      links: this.scoreInternalLinks(post.content)
    };

    // Calculate weighted average
    const weights = {
      title: 0.20,
      description: 0.15,
      keywords: 0.15,
      headings: 0.15,
      content: 0.15,
      images: 0.10,
      links: 0.10
    };

    const overall = Math.round(
      breakdown.title * weights.title +
      breakdown.description * weights.description +
      breakdown.keywords * weights.keywords +
      breakdown.headings * weights.headings +
      breakdown.content * weights.content +
      breakdown.images * weights.images +
      breakdown.links * weights.links
    );

    const suggestions = this.generateSuggestions(breakdown, post);

    return {
      overall,
      breakdown,
      suggestions
    };
  }

  /**
   * Score title optimization (0-100)
   */
  private scoreTitleOptimization(post: BlogPost): number {
    const title = post.seo.title || post.title;
    const length = title.length;
    let score = 0;

    // Length score (50 points)
    if (length >= 50 && length <= 60) {
      score += 50;
    } else if (length >= 40 && length < 50) {
      score += 40;
    } else if (length > 60 && length <= 70) {
      score += 35;
    } else if (length >= 30 && length < 40) {
      score += 30;
    } else {
      score += 10;
    }

    // Keyword presence (30 points)
    const hasKeyword = post.seo.keywords.some(keyword =>
      title.toLowerCase().includes(keyword.toLowerCase())
    );
    if (hasKeyword) score += 30;

    // Uniqueness (20 points) - check for power words
    const powerWords = ['ultimate', 'complete', 'essential', 'proven', 'effective', 'best', 'top'];
    const hasPowerWord = powerWords.some(word =>
      title.toLowerCase().includes(word)
    );
    if (hasPowerWord) score += 20;

    return Math.min(score, 100);
  }

  /**
   * Score description optimization (0-100)
   */
  private scoreDescriptionOptimization(post: BlogPost): number {
    const description = post.seo.description || post.excerpt;
    const cleanDesc = description.replaceAll(/<[^>]*>/g, '');
    const length = cleanDesc.length;
    let score = 0;

    // Length score (50 points)
    if (length >= 150 && length <= 160) {
      score += 50;
    } else if (length >= 140 && length < 150) {
      score += 45;
    } else if (length > 160 && length <= 170) {
      score += 40;
    } else if (length >= 120 && length < 140) {
      score += 35;
    } else {
      score += 10;
    }

    // Keyword presence (30 points)
    const hasKeyword = post.seo.keywords.some(keyword =>
      cleanDesc.toLowerCase().includes(keyword.toLowerCase())
    );
    if (hasKeyword) score += 30;

    // Call to action (20 points)
    const ctaWords = ['learn', 'discover', 'find out', 'read', 'explore'];
    const hasCTA = ctaWords.some(word =>
      cleanDesc.toLowerCase().includes(word)
    );
    if (hasCTA) score += 20;

    return Math.min(score, 100);
  }

  /**
   * Score keyword optimization (0-100)
   */
  private scoreKeywordOptimization(post: BlogPost): number {
    let score = 0;
    const keywords = post.seo.keywords;
    const content = post.content.toLowerCase();

    // Number of keywords (30 points)
    if (keywords.length >= 3 && keywords.length <= 8) {
      score += 30;
    } else if (keywords.length >= 2 && keywords.length < 3) {
      score += 20;
    } else if (keywords.length > 8 && keywords.length <= 10) {
      score += 15;
    }

    // Keyword density (40 points)
    const wordCount = content.split(/\s+/).length;
    let totalKeywordOccurrences = 0;

    keywords.forEach(keyword => {
      const regex = new RegExp(keyword.toLowerCase(), 'g');
      const matches = content.match(regex);
      totalKeywordOccurrences += matches ? matches.length : 0;
    });

    const density = totalKeywordOccurrences / wordCount;
    if (density >= 0.01 && density <= 0.03) {
      score += 40; // Ideal density 1-3%
    } else if (density >= 0.005 && density < 0.01) {
      score += 30;
    } else if (density > 0.03 && density <= 0.05) {
      score += 25;
    } else {
      score += 10;
    }

    // Keywords in first paragraph (30 points)
    const firstParagraph = content.substring(0, 300);
    const keywordInFirst = keywords.some(keyword =>
      firstParagraph.includes(keyword.toLowerCase())
    );
    if (keywordInFirst) score += 30;

    return Math.min(score, 100);
  }

  /**
   * Score heading structure (0-100)
   */
  private scoreHeadingStructure(content: string): number {
    let score = 0;

    // Check for H2 headings
    const h2Count = (content.match(/<h2/gi) || []).length;
    if (h2Count >= 3 && h2Count <= 6) {
      score += 40;
    } else if (h2Count >= 2 && h2Count < 3) {
      score += 30;
    } else if (h2Count > 6) {
      score += 25;
    } else if (h2Count === 1) {
      score += 15;
    }

    // Check for H3 headings
    const h3Count = (content.match(/<h3/gi) || []).length;
    if (h3Count >= 2) {
      score += 30;
    } else if (h3Count === 1) {
      score += 20;
    }

    // Check for proper hierarchy
    const hasH1 = content.includes('<h1');
    if (!hasH1) {
      score += 30; // Good - H1 should be the title, not in content
    }

    return Math.min(score, 100);
  }

  /**
   * Score content quality (0-100)
   */
  private scoreContentQuality(content: string): number {
    let score = 0;
    const text = content.replaceAll(/<[^>]*>/g, ' ');
    const wordCount = text.trim().split(/\s+/).length;

    // Word count (40 points)
    if (wordCount >= 1000 && wordCount <= 2000) {
      score += 40;
    } else if (wordCount >= 800 && wordCount < 1000) {
      score += 35;
    } else if (wordCount > 2000 && wordCount <= 2500) {
      score += 35;
    } else if (wordCount >= 600 && wordCount < 800) {
      score += 25;
    } else {
      score += 10;
    }

    // Paragraph count (30 points)
    const paragraphCount = (content.match(/<p>/gi) || []).length;
    if (paragraphCount >= 5) {
      score += 30;
    } else if (paragraphCount >= 3) {
      score += 20;
    }

    // Lists (15 points)
    const hasLists = content.includes('<ul>') || content.includes('<ol>');
    if (hasLists) score += 15;

    // Bold/emphasis (15 points)
    const hasEmphasis = content.includes('<strong>') || content.includes('<b>');
    if (hasEmphasis) score += 15;

    return Math.min(score, 100);
  }

  /**
   * Score image optimization (0-100)
   */
  private scoreImageOptimization(post: BlogPost): number {
    let score = 0;

    // Featured image (50 points)
    if (post.featuredImage.url) {
      score += 30;
      if (post.featuredImage.alt) {
        score += 20;
      }
    }

    // Images in content (50 points)
    const imageCount = (post.content.match(/<img/gi) || []).length;
    if (imageCount >= 2 && imageCount <= 5) {
      score += 30;
    } else if (imageCount === 1) {
      score += 20;
    } else if (imageCount > 5) {
      score += 15;
    }

    // Alt text on images
    const altCount = (post.content.match(/alt="/gi) || []).length;
    if (altCount === imageCount && imageCount > 0) {
      score += 20;
    } else if (altCount > 0) {
      score += 10;
    }

    return Math.min(score, 100);
  }

  /**
   * Score internal links (0-100)
   */
  private scoreInternalLinks(content: string): number {
    let score = 0;

    // Count internal links (assuming they contain the domain or start with /)
    const linkMatches = content.match(/href="([^"]*)"/gi) || [];
    const internalLinks = linkMatches.filter(link =>
      link.includes('purrify.ca') || link.includes('href="/')
    );

    const internalLinkCount = internalLinks.length;

    if (internalLinkCount >= 3 && internalLinkCount <= 5) {
      score += 60;
    } else if (internalLinkCount >= 2 && internalLinkCount < 3) {
      score += 50;
    } else if (internalLinkCount > 5 && internalLinkCount <= 8) {
      score += 45;
    } else if (internalLinkCount === 1) {
      score += 30;
    }

    // External links (40 points)
    const externalLinks = linkMatches.filter(link =>
      !link.includes('purrify.ca') && !link.includes('href="/')
    );
    if (externalLinks.length >= 1 && externalLinks.length <= 3) {
      score += 40;
    } else if (externalLinks.length > 3) {
      score += 20;
    }

    return Math.min(score, 100);
  }

  /**
   * Generate actionable suggestions based on scores
   */
  private generateSuggestions(breakdown: SEOScore['breakdown'], post: BlogPost): SEOSuggestion[] {
    const suggestions: string[] = [];

    if (breakdown.title < 70) {
      const titleLength = (post.seo.title || post.title).length;
      if (titleLength < 50) {
        suggestions.push('Consider making your title longer (50-60 characters is ideal)');
      } else if (titleLength > 60) {
        suggestions.push('Your title is too long. Try to keep it under 60 characters');
      }
      if (!post.seo.keywords.some(k => post.title.toLowerCase().includes(k.toLowerCase()))) {
        suggestions.push('Include your main keyword in the title');
      }
    }

    if (breakdown.description < 70) {
      const descLength = (post.seo.description || post.excerpt).replaceAll(/<[^>]*>/g, '').length;
      if (descLength < 150) {
        suggestions.push('Make your meta description longer (150-160 characters is ideal)');
      } else if (descLength > 160) {
        suggestions.push('Your meta description is too long. Keep it under 160 characters');
      }
    }

    if (breakdown.keywords < 70) {
      if (post.seo.keywords.length < 3) {
        suggestions.push('Add more keywords (3-8 recommended)');
      }
      suggestions.push('Ensure keywords appear naturally in your first paragraph');
    }

    if (breakdown.headings < 70) {
      const h2Count = (post.content.match(/<h2/gi) || []).length;
      if (h2Count < 3) {
        suggestions.push('Add more H2 headings to structure your content (3-6 recommended)');
      }
    }

    if (breakdown.content < 70) {
      const wordCount = post.content.replaceAll(/<[^>]*>/g, ' ').trim().split(/\s+/).length;
      if (wordCount < 1000) {
        suggestions.push('Consider adding more content (1000-2000 words is ideal for SEO)');
      }
      if (!post.content.includes('<ul>') && !post.content.includes('<ol>')) {
        suggestions.push('Add bullet points or numbered lists to improve readability');
      }
    }

    if (breakdown.images < 70) {
      if (!post.featuredImage.alt) {
        suggestions.push('Add alt text to your featured image');
      }
      const imageCount = (post.content.match(/<img/gi) || []).length;
      if (imageCount < 2) {
        suggestions.push('Add more images to break up text and improve engagement');
      }
    }

    if (breakdown.links < 70) {
      suggestions.push('Add 3-5 internal links to related content on your site');
      suggestions.push('Consider adding 1-2 external links to authoritative sources');
    }

    return suggestions.map(msg => ({
      category: this.categorizeSuggestion(msg),
      priority: this.prioritizeSuggestion(msg),
      message: msg,
      autoFixable: this.isAutoFixable(msg),
      autoFixAction: this.getAutoFixAction(msg)
    }));
  }

  /**
   * Categorize suggestion by type
   */
  private categorizeSuggestion(message: string): SEOSuggestion['category'] {
    if (message.toLowerCase().includes('title')) return 'title';
    if (message.toLowerCase().includes('description')) return 'description';
    if (message.toLowerCase().includes('keyword')) return 'keywords';
    if (message.toLowerCase().includes('heading')) return 'headings';
    if (message.toLowerCase().includes('image') || message.toLowerCase().includes('alt')) return 'images';
    if (message.toLowerCase().includes('link')) return 'links';
    return 'content';
  }

  /**
   * Prioritize suggestion based on impact
   */
  private prioritizeSuggestion(message: string): SEOSuggestion['priority'] {
    const highPriority = ['title', 'keyword', 'meta description'];
    const lowPriority = ['consider', 'try', 'might'];
    
    if (highPriority.some(word => message.toLowerCase().includes(word))) {
      return 'high';
    }
    if (lowPriority.some(word => message.toLowerCase().includes(word))) {
      return 'low';
    }
    return 'medium';
  }

  /**
   * Check if suggestion can be auto-fixed
   */
  private isAutoFixable(message: string): boolean {
    const autoFixablePatterns = [
      'add alt text',
      'add more keywords',
      'add internal links',
      'add meta description'
    ];
    return autoFixablePatterns.some(pattern => 
      message.toLowerCase().includes(pattern)
    );
  }

  /**
   * Get auto-fix action identifier
   */
  private getAutoFixAction(message: string): string | undefined {
    if (message.toLowerCase().includes('alt text')) return 'generate-alt-text';
    if (message.toLowerCase().includes('internal links')) return 'suggest-internal-links';
    if (message.toLowerCase().includes('meta description')) return 'generate-meta-description';
    if (message.toLowerCase().includes('title')) return 'optimize-title';
    return undefined;
  }

  /**
   * Suggest internal links based on content analysis
   */
  async suggestInternalLinks(
    currentPost: BlogPost,
    allPosts: BlogPost[]
  ): Promise<InternalLinkSuggestion[]> {
    const suggestions: InternalLinkSuggestion[] = [];
    const content = currentPost.content.toLowerCase();
    const words = content.split(/\s+/);

    // Find relevant posts based on keyword overlap
    const relevantPosts = allPosts
      .filter(post => post.slug !== currentPost.slug && post.status === 'published')
      .map(post => {
        const postKeywords = post.seo.keywords.map(k => k.toLowerCase());
        const currentKeywords = currentPost.seo.keywords.map(k => k.toLowerCase());
        
        // Calculate relevance score
        const commonKeywords = postKeywords.filter(k => currentKeywords.includes(k));
        const relevanceScore = commonKeywords.length / Math.max(postKeywords.length, 1);
        
        return {
          post,
          relevanceScore,
          commonKeywords
        };
      })
      .filter(item => item.relevanceScore > 0.2)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5);

    // Generate link suggestions
    for (const { post, relevanceScore, commonKeywords } of relevantPosts) {
      // Find good anchor text opportunities
      for (const keyword of commonKeywords) {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        const match = content.match(regex);
        
        if (match && match.index !== undefined) {
          const contextStart = Math.max(0, match.index - 50);
          const contextEnd = Math.min(content.length, match.index + keyword.length + 50);
          const context = content.substring(contextStart, contextEnd);
          
          suggestions.push({
            anchor: keyword,
            suggestedPost: {
              slug: post.slug,
              title: post.title,
              relevanceScore
            },
            context: '...' + context + '...'
          });
          
          break; // One suggestion per post
        }
      }
    }

    return suggestions;
  }

  /**
   * Check for keyword cannibalization
   */
  async checkKeywordCannibalization(
    currentPost: BlogPost,
    allPosts: BlogPost[]
  ): Promise<KeywordCannibalization[]> {
    const cannibalization: KeywordCannibalization[] = [];
    
    for (const keyword of currentPost.seo.keywords) {
      const competingPosts = allPosts
        .filter(post => 
          post.slug !== currentPost.slug &&
          post.status === 'published' &&
          post.seo.keywords.some(k => k.toLowerCase() === keyword.toLowerCase())
        )
        .map(post => {
          // Calculate how strongly this post targets the keyword
          const titleMatch = post.title.toLowerCase().includes(keyword.toLowerCase());
          const contentMatches = (post.content.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
          const score = (titleMatch ? 50 : 0) + Math.min(contentMatches * 5, 50);
          
          return {
            slug: post.slug,
            title: post.title,
            score
          };
        })
        .filter(post => post.score > 30)
        .sort((a, b) => b.score - a.score);

      if (competingPosts.length > 0) {
        cannibalization.push({
          keyword,
          competingPosts
        });
      }
    }

    return cannibalization;
  }

  /**
   * Generate alt text for images using AI
   */
  async generateAltText(imageUrl: string, context: string): Promise<string> {
    // Extract topic from context
    const words = context.split(/\s+/).slice(0, 20).join(' ');
    
    // Simple alt text generation (can be enhanced with AI)
    const filename = imageUrl.split('/').pop()?.replace(/\.[^.]+$/, '') || 'image';
    const cleanFilename = filename.replaceAll(/[-_]/g, ' ');
    
    return `${cleanFilename} - ${words.substring(0, 50)}`;
  }

  /**
   * Auto-generate meta description from content
   */
  generateMetaDescription(content: string, keywords: string[]): string {
    // Remove HTML tags
    const text = content.replaceAll(/<[^>]*>/g, ' ').trim();
    
    // Find first paragraph that contains a keyword
    const paragraphs = text.split(/\n\n+/);
    let bestParagraph = paragraphs[0];
    
    for (const para of paragraphs) {
      if (keywords.some(k => para.toLowerCase().includes(k.toLowerCase()))) {
        bestParagraph = para;
        break;
      }
    }
    
    // Trim to 150-160 characters
    let description = bestParagraph.substring(0, 157).trim();
    
    // End at last complete word
    const lastSpace = description.lastIndexOf(' ');
    if (lastSpace > 140) {
      description = description.substring(0, lastSpace);
    }
    
    return description + '...';
  }

  /**
   * Optimize title for SEO
   */
  optimizeTitle(title: string, keywords: string[]): string {
    let optimized = title;
    
    // Ensure main keyword is present
    const mainKeyword = keywords[0];
    if (mainKeyword && !title.toLowerCase().includes(mainKeyword.toLowerCase())) {
      optimized = `${mainKeyword}: ${title}`;
    }
    
    // Trim to ideal length (50-60 chars)
    if (optimized.length > 60) {
      optimized = optimized.substring(0, 57) + '...';
    }
    
    return optimized;
  }

  /**
   * Validate schema markup
   */
  validateSchema(post: BlogPost): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check required fields for Article schema
    if (!post.title) errors.push('Missing title');
    if (!post.excerpt) errors.push('Missing excerpt/description');
    if (!post.author.name) errors.push('Missing author name');
    if (!post.publishDate) errors.push('Missing publish date');
    if (!post.featuredImage.url) errors.push('Missing featured image');
    
    // Check image requirements
    if (post.featuredImage.url) {
      if (!post.featuredImage.width || !post.featuredImage.height) {
        errors.push('Featured image missing dimensions');
      }
      if (post.featuredImage.width < 1200) {
        errors.push('Featured image should be at least 1200px wide');
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}
