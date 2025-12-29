import { NextSeo } from 'next-seo';
import Script from 'next/script';
import { useTranslation } from '../src/lib/translation-context';
import {
  LandingHero,
  TrustBar,
  ProblemSection,
  SolutionSection,
  BenefitPillars,
  StatsBar,
  FinalCTA,
} from '../src/components/sections/landing';
import { Testimonials } from '../src/components/sections/testimonials';
import { Container } from '../src/components/ui/container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../src/components/ui/accordion';
import {
  XCircle,
  AlertTriangle,
  DollarSign,
  Leaf,
  Clock,
  Shield,
} from 'lucide-react';

export default function AmmoniaControl() {
  const { t, locale } = useTranslation();
  const ammonia = t.ammonia;

  const canonicalUrl = `https://www.purrify.ca/${locale === 'en' ? '' : locale + '/'}ammonia-control`;

  // Problem cards data
  const problemCards = [
    {
      icon: <XCircle className="w-6 h-6" />,
      title: ammonia.problem.card1.title,
      description: ammonia.problem.card1.description,
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: ammonia.problem.card2.title,
      description: ammonia.problem.card2.description,
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: ammonia.problem.card3.title,
      description: ammonia.problem.card3.description,
    },
  ];

  // Benefit pillars data
  const benefitPillars = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: ammonia.benefits.pillar1.title,
      description: ammonia.benefits.pillar1.description,
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: ammonia.benefits.pillar2.title,
      description: ammonia.benefits.pillar2.description,
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: ammonia.benefits.pillar3.title,
      description: ammonia.benefits.pillar3.description,
    },
  ];

  // Stats data
  const stats = [
    { value: ammonia.stats.days.value, label: ammonia.stats.days.label },
    { value: ammonia.stats.savings.value, label: ammonia.stats.savings.label },
    { value: ammonia.stats.customers.value, label: ammonia.stats.customers.label },
    { value: ammonia.stats.rating.value, label: ammonia.stats.rating.label },
  ];

  // FAQ items
  const faqItems = [
    { q: ammonia.faq.q1, a: ammonia.faq.a1 },
    { q: ammonia.faq.q2, a: ammonia.faq.a2 },
    { q: ammonia.faq.q3, a: ammonia.faq.a3 },
    { q: ammonia.faq.q4, a: ammonia.faq.a4 },
    { q: ammonia.faq.q5, a: ammonia.faq.a5 },
    { q: ammonia.faq.q6, a: ammonia.faq.a6 },
    { q: ammonia.faq.q7, a: ammonia.faq.a7 },
    { q: ammonia.faq.q8, a: ammonia.faq.a8 },
  ];

  // Structured Data - Product
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Purrify Cat Litter Deodorizer',
    description: ammonia.meta.description,
    brand: {
      '@type': 'Brand',
      name: 'Purrify',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'CAD',
      lowPrice: '4.76',
      highPrice: '34.99',
      offerCount: '3',
      availability: 'https://schema.org/InStock',
    },
  };

  // Structured Data - FAQ
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  // Structured Data - Breadcrumb
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.purrify.ca',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: ammonia.breadcrumb,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <NextSeo
        title={ammonia.meta.title}
        description={ammonia.meta.description}
        canonical={canonicalUrl}
        openGraph={{
          title: ammonia.meta.title,
          description: ammonia.meta.description,
          url: canonicalUrl,
          type: 'website',
          images: [
            {
              url: 'https://www.purrify.ca/images/og/ammonia-control.jpg',
              width: 1200,
              height: 630,
              alt: ammonia.hero.headline,
            },
          ],
        }}
        languageAlternates={[
          { hrefLang: 'en', href: 'https://www.purrify.ca/ammonia-control' },
          { hrefLang: 'fr', href: 'https://www.purrify.ca/fr/ammonia-control' },
          { hrefLang: 'zh', href: 'https://www.purrify.ca/zh/ammonia-control' },
          { hrefLang: 'x-default', href: 'https://www.purrify.ca/ammonia-control' },
        ]}
      />

      {/* Structured Data */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <LandingHero
        breadcrumb={ammonia.breadcrumb}
        headline={ammonia.hero.headline}
        subheadline={ammonia.hero.subheadline}
        primaryCTA={{ label: ammonia.hero.cta, href: '/products' }}
        secondaryCTA={{ label: ammonia.hero.secondaryCta, href: '#how-it-works' }}
        image="/images/products/purrify-product-hero.webp"
        imageAlt="Purrify natural cat litter deodorizer"
      />

      {/* Trust Bar */}
      <TrustBar
        customerCount={ammonia.stats.customers.value}
        rating={4.9}
        reviewCount={500}
      />

      {/* Problem Section */}
      <ProblemSection
        headline={ammonia.problem.headline}
        problems={problemCards}
      />

      {/* Solution Section */}
      <SolutionSection
        id="how-it-works"
        headline={ammonia.solution.headline}
        description={ammonia.solution.description}
        diagramSrc="/images/how-it-works/zeolite-diagram.webp"
        diagramAlt="How zeolite captures ammonia molecules"
      />

      {/* Benefit Pillars */}
      <BenefitPillars
        headline={ammonia.benefits.headline}
        pillars={benefitPillars}
      />

      {/* Testimonials - Reuse existing component */}
      <Testimonials />

      {/* Stats Bar */}
      <StatsBar stats={stats} />

      {/* FAQ Section */}
      <section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
              {ammonia.faq.headline}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 py-4">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <FinalCTA
        headline={ammonia.cta.headline}
        subheadline={ammonia.cta.subheadline}
        primaryCTA={{ label: ammonia.cta.button, href: '/products' }}
        secondaryCTA={{ label: ammonia.cta.secondaryButton, href: '/products/trial' }}
        benefits={[ammonia.cta.benefit1, ammonia.cta.benefit2]}
      />
    </>
  );
}
