export const dynamic = 'force-static';

import ComparisonMethodologyPageClient from '@/components/comparison-lab/ComparisonMethodologyPageClient';
import {
  getComparisonMethodologyGraph,
  getComparisonMethodologyMetadata,
} from '@/lib/comparison-lab/seo';

export const metadata = getComparisonMethodologyMetadata('en');

export default function ComparisonMethodologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': getComparisonMethodologyGraph('en'),
          }),
        }}
      />
      <ComparisonMethodologyPageClient />
    </>
  );
}
