export const dynamic = 'force-static';

import { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { HowItWorks } from '@/components/sections/how-it-works';
import { AgitationSection } from '@/components/sections/agitation-section';
import { WhyPurrify } from '@/components/sections/why-purrify';
import { ScienceSection } from '@/components/sections/science-section';
import { HomepageTestimonials } from '@/components/sections/homepage-testimonials';
import { BlogPreview } from '@/components/sections/blog-preview';
import { ScrollingAnnouncementBar } from '@/components/sections/scrolling-announcement-bar';
import { Stores } from '@/components/sections/stores';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LazyClientLocationsMap } from '@/components/maps/LazyClientLocationsMap';

import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { getSEOMeta } from '@/translations/seo-meta';
import {
  getPriceValidityDate,
  generateHomepageSchema,
  getLocalizedKeywords,
  normalizeLocale,
} from '@/lib/seo-utils';
import { defaultLocale } from '@/i18n/config';
import type { Currency } from '@/lib/geo/currency-detector';

// Import client components
import { HomepageClient } from './homepage-client';

// Generate metadata for the homepage
export async function generateMetadata(): Promise<Metadata> {
  const normalizedLocale = normalizeLocale(defaultLocale);

  // Get SEO meta for homepage
  const seoMeta = getSEOMeta(normalizedLocale, 'homepage');
  const pageTitle = seoMeta?.title || `${SITE_NAME} - Activated Carbon Cat Litter Additive`;
  const pageDescription = seoMeta?.description || SITE_DESCRIPTION;
  const keywords = seoMeta?.targetKeyword
    ? [...getLocalizedKeywords(normalizedLocale), seoMeta.targetKeyword]
    : getLocalizedKeywords(normalizedLocale);

  // Build canonical and alternate URLs
  const baseUrl = 'https://www.purrify.ca';
  const canonicalUrl = `${baseUrl}/`;

  // Convert language alternates to Next.js format
  const alternates: Record<string, string> = {
    'en-CA': `${baseUrl}/`,
    'fr-CA': `${baseUrl}/fr/`,
    'en-US': `${baseUrl}/us/`,
    'x-default': `${baseUrl}/`,
  };

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords.join(', '),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: pageTitle,
      description: pageDescription,
      locale: normalizedLocale === 'fr' ? 'fr_CA' : 'en_CA',
      siteName: SITE_NAME,
      images: [
        {
          url: '/optimized/logos/purrify-logo.png',
          width: 1200,
          height: 800,
          alt: pageTitle,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    applicationName: SITE_NAME,
    appleWebApp: {
      title: SITE_NAME,
    },
  };
}

// Generate JSON-LD structured data
async function generateStructuredData(locale: string, currency: Currency) {
  const normalizedLocale = normalizeLocale(locale);
  const homepageSchema = generateHomepageSchema(normalizedLocale, currency);

  return {
    __html: JSON.stringify(homepageSchema, null, 2),
  };
}

// Async server component for the homepage
export default async function HomePage() {
  // For static generation, use default locale and currency
  // The actual currency/locale detection happens client-side via HomepageClient
  const currency: Currency = 'CAD';

  // Get price validity date (replaces getStaticProps)
  const priceValidUntil = getPriceValidityDate();

  // Generate structured data
  const structuredData = await generateStructuredData(defaultLocale, currency);

  return (
    <>
      {/* Enhanced JSON-LD Schemas - Auto-generated Homepage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <main
        id="main-content"
        role="main"
        className="overflow-x-clip bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 from-gray-950 via-purple-950/20 to-gray-900"
      >
        {/* Section 1: Hero */}
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>

        <ScrollingAnnouncementBar />

        {/* Section 4: The Story ("The Embarrassed Cat Owner") */}
        <ErrorBoundary>
          <AgitationSection />
        </ErrorBoundary>

        {/* Section 2: How It Works (Three-Step) */}
        <ErrorBoundary>
          <HowItWorks />
        </ErrorBoundary>

        {/* Section 5: Why Cat Parents Keep Coming Back (Features) */}
        <ErrorBoundary>
          <WhyPurrify />
        </ErrorBoundary>

        {/* Section 6: The Science ("The Secret Sauce") */}
        <ErrorBoundary>
          <ScienceSection />
        </ErrorBoundary>

        {/* Section 7: Products / Offer + CTA */}
        <HomepageClient
          priceValidUntil={priceValidUntil}
          locale={defaultLocale}
          currency={currency}
        />

        {/* Social Proof: Named Testimonials */}
        <ErrorBoundary>
          <HomepageTestimonials />
        </ErrorBoundary>

        {/* Client Locations Map */}
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <LazyClientLocationsMap
              className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 from-gray-950 via-purple-950/20 to-gray-900"
              height="400"
            />
          </ErrorBoundary>
        </div>

        {/* Retail Store Locations */}
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <Stores />
          </ErrorBoundary>
        </div>

        {/* Blog Preview */}
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <BlogPreview />
          </ErrorBoundary>
        </div>

      </main>
    </>
  );
}

// Static page - no revalidation needed
// export const revalidate = 3600;
