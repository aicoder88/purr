import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  XCircle,
  AlertTriangle,
  DollarSign,
  Leaf,
  Clock,
  Shield,
  FlaskConical,
  Thermometer,
  Droplets,
  Layers,
  Home,
  Cat,
  Beaker,
  CircleDot,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { locales } from '@/i18n/config';
import { en } from '@/translations/en';
import { fr } from '@/translations/fr';

import type { Currency } from '@/lib/geo/currency-detector';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildLanguageAlternates, normalizeLocale, stripContext } from '@/lib/seo-utils';

// Force static generation
export const dynamic = 'force-static';
import {
  LandingHero,
  ProblemSection,
  SolutionSection,
  BenefitPillars,
  FinalCTA,
} from '@/components/sections/landing';
import { Testimonials } from '@/components/sections/testimonials';

// Translation data mapping
const translations = { en, fr };

interface AmmoniaControlPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Generate static params for all supported locales
export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

// Generate metadata for the ammonia control page
export async function generateMetadata({ params }: AmmoniaControlPageProps): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const t = translations[normalizedLocale as keyof typeof translations] || en;
  const ammonia = t.ammonia;

  const canonicalUrl = normalizedLocale === 'en' ? `${SITE_URL}/ammonia-control/` : `${SITE_URL}/${normalizedLocale}/ammonia-control/`;
  const languageAlternates = buildLanguageAlternates('/ammonia-control');

  // Convert language alternates to Next.js format
  const alternates: Record<string, string> = {};
  languageAlternates.forEach((alt) => {
    alternates[alt.hrefLang] = alt.href;
  });

  return {
    title: ammonia.meta.title,
    description: ammonia.meta.description,
    keywords: [
      'ammonia cat litter',
      'cat urine smell',
      'litter box odor',
      'ammonia neutralizer',
      'cat litter ammonia control',
      'activated carbon ammonia',
    ],
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: ammonia.meta.title,
      description: ammonia.meta.description,
      locale: normalizedLocale === 'fr' ? 'fr_CA' : 'en_CA',
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/optimized/blog/ammonia-hero.webp`,
          width: 1200,
          height: 630,
          alt: ammonia.meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: ammonia.meta.title,
      description: ammonia.meta.description,
      images: [`${SITE_URL}/optimized/blog/ammonia-hero.webp`],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    other: {
      'last-modified': '2026-01-04',
    },
  };
}

// Async server component for the ammonia control page
export default async function AmmoniaControlPage({ params }: AmmoniaControlPageProps) {
  const { locale } = await params;
  // Static generation with default CAD currency
  // Client-side detection can adjust if needed
  const _currency: Currency = 'CAD';

  const normalizedLocale = normalizeLocale(locale);
  const t = translations[normalizedLocale as keyof typeof translations] || en;
  const ammonia = t.ammonia;

  const canonicalUrl = normalizedLocale === 'en' ? `${SITE_URL}/ammonia-control/` : `${SITE_URL}/${normalizedLocale}/ammonia-control/`;

  // Problem cards data
  const problemCards = [
    {
      icon: <XCircle className="w-6 h-6" />,
      title: ammonia.problem.card1.title,
      description: ammonia.problem.card1.description,
    },
    {
      icon: <Cat className="w-6 h-6" />,
      title: ammonia.problem.card2.title,
      description: ammonia.problem.card2.description,
    },
    {
      icon: <Beaker className="w-6 h-6" />,
      title: ammonia.problem.card3.title,
      description: ammonia.problem.card3.description,
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: ammonia.problem.card4.title,
      description: ammonia.problem.card4.description,
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

  // Currency symbol (static CAD for SSR)
  const _lowPrice = '4.76';
  const _highPrice = '34.99';

  // Structured Data - WebPage for Ammonia Control landing page (not a product page)
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/${locale === 'en' ? '' : locale + '/'}ammonia-control/`,
    url: `${SITE_URL}/${locale === 'en' ? '' : locale + '/'}ammonia-control/`,
    name: ammonia.meta.title,
    description: ammonia.meta.description,
    inLanguage: normalizedLocale === 'fr' ? 'fr-CA' : 'en-CA',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/optimized/logos/purrify-logo.png`,
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
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
        item: SITE_URL,
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
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              stripContext(webPageSchema),
              stripContext(faqSchema),
              stripContext(breadcrumbSchema),
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <LandingHero
        breadcrumb={ammonia.breadcrumb}
        headline={ammonia.hero.headline}
        subheadline={ammonia.hero.subheadline}
        primaryCTA={{ label: ammonia.hero.cta, href: '/products/' }}
        secondaryCTA={{ label: ammonia.hero.secondaryCta, href: '#how-it-works' }}
        image="/optimized/blog/ammonia-hero.webp"
        imageAlt="Purrify activated carbon cat litter deodorizer"
      />

      {/* Understanding Ammonia Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mb-4">
              {ammonia.understanding.headline}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {ammonia.understanding.intro}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Chemistry Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <FlaskConical className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                {ammonia.understanding.chemistry.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {ammonia.understanding.chemistry.description}
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 font-mono text-sm text-blue-800 dark:text-blue-200">
                {ammonia.understanding.chemistry.formula}
              </div>
            </div>

            {/* Factors Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <Thermometer className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                {ammonia.understanding.factors.title}
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <Thermometer className="w-4 h-4 mt-0.5 text-orange-500 dark:text-orange-400 flex-shrink-0" />
                  <span>{ammonia.understanding.factors.point1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Droplets className="w-4 h-4 mt-0.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                  <span>{ammonia.understanding.factors.point2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Layers className="w-4 h-4 mt-0.5 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                  <span>{ammonia.understanding.factors.point3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Home className="w-4 h-4 mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <span>{ammonia.understanding.factors.point4}</span>
                </li>
              </ul>
            </div>

            {/* Health Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                {ammonia.understanding.health.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {ammonia.understanding.health.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

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
        diagramSrc="/optimized/blog/ammonia-science.webp"
        diagramAlt="How activated carbon captures ammonia molecules"
      />

      {/* Expanded Science Details */}
      <section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Adsorption */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                {ammonia.solution.adsorption.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {ammonia.solution.adsorption.description}
              </p>
            </div>

            {/* Pore Structure */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                {ammonia.solution.pores.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CircleDot className="w-4 h-4 mt-0.5 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                  <span>{ammonia.solution.pores.micro}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleDot className="w-4 h-4 mt-0.5 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                  <span>{ammonia.solution.pores.meso}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleDot className="w-4 h-4 mt-0.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                  <span>{ammonia.solution.pores.macro}</span>
                </li>
              </ul>
            </div>

            {/* Surface Area */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                {ammonia.solution.surface.title}
              </h3>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {ammonia.solution.surface.stat}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {ammonia.solution.surface.comparison}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How to Use Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mb-4">
              {ammonia.howToUse.headline}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {ammonia.howToUse.intro}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white dark:text-gray-100 text-2xl font-bold">
                {ammonia.howToUse.step1.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                {ammonia.howToUse.step1.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {ammonia.howToUse.step1.description}
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white dark:text-gray-100 text-2xl font-bold">
                {ammonia.howToUse.step2.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                {ammonia.howToUse.step2.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {ammonia.howToUse.step2.description}
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white dark:text-gray-100 text-2xl font-bold">
                {ammonia.howToUse.step3.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                {ammonia.howToUse.step3.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {ammonia.howToUse.step3.description}
              </p>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-2xl mx-auto">
            <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              {ammonia.howToUse.tips.title}
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span>{ammonia.howToUse.tips.tip1}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span>{ammonia.howToUse.tips.tip2}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span>{ammonia.howToUse.tips.tip3}</span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Benefit Pillars */}
      <BenefitPillars
        headline={ammonia.benefits.headline}
        pillars={benefitPillars}
      />

      {/* Results Timeline Section */}
      <section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mb-4">
                {ammonia.results.headline}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {ammonia.results.intro}
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-50">{ammonia.results.day1.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{ammonia.results.day1.description}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-50">{ammonia.results.day3.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{ammonia.results.day3.description}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-50">{ammonia.results.week1.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{ammonia.results.week1.description}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Home className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-50">{ammonia.results.ongoing.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{ammonia.results.ongoing.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/optimized/blog/ammonia-fresh-home.webp"
                alt={ammonia.results.imageAlt}
                width={600}
                height={600}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Comparison Table Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mb-4">
              {ammonia.comparison.headline}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {ammonia.comparison.intro}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-bold text-gray-900 dark:text-gray-50">{ammonia.comparison.headers.method}</th>
                  <th className="text-center p-4 font-bold text-gray-900 dark:text-gray-50">{ammonia.comparison.headers.effectiveness}</th>
                  <th className="text-center p-4 font-bold text-gray-900 dark:text-gray-50">{ammonia.comparison.headers.duration}</th>
                  <th className="text-center p-4 font-bold text-gray-900 dark:text-gray-50">{ammonia.comparison.headers.safety}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
                  <td className="p-4 font-semibold text-gray-900 dark:text-gray-50">{ammonia.comparison.purrify.method}</td>
                  <td className="p-4 text-center text-green-600 dark:text-green-400 font-bold">{ammonia.comparison.purrify.effectiveness}</td>
                  <td className="p-4 text-center text-gray-700 dark:text-gray-200">{ammonia.comparison.purrify.duration}</td>
                  <td className="p-4 text-center text-green-600 dark:text-green-400">{ammonia.comparison.purrify.safety}</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 text-gray-700 dark:text-gray-200">{ammonia.comparison.bakingSoda.method}</td>
                  <td className="p-4 text-center text-red-600 dark:text-red-400">{ammonia.comparison.bakingSoda.effectiveness}</td>
                  <td className="p-4 text-center text-gray-700 dark:text-gray-200">{ammonia.comparison.bakingSoda.duration}</td>
                  <td className="p-4 text-center text-gray-700 dark:text-gray-200">{ammonia.comparison.bakingSoda.safety}</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 text-gray-700 dark:text-gray-200">{ammonia.comparison.scented.method}</td>
                  <td className="p-4 text-center text-orange-600 dark:text-orange-400">{ammonia.comparison.scented.effectiveness}</td>
                  <td className="p-4 text-center text-gray-700 dark:text-gray-200">{ammonia.comparison.scented.duration}</td>
                  <td className="p-4 text-center text-orange-600 dark:text-orange-400">{ammonia.comparison.scented.safety}</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 text-gray-700 dark:text-gray-200">{ammonia.comparison.airFreshener.method}</td>
                  <td className="p-4 text-center text-red-600 dark:text-red-400">{ammonia.comparison.airFreshener.effectiveness}</td>
                  <td className="p-4 text-center text-gray-700 dark:text-gray-200">{ammonia.comparison.airFreshener.duration}</td>
                  <td className="p-4 text-center text-orange-600 dark:text-orange-400">{ammonia.comparison.airFreshener.safety}</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-700 dark:text-gray-200">{ammonia.comparison.frequentChanges.method}</td>
                  <td className="p-4 text-center text-yellow-600 dark:text-yellow-400">{ammonia.comparison.frequentChanges.effectiveness}</td>
                  <td className="p-4 text-center text-gray-700 dark:text-gray-200">{ammonia.comparison.frequentChanges.duration}</td>
                  <td className="p-4 text-center text-gray-700 dark:text-gray-200">{ammonia.comparison.frequentChanges.safety}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6 max-w-2xl mx-auto">
            {ammonia.comparison.note}
          </p>
        </Container>
      </section>

      {/* Testimonials - Reuse existing component */}
      <Testimonials />

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
        primaryCTA={{ label: ammonia.cta.button, href: '/products/' }}
        secondaryCTA={{ label: ammonia.cta.secondaryButton, href: '/products/trial' }}
        benefits={[ammonia.cta.benefit2]}
      />
    </>
  );
}


