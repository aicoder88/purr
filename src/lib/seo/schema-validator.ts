/**
 * Schema Validation Utilities
 * Validates structured data against Google Rich Results requirements
 */

import Ajv, { ValidateFunction, ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';
import { ValidationResult, ValidationError, ValidationWarning } from './types';

// Initialize ajv with strict mode for schema.org compliance
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false, // Schema.org schemas may have additional properties
  validateFormats: true,
});

// Add format validators (date, time, url, email, etc.)
addFormats(ajv);

/**
 * Schema.org Product schema
 * Based on: https://schema.org/Product
 * Google Requirements: https://developers.google.com/search/docs/appearance/structured-data/product
 */
const productSchema = {
  type: 'object',
  properties: {
    '@context': { type: 'string', pattern: '^https://schema\\.org/?$' },
    '@type': { const: 'Product' },
    name: { type: 'string', minLength: 1 },
    image: {
      oneOf: [
        { type: 'string', format: 'uri' },
        {
          type: 'array',
          items: { type: 'string', format: 'uri' },
          minItems: 1,
        },
      ],
    },
    description: { type: 'string', minLength: 1 },
    brand: {
      type: 'object',
      properties: {
        '@type': { const: 'Brand' },
        name: { type: 'string', minLength: 1 },
      },
      required: ['@type', 'name'],
    },
    offers: {
      oneOf: [
        { $ref: '#/definitions/Offer' },
        {
          type: 'array',
          items: { $ref: '#/definitions/Offer' },
          minItems: 1,
        },
      ],
    },
    aggregateRating: {
      type: 'object',
      properties: {
        '@type': { const: 'AggregateRating' },
        ratingValue: { type: ['number', 'string'] },
        reviewCount: { type: ['number', 'string'] },
        bestRating: { type: ['number', 'string'] },
        worstRating: { type: ['number', 'string'] },
      },
      required: ['@type', 'ratingValue', 'reviewCount'],
    },
    review: {
      oneOf: [
        { $ref: '#/definitions/Review' },
        {
          type: 'array',
          items: { $ref: '#/definitions/Review' },
        },
      ],
    },
    sku: { type: 'string' },
    mpn: { type: 'string' },
    gtin: { type: 'string' },
    gtin12: { type: 'string' },
    gtin13: { type: 'string' },
    gtin14: { type: 'string' },
    gtin8: { type: 'string' },
  },
  required: ['@context', '@type', 'name', 'image', 'description', 'offers'],
  definitions: {
    Offer: {
      type: 'object',
      properties: {
        '@type': { const: 'Offer' },
        price: { type: ['number', 'string'] },
        priceCurrency: { type: 'string', pattern: '^[A-Z]{3}$' },
        availability: {
          type: 'string',
          pattern: '^https://schema\\.org/(InStock|OutOfStock|PreOrder|Discontinued|LimitedAvailability|OnlineOnly|SoldOut)$',
        },
        url: { type: 'string', format: 'uri' },
        priceValidUntil: { type: 'string', format: 'date' },
        itemCondition: {
          type: 'string',
          pattern: '^https://schema\\.org/(NewCondition|UsedCondition|RefurbishedCondition|DamagedCondition)$',
        },
      },
      required: ['@type', 'price', 'priceCurrency', 'availability'],
    },
    Review: {
      type: 'object',
      properties: {
        '@type': { const: 'Review' },
        author: {
          type: 'object',
          properties: {
            '@type': { const: 'Person' },
            name: { type: 'string', minLength: 1 },
          },
          required: ['@type', 'name'],
        },
        reviewRating: {
          type: 'object',
          properties: {
            '@type': { const: 'Rating' },
            ratingValue: { type: ['number', 'string'] },
            bestRating: { type: ['number', 'string'] },
            worstRating: { type: ['number', 'string'] },
          },
          required: ['@type', 'ratingValue'],
        },
        reviewBody: { type: 'string', minLength: 1 },
      },
      required: ['@type', 'author', 'reviewRating'],
    },
  },
};

/**
 * Schema.org Article schema
 * Based on: https://schema.org/Article
 * Google Requirements: https://developers.google.com/search/docs/appearance/structured-data/article
 */
