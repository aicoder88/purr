import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from '../src/lib/translation-context';
import { SITE_NAME, CONTACT_INFO } from '../src/lib/constants';
import { ChevronRight, Home } from 'lucide-react';

// Retailer-specific components
import { RetailerHero } from '../src/components/sections/retailer-hero';
import { WholesalePricing } from '../src/components/sections/wholesale-pricing';
import { RetailerContact } from '../src/components/sections/retailer-contact';
import { ClientLocationsMap } from '../src/components/maps/ClientLocationsMap';
import { getLocalizedUrl } from '../src/lib/seo-utils';
import { Stores } from '../src/components/sections/stores';
import { useEnhancedSEO } from '../src/hooks/useEnhancedSEO';

export default function RetailersPage() {
  const { t, locale } = useTranslation();
  const canonicalUrl = getLocalizedUrl('/retailers', locale);

  // Retailer-focused FAQs for schema
  const retailerFaqs = [
    {
      question: "What are the wholesale margins for Purrify?",
      answer: "Retailers enjoy 50%+ margins on Purrify products. We offer volume-based discounts starting at 24 units, with additional savings at 48+ and 96+ unit orders."
    },
    {
      question: "What marketing support do you provide?",
      answer: "We provide free POS materials, product displays, training resources, and co-op advertising opportunities. Our team also offers social media assets and promotional support for launches."
    },
    {
      question: "What is the minimum order quantity?",
      answer: "Our minimum order is 24 units for the first order. Subsequent orders have flexible minimums. We also offer a starter kit for retailers wanting to test the market first."
    },
    {
      question: "How quickly do wholesale orders ship?",
      answer: "Wholesale orders ship within 2-3 business days from our Montreal warehouse. We offer free shipping on orders over $200 within Canada."
    },
    {
      question: "Do you provide product training?",
      answer: "Yes! We offer free product training for your staff via video call or in-person (GTA and Montreal areas). We also provide printed materials explaining key selling points."
    }
  ];

  // Enhanced SEO with FAQ schema and breadcrumbs
  const { nextSeoProps, schema, breadcrumb } = useEnhancedSEO({
    path: '/retailers',
    title: `${SITE_NAME} - ${t.retailers.seo.pageTitle}`,
    description: t.retailers.seo.description,
    targetKeyword: 'wholesale cat litter',
    keywords: t.retailers.seo.keywords?.split(', ') || [
      'wholesale pet products',
      'cat litter wholesale Canada',
      'pet store supplier',
      'wholesale pet supplies'
    ],
    schemaType: 'faq',
    schemaData: {
      questions: retailerFaqs
    },
  });

  return (
    <>
      <NextSeo {...nextSeoProps} />

      {/* FAQ Schema + Breadcrumbs from useEnhancedSEO */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <Head>
        {/* Organization Schema for B2B Wholesale */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Purrify Wholesale",
              "description": "Wholesale cat litter deodorizer supplier for pet stores, veterinary clinics, and pet care businesses across Canada and USA.",
              "url": canonicalUrl,
              "logo": "https://www.purrify.ca/images/purrify-logo.png",
              "areaServed": ["Canada", "United States"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Purrify Wholesale Products",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Purrify Activated Carbon Cat Litter Deodorizer",
                      "description": "Water-filter grade activated carbon for litter box odor control"
                    },
                    "eligibleCustomerType": "Business",
                    "priceSpecification": {
                      "@type": "PriceSpecification",
                      "priceCurrency": "CAD",
                      "description": "50%+ retail margins, volume discounts available"
                    }
                  }
                ]
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "wholesale inquiries",
                "email": "wholesale@purrify.ca",
                "areaServed": ["CA", "US"]
              }
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Breadcrumb Navigation */}
        {breadcrumb && breadcrumb.items.length > 1 && (
          <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4">
              <nav aria-label="Breadcrumb" className="py-3">
                <ol className="flex items-center space-x-2 text-sm">
                  {breadcrumb.items.map((item, index) => {
                    const isLast = index === breadcrumb.items.length - 1;
                    return (
                      <li key={item.path} className="flex items-center">
                        {index > 0 && (
                          <ChevronRight className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-500" />
                        )}
                        {index === 0 ? (
                          <Link
                            href={item.path}
                            className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                          >
                            <Home className="h-4 w-4" />
                            <span className="sr-only">{item.name}</span>
                          </Link>
                        ) : isLast ? (
                          <span
                            className="font-medium text-gray-900 dark:text-gray-100"
                            aria-current="page"
                          >
                            {item.name}
                          </span>
                        ) : (
                          <Link
                            href={item.path}
                            className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                          >
                            {item.name}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>
          </div>
        )}
        <RetailerHero />

        <WholesalePricing />

        <RetailerContact />

        {/* Client Locations Map */}
        <ClientLocationsMap
          className="bg-gray-50 dark:bg-gray-900/50"
          height="400"
          headerTitle={t.retailers.map.title}
          headerDescription={t.retailers.map.description}
        />

        {/* Retail Store Locations with Logos */}
        <Stores />
      </main>
    </>
  );
}
