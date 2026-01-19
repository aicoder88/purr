#!/usr/bin/env node

/**
 * Hydration Safety Validator
 *
 * Detects the anti-pattern of conditionally returning null in page components,
 * which causes React hydration mismatches between server and client.
 *
 * ❌ BAD:  if (condition) return null;
 * ✅ GOOD: if (loading) return <Loading />;
 * ✅ GOOD: if (!data) return <ErrorPage />;
 * ✅ GOOD: Use getServerSideProps redirect
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
};

const PAGES_DIR = path.join(process.cwd(), 'pages');

// Files that are safe to ignore (redirect-only pages with getServerSideProps)
const SAFE_REDIRECT_PAGES = new Set([
  'pages/free.tsx',
  'pages/buy.tsx',
  'pages/free-trial.tsx',
  'pages/montreal.tsx',
  'pages/us.tsx',
  'pages/support/subscription.tsx',
  'pages/customers/case-studies.tsx',
  'pages/customers/testimonials.tsx',
  // Add more known safe redirect pages here
]);

/**
 * Check if a file is a redirect-only page (has getServerSideProps with redirect)
 */
function isRedirectOnlyPage(filePath, content) {
  const relativePath = path.relative(process.cwd(), filePath);

  // Check whitelist first
  if (SAFE_REDIRECT_PAGES.has(relativePath)) {
    return true;
  }

  // Check if file has getServerSideProps with redirect
  const hasServerSideProps = /export\s+(const|async\s+function)\s+getServerSideProps/.test(content);
  const hasRedirect = /redirect\s*:\s*\{/.test(content);

  return hasServerSideProps && hasRedirect;
}

/**
 * Detect conditional return null patterns in component body
 */
function detectConditionalReturnNull(filePath, content) {
  const issues = [];
  const lines = content.split('\n');
  const relativePath = path.relative(process.cwd(), filePath);

  // Skip if it's a redirect-only page
  if (isRedirectOnlyPage(filePath, content)) {
    return issues;
  }

  // Find the main export default component
  const exportMatch = content.match(/export\s+default\s+function\s+(\w+)/);
  if (!exportMatch) {
    return issues;
  }

  const componentName = exportMatch[1];
  const componentStart = exportMatch.index;

  // Find the component body (between first { and matching })
  let braceDepth = 0;
  let componentBodyStart = -1;
  let componentBodyEnd = -1;

  for (let i = componentStart; i < content.length; i++) {
    if (content[i] === '{') {
      if (braceDepth === 0) {
        componentBodyStart = i;
      }
      braceDepth++;
    } else if (content[i] === '}') {
      braceDepth--;
      if (braceDepth === 0) {
        componentBodyEnd = i;
        break;
      }
    }
  }

  if (componentBodyStart === -1 || componentBodyEnd === -1) {
    return issues;
  }

  const componentBody = content.slice(componentBodyStart, componentBodyEnd);

  // Pattern 1: if (condition) return null;
  // Pattern 2: if (condition) { return null; }
  // Be careful to exclude:
  // - Comments
  // - String literals
  // - API routes (not in pages/ or in pages/api/)
  // - Helper functions inside the component

  const patterns = [
    // if (condition) return null;
    /if\s*\([^)]+\)\s*return\s+null\s*;/g,
    // if (condition) { return null; }
    /if\s*\([^)]+\)\s*\{\s*return\s+null\s*;\s*\}/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(componentBody)) !== null) {
      const matchPosition = componentBodyStart + match.index;
      const lineNumber = content.slice(0, matchPosition).split('\n').length;
      const line = lines[lineNumber - 1];

      // Skip comments
      if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
        continue;
      }

      // Skip if inside a string literal (rough check)
      const beforeMatch = content.slice(0, matchPosition);
      const singleQuotes = (beforeMatch.match(/'/g) || []).length;
      const doubleQuotes = (beforeMatch.match(/"/g) || []).length;
      const backticks = (beforeMatch.match(/`/g) || []).length;

      if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0 || backticks % 2 !== 0) {
        continue;
      }

      issues.push({
        file: relativePath,
        line: lineNumber,
        code: line.trim(),
        component: componentName,
      });
    }
  }

  return issues;
}

/**
 * Main validation function
 */
async function validateHydration() {
  console.log(`${colors.cyan}🔍 Validating hydration safety...${colors.reset}\n`);

  // Find all page files
  const pageFiles = await glob('pages/**/*.{ts,tsx}', {
    ignore: [
      'pages/api/**',
      'pages/_app.tsx',
      'pages/_document.tsx',
      'pages/_error.tsx',
      'pages/404.tsx',
      'pages/500.tsx',
    ],
  });

  let totalIssues = 0;
  const issuesByFile = {};

  for (const file of pageFiles) {
    const filePath = path.join(process.cwd(), file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const issues = detectConditionalReturnNull(filePath, content);

    if (issues.length > 0) {
      issuesByFile[file] = issues;
      totalIssues += issues.length;
    }
  }

  // Report results
  if (totalIssues === 0) {
    console.log(`${colors.green}✓ No hydration issues found!${colors.reset}`);
    console.log(`${colors.dim}  Scanned ${pageFiles.length} page files${colors.reset}\n`);
    return true;
  }

  console.log(`${colors.red}✗ Found ${totalIssues} potential hydration issue(s):${colors.reset}\n`);

  for (const [file, issues] of Object.entries(issuesByFile)) {
    console.log(`${colors.yellow}${file}${colors.reset}`);
    for (const issue of issues) {
      console.log(`  ${colors.dim}Line ${issue.line}:${colors.reset} ${issue.code}`);
    }
    console.log();
  }

  console.log(`${colors.cyan}Why this is dangerous:${colors.reset}`);
  console.log(`  Returning null conditionally causes React hydration mismatches.`);
  console.log(`  Server renders one thing, client renders another → errors.\n`);

  console.log(`${colors.cyan}How to fix:${colors.reset}`);
  console.log(`  ${colors.green}✓${colors.reset} Option 1: Return a component instead of null:`);
  console.log(`    ${colors.dim}if (loading) return <LoadingSpinner />;${colors.reset}`);
  console.log(`    ${colors.dim}if (!authorized) return <AccessDenied />;${colors.reset}\n`);

  console.log(`  ${colors.green}✓${colors.reset} Option 2: Use getServerSideProps redirect:`);
  console.log(`    ${colors.dim}export const getServerSideProps = async (ctx) => {${colors.reset}`);
  console.log(`    ${colors.dim}  if (!authorized) return { redirect: { destination: '/login' } };${colors.reset}`);
  console.log(`    ${colors.dim}};${colors.reset}\n`);

  console.log(`${colors.dim}See CLAUDE.md "Hydration Safety" section for detailed patterns.${colors.reset}\n`);

  return false;
}

// Run validation
validateHydration()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error(`${colors.red}Validation error:${colors.reset}`, error);
    process.exit(1);
  });
