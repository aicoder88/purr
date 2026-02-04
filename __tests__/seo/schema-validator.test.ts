/**
 * Schema Validator Tests
 * Tests for structured data validation against Google Rich Results requirements
 */

import {
  validateProductSchema,
  validateArticleSchema,
  validateFAQSchema,
  validateOrganizationSchema,
  validateSchema,
  validateSchemas,
} from '../../src/lib/seo/schema-validator';

describe('validateProductSchema', () => {
  const validProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Purrify Standard Pack',
    image: 'https://purrify.ca/images/products/standard.jpg',
    description: 'Activated carbon cat litter deodorizer',
    brand: {
      '@type': 'Brand',
      name: 'Purrify',
    },
    offers: {
      '@type': 'Offer',
      price: '24.99',
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock',
    },
  };

  it('should validate correct product schema', () => {
    const result = validateProductSchema(validProduct);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject product missing required @context', () => {
    const invalid = { ...validProduct };
    delete (invalid as any)['@context'];
    const result = validateProductSchema(invalid);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should reject product missing name', () => {
    const invalid = { ...validProduct };
    delete (invalid as any).name;
    const result = validateProductSchema(invalid);
    expect(result.isValid).toBe(false);
    const hasNameError = result.errors.some((e) =>
      e.message.includes('name')
    );
    expect(hasNameError).toBe(true);
  });

  it('should reject product missing image', () => {
    const invalid = { ...validProduct };
    delete (invalid as any).image;
    const result = validateProductSchema(invalid);
    expect(result.isValid).toBe(false);
    const hasImageError = result.errors.some((e) =>
      e.message.includes('image')
    );
    expect(hasImageError).toBe(true);
  });

  it('should reject product missing offers', () => {
    const invalid = { ...validProduct };
    delete (invalid as any).offers;
    const result = validateProductSchema(invalid);
    expect(result.isValid).toBe(false);
    const hasOffersError = result.errors.some((e) =>
      e.message.includes('offers')
    );
    expect(hasOffersError).toBe(true);
  });

  it('should validate product with array of images', () => {
    const withImages = {
      ...validProduct,
      image: [
        'https://purrify.ca/images/products/standard-1.jpg',
        'https://purrify.ca/images/products/standard-2.jpg',
      ],
    };
    const result = validateProductSchema(withImages);
    expect(result.isValid).toBe(true);
  });

  it('should validate product with aggregateRating', () => {
    const withRating = {
      ...validProduct,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127',
      },
    };
    const result = validateProductSchema(withRating);
    expect(result.isValid).toBe(true);
  });

  it('should provide fix suggestions for errors', () => {
    const invalid = { ...validProduct };
    delete (invalid as any).name;
    const result = validateProductSchema(invalid);
    expect(result.errors[0].fix).toBeTruthy();
  });
});

describe('validateArticleSchema', () => {
  const validArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Best Cat Litter Odor Control Solutions',
    image: 'https://purrify.ca/images/odor-control.jpg',
    datePublished: '2026-01-15T10:00:00Z',
    author: {
      '@type': 'Person',
      name: 'Sarah Johnson',
    },
  };

  it('should validate correct article schema', () => {
    const result = validateArticleSchema(validArticle);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject article missing headline', () => {
    const invalid = { ...validArticle };
    delete (invalid as any).headline;
    const result = validateArticleSchema(invalid);
    expect(result.isValid).toBe(false);
  });

  it('should reject article with headline too long', () => {
    const invalid = {
      ...validArticle,
      headline:
        'This is an extremely long headline that exceeds the maximum allowed length of 110 characters for article headlines in schema markup',
    };
    const result = validateArticleSchema(invalid);
    expect(result.isValid).toBe(false);
  });

  it('should validate article with dateModified', () => {
    const withModified = {
      ...validArticle,
      dateModified: '2026-01-20T14:30:00Z',
    };
    const result = validateArticleSchema(withModified);
    expect(result.isValid).toBe(true);
  });

  it('should validate article with Organization author', () => {
    const withOrgAuthor = {
      ...validArticle,
      author: {
        '@type': 'Organization',
        name: 'Purrify',
      },
    };
    const result = validateArticleSchema(withOrgAuthor);
    expect(result.isValid).toBe(true);
  });

  it('should validate NewsArticle type', () => {
    const newsArticle = {
      ...validArticle,
      '@type': 'NewsArticle',
    };
    const result = validateArticleSchema(newsArticle);
    expect(result.isValid).toBe(true);
  });

  it('should reject invalid date format', () => {
    const invalid = {
      ...validArticle,
      datePublished: '2026-01-15', // Should be ISO 8601 with time
    };
    const result = validateArticleSchema(invalid);
    expect(result.isValid).toBe(false);
  });
});

