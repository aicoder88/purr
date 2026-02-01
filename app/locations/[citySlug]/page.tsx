import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityBySlug, getAllCities } from '@/data/locations';
import { CityPageTemplate } from '@/components/sections/locations/createCityPage';
import { getTranslation } from '@/translations';
import type { TranslationType } from '@/translations/types';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

interface CityPageProps {
  params: Promise<{
    citySlug: string;
  }>;
}

/** Replace {{key}} placeholders with values */
const interpolate = (template: string, vars: Record<string, string>): string =>
  Object.entries(vars).reduce(
    (result, [key, value]) => result.replace(new RegExp(`{{${key}}}`, 'g'), value),
    template
  );

// Generate static params for all cities
export async function generateStaticParams() {
  const allCities = getAllCities();
  const locales = ['en', 'fr', 'zh'];

  // Generate paths for ALL cities across all available locales
  const paths = locales.flatMap(() =>
    allCities.map((city) => ({
      citySlug: city.slug,
    }))
  );

  return paths;
}

// Generate metadata for each city page
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return {
      title: 'City Not Found',
    };
  }

  const t = getTranslation('en') as TranslationType;
  const cityPageTranslations = t.cityPage;
  
  const seoTitle = cityPageTranslations?.seo?.title
    ? `${interpolate(cityPageTranslations.seo.title, { city: city.name })} | ${SITE_NAME}`
    : `Cat Litter Deodorizer in ${city.name} | ${SITE_NAME}`;
    
  const seoDescription = city?.profile?.populationLabel
    ? `${cityPageTranslations?.seo?.descriptionWithPopulation ?? 'Cat litter smell in {{city}}? Purrify activated carbon eliminates ammonia odors naturally. Ships fast across {{province}}. Loved by {{population}}+ cat owners.'}`
        .replace('{{city}}', city.name)
        .replace('{{province}}', city.profile.province)
        .replace('{{population}}', city.profile.populationLabel)
    : `${cityPageTranslations?.seo?.descriptionDefault ?? 'Cat litter smell in {{city}}? Purrify activated carbon eliminates ammonia odors naturally. Ships fast across {{province}}. Safe for cats & kittens.'}`
        .replace('{{city}}', city.name)
        .replace('{{province}}', city.profile.province);

  const canonicalUrl = `${SITE_URL}/locations/${city.slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-CA': `${SITE_URL}/locations/${city.slug}`,
        'fr-CA': `${SITE_URL}/fr/locations/${city.slug}`,
        'zh-CN': `${SITE_URL}/zh/locations/${city.slug}`,
        'es': `${SITE_URL}/es/locations/${city.slug}`,
        'x-default': `${SITE_URL}/locations/${city.slug}`,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
    },
    robots: {
      // Only index English pages for SEO
      index: city.profile?.indexed !== false,
      follow: true,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  // Render the CityPageTemplate with the citySlug
  // This is a client component that handles all the dynamic rendering
  return <CityPageTemplate citySlug={citySlug} />;
}
