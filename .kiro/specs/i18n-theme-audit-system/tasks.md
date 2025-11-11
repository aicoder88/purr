# Implementation Plan

- [ ] 1. Set up project structure and core interfaces
  - Create directory structure for audit modules (`src/lib/audit/`)
  - Define TypeScript interfaces for violations, reports, and configurations
  - Set up shared types and constants
  - _Requirements: 1.1, 1.2, 8.1_

- [ ] 2. Implement static analyzer module
- [ ] 2.1 Create AST parser and file analyzer
  - Implement `StaticAnalyzer` class with TypeScript parser integration
  - Write AST traversal logic for JSX elements
  - Create file reading and parsing utilities
  - _Requirements: 1.1, 1.2_

- [ ] 2.2 Implement hardcoded text detection
  - Write logic to detect string literals in JSX elements
  - Detect hardcoded text in translatable attributes (placeholder, aria-label, title, alt)
  - Implement exception patterns (numbers, single chars, technical IDs)
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 2.3 Implement translation usage validation
  - Detect `useTranslation()` hook usage
  - Extract translation keys from `t('key.path')` calls
  - Flag dynamic translation key construction
  - _Requirements: 1.4, 2.1, 2.5_

- [ ] 3. Implement translation validator module
- [ ] 3.1 Create locale file loader
  - Implement dynamic import of locale files (en, fr, zh)
  - Parse nested translation objects
  - Build key-value maps for all locales
  - _Requirements: 2.1, 2.2_

- [ ] 3.2 Implement key validation logic
  - Write dot-notation key path resolver
  - Cross-reference keys across all three locales
  - Detect missing keys and empty values
  - Report structural inconsistencies
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 4. Implement theme compliance checker
- [ ] 4.1 Create color detection logic
  - Detect hardcoded colors (hex, rgb, named colors)
  - Parse className attributes for Tailwind classes
  - Analyze inline style objects for color properties
  - _Requirements: 3.1, 3.2_

- [ ] 4.2 Implement dark mode validation
  - Check for `dark:` prefixed Tailwind classes
  - Validate background/text/border color pairs
  - Detect `useTheme()` hook usage
  - _Requirements: 3.1, 3.3, 3.4_

- [ ] 4.3 Add contrast ratio checking
  - Implement WCAG contrast ratio calculation
  - Validate color pairs in both light and dark themes
  - Report accessibility issues
  - _Requirements: 3.3_


- [ ] 5. Implement file scanner module
- [ ] 5.1 Create directory traversal logic
  - Implement file scanning with `fast-glob`
  - Apply include/exclude patterns from configuration
  - Filter by file extensions (.tsx, .ts, .jsx, .js)
  - _Requirements: 4.2, 8.2_

- [ ] 5.2 Implement parallel file processing
  - Set up worker pool for concurrent analysis
  - Process files in batches with configurable concurrency
  - Aggregate results from all workers
  - _Requirements: 4.2, 4.4_

- [ ] 5.3 Create result aggregation logic
  - Combine violations from all files
  - Calculate statistics by type, severity, and page
  - Generate summary metrics and compliance scores
  - _Requirements: 1.5, 4.2_

- [ ] 6. Implement auto-fix suggestion engine
- [ ] 6.1 Create translation key suggestion logic
  - Analyze component hierarchy to suggest key paths
  - Generate translation key names from hardcoded text
  - Create before/after code snippets
  - _Requirements: 6.1, 6.3_

- [ ] 6.2 Implement theme fix suggestions
  - Map hardcoded colors to Tailwind classes
  - Suggest CSS variable alternatives
  - Generate dark mode variant suggestions
  - _Requirements: 6.2, 6.3_

- [ ] 6.3 Create suggestion formatter
  - Format suggestions with code snippets
  - Add step-by-step remediation instructions
  - Include confidence scores
  - Link to relevant documentation
  - _Requirements: 6.3, 6.4, 6.5_

- [ ] 7. Implement report generator module
- [ ] 7.1 Create JSON report generator
  - Serialize aggregated results to JSON
  - Include metadata, summary, violations, and recommendations
  - Write to `reports/i18n-theme-audit-[timestamp].json`
  - _Requirements: 4.3_

- [ ] 7.2 Create HTML report generator
  - Design interactive HTML template with filtering and sorting
  - Render violations grouped by page and severity
  - Include code snippets and fix suggestions
  - Add visual diff images (if available)
  - _Requirements: 4.3_

- [ ] 7.3 Create CI comment generator
  - Format results for GitHub PR comments
  - Show diff between current and baseline
  - Highlight new violations only
  - _Requirements: 7.3_


- [ ] 8. Implement configuration manager
- [ ] 8.1 Create configuration loader
  - Read `.kiro/settings/i18n-theme-audit.json`
  - Merge with default configuration
  - Validate configuration schema
  - _Requirements: 8.1, 8.2, 8.5_

