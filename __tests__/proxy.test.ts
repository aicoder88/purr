import { shouldRedirectToLocalizedPath } from '@/lib/i18n/locale-redirect';

jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn(),
}));

import { detectPreferredLocale, getLocaleFromGeo } from '../proxy';

describe('proxy locale redirects', () => {
  it('does not redirect when only the trailing slash differs', () => {
    expect(shouldRedirectToLocalizedPath('/fun/', '/fun')).toBe(false);
    expect(shouldRedirectToLocalizedPath('/fun', '/fun/')).toBe(false);
  });

  it('still redirects when the locale-prefixed destination is genuinely different', () => {
    expect(shouldRedirectToLocalizedPath('/reviews/', '/fr/reviews')).toBe(true);
    expect(shouldRedirectToLocalizedPath('/', '/fr')).toBe(true);
  });

  it('defaults to English unless a visitor explicitly chose French or is in Quebec', () => {
    expect(detectPreferredLocale({})).toBe('en');
    expect(detectPreferredLocale({ cookieLocale: 'fr' })).toBe('en');
    expect(detectPreferredLocale({
      country: 'US',
      region: 'CA',
    })).toBe('en');
  });

  it('respects normalized locale cookies and Quebec geo targeting', () => {
    expect(detectPreferredLocale({ cookieLocale: 'FR', cookieSource: 'manual' })).toBe('fr');
    expect(getLocaleFromGeo('CA', 'QC')).toBe('fr');
    expect(getLocaleFromGeo('CA', 'ON')).toBeNull();
  });
});
