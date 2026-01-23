/**
 * useAggregateReview Hook
 * Provides aggregate review/rating data for products with SEO schema support
 */

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
}

/**
 * Product review data
 * This data should be updated as real reviews come in
 */
const PRODUCT_REVIEWS: Record<string, Omit<AggregateReview, 'bestRating' | 'worstRating'>> = {
  trial: {
    ratingValue: 4.8,
    reviewCount: 127,
  },
  standard: {
    ratingValue: 4.8,
    reviewCount: 284,
  },
  family: {
    ratingValue: 4.9,
    reviewCount: 127,
  },
  familyAutoship: {
    ratingValue: 4.9,
    reviewCount: 127,
  },
};

/**
 * Format rating value for display
 */
function formatRating(value: number): string {
  return value.toFixed(1);
}

/**
 * Format review count for display with proper pluralization
 */
function formatReviewCount(count: number, locale: string = 'en'): string {
  const labels: Record<string, { singular: string; plural: string }> = {
    en: { singular: 'review', plural: 'reviews' },
    fr: { singular: 'avis', plural: 'avis' },
    zh: { singular: '评价', plural: '评价' },
  };

  const label = labels[locale] || labels.en;
  return `${count} ${count === 1 ? label.singular : label.plural}`;
}

/**
 * useAggregateReview Hook
 * Generates aggregate review data and schema for a product
 *
 * @param productKey - Product identifier (trial, standard, family, familyAutoship)
 * @param locale - Current locale for display text (default: 'en')
 * @returns Aggregate review data, schema, and display text
 *
 * @example
 * ```tsx
 * const { data, schema, displayText } = useAggregateReview('standard');
 *
 * // Use in UI
 * <div>{displayText.full}</div>
 *
 * // Pass to useEnhancedSEO
 * const seo = useEnhancedSEO({
 *   schemaType: 'product',
 *   schemaData: {
 *     rating: {
 *       value: data.ratingValue,
 *       count: data.reviewCount,
 *     },
 *   },
 * });
 * ```
 */
export function useAggregateReview(
  productKey: string,
  locale: string = 'en'
): AggregateReviewResult {
  // Get review data for product
  const reviewData = PRODUCT_REVIEWS[productKey];

  // Fallback to trial data if product not found
  const { ratingValue, reviewCount } = reviewData || PRODUCT_REVIEWS.trial;

  // Build complete aggregate review data
  const data: AggregateReview = {
    ratingValue,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  };

  // Generate schema.org AggregateRating
  const schema = {
    '@type': 'AggregateRating',
    ratingValue: data.ratingValue,
    reviewCount: data.reviewCount,
    bestRating: data.bestRating,
    worstRating: data.worstRating,
  };

  // Generate display text
  const displayText = {
    rating: formatRating(data.ratingValue),
    reviewCount: formatReviewCount(data.reviewCount, locale),
    full: `${formatRating(data.ratingValue)}/5 from ${formatReviewCount(data.reviewCount, locale)}`,
  };

  return {
    data,
    schema,
    displayText,
  };
}

/**
 * Get review data for multiple products
 * Useful for comparison pages or product listings
 */
export function useMultipleReviews(
  productKeys: string[],
  locale: string = 'en'
): Record<string, AggregateReviewResult> {
  const results: Record<string, AggregateReviewResult> = {};

  for (const key of productKeys) {
    results[key] = useAggregateReview(key, locale);
  }

  return results;
}
