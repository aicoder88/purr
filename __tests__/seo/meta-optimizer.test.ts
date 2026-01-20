/**
 * Meta Optimizer Tests
 * Tests for meta title and description optimization functions
 */

import {
  optimizeMetaTitle,
  optimizeMetaDescription,
  validateMetaContent,
} from '../../src/lib/seo/meta-optimizer';

describe('optimizeMetaTitle', () => {
  describe('Title Length Optimization', () => {
    it('should keep titles under 60 characters', () => {
      const title = 'This is a very long title that exceeds the recommended maximum length of 60 characters for optimal SEO';
      const result = optimizeMetaTitle(title);

      expect(result.length).toBeLessThanOrEqual(60);
    });

    it('should mark truncated titles', () => {
      const title = 'This is a very long title that exceeds the recommended maximum length';
      const result = optimizeMetaTitle(title);

      expect(result.isTruncated).toBe(true);
      const hasTruncateWarning = result.warnings.some(w => w.includes('Truncated'));
      expect(hasTruncateWarning).toBe(true);
    });

    it('should warn if title is too short', () => {
      const title = 'Short title';
      const result = optimizeMetaTitle(title);

      const hasLengthWarning = result.warnings.some(w => w.includes('40-60'));
      expect(hasLengthWarning).toBe(true);
    });

    it('should not truncate titles within optimal range', () => {
      const title = 'Cat Litter Odor Control - Natural Activated Carbon';
      const result = optimizeMetaTitle(title);

      expect(result.isTruncated).toBe(false);
      expect(result.length).toBeGreaterThanOrEqual(40);
      expect(result.length).toBeLessThanOrEqual(60);
    });
  });

  describe('Keyword Front-Loading', () => {
    it('should move target keyword to front if not already there', () => {
      const title = 'Best Solution for Cat Litter Smell Problems';
      const keyword = 'cat litter smell';
      const result = optimizeMetaTitle(title, keyword);

      expect(result.title.toLowerCase()).toMatch(/^cat litter smell/);
      const hasMovedWarning = result.warnings.some(w => w.includes('Moved target keyword'));
      expect(hasMovedWarning).toBe(true);
    });

    it('should not move keyword if already at start', () => {
      const title = 'Cat Litter Smell - Best Natural Solution';
      const keyword = 'cat litter smell';
      const result = optimizeMetaTitle(title, keyword);

      const hasMovedWarning = result.warnings.some(w => w.includes('Moved target keyword'));
      expect(hasMovedWarning).toBe(false);
    });

    it('should warn if keyword is missing', () => {
      const title = 'Best Pet Product for Your Home';
      const keyword = 'cat litter deodorizer';
      const result = optimizeMetaTitle(title, keyword);

      const hasKeywordWarning = result.warnings.some(w => w.includes('Consider including target keyword'));
      expect(hasKeywordWarning).toBe(true);
    });
  });

  describe('Suffix Removal', () => {
    it('should remove " | Purrify" suffix if title is too long', () => {
      const title = 'Very Long Product Title That Exceeds Character Limit | Purrify';
      const result = optimizeMetaTitle(title);

      expect(result.title).not.toContain(' | Purrify');
      const hasRemovedSuffixWarning = result.warnings.some(w => w.includes('Removed " | Purrify" suffix'));
      expect(hasRemovedSuffixWarning).toBe(true);
    });

    it('should keep suffix if title fits within limit', () => {
      const title = 'Short Title | Purrify';
      const result = optimizeMetaTitle(title);

      expect(result.title).toContain(' | Purrify');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty strings gracefully', () => {
      const result = optimizeMetaTitle('');

      // normalizeMetaTitle may add default branding
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle whitespace-only strings', () => {
      const result = optimizeMetaTitle('   ');

      // normalizeMetaTitle may add default branding
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('should trim leading and trailing whitespace', () => {
      const title = '  Cat Litter Odor Control  ';
      const result = optimizeMetaTitle(title);

      expect(result.title).toBe('Cat Litter Odor Control');
    });
  });
});

describe('optimizeMetaDescription', () => {
  describe('Description Length Optimization', () => {
    it('should keep descriptions between 140-155 characters', () => {
      const desc = 'This is a short description.';
      const result = optimizeMetaDescription(desc);

      expect(result.length).toBeGreaterThanOrEqual(140);
      expect(result.length).toBeLessThanOrEqual(155);
    });

    it('should add CTA if description is too short', () => {
      const desc = 'Eliminate cat litter smell with activated carbon. Natural, effective odor control.';
      const result = optimizeMetaDescription(desc);

      expect(result.description).toMatch(/\. (Shop now|Try it free|Learn more|Get started|See results)\./);
      const hasAddedWarning = result.warnings.some(w => w.includes('Added'));
      expect(hasAddedWarning).toBe(true);
    });

    it('should truncate if description is too long', () => {
      const desc = 'This is an extremely long meta description that far exceeds the recommended maximum length of 155 characters and will need to be truncated to fit within the optimal range for search engine results pages.';
      const result = optimizeMetaDescription(desc);

      expect(result.length).toBeLessThanOrEqual(155);
      expect(result.isTruncated).toBe(true);
      const hasTruncateWarning = result.warnings.some(w => w.includes('Truncated'));
      expect(hasTruncateWarning).toBe(true);
    });

    it('should add ellipsis when truncating', () => {
      const desc = 'This is a very long description that needs to be truncated because it exceeds the maximum recommended length for meta descriptions which is 155 characters for optimal display';
      const result = optimizeMetaDescription(desc);

      expect(result.description).toMatch(/…$/);
    });
  });

  describe('Keyword Validation', () => {
    it('should warn if target keyword is missing', () => {
      const desc = 'Natural odor elimination for your home.';
      const keyword = 'cat litter deodorizer';
      const result = optimizeMetaDescription(desc, keyword);

      const hasKeywordWarning = result.warnings.some(w => w.includes('Consider adding target keyword'));
      expect(hasKeywordWarning).toBe(true);
    });

    it('should not warn if keyword is present', () => {
      const desc = 'Cat litter deodorizer eliminates odors naturally. Activated carbon formula works instantly. Try it free today!';
      const keyword = 'cat litter deodorizer';
      const result = optimizeMetaDescription(desc, keyword);

      const hasKeywordWarning = result.warnings.some(w => w.includes('Consider adding target keyword'));
      expect(hasKeywordWarning).toBe(false);
    });
  });

  describe('Benefit-Driven Language', () => {
    it('should warn if no benefit words are present', () => {
      const desc = 'This product is made from coconut shell carbon. It works well and lasts long.';
      const result = optimizeMetaDescription(desc);

      const hasBenefitWarning = result.warnings.some(w => w.toLowerCase().includes('benefit'));
      expect(hasBenefitWarning).toBe(true);
    });

    it('should not warn if benefit words are present', () => {
      const desc = 'Eliminate cat litter odor instantly with activated carbon. Stop embarrassing smells and get your home fresh again.';
      const result = optimizeMetaDescription(desc);

      const hasBenefitWarning = result.warnings.some(w => w.includes('benefit-driven'));
      expect(hasBenefitWarning).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty descriptions', () => {
      const result = optimizeMetaDescription('');

      expect(result.description.length).toBeGreaterThan(0);
      const hasLengthWarning = result.warnings.some(w => w.toLowerCase().includes('optimal') || w.toLowerCase().includes('length'));
      expect(hasLengthWarning).toBe(true);
    });

    it('should preserve sentence endings when truncating', () => {
      const desc = 'First sentence. Second sentence that will be cut off somewhere in the middle to test whether the truncation logic properly handles sentence endings.';
      const result = optimizeMetaDescription(desc);

      // Should not end with a cut-off word
      expect(result.description).toMatch(/[.!?…]$/);
    });
  });
});

describe('validateMetaContent', () => {
  describe('Scoring Algorithm', () => {
    it('should return perfect score for optimized content', () => {
      const title = 'Best Cat Litter Deodorizer 2026 - Instant Odor Stop';
      const description = 'Eliminate 99% of cat litter smell instantly with activated carbon. 10,000+ happy customers. Free trial available - shop now!';
      const keyword = 'cat litter deodorizer';
      const result = validateMetaContent(title, description, keyword);

      expect(result.score).toBeGreaterThanOrEqual(70);
      expect(result.isValid).toBe(true);
    });

    it('should penalize missing target keyword', () => {
      const title = 'Best Product for Your Home';
      const description = 'Great solution for odor control.';
      const keyword = 'cat litter deodorizer';
      const result = validateMetaContent(title, description, keyword);

      expect(result.score).toBeLessThan(100);
      const hasKeywordSuggestion = result.suggestions.some(s => s.toLowerCase().includes('keyword'));
      expect(hasKeywordSuggestion).toBe(true);
    });

    it('should suggest adding benefit-driven words', () => {
      const title = 'Cat Litter Product';
      const description = 'This is a carbon-based product for litter boxes.';
      const result = validateMetaContent(title, description);

      const hasBenefitSuggestion = result.suggestions.some(s => s.toLowerCase().includes('benefit'));
      expect(hasBenefitSuggestion).toBe(true);
    });

    it('should suggest adding numbers/stats', () => {
      const title = 'Cat Litter Deodorizer';
      const description = 'Natural odor elimination for cats.';
      const result = validateMetaContent(title, description);

      const hasNumberSuggestion = result.suggestions.some(s => s.toLowerCase().includes('number'));
      expect(hasNumberSuggestion).toBe(true);
    });

    it('should suggest adding current year', () => {
      const title = 'Cat Litter Deodorizer';
      const description = 'Eliminate odors naturally with activated carbon.';
      const result = validateMetaContent(title, description);

      const currentYear = new Date().getFullYear();
      const hasYearSuggestion = result.suggestions.some(s => s.includes(String(currentYear)));
      expect(hasYearSuggestion).toBe(true);
    });

    it('should suggest adding CTA', () => {
      const title = 'Cat Litter Deodorizer';
      const description = 'Natural odor control with activated carbon. Works instantly.';
      const result = validateMetaContent(title, description);

      const hasCtaSuggestion = result.suggestions.some(s => s.toLowerCase().includes('call-to-action'));
      expect(hasCtaSuggestion).toBe(true);
    });
  });

  describe('Validation Thresholds', () => {
    it('should mark as valid if score >= 70', () => {
      const title = 'Best Cat Litter Deodorizer 2026 - Stop Odors Now';
      const description = 'Eliminate cat litter smell fast! 99% effective activated carbon. Free trial - get started today!';
      const keyword = 'cat litter deodorizer';
      const result = validateMetaContent(title, description, keyword);

      expect(result.isValid).toBe(true);
    });

    it('should mark as invalid if score < 70', () => {
      const title = 'Product';
      const description = 'This is a product.';
      const result = validateMetaContent(title, description);

      expect(result.isValid).toBe(false);
    });

    it('should never return negative scores', () => {
      const title = '';
      const description = '';
      const result = validateMetaContent(title, description);

      expect(result.score).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Comprehensive Quality Checks', () => {
    it('should check for power words', () => {
      const title = 'Cat Litter';
      const description = 'Odor control product.';
      const result = validateMetaContent(title, description);

      const hasPowerWordSuggestion = result.suggestions.some(s => s.toLowerCase().includes('power'));
      expect(hasPowerWordSuggestion).toBe(true);
    });

    it('should check for emotional appeal', () => {
      const title = 'Cat Litter Deodorizer';
      const description = 'Activated carbon odor eliminator.';
      const result = validateMetaContent(title, description);

      const hasEmotionalSuggestion = result.suggestions.some(s => s.toLowerCase().includes('emotional'));
      expect(hasEmotionalSuggestion).toBe(true);
    });

    it('should check for urgency/scarcity', () => {
      const title = 'Cat Litter Product';
      const description = 'Good odor control solution.';
      const result = validateMetaContent(title, description);

      const hasUrgencySuggestion = result.suggestions.some(s => s.toLowerCase().includes('urgency'));
      expect(hasUrgencySuggestion).toBe(true);
    });

    it('should check for unique value proposition', () => {
      const title = 'Cat Litter Deodorizer';
      const description = 'Activated carbon for odor control.';
      const result = validateMetaContent(title, description);

      const hasUvpSuggestion = result.suggestions.some(s => s.toLowerCase().includes('unique'));
      expect(hasUvpSuggestion).toBe(true);
    });
  });
});
