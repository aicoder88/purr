#!/bin/bash

# SonarCloud Issues Fixer - Master Script
# ========================================
# This script runs all automated fixes for SonarCloud issues.
#
# Usage:
#   chmod +x scripts/fix-all-sonarcloud.sh
#   ./scripts/fix-all-sonarcloud.sh [--dry-run]
#
# Options:
#   --dry-run    Show what would be changed without making changes

set -e

DRY_RUN=""
if [[ "$1" == "--dry-run" ]]; then
  DRY_RUN="--dry-run"
  echo "🔍 DRY RUN MODE - No changes will be made"
  echo ""
fi

echo "╔════════════════════════════════════════════════════════════╗"
echo "║          SonarCloud Issues Fixer - Master Script           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Run the main fixer script
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Running automated code fixes..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
node scripts/fix-sonarcloud-issues.js $DRY_RUN
echo ""

# Step 2: Run ESLint with auto-fix (if not dry-run)
if [[ -z "$DRY_RUN" ]]; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Step 2: Running ESLint auto-fix..."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  # Run ESLint fix but don't fail on warnings
  npx eslint . --fix --max-warnings=9999 2>/dev/null || true
  echo "✅ ESLint auto-fix complete"
  echo ""
fi

# Step 3: Run JSX issues scanner
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 3: Scanning for JSX issues requiring manual review..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
node scripts/fix-jsx-issues.js $DRY_RUN
echo ""

# Step 4: Verify TypeScript (if not dry-run)
if [[ -z "$DRY_RUN" ]]; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Step 4: Verifying TypeScript types..."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  npm run check-types
  echo ""
fi

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    Fix Process Complete                     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📋 Next Steps:"
echo "   1. Review the changes with: git diff"
echo "   2. Run full lint check: npm run lint"
echo "   3. Run tests: npm run check-types"
echo "   4. Commit if everything looks good"
echo ""
echo "💡 Some issues require manual fixes:"
echo "   - JSX arrow functions (performance optimization)"
echo "   - React Hook dependencies (context-dependent)"
echo "   - Form label accessibility (needs semantic review)"
echo "   - Cognitive complexity (requires refactoring)"
echo ""
