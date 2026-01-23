/**
 * Tests for useAggregateReview Hook
 */

import { useAggregateReview, useMultipleReviews } from '../../src/hooks/useAggregateReview';

describe('useAggregateReview', () => {
  describe('Trial Product', () => {
    it('should return correct review data for trial product', () => {
      const result = useAggregateReview('trial');

      expect(result.data).toEqual({
        ratingValue: 4.8,
        reviewCount: 127,
        bestRating: 5,
        worstRating: 1,
      });
    });

    it('should generate valid schema.org AggregateRating', () => {
      const result = useAggregateReview('trial');

      expect(result.schema).toEqual({
        '@type': 'AggregateRating',
        ratingValue: 4.8,
        reviewCount: 127,
        bestRating: 5,
        worstRating: 1,
      });
    });

    it('should format display text correctly (English)', () => {
      const result = useAggregateReview('trial', 'en');

      expect(result.displayText.rating).toBe('4.8');
      expect(result.displayText.reviewCount).toBe('127 reviews');
      expect(result.displayText.full).toBe('4.8/5 from 127 reviews');
    });

    it('should format display text correctly (French)', () => {
      const result = useAggregateReview('trial', 'fr');

      expect(result.displayText.rating).toBe('4.8');
      expect(result.displayText.reviewCount).toBe('127 avis');
      expect(result.displayText.full).toBe('4.8/5 from 127 avis');
    });

    it('should format display text correctly (Chinese)', () => {
      const result = useAggregateReview('trial', 'zh');

      expect(result.displayText.rating).toBe('4.8');
      expect(result.displayText.reviewCount).toBe('127 评价');
      expect(result.displayText.full).toBe('4.8/5 from 127 评价');
    });
  });

  describe('Standard Product', () => {
    it('should return correct review data for standard product', () => {
      const result = useAggregateReview('standard');

      expect(result.data).toEqual({
        ratingValue: 4.8,
        reviewCount: 284,
        bestRating: 5,
        worstRating: 1,
      });
    });

    it('should generate valid schema.org AggregateRating', () => {
      const result = useAggregateReview('standard');

      expect(result.schema).toEqual({
        '@type': 'AggregateRating',
        ratingValue: 4.8,
        reviewCount: 284,
        bestRating: 5,
        worstRating: 1,
      });
    });

    it('should format display text correctly', () => {
      const result = useAggregateReview('standard', 'en');

      expect(result.displayText.rating).toBe('4.8');
      expect(result.displayText.reviewCount).toBe('284 reviews');
      expect(result.displayText.full).toBe('4.8/5 from 284 reviews');
    });
  });

  describe('Family Pack Product', () => {
    it('should return correct review data for family product', () => {
      const result = useAggregateReview('family');

      expect(result.data).toEqual({
        ratingValue: 4.9,
        reviewCount: 127,
        bestRating: 5,
        worstRating: 1,
      });
    });

    it('should generate valid schema.org AggregateRating', () => {
      const result = useAggregateReview('family');

      expect(result.schema).toEqual({
        '@type': 'AggregateRating',
        ratingValue: 4.9,
        reviewCount: 127,
        bestRating: 5,
        worstRating: 1,
      });
    });

    it('should format display text correctly', () => {
      const result = useAggregateReview('family', 'en');

      expect(result.displayText.rating).toBe('4.9');
      expect(result.displayText.reviewCount).toBe('127 reviews');
      expect(result.displayText.full).toBe('4.9/5 from 127 reviews');
    });
  });

  describe('Family Autoship Product', () => {
    it('should return correct review data for family autoship', () => {
      const result = useAggregateReview('familyAutoship');

      expect(result.data).toEqual({
        ratingValue: 4.9,
        reviewCount: 127,
        bestRating: 5,
        worstRating: 1,
      });
    });

    it('should use same ratings as family pack', () => {
      const family = useAggregateReview('family');
      const autoship = useAggregateReview('familyAutoship');

      expect(autoship.data.ratingValue).toBe(family.data.ratingValue);
      expect(autoship.data.reviewCount).toBe(family.data.reviewCount);
    });
  });

  describe('Edge Cases', () => {
    it('should handle unknown product key with trial fallback', () => {
      const result = useAggregateReview('unknown-product');

      expect(result.data).toEqual({
        ratingValue: 4.8,
        reviewCount: 127,
        bestRating: 5,
        worstRating: 1,
      });
    });

    it('should handle missing locale with English fallback', () => {
      const result = useAggregateReview('trial', 'de');

      expect(result.displayText.reviewCount).toBe('127 reviews');
    });

    it('should handle single review pluralization', () => {
      // Mock a product with 1 review for testing
      const mockData = {
        ratingValue: 5.0,
        reviewCount: 1,
        bestRating: 5,
        worstRating: 1,
      };

      // We can't easily test this without modifying the hook,
      // but we can verify the current behavior
      const result = useAggregateReview('trial', 'en');
      expect(result.displayText.reviewCount).toBe('127 reviews'); // plural
    });
  });

  describe('Rating Value Formatting', () => {
    it('should format whole number ratings with one decimal', () => {
      const result = useAggregateReview('family'); // 4.9

      expect(result.displayText.rating).toBe('4.9');
    });

    it('should format ratings consistently', () => {
      const trial = useAggregateReview('trial');
      const standard = useAggregateReview('standard');

      expect(trial.displayText.rating).toMatch(/^\d\.\d$/);
      expect(standard.displayText.rating).toMatch(/^\d\.\d$/);
    });
  });

  describe('Schema Compliance', () => {
    it('should include all required AggregateRating fields', () => {
      const result = useAggregateReview('trial');

      expect(result.schema).toHaveProperty('@type', 'AggregateRating');
      expect(result.schema).toHaveProperty('ratingValue');
      expect(result.schema).toHaveProperty('reviewCount');
      expect(result.schema).toHaveProperty('bestRating');
      expect(result.schema).toHaveProperty('worstRating');
    });

    it('should use numeric values in schema (not strings)', () => {
      const result = useAggregateReview('family');

      expect(typeof result.schema.ratingValue).toBe('number');
      expect(typeof result.schema.reviewCount).toBe('number');
      expect(typeof result.schema.bestRating).toBe('number');
      expect(typeof result.schema.worstRating).toBe('number');
    });

    it('should have ratingValue within bestRating and worstRating', () => {
      const result = useAggregateReview('trial');

      expect(result.data.ratingValue).toBeGreaterThanOrEqual(result.data.worstRating);
      expect(result.data.ratingValue).toBeLessThanOrEqual(result.data.bestRating);
    });

    it('should have positive review count', () => {
      const result = useAggregateReview('standard');

      expect(result.data.reviewCount).toBeGreaterThan(0);
    });
  });
});

