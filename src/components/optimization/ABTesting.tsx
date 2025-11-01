import { useEffect, useState, ReactNode, useCallback, useMemo } from 'react';
import { formatProductPrice, getProductPrice, formatCurrencyValue } from '../../lib/pricing';

interface ABTestConfig {
  testId: string;
  variants: {
    [key: string]: {
      weight: number;
      component: ReactNode;
    };
  };
  enabled?: boolean;
  sticky?: boolean; // Remember user's variant
}

interface ABTestProps extends ABTestConfig {
  fallback?: ReactNode;
}

// Hook for A/B testing
export function useABTest(testId: string, variants: string[], enabled = true) {
  const [variant, setVariant] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setVariant(variants[0]);
      setIsLoading(false);
      return;
    }

    // Check if user already has a variant assigned
    const storageKey = `ab_test_${testId}`;
    const existingVariant = localStorage.getItem(storageKey);

    if (existingVariant && variants.includes(existingVariant)) {
      setVariant(existingVariant);
      setIsLoading(false);
      return;
    }

    // Assign random variant
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    setVariant(randomVariant);
    localStorage.setItem(storageKey, randomVariant);

    // Track assignment
    trackABTestAssignment(testId, randomVariant);
    setIsLoading(false);
  }, [testId, variants, enabled]);

  return { variant, isLoading };
}

// A/B Test component
export function ABTest({ testId, variants, enabled = true, sticky = true, fallback }: ABTestProps) {
  const variantKeys = Object.keys(variants);
  const { variant, isLoading } = useABTest(testId, variantKeys, enabled);

  if (isLoading) {
    return fallback ? <>{fallback}</> : null;
  }

  if (!variant || !variants[variant]) {
    return variants[variantKeys[0]]?.component || null;
  }

  return <>{variants[variant].component}</>;
}

// Solution page A/B test variants
export function SolutionPageCTATest({
  testId = 'solution_cta_v1',
  productUrl = '/products/trial-size'
}: {
  testId?: string;
  productUrl?: string;
}) {
  const trialPrice = formatProductPrice('trial');
  const handleControlClick = useCallback(() => {
    trackABTestConversion(testId, 'control');
  }, [testId]);

  const handleUrgencyClick = useCallback(() => {
    trackABTestConversion(testId, 'urgency');
  }, [testId]);

  const variants = useMemo(() => ({
    control: {
      weight: 50,
      component: (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">Ready to Eliminate Odors?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Try Purrify risk-free and see the difference activated carbon makes.
          </p>
          <a
            href={productUrl}
            className="inline-block bg-blue-600 dark:bg-blue-600 text-white dark:text-gray-100 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-50 dark:hover:bg-blue-900/200 transition-colors shadow-lg"
            onClick={handleControlClick}
          >
            {`Try Purrify - ${trialPrice}`}
          </a>
        </div>
      )
    },
    urgency: {
      weight: 50,
      component: (
        <div className="text-center">
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-4 mb-6">
            <span className="text-red-700 dark:text-red-300 font-bold">⏰ Limited Stock - Try Today!</span>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">Stop Odors Today!</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Don't wait another day to eliminate embarrassing litter box odors. Join 1,000+ happy cat owners!
          </p>
          <a
            href={productUrl}
            className="inline-block bg-red-600 dark:bg-red-600 text-white dark:text-gray-100 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 dark:hover:bg-red-500 transition-colors shadow-lg animate-pulse"
            onClick={handleUrgencyClick}
          >
            Order Now!
          </a>
        </div>
      )
    }
  }), [handleControlClick, handleUrgencyClick, productUrl]);

  return <ABTest testId={testId} variants={variants} />;
}

// Hero section A/B test
export function SolutionPageHeroTest({
  testId = 'solution_hero_v1',
  title,
  description
}: {
  testId?: string;
  title: string;
  description: string;
}) {
  const variants = {
    problem_focused: {
      weight: 50,
      component: (
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Embarrassed by Cat Odors?
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
            Stop making excuses to guests. Eliminate litter box smells permanently with our proven solution.
          </p>
        </div>
      )
    },
    solution_focused: {
      weight: 50,
      component: (
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      )
    }
  };

  return <ABTest testId={testId} variants={variants} />;
}

// Social proof A/B test
export function SocialProofTest({ testId = 'social_proof_v1' }: { testId?: string }) {
  const variants = {
    testimonial: {
      weight: 50,
      component: (
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white dark:text-gray-100 text-center mb-16">
          <blockquote className="text-2xl font-medium mb-4">
            "I was skeptical, but Purrify completely eliminated the smell in just one day.
            My apartment finally feels fresh again!"
          </blockquote>
          <cite className="text-blue-100 dark:text-gray-300">— Jennifer L., Vancouver</cite>
        </div>
      )
    },
    statistics: {
      weight: 50,
      component: (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white dark:text-gray-100 text-center mb-16">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold">1,000+</div>
              <div className="text-sm opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99%</div>
              <div className="text-sm opacity-90">Odor Elimination</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24hrs</div>
              <div className="text-sm opacity-90">Maximum Results</div>
            </div>
          </div>
        </div>
      )
    }
  };

  return <ABTest testId={testId} variants={variants} />;
}

// Pricing A/B test
export function PricingTest({
  testId = 'pricing_v1',
  basePrice = getProductPrice('trial')
}: {
  testId?: string;
  basePrice?: number;
}) {
  const formattedBasePrice = formatCurrencyValue(basePrice);
  const variants = {
    regular: {
      weight: 50,
      component: (
        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
          {formattedBasePrice}
        </span>
      )
    },
    value_focused: {
      weight: 50,
      component: (
        <div className="inline-flex items-center gap-2">
          <span className="text-lg line-through text-gray-500 dark:text-gray-400">{formatCurrencyValue(basePrice * 1.5)}</span>
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formattedBasePrice}
          </span>
          <span className="bg-red-500 dark:bg-red-600 text-white dark:text-gray-100 text-xs px-2 py-1 rounded">SAVE 33%</span>
        </div>
      )
    }
  };

  return <ABTest testId={testId} variants={variants} />;
}

// Analytics functions
function trackABTestAssignment(testId: string, variant: string) {
  // Track with Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_assignment', {
      test_id: testId,
      variant: variant,
    });
  }

  // Track with custom analytics
  fetch('/api/analytics/ab-test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'assignment',
      testId,
      variant,
      timestamp: Date.now(),
      url: window.location.href
    })
  }).catch(() => {});
}

function trackABTestConversion(testId: string, variant: string) {
  // Track with Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_conversion', {
      test_id: testId,
      variant: variant,
    });
  }

  // Track with custom analytics
  fetch('/api/analytics/ab-test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'conversion',
      testId,
      variant,
      timestamp: Date.now(),
      url: window.location.href
    })
  }).catch(() => {});
}

// A/B test configuration hook
export function useABTestConfig() {
  const [config, setConfig] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Fetch A/B test configuration from API or environment
    const defaultConfig = {
      solution_cta_v1: true,
      solution_hero_v1: true,
      social_proof_v1: true,
      pricing_v1: false // Disabled by default
    };

    setConfig(defaultConfig);
  }, []);

  return config;
}
