# Instructions for Kimi K2.5 (Lead Architect)

**Role**: Lead Architect & Primary Executor
**Focus**: App Router Migration, Backend Infrastructure, Security, TypeScript, Heavy Refactoring
**Why Kimi**: Highest-ranked for complex reasoning, best rate limits for sustained work

---

## 🚀 How to Execute These Instructions

When the human pastes this file into your chat, execute sessions **in order**. After each session:
1. Run the verification command
2. If it passes: Say "Session X.Y.Z complete. Ready for next session."
3. If it fails: Report the error and attempt to fix it

**Git discipline**: After EVERY successful session, run:
```bash
git add -A && git commit -m "session X.Y.Z: [description]"
```

---

## 📅 Phase 1: Foundation (App Router & Infrastructure)

### Session 1.1.1: Create App Router Skeleton ⚠️ CRITICAL PREREQUISITE

**Requires**: None
**Max files**: 8
**Estimated tool calls**: 25

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && pnpm run build 2>&1 | head -20
```
Record the current state (pass or fail).

**Steps**:
1. Create `app/layout.tsx`:
   - Import global CSS
   - Wrap children with any providers from `_app.tsx`
   - Export metadata object for default SEO

2. Create `app/loading.tsx`:
   - Simple loading spinner matching brand colors

3. Create `app/error.tsx`:
   - Must have `'use client'` directive
   - Display error message with retry button

4. Create `app/not-found.tsx`:
   - Match existing 404 page design

5. Create `app/globals.css`:
   - Import from `src/styles/globals.css` or equivalent

6. Update `next.config.js`:
   - Ensure `appDir` is NOT explicitly disabled
   - Next.js 16+ enables App Router by default

**Verification**:
```bash
cd /Users/macmini/dev/purr && ls -la app/ && pnpm run build 2>&1 | grep -E "(error|success|compiled)"
```

**Exit criteria**:
- [ ] `app/layout.tsx` exists and exports default function
- [ ] `app/loading.tsx` exists
- [ ] `app/error.tsx` exists with 'use client' directive  
- [ ] `pnpm run build` succeeds

**On failure**: 
```bash
git checkout .
```
Report error to human.

**On success**:
```bash
git add -A && git commit -m "session 1.1.1: create app router skeleton"
```
Say: "Session 1.1.1 complete. Ready for next session."

---

### Session 1.1.2: Migrate Static Marketing Pages

**Requires**: 1.1.1
**Max files**: 6
**Estimated tool calls**: 40

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && ls pages/about/our-story.tsx pages/science.tsx pages/contact.tsx
```
All three files should exist.

**Steps**:
1. Read `pages/about/our-story.tsx`, analyze its structure
2. Create `app/about/page.tsx`:
   - Convert to Server Component (remove useState, useEffect where possible)
   - Export `metadata` object for SEO
   - Keep layout consistent

3. Create `app/about/layout.tsx` (optional, for about section wrapper)

4. Read `pages/science.tsx`, create `app/science/page.tsx`:
   - Server Component
   - Export metadata

5. Read `pages/contact.tsx`, create `app/contact/page.tsx`:
   - If it has a form with useState, extract to `app/contact/_components/ContactForm.tsx` with `'use client'`
   - Main page stays Server Component

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build 2>&1 | tail -10
```

**Exit criteria**:
- [ ] `app/about/page.tsx` exports metadata object
- [ ] `app/science/page.tsx` is a Server Component
- [ ] `app/contact/page.tsx` exists
- [ ] Build succeeds

**On success**:
```bash
git add -A && git commit -m "session 1.1.2: migrate static marketing pages"
```

---

### Session 1.1.3: Migrate Blog Index and Dynamic Route

**Requires**: 1.1.2
**Max files**: 10
**Estimated tool calls**: 50

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && ls pages/blog/index.tsx pages/blog/\[slug\].tsx content/blog/en/*.json | wc -l
```
Should return ~34 (32 JSON + 2 TSX).

**Steps**:
1. Read `pages/blog/index.tsx` and `pages/blog/[slug].tsx`

2. Create `app/blog/page.tsx`:
   - Server Component
   - Fetch blog list from `src/data/blog-posts.ts` or read JSON directly
   - Export metadata

3. Create `app/blog/[slug]/page.tsx`:
   - Implement `generateStaticParams()` that returns all 32 slugs
   - Implement `generateMetadata()` for per-post SEO
   - Read content from `content/blog/en/[slug].json`
   - **IMPORTANT**: Keep JSON content as-is, do NOT convert to TSX

4. Create `app/blog/[slug]/loading.tsx` (skeleton loader)

