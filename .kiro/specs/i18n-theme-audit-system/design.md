# Design Document

## Overview

The i18n and Theme Audit System is a comprehensive static and runtime analysis tool that scans the Purrify codebase to identify hardcoded text, missing translations, and theme compliance issues. The system combines TypeScript AST parsing, file system traversal, translation key validation, and Playwright-based visual testing to provide actionable insights for maintaining multilingual and theme-aware components.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLI Entry Point                          │
│              scripts/audit-i18n-theme.ts                     │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌────────────────┐      ┌────────────────┐
│ Static Analyzer│      │ Runtime Tester │
│   (AST-based)  │      │  (Playwright)  │
└────────┬───────┘      └────────┬───────┘
         │                       │
         ▼                       ▼
┌────────────────┐      ┌────────────────┐
│ Report Builder │      │ Screenshot     │
│  (JSON/HTML)   │      │   Comparator   │
└────────────────┘      └────────────────┘
```

### Component Breakdown

1. **Static Analyzer**: Parses TypeScript/TSX files using `@typescript-eslint/parser`
2. **Translation Validator**: Cross-references translation keys with locale files
3. **Theme Checker**: Analyzes CSS classes and inline styles for theme compliance
4. **Runtime Tester**: Uses Playwright to render pages in all locales/themes
5. **Report Generator**: Produces JSON and HTML reports with violation details
6. **Auto-Fix Engine**: Generates code suggestions for common violations


## Components and Interfaces

### 1. Static Analyzer Module

**Location**: `src/lib/audit/static-analyzer.ts`

**Purpose**: Parse TypeScript/TSX files to detect hardcoded strings and theme violations

**Key Functions**:
```typescript
interface StaticAnalyzer {
  scanFile(filePath: string): FileAnalysisResult
  detectHardcodedText(ast: AST): HardcodedTextViolation[]
  validateTranslationUsage(ast: AST): TranslationViolation[]
  checkThemeCompliance(ast: AST): ThemeViolation[]
}

interface FileAnalysisResult {
  filePath: string
  componentName: string
  violations: Violation[]
  compliantPatterns: string[]
  suggestions: AutoFixSuggestion[]
}

interface Violation {
  type: 'hardcoded-text' | 'missing-translation' | 'theme-violation'
  severity: 'error' | 'warning' | 'info'
  line: number
  column: number
  message: string
  context: string
  suggestion?: AutoFixSuggestion
}
```

**Implementation Details**:
- Uses `@typescript-eslint/parser` to generate AST
- Traverses JSX elements looking for string literals
- Identifies `useTranslation()` hook usage
- Detects hardcoded color values (hex, rgb, named colors)
- Checks for Tailwind dark mode classes (`dark:*`)

### 2. Translation Validator Module

**Location**: `src/lib/audit/translation-validator.ts`

**Purpose**: Verify translation keys exist in all locale files and are properly structured

**Key Functions**:
```typescript
interface TranslationValidator {
  loadLocaleFiles(): LocaleData
  validateKey(key: string): KeyValidationResult
  findMissingKeys(): MissingKeyReport[]
  checkKeyConsistency(): ConsistencyReport
}

interface LocaleData {
  en: Record<string, any>
  fr: Record<string, any>
  zh: Record<string, any>
}

interface KeyValidationResult {
  key: string
  existsInEn: boolean
  existsInFr: boolean
  existsInZh: boolean
  values: { en?: string; fr?: string; zh?: string }
}
```

**Implementation Details**:
- Dynamically imports `src/translations/{en,fr,zh}.ts`
- Recursively traverses nested translation objects
- Validates dot-notation key paths
- Detects empty or undefined values
- Reports structural mismatches between locales


### 3. Theme Compliance Checker

**Location**: `src/lib/audit/theme-checker.ts`

**Purpose**: Analyze components for proper dark/light mode support

**Key Functions**:
```typescript
interface ThemeChecker {
  analyzeComponent(ast: AST): ThemeAnalysisResult
  detectHardcodedColors(node: ASTNode): ColorViolation[]
  validateDarkModeClasses(className: string): boolean
  checkContrastRatios(colors: ColorPair[]): ContrastReport
}

interface ThemeAnalysisResult {
  hasThemeContext: boolean
  usesDarkModeClasses: boolean
  hardcodedColors: ColorViolation[]
  contrastIssues: ContrastIssue[]
  recommendations: string[]
}