const articleSchema = {
  type: 'object',
  properties: {
    '@context': { type: 'string', pattern: '^https://schema\\.org/?$' },
    '@type': {
      enum: ['Article', 'NewsArticle', 'BlogPosting'],
    },
    headline: { type: 'string', minLength: 1, maxLength: 110 },
    image: {
      oneOf: [
        { type: 'string', format: 'uri' },
        {
          type: 'array',
          items: { type: 'string', format: 'uri' },
          minItems: 1,
        },
      ],
    },
    datePublished: { type: 'string', format: 'date-time' },
    dateModified: { type: 'string', format: 'date-time' },
    author: {
      oneOf: [
        { $ref: '#/definitions/Person' },
        { $ref: '#/definitions/Organization' },
        {
          type: 'array',
          items: {
            oneOf: [
              { $ref: '#/definitions/Person' },
              { $ref: '#/definitions/Organization' },
            ],
          },
        },
      ],
    },
    publisher: { $ref: '#/definitions/Organization' },
    description: { type: 'string', minLength: 1 },
  },
  required: [
    '@context',
    '@type',
    'headline',
    'image',
    'datePublished',
    'author',
  ],
  definitions: {
    Person: {
      type: 'object',
      properties: {
        '@type': { const: 'Person' },
        name: { type: 'string', minLength: 1 },
        url: { type: 'string', format: 'uri' },
      },
      required: ['@type', 'name'],
    },
    Organization: {
      type: 'object',
      properties: {
        '@type': { const: 'Organization' },
        name: { type: 'string', minLength: 1 },
        url: { type: 'string', format: 'uri' },
        logo: {
          oneOf: [
            { type: 'string', format: 'uri' },
            {
              type: 'object',
              properties: {
                '@type': { const: 'ImageObject' },
                url: { type: 'string', format: 'uri' },
                width: { type: ['number', 'string'] },
                height: { type: ['number', 'string'] },
              },
              required: ['@type', 'url'],
            },
          ],
        },
      },
      required: ['@type', 'name'],
    },
  },
};

/**
 * Schema.org FAQPage schema
 * Based on: https://schema.org/FAQPage
 * Google Requirements: https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */
const faqSchema = {
  type: 'object',
  properties: {
    '@context': { type: 'string', pattern: '^https://schema\\.org/?$' },
    '@type': { const: 'FAQPage' },
    mainEntity: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          '@type': { const: 'Question' },
          name: { type: 'string', minLength: 1 },
          acceptedAnswer: {
            type: 'object',
            properties: {
              '@type': { const: 'Answer' },
              text: { type: 'string', minLength: 1 },
            },
            required: ['@type', 'text'],
          },
        },
        required: ['@type', 'name', 'acceptedAnswer'],
      },
      minItems: 1,
    },
  },
  required: ['@context', '@type', 'mainEntity'],
};

/**
 * Schema.org Organization schema
 * Based on: https://schema.org/Organization
 * Used for site-wide organization markup
 */
const organizationSchema = {
  type: 'object',
  properties: {
    '@context': { type: 'string', pattern: '^https://schema\\.org/?$' },
    '@type': { const: 'Organization' },
    name: { type: 'string', minLength: 1 },
    url: { type: 'string', format: 'uri' },
    logo: {
      oneOf: [
        { type: 'string', format: 'uri' },
        {
          type: 'object',
          properties: {
            '@type': { const: 'ImageObject' },
            url: { type: 'string', format: 'uri' },
            width: { type: ['number', 'string'] },
            height: { type: ['number', 'string'] },
          },
          required: ['@type', 'url'],
        },
      ],
    },
    contactPoint: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          '@type': { const: 'ContactPoint' },
          telephone: { type: 'string' },
          contactType: { type: 'string' },
          email: { type: 'string', format: 'email' },
          areaServed: { type: 'string' },
          availableLanguage: {
            oneOf: [
              { type: 'string' },
              { type: 'array', items: { type: 'string' } },
            ],
          },
        },
        required: ['@type', 'contactType'],
      },
    },
    sameAs: {
      type: 'array',
      items: { type: 'string', format: 'uri' },
    },
  },
  required: ['@context', '@type', 'name', 'url'],
};

// Compile schemas
const validators: Record<string, ValidateFunction> = {
  Product: ajv.compile(productSchema),
  Article: ajv.compile(articleSchema),
  BlogPosting: ajv.compile(articleSchema),
  NewsArticle: ajv.compile(articleSchema),
  FAQPage: ajv.compile(faqSchema),
  Organization: ajv.compile(organizationSchema),
};

/**
 * Convert ajv errors to ValidationError format
 */
function convertAjvErrors(
  errors: ErrorObject[],
  schemaType: string
): ValidationError[] {
  return errors.map((error) => ({
    severity: 'error',
    type: 'schema',
    field: error.instancePath || error.params?.missingProperty || 'root',
    message: `${error.instancePath || 'root'} ${error.message}`,
    fix: getFixSuggestion(error, schemaType),
  }));
}

/**
 * Get fix suggestion for common validation errors
 */
