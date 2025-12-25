/**
 * Structured Data Generator
 * 
 * Generates Schema.org JSON-LD markup for various content types
 * to enable rich snippets in search results.
 */

export interface ProductData {
  name: string;
  description: string;
  images: string[];
  price: number;
  currency?: string;
  inStock: boolean;
  url: string;
  sku?: string;
  brand?: string;
  rating?: {
    value: number;
    count: number;
  };
  reviews?: Array<{
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
  }>;
}

export interface BlogPostData {
  title: string;
  excerpt: string;
  content?: string;
  featuredImage: string;
  publishDate: string;
  modifiedDate?: string;
  author: string;
  authorImage?: string;
  url: string;
  categories?: string[];
  tags?: string[];
  wordCount?: number;
}

export interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  socialProfiles?: string[];
  foundingDate?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export class StructuredDataGenerator {
  private baseUrl: string;
  private organizationName: string;
  private organizationLogo: string;

  constructor(config?: {
    baseUrl?: string;
    organizationName?: string;
    organizationLogo?: string;
  }) {
    this.baseUrl = config?.baseUrl || 'https://purrify.ca';
    this.organizationName = config?.organizationName || 'Purrify';
    this.organizationLogo = config?.organizationLogo || `${this.baseUrl}/purrify-logo.png`;
  }

  /**
   * Generate Product schema
   */
  generateProduct(product: ProductData): string {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.images,
      brand: {
        '@type': 'Brand',
        name: product.brand || this.organizationName,
      },
      offers: {
        '@type': 'Offer',
        price: product.price.toFixed(2),
        priceCurrency: product.currency || 'CAD',
        availability: product.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        url: product.url,
      },
    };

    // Add SKU if provided
    if (product.sku) {
      schema.sku = product.sku;
    }

    // Add aggregate rating if provided
    if (product.rating) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: product.rating.value,
        reviewCount: product.rating.count,
        bestRating: 5,
        worstRating: 1,
      };
    }

    // Add reviews if provided
    if (product.reviews && product.reviews.length > 0) {
      schema.review = product.reviews.map((review) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody: review.reviewBody,
        datePublished: review.datePublished,
      }));
    }

    return JSON.stringify(schema, null, 2);
  }

  /**
   * Generate BlogPosting schema
   */
  generateBlogPosting(post: BlogPostData): string {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: [post.featuredImage],
      datePublished: post.publishDate,
      dateModified: post.modifiedDate || post.publishDate,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      publisher: {
        '@type': 'Organization',
        name: this.organizationName,
        logo: {
          '@type': 'ImageObject',
          url: this.organizationLogo,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': post.url,
      },
    };

    // Add author image if provided
    if (post.authorImage) {
      schema.author.image = post.authorImage;
    }

    // Add word count if provided
    if (post.wordCount) {
      schema.wordCount = post.wordCount;
    }

    // Add categories as keywords
    if (post.categories && post.categories.length > 0) {
      schema.keywords = post.categories.join(', ');
    }

    // Add article section
    if (post.categories && post.categories.length > 0) {
      schema.articleSection = post.categories[0];
    }

    return JSON.stringify(schema, null, 2);
  }

  /**
   * Generate Article schema (similar to BlogPosting but for general articles)
   */
  generateArticle(post: BlogPostData): string {
    const schema = JSON.parse(this.generateBlogPosting(post));
    schema['@type'] = 'Article';
    return JSON.stringify(schema, null, 2);
  }

  /**
   * Generate Organization schema
   */
  generateOrganization(org: OrganizationData): string {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: org.name,
      url: org.url,
      logo: org.logo,
    };

    // Add description if provided
    if (org.description) {
      schema.description = org.description;
    }

    // Add contact information
    if (org.email || org.phone) {
      schema.contactPoint = {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
      };
      if (org.email) {
        schema.contactPoint.email = org.email;
      }
      if (org.phone) {
        schema.contactPoint.telephone = org.phone;
      }
    }

    // Add address if provided
    if (org.address) {
      schema.address = {
        '@type': 'PostalAddress',
        streetAddress: org.address.streetAddress,
        addressLocality: org.address.addressLocality,
        addressRegion: org.address.addressRegion,
        postalCode: org.address.postalCode,
        addressCountry: org.address.addressCountry,
      };
    }

    // Add social profiles
    if (org.socialProfiles && org.socialProfiles.length > 0) {
      schema.sameAs = org.socialProfiles;
    }

    // Add founding date
    if (org.foundingDate) {
      schema.foundingDate = org.foundingDate;
    }

    return JSON.stringify(schema, null, 2);
  }

  /**
   * Generate BreadcrumbList schema
   */
  generateBreadcrumbs(items: BreadcrumbItem[]): string {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    return JSON.stringify(schema, null, 2);
  }

  /**
   * Generate FAQ schema
   */
  generateFAQ(items: FAQItem[]): string {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    return JSON.stringify(schema, null, 2);
  }

  /**
   * Generate WebSite schema with search action
   */
  generateWebSite(config: {
    name: string;
    url: string;
    searchUrl?: string;
  }): string {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: config.name,
      url: config.url,
    };

    // Add search action if search URL provided
    if (config.searchUrl) {
      schema.potentialAction = {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${config.searchUrl}?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      };
    }

    return JSON.stringify(schema, null, 2);
  }

  /**
   * Generate LocalBusiness schema
   */
  generateLocalBusiness(business: {
    name: string;
    description: string;
    url: string;
    telephone: string;
    email: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    openingHours?: string[];
    priceRange?: string;
    image?: string;
  }): string {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: business.name,
      description: business.description,
      url: business.url,
      telephone: business.telephone,
      email: business.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.address.streetAddress,
        addressLocality: business.address.addressLocality,
        addressRegion: business.address.addressRegion,
        postalCode: business.address.postalCode,
        addressCountry: business.address.addressCountry,
      },
    };

    if (business.image) {
      schema.image = business.image;
    }

    if (business.openingHours) {
      schema.openingHoursSpecification = business.openingHours.map((hours) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: hours.split(' ')[0],
        opens: hours.split(' ')[1],
        closes: hours.split(' ')[2],
      }));
    }

    if (business.priceRange) {
      schema.priceRange = business.priceRange;
    }

    return JSON.stringify(schema, null, 2);
  }

  /**
   * Generate VideoObject schema
   */
  generateVideo(video: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration?: string;
    contentUrl?: string;
    embedUrl?: string;
  }): string {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.name,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      uploadDate: video.uploadDate,
    };

    if (video.duration) {
      schema.duration = video.duration;
    }

    if (video.contentUrl) {
      schema.contentUrl = video.contentUrl;
    }

    if (video.embedUrl) {
      schema.embedUrl = video.embedUrl;
    }

    return JSON.stringify(schema, null, 2);
  }

  /**
   * Generate HowTo schema
   */
  generateHowTo(howTo: {
    name: string;
    description: string;
    image?: string;
    totalTime?: string;
    steps: Array<{
      name: string;
      text: string;
      image?: string;
      url?: string;
    }>;
  }): string {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: howTo.name,
      description: howTo.description,
      step: howTo.steps.map((step, index) => {
        const stepSchema: any = {
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
        };

        if (step.image) {
          stepSchema.image = step.image;
        }

        if (step.url) {
          stepSchema.url = step.url;
        }

        return stepSchema;
      }),
    };

    if (howTo.image) {
      schema.image = howTo.image;
    }

    if (howTo.totalTime) {
      schema.totalTime = howTo.totalTime;
    }

    return JSON.stringify(schema, null, 2);
  }

  /**
   * Validate schema structure (comprehensive validation)
   */
  validateSchema(schemaJson: string): { valid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const schema = JSON.parse(schemaJson);

      // Check required fields
      if (!schema['@context']) {
        errors.push('Missing @context field');
      }

      if (!schema['@type']) {
        errors.push('Missing @type field');
      }

      // Validate @context
      if (schema['@context'] && !schema['@context'].includes('schema.org')) {
        errors.push('Invalid @context - must include schema.org');
      }

      // Type-specific validation
      this.validateProductSchema(schema, errors, warnings);
      this.validateBlogPostingSchema(schema, errors, warnings);
      this.validateOrganizationSchema(schema, errors, warnings);
      this.validateBreadcrumbSchema(schema, errors, warnings);
      this.validateFAQSchema(schema, errors, warnings);

      // Validate data types
      this.validateDataTypes(schema, errors, warnings);
    } catch (error) {
      errors.push(`Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate Product schema
   */
  private validateProductSchema(schema: any, errors: string[], warnings: string[]): void {
    if (schema['@type'] !== 'Product') return;

    // Required fields
    if (!schema.name) errors.push('Product missing required field: name');
    if (!schema.image) {
      errors.push('Product missing required field: image');
    } else if (Array.isArray(schema.image) && schema.image.length === 0) {
      errors.push('Product image array is empty');
    }
    if (!schema.offers) errors.push('Product missing required field: offers');

    // Validate offers
    if (schema.offers) {
      if (!schema.offers.price) errors.push('Product offers missing price');
      if (!schema.offers.priceCurrency) errors.push('Product offers missing priceCurrency');
      if (!schema.offers.availability) warnings.push('Product offers missing availability');
    }

    // Recommended fields
    if (!schema.description) warnings.push('Product missing recommended field: description');
    if (!schema.brand) warnings.push('Product missing recommended field: brand');
    if (!schema.sku) warnings.push('Product missing recommended field: sku');

    // Validate aggregate rating if present
    if (schema.aggregateRating) {
      if (!schema.aggregateRating.ratingValue) {
        errors.push('AggregateRating missing ratingValue');
      }
      if (!schema.aggregateRating.reviewCount) {
        errors.push('AggregateRating missing reviewCount');
      }
      if (schema.aggregateRating.ratingValue > 5 || schema.aggregateRating.ratingValue < 0) {
        errors.push('AggregateRating ratingValue must be between 0 and 5');
      }
    }
  }

  /**
   * Validate BlogPosting/Article schema
   */
  private validateBlogPostingSchema(schema: any, errors: string[], warnings: string[]): void {
    if (schema['@type'] !== 'BlogPosting' && schema['@type'] !== 'Article') return;

    // Required fields
    if (!schema.headline) errors.push('BlogPosting/Article missing required field: headline');
    if (!schema.image) errors.push('BlogPosting/Article missing required field: image');
    if (!schema.datePublished) {
      errors.push('BlogPosting/Article missing required field: datePublished');
    }
    if (!schema.author) errors.push('BlogPosting/Article missing required field: author');

    // Validate author
    if (schema.author && !schema.author.name) {
      errors.push('Author missing name');
    }

    // Validate publisher
    if (!schema.publisher) {
      errors.push('BlogPosting/Article missing required field: publisher');
    } else {
      if (!schema.publisher.name) errors.push('Publisher missing name');
      if (!schema.publisher.logo) {
        errors.push('Publisher missing logo');
      } else if (!schema.publisher.logo.url) {
        errors.push('Publisher logo missing url');
      }
    }

    // Recommended fields
    if (!schema.description) warnings.push('BlogPosting/Article missing recommended field: description');
    if (!schema.mainEntityOfPage) {
      warnings.push('BlogPosting/Article missing recommended field: mainEntityOfPage');
    }
    if (!schema.dateModified) warnings.push('BlogPosting/Article missing recommended field: dateModified');

    // Validate headline length
    if (schema.headline && schema.headline.length > 110) {
      warnings.push('Headline should be 110 characters or less for optimal display');
    }
  }

  /**
   * Validate Organization schema
   */
  private validateOrganizationSchema(schema: any, errors: string[], warnings: string[]): void {
    if (schema['@type'] !== 'Organization') return;

    // Required fields
    if (!schema.name) errors.push('Organization missing required field: name');
    if (!schema.url) errors.push('Organization missing required field: url');

    // Recommended fields
    if (!schema.logo) warnings.push('Organization missing recommended field: logo');
    if (!schema.description) warnings.push('Organization missing recommended field: description');
    if (!schema.contactPoint) warnings.push('Organization missing recommended field: contactPoint');

    // Validate URL format
    if (schema.url && !this.isValidUrl(schema.url)) {
      errors.push('Organization url is not a valid URL');
    }
  }

  /**
   * Validate BreadcrumbList schema
   */
  private validateBreadcrumbSchema(schema: any, errors: string[], _warnings: string[]): void {
    if (schema['@type'] !== 'BreadcrumbList') return;

    // Required fields
    if (!schema.itemListElement) {
      errors.push('BreadcrumbList missing required field: itemListElement');
      return;
    }

    if (!Array.isArray(schema.itemListElement)) {
      errors.push('BreadcrumbList itemListElement must be an array');
      return;
    }

    if (schema.itemListElement.length === 0) {
      errors.push('BreadcrumbList itemListElement is empty');
      return;
    }

    // Validate each item
    schema.itemListElement.forEach((item: any, index: number) => {
      if (!item['@type'] || item['@type'] !== 'ListItem') {
        errors.push(`BreadcrumbList item ${index} missing @type: ListItem`);
      }
      if (!item.position) {
        errors.push(`BreadcrumbList item ${index} missing position`);
      }
      if (!item.name) {
        errors.push(`BreadcrumbList item ${index} missing name`);
      }
      if (!item.item) {
        errors.push(`BreadcrumbList item ${index} missing item (URL)`);
      }
    });
  }

  /**
   * Validate FAQ schema
   */
  private validateFAQSchema(schema: any, errors: string[], warnings: string[]): void {
    if (schema['@type'] !== 'FAQPage') return;

    // Required fields
    if (!schema.mainEntity) {
      errors.push('FAQPage missing required field: mainEntity');
      return;
    }

    if (!Array.isArray(schema.mainEntity)) {
      errors.push('FAQPage mainEntity must be an array');
      return;
    }

    if (schema.mainEntity.length === 0) {
      warnings.push('FAQPage mainEntity is empty');
      return;
    }

    // Validate each question
    schema.mainEntity.forEach((item: any, index: number) => {
      if (!item['@type'] || item['@type'] !== 'Question') {
        errors.push(`FAQ item ${index} missing @type: Question`);
      }
      if (!item.name) {
        errors.push(`FAQ item ${index} missing name (question)`);
      }
      if (!item.acceptedAnswer) {
        errors.push(`FAQ item ${index} missing acceptedAnswer`);
      } else {
        if (!item.acceptedAnswer['@type'] || item.acceptedAnswer['@type'] !== 'Answer') {
          errors.push(`FAQ item ${index} acceptedAnswer missing @type: Answer`);
        }
        if (!item.acceptedAnswer.text) {
          errors.push(`FAQ item ${index} acceptedAnswer missing text`);
        }
      }
    });
  }

  /**
   * Validate data types
   */
  private validateDataTypes(schema: any, errors: string[], _warnings: string[]): void {
    // Validate dates
    if (schema.datePublished && !this.isValidDate(schema.datePublished)) {
      errors.push('datePublished is not a valid ISO 8601 date');
    }
    if (schema.dateModified && !this.isValidDate(schema.dateModified)) {
      errors.push('dateModified is not a valid ISO 8601 date');
    }

    // Validate URLs
    if (schema.url && !this.isValidUrl(schema.url)) {
      errors.push('url is not a valid URL');
    }
    if (schema.image) {
      const images = Array.isArray(schema.image) ? schema.image : [schema.image];
      images.forEach((img: string, index: number) => {
        if (typeof img === 'string' && !this.isValidUrl(img)) {
          errors.push(`image[${index}] is not a valid URL`);
        }
      });
    }

    // Validate numbers
    if (schema.offers && schema.offers.price) {
      if (typeof schema.offers.price === 'string') {
        const price = parseFloat(schema.offers.price);
        if (isNaN(price) || price < 0) {
          errors.push('offers.price must be a positive number');
        }
      }
    }
  }

  /**
   * Check if string is a valid URL
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if string is a valid ISO 8601 date
   */
  private isValidDate(date: string): boolean {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/;
    return isoDateRegex.test(date);
  }
}
