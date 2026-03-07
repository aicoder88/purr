'use client';

import dynamic from 'next/dynamic';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { ScrollAnchor } from '@/components/ui/scroll-anchor';
import { TrustBadges } from '@/components/social-proof/TrustBadges';
import { Container } from '@/components/ui/container';
import type { Currency } from '@/lib/geo/currency-detector';

// Section skeleton for loading states
const sectionSkeleton = (height: string, rounding: string = 'rounded-2xl') => (
  <div
    className={`${height} ${rounding} bg-gray-50 dark:bg-gray-800/70 animate-pulse`}
    aria-hidden="true"
  />
);

// Dynamically import below-the-fold sections to improve initial page load
const EnhancedProductComparison = dynamic(
  () => import('@/components/sections/enhanced-product-comparison').then(mod => ({ default: mod.EnhancedProductComparison })),
  {
    ssr: false,
    loading: () => sectionSkeleton('h-96', 'rounded-lg'),
  }
);

const CTA = dynamic(
  () => import('@/components/sections/cta').then(mod => ({ default: mod.CTA })),
  {
    ssr: false,
    loading: () => sectionSkeleton('h-64'),
  }
);

interface HomepageClientProps {
  priceValidUntil: string;
  locale: string;
  currency: Currency;
}

export function HomepageClient(_props: HomepageClientProps) {
  // A/B Test: Social Proof Position (badges moved to bottom of page)
  // Removed

  return (
    <>
      {/* Enhanced Product Comparison - Track conversion when user scrolls here */}
      <ScrollAnchor id="products" />
      <ErrorBoundary>
        <EnhancedProductComparison />
      </ErrorBoundary>

      {/* Trust Badges */}
      <section className="py-8 bg-gray-900/80 border-y border-gray-800">
        <Container>
          <TrustBadges variant="horizontal" maxBadges={5} />
        </Container>
      </section>

      {/* CTA Section */}
      <ErrorBoundary>
        <CTA />
      </ErrorBoundary>
    </>
  );
}