function getFixSuggestion(error: ErrorObject, schemaType: string): string {
  const { keyword, params, instancePath } = error;

  switch (keyword) {
    case 'required':
      return `Add required property: ${params.missingProperty}`;
    case 'type':
      return `Change ${instancePath} to type: ${params.type}`;
    case 'format':
      return `Fix ${instancePath} to match format: ${params.format}`;
    case 'pattern':
      return `Update ${instancePath} to match required pattern`;
    case 'minLength':
      return `Increase ${instancePath} length to at least ${params.limit} characters`;
    case 'maxLength':
      return `Reduce ${instancePath} length to at most ${params.limit} characters`;
    case 'minimum':
      return `Increase ${instancePath} value to at least ${params.limit}`;
    case 'maximum':
      return `Reduce ${instancePath} value to at most ${params.limit}`;
    case 'enum':
    case 'const':
      return `Use one of the allowed values: ${params.allowedValues?.join(', ') || params.allowedValue}`;
    default:
      return 'Check Google Rich Results documentation for requirements';
  }
}

/**
 * Validate Product schema
 */
export function validateProductSchema(data: unknown): ValidationResult {
  const validator = validators.Product;
  const valid = validator(data);

  if (valid) {
    return {
      isValid: true,
      errors: [],
      warnings: [],
    };
  }

  const errors = convertAjvErrors(validator.errors || [], 'Product');

  return {
    isValid: false,
    errors,
    warnings: [],
  };
}

/**
 * Validate Article schema (Article, BlogPosting, NewsArticle)
 */
export function validateArticleSchema(data: unknown): ValidationResult {
  // Determine which validator to use based on @type
  const schemaType =
    typeof data === 'object' && data !== null && '@type' in data
      ? (data as { '@type': string })['@type']
      : 'Article';

  const validator =
    validators[schemaType as keyof typeof validators] || validators.Article;
  const valid = validator(data);

  if (valid) {
    return {
      isValid: true,
      errors: [],
      warnings: [],
    };
  }

  const errors = convertAjvErrors(validator.errors || [], schemaType);

  return {
    isValid: false,
    errors,
    warnings: [],
  };
}

/**
 * Validate FAQPage schema
 */
export function validateFAQSchema(data: unknown): ValidationResult {
  const validator = validators.FAQPage;
  const valid = validator(data);

  if (valid) {
    return {
      isValid: true,
      errors: [],
      warnings: [],
    };
  }

  const errors = convertAjvErrors(validator.errors || [], 'FAQPage');

  return {
    isValid: false,
    errors,
    warnings: [],
  };
}

/**
 * Validate Organization schema
 */
export function validateOrganizationSchema(data: unknown): ValidationResult {
  const validator = validators.Organization;
  const valid = validator(data);

  if (valid) {
    return {
      isValid: true,
      errors: [],
      warnings: [],
    };
  }

  const errors = convertAjvErrors(validator.errors || [], 'Organization');

  return {
    isValid: false,
    errors,
    warnings: [],
  };
}

/**
 * Generic schema validator - auto-detects schema type
 */
export function validateSchema(data: unknown): ValidationResult {
  if (typeof data !== 'object' || data === null) {
    return {
      isValid: false,
      errors: [
        {
          severity: 'error',
          type: 'schema',
          field: 'root',
          message: 'Schema data must be an object',
          fix: 'Provide a valid schema.org object',
        },
      ],
      warnings: [],
    };
  }

  const schemaData = data as { '@type'?: string };

  if (!schemaData['@type']) {
    return {
      isValid: false,
      errors: [
        {
          severity: 'error',
          type: 'schema',
          field: '@type',
          message: 'Missing required @type property',
          fix: 'Add @type property to specify schema type',
        },
      ],
      warnings: [],
    };
  }

  const schemaType = schemaData['@type'];

  // Route to appropriate validator
  switch (schemaType) {
    case 'Product':
      return validateProductSchema(data);
    case 'Article':
    case 'BlogPosting':
    case 'NewsArticle':
      return validateArticleSchema(data);
    case 'FAQPage':
      return validateFAQSchema(data);
    case 'Organization':
      return validateOrganizationSchema(data);
    default:
      return {
        isValid: false,
        errors: [
          {
            severity: 'error',
            type: 'schema',
            field: '@type',
            message: `Unsupported schema type: ${schemaType}`,
            fix: 'Use Product, Article, BlogPosting, NewsArticle, FAQPage, or Organization',
          },
        ],
        warnings: [],
      };
  }
}

/**
 * Validate multiple schemas at once
 */
export function validateSchemas(schemas: unknown[]): ValidationResult {
  const allErrors: ValidationError[] = [];
  const allWarnings: ValidationWarning[] = [];
  let allValid = true;

  schemas.forEach((schema, index) => {
    const result = validateSchema(schema);

    if (!result.isValid) {
      allValid = false;
      allErrors.push(
        ...result.errors.map((error) => ({
          ...error,
          page: `Schema ${index + 1}`,
        }))
      );
    }

    allWarnings.push(
      ...result.warnings.map((warning) => ({
        ...warning,
        page: `Schema ${index + 1}`,
      }))
    );
  });

  return {
    isValid: allValid,
    errors: allErrors,
    warnings: allWarnings,
  };
}

// Remove placeholder function
export function schemaValidatorPlaceholder() {
  return 'Schema validator - to be implemented';
}
