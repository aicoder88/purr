export const dynamic = 'force-static';

import { Metadata } from 'next';
import ReactDOM from 'react-dom';
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
import { ClientLocationsMap } from '@/components/maps/ClientLocationsMap';

import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { getSEOMeta } from '@/translations/seo-meta';
import {
  getPriceValidityDate,
  generateHomepageSchema,
  getLocalizedKeywords,
  normalizeLocale,
  getLocalizedUrl,
} from '@/lib/seo-utils';
import { defaultLocale } from '@/i18n/config';
import type { Currency } from '@/lib/geo/currency-detector';
import { ScopedIntlProvider } from '@/components/providers/ScopedIntlProvider';

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
  const canonicalUrl = getLocalizedUrl('/', defaultLocale);

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
    __html: JSON.stringify(homepageSchema),
  };
}

// Async server component for the homepage
export default async function HomePage() {
  ReactDOM.preload('/optimized/marketing/purrify-demo-poster.webp', {
    as: 'image',
    type: 'image/webp',
    fetchPriority: 'high',
  });

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

      <ScopedIntlProvider scopes={['root', 'home']}>
        <main
          id="main-content"
          role="main"
          className="overflow-x-clip bg-[linear-gradient(180deg,#fffdf7_0%,#fdf8f1_36%,#fffdf8_100%)] dark:bg-[linear-gradient(180deg,#030712_0%,#0b1220_52%,#030712_100%)]"
        >
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>

          <ScrollingAnnouncementBar />

          <ErrorBoundary>
            <HowItWorks />
          </ErrorBoundary>

          <ErrorBoundary>
            <WhyPurrify />
          </ErrorBoundary>

          <ErrorBoundary>
            <HomepageTestimonials />
          </ErrorBoundary>

          <HomepageClient
            priceValidUntil={priceValidUntil}
            locale={defaultLocale}
            currency={currency}
          />

          <ErrorBoundary>
            <ScienceSection />
          </ErrorBoundary>

          <ErrorBoundary>
            <AgitationSection />
          </ErrorBoundary>

          <ErrorBoundary>
            <Stores />
          </ErrorBoundary>

          <ErrorBoundary>
            <ClientLocationsMap
              className="bg-[linear-gradient(180deg,#fffdf7_0%,#fdf8f1_36%,#fffdf8_100%)] dark:bg-[linear-gradient(180deg,#030712_0%,#0b1220_52%,#030712_100%)]"
              height="400"
            />
          </ErrorBoundary>

          <ErrorBoundary>
            <BlogPreview />
          </ErrorBoundary>
        </main>
      </ScopedIntlProvider>
    </>
  );
}

// Static page - no revalidation needed
// export const revalidate = 3600;
