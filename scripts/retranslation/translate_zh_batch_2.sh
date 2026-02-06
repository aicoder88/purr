#!/bin/bash
# Batch 2 of 7 - ZH Blog Post Re-translation
# Generated: 2026-02-06T22:49:23.740Z

# Prerequisites:
# 1. Set your Anthropic API key:
export ANTHROPIC_API_KEY="${ANTHROPIC_API_KEY:-your_api_key_here}"

# 2. Ensure you're in the project root directory

# Posts in this batch:
# - why-does-my-cats-litter-box-smell-so-bad (22.1%)
# - most-powerful-odor-absorber (28.4%)
# - activated-carbon-vs-baking-soda-comparison (31.8%)
# - using-deodorizers-with-kittens (40.1%)
# - litter-deodorizer-frequency-guide (41.9%)

echo "Starting batch 2 of 7..."

export TRANSLATIONS_NEEDED='[{"slug":"why-does-my-cats-litter-box-smell-so-bad","languages":["zh"]},{"slug":"most-powerful-odor-absorber","languages":["zh"]},{"slug":"activated-carbon-vs-baking-soda-comparison","languages":["zh"]},{"slug":"using-deodorizers-with-kittens","languages":["zh"]},{"slug":"litter-deodorizer-frequency-guide","languages":["zh"]}]'
node scripts/translate-blog-batch.mjs --force --verbose

echo "Batch 2 complete!"
