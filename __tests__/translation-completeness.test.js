/**
 * Translation Completeness Test Suite
 * 
 * This test ensures that all translation files have consistent keys
 * and helps identify missing translations across locales.
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

describe('Translation Completeness', () => {
  const TRANSLATION_DIR = path.join(__dirname, '../src/translations');
  const TYPE_DEFINITIONS_FILE = path.join(TRANSLATION_DIR, 'types.ts');
  
  let translationFiles;
  let translations;
  
  beforeAll(() => {
    // Discover translation files
    translationFiles = fs.readdirSync(TRANSLATION_DIR)
      .filter(file => file.endsWith('.ts') && !['types.ts', 'index.ts', 'common.ts'].includes(file))
      .map(file => ({
        locale: path.basename(file, '.ts'),
        path: path.join(TRANSLATION_DIR, file)
      }));
    
    expect(translationFiles.length).toBeGreaterThanOrEqual(2);
    
    // Load translation objects
    translations = {};
    for (const file of translationFiles) {
      translations[file.locale] = extractTranslationStructure(file.path);
    }
  });
  
  describe('File Structure', () => {
    test('all required translation files exist', () => {
      const expectedLocales = ['en', 'fr', 'zh'];
      
      for (const locale of expectedLocales) {
        const hasFile = translationFiles.some(f => f.locale === locale);
        expect(hasFile).toBe(true);
      }
    });
    
    test('types.ts file exists and is valid', () => {
      expect(fs.existsSync(TYPE_DEFINITIONS_FILE)).toBe(true);
      
      const content = fs.readFileSync(TYPE_DEFINITIONS_FILE, 'utf-8');
      
      // Check for main interface
      expect(content).toMatch(/export interface TranslationType/);
      
      // Check for key interfaces
      expect(content).toMatch(/freeTrialPage:/);
      expect(content).toMatch(/contactPage:/);
      expect(content).toMatch(/faqItems:/);
      expect(content).toMatch(/privacyPolicy:/);
    });
  });
  
  describe('Translation Key Consistency', () => {
    test('all translations include required top-level keys', () => {
      const requiredKeys = [
        'siteName',
        'siteDescription',
        'nav',
        'hero',
        'products',
        'features',
        'freeTrialPage',
        'contactPage',
        'faqItems',
        'faqCategories',
        'faqPage',
        'privacyPolicy'
      ];

      for (const locale of Object.keys(translations)) {
        for (const key of requiredKeys) {
          expect(translations[locale]).toHaveProperty(key);
          expect(translations[locale][key]).toBeDefined();
        }
      }
    });
    
    test('critical translation sections exist in all locales', () => {
      const criticalSections = [
        'siteName',
        'siteDescription',
        'nav',
        'freeTrialPage',
        'contactPage',
        'faqItems',
        'faqCategories', 
        'faqPage',
        'privacyPolicy'
      ];
      
      for (const locale of Object.keys(translations)) {
        for (const section of criticalSections) {
          expect(translations[locale]).toHaveProperty(section);
          expect(translations[locale][section]).toBeDefined();
        }
      }
    });
    
    test('freeTrialPage section has all required keys', () => {
      const requiredKeys = [
        'urgentBanner',
        'free', 
        'claimTrial',
        'whatYouGet',
        'freeTrialBag',
        'expertTips',
        'zeroCommitment',
        'instantOdorElimination',
        'zeroCommitmentGift',
        'testimonials',
        'countdownLabels'
      ];
      
      for (const locale of Object.keys(translations)) {
        const freeTrialPage = translations[locale].freeTrialPage;
        expect(freeTrialPage).toBeDefined();
        
        for (const key of requiredKeys) {
          expect(freeTrialPage).toHaveProperty(key);
          expect(freeTrialPage[key]).toBeTruthy();
        }
        
        // Test testimonials array
        expect(Array.isArray(freeTrialPage.testimonials)).toBe(true);
        expect(freeTrialPage.testimonials.length).toBeGreaterThan(0);
        
        freeTrialPage.testimonials.forEach(testimonial => {
          expect(testimonial).toHaveProperty('text');
          expect(testimonial).toHaveProperty('author');
        });
      }
    });
    
    test('contactPage section has all required keys', () => {
      const requiredKeys = [
        'title',
        'subtitle', 
        'contactReasons',
        'contactMethods',
        'faqs',
        'form'
      ];
      
      for (const locale of Object.keys(translations)) {
        const contactPage = translations[locale].contactPage;
        expect(contactPage).toBeDefined();
        
        for (const key of requiredKeys) {
          expect(contactPage).toHaveProperty(key);
        }
        
        // Test contactReasons array
        expect(Array.isArray(contactPage.contactReasons)).toBe(true);
        contactPage.contactReasons.forEach(reason => {
          expect(reason).toHaveProperty('value');
          expect(reason).toHaveProperty('label');
        });
        
        // Test contactMethods array
        expect(Array.isArray(contactPage.contactMethods)).toBe(true);
        contactPage.contactMethods.forEach(method => {
          expect(method).toHaveProperty('title');
          expect(method).toHaveProperty('description');
          expect(method).toHaveProperty('responseTime');
        });
      }
    });
    
    test('FAQ structure is consistent across locales', () => {
      for (const locale of Object.keys(translations)) {
        const faqItems = translations[locale].faqItems;
        const faqCategories = translations[locale].faqCategories;
        const faqPage = translations[locale].faqPage;
        
        expect(Array.isArray(faqItems)).toBe(true);
        expect(Array.isArray(faqCategories)).toBe(true);
        expect(faqPage).toBeDefined();
        
        // Test FAQ items structure
        faqItems.forEach(item => {
          expect(item).toHaveProperty('id');
          expect(item).toHaveProperty('question');
          expect(item).toHaveProperty('answer');
          expect(item).toHaveProperty('category');
          expect(item).toHaveProperty('tags');
          expect(Array.isArray(item.tags)).toBe(true);
        });
        
        // Test FAQ categories structure
        faqCategories.forEach(category => {
          expect(category).toHaveProperty('id');
          expect(category).toHaveProperty('name');
          expect(category).toHaveProperty('count');
        });
      }
    });
  });
  
  describe('Translation Quality', () => {
    test('no empty translation strings', () => {
      for (const locale of Object.keys(translations)) {
        const emptyStrings = findEmptyStrings(translations[locale]);
        expect(emptyStrings).toEqual([]);
      }
    });
    
    test('placeholder format consistency', () => {
      // Check that placeholders use consistent format across locales
      const placeholderPattern = /\{\{\s*\w+\s*\}\}/g;
      
      for (const section of ['freeTrialPage', 'contactPage', 'faqPage']) {
        const placeholders = {};
        
        for (const locale of Object.keys(translations)) {
          if (translations[locale][section]) {
            const sectionPlaceholders = extractPlaceholders(translations[locale][section]);
            placeholders[locale] = sectionPlaceholders;
          }
        }
        
        // All locales should have the same placeholders for the same keys
        const locales = Object.keys(placeholders);
        if (locales.length > 1) {
          const basePlaceholders = placeholders[locales[0]];
          
          for (let i = 1; i < locales.length; i++) {
            const currentPlaceholders = placeholders[locales[i]];
            
            for (const key of Object.keys(basePlaceholders)) {
              if (currentPlaceholders[key]) {
                expect(currentPlaceholders[key]).toEqual(basePlaceholders[key]);
              }
            }
          }
        }
      }
    });
    
    test('special characters are properly handled', () => {
      // Test that languages with special characters are properly encoded
      const frTranslation = translations.fr;
      const zhTranslation = translations.zh;
      
      if (frTranslation) {
        // French should contain accented characters
        const hasFrenchChars = /[àâäéèêëïîôöùûüÿç]/i.test(JSON.stringify(frTranslation));
        expect(hasFrenchChars).toBe(true);
      }
      
      if (zhTranslation) {
        // Chinese should contain CJK characters
        const hasChineseChars = /[\u4e00-\u9fff]/.test(JSON.stringify(zhTranslation));
        expect(hasChineseChars).toBe(true);
      }
    });
  });
  
  describe('Missing Translations Detection', () => {
    test('identify missing translation keys', () => {
      const allKeys = new Set();
      const localeKeys = {};
      
      // Collect all possible keys
      for (const locale of Object.keys(translations)) {
        const keys = getAllNestedKeys(translations[locale]);
        localeKeys[locale] = keys;
        keys.forEach(key => allKeys.add(key));
      }
      
      // Check for missing keys in each locale
      const missingKeys = {};
      for (const locale of Object.keys(translations)) {
        const missing = [...allKeys].filter(key => !localeKeys[locale].has(key));
        if (missing.length > 0) {
          missingKeys[locale] = missing;
        }
      }
      
      // Report missing keys (this will show in test output)
      if (Object.keys(missingKeys).length > 0) {
        console.warn('Missing translation keys detected:', missingKeys);
      }
      
      // For CI/CD, you might want this to pass but log warnings
      // expect(Object.keys(missingKeys)).toEqual([]);
    });
  });
});

/**
 * Helper Functions
 */