interface ColorViolation {
  type: 'hex' | 'rgb' | 'named' | 'inline-style'
  value: string
  location: { line: number; column: number }
  suggestedFix: string
}
```

**Implementation Details**:
- Parses className attributes for Tailwind classes
- Detects inline style objects with color properties
- Validates presence of `dark:` prefixed classes
- Checks for `useTheme()` hook usage
- Suggests CSS variable alternatives for hardcoded colors

### 4. File Scanner Module

**Location**: `src/lib/audit/file-scanner.ts`

**Purpose**: Traverse directory structure and coordinate analysis

**Key Functions**:
```typescript
interface FileScanner {
  scanDirectory(path: string, options: ScanOptions): ScanResult
  filterFiles(files: string[]): string[]
  processFile(filePath: string): Promise<FileAnalysisResult>
  aggregateResults(results: FileAnalysisResult[]): AggregatedReport
}

interface ScanOptions {
  includePatterns: string[]
  excludePatterns: string[]
  fileExtensions: string[]
  maxConcurrency: number
}

interface AggregatedReport {
  totalFiles: number
  totalViolations: number
  violationsByType: Record<string, number>
  violationsBySeverity: Record<string, number>
  fileResults: FileAnalysisResult[]
  summary: ReportSummary
}
```

**Implementation Details**:
- Uses `fast-glob` for efficient file traversal
- Respects `.gitignore` and custom ignore patterns
- Processes files in parallel with configurable concurrency
- Aggregates results by page, component type, and severity


### 5. Runtime Visual Tester

**Location**: `e2e/i18n-theme-audit.spec.ts`

**Purpose**: Playwright-based visual testing across locales and themes

**Key Functions**:
```typescript
interface VisualTester {
  testPage(url: string, locales: string[], themes: string[]): Promise<VisualTestResult>
  captureScreenshot(page: Page, config: ScreenshotConfig): Promise<Buffer>
  compareWithBaseline(current: Buffer, baseline: Buffer): DiffResult
  detectLayoutIssues(page: Page): LayoutIssue[]
}

interface VisualTestResult {
  url: string
  screenshots: Screenshot[]
  layoutIssues: LayoutIssue[]
  textOverflows: TextOverflow[]
  missingTranslations: string[]
}

interface Screenshot {
  locale: string
  theme: string
  path: string
  timestamp: number
  diffPercentage?: number
}
```

**Implementation Details**:
- Iterates through all routes defined in `pages/`
- Sets locale via URL parameter or cookie
- Toggles theme via localStorage or context
- Captures full-page screenshots
- Uses `pixelmatch` for visual regression detection
- Detects text overflow using `element.scrollWidth > element.clientWidth`

### 6. Report Generator Module

**Location**: `src/lib/audit/report-generator.ts`

**Purpose**: Generate human-readable and machine-readable reports

**Key Functions**:
```typescript
interface ReportGenerator {
  generateJSON(data: AggregatedReport): string
  generateHTML(data: AggregatedReport): string
  generateMarkdown(data: AggregatedReport): string
  generateCIComment(data: AggregatedReport, baseline: AggregatedReport): string
}

interface ReportTemplate {
  summary: SummarySection
  violationsByPage: ViolationSection[]
  recommendations: RecommendationSection
  visualDiffs: VisualDiffSection
}
```

**Implementation Details**:
- JSON format for programmatic consumption
- HTML format with interactive filtering and sorting
- Markdown format for documentation
- CI comment format with diff highlighting
- Includes code snippets and fix suggestions
- Links to relevant documentation


### 7. Auto-Fix Suggestion Engine

**Location**: `src/lib/audit/auto-fix-engine.ts`

**Purpose**: Generate actionable fix suggestions for violations

**Key Functions**:
```typescript
interface AutoFixEngine {
  generateSuggestion(violation: Violation, context: FileContext): AutoFixSuggestion
  suggestTranslationKey(text: string, componentPath: string): string
  suggestThemeFix(colorViolation: ColorViolation): ThemeFixSuggestion
  generateCodeSnippet(suggestion: AutoFixSuggestion): CodeSnippet
}

interface AutoFixSuggestion {
  type: 'add-translation' | 'fix-theme' | 'add-context'
  description: string
  before: string
  after: string
  steps: string[]
  confidence: 'high' | 'medium' | 'low'
}

