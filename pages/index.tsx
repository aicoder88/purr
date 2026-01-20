import { NextSeo } from 'next-seo';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Hero } from '../src/components/sections/hero';
import { ScienceSection } from '../src/components/sections/science-section';
import { HowItWorks } from '../src/components/sections/how-it-works';
import { WhyPurrify } from '../src/components/sections/why-purrify';
import dynamic from 'next/dynamic';
import { BlogPreview } from '../src/components/sections/blog-preview';

// Above-the-fold banner should be SSR to avoid CLS
import { ScrollingAnnouncementBar } from '../src/components/sections/scrolling-announcement-bar';
import { LazyLoad } from '../src/components/performance/LazyLoad';

// A/B Testing
import { useABTestWithTracking, AB_TEST_SLUGS } from '../src/lib/ab-testing';

const sectionSkeleton = (height: string, rounding: string = 'rounded-2xl') => (
  <div
    className={`${height} ${rounding} bg-gray-50 dark:bg-gray-800/70 animate-pulse`}
    aria-hidden="true"
  />
);

// Dynamically import below-the-fold sections to improve initial page load
const EnhancedProductComparison = dynamic(() => import('../src/components/sections/enhanced-product-comparison').then(mod => ({ default: mod.EnhancedProductComparison })), {
  ssr: false,
  loading: () => sectionSkeleton('h-96', 'rounded-lg')
});
const CTA = dynamic(() => import('../src/components/sections/cta').then(mod => ({ default: mod.CTA })), {
  ssr: false,
  loading: () => sectionSkeleton('h-64')
});
import { SITE_NAME, SITE_DESCRIPTION, CONTACT_INFO, SOCIAL_LINKS } from '../src/lib/constants';
import { useTranslation } from '../src/lib/translation-context';
import { useCurrency } from '../src/lib/currency-context';
import { getSEOMeta } from '../src/translations/seo-meta';
import { useEnhancedSEO } from '../src/hooks/useEnhancedSEO';

import { SkipNav } from '../src/components/ui/skip-nav';
import { ErrorBoundary } from '../src/components/ui/error-boundary';
import { TrustBadges } from '../src/components/social-proof/TrustBadges';
import { ClientLocationsMap } from '../src/components/maps/ClientLocationsMap';
import { SocialProofBadges } from '../src/components/sections/SocialProofBadges';
import { generateHomepageSchema, generateJSONLD, getPriceValidityDate } from '../src/lib/seo-utils';
import { ScrollAnchor } from '../src/components/ui/scroll-anchor';
import { Stores } from '../src/components/sections/stores';

interface HomePageProps {
  priceValidUntil: string;
}

export default function Home({ priceValidUntil }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t, locale } = useTranslation();
  const { currency } = useCurrency();

  // Use optimized SEO meta content
  const seoMeta = getSEOMeta(locale as 'en' | 'fr' | 'zh' | 'es', 'homepage');
  const pageTitle = seoMeta?.title || `${SITE_NAME} - ${t.homepage.seo.pageTitle}`;
  const pageDescription = seoMeta?.description || t.siteDescription || SITE_DESCRIPTION;

  // Use enhanced SEO hook for automated optimization
  const { nextSeoProps, schema } = useEnhancedSEO({
    path: '/',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'cat litter deodorizer',
    schemaType: 'organization',
    keywords: t.homepage.seo.keywords?.split(', '),
    includeBreadcrumb: true,
  });


  // A/B Test: Social Proof Position (badges moved to bottom of page)
  const {
    trackConversion: trackSocialProofConversion,
  } = useABTestWithTracking(AB_TEST_SLUGS.SOCIAL_PROOF_POSITION);

  return (
    <>
      <SkipNav />
      <NextSeo
        {...nextSeoProps}
        additionalMetaTags={[
          ...nextSeoProps.additionalMetaTags,
          {
            name: 'robots',
            content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          {
            name: 'application-name',
            content: SITE_NAME,
          },
          {
            name: 'apple-mobile-web-app-title',
            content: SITE_NAME,
          },
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0',
          },
        ]}
        additionalLinkTags={[
          // Preload critical resources
          {
            rel: 'preload',
            href: '/optimized/cat_rose_thumbnail.avif',
            as: 'image',
            type: 'image/avif',
          },
        ]}
      />

      {/* Enhanced JSON-LD Schemas - Auto-generated Homepage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJSONLD(generateHomepageSchema(locale, currency))}
      />

      <main id="main-content" role="main" className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
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

        {/* Enhanced Product Comparison - Track conversion when user scrolls here */}
        <div className="cv-auto cis-960">
          <ScrollAnchor id="products" onVisible={trackSocialProofConversion} />
          <ErrorBoundary>
            <LazyLoad placeholder={sectionSkeleton('h-96', 'rounded-lg')}>
              <EnhancedProductComparison />
            </LazyLoad>
          </ErrorBoundary>
        </div>

        {/* Trust Badges - Improved spacing */}
        <section className="py-16 bg-white dark:bg-gray-800 cv-auto cis-480">
          <div className="container mx-auto px-4">
            <TrustBadges variant="grid" showIcons={true} />
          </div>
        </section>

        {/* Client Locations Map */}
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <ClientLocationsMap
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

        {/* CTA Section */}
        <div className="cv-auto cis-480">
          <ErrorBoundary>
            <LazyLoad placeholder={sectionSkeleton('h-64')}>
              <CTA />
            </LazyLoad>
          </ErrorBoundary>
        </div>

        {/* Blog Preview */}
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <BlogPreview />
          </ErrorBoundary>
        </div>

        {/* Social Proof Badges - Trusted & Verified */}
        <ErrorBoundary>
          <SocialProofBadges />
        </ErrorBoundary>
      </main>

      {/* Social Proof Components - Temporarily disabled */}
      {/* <PurchaseNotifications
        position="bottom-left"
        autoHide={true}
        hideDelay={5000}
      /> */}
    </>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  return {
    props: {
      priceValidUntil: getPriceValidityDate(),
    },
    // Revalidate every hour for ISR
    revalidate: 3600,
  };
};