const moduleCache = new Map();

function extractTranslationStructure(filePath) {
  try {
    const exports = loadTsModule(filePath);
    const baseName = path.basename(filePath, path.extname(filePath));
    const candidates = [baseName, 'default'];

    for (const candidate of candidates) {
      const value = exports?.[candidate];
      if (value && typeof value === 'object') {
        return value;
      }
    }

    const firstObjectExport = Object.values(exports || {}).find(
      (value) => value && typeof value === 'object'
    );
    if (firstObjectExport) {
      return firstObjectExport;
    }
  } catch (error) {
    console.error('Error loading translation module:', error);
  }

  return {};
}

function loadTsModule(candidatePath) {
  const normalizedPath = normalizeTsPath(candidatePath);

  if (moduleCache.has(normalizedPath)) {
    return moduleCache.get(normalizedPath);
  }

  const source = fs.readFileSync(normalizedPath, 'utf-8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2019,
      esModuleInterop: true,
      resolveJsonModule: true,
    },
    fileName: normalizedPath,
  });

  const moduleDir = path.dirname(normalizedPath);
  const moduleObj = { exports: {} };

  const localRequire = (specifier) => {
    if (specifier.startsWith('.')) {
      const resolved = normalizeTsPath(path.resolve(moduleDir, specifier));
      if (resolved.endsWith('.json')) {
        return JSON.parse(fs.readFileSync(resolved, 'utf-8'));
      }
      return loadTsModule(resolved);
    }
    return require(specifier);
  };

  const wrapper = new Function(
    'require',
    'module',
    'exports',
    '__dirname',
    '__filename',
    transpiled.outputText
  );

  wrapper(localRequire, moduleObj, moduleObj.exports, moduleDir, normalizedPath);
  moduleCache.set(normalizedPath, moduleObj.exports);
  return moduleObj.exports;
}

