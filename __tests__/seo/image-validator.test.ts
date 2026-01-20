/**
 * Tests for Image Validator
 */

import { validateAltText } from '../../scripts/seo/lib/image-validator';

describe('Image Validator', () => {
  describe('validateAltText', () => {
    it('should flag missing alt text as error', () => {
      const issues = validateAltText(undefined, '/image.jpg');

      expect(issues.length).toBeGreaterThan(0);
      expect(issues[0].severity).toBe('error');
      expect(issues[0].message).toContain('missing alt text');
    });

    it('should flag empty alt text as error', () => {
      const issues = validateAltText('', '/image.jpg');

      expect(issues.length).toBeGreaterThan(0);
      expect(issues[0].severity).toBe('error');
      expect(issues[0].message).toContain('missing alt text');
    });

    it('should flag whitespace-only alt text as error', () => {
      const issues = validateAltText('   ', '/image.jpg');

      expect(issues.length).toBeGreaterThan(0);
      expect(issues[0].severity).toBe('error');
    });

    it('should flag generic alt text as warning', () => {
      const genericTexts = ['image', 'img', 'picture', 'photo', 'icon', 'logo', 'banner'];

      genericTexts.forEach((text) => {
        const issues = validateAltText(text, '/image.jpg');

        expect(issues.length).toBeGreaterThan(0);
        const genericIssue = issues.find((i) => i.message.includes('too generic'));
        expect(genericIssue).toBeDefined();
        expect(genericIssue?.severity).toBe('warning');
      });
    });

    it('should flag alt text that is too long', () => {
      const longAlt = 'a'.repeat(150); // 150 chars, over 125 limit

      const issues = validateAltText(longAlt, '/image.jpg');

      const longIssue = issues.find((i) => i.message.includes('too long'));
      expect(longIssue).toBeDefined();
      expect(longIssue?.severity).toBe('warning');
    });

    it('should flag alt text that is too short', () => {
      const shortAlt = 'cat'; // 3 chars, under 5 minimum

      const issues = validateAltText(shortAlt, '/image.jpg');

      const shortIssue = issues.find((i) => i.message.includes('too short'));
      expect(shortIssue).toBeDefined();
      expect(shortIssue?.severity).toBe('warning');
    });

    it('should accept good alt text', () => {
      const goodAlt = 'A fluffy orange cat sleeping on a sunny windowsill';

      const issues = validateAltText(goodAlt, '/image.jpg');

      // Good alt text should have no issues
      expect(issues.length).toBe(0);
    });

    it('should accept alt text at ideal length', () => {
      const goodLengthAlt = 'A descriptive image showing a cat'; // ~35 chars, ideal range

      const issues = validateAltText(goodLengthAlt, '/image.jpg');

      expect(issues.length).toBe(0);
    });

    it('should accept alt text at 125 chars exactly', () => {
      const altAt125 = 'a'.repeat(125);

      const issues = validateAltText(altAt125, '/image.jpg');

      // Should not have "too long" issue
      const longIssue = issues.find((i) => i.message.includes('too long'));
      expect(longIssue).toBeUndefined();
    });

    it('should accept alt text at 5 chars exactly', () => {
      const altAt5 = 'abcde'; // Exactly 5 chars

      const issues = validateAltText(altAt5, '/image.jpg');

      // Should not have "too short" issue
      const shortIssue = issues.find((i) => i.message.includes('too short'));
      expect(shortIssue).toBeUndefined();
    });

    it('should provide fix suggestions', () => {
      const issues = validateAltText('', '/image.jpg');

      expect(issues.length).toBeGreaterThan(0);
      expect(issues[0].fix).toBeDefined();
      expect(issues[0].fix).not.toBe('');
    });

    it('should include file path in issues', () => {
      const filePath = '/path/to/image.jpg';
      const issues = validateAltText('', filePath);

      expect(issues.length).toBeGreaterThan(0);
      expect(issues[0].filePath).toBe(filePath);
    });

    it('should handle multiple issues for same alt text', () => {
      const altText = 'img'; // Too short AND generic

      const issues = validateAltText(altText, '/image.jpg');

      expect(issues.length).toBeGreaterThan(1);

      // Should have both generic and short issues
      const genericIssue = issues.find((i) => i.message.includes('generic'));
      const shortIssue = issues.find((i) => i.message.includes('short'));

      expect(genericIssue).toBeDefined();
      expect(shortIssue).toBeDefined();
    });
  });
});
