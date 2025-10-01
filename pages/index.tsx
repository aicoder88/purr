import { NextSeo } from 'next-seo';
import { Hero } from '../src/components/sections/hero';
import { About } from '../src/components/sections/about';
import { HowItWorks } from '../src/components/sections/how-it-works';
import { WhyPurrify } from '../src/components/sections/why-purrify';
import dynamic from 'next/dynamic';

// Above-the-fold banner should be SSR to avoid CLS
import { UrgencyBanner, StickyUrgencyBar } from '../src/components/sections/urgency-banner';
import { LazyLoad } from '../src/components/performance/LazyLoad';

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
const SubscriptionOffer = dynamic(() => import('../src/components/sections/subscription-offer').then(mod => ({ default: mod.SubscriptionOffer })), {
  ssr: false,
  loading: () => sectionSkeleton('h-72')
});
const Stores = dynamic(() => import('../src/components/sections/stores').then(mod => ({ default: mod.Stores })), {
  ssr: false,
  loading: () => sectionSkeleton('h-64')
});
const Testimonials = dynamic(() => import('../src/components/sections/testimonials').then(mod => ({ default: mod.Testimonials })), {
  ssr: false,
  loading: () => sectionSkeleton('h-96')
});
const FAQ = dynamic(() => import('../src/components/sections/faq').then(mod => ({ default: mod.FAQ })), {
  ssr: false,
  loading: () => sectionSkeleton('h-96')
});
const Newsletter = dynamic(() => import('../src/components/sections/newsletter').then(mod => ({ default: mod.Newsletter })), {
  ssr: false,
  loading: () => sectionSkeleton('h-72')
});
const CTA = dynamic(() => import('../src/components/sections/cta').then(mod => ({ default: mod.CTA })), {
  ssr: false,
  loading: () => sectionSkeleton('h-64')
});
const Contact = dynamic(() => import('../src/components/sections/contact').then(mod => ({ default: mod.Contact })), {
  ssr: false,
  loading: () => sectionSkeleton('h-80')
});
const BlogPreview = dynamic(() => import('../src/components/sections/blog-preview').then(mod => ({ default: mod.BlogPreview })), {
  ssr: false,
  loading: () => sectionSkeleton('h-80')
});
import { SITE_NAME, SITE_DESCRIPTION } from '../src/lib/constants';
import { useTranslation } from '../src/lib/translation-context';
import { SkipNav } from '../src/components/ui/skip-nav';
import { ErrorBoundary } from '../src/components/ui/error-boundary';
import { EnhancedStructuredData } from '../src/components/seo/enhanced-structured-data';
import { ComprehensiveStructuredData, useStructuredData } from '../src/components/seo/comprehensive-structured-data';
import { HomepageSchema } from '../src/components/seo/json-ld-schema';
import { TrustBadges } from '../src/components/social-proof/TrustBadges';
import { ClientLocationsMap } from '../src/components/maps/ClientLocationsMap';
import { buildAvailabilityUrl, buildLanguageAlternates, getLocalizedUrl, getPriceValidityDate } from '../src/lib/seo-utils';

