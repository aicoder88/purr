/**
 * Tests for useAggregateReview Hook
 */

import { useMultipleReviews } from '../../src/hooks/useAggregateReview';

// useAggregateReview is now a React hook using useState/useEffect,
// so it requires a React test environment (renderHook). These tests
// cover the synchronous useMultipleReviews helper which returns
// fallback data without needing React.

const FALLBACK_TRIAL = {
  ratingValue: 4.9,
  reviewCount: 84,
  bestRating: 5,
  worstRating: 1,
};

const FALLBACK_STANDARD = {
  ratingValue: 4.8,
  reviewCount: 156,
  bestRating: 5,
  worstRating: 1,
};

const FALLBACK_FAMILY = {
  ratingValue: 4.9,
  reviewCount: 62,
  bestRating: 5,
  worstRating: 1,
};

describe('useMultipleReviews', () => {
  it('returns fallback review data for each requested product', () => {
    const results = useMultipleReviews(['trial', 'standard', 'family']);

    expect(results).toHaveProperty('trial');
    expect(results).toHaveProperty('standard');
    expect(results).toHaveProperty('family');
    expect(results.trial.data).toEqual(FALLBACK_TRIAL);
    expect(results.standard.data).toEqual(FALLBACK_STANDARD);
    expect(results.family.data).toEqual(FALLBACK_FAMILY);
  });

  it('includes isLive: false for fallback data', () => {
    const results = useMultipleReviews(['trial']);
    expect(results.trial.isLive).toBe(false);
  });

  it('generates correct schema', () => {
    const results = useMultipleReviews(['trial']);
    expect(results.trial.schema).toEqual({
      '@type': 'AggregateRating',
      ...FALLBACK_TRIAL,
    });
  });

  it('applies locale formatting across all requested products', () => {
    const results = useMultipleReviews(['trial', 'standard'], 'fr');

    expect(results.trial.displayText.reviewCount).toBe('84 avis');
    expect(results.standard.displayText.reviewCount).toBe('156 avis');
  });

  it('formats display text for English locale', () => {
    const results = useMultipleReviews(['trial'], 'en');

    expect(results.trial.displayText.rating).toBe('4.9');
    expect(results.trial.displayText.reviewCount).toBe('84 reviews');
    expect(results.trial.displayText.full).toBe('4.9/5 from 84 reviews');
  });

  it('returns empty object for empty product list', () => {
    expect(useMultipleReviews([])).toEqual({});
  });

  it('uses trial fallback behavior for unknown products', () => {
    const results = useMultipleReviews(['trial', 'unknown']);

    expect(results.trial.data).toEqual(FALLBACK_TRIAL);
    expect(results.unknown.data).toEqual(FALLBACK_TRIAL); // Falls back to trial
  });

  it('falls back to English labels for unknown locales', () => {
    const results = useMultipleReviews(['trial'], 'de');
    expect(results.trial.displayText.reviewCount).toBe('84 reviews');
  });
});
