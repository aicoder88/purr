#!/bin/bash
# Batch 3 of 7 - ZH Blog Post Re-translation
# Generated: 2026-02-06T22:49:23.740Z

# Prerequisites:
# 1. Set your Anthropic API key:
export ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY:-your_api_key_here}"

# 2. Ensure you're in the project root directory

# Posts in this batch:
# - tried-every-litter-deodorizer-90-days-results (45.0%)
# - best-unscented-cat-litter-sensitive-cats (48.6%)
# - tried-everything-cat-litter-smell-solutions (48.8%)
# - activated-carbon-litter-additive-benefits (53.8%)
# - why-does-my-house-smell-like-cat-litter (58.9%)

echo "Starting batch 3 of 7..."

export TRANSLATIONS_NEEDED='[{"slug":"tried-every-litter-deodorizer-90-days-results","languages":["zh"]},{"slug":"best-unscented-cat-litter-sensitive-cats","languages":["zh"]},{"slug":"tried-everything-cat-litter-smell-solutions","languages":["zh"]},{"slug":"activated-carbon-litter-additive-benefits","languages":["zh"]},{"slug":"why-does-my-house-smell-like-cat-litter","languages":["zh"]}]'
node scripts/translate-blog-batch.mjs --force --verbose

echo "Batch 3 complete!"
