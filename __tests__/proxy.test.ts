import { shouldRedirectToLocalizedPath } from '@/lib/i18n/locale-redirect';

describe('proxy locale redirects', () => {
  it('does not redirect when only the trailing slash differs', () => {
    expect(shouldRedirectToLocalizedPath('/fun/', '/fun')).toBe(false);
    expect(shouldRedirectToLocalizedPath('/fun', '/fun/')).toBe(false);
  });

  it('still redirects when the locale-prefixed destination is genuinely different', () => {
    expect(shouldRedirectToLocalizedPath('/reviews/', '/fr/reviews')).toBe(true);
    expect(shouldRedirectToLocalizedPath('/', '/fr')).toBe(true);
  });
});
