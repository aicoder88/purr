import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SITE_NAME } from '@/lib/constants';
import {
  SCIENTIFIC_CITATIONS,
} from '@/lib/scientific-citations';
import { stripContext } from '@/lib/seo-utils';
import { ScienceHero } from './components/ScienceHero';
import { StatsSection } from './components/StatsSection';
import { ClaimReviews } from './components/ClaimReviews';
import { CitationsSection } from './components/CitationsSection';
import { KeyTakeaways } from './components/KeyTakeaways';
import { ScienceCTA } from './components/ScienceCTA';

export const metadata: Metadata = {
  title: 'Science Behind Purrify: Research & Citations',
  description:
    'Explore scientific research and authoritative resources supporting activated carbon for cat litter odor control, with citations to primary and trusted sources.',
  keywords: [
    'activated carbon research',
    'ammonia adsorption',
    'cat litter science',
    'peer-reviewed citations',
    'pubmed research',
  ],
  alternates: {
    canonical: 'https://www.purrify.ca/science/'
  },
  openGraph: {
    title: 'Science Behind Purrify: Research & Citations',
    description:
      'Explore the peer-reviewed scientific research supporting activated carbon for cat litter odor control.',
    url: 'https://www.purrify.ca/science/',
    type: 'article',
    siteName: SITE_NAME,
    locale: 'en_CA',
    publishedTime: '2025-01-15',
    modifiedTime: new Date().toISOString(),
    images: [
      {
        url: 'https://www.purrify.ca/optimized/blog/benefits-hero-science.webp',
        width: 1200,
        height: 630,
        alt: 'The Science Behind Purrify',
      },
    ],
  },
  other: {
    'last-modified': '2026-01-27',
  },
};

export default function SciencePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Science Behind Purrify: Peer-Reviewed Research & Citations',
    description:
      'Explore the peer-reviewed scientific research supporting activated carbon for cat litter odor control.',
    datePublished: '2025-01-15',
    dateModified: new Date().toISOString().split('T')[0],
    image: 'https://www.purrify.ca/optimized/blog/benefits-hero-science.webp',
    author: {
      '@type': 'Organization',
      name: 'Purrify',
      url: 'https://www.purrify.ca/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Purrify',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.purrify.ca/optimized/logos/purrify-logo.avif',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.purrify.ca/science',
    },
  };


  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Scientific Research & Citations',
    description: 'Peer-reviewed research supporting activated carbon for cat litter odor control',
    url: 'https://www.purrify.ca/science/',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: SCIENTIFIC_CITATIONS.map((citation, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'ScholarlyArticle',
          headline: citation.title,
          author: citation.authors,
          isPartOf: {
            '@type': 'Periodical',
            name: citation.journal,
          },
          identifier: citation.doi || citation.pmid,
          url: citation.url,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              stripContext(articleSchema),
              stripContext(collectionPageSchema),
            ],
          }),
        }}
      />

      <main className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F4F7FF] to-[#FFFFFF] from-gray-900 via-[#1A1C29] to-gray-900">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-blue-400/20 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-electric-indigo/20 bg-electric-indigo/20 rounded-full blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto relative">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-[#FF3131] hover:text-[#FF6B6B]">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li className="text-[#FF3131] text-[#FF6B6B]">Science Hub</li>
              </ol>
            </nav>

            {/* Hero Section */}
            <ScienceHero />

            {/* Key Statistics */}
            <StatsSection />

            {/* Claim Reviews Section */}
            <ClaimReviews />

            {/* Citations by Category */}
            <CitationsSection />

            {/* Key Takeaways */}
            <KeyTakeaways />

            {/* CTA Section */}
            <ScienceCTA />
          </div>
        </Container>
      </main>
    </>
  );
}
