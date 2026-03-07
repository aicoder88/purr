/**
 * useAggregateReview Hook
 * Provides aggregate review/rating data for products with SEO schema support.
 * Fetches from the reviews API when available and defaults to empty data when none exists.
 */

import { useState, useEffect } from 'react';

export interface AggregateReview {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
}

export interface AggregateReviewResult {
  data: AggregateReview;
  schema: {
    '@type': string;
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
  displayText: {
    rating: string;
    reviewCount: string;
    full: string;
  };
  isLive: boolean;
}

const EMPTY_REVIEW: Omit<AggregateReview, 'bestRating' | 'worstRating'> = {
  ratingValue: 0,
  reviewCount: 0,
};

function formatRating(value: number): string {
  return value.toFixed(1);
}

function formatReviewCount(count: number, locale: string = 'en'): string {
  const labels: Record<string, { singular: string; plural: string }> = {
    en: { singular: 'review', plural: 'reviews' },
    fr: { singular: 'avis', plural: 'avis' },
  };
  const label = labels[locale] || labels.en;
  return `${count} ${count === 1 ? label.singular : label.plural}`;
}

function buildResult(ratingValue: number, reviewCount: number, locale: string, isLive: boolean): AggregateReviewResult {
  const data: AggregateReview = { ratingValue, reviewCount, bestRating: 5, worstRating: 1 };
  const hasReviews = reviewCount > 0;
  return {
    data,
    schema: {
      '@type': 'AggregateRating',
      ratingValue: data.ratingValue,
      reviewCount: data.reviewCount,
      bestRating: data.bestRating,
      worstRating: data.worstRating,
    },
    displayText: {
      rating: hasReviews ? formatRating(data.ratingValue) : '',
      reviewCount: formatReviewCount(data.reviewCount, locale),
      full: hasReviews ? `${formatRating(data.ratingValue)}/5 from ${formatReviewCount(data.reviewCount, locale)}` : '',
    },
    isLive,
  };
}

/**
 * useAggregateReview Hook
 * Tries to fetch live review data from the API. Defaults to empty review data when unavailable.
 */
export function useAggregateReview(
  productKey: string,
  locale: string = 'en'
): AggregateReviewResult {
  const [result, setResult] = useState<AggregateReviewResult>(
    buildResult(EMPTY_REVIEW.ratingValue, EMPTY_REVIEW.reviewCount, locale, false)
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchLive() {
      try {
        const res = await fetch(`/api/reviews/aggregate?productId=${productKey}`);
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (cancelled) return;

        if (typeof data.totalReviews === 'number' && typeof data.averageRating === 'number') {
          setResult(buildResult(data.averageRating, data.totalReviews, locale, data.totalReviews > 0));
        }
      } catch {
        // Keep empty default state
      }
    }

    fetchLive();
    return () => { cancelled = true; };
  }, [productKey, locale]);

  return result;
}

/**
 * Get review data for multiple products
 */
export function useMultipleReviews(
  productKeys: string[],
  locale: string = 'en'
): Record<string, AggregateReviewResult> {
  const results: Record<string, AggregateReviewResult> = {};
  for (const key of productKeys) {
    void key;
    results[key] = buildResult(EMPTY_REVIEW.ratingValue, EMPTY_REVIEW.reviewCount, locale, false);
  }
  return results;
}
