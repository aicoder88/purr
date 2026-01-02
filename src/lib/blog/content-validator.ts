import type { BlogPost } from '@/types/blog';

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  value?: string | number;
}

export interface ValidationWarning {
  field: string;
  message: string;
}

// Template variable patterns to detect
const TEMPLATE_VAR_PATTERNS = [
  /\{meta\.\w+\}/g,
  /\{\w+\.\w+\}/g,
  /\$\{\w+\}/g,
];

// Validation rules
const VALIDATION_RULES = {
  title: {
    minLength: 10,
    maxLength: 100,
  },
  excerpt: {
    minLength: 50,
    maxLength: 200,
  },
  content: {
    minTextLength: 500, // After stripping HTML
  },
};

export class ContentValidator {
  /**
   * Validate complete blog post
   */
  validatePost(post: BlogPost): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Validate title
    const titleResult = this.validateTitle(post.title);
    errors.push(...titleResult.errors);
    warnings.push(...titleResult.warnings);

    // Validate excerpt
    const excerptResult = this.validateExcerpt(post.excerpt);
    errors.push(...excerptResult.errors);
    warnings.push(...excerptResult.warnings);

    // Validate content
    const contentResult = this.validateContent(post.content);
    errors.push(...contentResult.errors);
    warnings.push(...contentResult.warnings);

    // Validate featured image
    const imageResult = this.validateFeaturedImageSync(post.featuredImage);
    errors.push(...imageResult.errors);
    warnings.push(...imageResult.warnings);

    // Validate required fields
    if (!post.slug || post.slug.trim() === '') {
      errors.push({ field: 'slug', message: 'Slug is required' });
    }

