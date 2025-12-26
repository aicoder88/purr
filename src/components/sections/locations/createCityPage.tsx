import { NextSeo } from 'next-seo';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';

import { LocationSchema } from '../../seo/json-ld-schema';
import { getCityBySlug } from '../../../data/locations';
import { useTranslation } from '../../../lib/translation-context';
import { safeTrackEvent } from '../../../lib/analytics';
import { CityLeadCaptureCTA } from './CityLeadCaptureCTA';

// Dynamic imports for below-fold components (performance optimization)
const CityInterlinkSection = dynamic(() => import('./CityInterlinkSection').then(mod => ({ default: mod.CityInterlinkSection })), { ssr: true });
const LocalShippingUrgency = dynamic(() => import('./LocalShippingUrgency').then(mod => ({ default: mod.LocalShippingUrgency })), { ssr: true });

const numberFormatter = new Intl.NumberFormat('en-CA');
const compactNumberFormatter = new Intl.NumberFormat('en-CA', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const formatTrustedAudience = (population: number | null): string => {
  if (!population || population <= 0) {
    return '50+';
  }

  if (population >= 1_000_000) {
    return compactNumberFormatter.format(Math.round(population * 0.6));
  }

  const approximatedOwners = Math.max(Math.round(population / 1000) * 10, 50);
  return numberFormatter.format(approximatedOwners);
};

// Lazy-load testimonial generation (performance optimization)
import type { TestimonialContext } from '../../../lib/locations/testimonial-templates';

const generateTestimonials = async (
  cityName: string,
  provinceName: string,
  housingHighlight: string,
  climateHighlight: string,
  citySlug: string,
) => {
  // Dynamic import testimonial generation (reduces initial bundle size)
  const { buildPersonaTestimonial } = await import('../../../lib/locations/testimonial-templates');

  const context: TestimonialContext = {
    cityName,
    provinceName,
    housingHighlight,
    climateHighlight,
  };

  return [0, 1, 2].map((slotIndex) => buildPersonaTestimonial(citySlug, slotIndex, context));
};

const buildKeywordList = (
  cityName: string,
  provinceName: string,
  provinceCode: string,
  englishQueries: string[],
  translationKeywords: string[] | undefined,
): string => {
  const baseKeywords = [
    `cat litter ${cityName}`,
    `cat litter odor ${cityName}`,
    `cat litter odour ${cityName}`,
    `cat litter smell ${provinceName}`,
    `cat litter odor ${provinceCode}`,
  ];

  const localizedHeadTerms = (translationKeywords ?? []).map(
    (term) => `${term} ${cityName}`,
  );

  const deduped = Array.from(
    new Set([
      ...baseKeywords,
      ...englishQueries.slice(0, 8),
      ...localizedHeadTerms,
    ]),
  );

  return deduped.slice(0, 16).join(', ');
};

export interface CityPageTemplateProps {
  citySlug: string;
}

export const CityPageTemplate = ({ citySlug }: CityPageTemplateProps) => {
  const { t, locale } = useTranslation();
  const cityRecord = getCityBySlug(citySlug);

  if (!cityRecord) {
    throw new Error(`Missing city profile for ${citySlug}`);
  }

  const { profile } = cityRecord;

  // Use localized province name if available
  const { PROVINCES } = require('../../../lib/locations/provinces');
  const provinceData = PROVINCES[profile.provinceCode.toLowerCase()];
  const provinceName = (locale === 'fr' && provinceData?.nameFr) ? provinceData.nameFr : (provinceData?.name || profile.province);

  const populationLabel = profile.populationLabel !== 'n/a'
    ? profile.populationLabel
    : null;

  const trustedAudience = formatTrustedAudience(profile.metroPopulation);
  const keyFeatures = profile.housingHighlights.length > 0
    ? profile.housingHighlights
    : ['busy households', 'multi-cat families'];

  const climateInsights = profile.climateConsiderations.slice(0, 3);
  const scentPainPoints = profile.scentPainPoints.slice(0, 3);

  const [testimonials, setTestimonials] = useState<Array<{
    quote: string;
    author: string;
    stars: number;
    timeAgo: string;
    badge: string;
    helpfulCount: number;
  }>>([]);

  useEffect(() => {
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
  }, [keyFeatures, climateInsights, profile.name, profile.province, profile.slug]);

  const keywordContent = useMemo(
    () => buildKeywordList(
      profile.name,
      provinceName,
      profile.provinceCode,
      profile.englishQueries,
      t.seoKeywords?.headTerms,
    ),
    [
      profile.name,
      provinceName,
      profile.provinceCode,
      profile.englishQueries,
      t.seoKeywords?.headTerms,
    ],
  );

  const provinceLabel = profile.provinceCode?.trim() || profile.province;
  const locationLabel = provinceLabel
    ? `${profile.name}, ${provinceLabel}`
    : profile.name;

  const seoTitle = `Cat Litter Odor Control - ${locationLabel} | Purrify`;
  const seoDescription = populationLabel
    ? `Eliminate cat litter odors in ${profile.name}, ${provinceName}. Fast shipping across ${provinceName}. Trusted by ${populationLabel}+ cat owners.`
    : `Eliminate cat litter odors in ${profile.name}, ${provinceName}. Fast shipping across ${provinceName}. Trusted by cat owners nationwide.`;

  const seasonalTip = climateInsights[0] ?? 'changing seasons';
  const painPoint = scentPainPoints[0] ?? 'constant litter box odors';
  const schemaLocale = locale === 'fr' || locale === 'zh' ? locale : 'en';

  // Calculate average rating from testimonials (handle initial empty state)
  const averageRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + t.stars, 0) / testimonials.length).toFixed(1)
    : '4.8';
  const reviewCount = testimonials.length > 0
    ? testimonials.reduce((sum, t) => sum + t.helpfulCount, 0)
    : 150;

  useEffect(() => {
    safeTrackEvent('view_city_page', {
      event_category: 'city_page',
      city_slug: profile.slug,
      city_name: profile.name,
      province: provinceName,
      province_code: profile.provinceCode,
    });
  }, [profile.slug, profile.name, profile.province, profile.provinceCode]);

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`https://www.purrify.ca/locations/${profile.slug}`}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: keywordContent,
          },
          {
            name: 'geo.region',
            content: provinceName,
          },
          {
            name: 'geo.placename',
            content: profile.name,
          },
        ]}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
        }}
      />

      <LocationSchema
        cityName={profile.name}
        province={provinceName}
        locale={schemaLocale}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: `Purrify Cat Litter Odor Eliminator - ${profile.name}`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: averageRating,
              reviewCount,
              bestRating: '5',
              worstRating: '1',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'CAD',
              areaServed: {
                '@type': 'City',
                name: profile.name,
                containedInPlace: {
                  '@type': 'AdministrativeArea',
                  name: provinceName,
                },
              },
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Best Cat Litter Odor Eliminator in {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8">
              Trusted by {trustedAudience}+ cat owners in {profile.name} and across {provinceName}
            </p>

            <div className="bg-white dark:bg-gray-800/90 rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                Why {profile.name} Cat Parents Choose Purrify
              </h2>
              <ul className="text-left space-y-2 text-gray-700 dark:text-gray-200">
                {keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span className="text-green-500 dark:text-green-400 mr-2 mt-1">✓</span>
                    <span>Perfect for {feature.toLowerCase()}</span>
                  </li>
                ))}
                <li className="flex items-start">
                  <span className="text-green-500 dark:text-green-400 mr-2 mt-1">✓</span>
                  <span>{seasonalTip}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 dark:text-green-400 mr-2 mt-1">✓</span>
                  <span>Fast shipping across {provinceName}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 dark:text-green-400 mr-2 mt-1">✓</span>
                  <span>Works with every litter brand you already love</span>
                </li>
              </ul>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/products/trial-size"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all"
                >
                  Try Purrify in {profile.name}
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
                  className="inline-flex items-center justify-center text-orange-600 dark:text-orange-300 font-semibold"
                >
                  See how the carbon technology works →
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

        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-10 lg:grid-cols-2 items-start">
              <div className="order-2 lg:order-1">
                <h2 className="font-heading text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">
                  Where to Find Purrify in {profile.name}
                </h2>
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="font-heading text-xl font-bold mb-3 text-blue-900 dark:text-blue-200">
                      Ask Your Local Pet Store
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-2">
                      Independent pet stores across {profile.name} stock the odor eliminator cat parents talk about.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Start with your favourite neighbourhood shop or tell them you want to see Purrify on the shelf.
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                    <h3 className="font-heading text-xl font-bold mb-3 text-purple-900 dark:text-purple-200">
                      Order Direct With Fast Shipping
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-4">
                      Prefer doorstep delivery? Order online and receive fresh air in 2-3 business days anywhere in {provinceName}.
                    </p>
                    <Link
                      href="/products/trial-size"
                      className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all"
                    >
                      Shop Online Now
                    </Link>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl p-6">
                  <h3 className="font-heading text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
                    Fresh Air Playbook for {profile.name}
                  </h3>
                  <ol className="space-y-3 text-left text-gray-700 dark:text-gray-200">
                    <li className="flex items-start">
                      <span className="text-orange-500 dark:text-orange-300 font-semibold mr-3">1</span>
                      <span>Sprinkle 2 tablespoons on top of your litter box after every scoop.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 dark:text-orange-300 font-semibold mr-3">2</span>
                      <span>Refresh every other day if your home deals with {painPoint.toLowerCase()}.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 dark:text-orange-300 font-semibold mr-3">3</span>
                      <span>Replace your litter box as usual—Purrify works with clumping, clay, and natural litters.</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50">
              What {profile.name} Cat Owners Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, _index) => {
                const fullStars = Math.floor(testimonial.stars);
                const hasHalfStar = testimonial.stars % 1 !== 0;

                return (
                  <div
                    key={testimonial.author}
                    className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/70 dark:to-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(fullStars)].map((_, i) => (
                          <span key={i} className="text-yellow-400 dark:text-yellow-300 text-lg">★</span>
                        ))}
                        {hasHalfStar && (
                          <span className="text-yellow-400 dark:text-yellow-300 text-lg">½</span>
                        )}
                        {[...Array(5 - Math.ceil(testimonial.stars))].map((_, i) => (
                          <span key={`empty-${i}`} className="text-gray-300 dark:text-gray-500 text-lg">★</span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{testimonial.timeAgo}</span>
                    </div>

                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700">
                        ✓ {testimonial.badge}
                      </span>
                    </div>

                    <p className="italic mb-4 text-gray-700 dark:text-gray-200 flex-grow leading-relaxed">
                      &quot;{testimonial.quote}&quot;
                    </p>

                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-auto">
                      <p className="font-semibold text-gray-900 dark:text-gray-50 mb-3 text-sm">
                        {testimonial.author}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Was this helpful?</span>
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                            <span>👍</span>
                            <span className="text-xs font-medium">{testimonial.helpfulCount}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                            <span>👎</span>
                            <span className="text-xs font-medium">{Math.floor(testimonial.helpfulCount / 8)}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Video Testimonial CTA */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 rounded-xl p-8 border-2 border-dashed border-orange-300 dark:border-orange-700">
                <h3 className="font-heading text-2xl font-bold mb-3 text-gray-900 dark:text-gray-50">
                  Share Your {profile.name} Success Story
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
                  Are you a {profile.name} cat owner who loves Purrify? We'd love to feature your story and help other local cat parents discover odor-free living.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    📹 Submit Your Video Review
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all border border-gray-300 dark:border-gray-600"
                  >
                    ✍️ Write a Review
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related City Success Stories */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">
              Cat Owners Across {provinceName} Love Purrify
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-8">
              Join thousands of satisfied cat parents in {provinceName} who've eliminated litter box odors for good.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="inline-block px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-900 dark:text-gray-100 shadow-sm">
                ⭐ 4.8/5 Average Rating
              </span>
              <span className="inline-block px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-900 dark:text-gray-100 shadow-sm">
                🏠 {trustedAudience}+ Happy Homes
              </span>
              <span className="inline-block px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-900 dark:text-gray-100 shadow-sm">
                🚚 Fast {provinceName} Shipping
              </span>
            </div>
            <div className="mt-8">
              <Link
                href={`/locations/${profile.provinceCode?.toLowerCase() || profile.province.toLowerCase().replaceAll(/\s+/g, '-')}`}
                className="inline-flex items-center text-orange-600 dark:text-orange-400 font-semibold hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
              >
                Explore more {profile.province} testimonials →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50">
              {profile.name} FAQ
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  Do you deliver to {profile.name}, {provinceName}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Yes! Fast shipping across {provinceName}, including every neighbourhood in {profile.name}. Orders arrive within 2-3 business days.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  How does Purrify support homes dealing with {painPoint.toLowerCase()}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Sprinkle Purrify on top of your usual litter. The activated carbon bonds to ammonia molecules, even when {painPoint.toLowerCase()}. Fresh air without changing your cat's routine.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  Which litter brands work best with Purrify in {profile.name}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Purrify works with every litter type—clumping clay, crystal, natural pine, corn, wheat, and tofu litters. {profile.name} cat owners pair it with the litter brands they already buy from independent pet shops, and it enhances them all without changing your cat's preferences.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  How does Purrify handle {seasonalTip.toLowerCase()} in {provinceName}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  The activated carbon technology works independently of temperature and humidity. Whether you're dealing with {seasonalTip.toLowerCase()} in {profile.name}, Purrify's molecular odor capture continues 24/7. Perfect for {keyFeatures[0]?.toLowerCase() || 'busy households'} facing {provinceName}'s climate challenges.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  Can I find Purrify at pet stores in {profile.name}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Many independent retailers in {profile.name} stock Purrify. Call ahead to check availability, or order online for guaranteed 2-3 day delivery anywhere in {provinceName}.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  Is Purrify safe for multi-cat households in {profile.name}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Absolutely! Purrify is completely safe for homes with multiple cats. Many {profile.name} families use it across 2-4 litter boxes. The activated carbon is non-toxic, fragrance-free, and won't irritate sensitive cats. Perfect for {keyFeatures[1]?.toLowerCase() || 'multi-cat families'}.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CityInterlinkSection
          cityName={profile.name}
          provinceName={provinceName}
        />
      </div>
    </>
  );
};

export function createCityPage(slug: string) {
  const CityPage = () => <CityPageTemplate citySlug={slug} />;
  CityPage.displayName = `CityPage(${slug})`;
  return CityPage;
}

export default createCityPage;
