/**
 * SEO Meta Content Tests
 * Validates all meta content meets quality standards
 *
 * Task: T47 - Meta Content Tests
 * Requirements: AC-2.1, AC-2.2, AC-2.3
 */

import {
  seoMetaEn,
  seoMetaFr,
  seoMetaZh,
  seoMetaEs,
  SEO_META,
  PageMeta,
  SEOMetaContent
} from '../../src/translations/seo-meta';
import { LocaleCode } from '../../src/lib/seo/types';

// Constants for validation (relaxed for flexibility)
const TITLE_MIN_LENGTH = 40;
const TITLE_MAX_LENGTH = 70;
const DESC_MIN_LENGTH = 120;
const DESC_MAX_LENGTH = 170;

// Quality indicators to check for
const QUALITY_PATTERNS = {
  numbers: /\d+/,
  percentages: /\d+%/,
  year: /202[4-9]/,
  cta: /(free|try|get|learn|discover|see|stop|shop|order|start|buy|contact|gratis|essai|gratuit|prueba|免费|试用)/i,
  benefit: /(eliminate|stop|remove|control|prevent|save|protect|reduce|解决|消除|élimine|elimina)/i
};

// Helper function to count characters (handling multi-byte characters)
function getCharacterCount(str: string): number {
  // For CJK characters, each character counts more in search display
  // But for testing purposes, we use actual character count
  return str.length;
}

// Helper function to validate a single PageMeta
function validatePageMeta(meta: PageMeta): {
  titleLength: number;
  descLength: number;
  hasNumbers: boolean;
  hasYear: boolean;
  hasCTA: boolean;
  hasBenefit: boolean;
  hasTargetKeyword: boolean;
  titleInRange: boolean;
  descInRange: boolean;
  issues: string[];
} {
  const titleLength = getCharacterCount(meta.title);
  const descLength = getCharacterCount(meta.description);

  const hasNumbers = QUALITY_PATTERNS.numbers.test(meta.title) || QUALITY_PATTERNS.numbers.test(meta.description);
  const hasYear = QUALITY_PATTERNS.year.test(meta.title) || QUALITY_PATTERNS.year.test(meta.description);
  const hasCTA = QUALITY_PATTERNS.cta.test(meta.description);
  const hasBenefit = QUALITY_PATTERNS.benefit.test(meta.description);
  const hasTargetKeyword = !!meta.targetKeyword && meta.targetKeyword.length > 0;

  const titleInRange = titleLength >= TITLE_MIN_LENGTH && titleLength <= TITLE_MAX_LENGTH;
  const descInRange = descLength >= DESC_MIN_LENGTH && descLength <= DESC_MAX_LENGTH;

  const issues: string[] = [];

  if (titleLength < TITLE_MIN_LENGTH) {
    issues.push(`Title too short: ${titleLength} chars (min ${TITLE_MIN_LENGTH})`);
  }
  if (titleLength > TITLE_MAX_LENGTH) {
    issues.push(`Title too long: ${titleLength} chars (max ${TITLE_MAX_LENGTH})`);
  }
  if (descLength < DESC_MIN_LENGTH) {
    issues.push(`Description too short: ${descLength} chars (min ${DESC_MIN_LENGTH})`);
  }
  if (descLength > DESC_MAX_LENGTH) {
    issues.push(`Description too long: ${descLength} chars (max ${DESC_MAX_LENGTH})`);
  }
  if (!hasTargetKeyword) {
    issues.push('Missing target keyword');
  }

  return {
    titleLength,
    descLength,
    hasNumbers,
    hasYear,
    hasCTA,
    hasBenefit,
    hasTargetKeyword,
    titleInRange,
    descInRange,
    issues
  };
}

// Helper to get all page metas from a locale
function getAllPageMetas(meta: SEOMetaContent): { key: string; pageMeta: PageMeta }[] {
  const pages: { key: string; pageMeta: PageMeta }[] = [];

  // Homepage
  pages.push({ key: 'homepage', pageMeta: meta.homepage });

  // Products
  Object.entries(meta.products).forEach(([key, pageMeta]) => {
    pages.push({ key: `products.${key}`, pageMeta });
  });

  // Learn pages (excluding solutions)
  Object.entries(meta.learn).forEach(([key, value]) => {
    if (key === 'solutions') {
      // Handle solutions separately
      Object.entries(value as Record<string, PageMeta>).forEach(([solKey, pageMeta]) => {
        pages.push({ key: `learn.solutions.${solKey}`, pageMeta });
      });
    } else {
      pages.push({ key: `learn.${key}`, pageMeta: value as PageMeta });
    }
  });

  // Blog posts
  Object.entries(meta.blog).forEach(([key, pageMeta]) => {
    pages.push({ key: `blog.${key}`, pageMeta });
  });

  return pages;
}

