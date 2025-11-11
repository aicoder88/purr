# Requirements Document

## Introduction

This document defines requirements for an automated audit system that scans the entire Purrify website to identify hardcoded text strings and verify proper internationalization (i18n) and theme support. The system will detect untranslated content, missing translation keys, and components lacking proper dark/light mode variants.

## Glossary

- **Audit System**: The automated tool that scans pages and components for i18n and theme compliance
- **Hardcoded Text**: String literals embedded directly in JSX/TSX without translation context
- **Translation Context**: The `useTranslation()` hook from `@/lib/translation-context`
- **Theme Variant**: CSS classes or styles that adapt to light/dark mode via `useTheme()` context
- **Compliance Report**: JSON/HTML output documenting violations and recommendations
- **Translation Key**: A dot-notation path (e.g., `home.hero.title`) referencing locale files
- **Static Analysis**: Code parsing without runtime execution to detect patterns
- **Runtime Analysis**: Browser-based scanning of rendered DOM for visual verification

## Requirements

### Requirement 1: Hardcoded Text Detection

**User Story:** As a developer, I want to automatically detect all hardcoded text strings in components and pages, so that I can ensure complete translation coverage across all locales.

#### Acceptance Criteria

1. WHEN the Audit System scans a TypeScript/TSX file, THE Audit System SHALL identify all string literals within JSX elements that are not wrapped by translation functions
2. WHEN the Audit System encounters a string literal in JSX, THE Audit System SHALL report the file path, line number, component name, and the hardcoded text content
3. WHEN the Audit System detects text within HTML attributes (aria-label, placeholder, title), THE Audit System SHALL flag these as requiring translation
4. WHERE a component uses the Translation Context correctly, THE Audit System SHALL mark that component as compliant
5. WHEN the Audit System completes scanning, THE Audit System SHALL generate a prioritized list of violations sorted by page importance and text visibility

### Requirement 2: Translation Key Validation

**User Story:** As a developer, I want to verify that all translation keys used in components exist in all locale files (en, fr, zh), so that I can prevent runtime translation errors.

#### Acceptance Criteria

1. WHEN the Audit System scans a component using `t('key.path')`, THE Audit System SHALL verify the key exists in `src/translations/en.ts`, `src/translations/fr.ts`, and `src/translations/zh.ts`
2. IF a translation key is missing from any locale file, THEN THE Audit System SHALL report the missing key, affected locales, and component location
3. WHEN the Audit System finds a translation key in code, THE Audit System SHALL validate that the translated values are non-empty strings
4. WHEN the Audit System detects inconsistent key structures across locales, THE Audit System SHALL report structural mismatches
5. WHERE translation keys are dynamically constructed (e.g., `t(\`dynamic.\${variable}\`)`), THE Audit System SHALL flag these for manual review

### Requirement 3: Dark Mode Theme Compliance

**User Story:** As a developer, I want to ensure all components properly support both light and dark themes, so that users have a consistent visual experience regardless of their theme preference.

#### Acceptance Criteria

1. WHEN the Audit System scans a component with color styles, THE Audit System SHALL verify the component uses Tailwind dark mode classes (e.g., `dark:bg-gray-800`) or CSS variables
2. WHEN the Audit System detects hardcoded color values (hex, rgb, named colors), THE Audit System SHALL flag these as theme violations
3. WHEN the Audit System encounters background colors, THE Audit System SHALL verify corresponding text colors have sufficient contrast in both themes
4. WHERE a component uses the Theme Context (`useTheme()`), THE Audit System SHALL validate that theme-dependent rendering exists
5. WHEN the Audit System finds inline styles with colors, THE Audit System SHALL report these as requiring CSS variable conversion

### Requirement 4: Automated Scanning Script

**User Story:** As a developer, I want to run a single command that scans the entire codebase and generates a comprehensive report, so that I can quickly assess i18n and theme compliance.

#### Acceptance Criteria

1. THE Audit System SHALL provide a CLI command `npm run audit:i18n-theme` that executes the full scan
2. WHEN the scan executes, THE Audit System SHALL process all files in `pages/`, `src/components/`, and `src/lib/` directories
3. WHEN the scan completes, THE Audit System SHALL generate both JSON and HTML report formats in `reports/i18n-theme-audit-[timestamp].{json,html}`
4. WHEN the scan runs, THE Audit System SHALL display real-time progress with file counts and violation summaries
5. IF the scan detects critical violations (pages with >50% untranslated text), THEN THE Audit System SHALL exit with a non-zero status code for CI integration

### Requirement 5: Visual Runtime Verification

**User Story:** As a developer, I want to visually verify that pages render correctly in all locales and both themes, so that I can catch layout issues and missing translations that static analysis might miss.

#### Acceptance Criteria

1. THE Audit System SHALL provide a Playwright-based visual testing suite that captures screenshots of key pages
2. WHEN the visual test runs, THE Audit System SHALL render each page in all three locales (en, fr, zh) and both themes (light, dark)
3. WHEN the visual test captures screenshots, THE Audit System SHALL store them in `test-screenshots/i18n-theme/[locale]-[theme]-[page].png`
4. WHEN the visual test detects text overflow or layout breaks, THE Audit System SHALL flag the page for manual review
5. WHERE baseline screenshots exist, THE Audit System SHALL perform pixel-diff comparison and report visual regressions

### Requirement 6: Auto-Fix Suggestions

**User Story:** As a developer, I want the audit system to suggest fixes for common violations, so that I can quickly remediate issues without manual investigation.

#### Acceptance Criteria

1. WHEN the Audit System detects hardcoded text, THE Audit System SHALL suggest a translation key path based on component hierarchy and context
2. WHEN the Audit System finds hardcoded colors, THE Audit System SHALL recommend equivalent Tailwind classes or CSS variables
3. WHEN the Audit System generates suggestions, THE Audit System SHALL include code snippets showing before/after examples
4. WHERE multiple violations exist in a single file, THE Audit System SHALL group suggestions by violation type
5. WHEN the Audit System provides suggestions, THE Audit System SHALL include links to relevant documentation (translation context, theme context)

### Requirement 7: Continuous Integration Support

**User Story:** As a team, I want the audit system to run automatically in CI/CD pipelines, so that new violations are caught before merging to production.

#### Acceptance Criteria

1. THE Audit System SHALL support a `--ci` flag that outputs machine-readable results and fails on violations
2. WHEN running in CI mode, THE Audit System SHALL compare results against a baseline and report only new violations
3. WHEN the CI check fails, THE Audit System SHALL provide a summary comment format suitable for GitHub PR comments
4. WHERE violations are marked as exceptions, THE Audit System SHALL skip these in CI checks via a `.i18n-theme-exceptions.json` config file
5. WHEN the baseline is updated, THE Audit System SHALL require explicit approval via a `--update-baseline` flag

### Requirement 8: Configuration and Customization

**User Story:** As a developer, I want to configure audit rules and thresholds, so that I can adapt the system to project-specific requirements.

#### Acceptance Criteria

1. THE Audit System SHALL read configuration from `.kiro/settings/i18n-theme-audit.json`
2. WHEN configuration is loaded, THE Audit System SHALL support custom ignore patterns for files, directories, and specific text patterns
3. WHEN configuration defines severity levels, THE Audit System SHALL categorize violations as error, warning, or info
4. WHERE custom rules are defined, THE Audit System SHALL execute these alongside built-in checks
5. WHEN no configuration exists, THE Audit System SHALL use sensible defaults covering all pages and components