interface ThemeFixSuggestion {
  originalColor: string
  tailwindClass?: string
  cssVariable?: string
  darkModeVariant: string
}
```

**Implementation Details**:
- Analyzes component hierarchy to suggest translation key paths
- Maps common colors to Tailwind classes
- Suggests CSS variables for custom colors
- Provides step-by-step remediation instructions
- Includes confidence scores based on pattern matching

### 8. Configuration Manager

**Location**: `src/lib/audit/config-manager.ts`

**Purpose**: Load and validate audit configuration

**Key Functions**:
```typescript
interface ConfigManager {
  loadConfig(): AuditConfig
  validateConfig(config: AuditConfig): ValidationResult
  mergeWithDefaults(config: Partial<AuditConfig>): AuditConfig
}

interface AuditConfig {
  includePatterns: string[]
  excludePatterns: string[]
  severityLevels: SeverityConfig
  thresholds: ThresholdConfig
  exceptions: ExceptionConfig
  visualTesting: VisualTestConfig
}

interface ThresholdConfig {
  maxViolationsPerFile: number
  maxTotalViolations: number
  failOnSeverity: 'error' | 'warning' | 'info'
}
```

**Configuration File Example** (`.kiro/settings/i18n-theme-audit.json`):
```json
{
  "includePatterns": ["pages/**/*.tsx", "src/components/**/*.tsx"],
  "excludePatterns": ["**/*.test.tsx", "**/*.spec.tsx", "node_modules/**"],
  "severityLevels": {
    "hardcodedText": "error",
    "missingTranslation": "error",
    "themeViolation": "warning"
  },
  "thresholds": {
    "maxViolationsPerFile": 10,
    "maxTotalViolations": 100,
    "failOnSeverity": "error"
  },
  "exceptions": {
    "files": ["pages/_document.tsx"],
    "patterns": ["^[0-9]+$", "^[A-Z]{2,}$"]
  },
  "visualTesting": {
    "enabled": true,
    "locales": ["en", "fr", "zh"],
    "themes": ["light", "dark"],
    "viewports": [
      { "width": 375, "height": 667, "name": "mobile" },
      { "width": 1920, "height": 1080, "name": "desktop" }
    ]
  }
}
```


## Data Models

### Violation Model

```typescript
interface Violation {
  id: string
  type: ViolationType
  severity: Severity
  filePath: string
  componentName: string
  line: number
  column: number
  message: string
  context: string
  suggestion?: AutoFixSuggestion
  metadata: ViolationMetadata
}

type ViolationType = 
  | 'hardcoded-text'
  | 'missing-translation-key'
  | 'incomplete-locale-coverage'
  | 'theme-hardcoded-color'
  | 'theme-missing-dark-variant'
  | 'theme-contrast-issue'
  | 'dynamic-translation-key'

type Severity = 'error' | 'warning' | 'info'

interface ViolationMetadata {
  pageRoute?: string
  componentType?: 'page' | 'section' | 'ui' | 'layout'
  textLength?: number
  colorValue?: string
  translationKey?: string
}
```

### Report Model

```typescript
interface AuditReport {
  metadata: ReportMetadata
  summary: ReportSummary
  violations: Violation[]
  visualTests: VisualTestResult[]
  recommendations: Recommendation[]
}

interface ReportMetadata {
  timestamp: string
  version: string
  duration: number
  filesScanned: number
  configUsed: AuditConfig
}

interface ReportSummary {
  totalViolations: number
  violationsByType: Record<ViolationType, number>
  violationsBySeverity: Record<Severity, number>
  violationsByPage: Record<string, number>
  complianceScore: number
  criticalPages: string[]
}

interface Recommendation {
  priority: 'high' | 'medium' | 'low'
  category: string
  title: string
  description: string
  affectedFiles: string[]
  estimatedEffort: string
  steps: string[]
}
```

### Translation Key Model

```typescript
interface TranslationKeyInfo {
  key: string
  path: string[]
  locales: {
    en: { exists: boolean; value?: string }
    fr: { exists: boolean; value?: string }
    zh: { exists: boolean; value?: string }
  }
  usages: KeyUsage[]
  status: 'complete' | 'partial' | 'missing'
}

