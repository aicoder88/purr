import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { SITE_NAME, SITE_DESCRIPTION, PRODUCTS, CONTACT_INFO } from '../../lib/constants';
import { useTranslation } from '../../lib/translation-context';
import { buildAvailabilityUrl, getPriceValidityDate, type OfferAvailability } from '../../lib/seo-utils';

interface PageStructuredDataProps {
  pageType: 'home' | 'product' | 'article' | 'faq' | 'category';
  pageData?: {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    // Product specific
    product?: {
      id: string;
      name: string;
      description: string;
      price: number;
      image: string;
      availability?: OfferAvailability;
      reviews?: {
        rating: number;
        reviewCount: number;
      };
    };
    // Article specific
    article?: {
      headline: string;
      description: string;
      image: string;
      author: string;
      datePublished: string;
      dateModified?: string;
      category?: string;
      keywords?: string[];
    };
    // FAQ specific
    faqs?: Array<{
      question: string;
      answer: string;
    }>;
    // Breadcrumb data
    breadcrumbs?: Array<{
      name: string;
      url: string;
    }>;
  };
}

export const ComprehensiveStructuredData: React.FC<PageStructuredDataProps> = ({ 
  pageType, 
  pageData = {} 
}) => {
  const { locale } = useTranslation();
  const baseUrl = `https://www.purrify.ca${locale === 'fr' ? '/fr' : locale === 'zh' ? '/zh' : ''}`;
  const mainUrl = 'https://www.purrify.ca';
  const defaultAvailability = buildAvailabilityUrl();
  const priceValidUntil = getPriceValidityDate();
  
  // Base Organization Schema - Used across all pages
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${mainUrl}/#organization`,
    name: SITE_NAME,
    url: mainUrl,
    logo: `${mainUrl}/purrify-logo.png`,
    image: `${mainUrl}/purrify-logo.png`,
    description: SITE_DESCRIPTION,
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.address.split(',')[0],
      addressLocality: 'Mirabel',
      addressRegion: 'QC',
      postalCode: 'J7J 0T6',
      addressCountry: 'CA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '45.6501',
      longitude: '-73.8359'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: CONTACT_INFO.phone,
        contactType: 'customer service',
        email: CONTACT_INFO.email,
        areaServed: ['CA', 'US'],
        availableLanguage: ['English', 'French', 'Chinese'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '20:00'
        }
      }
    ],
    sameAs: [
      'https://facebook.com/purrify',
      'https://instagram.com/purrify',
      'https://twitter.com/purrify',
      'https://www.linkedin.com/company/purrify'
    ],
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
      slogan: 'Eliminate odors at the molecular level'
    },
    knowsAbout: [
      'Cat litter odor control',
      'Activated carbon technology',
      'Pet odor elimination',
      'Natural pet care products',
      'Cat litter additives',
      'Molecular odor elimination'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Canada'
    },
    currenciesAccepted: 'CAD',
    paymentAccepted: ['Credit Card', 'PayPal', 'Stripe']
  };

  // Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${mainUrl}/#website`,
    name: `${SITE_NAME} - Activated Carbon Cat Litter Additive`,
    alternateName: SITE_NAME,
    url: mainUrl,
    description: SITE_DESCRIPTION,
    inLanguage: locale === 'fr' ? 'fr-CA' : locale === 'zh' ? 'zh-CN' : 'en-CA',
    publisher: {
      '@id': `${mainUrl}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = pageData.breadcrumbs ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pageData.breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url
    }))
  } : null;

  // Page-specific schemas
  const getPageSpecificSchemas = () => {
    const schemas = [];

    switch (pageType) {
      case 'home':
        // Enhanced home page schemas
        const homeProductSchema = {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Purrify Cat Litter Additive Products',
          description: 'Complete range of activated carbon cat litter additives for odor control',
          numberOfItems: PRODUCTS.length,
          itemListElement: PRODUCTS.map((product, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              '@id': `${mainUrl}/products/${product.id}`,
              name: product.name,
              description: product.description,
              image: `${mainUrl}${product.image}`,
              brand: {
                '@type': 'Brand',
                name: SITE_NAME
              },
              category: 'Pet Supplies > Cat Care > Litter Additives',
              offers: {
                '@type': 'Offer',
                price: product.price.toString(),
                priceCurrency: 'CAD',
                availability: defaultAvailability,
                priceValidUntil,
                url: `${mainUrl}/products/${product.id}`,
                seller: {
                  '@id': `${mainUrl}/#organization`
                }
              }
            }
          }))
        };

        schemas.push(homeProductSchema);

        // Service schema for home page
        const serviceSchema = {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Cat Litter Odor Control Service',
          description: 'Premium activated carbon additive that eliminates cat litter odors at the molecular level',
          provider: {
            '@id': `${mainUrl}/#organization`
          },
          serviceType: 'Pet Care Product',
          areaServed: {
            '@type': 'Country',
            name: 'Canada'
          },
          offers: {
            '@type': 'Offer',
            priceRange: '$6.99 - $29.99',
            priceCurrency: 'CAD'
          }
        };
        schemas.push(serviceSchema);
        break;

      case 'product':
        if (pageData.product) {
          const productSchema: Record<string, unknown> = {
            '@context': 'https://schema.org',
            '@type': 'Product',
            '@id': `${baseUrl}/products/${pageData.product.id}`,
            name: pageData.product.name,
            description: pageData.product.description,
            image: [`${mainUrl}${pageData.product.image}`],
            brand: {
              '@type': 'Brand',
              '@id': `${mainUrl}/#organization`,
              name: SITE_NAME
            },
            manufacturer: {
              '@id': `${mainUrl}/#organization`
            },
            category: 'Pet Supplies > Cat Care > Litter Additives',
            sku: pageData.product.id,
            mpn: `PURRIFY-${pageData.product.id.toUpperCase()}`,
            productID: pageData.product.id,
            offers: {
              '@type': 'Offer',
              price: pageData.product.price.toString(),
              priceCurrency: 'CAD',
              priceValidUntil,
              availability: buildAvailabilityUrl(pageData.product.availability ?? 'InStock'),
              itemCondition: 'https://schema.org/NewCondition',
              url: `${baseUrl}/products/${pageData.product.id}`,
              seller: {
                '@id': `${mainUrl}/#organization`
              },
              shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                  '@type': 'MonetaryAmount',
                  value: '0',
                  currency: 'CAD'
                },
                deliveryTime: {
                  '@type': 'ShippingDeliveryTime',
                  handlingTime: {
                    '@type': 'QuantitativeValue',
                    minValue: 1,
                    maxValue: 2,
                    unitCode: 'DAY'
                  },
                  transitTime: {
                    '@type': 'QuantitativeValue',
                    minValue: 2,
                    maxValue: 7,
                    unitCode: 'DAY'
                  }
                }
              },
              hasMerchantReturnPolicy: {
                '@type': 'MerchantReturnPolicy',
                returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                merchantReturnDays: 30,
                returnMethod: 'https://schema.org/ReturnByMail',
                returnFees: 'https://schema.org/FreeReturn'
              }
            },
            additionalProperty: [
              {
                '@type': 'PropertyValue',
                name: 'Material',
                value: 'Activated Carbon'
              },
              {
                '@type': 'PropertyValue',
                name: 'Source',
                value: 'Coconut Shell Carbon'
              },
              {
                '@type': 'PropertyValue',
                name: 'Effectiveness Duration',
                value: '7 days'
              },
              {
                '@type': 'PropertyValue',
                name: 'Compatibility',
                value: 'All cat litter types'
              },
              {
                '@type': 'PropertyValue',
                name: 'Pet Safe',
                value: 'Yes'
              }
            ]
          };

          if (pageData.product.reviews && pageData.product.reviews.reviewCount > 0) {
            productSchema.aggregateRating = {
              '@type': 'AggregateRating',
              ratingValue: pageData.product.reviews.rating.toString(),
              reviewCount: pageData.product.reviews.reviewCount.toString(),
              bestRating: '5',
              worstRating: '1'
            };
          }

          schemas.push(productSchema);
        }
        break;

      case 'article':
        if (pageData.article) {
          const articleSchema = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': pageData.url || baseUrl,
            headline: pageData.article.headline,
            description: pageData.article.description,
            image: pageData.article.image,
            author: {
              '@type': 'Organization',
              '@id': `${mainUrl}/#organization`,
              name: SITE_NAME
            },
            publisher: {
              '@id': `${mainUrl}/#organization`
            },
            datePublished: pageData.article.datePublished,
            dateModified: pageData.article.dateModified || pageData.article.datePublished,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': pageData.url || baseUrl
            },
            articleSection: pageData.article.category || 'Pet Care',
            keywords: pageData.article.keywords?.join(', ') || 'cat litter, activated carbon, odor control',
            inLanguage: locale === 'fr' ? 'fr-CA' : locale === 'zh' ? 'zh-CN' : 'en-CA',
            about: {
              '@type': 'Thing',
              name: 'Cat Litter Odor Control',
              description: 'Solutions and products for eliminating cat litter odors'
            },
            mentions: [
              {
                '@type': 'Product',
                name: SITE_NAME,
                description: SITE_DESCRIPTION
              }
            ]
          };
          schemas.push(articleSchema);
        }
        break;

      case 'faq':
        if (pageData.faqs && pageData.faqs.length > 0) {
          const faqSchema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': pageData.url || baseUrl,
            name: `${SITE_NAME} Frequently Asked Questions`,
            description: `Common questions and answers about ${SITE_NAME} activated carbon cat litter additive`,
            mainEntity: pageData.faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            })),
            about: {
              '@type': 'Product',
              name: SITE_NAME,
              description: SITE_DESCRIPTION
            },
            inLanguage: locale === 'fr' ? 'fr-CA' : locale === 'zh' ? 'zh-CN' : 'en-CA'
          };
          schemas.push(faqSchema);
        }
        break;

      case 'category':
        const categorySchema = {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': pageData.url || baseUrl,
          name: pageData.title || `${SITE_NAME} Products`,
          description: pageData.description || `Browse our complete range of ${SITE_NAME} activated carbon cat litter additives`,
          mainEntity: {
            '@type': 'ItemList',
            name: 'Product Categories',
            itemListElement: PRODUCTS.map((product, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${mainUrl}/products/${product.id}`,
              name: product.name
            }))
          },
          inLanguage: locale === 'fr' ? 'fr-CA' : locale === 'zh' ? 'zh-CN' : 'en-CA',
          isPartOf: {
            '@id': `${mainUrl}/#website`
          }
        };
        schemas.push(categorySchema);
        break;
    }

    return schemas;
  };

  const pageSpecificSchemas = getPageSpecificSchemas();

  return (
    <>
      {/* Base Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />

      {/* Website Schema */}
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />

      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />
      )}

      {/* Page-Specific Schemas */}
      {pageSpecificSchemas.map((schema, index) => (
        <Script
          key={`page-schema-${index}`}
          id={`page-schema-${index}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </>
  );
};

// Utility hook for generating structured data based on page context
export const useStructuredData = () => {
  const { locale } = useTranslation();
  
  const generateBreadcrumbs = (path: string) => {
    const pathSegments = path.split('/').filter(segment => segment !== '');
    const breadcrumbs = [
      {
        name: 'Home',
        url: locale === 'fr' ? '/fr' : locale === 'zh' ? '/zh' : '/'
      }
    ];

    let currentPath = locale === 'fr' ? '/fr' : locale === 'zh' ? '/zh' : '';
    
    pathSegments.forEach((segment, index) => {
      if (segment === 'fr' || segment === 'zh') return; // Skip language segments
      
      currentPath += `/${segment}`;
      
      // Convert segment to readable name
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        name: name,
        url: currentPath
      });
    });

    return breadcrumbs;
  };

  const generateProductData = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      availability: 'InStock' as const,
      reviews: {
        rating: 4.9,
        reviewCount: 127
      }
    };
  };

  return {
    generateBreadcrumbs,
    generateProductData
  };
};

export default ComprehensiveStructuredData;
