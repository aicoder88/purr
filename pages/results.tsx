import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../src/components/ui/container';
import { SITE_NAME, TESTIMONIALS } from '../src/lib/constants';
import { useTranslation } from '../src/lib/translation-context';
import { useCurrency } from '../src/lib/currency-context';

import { Star, Quote, CheckCircle, Users, Clock, Sparkles, ArrowRight, Shield, Zap } from 'lucide-react';
import { COLORS, GRADIENTS, createCardClasses, createSectionClasses } from '../src/lib/theme-utils';
import { generateStarRating, generateAvatarUrl } from '../src/lib/component-utils';
import { getLocalizedUrl, buildLanguageAlternates } from '../src/lib/seo-utils';

export default function Results() {
  const { t, locale } = useTranslation();
  const { currency } = useCurrency();
  const r = t.results || {};

  const canonicalUrl = getLocalizedUrl('/results', locale);
  const languageAlternates = buildLanguageAlternates('/results');

  // Stats data
  const stats = [
    { value: '4.9', label: r?.stats?.rating || 'Average Rating', suffix: '/5', icon: Star },
    { value: '138+', label: r?.stats?.reviews || 'Verified Reviews', icon: CheckCircle },
    { value: '7', label: r?.stats?.days || 'Days of Freshness', suffix: '+', icon: Clock },
    { value: '1,000+', label: r?.stats?.customers || 'Happy Cat Parents', icon: Users },
  ];

  // Before/After transformation points
  const transformations = [
    {
      before: r?.transformations?.item1?.before || 'Embarrassed to have guests over',
      after: r?.transformations?.item1?.after || 'Confident hosting anytime',
      icon: Users,
    },
    {
      before: r?.transformations?.item2?.before || 'Constant litter box cleaning',
      after: r?.transformations?.item2?.after || '7+ days of freshness per application',
      icon: Clock,
    },
    {
      before: r?.transformations?.item3?.before || 'Harsh chemical sprays and perfumes',
      after: r?.transformations?.item3?.after || '100% natural coconut carbon',
      icon: Shield,
    },
    {
      before: r?.transformations?.item4?.before || 'Masking odors temporarily',
      after: r?.transformations?.item4?.after || 'Trapping odors at the molecular level',
      icon: Zap,
    },
  ];

  // How it works steps
  const steps = [
    {
      number: '1',
      title: r?.howItWorks?.step1?.title || 'Sprinkle',
      description: r?.howItWorks?.step1?.description || 'Just sprinkle Purrify on top of your existing litter',
    },
    {
      number: '2',
      title: r?.howItWorks?.step2?.title || 'Mix',
      description: r?.howItWorks?.step2?.description || 'Gently mix into the top layer',
    },
    {
      number: '3',
      title: r?.howItWorks?.step3?.title || 'Enjoy',
      description: r?.howItWorks?.step3?.description || 'Breathe easy for 7+ days',
    },
  ];

  // Use existing testimonials from constants, take first 9
  const testimonials = TESTIMONIALS.slice(0, 9);

  return (
    <>
      <Head>
        <title>{`${r?.meta?.title || 'Real Results From Real Cat Parents'} | ${SITE_NAME}`}</title>
        <meta
          name="description"
          content={r?.meta?.description || 'See how 1,000+ cat owners eliminated litter box odor with Purrify. Real testimonials, verified reviews, and proven results from happy cat parents across Canada.'}
        />
        <meta name="keywords" content="Purrify results, cat litter reviews, testimonials, before after, customer reviews, verified reviews, social proof" />

        {/* Open Graph */}
        <meta property="og:title" content={r?.meta?.title || 'Real Results From Real Cat Parents'} />
        <meta property="og:description" content={r?.meta?.description || 'See how 1,000+ cat owners eliminated litter box odor with Purrify.'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.purrify.ca/optimized/three_bags_no_bg.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={r?.meta?.title || 'Real Results From Real Cat Parents'} />
        <meta name="twitter:description" content={r?.meta?.description || 'See how 1,000+ cat owners eliminated litter box odor with Purrify.'} />
        <meta name="twitter:image" content="https://www.purrify.ca/optimized/three_bags_no_bg.webp" />

        {/* Canonical and Language Alternates */}
        <link rel="canonical" href={canonicalUrl} />
        {languageAlternates.map((alt) => (
          <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
        ))}

        {/* Structured Data - AggregateRating */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'Purrify Cat Litter Deodorizer',
              description: 'Activated carbon cat litter additive that eliminates odors naturally',
              brand: {
                '@type': 'Brand',
                name: 'Purrify',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '138',
                bestRating: '5',
                worstRating: '1',
              },
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: currency,
                lowPrice: '4.76',
                highPrice: '34.99',
                offerCount: '3',
                availability: 'https://schema.org/InStock',
              },
            }),
          }}
        />
      </Head>

      <main className={createSectionClasses('light')}>
        {/* Hero Section */}
        <section className="pt-12 pb-16 md:pt-16 md:pb-24">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E0EFC7] dark:bg-[#E0EFC7]/20 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#FF3131]" />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {r?.hero?.badge || 'Verified Customer Results'}
                </span>
              </div>

              {/* Headline */}
              <h1 className={`font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 ${GRADIENTS.text.primary} ${GRADIENTS.text.primaryDark}`}>
                {r?.hero?.title || 'Real Results From Real Cat Parents'}
              </h1>

              {/* Subheadline */}
              <p className={`text-xl md:text-2xl ${COLORS.text.secondary} max-w-3xl mx-auto mb-8`}>
                {r?.hero?.subtitle || 'See why 1,000+ cat owners trust Purrify to eliminate litter box odor naturally. No perfumes, no chemicals - just science that works.'}
              </p>

              {/* Star Rating Display */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 dark:text-yellow-300 fill-current" />
                  ))}
                </div>
                <span className={`text-lg font-semibold ${COLORS.text.primary}`}>
                  4.9/5 {r?.hero?.basedOn || 'based on'} 138+ {r?.hero?.verifiedReviews || 'verified reviews'}
                </span>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/trial-size"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF3131] hover:bg-[#FF3131]/90 text-white dark:text-gray-100 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {r?.hero?.tryCta || 'Try Risk-Free - Just $4.76 S&H'}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Stats Bar */}
        <section className="py-12 bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FF3131]/10 dark:bg-[#FF5050]/20 rounded-full mb-3">
                      <IconComponent className="w-6 h-6 text-[#FF3131] dark:text-[#FF5050]" />
                    </div>
                    <div className={`text-3xl md:text-4xl font-bold ${COLORS.text.primary}`}>
                      {stat.value}{stat.suffix || ''}
                    </div>
                    <div className={`text-sm ${COLORS.text.tertiary}`}>{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Before/After Transformation Section */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className={`font-heading text-3xl md:text-4xl font-bold mb-4 ${COLORS.text.primary}`}>
                  {r?.beforeAfter?.title || 'The Purrify Transformation'}
                </h2>
                <p className={`text-lg ${COLORS.text.tertiary} max-w-2xl mx-auto`}>
                  {r?.beforeAfter?.subtitle || 'See how cat parents transformed their homes with Purrify'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {transformations.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className={`${createCardClasses(true)} p-6 md:p-8`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FF3131] to-[#5B2EFF] rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white dark:text-gray-100" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-red-500 dark:text-red-400">
                              {r?.beforeAfter?.before || 'Before'}
                            </span>
                          </div>
                          <p className={`${COLORS.text.tertiary} line-through mb-4`}>
                            {item.before}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-green-500 dark:text-green-400">
                              {r?.beforeAfter?.after || 'After'}
                            </span>
                          </div>
                          <p className={`${COLORS.text.primary} font-medium`}>
                            {item.after}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        {/* Testimonial Grid */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-orange-50/50 dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900">
          <Container>
            <div className="text-center mb-12">
              <h2 className={`font-heading text-3xl md:text-4xl font-bold mb-4 ${COLORS.text.primary}`}>
                {r?.testimonials?.title || 'What Cat Parents Are Saying'}
              </h2>
              <p className={`text-lg ${COLORS.text.tertiary} max-w-2xl mx-auto`}>
                {r?.testimonials?.subtitle || 'Real reviews from verified customers across Canada'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Avatar and Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#E0EFC7] dark:border-gray-600">
                      <Image
                        src={generateAvatarUrl(testimonial.name, index)}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className={`font-semibold ${COLORS.text.primary}`}>{testimonial.name}</p>
                      <div className="flex items-center gap-1">
                        {generateStarRating(testimonial.stars || 5)}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-1 w-6 h-6 text-[#FF3131]/20 dark:text-[#FF5050]/20" />
                    <p className={`${COLORS.text.secondary} text-sm leading-relaxed pl-4`}>
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* More Reviews Link */}
            <div className="text-center mt-12">
              <Link
                href="/reviews"
                className={`inline-flex items-center gap-2 px-6 py-3 ${COLORS.surface.light} rounded-full shadow-md hover:shadow-lg transition-all duration-300 ${COLORS.text.primary} font-medium`}
              >
                {r?.testimonials?.viewAll || 'View All Reviews'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className={`font-heading text-3xl md:text-4xl font-bold mb-4 ${COLORS.text.primary}`}>
                  {r?.howItWorks?.title || 'How It Works'}
                </h2>
                <p className={`text-lg ${COLORS.text.tertiary}`}>
                  {r?.howItWorks?.subtitle || 'Fresh litter box in 3 simple steps'}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF3131] to-[#5B2EFF] rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white dark:text-gray-100">{step.number}</span>
                    </div>
                    <h3 className={`font-heading text-xl font-bold mb-2 ${COLORS.text.primary}`}>
                      {step.title}
                    </h3>
                    <p className={COLORS.text.tertiary}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 dark:from-[#FF3131]/5 dark:to-[#5B2EFF]/5">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className={`font-heading text-3xl md:text-4xl font-bold mb-4 ${COLORS.text.primary}`}>
                {r?.cta?.title || 'Join 1,000+ Happy Cat Parents'}
              </h2>
              <p className={`text-lg ${COLORS.text.secondary} mb-8 max-w-2xl mx-auto`}>
                {r?.cta?.subtitle || 'Experience the same results as our verified customers. Try Purrify risk-free and see why it is Canada\'s most trusted natural cat litter deodorizer.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/trial-size"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF3131] hover:bg-[#FF3131]/90 text-white dark:text-gray-100 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {r?.cta?.primaryButton || 'Get Your Trial - $4.76 S&H'}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/#products"
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 ${COLORS.surface.light} border-2 border-[#FF3131] dark:border-[#FF5050] text-[#FF3131] dark:text-[#FF5050] font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#FF3131] hover:text-white dark:hover:bg-[#FF5050] dark:hover:text-white`}
                >
                  {r?.cta?.secondaryButton || 'View All Products'}
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500 dark:text-green-400" />
                  <span className={COLORS.text.tertiary}>{r?.cta?.trust1 || '100% Natural'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                  <span className={COLORS.text.tertiary}>{r?.cta?.trust2 || 'Made in Canada'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 dark:text-yellow-300 fill-current" />
                  <span className={COLORS.text.tertiary}>{r?.cta?.trust3 || '4.9/5 Rating'}</span>
                </div>
              </div>

              {/* Link to Reviews */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/reviews"
                  className="inline-flex items-center gap-2 text-sm text-[#FF3131] dark:text-[#FF5050] hover:underline font-medium"
                >
                  <Quote className="w-4 h-4" />
                  {locale === 'fr' ? 'Voir tous les avis clients →' : locale === 'zh' ? '查看所有客户评价 →' : 'Read all customer reviews →'}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