5. Create `app/blog/layout.tsx` (optional blog wrapper)

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build 2>&1 | grep "blog"
```

**Exit criteria**:
- [ ] `app/blog/page.tsx` lists all blog posts
- [ ] `app/blog/[slug]/page.tsx` renders JSON content
- [ ] `generateStaticParams()` returns all 32 slugs
- [ ] `generateMetadata()` returns title, description, openGraph
- [ ] Build succeeds

**On success**:
```bash
git add -A && git commit -m "session 1.1.3: migrate blog to app router"
```

---

### Session 1.1.4a: Migrate Custom TSX Blog Posts (Batch 1)

**Requires**: 1.1.3
**Max files**: 15
**Estimated tool calls**: 60

**Target files** (first 14):
```
pages/blog/activated-carbon-litter-additive-benefits.tsx
pages/blog/activated-carbon-vs-baking-soda-comparison.tsx
pages/blog/activated-carbon-vs-zeolite-cat-litter.tsx
pages/blog/activated-carbon-vs-zeolite.tsx
pages/blog/best-litter-odor-remover-small-apartments.tsx
pages/blog/best-odor-control-litter-2026.tsx
pages/blog/cat-litter-additive-comparison-2026.tsx
pages/blog/cat-litter-odor-myths.tsx
pages/blog/cat-litter-smell-wont-go-away.tsx
pages/blog/cat-litter-smell-worse-summer.tsx
pages/blog/cat-litter-smell-worse-winter.tsx
pages/blog/embarrassed-guests-visit-cat-litter-smell.tsx
pages/blog/fresh-step-vs-arm-hammer-comparison.tsx
pages/blog/house-smells-like-cat-litter-solutions.tsx
```

**Steps**:
For each file:
1. Read the file to understand its structure
2. Create corresponding `app/blog/[post-name]/page.tsx`
3. Convert to Server Component if possible
4. Extract interactive parts (forms, carousels) to client components
5. Add `export const metadata = {...}` or `generateMetadata()`

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build 2>&1 | grep -E "(error|warn)" | head -20
```

**Exit criteria**:
- [ ] All 14 posts build successfully
- [ ] Each has metadata export

**On success**:
```bash
git add -A && git commit -m "session 1.1.4a: migrate custom blog posts batch 1"
```

---

### Session 1.1.4b: Migrate Custom TSX Blog Posts (Batch 2)

**Requires**: 1.1.4a
**Max files**: 15
**Estimated tool calls**: 60

**Target files** (remaining 14):
```
pages/blog/how-to-use-cat-litter-deodorizer.tsx
pages/blog/litter-box-smell-making-sick.tsx
pages/blog/most-powerful-odor-absorber.tsx
pages/blog/multi-cat-litter-deodorizer-guide.tsx
pages/blog/powder-vs-spray-litter-deodorizer.tsx
pages/blog/renters-cat-odor-solutions.tsx
pages/blog/strong-cat-urine-smell-litter-box.tsx
pages/blog/summer-litter-box-survival-guide.tsx
pages/blog/tried-every-litter-deodorizer-90-days-results.tsx
pages/blog/tried-everything-cat-litter-smell-solutions.tsx
pages/blog/using-deodorizers-with-kittens.tsx
pages/blog/why-house-smells-like-cat.tsx
```

Same process as 1.1.4a.

**On success**:
```bash
git add -A && git commit -m "session 1.1.4b: migrate custom blog posts batch 2"
```

---

### Session 1.1.5: Migrate API Routes to Route Handlers

**Requires**: 1.1.1
**Max files**: 20
**Estimated tool calls**: 80

**Priority API routes to migrate**:
```
pages/api/contact.ts → app/api/contact/route.ts
pages/api/contact-b2b.ts → app/api/contact-b2b/route.ts
pages/api/subscribe.ts → app/api/subscribe/route.ts
pages/api/create-checkout-session.ts → app/api/checkout/route.ts
pages/api/webhooks/ → app/api/webhooks/*/route.ts
```

**Steps**:
1. For each API route:
   - Read the original file
   - Create new Route Handler using `NextRequest`/`NextResponse`
   - Convert `req.body` to `await request.json()`
   - Convert `res.status().json()` to `NextResponse.json()`
   - Preserve all validation logic

2. Update any imports that referenced the old paths

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build && pnpm run dev &
sleep 5
curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"test": true}'
kill %1
```

**Exit criteria**:
- [ ] All migrated API routes respond (even if validation error)
- [ ] Build succeeds

**On success**:
```bash
git add -A && git commit -m "session 1.1.5: migrate api routes"
```

---

### Session 1.1.6: Fix i18n for App Router

**Requires**: 1.1.2
**Max files**: 12
**Estimated tool calls**: 45

**Steps**:
1. Check current i18n setup:
```bash
grep -r "next-intl\|useTranslation\|i18n" src/ | head -10
```

2. If using `next-intl`:
   - Create `app/[locale]/layout.tsx`
   - Move pages under `[locale]` folder structure
   - Update middleware for locale detection

3. If using custom solution:
   - Adapt to App Router patterns
   - Ensure translations work in Server Components

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build && curl http://localhost:3000/en/about | head -20
```

