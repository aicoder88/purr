/** @jest-environment node */

jest.mock('../../scripts/seo/validate-seo-compliance', () => ({
  validateAllPages: jest.fn(),
}));

jest.mock('../../scripts/seo/lib/image-validator', () => ({
  validateAllImages: jest.fn(),
}));

jest.mock('../../scripts/seo/lib/canonical-validator', () => ({
  validateAllCanonicals: jest.fn(),
}));

jest.mock('../../scripts/seo/lib/sitemap-indexability-validator', () => ({
  validateGeneratedSitemapIndexability: jest.fn(),
}));

jest.mock('../../scripts/seo/validate-no-inline-head-tags', () => ({
  validateNoInlineHeadTags: jest.fn(),
}));

jest.mock('../../scripts/seo/validate-rendered-seo', () => ({
  validateRenderedSeo: jest.fn(),
  isMissingPlaywrightBrowserError: jest.fn(),
}));

jest.mock('../../scripts/seo/validate-supported-locales', () => ({
  validateSupportedLocaleSurface: jest.fn(),
}));

import { runPrebuildValidation } from '../../scripts/seo/prebuild-validation';
import { validateAllPages } from '../../scripts/seo/validate-seo-compliance';
import { validateAllImages } from '../../scripts/seo/lib/image-validator';
import { validateAllCanonicals } from '../../scripts/seo/lib/canonical-validator';
import { validateGeneratedSitemapIndexability } from '../../scripts/seo/lib/sitemap-indexability-validator';
import { validateNoInlineHeadTags } from '../../scripts/seo/validate-no-inline-head-tags';
import {
  isMissingPlaywrightBrowserError,
  validateRenderedSeo,
} from '../../scripts/seo/validate-rendered-seo';
import { validateSupportedLocaleSurface } from '../../scripts/seo/validate-supported-locales';

describe('prebuild-validation', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    (validateAllPages as jest.Mock).mockResolvedValue({
      errors: [],
      warnings: [],
    });
    (validateAllImages as jest.Mock).mockResolvedValue({
      actionableIssues: [],
    });
    (validateAllCanonicals as jest.Mock).mockResolvedValue({
      issues: [],
    });
    (validateNoInlineHeadTags as jest.Mock).mockResolvedValue({
      passed: true,
      issues: [],
      allowedExceptions: 0,
    });
    (validateSupportedLocaleSurface as jest.Mock).mockResolvedValue({
      passed: true,
      issues: [],
    });
    (validateGeneratedSitemapIndexability as jest.Mock).mockResolvedValue({
      passed: true,
      issues: [],
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('downgrades missing Playwright browser executables to a warning', async () => {
    (validateRenderedSeo as jest.Mock).mockRejectedValue(
      new Error("browserType.launch: Executable doesn't exist")
    );
    (isMissingPlaywrightBrowserError as jest.Mock).mockReturnValue(true);

    const result = await runPrebuildValidation();

    expect(result.passed).toBe(true);
    expect(result.errors).toBe(0);
    expect(result.warnings).toBe(1);
    expect(result.details.renderedSeo).toEqual({
      passed: true,
      errors: 0,
      warnings: 1,
      pagesChecked: 0,
      skipped: true,
    });
  });

  it('keeps failing on other rendered SEO errors', async () => {
    (validateRenderedSeo as jest.Mock).mockRejectedValue(new Error('unexpected launch failure'));
    (isMissingPlaywrightBrowserError as jest.Mock).mockReturnValue(false);

    const result = await runPrebuildValidation();

    expect(result.passed).toBe(false);
    expect(result.errors).toBe(1);
  });
});
