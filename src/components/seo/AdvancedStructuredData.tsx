import React from 'react';
import { buildAvailabilityUrl, getPriceValidityDate, type OfferAvailability } from '@/lib/seo-utils';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';

interface ProductStructuredDataProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    currency?: string;
    image: string;
    brand?: string;
    category?: string;
    availability?: OfferAvailability;
    condition?: 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition';
    gtin?: string;
    mpn?: string;
    sku?: string;
    reviews?: {
      rating: number;
      reviewCount: number;
    };
  };
}

interface OrganizationStructuredDataProps {
  organization: {
    name: string;
    url: string;
    logo: string;
    description: string;
    address?: {
      streetAddress?: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    contactPoint?: {
      telephone: string;
      contactType: string;
      email?: string;
    };
    socialMedia?: string[];
  };
}

interface WebsiteStructuredDataProps {
  website: {
    name: string;
    url: string;
    description: string;
    searchAction?: {
      target: string;
      queryInput: string;
    };
  };
}

interface BreadcrumbStructuredDataProps {
  breadcrumbs: Array<{
    name: string;
    url: string;
  }>;
}

interface FAQStructuredDataProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

interface ArticleStructuredDataProps {
  article: {
    headline: string;
    description: string;
    image: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    publisher: {
      name: string;
      logo: string;
    };
    url: string;
  };
}

// Define the structure of our product data with TypeScript interfaces
interface ProductStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image: string;
  brand: { "@type": string; name: string };
  category: string;
  sku: string;
  mpn: string;
  gtin?: string;
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
    availability: string;
    priceValidUntil: string;
    itemCondition: string;
    url: string;
    seller: { "@type": string; name: string };
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    reviewCount: string;
    bestRating: string;
    worstRating: string;
  };
}

