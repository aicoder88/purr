import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import SupportPageClient from '@/app/support/SupportPageClient';
import {
  createBreadcrumbSchema,
  createIndexedWebPageSchema,
  serializeSchemaGraph,
} from '@/lib/seo/indexed-content-schema';
import {
  createCustomerServiceSchema,
  getSupportCopy,
  getSupportMetadata,
  SUPPORT_SOCIAL_IMAGE,
} from '@/app/support/support-seo';

interface LocalizedSupportPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedSupportPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  return getSupportMetadata(locale === 'fr' ? 'fr' : 'en');
}

export default async function LocalizedSupportPage({ params }: LocalizedSupportPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const isFrench = locale === 'fr';
  const supportCopy = getSupportCopy(isFrench ? 'fr' : 'en');
  const webPageSchema = createIndexedWebPageSchema({
    locale,
    path: '/support/',
    title: supportCopy.title,
    description: supportCopy.description,
    image: SUPPORT_SOCIAL_IMAGE,
  });

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: isFrench ? 'Accueil' : 'Home', path: '/' },
    { name: 'Support', path: '/support/' },
  ]);

  const customerServiceSchema = createCustomerServiceSchema(isFrench ? 'fr' : 'en');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchemaGraph(webPageSchema, breadcrumbSchema, customerServiceSchema),
        }}
      />
      <SupportPageClient />
    </>
  );
}
