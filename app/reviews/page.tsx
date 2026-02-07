import type { Metadata } from 'next';
import PageContent from './PageContent';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Purrify Reviews - What Cat Owners Are Saying',
  description: 'Read verified reviews from real cat owners who have transformed their homes with Purrify. ★ 4.9/5 average rating from 138+ customers across Canada.',
  keywords: ['Purrify reviews', 'cat litter freshener reviews', 'customer testimonials', 'verified reviews', 'cat owner feedback'],
  openGraph: {
    title: 'Purrify Reviews - What Cat Owners Are Saying',
    description: 'Read verified reviews from real cat owners who have transformed their homes with Purrify. ★ 4.9/5 average rating from 138+ customers.',
    url: 'https://www.purrify.ca/reviews',
    images: [
      {
        url: 'https://www.purrify.ca/images/purrify-logo.png',
        width: 1200,
        height: 630,
        alt: 'Purrify Customer Reviews',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/reviews',
  },
  other: {
    'last-modified': '2025-12-09',
  },
};

// AggregateRating schema for Reviews page
const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: SITE_NAME,
  description: 'Activated carbon cat litter deodorizer',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '138',
    bestRating: '5',
  },
  url: 'https://www.purrify.ca/reviews',
};

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      <PageContent />
    </>
  );
}
