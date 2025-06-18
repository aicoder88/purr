import { NextSeo, OrganizationJsonLd, ProductJsonLd, FAQPageJsonLd, LocalBusinessJsonLd } from 'next-seo';
import Script from 'next/script';
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
import { SITE_NAME, SITE_DESCRIPTION, PRODUCTS, CONTACT_INFO } from '../src/lib/constants';
import { SkipNav } from '../src/components/ui/skip-nav';
import { ErrorBoundary } from '../src/components/ui/error-boundary';

// Define FAQ items for structured data
const faqItems = [
  {
    question: "What is Purrify?",
    answer: "Purrify is an activated carbon cat litter additive that eliminates odors at the source, rather than masking them with fragrances."
  },
  {
    question: "How does Purrify work?",
    answer: "Purrify uses activated carbon technology to trap and neutralize odor molecules through adsorption, effectively eliminating cat litter odors at the molecular level."
  },
  {
    question: "Is Purrify safe for my cat?",
    answer: "Yes, Purrify is completely safe for cats. It's made from natural activated carbon derived from coconut shells with no harmful chemicals or fragrances."
  },
  {
    question: "How long does Purrify last?",
    answer: "A single application of Purrify can keep your litter box odor-free for up to 7 days, depending on usage and the number of cats."
  },
  {
    question: "Can Purrify be used with any type of cat litter?",
    answer: "Yes, Purrify works with all types of cat litter including clay, clumping, crystal, and natural litters."
  }
];

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
              url: 'https://purrify.ca/cat_rose_thumbnail.jpg',
              width: 500,
              height: 340,
              alt: 'Purrify Cat Litter Additive in Action - Before and After Demonstration',
              type: 'image/jpeg',
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
        ]}
      />

      {/* Organization Schema */}
      <OrganizationJsonLd
        name="Purrify"
        url={canonicalUrl}
        logo="https://purrify.ca/purrify-logo.png"
        sameAs={[
          'https://facebook.com/purrify',
          'https://instagram.com/purrify',
          'https://twitter.com/purrify'
        ]}
        contactPoint={[
          {
            telephone: CONTACT_INFO.phone,
            contactType: 'customer service',
            areaServed: 'CA',
            availableLanguage: ['English', 'French'],
          },
        ]}
      />
      
      {/* Product Schema for main product */}
      <ProductJsonLd
        productName="Purrify Activated Carbon Cat Litter Additive"
        images={[
          'https://purrify.ca/20g.png',
          'https://purrify.ca/60g.png',
          'https://purrify.ca/cat_rose_thumbnail.jpg',
        ]}
        description={SITE_DESCRIPTION}
        brand="Purrify"
        offers={PRODUCTS.map(product => ({
          price: product.price.toString(),
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock',
          url: `https://purrify.ca/products/${product.id}`,
          seller: {
            name: 'Purrify',
          },
        }))}
        aggregateRating={{
          ratingValue: '5',
          reviewCount: '11',
        }}
      />
      
      {/* FAQ Schema */}
      <FAQPageJsonLd
        mainEntity={faqItems.map(item => ({
          questionName: item.question,
          acceptedAnswerText: item.answer,
        }))}
      />
      
      {/* Local Business Schema */}
      <LocalBusinessJsonLd
        type="PetStore"
        id="https://purrify.ca"
        name="Purrify"
        description={SITE_DESCRIPTION}
        url={canonicalUrl}
        telephone={CONTACT_INFO.phone}
        address={{
          streetAddress: CONTACT_INFO.address.split(',')[0],
          addressLocality: 'Mirabel',
          addressRegion: 'QC',
          postalCode: 'J7J 0T6',
          addressCountry: 'CA',
        }}
        geo={{
          latitude: '45.6501',
          longitude: '-73.8359',
        }}
        images={[
          'https://purrify.ca/purrify-logo.png',
          'https://purrify.ca/cat_rose_thumbnail.jpg',
        ]}
        openingHours={[
          {
            opens: '08:00',
            closes: '20:00',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
            ],
            validFrom: '2023-01-01',
            validThrough: '2025-12-31',
          },
          {
            opens: '09:00',
            closes: '20:00',
            dayOfWeek: 'Saturday',
            validFrom: '2023-01-01',
            validThrough: '2025-12-31',
          },
        ]}
      />
      
      {/* BreadcrumbList Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://purrify.ca/'
              }
            ]
          })
        }}
      />
      
      {/* VideoObject Schema for Hero Video */}
      <Script
        id="video-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            'name': '',
            'description': '',
            'thumbnailUrl': 'https://purrify.ca/cat_rose_thumbnail.jpg',
            'uploadDate': '2023-09-01T08:00:00+08:00',
            'contentUrl': 'https://purrify.ca/videos/cat_rose_optimized.mp4',
            'embedUrl': 'https://purrify.ca/',
            'duration': 'PT30S',
            'interactionStatistic': {
              '@type': 'InteractionCounter',
              'interactionType': { '@type': 'WatchAction' },
              'userInteractionCount': 5000
            },
            'regionsAllowed': 'CA,US'
          })
        }}
      />

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
    </>
  );
}