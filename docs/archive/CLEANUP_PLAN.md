# Codebase Cleanup Plan

## Issues Found

### 1. Documentation Bloat (51 MD files!)
- Multiple summary/report files cluttering root
- Duplicate documentation
- AI-generated reports that should be archived

### 2. Duplicate/Redundant Files
- `pages/privacy.tsx` and `pages/privacy-policy.tsx` (duplicate)
- `pages/tos.tsx` and `pages/terms.tsx` (duplicate)
- Deprecated file: `pages/learn/purrify-vs-arm-hammer.tsx.deprecated`
- Unused test files in root
- Multiple config files for same purpose

### 3. Unused Dependencies (from depcheck)
- Storybook components (entire `src/stories/` folder - 30+ files)
- Potentially unused: `critters`, `micro`, `next-auth` (if not used)
- `@next/bundle-analyzer` only used in dev

### 4. Bloated node_modules
- 992MB of dependencies
- Many Radix UI packages that might not all be used

### 5. Root Directory Clutter
- Test files: `retailers-simple-test.js`, `retailers-test.spec.ts`
- Report files: `cache-optimization-report.*`, `seo-report.json`, `translation-detective-report.*`
- Random files: `assistant_memory.txt`, `test_file.txt`, `node`, `purrify@0.1.0`
- Image: `alignment and overlap.png`
- Config files that could be consolidated

### 6. Unused/Demo Code
- `pages/demo/` folder
- `pages/invest.tsx` (investment page?)
- `pages/montreal.tsx` (single city page when you have dynamic routing)
- Potentially unused API routes

### 7. Over-engineered Components
- Multiple SEO components doing similar things
- Multiple optimizer utilities
- Duplicate image optimization components

## Cleanup Actions

### Phase 1: Documentation (Safe)
- Move all MD files to `docs/` folder
- Archive AI-generated reports
- Keep only README.md in root

### Phase 2: Remove Dead Code (Safe)
- Delete deprecated files
- Remove test files from root
- Clean up duplicate pages
- Remove demo folder

### Phase 3: Dependency Cleanup (Requires Testing)
- Remove Storybook if not used
- Audit and remove unused dependencies
- Consider removing unused Radix UI components

### Phase 4: Code Consolidation (Requires Refactoring)
- Merge duplicate SEO components
- Consolidate optimizer utilities
- Remove unused API routes

### Phase 5: Build Optimization
- Remove unused imports
- Tree-shake better
- Optimize bundle size