- [ ] 8.2 Implement configuration validation
  - Validate include/exclude patterns
  - Check severity level values
  - Validate threshold configurations
  - _Requirements: 8.2, 8.3_

- [ ] 8.3 Create exception handling
  - Load exception patterns from config
  - Apply file and pattern exceptions during analysis
  - _Requirements: 7.4, 8.2_

- [ ] 9. Implement runtime visual tester
- [ ] 9.1 Create Playwright test suite
  - Set up test file at `e2e/i18n-theme-audit.spec.ts`
  - Implement page navigation and locale switching
  - Implement theme toggling via localStorage
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 9.2 Implement screenshot capture
  - Capture full-page screenshots for each locale/theme combination
  - Store screenshots in `test-screenshots/i18n-theme/`
  - Generate organized directory structure
  - _Requirements: 5.2, 5.3_

- [ ] 9.3 Implement visual regression detection
  - Compare screenshots with baseline using `pixelmatch`
  - Calculate diff percentage
  - Generate visual diff images
  - _Requirements: 5.4, 5.5_

- [ ] 9.4 Implement layout issue detection
  - Detect text overflow using DOM measurements
  - Check for layout breaks and wrapping issues
  - Report elements with overflow
  - _Requirements: 5.4_

- [ ] 10. Create CLI entry point
- [ ] 10.1 Implement main CLI script
  - Create `scripts/audit-i18n-theme.ts`
  - Parse command-line arguments (--ci, --update-baseline, --config)
  - Coordinate execution of all modules
  - _Requirements: 4.1, 4.4_

- [ ] 10.2 Add progress reporting
  - Display real-time progress with file counts
  - Show violation summaries during execution
  - Use `ora` for spinner and `chalk` for colors
  - _Requirements: 4.4_

- [ ] 10.3 Implement exit code handling
  - Exit with code 1 if violations exceed thresholds
  - Exit with code 0 for successful runs
  - Support CI mode with baseline comparison
  - _Requirements: 4.5, 7.1, 7.2_


- [ ] 11. Add npm scripts and documentation
- [ ] 11.1 Add npm scripts to package.json
  - Add `audit:i18n-theme` script for full audit
  - Add `audit:i18n-theme:ci` script for CI mode
  - Add `audit:i18n-theme:visual` script for visual testing only
  - Add `audit:i18n-theme:update-baseline` script for baseline updates
  - _Requirements: 4.1, 7.2_

- [ ] 11.2 Create configuration template
  - Create default `.kiro/settings/i18n-theme-audit.json` with sensible defaults
  - Document all configuration options
  - _Requirements: 8.1, 8.5_

- [ ] 11.3 Create usage documentation
  - Write README explaining how to run the audit
  - Document configuration options
  - Provide examples of common use cases
  - Include troubleshooting guide
  - _Requirements: 4.1, 8.1_

- [ ] 12. Implement baseline management
- [ ] 12.1 Create baseline storage
  - Store baseline reports in `reports/baselines/`
  - Implement baseline loading and comparison
  - _Requirements: 7.2_

- [ ] 12.2 Implement baseline comparison
  - Compare current results with baseline
  - Identify new violations vs. existing ones
  - Calculate violation trends
  - _Requirements: 7.2, 7.3_

- [ ] 12.3 Add baseline update command
  - Implement `--update-baseline` flag
  - Save current results as new baseline
  - Require explicit confirmation
  - _Requirements: 7.5_

- [ ]* 13. Write comprehensive tests
- [ ]* 13.1 Write unit tests for static analyzer
  - Test hardcoded text detection
  - Test translation usage validation
  - Test AST parsing edge cases
  - _Requirements: 1.1, 1.2, 1.3_

- [ ]* 13.2 Write unit tests for translation validator
  - Test key validation across locales
  - Test missing key detection
  - Test structural consistency checks
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ]* 13.3 Write unit tests for theme checker
  - Test color detection
  - Test dark mode validation
  - Test contrast ratio calculations
  - _Requirements: 3.1, 3.2, 3.3_

- [ ]* 13.4 Write integration tests
  - Test end-to-end audit execution
  - Test report generation
  - Test configuration loading
  - _Requirements: 4.1, 4.2, 4.3_

- [ ]* 13.5 Write E2E visual tests
  - Test screenshot capture
  - Test visual regression detection
  - Test layout issue detection
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 14. Integration and final testing
- [ ] 14.1 Run full audit on existing codebase
  - Execute audit on all pages and components
  - Review generated reports
  - Validate violation detection accuracy
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 14.2 Test CI integration
  - Run audit in CI mode
  - Test baseline comparison
  - Validate exit codes and PR comments
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 14.3 Performance testing
  - Measure execution time on full codebase
  - Validate memory usage stays under 512MB
  - Test parallel processing efficiency
  - _Requirements: 4.4_

- [ ] 14.4 Create initial baseline
  - Run audit with `--update-baseline`
  - Review and commit baseline report
  - Document baseline creation process
  - _Requirements: 7.2, 7.5_
