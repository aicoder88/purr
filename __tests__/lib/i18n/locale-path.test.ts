import { getLocaleFromPath, localizePath, stripLocaleFromPath } from '@/lib/i18n/locale-path';

describe('locale-path helpers', () => {
  describe('getLocaleFromPath', () => {
    it('extracts locale from prefixed paths', () => {
      expect(getLocaleFromPath('/fr/blog')).toBe('fr');
    });

    it('returns null for non-localized paths', () => {
      expect(getLocaleFromPath('/learn/faq')).toBeNull();
      expect(getLocaleFromPath('/')).toBeNull();
    });
  });

  describe('stripLocaleFromPath', () => {
    it('removes locale prefix', () => {
      expect(stripLocaleFromPath('/fr/blog')).toBe('/blog');
      expect(stripLocaleFromPath('/en')).toBe('/');
    });

    it('keeps non-localized paths intact', () => {
      expect(stripLocaleFromPath('/learn/faq')).toBe('/learn/faq');
    });
  });

  describe('localizePath', () => {
    it('localizes homepage and blog paths', () => {
      expect(localizePath('/', 'fr')).toBe('/fr');
      expect(localizePath('/blog', 'fr')).toBe('/fr/blog');
      expect(localizePath('/blog/how-to', 'fr')).toBe('/fr/blog/how-to');
      expect(localizePath('/fr/blog/how-to', 'en')).toBe('/en/blog/how-to');
      expect(localizePath('/blog/how-to', 'en')).toBe('/en/blog/how-to');
    });

    it('keeps unsupported paths unprefixed', () => {
      expect(localizePath('/learn/faq', 'fr')).toBe('/learn/faq');
    });

    it('localizes supported commercial routes', () => {
      expect(localizePath('/learn', 'fr')).toBe('/fr/learn');
      expect(localizePath('/fr/learn', 'en')).toBe('/learn');
    });

    it('preserves query strings and hash fragments', () => {
      expect(localizePath('/en/blog?tag=odor', 'fr')).toBe('/fr/blog?tag=odor');
      expect(localizePath('/en/blog#latest', 'fr')).toBe('/fr/blog#latest');
    });
  });
});
