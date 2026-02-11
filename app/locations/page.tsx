import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { locationsByProvince, Province } from '@/data/locations';
import { getTranslation } from '@/translations';
import type { TranslationType } from '@/translations/types';
import { ChevronRight, Home } from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

// Generate metadata for the locations index page
export async function generateMetadata(): Promise<Metadata> {
  const t = getTranslation('en');
  const locations = t.locations;
  const seoTitle = locations ? `${locations.hub.heading} | ${SITE_NAME}` : `Locations | ${SITE_NAME}`;
  const seoDescription = locations?.hub.description ?? 'Find Purrify locations across Canada';
  
  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: `${SITE_URL}/locations`,
      languages: {
        'en-CA': `${SITE_URL}/locations`,
        // Note: Non-English location pages are excluded from sitemap (noindexed)
        // Only English version exists to prevent thin content
        'x-default': `${SITE_URL}/locations`,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `${SITE_URL}/locations`,
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_CA',
      images: [
        {
          url: `${SITE_URL}/images/Logos/purrify-logo.png`,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'last-modified': '2025-12-16',
    },
  };
}

// Breadcrumb schema
function generateBreadcrumbSchema(t: TranslationType) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t.nav.home,
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: `${SITE_URL}/locations`,
      },
    ],
  };
}

// LocalBusiness schema for Locations page
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Purrify Canada',
  description: 'Canadian manufacturer of activated carbon cat litter deodorizer with shipping across all provinces',
  url: 'https://www.purrify.ca/locations',
  logo: 'https://www.purrify.ca/images/icon-512.png',
  image: 'https://www.purrify.ca/images/products/purrify-standard-bag.png',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CA',
  },
  areaServed: [
    { '@type': 'State', name: 'Ontario' },
    { '@type': 'State', name: 'Quebec' },
    { '@type': 'State', name: 'British Columbia' },
    { '@type': 'State', name: 'Alberta' },
    { '@type': 'State', name: 'Manitoba' },
    { '@type': 'State', name: 'Saskatchewan' },
    { '@type': 'State', name: 'Nova Scotia' },
    { '@type': 'State', name: 'New Brunswick' },
    { '@type': 'State', name: 'Newfoundland and Labrador' },
    { '@type': 'State', name: 'Prince Edward Island' },
  ],
  priceRange: '$$',
  paymentAccepted: 'Credit Card, PayPal',
  currenciesAccepted: 'CAD',
};

export default function LocationsPage() {
  const t = getTranslation('en');
  const locations = t.locations;
  const provinces = locationsByProvince;

  if (!locations) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const breadcrumb = generateBreadcrumbSchema(t);

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        {/* Visual Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="bg-white/50 dark:bg-gray-800/50 border-b border-orange-100 dark:border-gray-700"
        >
          <Container>
            <ol className="flex items-center space-x-2 text-sm py-3">
              <li className="flex items-center">
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span className="sr-only">{t.nav.home}</span>
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-500" />
                <span
                  className="font-medium text-gray-900 dark:text-gray-100"
                  aria-current="page"
                >
                  Locations
                </span>
              </li>
            </ol>
          </Container>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <Container>
            <div className="max-w-5xl mx-auto text-center space-y-6">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/80 dark:bg-gray-800/70 border border-orange-200 dark:border-orange-500/60 text-xs sm:text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-300">
                {locations.hub.badge}
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-50">
                {locations.hub.heading}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
                {locations.hub.description}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/products/trial-size"
                  className="inline-flex items-center px-6 py-3 font-semibold text-white dark:text-gray-100 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg shadow-lg hover:from-orange-600 hover:to-pink-600 transition"
                >
                  {locations.hub.shopCta}
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Provinces Grid */}
        <section className="py-16 px-4 bg-white dark:bg-gray-900">
          <Container>
            <div className="max-w-5xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-50">
                {locations.hub.selectProvince}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {provinces.map((province: Province) => (
                  <Link
                    key={province.slug}
                    href={`/locations/province/${province.slug}`}
                    className="group flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70 p-6 transition hover:border-orange-300 dark:hover:border-orange-500/70 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 group-hover:text-orange-600 dark:group-hover:text-orange-300">
                        {province.name}
                      </h3>
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 font-bold text-sm group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition">
                        {province.code}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {province.cities.length === 1
                        ? locations.hub.cityAvailable
                        : locations.hub.citiesAvailable.replace('{{count}}', String(province.cities.length))}
                    </p>
                    <div className="mt-auto">
                      <span className="inline-flex items-center text-sm font-medium text-orange-600 dark:text-orange-300 group-hover:text-orange-700 dark:group-hover:text-orange-200">
                        {locations.hub.viewGuide}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Information Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8 text-center">
                {locations.hub.whyChoose}
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-800/70 border border-orange-200 dark:border-orange-500/60 mb-4">
                    <svg className="w-8 h-8 text-orange-600 dark:text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50">{locations.hub.fastShipping.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {locations.hub.fastShipping.description}
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-800/70 border border-orange-200 dark:border-orange-500/60 mb-4">
                    <svg className="w-8 h-8 text-orange-600 dark:text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50">{locations.hub.naturalSolution.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {locations.hub.naturalSolution.description}
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-800/70 border border-orange-200 dark:border-orange-500/60 mb-4">
                    <svg className="w-8 h-8 text-orange-600 dark:text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50">{locations.hub.localSupport.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {locations.hub.localSupport.description}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
