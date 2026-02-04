#!/bin/bash
# Optimize large images in public folder
# Converts PNGs >1MB to WebP with 80% quality

set -e

echo "🔍 Finding large images..."

# Find PNGs/JPGs larger than 1MB
LARGE_IMAGES=$(find public -type f \( -name "*.png" -o -name "*.jpg" \) -size +1M)

if [ -z "$LARGE_IMAGES" ]; then
  echo "✅ No large images found!"
  exit 0
fi

TOTAL_SIZE_BEFORE=$(du -sh public/ | cut -f1)
echo "📊 Public folder size before: $TOTAL_SIZE_BEFORE"
echo ""

# Count images
IMAGE_COUNT=$(echo "$LARGE_IMAGES" | wc -l)
echo "🖼️ Found $IMAGE_COUNT large images"
echo ""

# Check if sharp is available
if ! command -v npx &> /dev/null; then
  echo "❌ npx not found. Using pnpm..."
fi

# Optimize each image
for img in $LARGE_IMAGES; do
  BASENAME=$(basename "$img" | cut -d. -f1)
  DIRNAME=$(dirname "$img")
  WEBP_PATH="$DIRNAME/$BASENAME.webp"
  
  # Skip if webp already exists
  if [ -f "$WEBP_PATH" ]; then
    echo "⏭️  Skipping $img (webp exists)"
    continue
  fi
  
  echo "🔄 Converting: $img"
  
  # Convert to WebP using sharp
  npx sharp "$img" --webp --quality 80 --output "$WEBP_PATH" 2>/dev/null || echo "⚠️  Failed to convert $img"
done

echo ""
TOTAL_SIZE_AFTER=$(du -sh public/ | cut -f1)
echo "📊 Public folder size after: $TOTAL_SIZE_AFTER"
echo "✅ Done! Update your image references to use .webp"
