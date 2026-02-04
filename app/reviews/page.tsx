import type { Metadata } from 'next';
import PageContent from './PageContent';

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
        url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
        width: 1200,
        height: 630,
        alt: 'Purrify Customer Reviews',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/reviews',
  },
};

export default function ReviewsPage() {
  return <PageContent />;
}
