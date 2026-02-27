#!/bin/sh
# Image compliance pre-commit hook
# Installed by: pnpm setup-image-hooks
#
# When new source images are staged, automatically:
#   1. Runs the optimizer to generate responsive variants
#   2. Stages the optimized outputs
#   3. Runs the compliance audit

STAGED_SOURCES=$(git diff --cached --name-status --diff-filter=A \
  | awk '{print $2}' \
  | grep -E '\.(png|jpg|jpeg|gif|webp|avif)$' \
  | grep -E '^public/(images|original-images)/' || true)

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
OPTIMIZE_ONLY_SOURCES="$STAGED_SOURCES" pnpm optimize-images:enhanced

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Image optimization failed. Commit blocked."
  echo "   Fix the errors above and try again."
  exit 1
fi

# Stage only generated files for newly added sources.
# Do not blanket-stage public/optimized, to avoid unrelated churn.
echo "$STAGED_SOURCES" | while IFS= read -r src; do
  [ -n "$src" ] || continue

  rel="$src"
  rel="${rel#public/original-images/}"
  rel="${rel#public/images/}"

  dir=$(dirname "$rel")
  base=$(basename "$rel")
  stem="${base%.*}"
  sanitized_stem=$(printf "%s" "$stem" | tr ' ' '-')
  optimized_dir="public/optimized/$dir"

  if [ -d "$optimized_dir" ]; then
    git add "$optimized_dir/$sanitized_stem-"*.avif 2>/dev/null || true
    git add "$optimized_dir/$sanitized_stem-"*.webp 2>/dev/null || true
    git add "$optimized_dir/$sanitized_stem-"*.jpg 2>/dev/null || true
    git add "$optimized_dir/$sanitized_stem-"*.jpeg 2>/dev/null || true
    git add "$optimized_dir/$sanitized_stem."*.avif 2>/dev/null || true
    git add "$optimized_dir/$sanitized_stem."*.webp 2>/dev/null || true
    git add "$optimized_dir/$sanitized_stem."*.jpg 2>/dev/null || true
    git add "$optimized_dir/$sanitized_stem."*.jpeg 2>/dev/null || true
  fi
done

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
