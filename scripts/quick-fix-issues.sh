#!/bin/bash

# Quick Fix Script - Address Immediate Issues
# Fixes: ESLint errors, cron jobs, duplicate files, contact redirect

echo "🔧 Quick Fix Script - Starting..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track success/failure
FIXES_APPLIED=0
FIXES_FAILED=0

# Function to log success
log_success() {
    echo -e "${GREEN}✅ $1${NC}"
    ((FIXES_APPLIED++))
}

# Function to log error
log_error() {
    echo -e "${RED}❌ $1${NC}"
    ((FIXES_FAILED++))
}

# Function to log info
log_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

echo "=================================="
echo "Fix 1: ESLint Errors - Type 'any'"
echo "=================================="
echo ""

# Fix 1: security-csrf.spec.ts
if [ -f "e2e/security-csrf.spec.ts" ]; then
    log_info "Fixing e2e/security-csrf.spec.ts..."

    # Add Page import if not present
    if ! grep -q "import.*Page.*from '@playwright/test'" e2e/security-csrf.spec.ts; then
        # Add Page to the import
        sed -i.bak "s/import { test, expect } from '@playwright\/test';/import { test, expect, Page } from '@playwright\/test';/" e2e/security-csrf.spec.ts
    fi

    # Replace any with Page
    sed -i.bak "s/async function login(page: any)/async function login(page: Page)/" e2e/security-csrf.spec.ts

    # Remove unused context parameter
    sed -i.bak "s/}, async ({ page, context }) => {/}, async ({ page }) => {/" e2e/security-csrf.spec.ts

    rm -f e2e/security-csrf.spec.ts.bak
    log_success "Fixed e2e/security-csrf.spec.ts"
else
    log_error "e2e/security-csrf.spec.ts not found"
fi

# Fix 2: security-file-upload.spec.ts
if [ -f "e2e/security-file-upload.spec.ts" ]; then
    log_info "Fixing e2e/security-file-upload.spec.ts..."

    # Add Page import if not present
    if ! grep -q "import.*Page.*from '@playwright/test'" e2e/security-file-upload.spec.ts; then
        sed -i.bak "s/import { test, expect } from '@playwright\/test';/import { test, expect, Page } from '@playwright\/test';/" e2e/security-file-upload.spec.ts
    fi

    # Replace any with Page
    sed -i.bak "s/async function login(page: any)/async function login(page: Page)/" e2e/security-file-upload.spec.ts

    # Remove unused imports
    sed -i.bak "/^import \* as fs from 'fs';$/d" e2e/security-file-upload.spec.ts
    sed -i.bak "/^import \* as path from 'path';$/d" e2e/security-file-upload.spec.ts

    rm -f e2e/security-file-upload.spec.ts.bak
    log_success "Fixed e2e/security-file-upload.spec.ts"
else
    log_error "e2e/security-file-upload.spec.ts not found"
fi

# Fix 3: security-xss.spec.ts (if it has content)
if [ -f "e2e/security-xss.spec.ts" ] && [ -s "e2e/security-xss.spec.ts" ]; then
    log_info "Fixing e2e/security-xss.spec.ts..."

    # Add Page import if not present
    if ! grep -q "import.*Page.*from '@playwright/test'" e2e/security-xss.spec.ts; then
        sed -i.bak "s/import { test, expect } from '@playwright\/test';/import { test, expect, Page } from '@playwright\/test';/" e2e/security-xss.spec.ts
    fi

    # Replace any with Page
    sed -i.bak "s/async function login(page: any)/async function login(page: Page)/" e2e/security-xss.spec.ts

    rm -f e2e/security-xss.spec.ts.bak
    log_success "Fixed e2e/security-xss.spec.ts"
elif [ -f "e2e/security-xss.spec.ts" ]; then
    log_info "e2e/security-xss.spec.ts is empty, skipping..."
fi

# Fix 4: security-authentication.spec.ts (unused variable)
if [ -f "e2e/security-authentication.spec.ts" ]; then
    log_info "Fixing e2e/security-authentication.spec.ts..."

    # Remove unused variable or use it
    sed -i.bak "s/const response = await/await/" e2e/security-authentication.spec.ts

    rm -f e2e/security-authentication.spec.ts.bak
    log_success "Fixed e2e/security-authentication.spec.ts"
fi

