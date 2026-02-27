#!/bin/sh
# Image compliance pre-commit hook
# Installed by: pnpm setup-image-hooks
#
# When new source images are staged, automatically:
#   1. Runs the optimizer to generate responsive variants
#   2. Stages the optimized outputs
#   3. Runs the compliance audit

STAGED_SOURCES=$(git diff --cached --name-only | grep -E '\.(png|jpg|jpeg|gif|webp|avif)$' | grep -E '^public/(images|original-images)/' || true)

if [ -z "$STAGED_SOURCES" ]; then
  exit 0
fi

echo ""
echo "🖼️  New source images detected:"
echo "$STAGED_SOURCES" | sed 's/^/   /'
echo ""

# Skip on CI (optimizer already skips itself, but skip the hook check too)
if [ -n "$CI" ] || [ -n "$VERCEL" ]; then
  exit 0
fi

echo "⚙️  Running image optimizer..."
pnpm optimize-images:enhanced

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Image optimization failed. Commit blocked."
  echo "   Fix the errors above and try again."
  exit 1
fi

# Stage the generated optimized files
git add public/optimized/ 2>/dev/null || true

echo ""
echo "🔍 Running image compliance audit..."
pnpm audit-images

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Image compliance audit failed. Commit blocked."
  echo "   Run: pnpm audit-images  for details."
  exit 1
fi

echo ""
