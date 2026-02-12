import { generateReferralCode, validateReferralCodeFormat } from '@/lib/referral';

describe('referral', () => {
  describe('generateReferralCode', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('generates deterministic code with uppercase sanitized name and PURR suffix', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0);

      const code = generateReferralCode('Sarah');
      expect(code).toBe('SARAH1-PURR');
      expect(validateReferralCodeFormat(code)).toBe(true);
    });

    it('strips non-letter characters from user name before generating code', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0);

      const code = generateReferralCode('J0hn!@#');
      expect(code).toBe('JHN1-PURR');
      expect(validateReferralCodeFormat(code)).toBe(true);
    });

    it('enforces maximum code length for long names', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.9999);

      const code = generateReferralCode('Alexanderthegreat');
      expect(code).toBe('ALEXANDE99-PURR');
      expect(code.length).toBe(15);
      expect(validateReferralCodeFormat(code)).toBe(true);
    });
  });

  describe('validateReferralCodeFormat', () => {
    it('accepts valid referral codes', () => {
      expect(validateReferralCodeFormat('SARAH15-PURR')).toBe(true);
      expect(validateReferralCodeFormat('AB1-PURR')).toBe(true);
    });

    it('rejects invalid referral codes', () => {
      expect(validateReferralCodeFormat('sarah15-PURR')).toBe(false);
      expect(validateReferralCodeFormat('SARAH123-PURR')).toBe(false);
      expect(validateReferralCodeFormat('SARAH15PURR')).toBe(false);
      expect(validateReferralCodeFormat('15-PURR')).toBe(false);
      expect(validateReferralCodeFormat('SARAH15-PAWR')).toBe(false);
    });
  });
});