interface KeyUsage {
  filePath: string
  line: number
  componentName: string
  isDynamic: boolean
}
```


## Error Handling

### Static Analysis Errors

1. **Parse Errors**: If a TypeScript file cannot be parsed, log the error and continue with other files
2. **Invalid AST**: Skip nodes that don't match expected patterns, log warning
3. **File Access Errors**: Report files that cannot be read due to permissions

### Translation Validation Errors

1. **Missing Locale Files**: Fail fast if any of the three locale files cannot be loaded
2. **Malformed Translation Objects**: Report structural issues but continue analysis
3. **Circular References**: Detect and report circular key references

### Runtime Testing Errors

1. **Page Load Failures**: Retry up to 3 times, then mark page as failed
2. **Screenshot Failures**: Log error but continue with other pages
3. **Timeout Errors**: Configure reasonable timeouts (30s per page)

### Report Generation Errors

1. **File Write Errors**: Ensure reports directory exists, handle permission issues
2. **Template Errors**: Validate report data before rendering
3. **Large Report Handling**: Paginate or chunk reports exceeding 10MB

## Testing Strategy

### Unit Tests

**Location**: `__tests__/audit/`

**Coverage**:
- Static analyzer AST parsing logic
- Translation key validation
- Theme compliance checking
- Auto-fix suggestion generation
- Configuration loading and validation

**Test Cases**:
```typescript
describe('StaticAnalyzer', () => {
  it('should detect hardcoded text in JSX elements')
  it('should ignore text within translation functions')
  it('should detect hardcoded colors in className')
  it('should detect inline style color violations')
  it('should handle nested JSX structures')
})

describe('TranslationValidator', () => {
  it('should validate keys exist in all locales')
  it('should detect missing keys in specific locales')
  it('should handle nested translation objects')
  it('should detect empty translation values')
})

describe('ThemeChecker', () => {
  it('should detect missing dark mode variants')
  it('should validate Tailwind dark classes')
  it('should suggest CSS variable alternatives')
  it('should check contrast ratios')
})
```

### Integration Tests

**Location**: `__tests__/audit/integration/`

**Coverage**:
- End-to-end audit execution
- Report generation
- Configuration loading
- File scanning and aggregation

### E2E Visual Tests

**Location**: `e2e/i18n-theme-audit.spec.ts`

**Coverage**:
- Screenshot capture across locales and themes
- Visual regression detection
- Layout issue detection
- Text overflow detection

**Test Cases**:
```typescript
test('should capture screenshots in all locales', async ({ page }) => {
  for (const locale of ['en', 'fr', 'zh']) {
    await page.goto(`/?locale=${locale}`)
    await page.screenshot({ path: `test-screenshots/home-${locale}.png` })
  }
})

test('should detect text overflow in translated content', async ({ page }) => {
  await page.goto('/?locale=fr')
  const overflows = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('*')).filter(el => 
      el.scrollWidth > el.clientWidth
    ).map(el => el.className)
  })
  expect(overflows).toHaveLength(0)
})
```


## Implementation Flow

### CLI Execution Flow

```
1. Load Configuration
   ├─ Read .kiro/settings/i18n-theme-audit.json
   ├─ Merge with defaults
   └─ Validate configuration

2. Static Analysis Phase
   ├─ Scan directories (pages/, src/components/, src/lib/)
   ├─ Filter files by patterns and extensions
   ├─ Parse each file with TypeScript parser
   ├─ Analyze AST for violations
   │  ├─ Detect hardcoded text
   │  ├─ Validate translation usage
   │  └─ Check theme compliance
   └─ Aggregate results

3. Translation Validation Phase
   ├─ Load all locale files (en, fr, zh)
   ├─ Extract translation keys from code
   ├─ Cross-reference keys with locale files
   ├─ Detect missing or incomplete keys
   └─ Report structural inconsistencies

4. Runtime Testing Phase (if enabled)
   ├─ Start Playwright browser
   ├─ For each page route:
   │  ├─ For each locale (en, fr, zh):
   │  │  ├─ For each theme (light, dark):
   │  │  │  ├─ Navigate to page
   │  │  │  ├─ Wait for hydration
   │  │  │  ├─ Capture screenshot
   │  │  │  ├─ Detect layout issues
   │  │  │  └─ Check for text overflow
   │  │  └─ Compare with baseline (if exists)
   │  └─ Aggregate visual test results
   └─ Close browser

