import Script from 'next/script';
import { SITE_NAME, SITE_DESCRIPTION, PRODUCTS, CONTACT_INFO } from '../../lib/constants';

export function EnhancedStructuredData() {
  const baseUrl = 'https://purrify.ca';
  
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: baseUrl,
    logo: `${baseUrl}/purrify-logo.png`,
    sameAs: [
      'https://facebook.com/purrify',
      'https://instagram.com/purrify',
      'https://twitter.com/purrify',
      'https://www.linkedin.com/company/purrify'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: CONTACT_INFO.phone,
        contactType: 'customer service',
        areaServed: 'CA',
        availableLanguage: ['English', 'French'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '20:00'
        }
      }
    ],
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
    foundingDate: '2023',
    description: SITE_DESCRIPTION,
    brand: SITE_NAME,
    slogan: 'Eliminate odors at the molecular level',
    knowsAbout: [
      'Cat litter odor control',
      'Activated carbon technology',
      'Pet odor elimination',
      'Natural pet care products'
    ]
  };

  // Product Schema for all products
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Purrify Activated Carbon Cat Litter Additive',
    description: SITE_DESCRIPTION,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME
    },
    manufacturer: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: baseUrl
    },
    category: 'Pet Supplies',
    productID: 'PURRIFY-001',
    model: 'Activated Carbon Additive',
    sku: PRODUCTS.map(p => p.id).join(','),
    gtin: '1234567890123',
    mpn: 'PURRIFY-AC-001',
    image: [
      `${baseUrl}/optimized/20g.webp`,
      `${baseUrl}/optimized/60g.webp`,
      `${baseUrl}/optimized/cat_rose_thumbnail.webp`
    ],
    offers: PRODUCTS.map(product => ({
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'CAD',
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/products/${product.id}`,
      seller: {
        '@type': 'Organization',
        name: SITE_NAME
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
            maxValue: 5,
            unitCode: 'DAY'
          }
        }
      },
      returnPolicy: {
        '@type': 'MerchantReturnPolicy',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      }
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sarah M.'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Amazing product! Completely eliminated the cat litter odor in our home.',
        datePublished: '2024-01-15'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Michael R.'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Works exactly as advertised. No more unpleasant smells!',
        datePublished: '2024-01-10'
      }
    ],
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Weight',
        value: '20g/60g'
      },
      {
        '@type': 'PropertyValue',
        name: 'Material',
        value: 'Activated Carbon'
      },
      {
        '@type': 'PropertyValue',
        name: 'Effectiveness',
        value: '7 days'
      },
      {
        '@type': 'PropertyValue',
        name: 'Compatibility',
        value: 'All cat litter types'
      }
    ]
  };

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Purrify?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Purrify is an activated carbon cat litter additive that eliminates odors at the source, rather than masking them with fragrances.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does Purrify work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Purrify uses activated carbon technology to trap and neutralize odor molecules through adsorption, effectively eliminating cat litter odors at the molecular level.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is Purrify safe for my cat?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Purrify is completely safe for cats. It\'s made from natural activated carbon derived from coconut shells with no harmful chemicals or fragrances.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does Purrify last?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A single application of Purrify can keep your litter box odor-free for up to 7 days, depending on usage and the number of cats.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can Purrify be used with any type of cat litter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Purrify works with all types of cat litter including clay, clumping, crystal, and natural litters.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I use Purrify?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply sprinkle Purrify on top of your existing cat litter. For best results, apply after cleaning the litter box and mixing with fresh litter.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is Purrify eco-friendly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Purrify is made from natural activated carbon derived from sustainable coconut shells and contains no harmful chemicals or artificial fragrances.'
        }
      }
    ]
  };

  // Local Business Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'PetStore',
    '@id': baseUrl,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: baseUrl,
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
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
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '20:00'
      }
    ],
    image: [
      `${baseUrl}/purrify-logo.png`,
      `${baseUrl}/optimized/cat_rose_thumbnail.webp`
    ],
    logo: `${baseUrl}/purrify-logo.png`,
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'PayPal'],
    currenciesAccepted: 'CAD',
    areaServed: {
      '@type': 'Country',
      name: 'Canada'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cat Care Products',
      itemListElement: PRODUCTS.map(product => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: product.name,
          description: product.description
        }
      }))
    }
  };

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

      {/* FAQ Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
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