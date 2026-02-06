#!/bin/bash
# Batch 7 of 7 - ZH Blog Post Re-translation
# Generated: 2026-02-06T22:49:23.740Z

# Prerequisites:
# 1. Set your Anthropic API key:
export ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY:-your_api_key_here}"

# 2. Ensure you're in the project root directory

# Posts in this batch:
# - best-cat-litter-deodorizers-2026 (78.6%)
# - cat-litter-odor-control-usa (80.3%)
# - house-smells-like-cat-litter-solutions (80.5%)
# - best-litter-box-location-odour-control (81.0%)
# - how-often-change-cat-litter (84.5%)

echo "Starting batch 7 of 7..."

export TRANSLATIONS_NEEDED='[{"slug":"best-cat-litter-deodorizers-2026","languages":["zh"]},{"slug":"cat-litter-odor-control-usa","languages":["zh"]},{"slug":"house-smells-like-cat-litter-solutions","languages":["zh"]},{"slug":"best-litter-box-location-odour-control","languages":["zh"]},{"slug":"how-often-change-cat-litter","languages":["zh"]}]'
node scripts/translate-blog-batch.mjs --force --verbose

echo "Batch 7 complete!"
