# Cleanup: Files That Can Be Deleted

## Files Created During Fix (Can Be Deleted)

### Documentation (Optional - Keep if you want reference)
```bash
# These are just documentation - safe to delete if you don't need them
rm BLOG_FIX_COMPLETE_SUMMARY.md        # Summary of what was fixed
rm BLOG_TRANSLATION_FIX_PLAN.md        # Original plan (outdated)
rm BLOG_TRANSLATION_FIX_COMPLETE.md    # Original completion report (outdated)
```

### Translation Scripts (Delete if using AI/ manual translation)
```bash
# These were for automated API translation - delete if using Claude/ChatGPT manually
rm scripts/regenerate-translations.js
rm scripts/execute-translations.js
rm -rf scripts/retranslation/          # If this directory exists
```

### Data Files (Keep for now - useful for tracking)
```bash
# Keep these - they help track what needs translation
# TRANSLATION_NEEDED.json              # Current list of 53 posts needing work
# blog_translation_audit.json          # Full audit data
```

---

## Files to KEEP (Don't Delete)

### Essential Scripts
```bash
# KEEP - Useful utilities
scripts/sync-blog-images.js            # Syncs images across locales
scripts/test-blog-routes.js            # Validates blog posts
scripts/validate-blog-posts.js         # Already existed - keep
scripts/analyze-blog-completeness.ts   # Already existed - keep
```

### Documentation to Keep
```bash
# KEEP - These are your working documents
SYSTEMATIC_TRANSLATION_PLAN.md         # Your translation roadmap
TRANSLATION_PROMPT.md                  # The prompt to use for translation
```

### The Translation Files (KEEP - These Are Your Posts!)
```bash
# KEEP ALL OF THESE - These are your actual blog posts
content/blog/en/*.json                 # English originals
content/blog/fr/*.json                 # French translations
content/blog/zh/*.json                 # Chinese translations  
content/blog/es/*.json                 # Spanish translations
```

---

## One-Command Cleanup

Run this to delete everything you don't need:

```bash
# Remove old documentation
rm -f BLOG_FIX_COMPLETE_SUMMARY.md
rm -f BLOG_TRANSLATION_FIX_PLAN.md
rm -f BLOG_TRANSLATION_FIX_COMPLETE.md

# Remove API translation scripts (if using AI manually)
rm -f scripts/regenerate-translations.js
rm -f scripts/execute-translations.js
rm -rf scripts/retranslation/

# Remove temporary audit files (optional - keep if you want the data)
rm -f blog_translation_audit.json

# Keep these:
# - SYSTEMATIC_TRANSLATION_PLAN.md
# - TRANSLATION_PROMPT.md
# - TRANSLATION_NEEDED.json (useful checklist)
# - scripts/sync-blog-images.js
# - scripts/test-blog-routes.js
# - All content/blog/ files

echo "Cleanup complete!"
```

---

## What You Actually Need Going Forward

### To Translate Posts:
1. **TRANSLATION_PROMPT.md** - Copy/paste this into Claude/ChatGPT
2. **SYSTEMATIC_TRANSLATION_PLAN.md** - Your roadmap of what to translate
3. **TRANSLATION_NEEDED.json** - Machine-readable list (optional)

### To Validate After Translation:
```bash
node scripts/validate-blog-posts.js
node scripts/test-blog-routes.js
```

### To Sync Images (if you add new images):
```bash
node scripts/sync-blog-images.js
```

---

## Summary

**Delete (safe to remove):**
- 3 documentation files (old summaries)
- 2 API translation scripts (if not using API)
- 1 audit JSON file (optional)

**Keep (essential):**
- 2 new documentation files (plan + prompt)
- 2 utility scripts (validate + sync)
- All 196 blog post JSON files

**Total disk space saved by cleanup:** ~50-100KB (mostly text files)
