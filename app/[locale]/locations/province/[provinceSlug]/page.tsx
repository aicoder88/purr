import type { Metadata } from 'next';

import { locales, isValidLocale } from '@/i18n/config';
import { locationsByProvince, getProvinceBySlug } from '@/data/locations';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { getTranslation } from '@/translations';

interface LocalizedProvincePageProps {
  params: Promise<{
    locale: string;
    provinceSlug: string;
  }>;
}

// Generate static params for all locales and provinces
export async function generateStaticParams() {
  const params: { locale: string; provinceSlug: string }[] = [];
  
  for (const locale of locales) {
    for (const province of locationsByProvince) {
      params.push({
        locale,
        provinceSlug: province.slug,
      });
    }
  }
  
  return params;
}

// Generate metadata for each locale/province combination
export async function generateMetadata({ params }: LocalizedProvincePageProps): Promise<Metadata> {
  const { locale, provinceSlug } = await params;
  
  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const province = getProvinceBySlug(provinceSlug);
  
  if (!province) {
    return { title: 'Province Not Found' };
  }

  const isFrench = locale === 'fr';
  const t = getTranslation(locale);
  const locations = t.locations;
  const displayName = province.name;
  
  // Use translations if available, fall back to English
  const seoTitle = locations
    ? `${locations.province.heading.replace('{{province}}', displayName)} (${province.code}) | ${SITE_NAME}`
    : `Cat Litter Odor Control in ${displayName} (${province.code}) | ${SITE_NAME}`;
    
  const seoDescription = locations
    ? locations.province.description.replace('{{province}}', province.name)
    : `Find Purrify in ${province.name}. Fast shipping and local support for cat litter odor control.`;
    
  const canonicalUrl = `${SITE_URL}${isFrench ? '/fr' : ''}/locations/province/${province.slug}/`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-CA': `${SITE_URL}/locations/province/${province.slug}/`,
        'fr-CA': `${SITE_URL}/fr/locations/province/${province.slug}/`,
        'en-US': `${SITE_URL}/locations/province/${province.slug}/`,
        'x-default': `${SITE_URL}/locations/province/${province.slug}/`,
      },
    },
    keywords: [
      `cat litter ${province.name}`,
      `pet supplies ${province.name}`,
      `cat litter delivery ${province.name}`,
      `purrify ${province.name}`,
      isFrench ? `litière ${province.name}` : '',
    ].filter(Boolean),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE_NAME,
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${SITE_URL}/optimized/locations/${province.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${province.name} Province Page`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: seoTitle,
      description: seoDescription,
      images: [`${SITE_URL}/optimized/locations/${province.slug}.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Re-export the page component from the original location
// This assumes the ProvincePage component can work with the locale
export { default } from '@/app/locations/province/[provinceSlug]/page';
