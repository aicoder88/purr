import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import {
  Province,
  getProvinceBySlug,
  locationsByProvince,
} from '@/data/locations';
import { getTranslation } from '@/translations';
import type { TranslationType } from '@/translations/types';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

interface ProvincePageProps {
  params: Promise<{
    provinceSlug: string;
  }>;
}

const PROVINCE_DISPLAY_OVERRIDES: Record<string, string> = {
  'Newfoundland and Labrador': 'Newfoundland & Labrador',
};

/** Replace {{key}} placeholders with values */
const interpolate = (template: string, vars: Record<string, string>): string =>
  Object.entries(vars).reduce(
    (result, [key, value]) => result.replace(new RegExp(`{{${key}}}`, 'g'), value),
    template
  );

// Generate static params for all provinces
export async function generateStaticParams() {
  const locales = ['en', 'fr', 'zh'];

  // Pre-render ALL province pages for all locales
  const paths = locales.flatMap(() =>
    locationsByProvince.map((province) => ({
      provinceSlug: province.slug,
    }))
  );

  return paths;
}

// Generate metadata for each province page
export async function generateMetadata({ params }: ProvincePageProps): Promise<Metadata> {
  const { provinceSlug } = await params;
  const province = getProvinceBySlug(provinceSlug);

  if (!province) {
    return {
      title: 'Province Not Found',
    };
  }

  const t = getTranslation('en');
  const locations = t.locations;
  const displayName = PROVINCE_DISPLAY_OVERRIDES[province.name] ?? province.name;
  const seoTitle = locations 
    ? `${interpolate(locations.province.heading, { province: displayName })} (${province.code}) | ${SITE_NAME}`
    : `${displayName} | ${SITE_NAME}`;
  const seoDescription = locations 
    ? interpolate(locations.province.description, { province: province.name })
    : `Find Purrify in ${province.name}`;
  const canonicalUrl = `${SITE_URL}/locations/province/${province.slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-CA': `${SITE_URL}/locations/province/${province.slug}`,
        'fr-CA': `${SITE_URL}/fr/locations/province/${province.slug}`,
        'zh-CN': `${SITE_URL}/zh/locations/province/${province.slug}`,
        'es': `${SITE_URL}/es/locations/province/${province.slug}`,
        'x-default': `${SITE_URL}/locations/province/${province.slug}`,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
    },
  };
}

// Breadcrumb schema
function generateBreadcrumbSchema(t: TranslationType, province: Province) {
  const displayName = PROVINCE_DISPLAY_OVERRIDES[province.name] ?? province.name;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t.nav.home,
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: `${SITE_URL}/locations`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: displayName,
        item: `${SITE_URL}/locations/province/${province.slug}`,
      },
    ],
  };
}

export default async function ProvincePage({ params }: ProvincePageProps) {
  const { provinceSlug } = await params;
  const province = getProvinceBySlug(provinceSlug);

  if (!province) {
    notFound();
  }

  const t = getTranslation('en');
  const locations = t.locations;
  
  if (!locations) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const otherProvinces = locationsByProvince.filter(
    (candidateProvince) => candidateProvince.slug !== province.slug
  );

  const displayName = PROVINCE_DISPLAY_OVERRIDES[province.name] ?? province.name;
  const breadcrumb = generateBreadcrumbSchema(t, province);

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        {/* Visual Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="bg-white/50 dark:bg-gray-800/50 border-b border-orange-100 dark:border-gray-700"
        >
          <div className="max-w-5xl mx-auto px-4">
            <ol className="flex items-center space-x-2 text-sm py-3">
              <li className="flex items-center">
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span className="sr-only">{t.nav.home}</span>
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-500" />
                <Link
                  href="/locations"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Locations
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-500" />
                <span
                  className="font-medium text-gray-900 dark:text-gray-100"
                  aria-current="page"
                >
                  {displayName}
                </span>
              </li>
            </ol>
          </div>
        </nav>

        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/80 dark:bg-gray-800/70 border border-orange-200 dark:border-orange-500/60 text-xs sm:text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-300">
              {locations.province.badge}
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-50">
              {interpolate(locations.province.heading, { province: province.name })}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
              {interpolate(locations.province.description, { province: province.name })}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/products/trial-size"
                className="inline-flex items-center px-6 py-3 font-semibold text-white dark:text-gray-100 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg shadow-lg hover:from-orange-600 hover:to-pink-600 transition"
              >
                {locations.hub.shopCta}
              </Link>
              <Link
                href="#province-cities"
                className="inline-flex items-center px-6 py-3 font-semibold text-orange-600 dark:text-orange-300 bg-white dark:bg-gray-800/80 border border-orange-200 dark:border-orange-500/50 rounded-lg shadow-sm hover:text-orange-700 dark:hover:text-orange-200 transition"
              >
                {locations.province.viewCityGuide}
              </Link>
            </div>
          </div>
        </section>

        <section id="province-cities" className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-50">
              {interpolate(locations.province.citiesHeading, { province: province.name })}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {province.cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  className="group flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70 p-5 transition hover:border-orange-300 dark:hover:border-orange-500/70 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-50 group-hover:text-orange-600 dark:group-hover:text-orange-300">
                    {city.name}
                  </span>
                  <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {interpolate(locations.province.cityCardDescription, { city: city.name })}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">
              {locations.province.exploreOther}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {otherProvinces.map((candidateProvince) => (
                <Link
                  key={candidateProvince.slug}
                  href={`/locations/province/${candidateProvince.slug}`}
                  className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/70 px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition hover:border-orange-300 dark:hover:border-orange-500/70 hover:text-orange-600 dark:hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-400"
                >
                  {candidateProvince.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
