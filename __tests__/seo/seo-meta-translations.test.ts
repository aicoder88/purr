/**
 * SEO Meta Translations Tests
 * Validates that all SEO meta content meets optimization requirements
 */

import {
  SEO_META,
  getSEOMeta,
  getSolutionSEOMeta,
  _SEOMetaContent,
  PageMeta,
} from '../../src/translations/seo-meta';
import { LocaleCode } from '../../src/lib/seo/types';

// Helper to check if a value is a PageMeta (has title and description)
function isPageMeta(value: unknown): value is PageMeta {
  return typeof value === 'object' && value !== null && 'title' in value && 'description' in value;
}

// Helper to get flat list of learn PageMeta entries (excluding nested objects)
function getFlatLearnPages(locale: LocaleCode): PageMeta[] {
  const learn = SEO_META[locale].learn;
  return Object.values(learn).filter(isPageMeta);
}

// Helper to get solution pages
function getSolutionPages(locale: LocaleCode): PageMeta[] {
  return Object.values(SEO_META[locale].learn.solutions);
}

describe('SEO Meta Translations Structure', () => {
  const locales: LocaleCode[] = ['en', 'fr', 'zh', 'es'];

  describe('All Locales Present', () => {
    it('should have meta content for all 4 locales', () => {
      locales.forEach(locale => {
        expect(SEO_META[locale]).toBeDefined();
      });
    });

    it('should have homepage meta for all locales', () => {
      locales.forEach(locale => {
        expect(SEO_META[locale].homepage).toBeDefined();
        expect(SEO_META[locale].homepage.title).toBeTruthy();
        expect(SEO_META[locale].homepage.description).toBeTruthy();
      });
    });

    it('should have all product pages for all locales', () => {
      const products = ['trial', 'standard', 'family'] as const;

      locales.forEach(locale => {
        products.forEach(product => {
          expect(SEO_META[locale].products[product]).toBeDefined();
          expect(SEO_META[locale].products[product].title).toBeTruthy();
          expect(SEO_META[locale].products[product].description).toBeTruthy();
        });
      });
    });

    it('should have all learn pages for all locales', () => {
      const learnPages = ['howItWorks', 'activatedCarbonBenefits', 'activatedCarbonVsBakingSoda', 'usingDeodorizersWithKittens', 'faq', 'safety'] as const;

      locales.forEach(locale => {
        learnPages.forEach(page => {
          expect(SEO_META[locale].learn[page]).toBeDefined();
          expect(SEO_META[locale].learn[page].title).toBeTruthy();
          expect(SEO_META[locale].learn[page].description).toBeTruthy();
        });
      });
    });

    it('should have all solution pages for all locales', () => {
      const solutionPages = ['ammoniaSmellCatLitter', 'howToNeutralizeAmmonia', 'litterBoxSmellElimination', 'multipleCatsOdorControl'] as const;

      locales.forEach(locale => {
        solutionPages.forEach(page => {
          expect(SEO_META[locale].learn.solutions[page]).toBeDefined();
          expect(SEO_META[locale].learn.solutions[page].title).toBeTruthy();
          expect(SEO_META[locale].learn.solutions[page].description).toBeTruthy();
        });
      });
    });

    it('should have all blog posts for all locales', () => {
      const blogPosts = [
        'mostPowerfulOdorAbsorber',
        'activatedCarbonVsBakingSoda',
        'bestLitterOdorRemoverSmallApartments',
        'catLitterSmellWorseSummer',
        'activatedCarbonCatLitter',
        'ecoFriendlyCatLitter',
        'wholesaleCatLitter',
        'catLitterOdorControl',
        'smallApartmentCatCare',
        'naturalCatLitterAdditive',
      ] as const;

      locales.forEach(locale => {
        blogPosts.forEach(post => {
          expect(SEO_META[locale].blog[post]).toBeDefined();
          expect(SEO_META[locale].blog[post].title).toBeTruthy();
          expect(SEO_META[locale].blog[post].description).toBeTruthy();
        });
      });
    });
  });
});

