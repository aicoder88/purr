# Instructions for Gemini (Data & Assets)

**Role**: Data Engineer & Asset Optimizer
**Focus**: Image processing, SEO audits, Visual regression, Batch scripts
**Why Gemini**: Excellent at batch operations, pattern matching, and handling large datasets

---

## 🚀 Concurrency

Gemini's tasks can run **in parallel** with Kimi's work because they touch different directories:

- **Gemini works on**: `public/`, `scripts/`, analysis tasks
- **Kimi works on**: `app/`, `src/`, `pages/`

**No conflicts** - run simultaneously.

---

## ⚡ Phase 3: Assets & Performance

### Session 3.2.1: Image Optimization Pipeline

**Requires**: None (can start immediately)
**Max files**: 50
**Estimated tool calls**: 80

**Goal**: Reduce `public/` folder size by 30%+ without breaking images.

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr
du -sh public/
find public -name "*.png" -o -name "*.jpg" | wc -l
```
Record current size.

**Steps**:

1. **Audit images**:
```bash
find public -type f \( -name "*.png" -o -name "*.jpg" \) -size +500k
```
List all images > 500KB.

2. **Create optimization script** at `scripts/optimize-images.ts`:
```typescript
import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

async function optimizeImages() {
  const images = await glob('public/**/*.{png,jpg,jpeg}');
  
  for (const imagePath of images) {
    const stats = fs.statSync(imagePath);
    if (stats.size < 100 * 1024) continue; // Skip small images
    
    const ext = path.extname(imagePath);
    const webpPath = imagePath.replace(ext, '.webp');
    
    await sharp(imagePath)
      .webp({ quality: 80 })
      .toFile(webpPath);
    
    console.log(`Converted: ${imagePath} → ${webpPath}`);
  }
}

optimizeImages();
```

3. **Run the script**:
```bash
cd /Users/macmini/dev/purr && pnpm tsx scripts/optimize-images.ts
```

4. **Update references** (if replacing originals):
   - Search for `.png` and `.jpg` references in `src/`, `content/`, `app/`
   - Update to `.webp` where converted

5. **Delete originals if safe**:
   - Only after verifying WebP versions render correctly
   - Keep originals in a backup first

**Verification**:
```bash
cd /Users/macmini/dev/purr
du -sh public/
pnpm run build
pnpm run dev &
sleep 5
# Open browser and check images render
```

**Exit criteria**:
- [ ] `public/` size reduced by >30%
- [ ] Build succeeds
- [ ] Images display correctly

**On success**:
```bash
git add -A && git commit -m "session 3.2.1: image optimization"
```

---

## 🧪 Phase 4: Testing & Validation

### Session 4.2.1: Visual Regression Testing

**Requires**: Kimi's Session 1.1.4 complete
**Max files**: 5
**Estimated tool calls**: 30

**Goal**: Ensure App Router pages look identical to original Pages Router versions.

**Steps**:

1. **Install Playwright if needed**:
```bash
cd /Users/macmini/dev/purr && pnpm add -D @playwright/test && npx playwright install
```

2. **Create visual test** at `e2e/visual-regression.spec.ts`:
```typescript
import { test, expect } from '@playwright/test';

const criticalPages = [
  { name: 'home', url: '/' },
  { name: 'about', url: '/about' },
  { name: 'science', url: '/science' },
  { name: 'contact', url: '/contact' },
  { name: 'blog', url: '/blog' },
  { name: 'blog-post', url: '/blog/best-cat-litter-deodorizers-2026' },
];

for (const page of criticalPages) {
  test(`visual: ${page.name}`, async ({ page: browserPage }) => {
    await browserPage.goto(page.url);
    await expect(browserPage).toHaveScreenshot(`${page.name}.png`, {
      fullPage: true,
      threshold: 0.1,
    });
  });
}
```

3. **Run tests**:
```bash
cd /Users/macmini/dev/purr && pnpm exec playwright test e2e/visual-regression.spec.ts
```

4. **First run creates baseline**, subsequent runs compare.

**Verification**:
```bash
pnpm exec playwright test --reporter=html
```
Open the HTML report to review any differences.

**Exit criteria**:
- [ ] All critical pages have baseline screenshots
- [ ] No major visual differences detected

**On success**:
```bash
git add -A && git commit -m "session 4.2.1: visual regression tests"
```

---

## 🔍 SEO Audit Sessions

### Session 1.1.7: Comprehensive SEO Audit

**Requires**: Kimi's Session 1.1.3 complete
**Max files**: 10 (scripts only)
**Estimated tool calls**: 40

**Goal**: Verify no SEO regression after App Router migration.

**Steps**:

1. **Check existing SEO scripts**:
```bash
ls scripts/seo/
```

2. **Run existing validation**:
```bash
cd /Users/macmini/dev/purr && pnpm run seo:validate
```
(If this command exists)

3. **Manual checks**:
   - Verify `sitemap.xml` has all URLs
   - Verify `robots.txt` is correct
   - Verify canonical tags on sample pages

4. **Create audit report** at `audit_results/seo_audit.md`:
```markdown
# SEO Audit Results

## Sitemap
- [ ] All blog posts present
- [ ] All product pages present
- [ ] No broken URLs

## Canonical Tags
- [ ] Homepage: [status]
- [ ] Blog index: [status]
- [ ] Sample blog post: [status]

## Structured Data
- [ ] JSON-LD on blog posts
- [ ] BreadcrumbList schema
- [ ] Organization schema

## Issues Found
- [List any issues]
```

**Verification**:
```bash
curl http://localhost:3000/sitemap.xml | head -50
```

**Exit criteria**:
- [ ] Sitemap has all expected URLs
- [ ] No 404s in sitemap
- [ ] JSON-LD present on blog posts

**On success**:
```bash
git add -A && git commit -m "session 1.1.7: seo audit passed"
```

---

## 📊 Data Analysis Sessions

### Session A.1: Blog Content Analysis

**Trigger**: Any time
**Purpose**: Analyze blog content for gaps

**Steps**:
1. Read all JSON files in `content/blog/en/`
2. Calculate word counts
3. Identify thin content (< 800 words)
4. Report for human review

**Output**: List of posts needing expansion

---

### Session A.2: Image Usage Analysis

**Trigger**: Before image optimization
**Purpose**: Find unused images

**Steps**:
1. List all images in `public/`
2. Search codebase for references to each
3. Identify unreferenced images
4. Report for human review before deletion

**Output**: List of potentially deletable images