# Fix 5: security-rate-limiting.spec.ts (unused variable)
if [ -f "e2e/security-rate-limiting.spec.ts" ]; then
    log_info "Fixing e2e/security-rate-limiting.spec.ts..."

    # Find and fix the has429 variable usage
    if grep -q "const has429 = results.some" e2e/security-rate-limiting.spec.ts; then
        # Add expect statement after the has429 assignment
        sed -i.bak "/const has429 = results.some/a\\
    expect(has429 || results.every(s => s === 401)).toBe(true);" e2e/security-rate-limiting.spec.ts
    fi

    rm -f e2e/security-rate-limiting.spec.ts.bak
    log_success "Fixed e2e/security-rate-limiting.spec.ts"
fi

# Fix 6: our-story.tsx (unused variable)
if [ -f "pages/about/our-story.tsx" ]; then
    log_info "Fixing pages/about/our-story.tsx..."

    # Comment out unused milestones variable or prefix with underscore
    sed -i.bak "s/const milestones =/const _milestones =/" pages/about/our-story.tsx

    rm -f pages/about/our-story.tsx.bak
    log_success "Fixed pages/about/our-story.tsx"
fi

echo ""
echo "=================================="
echo "Fix 2: Vercel Cron Jobs"
echo "=================================="
echo ""

# Backup vercel.json
if [ -f "vercel.json" ]; then
    cp vercel.json vercel.json.backup
    log_info "Created backup: vercel.json.backup"

    # Comment out crons section
    log_info "Disabling cron jobs in vercel.json..."

    # Use a more robust approach - create new file without crons
    node -e "
    const fs = require('fs');
    const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

    // Remove crons section
    delete config.crons;

    // Write back with formatting
    fs.writeFileSync('vercel.json', JSON.stringify(config, null, 2) + '\n');
    "

    log_success "Disabled cron jobs in vercel.json"
    log_info "Backup saved as vercel.json.backup"
else
    log_error "vercel.json not found"
fi

echo ""
echo "=================================="
echo "Fix 3: Duplicate Image Files"
echo "=================================="
echo ""

# Remove files with spaces in names
FILES_WITH_SPACES=(
    "public/optimized/woofmiao logo.avif"
    "public/optimized/woofmiao logo.png"
    "public/optimized/woofmiao logo.webp"
    "public/original-images/woofmiao logo.png"
    "public/woofmiao logo.png"
)

for file in "${FILES_WITH_SPACES[@]}"; do
    if [ -f "$file" ]; then
        rm -f "$file"
        log_success "Removed: $file"
    fi
done

echo ""
echo "=================================="
echo "Fix 4: Contact Page Redirect"
echo "=================================="
echo ""

# Convert support/contact to redirect
if [ -f "pages/support/contact.tsx" ]; then
    log_info "Converting pages/support/contact.tsx to redirect..."

    cat > pages/support/contact.tsx << 'EOF'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

/**
 * Redirect page for /support/contact -> /contact
 * Maintains old URL for SEO and existing links
 */
export default function SupportContactRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/contact');
  }, [router]);

  return (
    <Head>
      <meta httpEquiv="refresh" content="0; url=/contact" />
      <link rel="canonical" href="/contact" />
    </Head>
  );
}
EOF

    log_success "Converted pages/support/contact.tsx to redirect"
else
    log_error "pages/support/contact.tsx not found"
fi

echo ""
echo "=================================="
echo "Summary"
echo "=================================="
echo ""

echo -e "${GREEN}✅ Fixes Applied: $FIXES_APPLIED${NC}"
echo -e "${RED}❌ Fixes Failed: $FIXES_FAILED${NC}"
echo ""

if [ $FIXES_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All fixes applied successfully!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm run lint"
    echo "2. Run: npm run check-types"
    echo "3. Run: git diff (review changes)"
    echo "4. Run: git add . && git commit -m 'fix: address eslint errors, cron jobs, and file organization'"
    echo "5. Deploy to Vercel"
else
    echo -e "${YELLOW}⚠️  Some fixes failed. Please review the errors above.${NC}"
fi

echo ""
echo "Files modified:"
echo "- e2e/security-*.spec.ts (ESLint fixes)"
echo "- pages/about/our-story.tsx (unused variable)"
echo "- vercel.json (cron jobs disabled)"
echo "- pages/support/contact.tsx (redirect)"
echo "- Removed duplicate image files with spaces"
echo ""
