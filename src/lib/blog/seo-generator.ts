import type { BlogPost, FullSEOMetadata } from '@/types/blog';

export class SEOGenerator {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://purrify.ca';
  }

  /**
   * Generate complete SEO metadata for a blog post
   */
  generateMetadata(post: BlogPost, locale: string): FullSEOMetadata {
    const url = `${this.baseUrl}/${locale === 'en' ? '' : locale + '/'}blog/${post.slug}`;

    return {
      title: this.optimizeTitle(post.seo.title || post.title),
      description: this.optimizeDescription(post.seo.description || post.excerpt),
      canonical: post.seo.canonical || url,
      ogTitle: post.seo.title || post.title,
      ogDescription: post.seo.description || post.excerpt,
      ogImage: post.seo.ogImage || post.featuredImage.url,
      ogType: 'article',
      twitterCard: 'summary_large_image',
      keywords: post.seo.keywords,
      jsonLd: this.generateJSONLD(post),
      hreflang: this.generateHreflangTags(post)
    };
  }

  /**
   * Generate JSON-LD structured data for a blog post
   */
  generateJSONLD(post: BlogPost): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.featuredImage.url,
      datePublished: post.publishDate,
      dateModified: post.modifiedDate,
      author: {
        '@type': 'Person',
        name: post.author.name,
        ...(post.author.avatar && { image: post.author.avatar })
      },
      publisher: {
        '@type': 'Organization',
        name: 'Purrify',
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}/images/Logos/purrify-logo.png`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${this.baseUrl}/blog/${post.slug}`
      },
      keywords: post.seo.keywords.join(', '),
      articleSection: post.categories.join(', '),
      wordCount: this.estimateWordCount(post.content),
      timeRequired: `PT${post.readingTime}M`
    };
  }

  /**
   * Generate hreflang tags for multi-language posts
   */
  generateHreflangTags(post: BlogPost): Array<{ locale: string; url: string }> {
    const tags: Array<{ locale: string; url: string }> = [];

    // Add current post
    const currentUrl = `${this.baseUrl}/${post.locale === 'en' ? '' : post.locale + '/'}blog/${post.slug}`;
    tags.push({ locale: post.locale, url: currentUrl });

    // Add translations
    Object.entries(post.translations).forEach(([locale, slug]) => {
      const url = `${this.baseUrl}/${locale === 'en' ? '' : locale + '/'}blog/${slug}`;
      tags.push({ locale, url });
    });

    // Add x-default (usually English)
    if (post.locale === 'en' || post.translations.en) {
      const defaultSlug = post.locale === 'en' ? post.slug : post.translations.en;
      tags.push({
        locale: 'x-default',
        url: `${this.baseUrl}/blog/${defaultSlug}`
      });
    }

    return tags;
  }

  /**
   * Optimize title to be 50-60 characters
   */
  optimizeTitle(title: string): string {
    if (title.length >= 50 && title.length <= 60) {
      return title;
    }

    if (title.length > 60) {
      // Truncate at word boundary
      const truncated = title.substring(0, 57);
      const lastSpace = truncated.lastIndexOf(' ');
      return lastSpace > 40 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
    }

    // Title is too short, but we'll keep it as is
    // In practice, you might want to add brand name or category
    return title;
  }

  /**
   * Optimize description to be 150-160 characters
   */
  optimizeDescription(description: string): string {
    // Remove HTML tags if present
    const cleanDescription = description.replaceAll(/<[^>]*>/g, '');

    if (cleanDescription.length >= 150 && cleanDescription.length <= 160) {
      return cleanDescription;
    }

    if (cleanDescription.length > 160) {
      // Truncate at word boundary
      const truncated = cleanDescription.substring(0, 157);
      const lastSpace = truncated.lastIndexOf(' ');
      return lastSpace > 140 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
    }

    // Description is too short, return as is
    // In practice, you might want to pad it with additional context
    return cleanDescription;
  }

  /**
   * Estimate word count from HTML content
   */
  private estimateWordCount(content: string): number {
    const text = content.replaceAll(/<[^>]*>/g, ' ');
    const words = text.trim().split(/\s+/);
    return words.filter(word => word.length > 0).length;
  }

  /**
   * Calculate reading time based on content
   */
  calculateReadingTime(content: string): number {
    const wordCount = this.estimateWordCount(content);
    const wordsPerMinute = 200; // Average reading speed
    return Math.ceil(wordCount / wordsPerMinute);
  }

  /**
   * Validate SEO metadata quality
   */
  validateMetadata(post: BlogPost): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check title length
    const titleLength = post.seo.title?.length || post.title.length;
    if (titleLength < 30) {
      warnings.push('Title is too short (< 30 characters)');
    } else if (titleLength < 50) {
      warnings.push('Title could be longer (50-60 characters recommended)');
    } else if (titleLength > 60) {
      errors.push('Title is too long (> 60 characters)');
    }

    // Check description length
    const descLength = post.seo.description?.length || post.excerpt.length;
    if (descLength < 120) {
      warnings.push('Description is too short (< 120 characters)');
    } else if (descLength < 150) {
      warnings.push('Description could be longer (150-160 characters recommended)');
    } else if (descLength > 160) {
      errors.push('Description is too long (> 160 characters)');
    }

    // Check keywords
    if (!post.seo.keywords || post.seo.keywords.length === 0) {
      warnings.push('No keywords specified');
    } else if (post.seo.keywords.length < 3) {
      warnings.push('Consider adding more keywords (3-5 recommended)');
    } else if (post.seo.keywords.length > 10) {
      warnings.push('Too many keywords (5-8 recommended)');
    }

    // Check featured image
    if (!post.featuredImage.url) {
      errors.push('No featured image specified');
    }
    if (!post.featuredImage.alt) {
      warnings.push('Featured image missing alt text');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}
