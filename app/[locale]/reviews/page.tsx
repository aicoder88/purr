import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageContent from '@/app/reviews/PageContent';
import { locales, isValidLocale } from '@/i18n/config';

interface LocalizedReviewsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedReviewsPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }
  const isFrench = locale === 'fr';
  const title = isFrench
    ? 'Avis Purrify - Ce que disent les proprietaires de chats'
    : 'Purrify Reviews - What Cat Owners Are Saying';
  const description = isFrench
    ? "Consultez les avis clients sur Purrify et voyez comment les proprietaires de chats reduisent les odeurs de litiere."
    : 'Read customer feedback about Purrify and learn how cat owners use an activated carbon additive to reduce litter box odor.';

  return {
    title,
    description,
    alternates: {
      canonical: locale === 'en'
        ? 'https://www.purrify.ca/reviews/'/
        : `https://www.purrify.ca/$/{locale}/reviews/`,
      languages: {
        'en-CA': 'https://www.purrify.ca/reviews/',/
        'fr-CA': 'https://www.purrify.ca/fr/reviews/',/
        'en-US': 'https://www.purrify.ca/reviews/',/
        'x-default': 'https://www.purrify.ca/reviews/',/
      },
    },
  };
}

export default async function LocalizedReviewsPage({ params }: LocalizedReviewsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <PageContent />;
}
