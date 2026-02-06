#!/bin/bash
# Batch 5 of 7 - ZH Blog Post Re-translation
# Generated: 2026-02-06T22:49:23.740Z

# Prerequisites:
# 1. Set your Anthropic API key:
export ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY:-your_api_key_here}"

# 2. Ensure you're in the project root directory

# Posts in this batch:
# - best-way-to-keep-litter-box-fresh (72.7%)
# - how-to-get-rid-of-cat-litter-smell-in-apartment (73.1%)
# - best-cat-litter-for-smell (75.6%)
# - best-unscented-cat-litters (76.3%)
# - best-self-cleaning-litter-box-odor-control (76.7%)

echo "Starting batch 5 of 7..."

export TRANSLATIONS_NEEDED='[{"slug":"best-way-to-keep-litter-box-fresh","languages":["zh"]},{"slug":"how-to-get-rid-of-cat-litter-smell-in-apartment","languages":["zh"]},{"slug":"best-cat-litter-for-smell","languages":["zh"]},{"slug":"best-unscented-cat-litters","languages":["zh"]},{"slug":"best-self-cleaning-litter-box-odor-control","languages":["zh"]}]'
node scripts/translate-blog-batch.mjs --force --verbose

echo "Batch 5 complete!"
