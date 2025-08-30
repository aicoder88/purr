import { NextSeo } from 'next-seo';
import { Hero } from '../src/components/sections/hero';
import { About } from '../src/components/sections/about';
import { HowItWorks } from '../src/components/sections/how-it-works';
import { WhyPurrify } from '../src/components/sections/why-purrify';
import { Products } from '../src/components/sections/products';
import dynamic from 'next/dynamic';

// Dynamically import components to improve initial page load
const EnhancedProductComparison = dynamic(() => import('../src/components/sections/enhanced-product-comparison').then(mod => ({ default: mod.EnhancedProductComparison })), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-lg" />
});
const SubscriptionOffer = dynamic(() => import('../src/components/sections/subscription-offer').then(mod => ({ default: mod.SubscriptionOffer })), { ssr: false });
const UrgencyBanner = dynamic(() => import('../src/components/sections/urgency-banner').then(mod => ({ default: mod.UrgencyBanner })), { ssr: false });
const StickyUrgencyBar = dynamic(() => import('../src/components/sections/urgency-banner').then(mod => ({ default: mod.StickyUrgencyBar })), { ssr: false });
const Stores = dynamic(() => import('../src/components/sections/stores').then(mod => ({ default: mod.Stores })), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-lg" />
});
const Testimonials = dynamic(() => import('../src/components/sections/testimonials').then(mod => ({ default: mod.Testimonials })), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-lg" />
});
const FAQ = dynamic(() => import('../src/components/sections/faq').then(mod => ({ default: mod.FAQ })), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-800 animate-pulse rounded-lg" />
});
const Newsletter = dynamic(() => import('../src/components/sections/newsletter').then(mod => ({ default: mod.Newsletter })), { ssr: false });
const CTA = dynamic(() => import('../src/components/sections/cta').then(mod => ({ default: mod.CTA })), { ssr: false });
const Contact = dynamic(() => import('../src/components/sections/contact').then(mod => ({ default: mod.Contact })), { ssr: false });
const BlogPreview = dynamic(() => import('../src/components/sections/blog-preview').then(mod => ({ default: mod.BlogPreview })), { ssr: false });
import { SITE_NAME, SITE_DESCRIPTION } from '../src/lib/constants';
import { useTranslation } from '../src/lib/translation-context';
import { SkipNav } from '../src/components/ui/skip-nav';
import { ErrorBoundary } from '../src/components/ui/error-boundary';
import { EnhancedStructuredData } from '../src/components/seo/enhanced-structured-data';
import { ComprehensiveStructuredData, useStructuredData } from '../src/components/seo/comprehensive-structured-data';
import { HomepageSchema } from '../src/components/seo/json-ld-schema';
import { PurchaseNotifications } from '../src/components/social-proof/PurchaseNotifications';
import { TrustBadges } from '../src/components/social-proof/TrustBadges';
import { OptimizedImage } from '../src/components/performance/OptimizedImage';

export default function Home() {
  const { t } = useTranslation();
  const pageTitle = `${SITE_NAME} - Activated Carbon Cat Litter Additive`;
  const canonicalUrl = 'https://purrify.ca/';
  const { generateBreadcrumbs } = useStructuredData();
  
  // Generate breadcrumbs for home page
  const breadcrumbs = generateBreadcrumbs('/');
  
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
            content: t.seo.metaDescription,
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
                "@id": "https://purrify.ca/#organization",
                "name": "Purrify",
                "url": "https://purrify.ca",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://purrify.ca/purrify-logo.png",
                  "width": 400,
                  "height": 400
                },
                "image": "https://purrify.ca/purrify-logo.png",
                "description": "Premium activated carbon cat litter additive that eliminates odors at the molecular level. Made in Canada with natural coconut shell carbon.",
                "foundingDate": "2023",
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
                  "telephone": "+1 250 432 9352",
                  "email": "hello@purrify.ca",
                  "contactType": "customer service",
                  "areaServed": ["CA", "US"],
                  "availableLanguage": ["English", "French", "Chinese"]
                },
                "sameAs": [
                  "https://facebook.com/purrify",
                  "https://instagram.com/purrify",
                  "https://twitter.com/purrify",
                  "https://www.linkedin.com/company/purrify"
                ],
                "areaServed": {
                  "@type": "Country",
                  "name": "Canada"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Cat Litter Odor Control Products",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": "Purrify 17g Trial Size",
                        "description": "Trial size activated carbon cat litter additive - perfect for testing",
                        "sku": "purrify-17g",
                        "image": "https://purrify.ca/optimized/20g.webp"
                      },
                      "price": "6.99",
                      "priceCurrency": "CAD",
                      "availability": "https://schema.org/InStock",
                      "url": "https://purrify.ca/products/trial-size"
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": "Purrify 60g Standard Size",
                        "description": "Most popular size - one month supply for single cat households",
                        "sku": "purrify-60g",
                        "image": "https://purrify.ca/optimized/60g.webp"
                      },
                      "price": "19.99",
                      "priceCurrency": "CAD",
                      "availability": "https://schema.org/InStock",
                      "url": "https://purrify.ca/products/standard"
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": "Purrify 120g Family Pack",
                        "description": "Large size perfect for multi-cat households - maximum odor control",
                        "sku": "purrify-120g",
                        "image": "https://purrify.ca/optimized/140g.webp"
                      },
                      "price": "29.99",
                      "priceCurrency": "CAD",
                      "availability": "https://schema.org/InStock",
                      "url": "https://purrify.ca/products/family-pack"
                    }
                  ]
                },
                "priceRange": "$6.99 - $29.99"
              },
              {
                "@type": "WebSite",
                "@id": "https://purrify.ca/#website",
                "url": "https://purrify.ca",
                "name": "Purrify - Activated Carbon Cat Litter Additive",
                "description": "Premium activated carbon cat litter additive that eliminates odors at the molecular level.",
                "publisher": {
                  "@id": "https://purrify.ca/#organization"
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://purrify.ca/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                },
                "inLanguage": "en-CA"
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is Purrify and how does it work?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Purrify is an activated carbon additive for cat litter that eliminates odors at the molecular level. The activated carbon has millions of microscopic pores that trap and neutralize odor-causing compounds, providing superior odor control compared to traditional litter alone."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is Purrify safe for cats and humans?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, Purrify is completely safe for both cats and humans. Our activated carbon is food-grade and non-toxic. It has been tested extensively and is made from natural materials. Many water filters and air purifiers use the same type of activated carbon."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much Purrify should I use?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "For optimal results, use approximately 1-2 tablespoons of Purrify per standard litter box. Mix it thoroughly with your existing litter when you do a complete change. The 17g trial size is perfect for one litter box change."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does Purrify work with all types of litter?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes! Purrify is designed to work with any type of cat litter - clay, clumping, crystal, natural, or biodegradable. It enhances the odor control properties of whatever litter you're already using."
                    }
                  }
                ]
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
        
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <HowItWorks />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <WhyPurrify />
        </ErrorBoundary>
        
        {/* Enhanced Product Comparison for better conversions */}
        <ErrorBoundary>
          <EnhancedProductComparison />
        </ErrorBoundary>
        
        {/* Subscription Offer for recurring revenue */}
        <ErrorBoundary>
          <SubscriptionOffer />
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