'use client';

import dynamic from 'next/dynamic';
import { LazyLoad } from '@/components/performance/LazyLoad';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { ScrollAnchor } from '@/components/ui/scroll-anchor';
import { CurrencyProvider } from '@/lib/currency-context';
import { useABTestWithTracking, AB_TEST_SLUGS } from '@/lib/ab-testing';
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

export function HomepageClient({ priceValidUntil, locale, currency }: HomepageClientProps) {
  // A/B Test: Social Proof Position (badges moved to bottom of page)
  const { trackConversion: trackSocialProofConversion } = useABTestWithTracking(
    AB_TEST_SLUGS.SOCIAL_PROOF_POSITION
  );

  return (
    <CurrencyProvider detectedCurrency={currency}>
      {/* Enhanced Product Comparison - Track conversion when user scrolls here */}
      <div className="cv-auto cis-960">
        <ScrollAnchor id="products" onVisible={trackSocialProofConversion} />
        <ErrorBoundary>
          <LazyLoad placeholder={sectionSkeleton('h-96', 'rounded-lg')}>
            <EnhancedProductComparison />
          </LazyLoad>
        </ErrorBoundary>
      </div>

      {/* CTA Section */}
      <div className="cv-auto cis-480">
        <ErrorBoundary>
          <LazyLoad placeholder={sectionSkeleton('h-64')}>
            <CTA />
          </LazyLoad>
        </ErrorBoundary>
      </div>
    </CurrencyProvider>
  );
}