describe('SEO Meta Title Optimization', () => {
  const locales: LocaleCode[] = ['en', 'fr', 'zh', 'es'];

  describe('Title Length Requirements', () => {
    it('should have reasonable titles for homepage (not empty)', () => {
      locales.forEach(locale => {
        const title = SEO_META[locale].homepage.title;
        expect(title.length).toBeGreaterThan(10); // At least something meaningful
        expect(title.length).toBeLessThanOrEqual(70); // Not excessively long
      });
    });

    it('should have reasonable titles for all products', () => {
      const products = ['trial', 'standard', 'family'] as const;

      locales.forEach(locale => {
        products.forEach(product => {
          const title = SEO_META[locale].products[product].title;
          expect(title.length).toBeGreaterThan(10);
          expect(title.length).toBeLessThanOrEqual(70);
        });
      });
    });

    it('should have reasonable titles for all learn pages', () => {
      const learnPages = ['howItWorks', 'activatedCarbonBenefits', 'activatedCarbonVsBakingSoda', 'usingDeodorizersWithKittens', 'faq', 'safety'] as const;

      locales.forEach(locale => {
        learnPages.forEach(page => {
          const title = SEO_META[locale].learn[page].title;
          expect(title.length).toBeGreaterThan(10);
          expect(title.length).toBeLessThanOrEqual(70);
        });
      });
    });

    it('should have reasonable titles for all solution pages', () => {
      const solutionPages = ['ammoniaSmellCatLitter', 'howToNeutralizeAmmonia', 'litterBoxSmellElimination', 'multipleCatsOdorControl'] as const;

      locales.forEach(locale => {
        solutionPages.forEach(page => {
          const title = SEO_META[locale].learn.solutions[page].title;
          expect(title.length).toBeGreaterThan(10);
          expect(title.length).toBeLessThanOrEqual(70);
        });
      });
    });

    it('should have reasonable titles for all blog posts', () => {
      const blogPosts = [
        'mostPowerfulOdorAbsorber',
        'activatedCarbonVsBakingSoda',
        'bestLitterOdorRemoverSmallApartments',
        'catLitterSmellWorseSummer',
      ] as const;

      locales.forEach(locale => {
        blogPosts.forEach(post => {
          const title = SEO_META[locale].blog[post].title;
          expect(title.length).toBeGreaterThan(10);
          expect(title.length).toBeLessThanOrEqual(70);
        });
      });
    });
  });

  describe('Title Content Quality', () => {
    it('should include a freshness signal in homepage metadata', () => {
      locales.forEach(locale => {
        const homepage = SEO_META[locale].homepage;
        const contentHasYear = /202[5-9]/.test(`${homepage.title} ${homepage.description}`);
        const lastUpdatedHasRecentYear =
          typeof homepage.lastUpdated === 'string' && /202[5-9]/.test(homepage.lastUpdated);

        expect(contentHasYear || lastUpdatedHasRecentYear).toBe(true);
      });
    });

    it('should avoid duplicate "Purrify" branding in titles', () => {
      locales.forEach(locale => {
        const allTitles = [
          SEO_META[locale].homepage.title,
          ...Object.values(SEO_META[locale].products).map(p => p.title),
          ...getFlatLearnPages(locale).map(p => p.title),
          ...getSolutionPages(locale).map(p => p.title),
          ...Object.values(SEO_META[locale].blog).map(p => p.title),
        ];

        allTitles.forEach(title => {
          const brandMentions = (title.match(/Purrify/g) || []).length;
          expect(brandMentions).toBeLessThanOrEqual(1);
          expect(title).not.toContain('| Purrify |');
        });
      });
    });
  });
});

