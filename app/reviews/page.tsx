import type { Metadata } from 'next';
import PageContent from './PageContent';
import { SITE_NAME } from '@/lib/constants';
import { ScopedIntlProvider } from '@/components/providers/ScopedIntlProvider';
import {
  createBreadcrumbSchema,
  createIndexedWebPageSchema,
  serializeSchemaGraph,
} from '@/lib/seo/indexed-content-schema';

export const metadata: Metadata = {
  title: 'Purrify Reviews - What Cat Owners Are Saying',
  description: 'Read customer feedback about Purrify and learn how cat owners use an activated carbon additive to reduce litter box odor.',
  keywords: ['Purrify reviews', 'cat litter deodorizer reviews', 'customer testimonials', 'cat owner feedback'],
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/reviews/',
    siteName: SITE_NAME,
    title: 'Purrify Reviews - What Cat Owners Are Saying',
    description: 'Read customer feedback about Purrify and learn how cat owners use an activated carbon additive to reduce litter box odor.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
        width: 1200,
        height: 800,
        alt: 'Purrify Customer Reviews',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/reviews/',
    languages: {
      'en-CA': 'https://www.purrify.ca/reviews',
      'fr-CA': 'https://www.purrify.ca/fr/reviews',
      'x-default': 'https://www.purrify.ca/reviews',
    },
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
  other: {
    'last-modified': '2025-12-09',
  },
};

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
      <ScopedIntlProvider scopes={['root', 'reviews']}>
        <PageContent />
      </ScopedIntlProvider>
    </>
  );
}