**Exit criteria**:
- [ ] English pages render
- [ ] French pages render (if supported)
- [ ] Build succeeds

**On success**:
```bash
git add -A && git commit -m "session 1.1.6: i18n for app router"
```

---

### Session 1.2.1: Database Connection Pooling

**Requires**: None (can run parallel to 1.1.x)
**Max files**: 4
**Estimated tool calls**: 20

**Steps**:
1. Read `prisma/schema.prisma`
2. Add to generator block:
```prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}
```

3. Check if using Neon, Supabase, or standard Postgres
4. Install appropriate pooling package:
   - Neon: `pnpm add @neondatabase/serverless`
   - Standard: `pnpm add pg-pool`

5. Update `src/lib/prisma.ts` or `src/lib/db.ts` to use pooled connection

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm prisma generate && pnpm run build
```

**Exit criteria**:
- [ ] Prisma client generates successfully
- [ ] Build succeeds

**On success**:
```bash
git add -A && git commit -m "session 1.2.1: database connection pooling"
```

---

### Session 1.3.1: Enable TypeScript Strict Mode

**Requires**: 1.1.x complete
**Max files**: 50
**Estimated tool calls**: 100

**Steps**:
1. Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

2. Run initial check:
```bash
pnpm tsc --noEmit 2>&1 | head -50
```

3. Fix errors in priority order:
   - `src/lib/*` first (utilities, core logic)
   - `src/components/*` second (UI components)  
   - `app/*` or `pages/*` last (routes)

4. Common fixes:
   - Add explicit types to function parameters
   - Handle null/undefined cases
   - Add return types to functions

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm tsc --noEmit 2>&1 | tail -10
```

**Exit criteria**:
- [ ] `pnpm tsc --noEmit` exits with code 0
- [ ] Build succeeds

**If >100 errors**: Document count and ask human for guidance.

**On success**:
```bash
git add -A && git commit -m "session 1.3.1: typescript strict mode"
```

---

## 🔒 Phase 2: Security Hardening

### Session 2.1.1: Implement Field-Level Encryption

**Requires**: 1.2.1
**Max files**: 8
**Estimated tool calls**: 40

**Steps**:
1. Create `src/lib/encryption.ts`:
```typescript
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

export function decrypt(data: string): string {
  const [ivHex, authTagHex, encrypted] = data.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
```

2. Add to `.env.example`:
```
ENCRYPTION_KEY=your-64-character-hex-key
```

3. Create Prisma middleware for automatic encryption/decryption

4. Apply to Customer model fields: email, firstName, lastName, address, city, postalCode, phone

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build && pnpm test __tests__/security/ --passWithNoTests
```

**On success**:
```bash
git add -A && git commit -m "session 2.1.1: field-level encryption"
```

---

### Session 2.2.1: API Rate Limiting

**Requires**: 1.1.5
**Max files**: 10
**Estimated tool calls**: 35

**Steps**:
1. Install: `pnpm add @upstash/ratelimit @upstash/redis`

2. Create `src/lib/rate-limit.ts`:
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});
```

3. Apply to sensitive routes:
   - `app/api/checkout/route.ts`: 10 req/min
   - `app/api/contact/route.ts`: 5 req/min

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build
```

**On success**:
```bash
git add -A && git commit -m "session 2.2.1: api rate limiting"
```

---

### Session 2.3.1: Input Sanitization Audit

**Requires**: 2.2.1
**Max files**: 20
**Estimated tool calls**: 50

**Steps**:
1. Search for raw body access:
```bash
grep -r "req\.body" pages/api/ app/api/ src/ | grep -v node_modules
```

2. Ensure all have Zod validation
3. Create shared schemas in `src/lib/schemas/`
4. Update any missing validation

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build && pnpm test
```

**On success**:
```bash
git add -A && git commit -m "session 2.3.1: input sanitization"
```

---

## ⚡ Phase 3: Performance

### Session 3.1.1: Bundle Analysis and Optimization

**Requires**: 1.3.1
**Max files**: 15
**Estimated tool calls**: 45

**Steps**:
1. Run bundle analyzer:
```bash
cd /Users/macmini/dev/purr && ANALYZE=true pnpm run build
```

2. Identify largest imports (recharts, radix-ui, lucide-react)

3. Optimize:
   - Replace `import { Chart } from 'recharts'` with specific imports
   - Add `dynamic()` for heavy components
   - Use specific Radix imports

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build 2>&1 | grep "First Load JS"
```
**Target**: Main bundle < 150KB

**On success**:
```bash
git add -A && git commit -m "session 3.1.1: bundle optimization"
```
