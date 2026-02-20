# Phase 2 Migration Helpers

This directory contains utility scripts for Phase 2 reference rewriting during the image migration process.

## Scripts

### 1. rewrite-references.js

Rewrites all image references in the codebase based on `reference-manifest.json`.

**Features:**
- Reads reference-manifest.json
- Groups references by file for efficient processing
- Uses context-aware string replacement
- Handles .ts, .tsx, .js, .jsx, and .json files
- Preserves formatting and comments

**Usage:**
```bash
# Dry run to preview changes
node scripts/migration-helpers/rewrite-references.js --dry-run --verbose

# Live execution
node scripts/migration-helpers/rewrite-references.js

# With custom manifest
node scripts/migration-helpers/rewrite-references.js --manifest=custom-manifest.json
```

### 2. update-blog-json.js

Updates blog content JSON files with categorized image paths.

**Features:**
- Finds all `/images/` references in content/blog/**/*.json
- Parses JSON, traverses structure, updates image paths
- Uses parse/transform/serialize (not raw regex)
- Preserves JSON formatting
- Auto-categorizes images based on filename patterns

**Usage:**
```bash
# Dry run
node scripts/migration-helpers/update-blog-json.js --dry-run --verbose

# With custom path mappings
node scripts/migration-helpers/update-blog-json.js --mapping=path-mappings.json
```

**Path Mappings Format (path-mappings.json):**
```json
[
  { "from": "/images/old-path.webp", "to": "/optimized/category/new-path.webp" }
]
```

### 3. regenerate-artifacts.js

Regenerates dependent artifacts after file moves.

**Features:**
- Runs blog-featured-image-map.ts generator
- Updates page-images.ts if needed
- Regenerates image-dimensions.json
- Generates summary report

**Usage:**
```bash
# Full regeneration
node scripts/migration-helpers/regenerate-artifacts.js

# Skip heavy image operations
node scripts/migration-helpers/regenerate-artifacts.js --quick

# Skip image dimensions entirely
node scripts/migration-helpers/regenerate-artifacts.js --skip-images
```

### 4. validate-migration.js

Validation script to verify migration success.

**Features:**
- Verifies all categorized files exist
- Verifies no broken references remain
- Checks for orphaned files
- Finds uncategorized paths
- Generates detailed validation report

**Usage:**
```bash
# Standard validation
node scripts/migration-helpers/validate-migration.js

# Verbose output
node scripts/migration-helpers/validate-migration.js --verbose

# With custom manifest
node scripts/migration-helpers/validate-migration.js --manifest=custom-manifest.json
```

## Master Orchestration

Run all scripts in sequence:

```bash
node scripts/migration-helpers/run-all.js
```

Or run manually in order:

```bash
# Step 1: Rewrite references (dry run first)
node scripts/migration-helpers/rewrite-references.js --dry-run --verbose
node scripts/migration-helpers/rewrite-references.js

# Step 2: Update blog JSON files
node scripts/migration-helpers/update-blog-json.js --dry-run
node scripts/migration-helpers/update-blog-json.js

# Step 3: Regenerate artifacts
node scripts/migration-helpers/regenerate-artifacts.js

# Step 4: Validate
node scripts/migration-helpers/validate-migration.js --verbose
```

## Output Files

These scripts generate the following report files:

- `migration-artifacts-report.json` - Artifacts regeneration results
- `migration-validation-report.json` - Detailed validation results

## Exit Codes

All scripts follow standard exit codes:
- `0` - Success / No issues found
- `1` - Errors occurred / Issues found (for validation)

## Notes

- All scripts support `--dry-run` for safe preview of changes
- Use `--verbose` for detailed output during processing
- Scripts preserve file formatting and comments where possible
- JSON files are parsed and serialized to ensure valid output