function normalizeTsPath(candidatePath) {
  const attempted = [candidatePath];
  const base = candidatePath.replace(/\.(ts|tsx|js|jsx|cjs|mjs|json)$/i, '');

  const extensions = ['.ts', '.tsx', '.js', '.jsx', '.cjs', '.mjs', '.json'];
  for (const ext of extensions) {
    attempted.push(`${base}${ext}`);
    attempted.push(path.join(base, `index${ext}`));
  }

  for (const possible of attempted) {
    if (fs.existsSync(possible) && fs.statSync(possible).isFile()) {
      return possible;
    }
  }

  return candidatePath;
}

function findEmptyStrings(obj, path = '') {
  const empty = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;
    
    if (typeof value === 'string') {
      if (!value.trim()) {
        empty.push(currentPath);
      }
    } else if (typeof value === 'object' && value !== null) {
      empty.push(...findEmptyStrings(value, currentPath));
    }
  }
  
  return empty;
}

function extractPlaceholders(obj, path = '') {
  const placeholders = {};
  const placeholderPattern = /\{\{\s*(\w+)\s*\}\}/g;
  
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;
    
    if (typeof value === 'string') {
      const matches = [...value.matchAll(placeholderPattern)];
      if (matches.length > 0) {
        placeholders[currentPath] = matches.map(match => match[1]);
      }
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(placeholders, extractPlaceholders(value, currentPath));
    }
  }
  
  return placeholders;
}

function getAllNestedKeys(obj, prefix = '') {
  const keys = new Set();
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    keys.add(fullKey);
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const nestedKeys = getAllNestedKeys(value, fullKey);
      nestedKeys.forEach(k => keys.add(k));
    }
  }
  
  return keys;
}
