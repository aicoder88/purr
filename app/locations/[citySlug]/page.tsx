import type { Metadata } from 'next';


import { getCityBySlug, getAllCities } from '@/data/locations';
import { CityPageTemplate } from '@/components/sections/locations/createCityPage';
import { getTranslation } from '@/translations';
import type { TranslationType } from '@/translations/types';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { generateLocalBusinessSchema } from '@/lib/seo-utils';
import { StructuredData } from '@/components/seo/StructuredData';

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
  // Generate paths for ALL cities
  const paths = allCities.map((city) => ({
    citySlug: city.slug,
  }));

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

  const canonicalUrl = `${SITE_URL}/locations/${city.slug}/`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-CA': `${SITE_URL}/locations/${city.slug}/`,
        // Note: Non-English location pages are excluded from sitemap (noindexed)
        // Only English version exists to prevent thin content
        'x-default': `${SITE_URL}/locations/${city.slug}/`,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_CA',
      images: [
        {
          url: `${SITE_URL}/optimized/logos/purrify-logo.png`,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    keywords: [`cat litter ${city.name}`, `pet odor removal ${city.profile.province}`, `cat litter delivery ${city.name}`, `purrify ${city.name}`],
    robots: {
      // Only index English pages for SEO
      index: city.profile?.indexed !== false,
      follow: true,
      googleBot: {
        index: city.profile?.indexed !== false,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: seoTitle,
      description: seoDescription,
      images: [`${SITE_URL}/optimized/logos/purrify-logo.png`],
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  // Generate LocalBusiness schema for this city
  const localBusinessSchema = generateLocalBusinessSchema(
    city.name,
    city.profile.province,
    'en',
    'CAD'
  );

  return (
    <>
      <StructuredData schema={localBusinessSchema} />
      <CityPageTemplate citySlug={citySlug} initialProfile={city.profile} />
    </>
  );
}
