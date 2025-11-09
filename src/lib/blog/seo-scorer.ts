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
  suggestions: string[];
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
    const cleanDesc = description.replace(/<[^>]*>/g, '');
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
    const text = content.replace(/<[^>]*>/g, ' ');
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
  private generateSuggestions(breakdown: SEOScore['breakdown'], post: BlogPost): string[] {
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
      const descLength = (post.seo.description || post.excerpt).replace(/<[^>]*>/g, '').length;
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
      const wordCount = post.content.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length;
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

    return suggestions;
  }
}