describe('SEO Meta Description Optimization', () => {
  const locales: LocaleCode[] = ['en', 'fr', 'zh', 'es'];

  describe('Description Length Requirements', () => {
    it('should have meaningful descriptions for homepage', () => {
      locales.forEach(locale => {
        const desc = SEO_META[locale].homepage.description;
        expect(desc.length).toBeGreaterThan(20); // At least something meaningful
        expect(desc.length).toBeLessThanOrEqual(170); // Not excessively long
      });
    });

    it('should have meaningful descriptions for all products', () => {
      const products = ['trial', 'standard', 'family'] as const;

      locales.forEach(locale => {
        products.forEach(product => {
          const desc = SEO_META[locale].products[product].description;
          expect(desc.length).toBeGreaterThan(20);
          expect(desc.length).toBeLessThanOrEqual(170);
        });
      });
    });

    it('should have meaningful descriptions for all learn pages', () => {
      const learnPages = ['howItWorks', 'activatedCarbonBenefits', 'activatedCarbonVsBakingSoda', 'usingDeodorizersWithKittens', 'faq', 'safety'] as const;

      locales.forEach(locale => {
        learnPages.forEach(page => {
          const desc = SEO_META[locale].learn[page].description;
          expect(desc.length).toBeGreaterThan(20);
          expect(desc.length).toBeLessThanOrEqual(170);
        });
      });
    });

    it('should have meaningful descriptions for all solution pages', () => {
      const solutionPages = ['ammoniaSmellCatLitter', 'howToNeutralizeAmmonia', 'litterBoxSmellElimination', 'multipleCatsOdorControl'] as const;

      locales.forEach(locale => {
        solutionPages.forEach(page => {
          const desc = SEO_META[locale].learn.solutions[page].description;
          expect(desc.length).toBeGreaterThan(20);
          expect(desc.length).toBeLessThanOrEqual(170);
        });
      });
    });

    it('should have meaningful descriptions for all blog posts', () => {
      const blogPosts = [
        'mostPowerfulOdorAbsorber',
        'activatedCarbonVsBakingSoda',
        'bestLitterOdorRemoverSmallApartments',
        'catLitterSmellWorseSummer',
      ] as const;

      locales.forEach(locale => {
        blogPosts.forEach(post => {
          const desc = SEO_META[locale].blog[post].description;
          expect(desc.length).toBeGreaterThan(20);
          expect(desc.length).toBeLessThanOrEqual(170);
        });
      });
    });
  });

  describe('Description Content Quality (English)', () => {
    const locale = 'en';

    it('should include benefit words in descriptions', () => {
      const benefitWords = ['eliminate', 'stop', 'instant', 'free', 'natural', 'effective'];
      const homepage = SEO_META[locale].homepage.description.toLowerCase();

      const hasBenefit = benefitWords.some(word => homepage.includes(word));
      expect(hasBenefit).toBe(true);
    });

    it('should include numbers/stats in descriptions', () => {
      const allDescriptions = [
        SEO_META[locale].homepage.description,
        ...Object.values(SEO_META[locale].products).map(p => p.description),
      ];

      // At least some descriptions should have numbers
      const descriptionsWithNumbers = allDescriptions.filter(desc => /\d+/.test(desc));
      expect(descriptionsWithNumbers.length).toBeGreaterThan(0);
    });

    it('should include CTAs in product descriptions', () => {
      const ctaWords = ['try', 'get', 'shop', 'free', 'today', 'now'];

      Object.values(SEO_META[locale].products).forEach(product => {
        const descLower = product.description.toLowerCase();
        const hasCTA = ctaWords.some(word => descLower.includes(word));
        expect(hasCTA).toBe(true);
      });
    });

    it('should end with punctuation', () => {
      const allDescriptions = [
        SEO_META[locale].homepage.description,
        ...Object.values(SEO_META[locale].products).map(p => p.description),
        ...getFlatLearnPages(locale).map(p => p.description),
        ...getSolutionPages(locale).map(p => p.description),
        ...Object.values(SEO_META[locale].blog).map(p => p.description),
      ];

      allDescriptions.forEach(desc => {
        expect(desc).toMatch(/[.!]$/);
      });
    });
  });
});

describe('Target Keywords', () => {
  it('should include target keywords for all English pages', () => {
    const locale = 'en';

    // Homepage should have target keyword
    expect(SEO_META[locale].homepage.targetKeyword).toBeTruthy();

    // All products should have target keywords
    Object.values(SEO_META[locale].products).forEach(product => {
      expect(product.targetKeyword).toBeTruthy();
    });

    // All learn pages should have target keywords (using helper to exclude solutions)
    getFlatLearnPages(locale).forEach(page => {
      expect(page.targetKeyword).toBeTruthy();
    });

    // All solution pages should have target keywords
    getSolutionPages(locale).forEach(page => {
      expect(page.targetKeyword).toBeTruthy();
    });

    // All blog posts should have target keywords
    Object.values(SEO_META[locale].blog).forEach(post => {
      expect(post.targetKeyword).toBeTruthy();
    });
  });
});

