import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Check, MapPin, Truck, Leaf, Shield, Star, ChevronRight, Home } from 'lucide-react';
import { locales } from '@/i18n/config';
import type { Currency } from '@/lib/geo/currency-detector';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildLanguageAlternates, normalizeLocale, stripContext } from '@/lib/seo-utils';
import { formatProductPrice } from '@/lib/pricing';
import { en } from '@/translations/en';
import { fr } from '@/translations/fr';

// Force static generation
export const dynamic = 'force-static';

// Translation data mapping
const translations = { en, fr };

interface CanadaPageProps {
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

// Generate metadata for the Canada page
export async function generateMetadata({ params }: CanadaPageProps): Promise<Metadata> {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const t = translations[normalizedLocale as keyof typeof translations] || en;
  const c = t.canadaPage;

  const pageTitle = c.pageTitle;
  const pageDescription = c.pageDescription;

  const canonicalUrl = normalizedLocale === 'en' ? `${SITE_URL}/canada/` : `${SITE_URL}/${normalizedLocale}/canada/`;
  const languageAlternates = buildLanguageAlternates('/canada');

  // Convert language alternates to Next.js format
  const alternates: Record<string, string> = {};
  languageAlternates.forEach((alt) => {
    alternates[alt.hrefLang] = alt.href;
  });

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      'cat litter deodorizer Canada',
      'best cat litter deodorizer Canada',
      'cat litter odor control Canada',
      'Canadian made cat litter additive',
      'buy Purrify Canada',
      'activated carbon cat litter Canada',
      'natural cat litter deodorizer Canada',
    ],
    metadataBase: new URL(SITE_URL),
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
          url: `${SITE_URL}/optimized/products/purrify-standard-bag.webp`,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: pageTitle,
      description: pageDescription,
      images: [`${SITE_URL}/optimized/products/purrify-standard-bag.webp`],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    other: {
      'last-modified': '2025-11-18',
    },
  };
}

