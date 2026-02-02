/**
 * StructuredData Component
 * 
 * Renders Schema.org JSON-LD structured data in the page head.
 * Uses the StructuredDataGenerator for consistent schema generation.
 */

import Head from 'next/head';
import { StructuredDataGenerator } from '@/lib/seo/structured-data-generator';
import type {
  ProductData,
  BlogPostData,
  OrganizationData,
  BreadcrumbItem,
  FAQItem,
} from '@/lib/seo/structured-data-generator';

interface StructuredDataProps {
  type?: 'product' | 'blogPost' | 'article' | 'organization' | 'breadcrumbs' | 'faq' | 'website' | 'localBusiness';
  data?: ProductData | BlogPostData | OrganizationData | BreadcrumbItem[] | FAQItem[] | any;
  schema?: any;
  validate?: boolean;
}

export function StructuredData({ type, data, schema, validate = false }: StructuredDataProps) {
  const generator = new StructuredDataGenerator();

  let schemaJson: string;

  try {
    if (schema) {
      schemaJson = typeof schema === 'string' ? schema : JSON.stringify(schema, null, 2);
    } else {
      switch (type) {
        case 'product':
          schemaJson = generator.generateProduct(data as ProductData);
          break;
        case 'blogPost':
          schemaJson = generator.generateBlogPosting(data as BlogPostData);
          break;
        case 'article':
          schemaJson = generator.generateArticle(data as BlogPostData);
          break;
        case 'organization':
          schemaJson = generator.generateOrganization(data as OrganizationData);
          break;
        case 'breadcrumbs':
          schemaJson = generator.generateBreadcrumbs(data as BreadcrumbItem[]);
          break;
        case 'faq':
          schemaJson = generator.generateFAQ(data as FAQItem[]);
          break;
        case 'website':
          schemaJson = generator.generateWebSite(data);
          break;
        case 'localBusiness':
          schemaJson = generator.generateLocalBusiness(data);
          break;
        default:
          console.error(`Unknown structured data type: ${type}`);
          return null;
      }
    }

    // Validate if requested
    if (validate) {
      const validation = generator.validateSchema(schemaJson);
      if (!validation.valid) {
        console.error('Structured data validation errors:', validation.errors);
        if (validation.warnings.length > 0) {
          console.warn('Structured data validation warnings:', validation.warnings);
        }
      }
    }

    return (
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      </Head>
    );
  } catch (error) {
    console.error('Error generating structured data:', error);
    return null;
  }
}

/**
 * ProductStructuredData - Convenience component for product pages
 */
export function ProductStructuredData(props: Omit<StructuredDataProps, 'type'>) {
  return <StructuredData type="product" {...props} />;
}

/**
 * BlogPostStructuredData - Convenience component for blog posts
 */
export function BlogPostStructuredData(props: Omit<StructuredDataProps, 'type'>) {
  return <StructuredData type="blogPost" {...props} />;
}

/**
 * OrganizationStructuredData - Convenience component for organization info
 */
export function OrganizationStructuredData(props: Omit<StructuredDataProps, 'type'>) {
  return <StructuredData type="organization" {...props} />;
}

/**
 * BreadcrumbsStructuredData - Convenience component for breadcrumbs
 */
export function BreadcrumbsStructuredData(props: Omit<StructuredDataProps, 'type'>) {
  return <StructuredData type="breadcrumbs" {...props} />;
}

/**
 * FAQStructuredData - Convenience component for FAQ pages
 */
export function FAQStructuredData(props: Omit<StructuredDataProps, 'type'>) {
  return <StructuredData type="faq" {...props} />;
}

/**
 * LocalBusinessStructuredData - Convenience component for local business info
 */
export function LocalBusinessStructuredData(props: Omit<StructuredDataProps, 'type'>) {
  return <StructuredData type="localBusiness" {...props} />;
}
