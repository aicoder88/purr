/**
 * Tests for useAggregateReview Hook
 */

import { useMultipleReviews } from '../../src/hooks/useAggregateReview';

// useAggregateReview is now a React hook using useState/useEffect,
// so it requires a React test environment (renderHook). These tests
// cover the synchronous useMultipleReviews helper which returns
// fallback data without needing React.

const EMPTY_REVIEW = {
  ratingValue: 0,
  reviewCount: 0,
  bestRating: 5,
  worstRating: 1,
};

describe('useMultipleReviews', () => {
  it('returns empty review data for each requested product until live data exists', () => {
    const results = useMultipleReviews(['trial', 'standard', 'family']);

    expect(results).toHaveProperty('trial');
    expect(results).toHaveProperty('standard');
    expect(results).toHaveProperty('family');
    expect(results.trial.data).toEqual(EMPTY_REVIEW);
    expect(results.standard.data).toEqual(EMPTY_REVIEW);
    expect(results.family.data).toEqual(EMPTY_REVIEW);
  });

  it('includes isLive: false for fallback data', () => {
    const results = useMultipleReviews(['trial']);
    expect(results.trial.isLive).toBe(false);
  });

  it('generates correct schema', () => {
    const results = useMultipleReviews(['trial']);
    expect(results.trial.schema).toEqual({
      '@type': 'AggregateRating',
      ...EMPTY_REVIEW,
    });
  });

  it('applies locale formatting across all requested products', () => {
    const results = useMultipleReviews(['trial', 'standard'], 'fr');

    expect(results.trial.displayText.reviewCount).toBe('0 avis');
    expect(results.standard.displayText.reviewCount).toBe('0 avis');
  });

  it('formats display text for English locale', () => {
    const results = useMultipleReviews(['trial'], 'en');

    expect(results.trial.displayText.rating).toBe('');
    expect(results.trial.displayText.reviewCount).toBe('0 reviews');
    expect(results.trial.displayText.full).toBe('');
  });

  it('returns empty object for empty product list', () => {
    expect(useMultipleReviews([])).toEqual({});
  });

  it('uses empty review behavior for unknown products', () => {
    const results = useMultipleReviews(['trial', 'unknown']);

    expect(results.trial.data).toEqual(EMPTY_REVIEW);
    expect(results.unknown.data).toEqual(EMPTY_REVIEW);
  });

  it('falls back to English labels for unknown locales', () => {
    const results = useMultipleReviews(['trial'], 'de');
    expect(results.trial.displayText.reviewCount).toBe('0 reviews');
  });
});
