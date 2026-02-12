import { USD_PRICES } from '@/lib/constants';
import {
  PRODUCT_PRICES,
  formatCurrencyValue,
  formatProductPrice,
  getPriceRange,
  getProductPrice,
  resolveLocaleForCurrency,
} from '@/lib/pricing';

describe('pricing', () => {
  describe('getProductPrice', () => {
    it('returns CAD prices for product keys and ids', () => {
      expect(getProductPrice('standard', 'CAD')).toBe(14.99);
      expect(getProductPrice('purrify-120g', 'CAD')).toBe(29.99);
    });

    it('returns USD prices when currency is USD', () => {
      expect(getProductPrice('standard', 'USD')).toBe(USD_PRICES['purrify-50g']);
      expect(getProductPrice('purrify-240g', 'USD')).toBe(USD_PRICES['purrify-240g']);
    });

    it('applies quantity discount logic for autoship packs (per-unit cheaper than single bag)', () => {
      const standardSingle = getProductPrice('standard', 'CAD');
      const standardAutoshipPerUnit = getProductPrice('standardAutoship', 'CAD') / 3;
      expect(standardAutoshipPerUnit).toBeLessThan(standardSingle);

      const familySingleUsd = getProductPrice('family', 'USD');
      const familyAutoshipPerUnitUsd = getProductPrice('familyAutoship', 'USD') / 3;
      expect(familyAutoshipPerUnitUsd).toBeLessThan(familySingleUsd);
    });
  });

  describe('formatProductPrice', () => {
    it('formats with explicit currency', () => {
      const formatted = formatProductPrice('trial', 'USD', 'en-US');
      expect(formatted).toContain('$');
      expect(formatted).not.toMatch(/USD|CAD/);
    });

    it('supports legacy locale-only signature as CAD', () => {
      const fromLegacySignature = formatProductPrice('standard', 'fr');
      const expected = formatCurrencyValue(getProductPrice('standard', 'CAD'), 'fr');
      expect(fromLegacySignature).toBe(expected);
    });
  });

  describe('getPriceRange', () => {
    it('returns correct numeric ranges for CAD and USD', () => {
      const cadRange = getPriceRange('CAD');
      const usdRange = getPriceRange('USD');

      expect(cadRange.min).toBe(4.76);
      expect(cadRange.max).toBe(79.99);
      expect(usdRange.min).toBe(4.76);
      expect(usdRange.max).toBe(79.99);
    });

    it('supports legacy locale-only signature and returns formatted output', () => {
      const range = getPriceRange('fr');
      expect(range.formatted).toContain('$');
      expect(range.formatted).toContain('-');
    });
  });

  describe('PRODUCT_PRICES', () => {
    it('keeps catalog pricing map in sync with pricing helpers', () => {
      const keys = Object.keys(PRODUCT_PRICES) as Array<keyof typeof PRODUCT_PRICES>;

      keys.forEach((key) => {
        expect(PRODUCT_PRICES[key].amount).toBe(getProductPrice(key, 'CAD'));
        expect(PRODUCT_PRICES[key].formatted).toBe(formatProductPrice(key, 'CAD'));
      });
    });
  });

  describe('formatCurrencyValue', () => {
    it('formats CAD and USD values without currency codes', () => {
      const cad = formatCurrencyValue(1234.5, 'CAD', 'en-CA');
      const usd = formatCurrencyValue(1234.5, 'USD', 'en-US');

      expect(cad).toContain('$');
      expect(usd).toContain('$');
      expect(cad).not.toMatch(/CAD|USD/);
      expect(usd).not.toMatch(/CAD|USD/);
    });

    it('supports legacy locale-only signature as CAD', () => {
      const legacy = formatCurrencyValue(99.99, 'es');
      const explicitCad = formatCurrencyValue(99.99, 'CAD', 'es');
      expect(legacy).toBe(explicitCad);
    });
  });

  describe('resolveLocaleForCurrency', () => {
    it('resolves known locales and defaults', () => {
      expect(resolveLocaleForCurrency('fr')).toBe('fr-CA');
      expect(resolveLocaleForCurrency('zh')).toBe('zh-CN');
      expect(resolveLocaleForCurrency('es')).toBe('es-ES');
      expect(resolveLocaleForCurrency()).toBe('en-CA');
      expect(resolveLocaleForCurrency('en-US')).toBe('en-US');
    });
  });
});
