#!/bin/bash
# Master script to run all ZH blog post re-translations
# Total posts to re-translate: 35
# Total batches: 7

set -e  # Exit on error

# Check for API key
if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "ERROR: ANTHROPIC_API_KEY environment variable is not set"
  echo "Please set it with: export ANTHROPIC_API_KEY=your_api_key_here"
  exit 1
fi

echo "=============================================="
echo "ZH Blog Post Re-translation"
echo "=============================================="
echo "Total posts: 35"
echo "Batches: 7"
echo ""

# Run each batch
for i in {1..7}; do
  echo ""
  echo ">>> Running batch $i of 7..."
  bash "$(dirname $0)/translate_zh_batch_$i.sh"
  
  if [ $i -lt 7 ]; then
    echo "Waiting 10 seconds before next batch..."
    sleep 10
  fi
done

echo ""
echo "=============================================="
echo "All batches complete!"
echo "=============================================="

# Run validation
echo ""
echo "Running validation..."
node scripts/translate-blog-batch.mjs --validate-only --verbose
