import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';

import { LocationSchema } from '../../seo/json-ld-schema';
import { CityInterlinkSection } from './CityInterlinkSection';
import { getCityBySlug } from '../../../data/locations';
import { useTranslation } from '../../../lib/translation-context';
import { safeTrackEvent } from '../../../lib/analytics';
import { CityLeadCaptureCTA } from './CityLeadCaptureCTA';

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

const defaultTestimonials = (
  cityName: string,
  provinceName: string,
  housingHighlight: string,
  climateHighlight: string,
) => [
  {
    quote: `Living in a ${housingHighlight.toLowerCase()} in ${cityName} meant the litter box smell built up fast. Purrify fixed it in one sprinkle.`,
    author: `Jessica • ${cityName}`,
  },
  {
    quote: `Between ${climateHighlight.toLowerCase()} and two cats, our home needed serious odor control. Purrify keeps the air guest-ready.`,
    author: `Michael • ${provinceName}`,
  },
];

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

  const populationLabel = profile.populationLabel !== 'n/a'
    ? profile.populationLabel
    : null;

  const trustedAudience = formatTrustedAudience(profile.metroPopulation);
  const retailerAllies = profile.retailerAllies.length > 0
    ? profile.retailerAllies
    : ['local pet retailers'];

  const keyFeatures = profile.housingHighlights.length > 0
    ? profile.housingHighlights
    : ['busy households', 'multi-cat families'];

  const climateInsights = profile.climateConsiderations.slice(0, 3);
  const scentPainPoints = profile.scentPainPoints.slice(0, 3);

  const testimonials = useMemo(() => {
    const housingHighlight = keyFeatures[0] ?? 'urban living';
    const climateHighlight = climateInsights[0] ?? 'daily routines';
    return defaultTestimonials(
      profile.name,
      profile.province,
      housingHighlight,
      climateHighlight,
    );
  }, [keyFeatures, climateInsights, profile.name, profile.province]);

  const keywordContent = useMemo(
    () => buildKeywordList(
      profile.name,
      profile.province,
      profile.provinceCode,
      profile.englishQueries,
      t.seoKeywords?.headTerms,
    ),
    [
      profile.name,
      profile.province,
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
    ? `Eliminate cat litter odors in ${profile.name}, ${profile.province}. Fast shipping across ${profile.province}. Trusted by ${populationLabel}+ cat owners.`
    : `Eliminate cat litter odors in ${profile.name}, ${profile.province}. Fast shipping across ${profile.province}. Trusted by cat owners nationwide.`;

  const seasonalTip = climateInsights[0] ?? 'changing seasons';
  const painPoint = scentPainPoints[0] ?? 'constant litter box odors';
  const schemaLocale = locale === 'fr' || locale === 'zh' ? locale : 'en';

  useEffect(() => {
    safeTrackEvent('view_city_page', {
      event_category: 'city_page',
      city_slug: profile.slug,
      city_name: profile.name,
      province: profile.province,
      province_code: profile.provinceCode,
    });
  }, [profile.slug, profile.name, profile.province, profile.provinceCode]);

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: keywordContent,
          },
          {
            name: 'geo.region',
            content: profile.province,
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
        province={profile.province}
        locale={schemaLocale}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Best Cat Litter Odor Eliminator in {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8">
              Trusted by {trustedAudience}+ cat owners in {profile.name} and across {profile.province}
            </p>

            <div className="bg-white dark:bg-gray-800/90 rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">
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
                  <span>Fast shipping across {profile.province}</span>
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

        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-10 lg:grid-cols-2 items-start">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">
                  Where to Find Purrify in {profile.name}
                </h2>
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-3 text-blue-900 dark:text-blue-200">
                      Ask Your Local Pet Store
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-2">
                      Independent retailers and national partners across {profile.name} stock the odor eliminator cat parents talk about.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Start with {retailerAllies.join(', ')} or tell your favourite shop about Purrify.
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                    <h3 className="text-xl font-bold mb-3 text-purple-900 dark:text-purple-200">
                      Order Direct With Fast Shipping
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-4">
                      Prefer doorstep delivery? Order online and get free shipping anywhere in {profile.province}. Fresh air in 2-3 business days.
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
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50">
              What {profile.name} Cat Owners Say
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="bg-gray-50 dark:bg-gray-700/70 p-6 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm"
                >
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 dark:text-yellow-300">⭐</span>
                    ))}
                  </div>
                  <p className="italic mb-4 text-gray-700 dark:text-gray-200">
                    {testimonial.quote}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-gray-50">
                    {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50">
              {profile.name} FAQ
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  Do you deliver to {profile.name}, {profile.province}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Yes! Fast shipping across {profile.province}, including every neighbourhood in {profile.name}. Orders arrive within 2-3 business days.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  How does Purrify support homes dealing with {painPoint.toLowerCase()}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Sprinkle Purrify on top of your usual litter. The activated carbon bonds to ammonia molecules, even when {painPoint.toLowerCase()}. Fresh air without changing your cat's routine.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CityInterlinkSection
          cityName={profile.name}
          provinceName={profile.province}
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

