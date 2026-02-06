#!/bin/bash
# Batch 4 of 7 - ZH Blog Post Re-translation
# Generated: 2026-02-06T22:49:23.740Z

# Prerequisites:
# 1. Set your Anthropic API key:
export ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY:-your_api_key_here}"

# 2. Ensure you're in the project root directory

# Posts in this batch:
# - how-to-eliminate-cat-litter-odor (65.3%)
# - activated-carbon-for-cat-litter-complete-guide (66.3%)
# - cat-litter-odor-myths (67.3%)
# - chemistry-of-cat-smell-industrial-fix (71.0%)
# - space-station-secret-fresh-home-cat-owners (71.1%)

echo "Starting batch 4 of 7..."

export TRANSLATIONS_NEEDED='[{"slug":"how-to-eliminate-cat-litter-odor","languages":["zh"]},{"slug":"activated-carbon-for-cat-litter-complete-guide","languages":["zh"]},{"slug":"cat-litter-odor-myths","languages":["zh"]},{"slug":"chemistry-of-cat-smell-industrial-fix","languages":["zh"]},{"slug":"space-station-secret-fresh-home-cat-owners","languages":["zh"]}]'
node scripts/translate-blog-batch.mjs --force --verbose

echo "Batch 4 complete!"
