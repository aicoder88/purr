export const dynamic = 'force-static';

// Rename to avoid conflict with route segment config
import dynamicLoader from 'next/dynamic';
import { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { ScrollingAnnouncementBar } from '@/components/sections/scrolling-announcement-bar';
import { SkipNav } from '@/components/ui/skip-nav';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { TrustBadges } from '@/components/social-proof/TrustBadges';

import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { getSEOMeta } from '@/translations/seo-meta';
import {
  generateHomepageSchema,
  buildLanguageAlternates,
  getLocalizedKeywords,
  normalizeLocale,
  getPriceValidityDate,
} from '@/lib/seo-utils';
import { defaultLocale } from '@/i18n/config';
import type { Currency } from '@/lib/geo/currency-detector';

// Import client components
import { HomepageClient } from './homepage-client';

// Lazy load below-the-fold sections to reduce TBT and bundle size
const ScienceSection = dynamicLoader(() => import('@/components/sections/science-section').then(mod => mod.ScienceSection));
const HowItWorks = dynamicLoader(() => import('@/components/sections/how-it-works').then(mod => mod.HowItWorks));
const WhyPurrify = dynamicLoader(() => import('@/components/sections/why-purrify').then(mod => mod.WhyPurrify));
const BlogPreview = dynamicLoader(() => import('@/components/sections/blog-preview').then(mod => mod.BlogPreview));
const Stores = dynamicLoader(() => import('@/components/sections/stores').then(mod => mod.Stores));
// Wrapper component handles ssr: false internally to avoid Server Component limitations
import { ClientOnlyLocationsMap } from '@/components/maps/ClientOnlyLocationsMap';

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
  const canonicalUrl = `${baseUrl}${normalizedLocale === 'en' ? '' : `/${normalizedLocale}`}/`;
  const languageAlternates = buildLanguageAlternates('/');

  // Convert language alternates to Next.js format
  const alternates: Record<string, string> = {};
  languageAlternates.forEach((alt) => {
    alternates[alt.hrefLang] = alt.href;
  });

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
          url: '/images/Logos/purrify-logo.png',
          width: 1200,
          height: 800,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: pageTitle,
      description: pageDescription,
      images: ['/images/Logos/purrify-logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    applicationName: SITE_NAME,
    appleWebApp: {
      title: SITE_NAME,
    },
    other: {
      'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=5.0',
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

  // Generate structured data
  const structuredData = await generateStructuredData(defaultLocale, currency);

  return (
    <>
      <SkipNav />

      {/* Enhanced JSON-LD Schemas - Auto-generated Homepage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <main
        id="main-content"
        role="main"
        className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900"
      >
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>

        {/* Scrolling Announcement Bar below hero */}
        <ScrollingAnnouncementBar />

        {/* Science Section */}
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <ScienceSection />
          </ErrorBoundary>
        </div>

        {/* How It Works Section */}
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <HowItWorks />
          </ErrorBoundary>
        </div>

        {/* Why Purrify Section */}
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <WhyPurrify />
          </ErrorBoundary>
        </div>

        {/* Client-side wrapped sections for interactivity */}
        <HomepageClient
          priceValidUntil={getPriceValidityDate()}
          locale={defaultLocale}
          currency={currency}
        />

        {/* Trust Badges - Improved spacing and elegant design */}
        <section className="py-10 cv-auto cis-480">
          <div className="container mx-auto px-4">
            <TrustBadges variant="elegant" showIcons={true} />
          </div>
        </section>

        {/* Client Locations Map */}
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <ClientOnlyLocationsMap
              className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900"
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
