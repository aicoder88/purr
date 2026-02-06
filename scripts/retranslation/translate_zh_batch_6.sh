#!/bin/bash
# Batch 6 of 7 - ZH Blog Post Re-translation
# Generated: 2026-02-06T22:49:23.740Z

# Prerequisites:
# 1. Set your Anthropic API key:
export ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY:-your_api_key_here}"

# 2. Ensure you're in the project root directory

# Posts in this batch:
# - best-clumping-cat-litter-odor-control (77.4%)
# - best-natural-cat-litter-odor-control (77.9%)
# - best-cat-litter-multiple-cats (78.3%)
# - how-to-reduce-litter-box-odor (78.3%)
# - cat-litter-odour-control-tips (78.6%)

echo "Starting batch 6 of 7..."

export TRANSLATIONS_NEEDED='[{"slug":"best-clumping-cat-litter-odor-control","languages":["zh"]},{"slug":"best-natural-cat-litter-odor-control","languages":["zh"]},{"slug":"best-cat-litter-multiple-cats","languages":["zh"]},{"slug":"how-to-reduce-litter-box-odor","languages":["zh"]},{"slug":"cat-litter-odour-control-tips","languages":["zh"]}]'
node scripts/translate-blog-batch.mjs --force --verbose

echo "Batch 6 complete!"
