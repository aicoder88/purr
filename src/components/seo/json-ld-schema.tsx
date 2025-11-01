import React from 'react';
import Head from 'next/head';
import { 
  generateHomepageSchema,
  generateProductPageSchema, 
  generateArticlePageSchema,
  generateLocationPageSchema,
  generateJSONLD
} from '../../lib/seo-utils';

interface JSONLDSchemaProps {
  type: 'homepage' | 'product' | 'article' | 'location';
  locale?: 'en' | 'fr' | 'zh';
  data?: {
    // Product page data
    productId?: string;
    
    // Article page data  
    title?: string;
    description?: string;
    path?: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
    keywords?: string[];
    category?: string;
    image?: string;
    wordCount?: number;
    readingTime?: number;
    
    // Location page data
    cityName?: string;
    province?: string;
  };
}

export const JSONLDSchema: React.FC<JSONLDSchemaProps> = ({ 
  type, 
  locale = 'en', 
  data = {} 
}) => {
  let schema: object | null = null;

  switch (type) {
    case 'homepage':
      schema = generateHomepageSchema(locale);
      break;
      
    case 'product':
      if (data.productId) {
        schema = generateProductPageSchema(data.productId, locale);
      }
      break;
      
    case 'article':
      if (data.title && data.description && data.path) {
        schema = generateArticlePageSchema(
          data.title,
          data.description,
          data.path,
          locale,
          {
            author: data.author,
            datePublished: data.datePublished,
            dateModified: data.dateModified,
            keywords: data.keywords,
            category: data.category,
            image: data.image,
            wordCount: data.wordCount,
            readingTime: data.readingTime
          }
        );
      }
      break;
      
    case 'location':
      if (data.cityName && data.province) {
        schema = generateLocationPageSchema(data.cityName, data.province, locale);
      }
      break;
      
    default:
      console.warn(`Unknown schema type: ${type}`);
  }

  if (!schema) {
    return null;
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJSONLD(schema)}
        key={`jsonld-${type}-${locale}`}
      />
    </Head>
  );
};

// Convenience components for specific page types
export const HomepageSchema: React.FC<{ locale?: 'en' | 'fr' | 'zh' }> = ({ locale = 'en' }) => (
  <JSONLDSchema type="homepage" locale={locale} />
);

export const ProductSchema: React.FC<{ 
  productId: string; 
  locale?: 'en' | 'fr' | 'zh';
}> = ({ productId, locale = 'en' }) => (
  <JSONLDSchema type="product" locale={locale} data={{ productId }} />
);

export const ArticleSchema: React.FC<{
  title: string;
  description: string;
  path: string;
  locale?: 'en' | 'fr' | 'zh';
  options?: {
    author?: string;
    datePublished?: string;
    dateModified?: string;
    keywords?: string[];
    category?: string;
    image?: string;
    wordCount?: number;
    readingTime?: number;
  };
}> = ({ title, description, path, locale = 'en', options = {} }) => (
  <JSONLDSchema 
    type="article" 
    locale={locale} 
    data={{ 
      title, 
      description, 
      path, 
      ...options 
    }} 
  />
);

export const LocationSchema: React.FC<{
  cityName: string;
  province: string;
  locale?: 'en' | 'fr' | 'zh';
}> = ({ cityName, province, locale = 'en' }) => (
  <JSONLDSchema 
    type="location" 
    locale={locale} 
    data={{ cityName, province }} 
  />
);

export default JSONLDSchema;