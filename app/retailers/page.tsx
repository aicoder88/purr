import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

// Retailer-specific components
import { RetailerHero } from '@/components/sections/retailer-hero';
import { WholesalePricing } from '@/components/sections/wholesale-pricing';
import { RetailerContact } from '@/components/sections/retailer-contact';
import { ClientLocationsMap } from '@/components/maps/ClientLocationsMap';
import { Stores } from '@/components/sections/stores';

import { SITE_NAME } from '@/lib/constants';
import { stripContext } from '@/lib/seo-utils';
import { getTranslation } from '@/translations';

// Default to English for metadata
const t = getTranslation('en');
const canonicalUrl = 'https://www.purrify.ca/retailers/';

export const metadata: Metadata = {
  title: `${SITE_NAME} - ${t.retailers.seo.pageTitle}`,
  description: t.retailers.seo.description,
  keywords: t.retailers.seo.keywords?.split(', ') || [
    'wholesale pet products',
    'cat litter wholesale Canada',
    'pet store supplier',
    'wholesale pet supplies'
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: `${SITE_NAME} - ${t.retailers.seo.pageTitle}`,
    description: t.retailers.seo.description,
    url: canonicalUrl,
    type: 'website',
  },
  other: {
    'last-modified': '2025-12-19',
  },
};

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

// Organization schema for B2B Wholesale
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Purrify Wholesale",
  "description": "Wholesale cat litter deodorizer supplier for pet stores, veterinary clinics, and pet care businesses across Canada and USA.",
  "url": canonicalUrl,
  "logo": "https://www.purrify.ca/optimized/logos/purrify-logo.png",
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
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": retailerFaqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

// Breadcrumb schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.purrify.ca/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Retailers",
      "item": canonicalUrl
    }
  ]
};

export default function RetailersPage() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              stripContext(organizationSchema),
              stripContext(faqSchema),
              stripContext(breadcrumbSchema),
            ],
          }),
        }}
      />

      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4">
            <nav aria-label="Breadcrumb" className="py-3">
              <ol className="flex items-center space-x-2 text-sm">
                <li className="flex items-center">
                  <Link
                    href="/"
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    <span className="sr-only">Home</span>
                  </Link>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-500" />
                  <span
                    className="font-medium text-gray-900 dark:text-gray-100"
                    aria-current="page"
                  >
                    Retailers
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <RetailerHero />

        <WholesalePricing />

        <RetailerContact />

        {/* B2B Resources Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Retailer Resources
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Everything you need to successfully sell Purrify in your store
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/pos/"
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  POS Materials
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Download shelf talkers, posters, and display materials for your store
                </p>
              </Link>
              <Link
                href="/b2b/sell-sheet/"
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Sell Sheet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Product information and selling points for your staff
                </p>
              </Link>
              <Link
                href="/case-studies/"
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                  Success Stories
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  See how other retailers have increased sales with Purrify
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Retail Store Locations with Logos */}
        <ClientLocationsMap />
        <Stores />
      </main>
    </>
  );
}
