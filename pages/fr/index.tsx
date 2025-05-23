import { NextSeo, OrganizationJsonLd, ProductJsonLd, FAQPageJsonLd, LocalBusinessJsonLd } from 'next-seo';
import Script from 'next/script';
import { Layout } from '../../src/components/layout/layout';
import { Hero } from '../../src/components/sections/hero';
import { About } from '../../src/components/sections/about';
import { HowItWorks } from '../../src/components/sections/how-it-works';
import { WhyPurrify } from '../../src/components/sections/why-purrify';
import { Products } from '../../src/components/sections/products';
import { Testimonials } from '../../src/components/sections/testimonials';
import { FAQ } from '../../src/components/sections/faq';
import { Newsletter } from '../../src/components/sections/newsletter';
import { CTA } from '../../src/components/sections/cta';
import { Contact } from '../../src/components/sections/contact';
import { BlogPreview } from '../../src/components/sections/blog-preview';
import { useTranslation } from '../../src/lib/translation-context';
import { GetStaticProps } from 'next';

// Define FAQ items for structured data
const faqItems = [
  {
    question: "Qu'est-ce que Purrify?",
    answer: "Purrify est un additif de litière pour chat au charbon actif qui élimine les odeurs à la source, plutôt que de les masquer avec des parfums."
  },
  {
    question: "Comment fonctionne Purrify?",
    answer: "Purrify utilise la technologie du charbon actif pour piéger et neutraliser les molécules d'odeur par adsorption, éliminant efficacement les odeurs de litière pour chat au niveau moléculaire."
  },
  {
    question: "Purrify est-il sans danger pour mon chat?",
    answer: "Oui, Purrify est totalement sans danger pour les chats. Il est fabriqué à partir de charbon actif naturel dérivé de coques de noix de coco, sans produits chimiques nocifs ni parfums."
  },
  {
    question: "Combien de temps dure Purrify?",
    answer: "Une seule application de Purrify peut garder votre litière sans odeur jusqu'à 7 jours, selon l'utilisation et le nombre de chats."
  },
  {
    question: "Purrify peut-il être utilisé avec n'importe quel type de litière pour chat?",
    answer: "Oui, Purrify fonctionne avec tous les types de litière pour chat, y compris l'argile, les litières agglomérantes, les cristaux et les litières naturelles."
  }
];

export default function Home() {
  const { t } = useTranslation();
  const pageTitle = `${t.siteName} - Additif de litière pour chat au charbon actif`;
  const canonicalUrl = 'https://purrify.ca/fr/';
  
  return (
    <>
      <NextSeo
        title={pageTitle}
        description={t.siteDescription}
        canonical={canonicalUrl}
        openGraph={{
          type: 'website',
          url: canonicalUrl,
          title: pageTitle,
          description: t.siteDescription,
          images: [
            {
              url: 'https://purrify.ca/purrify-logo.png',
              width: 1200,
              height: 630,
              alt: t.siteName,
              type: 'image/png',
            },
            {
              url: 'https://purrify.ca/cat_rose_thumbnail.jpg',
              width: 500,
              height: 340,
              alt: 'Chat avec rose - Purrify',
              type: 'image/jpeg',
            },
          ],
          videos: [
            {
              url: 'https://purrify.ca/videos/cat_rose_optimized.mp4',
              width: 1280,
              height: 720,
              type: 'video/mp4',
              alt: 'Démonstration de l\'additif de litière pour chat Purrify',
            },
            {
              url: 'https://purrify.ca/videos/cat_rose_optimized.webm',
              width: 1280,
              height: 720,
              type: 'video/webm',
              alt: 'Démonstration de l\'additif de litière pour chat Purrify',
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
            content: t.seo.keywords,
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
        ]}
        languageAlternates={[
          {
            hrefLang: 'en',
            href: 'https://purrify.ca/',
          },
          {
            hrefLang: 'fr',
            href: 'https://purrify.ca/fr/',
          },
          {
            hrefLang: 'x-default',
            href: 'https://purrify.ca/',
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
            telephone: t.contact.phone,
            contactType: "service client",
            areaServed: "CA",
            availableLanguage: ["Anglais", "Français"],
          },
        ]}
      />
      
      {/* Product Schema for main product */}
      <ProductJsonLd
        productName="Additif de litière pour chat au charbon actif Purrify"
        images={[
          'https://purrify.ca/20g.png',
          'https://purrify.ca/60g.png',
          'https://purrify.ca/cat_rose_thumbnail.jpg',
        ]}
        description={t.siteDescription}
        brand="Purrify"
        offers={[
          {
            price: '9.99',
            priceCurrency: 'CAD',
            availability: 'https://schema.org/InStock',
            url: 'https://purrify.ca/fr/products/purrify-17g',
            seller: {
              name: 'Purrify',
            },
          },
          {
            price: '19.99',
            priceCurrency: 'CAD',
            availability: 'https://schema.org/InStock',
            url: 'https://purrify.ca/fr/products/purrify-60g',
            seller: {
              name: 'Purrify',
            },
          },
          {
            price: '29.99',
            priceCurrency: 'CAD',
            availability: 'https://schema.org/InStock',
            url: 'https://purrify.ca/fr/products/purrify-120g',
            seller: {
              name: 'Purrify',
            },
          }
        ]}
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
        id="https://purrify.ca/fr"
        name="Purrify"
        description={t.siteDescription}
        url={canonicalUrl}
        telephone={t.contact.phone}
        address={{
          streetAddress: t.contact.address.split(',')[0],
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
                'name': 'Accueil',
                'item': 'https://purrify.ca/fr/'
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
            'name': 'Démonstration de l\'additif de litière pour chat Purrify',
            'description': 'Une démonstration de l\'additif de litière pour chat au charbon actif Purrify qui élimine les odeurs au niveau moléculaire',
            'thumbnailUrl': 'https://purrify.ca/cat_rose_thumbnail.jpg',
            'uploadDate': '2023-09-01T08:00:00+08:00',
            'contentUrl': 'https://purrify.ca/videos/cat_rose_optimized.mp4',
            'embedUrl': 'https://purrify.ca/fr/',
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

      <Layout>
        <Hero />
        <About />
        <HowItWorks />
        <WhyPurrify />
        <Products />
        <Testimonials />
        <BlogPreview />
        <FAQ />
        <Newsletter />
        <CTA />
        <Contact />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      locale,
    },
  };
};