describe('getSEOMeta Helper Function', () => {
  it('should return homepage meta', () => {
    const meta = getSEOMeta('en', 'homepage');
    expect(meta).toBeDefined();
    expect(meta?.title).toBeTruthy();
    expect(meta?.description).toBeTruthy();
  });

  it('should return product meta', () => {
    const meta = getSEOMeta('en', 'products', 'standard');
    expect(meta).toBeDefined();
    expect(meta?.title).toBeTruthy();
    expect(meta?.description).toBeTruthy();
  });

  it('should return learn page meta', () => {
    const meta = getSEOMeta('en', 'learn', 'howItWorks');
    expect(meta).toBeDefined();
    expect(meta?.title).toBeTruthy();
    expect(meta?.description).toBeTruthy();
  });

  it('should return blog post meta', () => {
    const meta = getSEOMeta('en', 'blog', 'mostPowerfulOdorAbsorber');
    expect(meta).toBeDefined();
    expect(meta?.title).toBeTruthy();
    expect(meta?.description).toBeTruthy();
  });

  it('should return undefined for invalid page type', () => {
    const meta = getSEOMeta('en', 'homepage', 'nonexistent');
    expect(meta).toBeDefined(); // homepage doesn't use pageKey
  });

  it('should return undefined for missing pageKey', () => {
    const meta = getSEOMeta('en', 'products');
    expect(meta).toBeUndefined();
  });

  it('should work for all locales', () => {
    const locales: LocaleCode[] = ['en', 'fr', 'zh', 'es'];

    locales.forEach(locale => {
      const meta = getSEOMeta(locale, 'homepage');
      expect(meta).toBeDefined();
      expect(meta?.title).toBeTruthy();
    });
  });

  it('should return undefined for solutions key (use getSolutionSEOMeta instead)', () => {
    const meta = getSEOMeta('en', 'learn', 'solutions');
    expect(meta).toBeUndefined();
  });
});

describe('getSolutionSEOMeta Helper Function', () => {
  it('should return solution page meta', () => {
    const meta = getSolutionSEOMeta('en', 'ammoniaSmellCatLitter');
    expect(meta).toBeDefined();
    expect(meta?.title).toBeTruthy();
    expect(meta?.description).toBeTruthy();
  });

  it('should work for all solution pages', () => {
    const solutionPages = ['ammoniaSmellCatLitter', 'howToNeutralizeAmmonia', 'litterBoxSmellElimination', 'multipleCatsOdorControl'];
    const locales: LocaleCode[] = ['en', 'fr', 'zh', 'es'];

    locales.forEach(locale => {
      solutionPages.forEach(page => {
        const meta = getSolutionSEOMeta(locale, page);
        expect(meta).toBeDefined();
        expect(meta?.title).toBeTruthy();
      });
    });
  });
});

describe('Translation Consistency', () => {
  it('should have same number of products across all locales', () => {
    const enProducts = Object.keys(SEO_META.en.products);
    const frProducts = Object.keys(SEO_META.fr.products);
    const zhProducts = Object.keys(SEO_META.zh.products);
    const esProducts = Object.keys(SEO_META.es.products);

    expect(enProducts.length).toBe(frProducts.length);
    expect(enProducts.length).toBe(zhProducts.length);
    expect(enProducts.length).toBe(esProducts.length);
  });

  it('should have same number of learn pages across all locales', () => {
    const enLearn = Object.keys(SEO_META.en.learn);
    const frLearn = Object.keys(SEO_META.fr.learn);
    const zhLearn = Object.keys(SEO_META.zh.learn);
    const esLearn = Object.keys(SEO_META.es.learn);

    expect(enLearn.length).toBe(frLearn.length);
    expect(enLearn.length).toBe(zhLearn.length);
    expect(enLearn.length).toBe(esLearn.length);
  });

  it('should have same number of blog posts across all locales', () => {
    const enBlog = Object.keys(SEO_META.en.blog);
    const frBlog = Object.keys(SEO_META.fr.blog);
    const zhBlog = Object.keys(SEO_META.zh.blog);
    const esBlog = Object.keys(SEO_META.es.blog);

    expect(enBlog.length).toBe(frBlog.length);
    expect(enBlog.length).toBe(zhBlog.length);
    expect(enBlog.length).toBe(esBlog.length);
  });

  it('should have same number of solution pages across all locales', () => {
    const enSolutions = Object.keys(SEO_META.en.learn.solutions);
    const frSolutions = Object.keys(SEO_META.fr.learn.solutions);
    const zhSolutions = Object.keys(SEO_META.zh.learn.solutions);
    const esSolutions = Object.keys(SEO_META.es.learn.solutions);

    expect(enSolutions.length).toBe(frSolutions.length);
    expect(enSolutions.length).toBe(zhSolutions.length);
    expect(enSolutions.length).toBe(esSolutions.length);
  });
});