5. Report Generation Phase
   ├─ Aggregate all violations
   ├─ Calculate compliance scores
   ├─ Generate auto-fix suggestions
   ├─ Create prioritized recommendations
   ├─ Write JSON report
   ├─ Write HTML report
   └─ Write CI comment (if --ci flag)

6. Exit
   ├─ If violations exceed threshold → exit code 1
   └─ Otherwise → exit code 0
```

### AST Traversal Algorithm

```typescript
function analyzeFile(filePath: string): FileAnalysisResult {
  const sourceCode = fs.readFileSync(filePath, 'utf-8')
  const ast = parse(sourceCode, { jsx: true, typescript: true })
  
  const violations: Violation[] = []
  
  traverse(ast, {
    JSXText(node) {
      // Check if text is hardcoded
      if (isHardcodedText(node.value)) {
        violations.push(createViolation('hardcoded-text', node))
      }
    },
    
    JSXAttribute(node) {
      // Check attributes like placeholder, aria-label, title
      if (isTranslatableAttribute(node.name) && isHardcodedText(node.value)) {
        violations.push(createViolation('hardcoded-text', node))
      }
    },
    
    CallExpression(node) {
      // Validate translation function calls
      if (isTranslationCall(node)) {
        const key = extractTranslationKey(node)
        if (!validateTranslationKey(key)) {
          violations.push(createViolation('missing-translation-key', node))
        }
      }
    },
    
    JSXAttribute(node) {
      // Check className for theme compliance
      if (node.name === 'className') {
        const classes = extractClasses(node.value)
        const themeViolations = checkThemeClasses(classes)
        violations.push(...themeViolations)
      }
      
      // Check style attribute for hardcoded colors
      if (node.name === 'style') {
        const colorViolations = checkInlineStyles(node.value)
        violations.push(...colorViolations)
      }
    }
  })
  
  return {
    filePath,
    componentName: extractComponentName(ast),
    violations,
    suggestions: generateSuggestions(violations)
  }
}
```


### Pattern Detection Rules

**Hardcoded Text Detection**:
- Text within JSX elements not wrapped by `{t('...')}`
- String literals in translatable attributes (placeholder, aria-label, title, alt)
- Exceptions: Numbers, single characters, technical identifiers (IDs, class names)

**Translation Key Validation**:
- Extract keys from `t('key.path')` calls
- Verify key exists in all three locale files
- Check for empty or undefined values
- Detect dynamic key construction (flag for manual review)

**Theme Compliance Rules**:
- Background colors must have `dark:bg-*` variants
- Text colors must have `dark:text-*` variants
- Border colors must have `dark:border-*` variants
- Hardcoded hex/rgb colors flagged as violations
- Inline styles with colors flagged as violations

## Performance Considerations

### Optimization Strategies

1. **Parallel Processing**: Process files concurrently with worker threads
2. **Caching**: Cache parsed ASTs for unchanged files
3. **Incremental Analysis**: Only analyze changed files in CI mode
4. **Lazy Loading**: Load locale files once and reuse
5. **Stream Processing**: Process large reports in chunks

### Performance Targets

- Scan 500+ files in under 30 seconds
- Generate reports in under 5 seconds
- Visual testing: 2-3 seconds per page per locale/theme combination
- Memory usage: Under 512MB for typical project

## Security Considerations

1. **File Access**: Validate file paths to prevent directory traversal
2. **Code Execution**: Use safe AST parsing, never eval() user code
3. **Report Output**: Sanitize file paths and code snippets in HTML reports
4. **Configuration**: Validate configuration schema to prevent injection

## Dependencies

### Required Packages

```json
{
  "@typescript-eslint/parser": "^6.0.0",
  "@typescript-eslint/typescript-estree": "^6.0.0",
  "fast-glob": "^3.3.0",
  "pixelmatch": "^5.3.0",
  "pngjs": "^7.0.0",
  "chalk": "^5.3.0",
  "ora": "^7.0.0",
  "playwright": "^1.40.0"
}
```

### Integration with Existing Tools

- Uses existing Playwright setup from `e2e/`
- Leverages translation context from `src/lib/translation-context.tsx`
- Integrates with theme context from `src/lib/theme-context.tsx`
- Outputs to existing `reports/` directory
