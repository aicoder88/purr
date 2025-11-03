import { NextSeo } from 'next-seo';
import { Hero } from '../src/components/sections/hero';
import { About } from '../src/components/sections/about';
import { HowItWorks } from '../src/components/sections/how-it-works';
import { WhyPurrify } from '../src/components/sections/why-purrify';
import dynamic from 'next/dynamic';
import { BlogPreview } from '../src/components/sections/blog-preview';

// Above-the-fold banner should be SSR to avoid CLS
import { ScrollingAnnouncementBar } from '../src/components/sections/scrolling-announcement-bar';
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
const CTA = dynamic(() => import('../src/components/sections/cta').then(mod => ({ default: mod.CTA })), {
  ssr: false,
  loading: () => sectionSkeleton('h-64')
});
import { SITE_NAME, SITE_DESCRIPTION, CONTACT_INFO, SOCIAL_LINKS } from '../src/lib/constants';
import { formatProductPrice, getProductPrice, getPriceRange } from '../src/lib/pricing';
import { useTranslation } from '../src/lib/translation-context';
import { SkipNav } from '../src/components/ui/skip-nav';
import { ErrorBoundary } from '../src/components/ui/error-boundary';
import { TrustBadges } from '../src/components/social-proof/TrustBadges';
import { ClientLocationsMap } from '../src/components/maps/ClientLocationsMap';
import { buildAvailabilityUrl, buildLanguageAlternates, getLocalizedUrl, getPriceValidityDate } from '../src/lib/seo-utils';
import { ScrollAnchor } from '../src/components/ui/scroll-anchor';
import { Stores } from '../src/components/sections/stores';

export default function Home() {
  const { t, locale } = useTranslation();
  const pageTitle = `${SITE_NAME} - ${t.homepage.seo.pageTitle}`;
  const pageDescription = t.siteDescription || SITE_DESCRIPTION;
  const canonicalUrl = getLocalizedUrl('/', locale);
  const shareImage = 'https://www.purrify.ca/purrify-logo.png';
  const languageAlternates = buildLanguageAlternates('/');
  const priceValidUntil = getPriceValidityDate();
  const availabilityUrl = buildAvailabilityUrl();
  const trialPrice = formatProductPrice('trial', locale);
  const standardPrice = formatProductPrice('standard', locale);
  const familyPrice = formatProductPrice('family', locale);
  const trialPriceValue = getProductPrice('trial').toFixed(2);
  const standardPriceValue = getProductPrice('standard').toFixed(2);
  const familyPriceValue = getProductPrice('family').toFixed(2);
  const priceRange = getPriceRange(locale);

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
          // Preload critical resources
          {
            rel: 'preload',
            href: '/optimized/cat_rose_thumbnail.avif',
            as: 'image',
            type: 'image/avif',
          },
        ]}
      />

      {/* Enhanced JSON-LD Schemas with Product Catalog */}
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
                  "telephone": CONTACT_INFO.phoneInternational,
                  "email": t.structuredData.organization.contactPoint.email,
                  "contactType": t.structuredData.organization.contactPoint.contactType,
                  "areaServed": t.structuredData.organization.contactPoint.areaServed,
                  "availableLanguage": t.structuredData.organization.contactPoint.availableLanguage
                },
                "sameAs": Object.values(SOCIAL_LINKS),
                "areaServed": {
                  "@type": "Country",
                  "name": t.structuredData.organization.areaServed
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": t.structuredData.offerCatalog.name,
                  "itemListElement": [
                    {
                      "@type": "Product",
                      "name": t.structuredData.offerCatalog.products.trial.name,
                      "description": t.structuredData.offerCatalog.products.trial.description,
                      "sku": t.structuredData.offerCatalog.products.trial.sku,
                      "image": "https://www.purrify.ca/optimized/20g.webp",
                      "offers": {
                        "@type": "Offer",
                        "price": trialPriceValue,
                        "priceCurrency": "CAD",
                        "priceValidUntil": priceValidUntil,
                        "availability": availabilityUrl,
                        "url": "https://www.purrify.ca/products/trial-size"
                      }
                    },
                    {
                      "@type": "Product",
                      "name": t.structuredData.offerCatalog.products.standard.name,
                      "description": t.structuredData.offerCatalog.products.standard.description,
                      "sku": t.structuredData.offerCatalog.products.standard.sku,
                      "image": "https://www.purrify.ca/optimized/60g.webp",
                      "offers": {
                        "@type": "Offer",
                        "price": standardPriceValue,
                        "priceCurrency": "CAD",
                        "priceValidUntil": priceValidUntil,
                        "availability": availabilityUrl,
                        "url": "https://www.purrify.ca/products/standard"
                      }
                    },
                    {
                      "@type": "Product",
                      "name": t.structuredData.offerCatalog.products.family.name,
                      "description": t.structuredData.offerCatalog.products.family.description,
                      "sku": t.structuredData.offerCatalog.products.family.sku,
                      "image": "https://www.purrify.ca/optimized/140g.webp",
                      "offers": {
                        "@type": "Offer",
                        "price": familyPriceValue,
                        "priceCurrency": "CAD",
                        "priceValidUntil": priceValidUntil,
                        "availability": availabilityUrl,
                        "url": "https://www.purrify.ca/products/family-pack"
                      }
                    }
                  ]
                },
                "priceRange": priceRange.formatted
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

      <main id="main-content" role="main">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>

        {/* Scrolling Announcement Bar below hero */}
        <ScrollingAnnouncementBar />

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

        {/* Enhanced Product Comparison - shown after user understands the product */}
        <div className="cv-auto cis-960">
          <ScrollAnchor id="products" />
          <ErrorBoundary>
            <LazyLoad
              placeholder={sectionSkeleton('h-96', 'rounded-lg')}
            >
              <EnhancedProductComparison />
            </LazyLoad>
          </ErrorBoundary>
        </div>

        {/* Trust Badges for Customer Confidence */}
        <section className="py-8 bg-gray-50 dark:bg-gray-900/50 cv-auto cis-480">
          <div className="container mx-auto px-4">
            <TrustBadges variant="grid" showIcons={true} />
          </div>
        </section>


        {/* Client Locations Map */}
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <ClientLocationsMap
              className="bg-gray-50 dark:bg-gray-900/50"
              height="400"
            />
          </ErrorBoundary>
        </div>

        {/* Retail Store Locations with Logos */}
        <div className="cv-auto cis-720">
          <ErrorBoundary>
            <Stores />
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
            <BlogPreview />
          </ErrorBoundary>
        </div>
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
