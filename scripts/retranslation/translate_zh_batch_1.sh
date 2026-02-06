#!/bin/bash
# Batch 1 of 7 - ZH Blog Post Re-translation
# Generated: 2026-02-06T22:49:23.738Z

# Prerequisites:
# 1. Set your Anthropic API key:
export ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY:-your_api_key_here}"

# 2. Ensure you're in the project root directory

# Posts in this batch:
# - baking-soda-vs-activated-carbon-cat-litter (MISSING)
# - fragrance-free-litter-deodorizer (MISSING)
# - how-to-get-rid-of-cat-pee-smell-apartment (MISSING)
# - safe-ways-to-deodorize-litter-box (MISSING)
# - powder-vs-spray-litter-deodorizer (20.6%)

echo "Starting batch 1 of 7..."

export TRANSLATIONS_NEEDED='[{"slug":"baking-soda-vs-activated-carbon-cat-litter","languages":["zh"]},{"slug":"fragrance-free-litter-deodorizer","languages":["zh"]},{"slug":"how-to-get-rid-of-cat-pee-smell-apartment","languages":["zh"]},{"slug":"safe-ways-to-deodorize-litter-box","languages":["zh"]},{"slug":"powder-vs-spray-litter-deodorizer","languages":["zh"]}]'
node scripts/translate-blog-batch.mjs --force --verbose

echo "Batch 1 complete!"
