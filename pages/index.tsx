import { NextSeo } from 'next-seo';
import { Hero } from '../src/components/sections/hero';
import { About } from '../src/components/sections/about';
import { HowItWorks } from '../src/components/sections/how-it-works';
import { WhyPurrify } from '../src/components/sections/why-purrify';
import { Products } from '../src/components/sections/products';
import { Stores } from '../src/components/sections/stores';
import { Testimonials } from '../src/components/sections/testimonials';
import { FAQ } from '../src/components/sections/faq';
import { Newsletter } from '../src/components/sections/newsletter';
import { CTA } from '../src/components/sections/cta';
import { Contact } from '../src/components/sections/contact';
import { BlogPreview } from '../src/components/sections/blog-preview';
import { SITE_NAME, SITE_DESCRIPTION } from '../src/lib/constants';
import { SkipNav } from '../src/components/ui/skip-nav';
import { ErrorBoundary } from '../src/components/ui/error-boundary';
import { EnhancedStructuredData } from '../src/components/seo/enhanced-structured-data';
import { PurchaseNotifications } from '../src/components/social-proof/PurchaseNotifications';
import { TrustBadges } from '../src/components/social-proof/TrustBadges';
import { OptimizedImage } from '../src/components/performance/OptimizedImage';

export default function Home() {
  const pageTitle = `${SITE_NAME} - Activated Carbon Cat Litter Additive`;
  const canonicalUrl = 'https://purrify.ca/';
  
  return (
    <>
      <SkipNav />
      <NextSeo
        title={pageTitle}
        description={SITE_DESCRIPTION}
        canonical={canonicalUrl}
        openGraph={{
          type: 'website',
          url: canonicalUrl,
          title: pageTitle,
          description: SITE_DESCRIPTION,
          images: [
            {
              url: 'https://purrify.ca/purrify-logo.png',
              width: 1200,
              height: 630,
              alt: `${SITE_NAME} - Premium Cat Litter Odor Control Solution`,
              type: 'image/png',
            },
            {
              url: 'https://purrify.ca/optimized/cat_rose_thumbnail.webp',
              width: 500,
              height: 340,
              alt: 'Purrify Cat Litter Additive in Action - Before and After Demonstration',
              type: 'image/webp',
            },
          ],
          videos: [
            {
              url: 'https://purrify.ca/videos/cat_rose_optimized.mp4',
              width: 1280,
              height: 720,
              type: 'video/mp4',
              alt: 'Purrify Cat Litter Additive Effectiveness Demonstration',
            },
            {
              url: 'https://purrify.ca/videos/cat_rose_optimized.webm',
              width: 1280,
              height: 720,
              type: 'video/webm',
              alt: 'Purrify Cat Litter Additive Effectiveness Demonstration',
            }
          ],
        }}
        twitter={{
          handle: '@purrify',
          site: '@purrify',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'cat litter odor control, activated carbon cat litter, natural cat litter additive, eco-friendly pet odor control, cat litter deodorizer, pet odor elimination, cat care products, natural odor control, cat litter solution, pet supplies Canada',
          },
          {
            name: 'robots',
            content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          {
            name: 'video:duration',
            content: '30',
          },
          {
            name: 'video:release_date',
            content: '2023-09-01T08:00:00+08:00',
          },
          {
            property: 'og:video:secure_url',
            content: 'https://purrify.ca/videos/cat_rose_optimized.mp4',
          },
          {
            property: 'og:video:type',
            content: 'video/mp4',
          },
          {
            property: 'og:video:width',
            content: '1280',
          },
          {
            property: 'og:video:height',
            content: '720',
          },
          {
            name: 'description',
            content: 'Purrify is a premium activated carbon cat litter additive that eliminates odors at the molecular level. Made from natural coconut shell carbon, it provides 7-day freshness and works with any litter type. Trusted by thousands of cat owners across Canada.',
          },
          // Additional SEO meta tags for better performance
          {
            name: 'author',
            content: SITE_NAME,
          },
          {
            name: 'application-name',
            content: SITE_NAME,
          },
          {
            property: 'og:site_name',
            content: SITE_NAME,
          },
          {
            name: 'apple-mobile-web-app-title',
            content: SITE_NAME,
          },
          // Performance hints
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0',
          },
          {
            httpEquiv: 'x-ua-compatible',
            content: 'IE=edge',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            rel: 'alternate',
            hrefLang: 'en',
            href: canonicalUrl,
          },
          {
            rel: 'alternate',
            hrefLang: 'fr',
            href: `${canonicalUrl}fr/`,
          },
          {
            rel: 'alternate',
            hrefLang: 'x-default',
            href: canonicalUrl,
          },
          // Preload critical resources
          {
            rel: 'preload',
            href: '/optimized/cat_rose_thumbnail.webp',
            as: 'image',
            type: 'image/webp',
          },
          {
            rel: 'preload',
            href: '/videos/cat_rose_optimized.webm',
            as: 'video',
            type: 'video/webm',
          },
        ]}
      />

      {/* Enhanced Structured Data */}
      <EnhancedStructuredData pageType="home" />

      <main id="main-content" role="main">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <HowItWorks />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <WhyPurrify />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Products />
        </ErrorBoundary>
        
        {/* Trust Badges for Customer Confidence */}
        <section className="py-8 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <TrustBadges variant="grid" showIcons={true} />
          </div>
        </section>
        
        <ErrorBoundary>
          <Stores />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Testimonials />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <FAQ />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Newsletter />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <CTA />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <BlogPreview />
        </ErrorBoundary>
      </main>
      
      {/* Social Proof Components */}
      <PurchaseNotifications 
        position="bottom-left"
        showInterval={20000}
        autoHide={true}
        hideDelay={8000}
      />
    </>
  );
}