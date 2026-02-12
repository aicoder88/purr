/**
 * Tests for useAggregateReview Hook
 */

import { useAggregateReview, useMultipleReviews } from '../../src/hooks/useAggregateReview';

const PLACEHOLDER_REVIEW_DATA = {
  ratingValue: 0,
  reviewCount: 0,
  bestRating: 5,
  worstRating: 1,
};

describe('useAggregateReview', () => {
  it.each(['trial', 'standard', 'family', 'familyAutoship'])(
    'returns placeholder review data for %s',
    (productKey) => {
      const result = useAggregateReview(productKey);

      expect(result.data).toEqual(PLACEHOLDER_REVIEW_DATA);
      expect(result.schema).toEqual({
        '@type': 'AggregateRating',
        ...PLACEHOLDER_REVIEW_DATA,
      });
    }
  );

  it('falls back to trial placeholder data for unknown product keys', () => {
    const result = useAggregateReview('unknown-product');

    expect(result.data).toEqual(PLACEHOLDER_REVIEW_DATA);
  });

  it('formats display text for English locale', () => {
    const result = useAggregateReview('trial', 'en');

    expect(result.displayText.rating).toBe('0.0');
    expect(result.displayText.reviewCount).toBe('0 reviews');
    expect(result.displayText.full).toBe('0.0/5 from 0 reviews');
  });

  it('formats display text for French locale', () => {
    const result = useAggregateReview('trial', 'fr');

    expect(result.displayText.rating).toBe('0.0');
    expect(result.displayText.reviewCount).toBe('0 avis');
    expect(result.displayText.full).toBe('0.0/5 from 0 avis');
  });

  it('formats display text for Chinese locale', () => {
    const result = useAggregateReview('trial', 'zh');

    expect(result.displayText.rating).toBe('0.0');
    expect(result.displayText.reviewCount).toBe('0 评价');
    expect(result.displayText.full).toBe('0.0/5 from 0 评价');
  });

  it('falls back to English labels for unknown locales', () => {
    const result = useAggregateReview('trial', 'de');

    expect(result.displayText.reviewCount).toBe('0 reviews');
  });
});

describe('useMultipleReviews', () => {
  it('returns review data for each requested product', () => {
    const results = useMultipleReviews(['trial', 'standard', 'family']);

    expect(results).toHaveProperty('trial');
    expect(results).toHaveProperty('standard');
    expect(results).toHaveProperty('family');
    expect(results.trial.data).toEqual(PLACEHOLDER_REVIEW_DATA);
    expect(results.standard.data).toEqual(PLACEHOLDER_REVIEW_DATA);
    expect(results.family.data).toEqual(PLACEHOLDER_REVIEW_DATA);
  });

  it('applies locale formatting across all requested products', () => {
    const results = useMultipleReviews(['trial', 'standard'], 'fr');

    expect(results.trial.displayText.reviewCount).toBe('0 avis');
    expect(results.standard.displayText.reviewCount).toBe('0 avis');
  });

  it('returns empty object for empty product list', () => {
    expect(useMultipleReviews([])).toEqual({});
  });

  it('uses trial fallback behavior for unknown products', () => {
    const results = useMultipleReviews(['trial', 'unknown']);

    expect(results.trial.data).toEqual(PLACEHOLDER_REVIEW_DATA);
    expect(results.unknown.data).toEqual(PLACEHOLDER_REVIEW_DATA);
  });
});
