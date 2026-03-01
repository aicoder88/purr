"use client";

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { ChevronRight, Home } from 'lucide-react';

import { getCityBySlug } from '@/data/locations';
import { useTranslations, useLocale } from 'next-intl';
import { safeTrackEvent } from '@/lib/analytics';
import { CityLeadCaptureCTA } from './CityLeadCaptureCTA';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import { PROVINCES } from '@/lib/locations/provinces';

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface Testimonial {
  quote: string;
  author: string;
  stars: number;
  timeAgo: string;
  badge: string;
  helpfulCount: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  wasHelpfulText?: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

// ============================================================================
// Constants
// ============================================================================

const GRADIENTS = {
  pageBackground: 'bg-gradient-to-br from-orange-50 to-pink-50 from-gray-900 to-gray-800',
  ctaButton: 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600',
  headingText: 'bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent',
  blueSection: 'bg-gradient-to-br from-blue-50 to-purple-50 from-blue-900/20 to-purple-900/20',
  purpleSection: 'bg-gradient-to-br from-purple-50 to-blue-50 from-purple-900/20 to-blue-900/20',
  testimonialCard: 'bg-gradient-to-br from-gray-50 to-white from-gray-700/70 to-gray-700/50',
  videoCta: 'bg-gradient-to-br from-orange-50 to-pink-50 from-orange-900/20 to-pink-900/20',
} as const;

const HERO_IMAGES: Record<string, string> = {
  'qc': '/optimized/locations/quebec.png',
  'on': '/optimized/locations/ontario.png',
  'ab': '/optimized/locations/alberta.png',
  'bc': '/optimized/locations/british-columbia.png',
  'ns': '/optimized/locations/atlantic.png',
  'nb': '/optimized/locations/atlantic.png',
  'pe': '/optimized/locations/atlantic.png',
  'nl': '/optimized/locations/atlantic.png',
  'mb': '/optimized/locations/prairies.png',
  'sk': '/optimized/locations/prairies.png',
  'yt': '/optimized/locations/north.png',
  'nt': '/optimized/locations/north.png',
  'nu': '/optimized/locations/north.png',
};

const CTA_BUTTON_CLASSES = `inline-flex items-center justify-center ${GRADIENTS.ctaButton} text-white text-gray-100 font-bold py-3 px-6 rounded-lg transition-all`;

// ============================================================================
// Subcomponents
// ============================================================================

function TestimonialCard({ testimonial, wasHelpfulText = 'Was this helpful?' }: TestimonialCardProps) {
  const fullStars = Math.floor(testimonial.stars);
  const hasHalfStar = testimonial.stars % 1 !== 0;

  return (
    <div className={`${GRADIENTS.testimonialCard} p-6 rounded-xl border border-gray-200 border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          {[...Array(fullStars)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-yellow-300 text-lg">★</span>
          ))}
          {hasHalfStar && (
            <span className="text-yellow-400 text-yellow-300 text-lg">½</span>
          )}
          {[...Array(5 - Math.ceil(testimonial.stars))].map((_, i) => (
            <span key={`empty-${i}`} className="text-gray-300 text-gray-500 text-lg">★</span>
          ))}
        </div>
        <span className="text-xs text-gray-500 text-gray-400">{testimonial.timeAgo}</span>
      </div>

      <div className="mb-3">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 bg-green-900/30 text-green-700 text-green-300 border border-green-200 border-green-700">
          ✓ {testimonial.badge}
        </span>
      </div>

      <p className="italic mb-4 text-gray-700 text-gray-200 flex-grow leading-relaxed">
        “{testimonial.quote}”
      </p>

      <div className="border-t border-gray-200 border-gray-600 pt-4 mt-auto">
        <p className="font-semibold text-gray-900 text-gray-50 mb-3 text-sm">
          {testimonial.author}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 text-gray-400">{wasHelpfulText}</span>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-gray-600 text-gray-400 hover:text-green-600 hover:text-green-400 transition-colors">
              <span>👍</span>
              <span className="text-xs font-medium">{testimonial.helpfulCount}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-600 text-gray-400 hover:text-red-600 hover:text-red-400 transition-colors">
              <span>👎</span>
              <span className="text-xs font-medium">{Math.floor(testimonial.helpfulCount / 8)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="bg-white bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 border-gray-700">
      <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 text-gray-50">
        {question}
      </h3>
      <p className="text-gray-700 text-gray-200">
        {answer}
      </p>
    </div>
  );
}

// ============================================================================
// Dynamic Imports
// ============================================================================

const CityInterlinkSection = dynamic(() => import('./CityInterlinkSection').then(mod => ({ default: mod.CityInterlinkSection })), { ssr: true });
const LocalShippingUrgency = dynamic(() => import('./LocalShippingUrgency').then(mod => ({ default: mod.LocalShippingUrgency })), { ssr: true });

// ============================================================================
// Utility Functions
// ============================================================================

// Helper function to interpolate template strings with {{variable}} syntax
const interpolate = (template: string, vars: Record<string, string>): string => {
  return Object.entries(vars).reduce(
    (result, [key, value]) => result.replace(new RegExp(`{{${key}}}`, 'g'), value),
    template
  );
};

const generateTestimonials = async (
  cityName: string,
  provinceName: string,
  housingHighlight: string,
  climateHighlight: string,
  citySlug: string,
) => {
  // Testimonials are intentionally disabled until backed by a real, verifiable review system.
  void cityName;
  void provinceName;
  void housingHighlight;
  void climateHighlight;
  void citySlug;
  return [];
};


import { type CityOdorProfile } from '@/lib/locations/cities';

export interface CityPageTemplateProps {
  citySlug: string;
  initialProfile?: CityOdorProfile;
}

export const CityPageTemplate = ({ citySlug, initialProfile }: CityPageTemplateProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const breadcrumbAriaLabel =
    locale === 'fr'
      ? 'Fil d Ariane'
      : 'Breadcrumb';
  const preparingCityGuideText =
    locale === 'fr'
      ? 'Preparation du guide de la ville...'
      : 'Preparing City Guide...';
  const loadingTipsPrefix =
    locale === 'fr'
      ? 'Chargement des meilleurs conseils anti-odeurs pour'
      : 'Loading the freshest odor control tips for';

  // Use initialProfile if provided (SSR), otherwise lookup (CSR fallback)
  const cityRecord = useMemo(() => {
    if (initialProfile) {
      return { profile: initialProfile, name: initialProfile.name, slug: initialProfile.slug, provinceCode: initialProfile.provinceCode };
    }

    // Fallback for CSR navigation or missing prop
    return citySlug ? getCityBySlug(citySlug) : undefined;
  }, [citySlug, initialProfile]);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Get profile data (may be undefined if city not found)
  const profile = cityRecord?.profile;

  // Derive values from profile (with safe defaults for missing city case)
  const provinceData = useMemo(() => {
    if (!profile?.provinceCode) return undefined;
    const code = profile.provinceCode.toLowerCase();
    const data = PROVINCES[code];
    return data;
  }, [profile?.provinceCode]);

  const provinceName = useMemo(() => {
    if (!profile) return '';
    if (locale === 'fr' && provinceData?.nameFr) return provinceData.nameFr;
    return provinceData?.name || profile.province || '';
  }, [profile, locale, provinceData]);

  const populationLabel = profile && profile.populationLabel !== 'n/a'
    ? profile.populationLabel
    : null;

  const climateInsights = useMemo(() => profile?.climateConsiderations.slice(0, 3) ?? [], [profile?.climateConsiderations]);
  const scentPainPoints = useMemo(() => profile?.scentPainPoints.slice(0, 3) ?? [], [profile?.scentPainPoints]);

  const keyFeatures = useMemo(() => profile && profile.housingHighlights.length > 0
    ? profile.housingHighlights
    : ['busy households', 'multi-cat families'], [profile]);

  // Redirect effect for missing city (must be after all hooks)
  useEffect(() => {
    if (!cityRecord && typeof globalThis.window !== 'undefined') {
      // Client-side: redirect to locations index for stale/missing city pages
      window.location.href = '/locations';
    }
  }, [cityRecord]);

  useEffect(() => {
    if (!profile) return;
    const loadTestimonials = async () => {
      const housingHighlight = keyFeatures[0] ?? 'urban living';
      const climateHighlight = climateInsights[0] ?? 'daily routines';
      const generated = await generateTestimonials(
        profile.name,
        profile.province,
        housingHighlight,
        climateHighlight,
        profile.slug,
      );
      setTestimonials(generated);
    };
    loadTestimonials();
  }, [profile, keyFeatures, climateInsights]);



  const seoTitle = profile
    ? interpolate(t('cityPage.seo.title') ?? 'Cat Litter Deodorizer in {{city}} | Purrify Activated Carbon', { city: profile.name })
    : '';
  const seoDescription = profile
    ? (populationLabel
      ? interpolate(t('cityPage.seo.descriptionWithPopulation') ?? 'Cat litter smell in {{city}}? Purrify activated carbon eliminates ammonia odors naturally. Ships fast across {{province}}. Loved by {{population}}+ cat owners.', { city: profile.name, province: provinceName, population: populationLabel })
      : interpolate(t('cityPage.seo.descriptionDefault') ?? 'Cat litter smell in {{city}}? Purrify activated carbon eliminates ammonia odors naturally. Ships fast across {{province}}. Safe for cats & kittens.', { city: profile.name, province: provinceName }))
    : '';

  const heroImage = useMemo(() => {
    if (!profile?.provinceCode) return '/optimized/locations/ontario.png';
    const code = profile.provinceCode.toLowerCase();
    return HERO_IMAGES[code] || '/optimized/locations/ontario.png';
  }, [profile?.provinceCode]);

  // Enhanced SEO with breadcrumbs (Home > Locations > City)
  const { breadcrumb } = useEnhancedSEO({
    path: profile ? `/locations/${profile.slug}` : '/locations',
    title: seoTitle,
    description: seoDescription,
    targetKeyword: profile ? `cat litter ${profile.name}` : 'cat litter',
    schemaType: 'location',
    schemaData: profile ? {
      name: profile.name,
      province: provinceName,
    } : undefined,
  });

  const seasonalTip = climateInsights[0] ?? 'changing seasons';
  const painPoint = scentPainPoints[0] ?? 'constant litter box odors';

  const provinceWidePills = locale === 'fr'
    ? {
      pill1: 'Additif sans parfum',
      pill2: 'Compatible avec la plupart des litieres',
      pill3: `Livraison rapide au ${provinceName}`,
      heading: `Les proprietaires de chats au ${provinceName} aiment Purrify`,
      description: `Des conseils et des ressources utiles pour reduire l'odeur de la litiere dans tout le ${provinceName}.`,
      explore: `Explorer plus de pages au ${provinceName} →`,
    }
    : {
      pill1: 'Fragrance-free additive',
      pill2: 'Works with most litter',
      pill3: `Fast ${provinceName} shipping`,
      heading: `Cat owners across ${provinceName} choose Purrify`,
      description: `Helpful guides and resources to reduce litter box odor across ${provinceName}.`,
      explore: `Explore more ${provinceName} pages →`,
    };

  useEffect(() => {
    if (!profile) return;
    safeTrackEvent('view_city_page', {
      event_category: 'city_page',
      city_slug: profile.slug,
      city_name: profile.name,
      province: provinceName,
      province_code: profile.provinceCode,
    });
  }, [profile, provinceName]);

  // Handle missing city - show loading state while redirect happens
  // Hydration safety check - show a targeted loading state if profile is missing
  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 bg-gray-900 p-4 text-center">
        <div className="w-12 h-12 border-4 border-orange-200 border-gray-700 border-t-orange-600 border-t-orange-400 rounded-full animate-spin mb-4 mx-auto"></div>
        <h2 className="text-xl font-bold text-gray-900 text-gray-100 mb-2">{preparingCityGuideText}</h2>
        <p className="text-gray-600 text-gray-400 max-w-sm">
          {loadingTipsPrefix} <span className="font-semibold text-orange-600 text-orange-400 capitalize">{citySlug}</span>.
        </p>
        <div className="mt-8 text-xs text-gray-400 text-gray-500 uppercase tracking-widest">
          {locale === 'fr' ? 'Chargement en cours...' : 'Locating Purrify Resources...'}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${GRADIENTS.pageBackground}`}>
        {/* Visual Breadcrumb Navigation */}
        {breadcrumb && breadcrumb.items.length > 1 && (
          <nav
            aria-label={breadcrumbAriaLabel}
            className="bg-white/50 bg-gray-800/50 border-b border-orange-100 border-gray-700"
          >
            <div className="max-w-6xl mx-auto px-4">
              <ol className="flex items-center space-x-2 text-sm py-3">
                {breadcrumb.items.map((item, index) => {
                  const isLast = index === breadcrumb.items.length - 1;
                  return (
                    <li key={item.path} className="flex items-center">
                      {index > 0 && (
                        <ChevronRight className="h-4 w-4 mx-2 text-gray-400 text-gray-500" />
                      )}
                      {index === 0 ? (
                        <Link
                          href={item.path}
                          className="text-gray-600 text-gray-400 hover:text-orange-600 hover:text-orange-400 transition-colors"
                        >
                          <Home className="h-4 w-4" />
                          <span className="sr-only">{item.name}</span>
                        </Link>
                      ) : isLast ? (
                        <span
                          className="font-medium text-gray-900 text-gray-100"
                          aria-current="page"
                        >
                          {item.name}
                        </span>
                      ) : (
                        <Link
                          href={item.path}
                          className="text-gray-600 text-gray-400 hover:text-orange-600 hover:text-orange-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>
        )}

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={`${profile.name} background`}
              fill
              sizes="100vw"
              className="object-cover opacity-20 opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/50 to-orange-50 via-gray-900/50 to-gray-900" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <h1 className={`font-heading text-4xl md:text-6xl font-bold mb-6 ${GRADIENTS.headingText}`}>
              {interpolate(t('cityPage.hero.heading') ?? 'Best Cat Litter Odor Eliminator in {{city}}', { city: profile.name })}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 text-gray-200 mb-8">
              {locale === 'fr'
                ? `Aditif au charbon actif pour reduire les odeurs de litiere a ${profile.name}, ${provinceName}.`
                : `Activated carbon additive to reduce litter box odor in ${profile.name}, ${provinceName}.`}
            </p>

            <div className="bg-white bg-gray-800/90 rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl font-bold mb-4 text-gray-900 text-gray-50">
                {interpolate(t('cityPage.whyChoose.heading') ?? 'Why {{city}} Cat Parents Choose Purrify', { city: profile.name })}
              </h2>
              <ul className="text-left space-y-2 text-gray-700 text-gray-200">
                {keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span className="text-green-500 text-green-400 mr-2 mt-1">✓</span>
                    <span>{interpolate(t('cityPage.whyChoose.perfectFor') ?? 'Perfect for {{feature}}', { feature: feature.toLowerCase() })}</span>
                  </li>
                ))}
                <li className="flex items-start">
                  <span className="text-green-500 text-green-400 mr-2 mt-1">✓</span>
                  <span>{seasonalTip}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 text-green-400 mr-2 mt-1">✓</span>
                  <span>{interpolate(t('cityPage.whyChoose.fastShipping') ?? 'Fast shipping across {{province}}', { province: provinceName })}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 text-green-400 mr-2 mt-1">✓</span>
                  <span>{t('cityPage.whyChoose.worksWithAllBrands') ?? 'Works with every litter brand you already love'}</span>
                </li>
              </ul>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/products/trial-size"
                  className={CTA_BUTTON_CLASSES}
                >
                  {interpolate(t('cityPage.cta.tryInCity') ?? 'Try Purrify in {{city}}', { city: profile.name })}
                </Link>
                <CityLeadCaptureCTA
                  cityName={profile.name}
                  provinceName={profile.province}
                  citySlug={profile.slug}
                  provinceCode={profile.provinceCode}
                  scentFocus={scentPainPoints[0] ?? 'Local odor hotspots we see every week'}
                />
                <Link
                  href="/learn/faq"
                  className="inline-flex items-center justify-center text-orange-600 text-orange-300 font-semibold"
                >
                  {t('cityPage.cta.seeHowItWorks') ?? 'See how the carbon technology works →'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Local Shipping Urgency - Conversion Optimization */}
        <LocalShippingUrgency
          cityName={profile.name}
          provinceName={provinceName}
          provinceCode={profile.provinceCode}
        />

        <section className={`py-16 px-4 ${GRADIENTS.blueSection}`}>
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-10 lg:grid-cols-2 items-start">
              <div className="order-2 lg:order-1">
                <h2 className="font-heading text-3xl font-bold mb-6 text-gray-900 text-gray-50">
                  {interpolate(t('cityPage.whereToFind.heading') ?? 'Where to Find Purrify in {{city}}', { city: profile.name })}
                </h2>
                <div className="space-y-6">
                  <div className="bg-white bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 border-gray-700">
                    <h3 className="font-heading text-xl font-bold mb-3 text-blue-900 text-blue-200">
                      {t('cityPage.whereToFind.localStore.heading') ?? 'Ask Your Local Pet Store'}
                    </h3>
                    <p className="text-gray-700 text-gray-200 mb-2">
                      {interpolate(t('cityPage.whereToFind.localStore.description') ?? 'Independent pet stores across {{city}} stock the odor eliminator cat parents talk about.', { city: profile.name })}
                    </p>
                    <p className="text-sm text-gray-600 text-gray-300">
                      {t('cityPage.whereToFind.localStore.tip') ?? 'Start with your favourite neighbourhood shop or tell them you want to see Purrify on the shelf.'}
                    </p>
                  </div>
                  <div className="bg-purple-50 bg-purple-900/20 p-6 rounded-lg border border-purple-200 border-purple-700">
                    <h3 className="font-heading text-xl font-bold mb-3 text-purple-900 text-purple-200">
                      {t('cityPage.whereToFind.orderDirect.heading') ?? 'Order Direct With Fast Shipping'}
                    </h3>
                    <p className="text-gray-700 text-gray-200 mb-4">
                      {interpolate(t('cityPage.whereToFind.orderDirect.description') ?? 'Prefer doorstep delivery? Order online and receive fresh air in 2-3 business days anywhere in {{province}}.', { province: provinceName })}
                    </p>
                    <Link
                      href="/products/trial-size"
                      className={CTA_BUTTON_CLASSES}
                    >
                      {t('cityPage.cta.shopOnline') ?? 'Shop Online Now'}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 shadow-xl p-6">
                  <h3 className="font-heading text-xl font-semibold text-gray-900 text-gray-50 mb-4">
                    {interpolate(t('cityPage.playbook.heading') ?? 'Fresh Air Playbook for {{city}}', { city: profile.name })}
                  </h3>
                  <ol className="space-y-3 text-left text-gray-700 text-gray-200">
                    <li className="flex items-start">
                      <span className="text-orange-500 text-orange-300 font-semibold mr-3">1</span>
                      <span>{t('cityPage.playbook.step1') ?? 'Sprinkle 2 tablespoons on top of your litter box after every scoop.'}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 text-orange-300 font-semibold mr-3">2</span>
                      <span>{interpolate(t('cityPage.playbook.step2') ?? 'Refresh every other day if your home deals with {{painPoint}}.', { painPoint: painPoint.toLowerCase() })}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 text-orange-300 font-semibold mr-3">3</span>
                      <span>{t('cityPage.playbook.step3') ?? 'Replace your litter box as usual—Purrify works with clumping, clay, and natural litters.'}</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {testimonials.length > 0 && (
          <section className="py-16 px-4 bg-white bg-gray-800">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-center mb-12 text-gray-900 text-gray-50">
                {interpolate(t('cityPage.testimonials.heading') ?? 'What {{city}} Cat Owners Say', { city: profile.name })}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.author} testimonial={testimonial} wasHelpfulText={t('cityPage.testimonials.wasHelpful') ?? 'Was this helpful?'} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related City Success Stories */}
        <section className={`py-16 px-4 ${GRADIENTS.purpleSection}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-6 text-gray-900 text-gray-50">
              {provinceWidePills.heading}
            </h2>
            <p className="text-gray-700 text-gray-200 mb-8">
              {provinceWidePills.description}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="inline-block px-4 py-2 bg-white bg-gray-700 rounded-full text-sm font-medium text-gray-900 text-white shadow-sm">
                {provinceWidePills.pill1}
              </span>
              <span className="inline-block px-4 py-2 bg-white bg-gray-700 rounded-full text-sm font-medium text-gray-900 text-gray-100 shadow-sm">
                {provinceWidePills.pill2}
              </span>
              <span className="inline-block px-4 py-2 bg-white bg-gray-700 rounded-full text-sm font-medium text-gray-900 text-gray-100 shadow-sm">
                {provinceWidePills.pill3}
              </span>
            </div>
            <div className="mt-8">
              <Link
                href={`/locations/${profile.provinceCode?.toLowerCase() || profile.province.toLowerCase().replaceAll(/\s+/g, '-')}`}
                className="inline-flex items-center text-orange-600 text-orange-400 font-semibold hover:text-orange-700 hover:text-orange-300 transition-colors"
              >
                {provinceWidePills.explore}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-12 text-gray-900 text-gray-50">
              {interpolate(t('cityPage.faq.heading') ?? '{{city}} FAQ', { city: profile.name })}
            </h2>
            <div className="space-y-6">
              <FAQItem
                question={interpolate(t('cityPage.faq.delivery.question') ?? 'Do you deliver to {{city}}, {{province}}?', { city: profile.name, province: provinceName })}
                answer={interpolate(t('cityPage.faq.delivery.answer') ?? 'Yes! Fast shipping across {{province}}, including every neighbourhood in {{city}}. Orders arrive within 2-3 business days.', { city: profile.name, province: provinceName })}
              />
              <FAQItem
                question={interpolate(t('cityPage.faq.painPoint.question') ?? 'How does Purrify support homes dealing with {{painPoint}}?', { painPoint: painPoint.toLowerCase() })}
                answer={interpolate(t('cityPage.faq.painPoint.answer') ?? "Sprinkle Purrify on top of your usual litter. The activated carbon bonds to ammonia molecules, even when {{painPoint}}. Fresh air without changing your cat's routine.", { painPoint: painPoint.toLowerCase() })}
              />
              <FAQItem
                question={interpolate(t('cityPage.faq.litterBrands.question') ?? 'Which litter brands work best with Purrify in {{city}}?', { city: profile.name })}
                answer={interpolate(t('cityPage.faq.litterBrands.answer') ?? "Purrify works with every litter type—clumping clay, crystal, natural pine, corn, wheat, and tofu litters. {{city}} cat owners pair it with the litter brands they already buy from independent pet shops, and it enhances them all without changing your cat's preferences.", { city: profile.name })}
              />
              <FAQItem
                question={interpolate(t('cityPage.faq.climate.question') ?? 'How does Purrify handle {{seasonalTip}} in {{province}}?', { seasonalTip: seasonalTip.toLowerCase(), province: provinceName })}
                answer={interpolate(t('cityPage.faq.climate.answer') ?? "The activated carbon technology works independently of temperature and humidity. Whether you're dealing with {{seasonalTip}} in {{city}}, Purrify's molecular odor capture continues 24/7. Perfect for {{keyFeature}} facing {{province}}'s climate challenges.", { seasonalTip: seasonalTip.toLowerCase(), city: profile.name, keyFeature: keyFeatures[0]?.toLowerCase() || 'busy households', province: provinceName })}
              />
              <FAQItem
                question={interpolate(t('cityPage.faq.stores.question') ?? 'Can I find Purrify at pet stores in {{city}}?', { city: profile.name })}
                answer={interpolate(t('cityPage.faq.stores.answer') ?? 'Many independent retailers in {{city}} stock Purrify. Call ahead to check availability, or order online for guaranteed 2-3 day delivery anywhere in {{province}}.', { city: profile.name, province: provinceName })}
              />
              <FAQItem
                question={interpolate(t('cityPage.faq.multiCat.question') ?? 'Is Purrify safe for multi-cat households in {{city}}?', { city: profile.name })}
                answer={interpolate(t('cityPage.faq.multiCat.answer') ?? "Absolutely! Purrify is completely safe for homes with multiple cats. Many {{city}} families use it across 2-4 litter boxes. The activated carbon is non-toxic, fragrance-free, and won't irritate sensitive cats. Perfect for {{keyFeature}}.", { city: profile.name, keyFeature: keyFeatures[1]?.toLowerCase() || 'multi-cat families' })}
              />
            </div>
          </div>
        </section>

        <CityInterlinkSection
          cityName={profile.name}
          provinceName={provinceName}
        />
    </div>
  );
};

export function createCityPage(slug: string) {
  const CityPage = () => <CityPageTemplate citySlug={slug} />;
  CityPage.displayName = `CityPage(${slug})`;
  return CityPage;
}

export default createCityPage;
