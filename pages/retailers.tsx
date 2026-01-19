import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useTranslation } from '../src/lib/translation-context';
import { SITE_NAME } from '../src/lib/constants';

// Retailer-specific components
import { RetailerHero } from '../src/components/sections/retailer-hero';
import { WholesalePricing } from '../src/components/sections/wholesale-pricing';
import { RetailerContact } from '../src/components/sections/retailer-contact';
import { ClientLocationsMap } from '../src/components/maps/ClientLocationsMap';
import { buildLanguageAlternates, getLocalizedUrl } from '../src/lib/seo-utils';
import { Stores } from '../src/components/sections/stores';

export default function RetailersPage() {
  const { t, locale } = useTranslation();
  const pageTitle = `${SITE_NAME} - ${t.retailers.seo.pageTitle}`;
  const pageDescription = t.retailers.seo.description;
  const canonicalUrl = getLocalizedUrl('/retailers', locale);
  const languageAlternates = buildLanguageAlternates('/retailers');

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

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        languageAlternates={languageAlternates}
        openGraph={{
          type: 'website',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          locale: locale === 'fr' ? 'fr_CA' : locale === 'zh' ? 'zh_CN' : 'en_CA',
          images: [
            {
              url: 'https://www.purrify.ca/purrify-logo.png',
              width: 1200,
              height: 630,
              alt: `${SITE_NAME} - ${t.retailers.seo.openGraphAlt}`,
              type: 'image/png',
            }
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: t.retailers.seo.keywords,
          },
          {
            name: 'robots',
            content: 'index, follow',
          },
        ]}
      />

      <Head>
        {/* FAQ Schema for Retailer Questions */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: retailerFaqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer
                }
              }))
            })
          }}
        />
        {/* Organization Schema for B2B */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Purrify Wholesale",
              "description": "Wholesale cat litter deodorizer supplier for pet stores, veterinary clinics, and pet care businesses across Canada and USA.",
              "url": canonicalUrl,
              "logo": "https://www.purrify.ca/purrify-logo.png",
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