    if (!post.author?.name || post.author.name.trim() === '') {
      errors.push({ field: 'author.name', message: 'Author name is required' });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate title
   */
  validateTitle(title: string): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    if (!title || title.trim() === '') {
      errors.push({ field: 'title', message: 'Title is required', value: title });
      return { valid: false, errors, warnings };
    }

    // Check for template variables
    if (this.containsTemplateVariables(title)) {
      errors.push({
        field: 'title',
        message: 'Title contains template variables',
        value: title,
      });
    }

    // Check for HTML
    if (this.containsHTML(title)) {
      errors.push({
        field: 'title',
        message: 'Title should not contain HTML tags',
        value: title,
      });
    }

    // Check length
    const trimmedTitle = title.trim();
    if (trimmedTitle.length < VALIDATION_RULES.title.minLength) {
      errors.push({
        field: 'title',
        message: `Title must be at least ${VALIDATION_RULES.title.minLength} characters`,
        value: trimmedTitle.length,
      });
    }

    if (trimmedTitle.length > VALIDATION_RULES.title.maxLength) {
      errors.push({
        field: 'title',
        message: `Title must not exceed ${VALIDATION_RULES.title.maxLength} characters`,
        value: trimmedTitle.length,
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate excerpt
   */
  validateExcerpt(excerpt: string): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    if (!excerpt || excerpt.trim() === '') {
      errors.push({ field: 'excerpt', message: 'Excerpt is required', value: excerpt });
      return { valid: false, errors, warnings };
    }

    // Check for template variables
    if (this.containsTemplateVariables(excerpt)) {
      errors.push({
        field: 'excerpt',
        message: 'Excerpt contains template variables',
        value: excerpt,
      });
    }

    // Check for HTML
    if (this.containsHTML(excerpt)) {
      errors.push({
        field: 'excerpt',
        message: 'Excerpt should not contain HTML tags',
        value: excerpt,
      });
    }

    // Check length
    const trimmedExcerpt = excerpt.trim();
    if (trimmedExcerpt.length < VALIDATION_RULES.excerpt.minLength) {
      errors.push({
        field: 'excerpt',
        message: `Excerpt must be at least ${VALIDATION_RULES.excerpt.minLength} characters`,
        value: trimmedExcerpt.length,
      });
    }

    if (trimmedExcerpt.length > VALIDATION_RULES.excerpt.maxLength) {
      warnings.push({
        field: 'excerpt',
        message: `Excerpt exceeds recommended ${VALIDATION_RULES.excerpt.maxLength} characters`,
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate content
   */
  validateContent(content: string): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    if (!content || content.trim() === '') {
      errors.push({ field: 'content', message: 'Content is required', value: content });
      return { valid: false, errors, warnings };
    }

    // Check for template variables
    if (this.containsTemplateVariables(content)) {
      errors.push({
        field: 'content',
        message: 'Content contains template variables',
        value: content.substring(0, 100) + '...',
      });
    }

    // Check minimum text length (after stripping HTML)
    const textContent = this.stripHTML(content);
    if (textContent.length < VALIDATION_RULES.content.minTextLength) {
      errors.push({
        field: 'content',
        message: `Content must contain at least ${VALIDATION_RULES.content.minTextLength} characters of text`,
        value: textContent.length,
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate featured image (synchronous version)
   */
  validateFeaturedImageSync(image: BlogPost['featuredImage']): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    if (!image) {
      errors.push({ field: 'featuredImage', message: 'Featured image is required' });
      return { valid: false, errors, warnings };
    }

    // Check required fields
    if (!image.url || image.url.trim() === '') {
      errors.push({ field: 'featuredImage.url', message: 'Image URL is required' });
    }

    if (!image.alt || image.alt.trim() === '') {
      warnings.push({ field: 'featuredImage.alt', message: 'Image alt text is recommended for SEO' });
    }

    // Check for template variables in alt text
    if (image.alt && this.containsTemplateVariables(image.alt)) {
      errors.push({
        field: 'featuredImage.alt',
        message: 'Image alt text contains template variables',
        value: image.alt,
      });
    }

    // Check dimensions
    if (!image.width || image.width <= 0) {
      warnings.push({ field: 'featuredImage.width', message: 'Image width should be specified' });
    }

    if (!image.height || image.height <= 0) {
      warnings.push({ field: 'featuredImage.height', message: 'Image height should be specified' });
    }

    // Basic URL format check
    if (image.url && !this.isValidURL(image.url)) {
      errors.push({
        field: 'featuredImage.url',
        message: 'Image URL format is invalid',
        value: image.url,
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate featured image URL accessibility (async)
   */
  async validateFeaturedImage(image: BlogPost['featuredImage']): Promise<ValidationResult> {
    const syncResult = this.validateFeaturedImageSync(image);

    if (!syncResult.valid || !image.url) {
      return syncResult;
    }

    // Skip URL accessibility check for local paths
    if (image.url.startsWith('/')) {
      return syncResult;
    }

    // Check URL accessibility
    try {
      const isAccessible = await this.validateImageURL(image.url);
      if (!isAccessible) {
        syncResult.errors.push({
          field: 'featuredImage.url',
          message: 'Image URL is not accessible',
          value: image.url,
        });
        syncResult.valid = false;
      }
    } catch {
      syncResult.warnings.push({
        field: 'featuredImage.url',
        message: 'Could not verify image URL accessibility',
      });
    }

    return syncResult;
  }

  /**
   * Check if text contains template variables
   */
  containsTemplateVariables(text: string): boolean {
    if (!text) return false;

    return TEMPLATE_VAR_PATTERNS.some(pattern => {
      pattern.lastIndex = 0; // Reset regex state
      return pattern.test(text);
    });
  }

  /**
   * Check if text contains HTML tags
   */
  containsHTML(text: string): boolean {
    if (!text) return false;
    return /<[^>]+>/g.test(text);
  }

  /**
   * Strip HTML tags from text
   */
  stripHTML(html: string): string {
    if (!html) return '';
    return html.replaceAll(/<[^>]*>/g, '').trim();
  }

  /**
   * Validate URL format
   */
  isValidURL(url: string): boolean {
    if (!url) return false;

    // Allow relative URLs
    if (url.startsWith('/')) return true;

    // Check absolute URLs
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate image URL accessibility
   */
  async validateImageURL(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Check for duplicate posts based on title similarity
   */
  checkDuplicate(title: string, existingTitles: string[]): boolean {
    const titleWords = title.toLowerCase().split(/\s+/).filter(word => word.length > 3);

    for (const existingTitle of existingTitles) {
      const existingWords = existingTitle.toLowerCase().split(/\s+/).filter(word => word.length > 3);
      const commonWords = titleWords.filter(word => existingWords.includes(word));

      // If more than 50% of significant words match, consider it a duplicate
      if (titleWords.length > 0 && commonWords.length / titleWords.length > 0.5) {
        return true;
      }
    }

    return false;
  }

  /**
   * Validate content quality
   */
  validateQuality(post: BlogPost): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Word count check
    const textContent = this.stripHTML(post.content);
    const wordCount = textContent.split(/\s+/).length;

    if (wordCount < 300) {
      warnings.push({
        field: 'content',
        message: `Content is short (${wordCount} words). Consider adding more detail.`,
      });
    }

    // Check for proper HTML structure
    const hasHeadings = /<h[2-6][^>]*>/i.test(post.content);
    if (!hasHeadings) {
      warnings.push({
        field: 'content',
        message: 'Content should include headings (H2-H6) for better structure',
      });
    }

    // SEO metadata checks
    if (post.seo.title.length < 50 || post.seo.title.length > 60) {
      warnings.push({
        field: 'seo.title',
        message: 'SEO title should be 50-60 characters for optimal display',
      });
    }

    if (post.seo.description.length < 150 || post.seo.description.length > 160) {
      warnings.push({
        field: 'seo.description',
        message: 'SEO description should be 150-160 characters for optimal display',
      });
    }

    if (!post.seo.keywords || post.seo.keywords.length === 0) {
      warnings.push({
        field: 'seo.keywords',
        message: 'SEO keywords are recommended for better discoverability',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }
}
