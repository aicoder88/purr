#!/bin/bash

# Comprehensive i18n validation script
# This script checks for hardcoded text strings in homepage components

echo "🔍 Validating i18n compliance for homepage components..."
echo "=================================================="

# Define the files to check
FILES=(
  "pages/index.tsx"
  "src/components/sections/hero.tsx"
  "src/components/sections/about.tsx"
  "src/components/sections/how-it-works.tsx"
  "src/components/sections/why-purrify.tsx"
  "src/components/sections/products.tsx"
  "src/components/sections/enhanced-product-comparison.tsx"
  "src/components/sections/subscription-offer.tsx"
  "src/components/sections/urgency-banner.tsx"
  "src/components/sections/stores.tsx"
  "src/components/sections/testimonials.tsx"
  "src/components/sections/faq.tsx"
  "src/components/sections/newsletter.tsx"
  "src/components/sections/cta.tsx"
  "src/components/sections/contact.tsx"
  "src/components/sections/blog-preview.tsx"
  "src/components/social-proof/TrustBadges.tsx"
)

# Counter for issues found
issues_found=0

echo "Checking for potential hardcoded text patterns..."

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Checking $file..."
        
        # Check for JSX content with capital letters (potential hardcoded text)
        hardcoded_jsx=$(grep -n '>.*[A-Z].*[a-z].*<' "$file" | grep -v 'Link href\|import\|export\|console\|className\|href=' | head -5)
        
        if [ ! -z "$hardcoded_jsx" ]; then
            echo "  ⚠️  Potential hardcoded JSX text found:"
            echo "$hardcoded_jsx" | sed 's/^/    /'
            ((issues_found++))
        fi
        
        # Check for quoted strings that look like user-facing text
        hardcoded_quotes=$(grep -n '"[A-Z][^"]*[a-z][^"]*"' "$file" | grep -v 'className\|import\|export\|console\|path\|d=\|@type\|itemProp\|content=' | head -5)
        
        if [ ! -z "$hardcoded_quotes" ]; then
            echo "  ⚠️  Potential hardcoded quoted text found:"
            echo "$hardcoded_quotes" | sed 's/^/    /'
            ((issues_found++))
        fi
        
        # Check for aria-label or alt text that might be hardcoded
        accessibility_text=$(grep -n 'aria-label="\|alt="[A-Z]' "$file" | grep -v '{t\.' | head -3)
        
        if [ ! -z "$accessibility_text" ]; then
            echo "  ⚠️  Potential hardcoded accessibility text found:"
            echo "$accessibility_text" | sed 's/^/    /'
            ((issues_found++))
        fi
        
    else
        echo "  ❌ File not found: $file"
    fi
done

echo ""
echo "=================================================="

if [ $issues_found -eq 0 ]; then
    echo "✅ SUCCESS: No obvious hardcoded text found!"
    echo "🎉 All homepage components appear to be properly internationalized."
else
    echo "⚠️  REVIEW NEEDED: Found $issues_found potential issues."
    echo "Please review the flagged content to ensure it's properly internationalized."
fi

echo ""
echo "Final validation recommendations:"
echo "1. Test the homepage in all supported languages (en, fr, zh)"
echo "2. Check that all user-visible text displays correctly"
echo "3. Verify accessibility attributes are translated"
echo "4. Ensure no hardcoded text remains in production"