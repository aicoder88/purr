import type { Metadata } from 'next';
import PageContent from './PageContent';
import { SITE_NAME } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import {
  createBreadcrumbSchema,
  createIndexedWebPageSchema,
  serializeSchemaGraph,
} from '@/lib/seo/indexed-content-schema';

export const metadata: Metadata = buildPageMetadata({
  title: 'Purrify Reviews - What Cat Owners Are Saying',
  description:
    'Read customer feedback about Purrify and learn how cat owners use an activated carbon additive to reduce litter box odor.',
  path: '/reviews/',
  image: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
  imageAlt: 'Purrify Customer Reviews',
  keywords: ['Purrify reviews', 'cat litter deodorizer reviews', 'customer testimonials', 'cat owner feedback'],
  alternates: {
    canonical: 'https://www.purrify.ca/reviews/',
    languages: {
      'en-CA': 'https://www.purrify.ca/reviews/',
      'fr-CA': 'https://www.purrify.ca/fr/reviews/',
      'en-US': 'https://www.purrify.ca/reviews/',
      'x-default': 'https://www.purrify.ca/reviews/',
    },
  },
  openGraphLocale: 'en_CA',
  lastModified: '2025-12-09',
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
});

const webPageSchema = createIndexedWebPageSchema({
  locale: 'en',
  path: '/reviews/',
  title: `Customer Reviews | ${SITE_NAME}`,
  description: 'Read customer feedback about Purrify and learn how cat owners use an activated carbon additive for litter box odor control.',
  image: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
});

const breadcrumbSchema = createBreadcrumbSchema('en', [
  { name: 'Home', path: '/' },
  { name: 'Reviews', path: '/reviews/' },
]);

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchemaGraph(webPageSchema, breadcrumbSchema),
        }}
      />
      <PageContent />
    </>
  );
}
