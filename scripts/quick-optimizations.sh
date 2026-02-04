#!/bin/bash
# Quick optimizations for purr project
# Run this to apply high-impact optimizations

set -e

echo "🚀 Purr Optimization Script"
echo "==========================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. Check for unoptimized images
echo -e "${YELLOW}1. Checking for large images...${NC}"
LARGE_IMAGES=$(find public -type f \( -name "*.png" -o -name "*.jpg" \) -size +1M | wc -l)
echo "   Found $LARGE_IMAGES images >1MB"
if [ $LARGE_IMAGES -gt 0 ]; then
  echo -e "   ${BLUE}Run: pnpm optimize-images:enhanced${NC}"
fi
echo ""

# 2. Check dynamic imports
echo -e "${YELLOW}2. Checking dynamic imports...${NC}"
DYNAMIC_COUNT=$(grep -r "dynamic(import" app --include="*.tsx" | wc -l)
echo "   Current dynamic imports: $DYNAMIC_COUNT"
if [ $DYNAMIC_COUNT -lt 20 ]; then
  echo -e "   ${BLUE}Consider adding more dynamic imports for heavy components${NC}"
fi
echo ""

# 3. Check API route caching
echo -e "${YELLOW}3. Checking API route caching...${NC}"
API_ROUTES=$(find app/api -name "route.ts" 2>/dev/null | wc -l)
CACHED_ROUTES=$(grep -r "export const revalidate" app/api --include="*.ts" 2>/dev/null | wc -l)
echo "   API routes: $API_ROUTES"
echo "   With caching: $CACHED_ROUTES"
if [ $CACHED_ROUTES -lt $((API_ROUTES / 2)) ]; then
  echo -e "   ${BLUE}Add revalidate to more API routes${NC}"
fi
echo ""

# 4. Check for console logs in production
echo -e "${YELLOW}4. Checking for console.log statements...${NC}"
CONSOLE_LOGS=$(grep -r "console.log" app --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l)
echo "   Found $CONSOLE_LOGS console.log statements"
if [ $CONSOLE_LOGS -gt 10 ]; then
  echo -e "   ${BLUE}Remove console.logs for cleaner production builds${NC}"
fi
echo ""

# 5. Check image component usage
echo -e "${YELLOW}5. Checking Image component usage...${NC}"
NEXT_IMAGES=$(grep -r "from 'next/image'" app --include="*.tsx" | wc -l)
PLAIN_IMGS=$(grep -r "<img" app --include="*.tsx" | wc -l)
echo "   next/image usage: $NEXT_IMAGES"
echo "   Plain <img> tags: $PLAIN_IMGS"
if [ $PLAIN_IMGS -gt 0 ]; then
  echo -e "   ${BLUE}Convert plain <img> to next/Image for optimization${NC}"
fi
echo ""

# 6. Check for unused imports
echo -e "${YELLOW}6. Checking for potential unused dependencies...${NC}"
echo "   Run pnpm depcheck for detailed analysis"
echo ""

echo -e "${GREEN}✅ Quick check complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Run: pnpm analyze (to see bundle size)"
echo "  2. Run: pnpm optimize-images:enhanced"
echo "  3. Review API routes for caching opportunities"
echo "  4. Check Vercel Dashboard for usage metrics"