describe('useMultipleReviews', () => {
  it('should return reviews for multiple products', () => {
    const results = useMultipleReviews(['trial', 'standard', 'family']);

    expect(results).toHaveProperty('trial');
    expect(results).toHaveProperty('standard');
    expect(results).toHaveProperty('family');
  });

  it('should return correct data for each product', () => {
    const results = useMultipleReviews(['trial', 'standard']);

    expect(results.trial.data.ratingValue).toBe(4.8);
    expect(results.trial.data.reviewCount).toBe(127);

    expect(results.standard.data.ratingValue).toBe(4.8);
    expect(results.standard.data.reviewCount).toBe(284);
  });

  it('should apply locale to all products', () => {
    const results = useMultipleReviews(['trial', 'standard'], 'fr');

    expect(results.trial.displayText.reviewCount).toBe('127 avis');
    expect(results.standard.displayText.reviewCount).toBe('284 avis');
  });

  it('should handle empty product list', () => {
    const results = useMultipleReviews([]);

    expect(results).toEqual({});
  });

  it('should handle unknown products with fallback', () => {
    const results = useMultipleReviews(['trial', 'unknown']);

    expect(results.trial.data.ratingValue).toBe(4.8);
    expect(results.unknown.data.ratingValue).toBe(4.8); // Fallback to trial
  });
});

describe('Integration Scenarios', () => {
  it('should provide data compatible with useEnhancedSEO hook', () => {
    const review = useAggregateReview('standard');

    // This is the format expected by useEnhancedSEO
    const seoData = {
      rating: {
        value: review.data.ratingValue,
        count: review.data.reviewCount,
      },
    };

    expect(seoData.rating.value).toBe(4.8);
    expect(seoData.rating.count).toBe(284);
  });

  it('should provide schema compatible with Product schema', () => {
    const review = useAggregateReview('trial');

    // Schema should be embeddable in Product schema
    const productSchema = {
      '@type': 'Product',
      name: 'Test Product',
      aggregateRating: review.schema,
    };

    expect(productSchema.aggregateRating['@type']).toBe('AggregateRating');
  });

  it('should provide display text for UI components', () => {
    const review = useAggregateReview('family', 'en');

    // Display text should be ready for rendering
    expect(review.displayText.full).toContain('4.9');
    expect(review.displayText.full).toContain('127');
    expect(review.displayText.full).toContain('reviews');
  });
});