// Product Structured Data
export const ProductStructuredData: React.FC<ProductStructuredDataProps> = ({ product }) => {
  const priceValidUntil = getPriceValidityDate();
  const availabilityUrl = buildAvailabilityUrl(product.availability ?? 'InStock');

  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Purrify"
    },
    "sku": product.sku || product.id,
    "mpn": product.mpn || `PURRIFY-${product.id.toUpperCase()}`,
    "offers": {
      "@type": "Offer",
      "price": product.price.toFixed(2),
      "priceCurrency": product.currency || "CAD",
      "availability": availabilityUrl,
      "priceValidUntil": priceValidUntil,
      "itemCondition": `https://schema.org/${product.condition || 'NewCondition'}`,
      "url": `https://www.purrify.ca/products/${product.id}`,
      "seller": {
        "@type": "Organization",
        "name": "Purrify"
      }
    }
  };

  // Add category only if provided
  if (product.category) {
    structuredData.category = product.category;
  }

  // Add GTIN only if provided
  if (product.gtin) {
    structuredData.gtin = product.gtin;
  }

  // Add review data if available
  if (product.reviews && product.reviews.reviewCount > 0) {
    structuredData.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": product.reviews.rating.toString(),
      "reviewCount": product.reviews.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// Organization Structured Data
export const OrganizationStructuredData: React.FC<OrganizationStructuredDataProps> = ({ organization }) => {
  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organization.name,
    "url": organization.url,
    "logo": organization.logo,
    "description": organization.description,
  };

  // Add address only if provided
  if (organization.address) {
    structuredData.address = {
      "@type": "PostalAddress",
      "streetAddress": organization.address.streetAddress,
      "addressLocality": organization.address.addressLocality,
      "addressRegion": organization.address.addressRegion,
      "postalCode": organization.address.postalCode,
      "addressCountry": organization.address.addressCountry
    };
  }

  // contactPoint must be an array for Google Rich Results
  if (organization.contactPoint) {
    structuredData.contactPoint = [{
      "@type": "ContactPoint",
      "telephone": organization.contactPoint.telephone,
      "contactType": organization.contactPoint.contactType,
      "email": organization.contactPoint.email,
      "areaServed": ["CA", "US"],
      "availableLanguage": ["English", "French"]
    }];
  }

  // Add sameAs only if valid URLs provided
  if (organization.socialMedia && organization.socialMedia.length > 0) {
    const validSocialLinks = organization.socialMedia.filter(url => 
      url && typeof url === 'string' && url.startsWith('http')
    );
    if (validSocialLinks.length > 0) {
      structuredData.sameAs = validSocialLinks;
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// Website Structured Data
export const WebsiteStructuredData: React.FC<WebsiteStructuredDataProps> = ({ website }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": website.name,
    "url": website.url,
    "description": website.description,
    "potentialAction": website.searchAction ? {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": website.searchAction.target
      },
      "query-input": website.searchAction.queryInput
    } : undefined
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// Breadcrumb Structured Data
export const BreadcrumbStructuredData: React.FC<BreadcrumbStructuredDataProps> = ({ breadcrumbs }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": breadcrumb.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// FAQ Structured Data
export const FAQStructuredData: React.FC<FAQStructuredDataProps> = ({ faqs }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// Article Structured Data
export const ArticleStructuredData: React.FC<ArticleStructuredDataProps> = ({ article }) => {
  // Ensure headline doesn't exceed 110 characters for Google guidelines
  const headline = article.headline?.length > 110 
    ? article.headline.substring(0, 107) + '...' 
    : article.headline;

  // Ensure dates are in ISO 8601 format
  const datePublished = article.datePublished?.includes('T') 
    ? article.datePublished 
    : new Date(article.datePublished).toISOString();
  const dateModified = article.dateModified 
    ? (article.dateModified.includes('T') ? article.dateModified : new Date(article.dateModified).toISOString())
    : datePublished;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": article.description,
    "image": article.image,
    "author": {
      "@type": "Organization",
      "name": article.author,
      "url": "https://www.purrify.ca"
    },
    "publisher": {
      "@type": "Organization",
      "name": article.publisher.name,
      "url": "https://www.purrify.ca",
      "logo": {
        "@type": "ImageObject",
        "url": article.publisher.logo,
        "width": 400,
        "height": 400
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "url": article.url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// Local Business Structured Data (for physical stores)
export const LocalBusinessStructuredData: React.FC<{
  business: {
    name: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    telephone: string;
    url: string;
    openingHours: string[];
    priceRange?: string;
    geo?: {
      latitude: number;
      longitude: number;
    };
    image?: string;
  };
}> = ({ business }) => {
  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    "name": business.name,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address.streetAddress,
      "addressLocality": business.address.addressLocality,
      "addressRegion": business.address.addressRegion,
      "postalCode": business.address.postalCode,
      "addressCountry": business.address.addressCountry
    },
    "telephone": business.telephone,
    "url": business.url,
  };

  // Add image if provided (recommended for LocalBusiness)
  if (business.image) {
    structuredData.image = business.image;
  }

  // Add opening hours if provided
  if (business.openingHours && business.openingHours.length > 0) {
    structuredData.openingHoursSpecification = business.openingHours.map((hours) => {
      const parts = hours.split(' ');
      return {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": parts[0],
        "opens": parts[1] || '09:00',
        "closes": parts[2] || '17:00'
      };
    });
  }

  // Add price range if provided
  if (business.priceRange) {
    structuredData.priceRange = business.priceRange;
  }

  // Add geo coordinates if provided
  if (business.geo) {
    structuredData.geo = {
      "@type": "GeoCoordinates",
      "latitude": business.geo.latitude,
      "longitude": business.geo.longitude
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

// Review Structured Data
export const ReviewStructuredData: React.FC<{
  reviews: Array<{
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
    itemReviewed: {
      name: string;
      type: string;
    };
  }>;
}> = ({ reviews }) => {
  const structuredData = reviews.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "reviewBody": review.reviewBody,
    "datePublished": review.datePublished,
    "itemReviewed": {
      "@type": review.itemReviewed.type,
      "name": review.itemReviewed.name
    }
  }));

  return (
    <>
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
};

// Comprehensive Purrify Structured Data
export const PurrifyStructuredData: React.FC = () => {
  const organizationData = {
    name: "Purrify",
    url: "https://www.purrify.ca",
    logo: "https://www.purrify.ca/optimized/logos/purrify-logo.png",
    description: "Premium activated carbon cat litter additive that eliminates odors at the molecular level. Made in Canada with natural ingredients.",
    address: {
      addressLocality: "Mirabel",
      addressRegion: "QC",
      postalCode: "J7J 0T6",
      addressCountry: "CA"
    },
    contactPoint: {
      telephone: CONTACT_INFO.phoneInternational,
      contactType: "customer service",
      email: CONTACT_INFO.email
    },
    socialMedia: Object.values(SOCIAL_LINKS).filter(
      (url): url is string => typeof url === 'string' && url.startsWith('http')
    )
  };

  const websiteData = {
    name: "Purrify - Cat Litter Odor Control",
    url: "https://www.purrify.ca",
    description: "Premium activated carbon cat litter additive that eliminates odors at the molecular level.",
    searchAction: {
      target: "https://www.purrify.ca/search?q={search_term_string}",
      queryInput: "required name=search_term_string"
    }
  };

  return (
    <>
      <OrganizationStructuredData organization={organizationData} />
      <WebsiteStructuredData website={websiteData} />
    </>
  );
};

const AdvancedStructuredData = {
  ProductStructuredData,
  OrganizationStructuredData,
  WebsiteStructuredData,
  BreadcrumbStructuredData,
  FAQStructuredData,
  ArticleStructuredData,
  LocalBusinessStructuredData,
  ReviewStructuredData,
  PurrifyStructuredData
};

export default AdvancedStructuredData;