// Async server component for the Canada page
export default async function CanadaPage({ params }: CanadaPageProps) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const t = translations[normalizedLocale as keyof typeof translations] || en;
  const c = t.canadaPage;
  
  // Static generation with default CAD currency
  // Client-side detection can adjust if needed
  const currency: Currency = 'CAD';

  // Format prices
  const trialPrice = formatProductPrice('trial', currency, normalizedLocale);
  const standardPrice = formatProductPrice('standard', currency, normalizedLocale);
  const canadianBenefits = [
    {
      icon: MapPin,
      title: c.benefitMadeInCanada,
      description: c.benefitMadeInCanadaDesc,
    },
    {
      icon: Truck,
      title: c.benefitFreeShipping,
      description: c.benefitFreeShippingDesc,
    },
    {
      icon: Leaf,
      title: c.benefitNatural,
      description: c.benefitNaturalDesc,
    },
    {
      icon: Shield,
      title: c.benefitSupport,
      description: c.benefitSupportDesc,
    },
  ];
  const majorCities = [
    { name: 'Toronto', province: 'ON' },
    { name: 'Vancouver', province: 'BC' },
    { name: 'Montreal', province: 'QC' },
    { name: 'Calgary', province: 'AB' },
    { name: 'Ottawa', province: 'ON' },
    { name: 'Edmonton', province: 'AB' },
    { name: 'Winnipeg', province: 'MB' },
    { name: 'Halifax', province: 'NS' },
  ];
  // Structured Data - WebPage for Canada landing page (not a product page)
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/${locale === 'en' ? '' : locale + '/'}canada/`,
    url: `${SITE_URL}/${locale === 'en' ? '' : locale + '/'}canada/`,
    name: normalizedLocale === 'fr' ? 'Purrify Canada - Désodorisant pour litière' : 'Purrify Canada - Cat Litter Deodorizer',
    description: c.pageDescription,
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
  // Structured Data - LocalBusiness
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Purrify',
    description: 'Canadian manufacturer of activated carbon cat litter deodorizer',
    url: SITE_URL,
    logo: `${SITE_URL}/optimized/logos/purrify-logo.png`,
    image: `${SITE_URL}/optimized/products/purrify-standard-bag.webp`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CA',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Canada',
    },
    priceRange: '$$',
    paymentAccepted: 'Credit Card, PayPal',
    currenciesAccepted: 'CAD',
  };
  // Structured Data - Breadcrumb
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t.nav?.home || 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: c.breadcrumb,
        item: `${SITE_URL}/canada`,
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
              stripContext(localBusinessSchema),
              stripContext(breadcrumbSchema),
            ],
          }),
        }}
      />
      <div className="bg-cream-50 dark:bg-gray-900 min-h-screen">
        {/* Breadcrumb */}
        <nav aria-label={c.breadcrumb} className="max-w-6xl mx-auto pt-6 pb-4 px-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-forest-600 dark:hover:text-forest-400 transition-colors">
            <Home className="w-4 h-4" />
            <span className="sr-only">{t.nav?.home || "Home"}</span>
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 dark:text-gray-100 font-medium">{c.breadcrumb}</span>
        </nav>
        {/* Hero Section */}
        <header className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                <span>{c.badge}</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-50 leading-tight">
                {c.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {c.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/products/trial-size/"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF3131] dark:bg-[#FF5050] text-white dark:text-gray-100 px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E02828] dark:hover:bg-[#E02828]/90 transition-all shadow-xl"
                >
                  {c.ctaTrial.replace('{price}', trialPrice)}
                </Link>
                <Link
                  href="/products/"
                  className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
                >
                  {c.ctaProducts}
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  <span>{c.shippingBadge}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>{c.guaranteeBadge}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/optimized/products/purrify-standard-bag.webp"
                  alt={c.heroImageAlt}
                  width={500}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>
              {/* Canadian flag badge */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-3xl">🇨🇦</div>
              </div>
            </div>
          </div>
        </header>
        {/* Why Canadian Section */}
        <section className="bg-white dark:bg-gray-800 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center text-gray-900 dark:text-gray-50 mb-4">
              {c.benefitsTitle}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
              {c.benefitsSubtitle}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {canadianBenefits.map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Made in Canada Story */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-800 rounded-2xl p-8 md:p-12 border border-red-100 dark:border-red-900/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">🍁</div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-50">
                  {c.storyTitle}
                </h2>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  {c.storyP1}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {c.storyP2}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {c.storyP3}
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">100%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{c.statCanadianMade}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">{c.statDays}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{c.statDaysLabel}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">0</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{c.statFragrances}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Shipping Across Canada */}
        <section className="bg-gray-50 dark:bg-gray-800/50 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center text-gray-900 dark:text-gray-50 mb-4">
              {c.shippingTitle}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
              {c.shippingSubtitle}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {majorCities.map((city) => (
                <div
                  key={city.name}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700"
                >
                  <div className="font-medium text-gray-900 dark:text-gray-100">{city.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{city.province}</div>
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
                {c.shippingOptionsTitle}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{c.freeShippingTitle}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{c.freeShippingDesc}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{c.expeditedTitle}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{c.expeditedDesc}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Canadian Reviews */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center text-gray-900 dark:text-gray-50 mb-4">
              {c.reviewsTitle}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
              {c.reviewsSubtitle}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  {`"${c.review1}"`}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">{c.review1Author}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  {`"${c.review2}"`}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">{c.review2Author}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  {`"${c.review3}"`}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">{c.review3Author}</div>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#FF3131] to-[#FF5050] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center text-white dark:text-gray-100">
            <h2 className="text-3xl font-heading font-bold mb-4">
              {c.ctaTitle}
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              {c.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/products/trial-size/"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-100 text-[#FF3131] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-all shadow-xl"
              >
                {c.ctaTrialButton.replace('{price}', trialPrice)}
              </Link>
              <Link
                href="/products/"
                className="inline-flex items-center justify-center gap-2 bg-white/20 dark:bg-white/10 text-white dark:text-gray-100 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 dark:hover:bg-white/20 transition-all border border-white/30 dark:border-white/20"
              >
                {c.ctaStandardButton.replace('{price}', standardPrice)}
              </Link>
            </div>
            <p className="text-sm opacity-75">
              {c.ctaFooter}
            </p>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center text-gray-900 dark:text-gray-50 mb-12">
              {c.faqTitle}
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {c.faq1Q}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {c.faq1A}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {c.faq2Q}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {c.faq2A}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {c.faq3Q}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {c.faq3A}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {c.faq4Q}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {c.faq4A}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {c.faq5Q}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {c.faq5A}
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Related Content */}
        <section className="bg-gray-50 dark:bg-gray-800/50 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-50 mb-8">
              {c.relatedTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/learn/how-activated-carbon-works/"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 group"
              >
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                  {c.relatedCarbonTitle}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {c.relatedCarbonDesc}
                </p>
              </Link>
              <Link
                href="/learn/solutions/apartment-cat-smell-solution/"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 group"
              >
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                  {c.relatedApartmentTitle}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {c.relatedApartmentDesc}
                </p>
              </Link>
              <Link
                href="/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 group"
              >
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                  {c.relatedAlternativeTitle}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {c.relatedAlternativeDesc}
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
