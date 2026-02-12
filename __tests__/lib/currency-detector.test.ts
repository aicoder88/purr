import type { NextApiRequest } from 'next';
import { detectCurrencyFromRequest, getCurrencySymbol } from '@/lib/geo/currency-detector';

function makeRequest(country?: string): NextApiRequest {
  return {
    headers: country ? { 'x-vercel-ip-country': country } : {},
  } as unknown as NextApiRequest;
}

describe('currency-detector', () => {
  describe('detectCurrencyFromRequest', () => {
    it('returns USD for US visitors', () => {
      const req = makeRequest('US');
      expect(detectCurrencyFromRequest(req)).toBe('USD');
    });

    it('returns CAD for CA visitors', () => {
      const req = makeRequest('CA');
      expect(detectCurrencyFromRequest(req)).toBe('CAD');
    });

    it('returns CAD for non-US visitors', () => {
      const req = makeRequest('FR');
      expect(detectCurrencyFromRequest(req)).toBe('CAD');
    });

    it('returns CAD when request is missing', () => {
      expect(detectCurrencyFromRequest()).toBe('CAD');
    });
  });

  describe('getCurrencySymbol', () => {
    it('returns the shared currency symbol', () => {
      expect(getCurrencySymbol()).toBe('$');
    });
  });
});
