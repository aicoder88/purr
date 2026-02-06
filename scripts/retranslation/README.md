# ZH Blog Post Re-translation Scripts

## Quick Start

```bash
# 1. Set your Anthropic API key
export ANTHROPIC_API_KEY=your_api_key_here

# 2. Run all batches
bash scripts/retranslation/translate_zh_master.sh

# 3. Validate results
node scripts/translate-blog-batch.mjs --validate-only --verbose
```

## Files

- `SUMMARY.md` - Detailed analysis of all posts needing re-translation
- `translate_zh_master.sh` - Master script to run all 7 batches
- `translate_zh_batch_1.sh` through `translate_zh_batch_7.sh` - Individual batch scripts

## Batch Breakdown

| Batch | Posts | Description |
|-------|-------|-------------|
| 1 | 5 | 4 missing + 1 severely truncated |
| 2 | 5 | Severely truncated posts |
| 3 | 5 | Severely to moderately truncated |
| 4 | 5 | Moderately truncated |
| 5 | 5 | Moderately truncated |
| 6 | 5 | Moderately truncated + corrupted |
| 7 | 5 | Corrupted/inflated posts |

## Testing a Single Post

To test the translation on a single post before running all batches:

```bash
export ANTHROPIC_API_KEY=your_api_key_here
export TRANSLATIONS_NEEDED='[{"slug":"powder-vs-spray-litter-deodorizer","languages":["zh"]}]'
node scripts/translate-blog-batch.mjs --force --verbose
```

## Monitoring Progress

The script outputs progress in real-time:
- `✓` = Success
- `⚠️` = Warning (retrying)
- `✗` = Failed

## Troubleshooting

### If a batch fails:
1. Check the error message
2. Re-run just that batch: `bash scripts/retranslation/translate_zh_batch_N.sh`
3. If individual posts fail, run them separately with `--force`

### If rate limited:
The script has built-in 2-second delays. If you hit rate limits, wait a few minutes and retry.

### If content still truncated after retry:
The script will automatically retry with higher token limits (24k instead of 16k). If still failing, you may need to manually translate that post.

## Success Criteria

After re-translation, each post should have:
- Content length >= 90% of EN version
- Image URLs matching EN version exactly
- No double-escaped HTML entities (`\"` → `"`)
- Proper locale (`zh`)
- Correct author name (`Purrify团队`)
