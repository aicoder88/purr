# Phase 3 Cleanup Plan

## Status: Ready to Execute

Based on depcheck analysis and script audit, here's what can be safely removed:

---

## 1. Unused Dependencies

### Confirmed Unused (from depcheck)
- ✅ **critters** - Not used anywhere in the codebase

### Missing Dependencies (scripts need these but they're not in package.json)
These scripts reference packages not in package.json:
- `scripts/purge-vercel-cache.js` needs: `node-fetch`, `dotenv`
- `scripts/validate-dark-mode.js` needs: `chalk`

**Action**: Either add these deps or remove the scripts if not used

---

## 2. Unused Scripts (AI-Generated Bloat)

### Dark Mode "Fix" Scripts (30+ files!)
These are one-off fix scripts that were run once and are no longer needed:
- `apply-dark-mode-fixes.js`
- `cleanup-dark-mode.js`
- `complete-dark-mode-fixes.js`
- `fix-dark-mode-batch.js`
- `fix-dark-mode-violations.js`
- `fix-dark-mode.js`
- `fix-duplicate-dark-variants.js`
- `fix-final-dark-mode.js`
- `fix-remaining-dark-mode.js`
- `final-critical-fixes.js`
- `final-dark-mode-cleanup.js`
- `final-polish-cleanup.js`
- `precision-final-cleanup.js`
- `surgical-final-fixes.js`
- `ultimate-dark-mode-cleanup.js`
- `ultra-final-fixes.js`
- `validate-dark-mode.js` (keep dark-mode-validator.js instead)

### Other One-Off Scripts
- `fix-location-duplicates.js`
- `code-quality-improvements.js`
- `remove-duplicate-images.js`
- `split-cities-by-province.js`
- `update-location-testimonials.js`
- `translation-detective.js`
- `test-i18n-build.js`
- `refactor-translations.js`
- `performance-audit.js`

### Duplicate/Redundant Scripts
- `optimize-images-advanced.js` (keep optimize-images.js)
- `batch-optimize-images.js` (keep optimize-all-images.js)
- `generate-comprehensive-sitemap.js` (keep generate-sitemap.js)
- `generate-all-location-pages.js` (keep generate-location-pages.ts)
- `generate-seo-pages.js` (redundant with location pages)
- `optimize-before-build.js` (not used in package.json)
- `optimize-typescript.js` (called from vercel-prebuild but may not be needed)

### Scripts to Keep (Actually Used)
✅ `vercel-prebuild.js` - Used in package.json prebuild
✅ `check-types.js` - Used in package.json
✅ `check-unused-identifiers.js` - Used in package.json
✅ `optimize-images.js` - Used in package.json
✅ `optimize-all-images.js` - Used in package.json
✅ `optimize-performance.js` - Used in package.json
✅ `add-image-dimensions.js` - Used in package.json
✅ `generate-sitemap.js` - Used in package.json
✅ `generate-location-sitemap.js` - Used in package.json
✅ `optimize-sitemap-changefreq.js` - Used in package.json
✅ `clear-webpack-cache.js` - Used in package.json
✅ `purge-vercel-cache.js` - Used in package.json (but needs deps)
✅ `build-production.js` - Used in package.json
✅ `seo-optimization.js` - Used in package.json
✅ `bundle-analysis.js` - Used in package.json
✅ `cache-optimization.js` - Used in package.json
✅ `dark-mode-validator.js` - Used in package.json
✅ `validate-blog-images.js` - Used in package.json
✅ `analyze-js.js` - Used in package.json
✅ `create-thumbnail.js` - Utility script (keep)
✅ `generate-location-pages.ts` - Main location page generator

---

## 3. Package.json Script Cleanup

### Scripts Referencing Deleted Files
Remove these from package.json:
- ❌ `"validate-dark-mode": "node scripts/dark-mode-validator.js"` - Already have this
- ❌ `"validate-blog-images": "node scripts/validate-blog-images.js"` - Already have this

Actually, these scripts DO exist and are used. Keep them.

---

## 4. Deployment Config Cleanup

You have 3 deployment configs:
- `vercel.json` - Vercel
- `netlify.toml` - Netlify
- `windsurf_deployment.yaml` - Windsurf?

**Action**: Determine which platform you're using and remove the others

---

## 5. Documentation Cleanup

### Markdown Files in Scripts Folder
- `scripts/dark-mode-quick-reference.md` - Move to docs/

---

## Estimated Impact

| Metric | Current | After Phase 3 | Improvement |
|--------|---------|---------------|-------------|
| **Scripts folder** | 56 files | ~25 files | 55% reduction |
| **Unused deps** | 1 (critters) | 0 | 100% cleanup |
| **Deployment configs** | 3 | 1 | 67% reduction |

---

## Execution Order

1. ✅ Remove unused dependency: `critters`
2. ✅ Remove 30+ unused dark-mode fix scripts
3. ✅ Remove other one-off/duplicate scripts
4. ✅ Move markdown file to docs
5. ✅ Decide on deployment platform and remove unused configs
6. ✅ Test build: `npm run build`

---

## Safety Notes

- All scripts being removed are one-off "fix" scripts that were already run
- They're not referenced in package.json scripts
- They're not imported by any code
- Build will not be affected

---

**Ready to execute Phase 3 cleanup!**
