import type { Metadata } from 'next';

import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';

interface LocalizedCaseStudiesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedCaseStudiesPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const baseUrl = 'https://www.purrify.ca';
  const canonicalPath = `${baseUrl}/case-studies/`;

  return {
    title: `Success Stories - Real Customer Results | ${SITE_NAME}`,
    description: 'Before-and-after case studies showing how cat owners improved litter box odor control with Purrify in real homes across Canada.',
    keywords: ['Purrify case studies', 'cat odor success stories', 'customer results', 'before and after'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': canonicalPath,
        'en-US': canonicalPath,
        'x-default': canonicalPath,
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: `Success Stories | ${SITE_NAME}`,
      description: 'Real results from satisfied customers.',
      locale: 'en_CA',
      images: [
        {
          url: `${baseUrl}/optimized/products/three-bags-no-bg.webp`,
          width: 1200,
          height: 630,
          alt: 'Customer success stories',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: `Customer Success | ${SITE_NAME}`,
      description: 'Real results from cat owners.',
      images: [`${baseUrl}/optimized/products/three-bags-no-bg.webp`],
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Locale-prefixed case studies currently reuse the English body copy.
// Keep them accessible, but canonicalize to English and exclude them from indexing.
export { default } from '@/app/case-studies/page';