export default function Home() {
  const { t, locale } = useTranslation();
  const pageTitle = `${SITE_NAME} - ${t.homepage.seo.pageTitle}`;
  const pageDescription = t.siteDescription || SITE_DESCRIPTION;
  const canonicalUrl = getLocalizedUrl('/', locale);
  const shareImage = 'https://www.purrify.ca/purrify-logo.png';
  const { generateBreadcrumbs } = useStructuredData();
  const languageAlternates = buildLanguageAlternates('/');
  const priceValidUntil = getPriceValidityDate();
  const availabilityUrl = buildAvailabilityUrl();

  // Generate breadcrumbs for home page
  const breadcrumbs = generateBreadcrumbs('/');

  return (
    <>
      <SkipNav />
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
              url: shareImage,
              width: 1200,
              height: 800,
              alt: `${SITE_NAME} - ${t.homepage.seo.openGraphImageAlt}`,
              type: 'image/png',
            },
            {
              url: 'https://www.purrify.ca/optimized/cat_rose_thumbnail.webp',
              width: 500,
              height: 340,
              alt: t.homepage.seo.videoDescription,
              type: 'image/webp',
            },
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
            content: t.homepage.seo.keywords,
          },
          {
            name: 'robots',
            content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          {
            // Removed duplicate description to avoid multiple meta description tags
            name: 'application-name',
            content: SITE_NAME,
          },
          // Additional SEO meta tags for better performance
          {
            content: SITE_NAME,
            name: 'author',
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
          ...languageAlternates.map(({ hrefLang, href }) => ({
            rel: 'alternate',
            hrefLang,
            href,
          })),
          // Preload critical resources
          {
            rel: 'preload',
            href: '/optimized/cat_rose_thumbnail.avif',
            as: 'image',
            type: 'image/avif',
          },
        ]}
      />

      {/* Enhanced Structured Data */}
      <EnhancedStructuredData />
      
      {/* Comprehensive Structured Data */}
      <ComprehensiveStructuredData 
        pageType="home" 
        pageData={{
          title: pageTitle,
          description: SITE_DESCRIPTION,
          url: canonicalUrl,
          breadcrumbs: breadcrumbs
        }}
      />
      
      {/* Advanced JSON-LD Schema for Homepage */}
      <HomepageSchema locale='en' />
      
      {/* Enhanced JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://www.purrify.ca/#organization",
                "name": t.structuredData.organization.name,
                "url": "https://www.purrify.ca",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.purrify.ca/purrify-logo.png",
                  "width": 400,
                  "height": 400
                },
                "image": "https://www.purrify.ca/purrify-logo.png",
                "description": t.structuredData.organization.description,
                "foundingDate": t.structuredData.organization.foundingDate,
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "109-17680 Rue Charles",
                  "addressLocality": "Mirabel",
                  "addressRegion": "QC",
                  "postalCode": "J7J 0T6",
                  "addressCountry": "CA"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "45.6501",
                  "longitude": "-73.8359"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": t.structuredData.organization.contactPoint.telephone,
                  "email": t.structuredData.organization.contactPoint.email,
                  "contactType": t.structuredData.organization.contactPoint.contactType,
                  "areaServed": t.structuredData.organization.contactPoint.areaServed,
                  "availableLanguage": t.structuredData.organization.contactPoint.availableLanguage
                },
                "sameAs": [
                  "https://facebook.com/purrify",
                  "https://instagram.com/purrify",
                  "https://twitter.com/purrify",
                  "https://www.linkedin.com/company/purrify"
                ],
                "areaServed": {
                  "@type": "Country",
                  "name": t.structuredData.organization.areaServed
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": t.structuredData.offerCatalog.name,
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": t.structuredData.offerCatalog.products.trial.name,
                        "description": t.structuredData.offerCatalog.products.trial.description,
                        "sku": t.structuredData.offerCatalog.products.trial.sku,
                        "image": "https://www.purrify.ca/optimized/20g.webp"
                      },
                      "price": "6.99",
                      "priceCurrency": "CAD",
                      "priceValidUntil": priceValidUntil,
                      "availability": availabilityUrl,
                      "url": "https://www.purrify.ca/products/trial-size"
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": t.structuredData.offerCatalog.products.standard.name,
                        "description": t.structuredData.offerCatalog.products.standard.description,
                        "sku": t.structuredData.offerCatalog.products.standard.sku,
                        "image": "https://www.purrify.ca/optimized/60g.webp"
                      },
                      "price": "19.99",
                      "priceCurrency": "CAD",
                      "priceValidUntil": priceValidUntil,
                      "availability": availabilityUrl,
                      "url": "https://www.purrify.ca/products/standard"
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": t.structuredData.offerCatalog.products.family.name,
                        "description": t.structuredData.offerCatalog.products.family.description,
                        "sku": t.structuredData.offerCatalog.products.family.sku,
                        "image": "https://www.purrify.ca/optimized/140g.webp"
                      },
                      "price": "29.99",
                      "priceCurrency": "CAD",
                      "priceValidUntil": priceValidUntil,
                      "availability": availabilityUrl,
                      "url": "https://www.purrify.ca/products/family-pack"
                    }
                  ]
                },
                "priceRange": t.structuredData.offerCatalog.priceRange
              },
              {
                "@type": "WebSite",
                "@id": "https://www.purrify.ca/#website",
                "url": "https://www.purrify.ca",
                "name": t.structuredData.website.name,
                "description": t.structuredData.website.description,
                "publisher": {
                  "@id": "https://www.purrify.ca/#organization"
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://www.purrify.ca/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                },
                "inLanguage": t.structuredData.website.inLanguage
              }
            ]
          })
        }}
      />

      {/* Urgency Banner at the top */}
      <UrgencyBanner />
      
      <main id="main-content" role="main">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <About />
          </ErrorBoundary>
        </div>
        
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <HowItWorks />
          </ErrorBoundary>
        </div>
        
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <WhyPurrify />
          </ErrorBoundary>
        </div>
        
        {/* Enhanced Product Comparison for better conversions */}
        <div className="cv-auto cis-960">
          <ErrorBoundary>
            <LazyLoad
              placeholder={sectionSkeleton('h-96', 'rounded-lg')}
            >
              <EnhancedProductComparison />
            </LazyLoad>
          </ErrorBoundary>
        </div>
        
        {/* Subscription Offer for recurring revenue */}
        <div className="cv-auto cis-480">
          <ErrorBoundary>
            <LazyLoad
              placeholder={sectionSkeleton('h-72')}
            >
              <SubscriptionOffer />
            </LazyLoad>
          </ErrorBoundary>
        </div>
        
        {/* Trust Badges for Customer Confidence */}
        <section className="py-8 bg-gray-50 dark:bg-gray-900/50 cv-auto cis-480">
          <div className="container mx-auto px-4">
            <TrustBadges variant="grid" showIcons={true} />
          </div>
        </section>
        
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <LazyLoad
              placeholder={sectionSkeleton('h-64')}
            >
              <Stores />
            </LazyLoad>
          </ErrorBoundary>
        </div>
        
        <div className="cv-auto cis-960">
          <ErrorBoundary>
            <LazyLoad
              placeholder={sectionSkeleton('h-96')}
            >
              <Testimonials />
            </LazyLoad>
          </ErrorBoundary>
        </div>

        {/* Client Locations Map */}
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <ClientLocationsMap
              className="bg-gray-50 dark:bg-gray-900/50"
              height="400"
            />
          </ErrorBoundary>
        </div>

        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <LazyLoad
              placeholder={sectionSkeleton('h-96')}
            >
              <FAQ includeStructuredData={true} />
            </LazyLoad>
          </ErrorBoundary>
        </div>
        
        <div className="cv-auto cis-480">
          <ErrorBoundary>
            <LazyLoad
              placeholder={sectionSkeleton('h-72')}
            >
              <Newsletter />
            </LazyLoad>
          </ErrorBoundary>
        </div>
        
        <div className="cv-auto cis-480">
          <ErrorBoundary>
            <LazyLoad
              placeholder={sectionSkeleton('h-64')}
            >
              <CTA />
            </LazyLoad>
          </ErrorBoundary>
        </div>
        
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <LazyLoad
              placeholder={sectionSkeleton('h-80')}
            >
              <Contact />
            </LazyLoad>
          </ErrorBoundary>
        </div>
        
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <LazyLoad
              placeholder={sectionSkeleton('h-80')}
            >
              <BlogPreview />
            </LazyLoad>
          </ErrorBoundary>
        </div>
      </main>
      
      
      {/* Sticky Urgency Bar for persistent conversion pressure */}
      <StickyUrgencyBar />
      
      {/* Social Proof Components - Temporarily disabled */}
      {/* <PurchaseNotifications 
        position="bottom-left"
        autoHide={true}
        hideDelay={5000}
      /> */}
    </>
  );
}