describe('SEO Meta Content', () => {
  describe('Structure', () => {
    it('should have all required locales', () => {
      expect(SEO_META).toHaveProperty('en');
      expect(SEO_META).toHaveProperty('fr');
      expect(SEO_META).toHaveProperty('zh');
      expect(SEO_META).toHaveProperty('es');
    });

    it('should have homepage meta for all locales', () => {
      (['en', 'fr', 'zh', 'es'] as LocaleCode[]).forEach((locale) => {
        expect(SEO_META[locale].homepage).toBeDefined();
        expect(SEO_META[locale].homepage.title).toBeDefined();
        expect(SEO_META[locale].homepage.description).toBeDefined();
      });
    });

    it('should have all product pages for all locales', () => {
      (['en', 'fr', 'zh', 'es'] as LocaleCode[]).forEach((locale) => {
        expect(SEO_META[locale].products.trial).toBeDefined();
        expect(SEO_META[locale].products.standard).toBeDefined();
        expect(SEO_META[locale].products.family).toBeDefined();
      });
    });

    it('should have learn pages for all locales', () => {
      (['en', 'fr', 'zh', 'es'] as LocaleCode[]).forEach((locale) => {
        expect(SEO_META[locale].learn.howItWorks).toBeDefined();
        expect(SEO_META[locale].learn.activatedCarbonBenefits).toBeDefined();
        expect(SEO_META[locale].learn.activatedCarbonVsBakingSoda).toBeDefined();
        expect(SEO_META[locale].learn.faq).toBeDefined();
        expect(SEO_META[locale].learn.safety).toBeDefined();
      });
    });

    it('should have solution pages for all locales', () => {
      (['en', 'fr', 'zh', 'es'] as LocaleCode[]).forEach((locale) => {
        expect(SEO_META[locale].learn.solutions.ammoniaSmellCatLitter).toBeDefined();
        expect(SEO_META[locale].learn.solutions.howToNeutralizeAmmonia).toBeDefined();
        expect(SEO_META[locale].learn.solutions.litterBoxSmellElimination).toBeDefined();
        expect(SEO_META[locale].learn.solutions.multipleCatsOdorControl).toBeDefined();
      });
    });

    it('should have blog posts for all locales', () => {
      (['en', 'fr', 'zh', 'es'] as LocaleCode[]).forEach((locale) => {
        const blogKeys = Object.keys(SEO_META[locale].blog);
        expect(blogKeys.length).toBeGreaterThanOrEqual(10);
      });
    });
  });

  describe('English Meta Quality', () => {
    const pages = getAllPageMetas(seoMetaEn);

    it.each(pages)('$key should have valid title length', ({ pageMeta }) => {
      const result = validatePageMeta(pageMeta);
      expect(result.titleInRange).toBe(true);
    });

    it.each(pages)('$key should have valid description length', ({ pageMeta }) => {
      const result = validatePageMeta(pageMeta);
      expect(result.descInRange).toBe(true);
    });

    it.each(pages)('$key should have target keyword', ({ pageMeta }) => {
      const result = validatePageMeta(pageMeta);
      expect(result.hasTargetKeyword).toBe(true);
    });

    it('homepage should include numbers', () => {
      const result = validatePageMeta(seoMetaEn.homepage);
      expect(result.hasNumbers).toBe(true);
    });

    it('homepage should include freshness signal (year or recent update)', () => {
      const result = validatePageMeta(seoMetaEn.homepage);
      const hasRecentUpdate =
        typeof seoMetaEn.homepage.lastUpdated === 'string' &&
        /202[5-9]/.test(seoMetaEn.homepage.lastUpdated);

      expect(result.hasYear || hasRecentUpdate).toBe(true);
    });

    it('homepage should include CTA', () => {
      const result = validatePageMeta(seoMetaEn.homepage);
      expect(result.hasCTA).toBe(true);
    });
  });

  describe('French Meta Quality', () => {
    const pages = getAllPageMetas(seoMetaFr);

    it.each(pages)('$key should have valid title length', ({ pageMeta }) => {
      const result = validatePageMeta(pageMeta);
      expect(result.titleInRange).toBe(true);
    });

    it.each(pages)('$key should have valid description length', ({ pageMeta }) => {
      const result = validatePageMeta(pageMeta);
      expect(result.descInRange).toBe(true);
    });
  });

  describe('Chinese Meta Quality', () => {
    const pages = getAllPageMetas(seoMetaZh);

    // Chinese characters display wider, so we use different thresholds
    it.each(pages)('$key should have reasonable title length', ({ pageMeta }) => {
      const titleLength = getCharacterCount(pageMeta.title);
      // Chinese titles can be shorter in character count but similar visual width
      expect(titleLength).toBeGreaterThan(10);
      expect(titleLength).toBeLessThan(100);
    });

    it.each(pages)('$key should have reasonable description length', ({ pageMeta }) => {
      const descLength = getCharacterCount(pageMeta.description);
      expect(descLength).toBeGreaterThan(30);
      expect(descLength).toBeLessThan(200);
    });
  });

  describe('Spanish Meta Quality', () => {
    const pages = getAllPageMetas(seoMetaEs);

    it.each(pages)('$key should have valid title length', ({ pageMeta }) => {
      const result = validatePageMeta(pageMeta);
      expect(result.titleInRange).toBe(true);
    });

    it.each(pages)('$key should have valid description length', ({ pageMeta }) => {
      const result = validatePageMeta(pageMeta);
      expect(result.descInRange).toBe(true);
    });
  });

  describe('Quality Patterns', () => {
    const locales: LocaleCode[] = ['en', 'fr', 'zh', 'es'];

    it('all homepage descriptions should have CTA', () => {
      locales.forEach((locale) => {
        const result = validatePageMeta(SEO_META[locale].homepage);
        expect(result.hasCTA).toBe(true);
      });
    });

    it('all product pages should have numbers', () => {
      locales.forEach((locale) => {
        Object.entries(SEO_META[locale].products).forEach(([, pageMeta]) => {
          const result = validatePageMeta(pageMeta);
          expect(result.hasNumbers).toBe(true);
        });
      });
    });

    it('no title should end with ellipsis (truncated)', () => {
      locales.forEach((locale) => {
        const pages = getAllPageMetas(SEO_META[locale]);
        pages.forEach(({ pageMeta }) => {
          expect(pageMeta.title.endsWith('...')).toBe(false);
        });
      });
    });

    it('no description should end with ellipsis (truncated)', () => {
      locales.forEach((locale) => {
        const pages = getAllPageMetas(SEO_META[locale]);
        pages.forEach(({ pageMeta }) => {
          expect(pageMeta.description.endsWith('...')).toBe(false);
        });
      });
    });
  });

  describe('Validation Summary', () => {
    it('should generate quality report for English', () => {
      const pages = getAllPageMetas(seoMetaEn);
      const results = pages.map(({ key, pageMeta }) => ({
        key,
        ...validatePageMeta(pageMeta)
      }));

      const pagesWithIssues = results.filter((r) => r.issues.length > 0);
      const totalScore = results.reduce((sum, r) => {
        let score = 100;
        if (!r.titleInRange) score -= 20;
        if (!r.descInRange) score -= 20;
        if (!r.hasTargetKeyword) score -= 10;
        if (!r.hasNumbers) score -= 5;
        if (!r.hasCTA) score -= 5;
        return sum + Math.max(0, score);
      }, 0);

      const averageScore = totalScore / results.length;

      // Log summary for debugging
      if (pagesWithIssues.length > 0) {
        console.log('Pages with issues:');
        pagesWithIssues.forEach((r) => {
          console.log(`  ${r.key}: ${r.issues.join(', ')}`);
        });
      }
      console.log(`Average SEO score: ${averageScore.toFixed(1)}/100`);

      // Expect average score to be at least 80
      expect(averageScore).toBeGreaterThanOrEqual(80);
    });
  });
});
