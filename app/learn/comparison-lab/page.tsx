export const dynamic = 'force-static';

import ComparisonLabHubClient from '@/components/comparison-lab/ComparisonLabHubClient';
import { getComparisonLabGraph, getComparisonLabMetadata } from '@/lib/comparison-lab/seo';

export const metadata = getComparisonLabMetadata('en');

export default function ComparisonLabPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': getComparisonLabGraph('en'),
          }),
        }}
      />
      <ComparisonLabHubClient />
    </>
  );
}
