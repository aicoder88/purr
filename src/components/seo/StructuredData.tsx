/**
 * StructuredData Component
 * 
 * Renders Schema.org JSON-LD structured data in the page head.
 * Uses the StructuredDataGenerator for consistent schema generation.
 */


import { StructuredDataGenerator } from '@/lib/seo/structured-data-generator';
import type {
  ProductData,
  BlogPostData,
  OrganizationData,
  BreadcrumbItem,
  FAQItem,
  ClaimReviewData,
  ExpertAuthorData,
  HowToData,
} from '@/lib/seo/structured-data-generator';

interface WebSiteData {
  name: string;
  url: string;
  searchUrl?: string;
}

interface LocalBusinessData {
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
}

interface VideoData {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}

interface StructuredDataProps {
  type?: 'product' | 'blogPost' | 'article' | 'organization' | 'breadcrumbs' | 'faq' | 'website' | 'localBusiness' | 'video' | 'howTo' | 'claimReview' | 'expertAuthor';
  data?: ProductData | BlogPostData | OrganizationData | BreadcrumbItem[] | FAQItem[] | WebSiteData | LocalBusinessData | VideoData | HowToData | ClaimReviewData | ExpertAuthorData;
  schema?: string | Record<string, unknown>;
  validate?: boolean;
}

export function StructuredData({ type, data, schema, validate = false }: StructuredDataProps) {
  const generator = new StructuredDataGenerator();

  let schemaJson: string;

  try {
    if (schema) {
      schemaJson = typeof schema === 'string' ? schema : JSON.stringify(schema, null, 2);
    } else if (data) {
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
          schemaJson = generator.generateWebSite(data as WebSiteData);
          break;
        case 'localBusiness':
          schemaJson = generator.generateLocalBusiness(data as LocalBusinessData);
          break;
        case 'video':
          schemaJson = generator.generateVideo(data as VideoData);
          break;
        case 'howTo':
          schemaJson = generator.generateHowTo(data as HowToData);
          break;
        case 'claimReview':
          schemaJson = generator.generateClaimReview(data as ClaimReviewData);
          break;
        case 'expertAuthor':
          schemaJson = generator.generateExpertAuthor(data as ExpertAuthorData);
          break;
        default:
          console.error(`Unknown structured data type: ${type}`);
          return null;
      }
    } else {
      return null;
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
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