describe('validateFAQSchema', () => {
  const validFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does Purrify last?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Purrify activated carbon lasts 7+ days before needing replacement.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it safe for cats?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Purrify is 100% natural activated carbon, completely safe for pets.',
        },
      },
    ],
  };

  it('should validate correct FAQ schema', () => {
    const result = validateFAQSchema(validFAQ);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject FAQ missing mainEntity', () => {
    const invalid = { ...validFAQ };
    delete (invalid as any).mainEntity;
    const result = validateFAQSchema(invalid);
    expect(result.isValid).toBe(false);
  });

  it('should reject FAQ with empty mainEntity array', () => {
    const invalid = {
      ...validFAQ,
      mainEntity: [],
    };
    const result = validateFAQSchema(invalid);
    expect(result.isValid).toBe(false);
  });

  it('should reject question missing acceptedAnswer', () => {
    const invalid = {
      ...validFAQ,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long does it last?',
        },
      ],
    };
    const result = validateFAQSchema(invalid);
    expect(result.isValid).toBe(false);
  });

  it('should reject answer with empty text', () => {
    const invalid = {
      ...validFAQ,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long does it last?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '',
          },
        },
      ],
    };
    const result = validateFAQSchema(invalid);
    expect(result.isValid).toBe(false);
  });
});

describe('validateOrganizationSchema', () => {
  const validOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Purrify',
    url: 'https://purrify.ca',
    logo: 'https://purrify.ca/images/Logos/logo.png',
  };

  it('should validate correct organization schema', () => {
    const result = validateOrganizationSchema(validOrganization);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject organization missing name', () => {
    const invalid = { ...validOrganization };
    delete (invalid as any).name;
    const result = validateOrganizationSchema(invalid);
    expect(result.isValid).toBe(false);
  });

  it('should reject organization missing url', () => {
    const invalid = { ...validOrganization };
    delete (invalid as any).url;
    const result = validateOrganizationSchema(invalid);
    expect(result.isValid).toBe(false);
  });

  it('should validate organization with ImageObject logo', () => {
    const withImageObject = {
      ...validOrganization,
      logo: {
        '@type': 'ImageObject',
        url: 'https://purrify.ca/images/Logos/logo.png',
        width: '512',
        height: '512',
      },
    };
    const result = validateOrganizationSchema(withImageObject);
    expect(result.isValid).toBe(true);
  });

  it('should validate organization with contactPoint', () => {
    const withContact = {
      ...validOrganization,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+1-555-123-4567',
          contactType: 'customer service',
          email: 'support@purrify.ca',
        },
      ],
    };
    const result = validateOrganizationSchema(withContact);
    expect(result.isValid).toBe(true);
  });

  it('should validate organization with sameAs links', () => {
    const withSocial = {
      ...validOrganization,
      sameAs: [
        'https://twitter.com/purrifyhq',
        'https://facebook.com/purrify',
      ],
    };
    const result = validateOrganizationSchema(withSocial);
    expect(result.isValid).toBe(true);
  });
});

describe('validateSchema (auto-detect)', () => {
  it('should auto-detect and validate Product schema', () => {
    const product = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Test Product',
      image: 'https://example.com/image.jpg',
      description: 'Test description',
      offers: {
        '@type': 'Offer',
        price: '9.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    };
    const result = validateSchema(product);
    expect(result.isValid).toBe(true);
  });

  it('should auto-detect and validate Article schema', () => {
    const article = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Test Article',
      image: 'https://example.com/image.jpg',
      datePublished: '2026-01-15T10:00:00Z',
      author: {
        '@type': 'Person',
        name: 'Test Author',
      },
    };
    const result = validateSchema(article);
    expect(result.isValid).toBe(true);
  });

  it('should reject non-object input', () => {
    const result = validateSchema('not an object');
    expect(result.isValid).toBe(false);
    expect(result.errors[0].message).toContain('must be an object');
  });

  it('should reject schema missing @type', () => {
    const invalid = {
      '@context': 'https://schema.org',
      name: 'Test',
    };
    const result = validateSchema(invalid);
    expect(result.isValid).toBe(false);
    expect(result.errors[0].field).toBe('@type');
  });

  it('should reject unsupported schema type', () => {
    const invalid = {
      '@context': 'https://schema.org',
      '@type': 'UnsupportedType',
    };
    const result = validateSchema(invalid);
    expect(result.isValid).toBe(false);
    expect(result.errors[0].message).toContain('Unsupported schema type');
  });
});

describe('validateSchemas (batch)', () => {
  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Test Product',
    image: 'https://example.com/image.jpg',
    description: 'Test description',
    offers: {
      '@type': 'Offer',
      price: '9.99',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Test Article',
    image: 'https://example.com/image.jpg',
    datePublished: '2026-01-15T10:00:00Z',
    author: {
      '@type': 'Person',
      name: 'Test Author',
    },
  };

  it('should validate multiple valid schemas', () => {
    const result = validateSchemas([product, article]);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should report all errors from multiple schemas', () => {
    const invalidProduct = { ...product };
    delete (invalidProduct as any).name;
    const invalidArticle = { ...article };
    delete (invalidArticle as any).headline;

    const result = validateSchemas([invalidProduct, invalidArticle]);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(2);
  });

  it('should label errors with schema index', () => {
    const invalidProduct = { ...product };
    delete (invalidProduct as any).name;

    const result = validateSchemas([invalidProduct, article]);
    expect(result.isValid).toBe(false);
    expect(result.errors[0].page).toBe('Schema 1');
  });

  it('should handle empty array', () => {
    const result = validateSchemas([]);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
