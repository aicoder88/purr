"use client";

import Link from 'next/link';
import { useEffect } from 'react';

import { getProvinceBySlug, getCitiesByProvince, getCityCountByProvince } from '@/lib/locations/provinces';
import { useTranslation } from '@/lib/translation-context';
import { safeTrackEvent } from '@/lib/analytics';

export interface ProvincePageTemplateProps {
  provinceSlug: string;
}

export const ProvincePageTemplate = ({ provinceSlug }: ProvincePageTemplateProps) => {
  const { locale } = useTranslation();
  const province = getProvinceBySlug(provinceSlug);
  const cities = getCitiesByProvince(provinceSlug);

  if (!province) {
    throw new Error(`Missing province data for ${provinceSlug}`);
  }

  const provinceName = locale === 'fr' ? province.nameFr : province.name;
  const description = locale === 'fr' ? province.descriptionFr : province.description;
  const cityCount = getCityCountByProvince(provinceSlug);

  // Group cities by region for better organization
  const majorCities = cities.filter(city => city.metroPopulation && city.metroPopulation > 100000);


  useEffect(() => {
    safeTrackEvent('view_province_page', {
      event_category: 'province_page',
      province_slug: province.slug,
      province_name: province.name,
      province_code: province.code,
      city_count: cityCount,
    });
  }, [province.slug, province.name, province.code, cityCount]);

  return (
    <>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Place',
            name: provinceName,
            address: {
              '@type': 'PostalAddress',
              addressRegion: province.code,
              addressCountry: 'CA',
            },
            containsPlace: cities.slice(0, 10).map(city => ({
              '@type': 'City',
              name: city.name,
              url: `https://www.purrify.ca/locations/${city.slug}`,
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <nav className="mb-6 text-sm">
              <Link
                href="/locations"
                prefetch={false}
                className="text-orange-600 dark:text-orange-400 hover:underline"
              >
                {locale === 'fr' ? 'Emplacements' : 'Locations'}
              </Link>
              <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
              <span className="text-gray-700 dark:text-gray-300">{provinceName}</span>
            </nav>

            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              {locale === 'fr'
                ? `Contrôle des Odeurs de Litière pour Chat en ${provinceName}`
                : `Cat Litter Odor Control in ${provinceName}`
              }
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
              {description}
            </p>

            <div className="bg-white dark:bg-gray-800/90 rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    {cityCount}+
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {locale === 'fr' ? 'Villes Desservies' : 'Cities Served'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    2-3
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {locale === 'fr' ? 'Jours de Livraison' : 'Day Shipping'}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    96%
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {locale === 'fr' ? 'Satisfaction Client' : 'Customer Satisfaction'}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/products/trial-size"
                  prefetch={false}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all"
                >
                  {locale === 'fr' ? 'Essayer Purrify' : 'Try Purrify'}
                </Link>
                <Link
                  href="/learn/how-it-works"
                  prefetch={false}
                  className="inline-flex items-center justify-center text-orange-600 dark:text-orange-300 font-semibold"
                >
                  {locale === 'fr' ? 'Comment ça fonctionne →' : 'How it works →'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Major Cities Section */}
        {majorCities.length > 0 && (
          <section className="py-16 px-4 bg-white dark:bg-gray-800">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50">
                {locale === 'fr'
                  ? `Grandes Villes en ${provinceName}`
                  : `Major Cities in ${provinceName}`
                }
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {majorCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/locations/${city.slug}`}
                    prefetch={false}
                    className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/70 dark:to-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                      {city.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {city.populationLabel} {locale === 'fr' ? 'résidents' : 'residents'}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {city.housingHighlights.slice(0, 2).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <span className="text-orange-600 dark:text-orange-400 font-semibold text-sm">
                      {locale === 'fr' ? 'Voir les détails →' : 'View details →'}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Cities Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50">
              {locale === 'fr'
                ? `Toutes les Villes en ${provinceName}`
                : `All Cities in ${provinceName}`
              }
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  prefetch={false}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-md transition-all"
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-50">
                    {city.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {city.populationLabel}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Purrify Section */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50">
              {locale === 'fr'
                ? `Pourquoi les Propriétaires de Chats en ${provinceName} Choisissent Purrify`
                : `Why ${provinceName} Cat Owners Choose Purrify`
              }
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-700">
                <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 dark:text-gray-50">
                  {locale === 'fr' ? 'Technologie au Charbon Actif' : 'Activated Carbon Technology'}
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  {locale === 'fr'
                    ? 'Élimine les odeurs à la source en capturant les molécules d\'ammoniac, pas seulement en les masquant.'
                    : 'Eliminates odors at the source by capturing ammonia molecules, not just masking them.'
                  }
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
                <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 dark:text-gray-50">
                  {locale === 'fr' ? 'Sans Parfum' : 'Fragrance-Free'}
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  {locale === 'fr'
                    ? 'Aucun parfum artificiel. Sûr pour les chats sensibles et les propriétaires ayant des allergies.'
                    : 'No artificial fragrances. Safe for sensitive cats and owners with allergies.'
                  }
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
                <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 dark:text-gray-50">
                  {locale === 'fr' ? 'Livraison Rapide' : 'Fast Shipping'}
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  {locale === 'fr'
                    ? `Livraison en 2-3 jours ouvrables partout en ${provinceName}. Commandez en ligne pour une livraison à domicile.`
                    : `2-3 business day shipping across ${provinceName}. Order online for doorstep delivery.`
                  }
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
                <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 dark:text-gray-50">
                  {locale === 'fr' ? 'Fonctionne avec Toutes les Litières' : 'Works with All Litters'}
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  {locale === 'fr'
                    ? 'Compatible avec les litières agglomérantes, cristaux, naturelles et toutes les marques que vous aimez.'
                    : 'Compatible with clumping, crystal, natural litters and all the brands you already love.'
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">
              {locale === 'fr'
                ? `Prêt à Éliminer les Odeurs de Litière en ${provinceName}?`
                : `Ready to Eliminate Litter Box Odors in ${provinceName}?`
              }
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-200 mb-8">
              {locale === 'fr'
                ? `Rejoignez des milliers de propriétaires de chats satisfaits en ${provinceName}.`
                : `Join thousands of satisfied cat owners across ${provinceName}.`
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products/trial-size"
                prefetch={false}
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-4 px-8 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl text-lg"
              >
                {locale === 'fr' ? 'Commander Maintenant' : 'Order Now'}
              </Link>
              <Link
                href="/learn/faq"
                prefetch={false}
                className="inline-flex items-center justify-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold py-4 px-8 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all border border-gray-300 dark:border-gray-600 text-lg"
              >
                {locale === 'fr' ? 'En Savoir Plus' : 'Learn More'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
