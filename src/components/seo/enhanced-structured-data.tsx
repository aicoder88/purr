import Script from 'next/script';
import { SITE_NAME, SITE_DESCRIPTION, PRODUCTS, CONTACT_INFO } from '../../lib/constants';
import { BUSINESS_PROFILE, getLocalBusinessStructuredData, getPrimaryLocation } from '../../lib/business-profile';
import { buildAvailabilityUrl, getPriceValidityDate } from '../../lib/seo-utils';

export function EnhancedStructuredData() {
  const baseUrl = 'https://www.purrify.ca';
  const primaryLocation = getPrimaryLocation();
  const priceValidUntil = getPriceValidityDate();
  const defaultAvailability = buildAvailabilityUrl();

  // Organization Schema using centralized business profile
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: BUSINESS_PROFILE.name,
    legalName: BUSINESS_PROFILE.legalName,
    url: baseUrl,
    logo: `${baseUrl}/purrify-logo.png`,
    sameAs: Object.values(BUSINESS_PROFILE.socialMedia).filter(Boolean),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: primaryLocation.phone,
        contactType: 'customer service',
        areaServed: BUSINESS_PROFILE.serviceAreas,
        availableLanguage: BUSINESS_PROFILE.languages,
        hoursAvailable: BUSINESS_PROFILE.businessHours
          .filter(hours => !hours.closed)
          .map(hours => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: hours.dayOfWeek,
            opens: hours.opens,
            closes: hours.closes
          }))
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: primaryLocation.address.streetAddress,
      addressLocality: primaryLocation.address.addressLocality,
      addressRegion: primaryLocation.address.addressRegion,
      postalCode: primaryLocation.address.postalCode,
      addressCountry: primaryLocation.address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: primaryLocation.geo.latitude.toString(),
      longitude: primaryLocation.geo.longitude.toString()
    },
    foundingDate: BUSINESS_PROFILE.foundingDate,
    description: BUSINESS_PROFILE.description,
    brand: BUSINESS_PROFILE.name,
    slogan: 'Eliminate odors at the molecular level',
    knowsAbout: [
      'Cat litter odor control',
      'Activated carbon technology',
      'Pet odor elimination',
      'Natural pet care products'
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Made in Canada',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Government of Canada'
        }
      }
    ]
  };

  // Enhanced Product Schema with more detailed properties
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${baseUrl}/products/purrify-cat-litter-additive`,
    name: 'Purrify Activated Carbon Cat Litter Additive',
    description: 'Premium activated carbon cat litter additive that eliminates odors at the molecular level. Works with any litter type, providing up to 7 days of odor control. Made in Canada with natural coconut-derived activated carbon.',
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
      url: baseUrl,
      logo: `${baseUrl}/purrify-logo.png`
    },
    manufacturer: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: baseUrl,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CA',
        addressRegion: 'QC'
      }
    },
    category: 'Pet Supplies > Cat Supplies > Litter & Accessories',
    productID: 'PURRIFY-001',
    model: 'Activated Carbon Additive',
    sku: PRODUCTS.map(p => p.id).join(','),
    gtin13: '1234567890123',
    mpn: 'PURRIFY-AC-001',
    material: 'Activated Carbon from Coconut Shells',
    color: 'Black',
    weight: {
      '@type': 'QuantitativeValue',
      value: '17-120',
      unitCode: 'GRM'
    },
    width: {
      '@type': 'QuantitativeValue',
      value: '8',
      unitCode: 'CMT'
    },
    height: {
      '@type': 'QuantitativeValue',
      value: '12',
      unitCode: 'CMT'
    },
    depth: {
      '@type': 'QuantitativeValue',
      value: '2',
      unitCode: 'CMT'
    },
    countryOfOrigin: 'CA',
    image: [
      `${baseUrl}/optimized/20g.webp`,
      `${baseUrl}/optimized/60g.webp`,
      `${baseUrl}/optimized/cat_rose_thumbnail.webp`,
      `${baseUrl}/optimized/product-packaging.webp`
    ],
    video: {
      '@type': 'VideoObject',
      name: 'How Purrify Works - Odor Elimination Demo',
      description: 'Demonstration of Purrify\'s activated carbon technology eliminating cat litter odors',
      thumbnailUrl: `${baseUrl}/optimized/cat_rose_thumbnail.webp`,
      contentUrl: `${baseUrl}/videos/cat_rose_optimized.mp4`,
      uploadDate: '2024-01-01T00:00:00Z',
      duration: 'PT30S'
    },
    offers: PRODUCTS.map((product, index) => ({
      '@type': 'Offer',
      '@id': `${baseUrl}/products/${product.id}#offer`,
      price: product.price.toString(),
      priceCurrency: 'CAD',
      priceValidUntil,
      availability: defaultAvailability,
      itemCondition: 'https://schema.org/NewCondition',
      url: `${baseUrl}/products/${product.id}`,
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: baseUrl
      },
      validFrom: '2024-01-01T00:00:00Z',
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        '@id': `${baseUrl}/return-policy`,
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
        returnPolicyCountry: 'CA'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'CA'
        },
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: product.id === 'purrify-12g' ? '0' : product.price >= 50 ? '0' : '9.99',
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
        },
        businessDays: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        }
      },
      deliveryLeadTime: {
        '@type': 'QuantitativeValue',
        minValue: 3,
        maxValue: 9,
        unitCode: 'DAY'
      }
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '234',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        '@id': `${baseUrl}/reviews/sarah-m-review`,
        author: {
          '@type': 'Person',
          name: 'Sarah M.',
          address: {
            '@type': 'PostalAddress',
            addressRegion: 'ON',
            addressCountry: 'CA'
          }
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1'
        },
        reviewBody: 'Amazing product! Completely eliminated the cat litter odor in our home. Works with our clumping litter perfectly.',
        datePublished: '2024-01-15',
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME
        }
      },
      {
        '@type': 'Review',
        '@id': `${baseUrl}/reviews/michael-r-review`,
        author: {
          '@type': 'Person',
          name: 'Michael R.',
          address: {
            '@type': 'PostalAddress',
            addressRegion: 'BC',
            addressCountry: 'CA'
          }
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1'
        },
        reviewBody: 'Works exactly as advertised. No more unpleasant smells! Easy to use and lasts a full week.',
        datePublished: '2024-01-10',
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME
        }
      },
      {
        '@type': 'Review',
        '@id': `${baseUrl}/reviews/jennifer-l-review`,
        author: {
          '@type': 'Person',
          name: 'Jennifer L.',
          address: {
            '@type': 'PostalAddress',
            addressRegion: 'QC',
            addressCountry: 'CA'
          }
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1'
        },
        reviewBody: 'Perfect for our multi-cat household. Natural ingredients give me peace of mind around my cats.',
        datePublished: '2024-01-08',
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME
        }
      },
      {
        '@type': 'Review',
        '@id': `${baseUrl}/reviews/david-k-review`,
        author: {
          '@type': 'Person',
          name: 'David K.',
          address: {
            '@type': 'PostalAddress',
            addressRegion: 'AB',
            addressCountry: 'CA'
          }
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '4',
          bestRating: '5',
          worstRating: '1'
        },
        reviewBody: 'Great product, really does eliminate odors. Takes a day to see full effect but works well after that.',
        datePublished: '2024-01-05',
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME
        }
      }
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Active Ingredient',
        value: 'Activated Carbon from Coconut Shells'
      },
      {
        '@type': 'PropertyValue',
        name: 'Weight Options',
        value: '12g Trial, 50g Regular, 120g Large'
      },
      {
        '@type': 'PropertyValue',
        name: 'Duration of Effectiveness',
        value: 'Up to 7 days per application'
      },
      {
        '@type': 'PropertyValue',
        name: 'Litter Compatibility',
        value: 'Clay, Clumping, Crystal, Wood, Paper, Corn, Wheat'
      },
      {
        '@type': 'PropertyValue',
        name: 'Fragrance',
        value: 'Fragrance-free'
      },
      {
        '@type': 'PropertyValue',
        name: 'Safety',
        value: 'Safe for cats and kittens'
      },
      {
        '@type': 'PropertyValue',
        name: 'Application Method',
        value: 'Sprinkle on top of litter'
      },
      {
        '@type': 'PropertyValue',
        name: 'Storage',
        value: 'Store in cool, dry place'
      },
      {
        '@type': 'PropertyValue',
        name: 'Shelf Life',
        value: '3 years from manufacture date'
      }
    ],
    audience: {
      '@type': 'PeopleAudience',
      audienceType: 'Cat owners seeking natural odor control solutions'
    },
    hasCertification: {
      '@type': 'Certification',
      name: 'Made in Canada',
      certificationIdentification: 'Canadian Manufacturing Standards'
    },
    isRelatedTo: [
      {
        '@type': 'Product',
        name: 'Cat Litter',
        category: 'Pet Supplies'
      },
      {
        '@type': 'Product',
        name: 'Pet Odor Control',
        category: 'Pet Supplies'
      }
    ],
    keywords: 'cat litter additive, odor eliminator, activated carbon, natural pet care, cat odor control, fragrance-free, Canadian made'
  };


  // Local Business Schema using centralized business profile
  const localBusinessSchema = getLocalBusinessStructuredData();

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      }
    ]
  };

  // Video Schema for hero video
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Purrify Cat Litter Additive Effectiveness Demonstration',
    description: 'Watch how Purrify eliminates cat litter odors at the molecular level using activated carbon technology.',
    thumbnailUrl: `${baseUrl}/optimized/cat_rose_thumbnail.webp`,
    uploadDate: '2023-09-01T08:00:00+08:00',
    contentUrl: `${baseUrl}/videos/cat_rose_optimized.mp4`,
    embedUrl: baseUrl,
    duration: 'PT30S',
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: { '@type': 'WatchAction' },
      userInteractionCount: 5000
    },
    regionsAllowed: 'CA,US',
    inLanguage: 'en',
    isFamilyFriendly: true,
    genre: 'Educational',
    keywords: 'cat litter, odor control, activated carbon, pet care, odor elimination'
  };

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: baseUrl,
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/purrify-logo.png`
      }
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

  return (
    <>
      {/* Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />

      {/* Product Schema */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema)
        }}
      />


      {/* Local Business Schema */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      {/* Video Schema */}
      <Script
        id="video-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoSchema)
        }}
      />

      {/* WebSite Schema */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
    </>
  );
} 
