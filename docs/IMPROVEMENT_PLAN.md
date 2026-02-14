# Purrify Codebase Improvement Plan (AI-Executable)

> **Version**: 2.0  
> **Date**: 2026-01-30  
> **Format**: AI-executable sessions with explicit verification gates

---

## Executive Summary

This plan addresses critical technical debt in the Purrify codebase. It is designed for execution by AI agents (Gemini, Kimi K2.5, Claude Opus/Sonnet) with explicit verification commands and exit criteria for each session.

**Codebase Stats**:
- ~100 TSX pages (Pages Router)
- 32 JSON blog posts + 29 custom TSX blog pages
- 18 API route directories + 13 standalone API files
- 18 existing test files
- Next.js 16 + React 19 + Prisma

**The core insight**: Blog JSON migration to App Router **only matters for SEO if it enables streaming/RSC benefits**. The current JSON + `getStaticProps` pattern with ISR is already SEO-optimal. **Do NOT migrate JSON content to TSX** unless there's a specific streaming/RSC benefit.

---

## Agent Assignment Matrix

| Agent | Best For | Avoid |
|-------|----------|-------|
| **Claude Opus/Sonnet** | Architecture refactoring, complex TypeScript, security audits, testing | Batch image processing |
| **Kimi K2.5** | Copy writing, content optimization, nuanced brand voice | Large file transformations |
| **Gemini** | Image processing, data migration scripts, SEO analysis, pattern matching | Complex architectural decisions |

---

## Session Protocol

Every session MUST follow this structure:

```markdown
### Session X.Y.Z: [Action]

**Agent**: [Claude/Kimi/Gemini]
**Requires**: [Previous session IDs or "None"]
**Max files**: [Number]
**Estimated tool calls**: [Number]

**Pre-flight check**:
- [ ] Verify: `[command]` returns [expected]

**Input files**:
- `path/to/file1`
- `path/to/file2`

**Steps**:
1. [Specific action with file path]
2. [Specific action with file path]

**Verification**:
```bash
[exact command to verify success]
```
**Expected output**: [what to look for]

**Exit criteria**:
- [ ] [Specific condition]
- [ ] [Specific condition]

**On failure**:
```bash
git checkout .
```
Report error and stop.

**On success**:
```bash
git add -A && git commit -m "session X.Y.Z: [description]"
```
```

---

## Phase 1: Foundation (Sessions 1.1 - 1.3) 🔴 MUST DO

### Session 1.1.1: Create App Router Skeleton

**Agent**: Claude Opus/Sonnet
**Requires**: None
**Max files**: 8
**Estimated tool calls**: 25

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && pnpm run build 2>&1 | head -20
```
- [ ] Build succeeds or shows current state

**Input files**: None (creating new)

**Steps**:
1. Create `app/layout.tsx` with root layout wrapping `_app.tsx` patterns
2. Create `app/loading.tsx` with branded loading spinner
3. Create `app/error.tsx` with error boundary
4. Create `app/not-found.tsx` matching current 404
5. Create `app/globals.css` importing existing styles
6. Update `next.config.js` to enable App Router alongside Pages

**Verification**:
```bash
cd /Users/macmini/dev/purr && ls -la app/ && pnpm run build 2>&1 | grep -E "(error|success|compiled)"
```
**Expected output**: app/ directory exists, build completes without new errors

**Exit criteria**:
- [ ] `app/layout.tsx` exists and exports default function
- [ ] `app/loading.tsx` exists
- [ ] `app/error.tsx` exists with 'use client' directive
- [ ] `pnpm run build` succeeds

**On failure**: `git checkout .` and report error

**On success**:
```bash
git add -A && git commit -m "session 1.1.1: create app router skeleton"
```

---

### Session 1.1.2: Migrate Static Marketing Pages

**Agent**: Claude Opus/Sonnet
**Requires**: 1.1.1
**Max files**: 6
**Estimated tool calls**: 40

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && ls pages/about/our-story.tsx pages/science.tsx pages/contact.tsx 2>&1
```
- [ ] All three files exist

**Input files**:
- `pages/about/our-story.tsx`
- `pages/science.tsx`
- `pages/contact.tsx`

**Steps**:
1. Create `app/about/page.tsx` as Server Component (remove hooks, use RSC patterns)
2. Create `app/about/layout.tsx` for about section
3. Create `app/science/page.tsx` as Server Component
4. Create `app/contact/page.tsx` - keep client parts in separate 'use client' components
5. Extract any interactive forms to `app/contact/_components/ContactForm.tsx` with 'use client'
6. Add metadata exports to each page for SEO

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build 2>&1 | tail -10
```
**Expected output**: Build succeeds

**Browser verification** (if browser tool available):
1. Navigate to `http://localhost:3000/about`
2. Navigate to `http://localhost:3000/science`
3. Navigate to `http://localhost:3000/contact`
4. Verify pages render correctly

**Exit criteria**:
- [ ] `app/about/page.tsx` exports metadata object
- [ ] `app/science/page.tsx` is a Server Component (no 'use client' at top)
- [ ] Forms still work on contact page
- [ ] Build succeeds

**On failure**: `git checkout .` and report error

**On success**:
```bash
git add -A && git commit -m "session 1.1.2: migrate static marketing pages to app router"
```

---

### Session 1.1.3: Migrate Blog Index and Dynamic Route

**Agent**: Claude Opus/Sonnet
**Requires**: 1.1.2
**Max files**: 10
**Estimated tool calls**: 50

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && ls pages/blog/index.tsx pages/blog/\[slug\].tsx content/blog/en/*.json | wc -l
```
- [ ] Returns 34 (32 JSON + 2 TSX)

**Input files**:
- `pages/blog/index.tsx`
- `pages/blog/[slug].tsx`
- `src/data/blog-posts.ts`

**Steps**:
1. Create `app/blog/page.tsx` (Server Component, fetch blog list)
2. Create `app/blog/[slug]/page.tsx` with `generateStaticParams()`
3. Create `app/blog/[slug]/loading.tsx`
4. Create `app/blog/layout.tsx` with blog-specific layout
5. Ensure JSON content is loaded via filesystem read (this is FINE for SEO with static generation)
6. Add `generateMetadata()` for dynamic SEO per blog post
7. Keep existing JSON content structure - **DO NOT convert to TSX**

**IMPORTANT**: The JSON blog content system is SEO-optimal with static generation. The App Router migration does NOT require changing the content format.

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build 2>&1 | grep -E "(blog|error)"
```
**Expected output**: Blog pages generate statically

**Exit criteria**:
- [ ] `app/blog/page.tsx` lists all blog posts
- [ ] `app/blog/[slug]/page.tsx` renders JSON content
- [ ] `generateStaticParams()` returns all 32 slugs
- [ ] `generateMetadata()` returns title, description, openGraph
- [ ] Build succeeds with static pages generated

**On failure**: `git checkout .` and report error

**On success**:
```bash
git add -A && git commit -m "session 1.1.3: migrate blog to app router with json content preserved"
```

---

### Session 1.1.4: Migrate Custom TSX Blog Posts

**Agent**: Claude Opus/Sonnet
**Requires**: 1.1.3
**Max files**: 15 per sub-session
**Estimated tool calls**: 60 per sub-session

**BATCH STRATEGY**: There are 28 custom TSX blog posts. Split into 2 sub-sessions.

#### Session 1.1.4a: First Batch (14 posts)

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && ls pages/blog/*.tsx | head -15
```

**Steps**:
1. For each custom TSX blog post in batch:
   - Create `app/blog/[post-slug]/page.tsx`
   - Convert to Server Component where possible
   - Extract interactive parts to client components
   - Add `generateMetadata()` export

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build 2>&1 | grep -E "(error|warn)" | head -20
```

**Exit criteria**:
- [ ] All 14 posts build successfully
- [ ] Each has metadata export

**On success**:
```bash
git add -A && git commit -m "session 1.1.4a: migrate first batch custom tsx blog posts"
```

#### Session 1.1.4b: Second Batch (14 posts)

Same pattern as 1.1.4a for remaining posts.

---

### Session 1.1.5: Migrate API Routes to Route Handlers

**Agent**: Claude Opus/Sonnet
**Requires**: 1.1.4
**Max files**: 20
**Estimated tool calls**: 80

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && ls pages/api/*.ts | wc -l
```
- [ ] Returns count of API files

**Input directories**:
- `pages/api/contact.ts`
- `pages/api/contact-b2b.ts`
- `pages/api/subscribe.ts`
- `pages/api/create-checkout-session.ts`
- `pages/api/webhooks/`

**Steps**:
1. Create `app/api/contact/route.ts` with POST handler
2. Create `app/api/contact-b2b/route.ts` with POST handler
3. Create `app/api/subscribe/route.ts` with POST handler
4. Create `app/api/checkout/route.ts` from create-checkout-session
5. Create `app/api/webhooks/stripe/route.ts`
6. Use NextRequest/NextResponse patterns
7. Maintain existing validation logic

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build && curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"test": true}'
```
**Expected output**: API responds (may be validation error, but not 404)

**Exit criteria**:
- [ ] All migrated API routes return proper responses
- [ ] Webhook routes maintain signature verification
- [ ] Build succeeds

**On failure**: `git checkout .` and report error

**On success**:
```bash
git add -A && git commit -m "session 1.1.5: migrate core api routes to route handlers"
```

---

### Session 1.1.6: Fix i18n for App Router

**Agent**: Claude Opus/Sonnet
**Requires**: 1.1.5
**Max files**: 12
**Estimated tool calls**: 45

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && grep -r "next-intl\|useTranslation" src/ | head -10
```

**Steps**:
1. Install/configure `next-intl` for App Router if not already
2. Create `app/[locale]/layout.tsx` for locale handling
3. Update static pages to use server-side translations
4. Ensure client components receive translations through props or context
5. Update middleware for locale routing

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build && curl http://localhost:3000/en/about | grep -i "html"
```

**Exit criteria**:
- [ ] English pages render with translations
- [ ] French pages render (if supported): `/fr/about`
- [ ] Build succeeds

**On success**:
```bash
git add -A && git commit -m "session 1.1.6: configure i18n for app router"
```

---

### Session 1.2.1: Database Connection Pooling

**Agent**: Claude Opus/Sonnet
**Requires**: None (can run parallel to 1.1.x)
**Max files**: 4
**Estimated tool calls**: 20

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && cat prisma/schema.prisma | head -20
```

**Input files**:
- `prisma/schema.prisma`
- `src/lib/prisma.ts` (or equivalent)

**Steps**:
1. Add `previewFeatures = ["driverAdapters"]` to prisma client generator
2. Install `@neondatabase/serverless` if using Neon, or configure pg-pool
3. Create/update `src/lib/db.ts` with pooled connection
4. Update all Prisma imports to use pooled client

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm prisma generate && pnpm run build
```

**Exit criteria**:
- [ ] Prisma client generates successfully
- [ ] Build succeeds
- [ ] No "too many connections" errors in logs

**On success**:
```bash
git add -A && git commit -m "session 1.2.1: add database connection pooling"
```

---

### Session 1.3.1: Enable TypeScript Strict Mode

**Agent**: Claude Opus/Sonnet
**Requires**: 1.1.6 (after App Router migration)
**Max files**: 50
**Estimated tool calls**: 100

**BATCH STRATEGY**: This session may need to be split based on error count.

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && cat tsconfig.json | grep strict
```

**Steps**:
1. Update `tsconfig.json` to enable `"strict": true`
2. Run `pnpm tsc --noEmit` to get error list
3. Fix errors in priority order:
   - `src/lib/*` first
   - `src/components/*` second
   - `pages/*` or `app/*` last
4. Focus on implicit any, null checks, undefined access

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm tsc --noEmit 2>&1 | tail -20
```
**Expected output**: Zero errors or list of remaining

**Exit criteria**:
- [ ] `pnpm tsc --noEmit` exits with code 0
- [ ] Build succeeds

**On failure**: If >100 errors, document count and stop for human review

**On success**:
```bash
git add -A && git commit -m "session 1.3.1: enable typescript strict mode"
```

---

## Phase 2: Security Hardening (Sessions 2.1 - 2.3) 🔴 MUST DO

### Session 2.1.1: Implement Field-Level Encryption

**Agent**: Claude Opus/Sonnet
**Requires**: 1.2.1
**Max files**: 8
**Estimated tool calls**: 40

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && grep -r "Should be encrypted" prisma/schema.prisma
```

**Input files**:
- `prisma/schema.prisma`
- `src/lib/encryption.ts` (create if not exists)

**Steps**:
1. Create `src/lib/encryption.ts` with encrypt/decrypt functions using Node crypto
2. Create encryption key configuration in env
3. Add Prisma middleware for automatic field encryption
4. Apply to Customer model fields: email, firstName, lastName, address, city, postalCode, phone

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build && pnpm jest __tests__/security/ --passWithNoTests
```

**Exit criteria**:
- [ ] `src/lib/encryption.ts` exports `encrypt()` and `decrypt()` functions
- [ ] Prisma middleware registered
- [ ] Build succeeds
- [ ] Security tests pass (if they exist)

**On success**:
```bash
git add -A && git commit -m "session 2.1.1: implement field-level encryption for pii"
```

---

### Session 2.2.1: API Rate Limiting

**Agent**: Claude Opus/Sonnet
**Requires**: 1.1.5
**Max files**: 10
**Estimated tool calls**: 35

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && grep -r "rate" src/lib/ pages/api/ app/api/ | head -5
```

**Steps**:
1. Install `@upstash/ratelimit` and `@upstash/redis`
2. Create `src/lib/rate-limit.ts` with configurable limits
3. Apply to sensitive routes:
   - `app/api/checkout/route.ts`: 10 req/min
   - `app/api/contact/route.ts`: 5 req/min
   - `app/api/affiliate/*`: 20 req/min
4. Add rate limit headers to responses

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build
# Manual test: hit endpoint > rate limit times
```

**Exit criteria**:
- [ ] Rate limit middleware exists
- [ ] Sensitive routes have rate limiting applied
- [ ] Build succeeds

**On success**:
```bash
git add -A && git commit -m "session 2.2.1: add api rate limiting"
```

---

### Session 2.3.1: Input Sanitization Audit

**Agent**: Claude Opus/Sonnet
**Requires**: 2.2.1
**Max files**: 20
**Estimated tool calls**: 50

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && grep -r "zod" src/ pages/ app/ | wc -l
```

**Steps**:
1. Audit all API routes for input validation
2. Ensure all POST/PUT handlers use Zod schemas
3. Add `sanitize-html` or similar for any user-generated content
4. Create shared schemas in `src/lib/schemas/`

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build && pnpm test 2>&1 | grep -E "(pass|fail)"
```

**Exit criteria**:
- [ ] All API routes have Zod validation
- [ ] No raw `req.body` access without validation
- [ ] Tests pass

**On success**:
```bash
git add -A && git commit -m "session 2.3.1: standardize input validation with zod"
```

---

## Phase 3: Performance (Sessions 3.1 - 3.3) 🟡 SHOULD DO

### Session 3.1.1: Bundle Analysis and Optimization

**Agent**: Claude Opus/Sonnet
**Requires**: 1.3.1
**Max files**: 15
**Estimated tool calls**: 45

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && pnpm run analyze 2>&1 | tail -5
```

**Steps**:
1. Run bundle analyzer: `ANALYZE=true pnpm run build`
2. Identify largest imports (recharts, radix-ui, etc.)
3. Replace full recharts imports with tree-shakeable alternatives
4. Add dynamic imports for heavy components
5. Optimize Radix UI imports

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm run build 2>&1 | grep "First Load JS"
```
**Expected output**: Main bundle < 150KB

**Exit criteria**:
- [ ] Bundle size reduced by >20%
- [ ] No functionality broken
- [ ] Build succeeds

**On success**:
```bash
git add -A && git commit -m "session 3.1.1: optimize bundle size"
```

---

### Session 3.2.1: Image Optimization Pipeline

**Agent**: Gemini (batch processing)
**Requires**: None (parallel to other work)
**Max files**: 50
**Estimated tool calls**: 80

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && du -sh public/ && find public -name "*.png" -o -name "*.jpg" | wc -l
```

**Steps**:
1. Audit all images in `public/` for optimization opportunities
2. Convert large PNGs/JPGs to WebP using sharp
3. Generate responsive image sizes
4. Update image references to use next/image with proper sizing

**Verification**:
```bash
cd /Users/macmini/dev/purr && du -sh public/ && pnpm run build
```
**Expected output**: public/ size reduced

**Exit criteria**:
- [ ] All images converted to optimal format
- [ ] Total public/ size reduced by >30%
- [ ] Build succeeds
- [ ] Images render correctly

**On success**:
```bash
git add -A && git commit -m "session 3.2.1: optimize images batch 1"
```

---

## Phase 4: Testing (Sessions 4.1 - 4.2) 🟡 SHOULD DO

### Session 4.1.1: Expand Test Coverage

**Agent**: Claude Opus/Sonnet
**Requires**: 2.3.1
**Max files**: 20
**Estimated tool calls**: 60

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr && pnpm test 2>&1 | tail -10
```

**Input files** (existing tests):
- `__tests__/api/seo/*.test.ts`
- `__tests__/hooks/*.test.ts`
- `__tests__/security/*.test.ts`

**Steps**:
1. Add component tests for critical UI components
2. Add integration tests for checkout flow
3. Add API tests for contact, subscribe endpoints
4. Setup MSW for API mocking

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm test:coverage 2>&1 | tail -20
```
**Expected output**: Coverage > 50%

**Exit criteria**:
- [ ] Test count increased by >20 tests
- [ ] Coverage > 50%
- [ ] All tests pass

**On success**:
```bash
git add -A && git commit -m "session 4.1.1: expand test coverage"
```

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01-30 | Keep JSON blog content | Already SEO-optimal with ISR/static generation |
| 2026-01-30 | App Router before performance | Performance solutions differ between routers |
| 2026-01-30 | Security before performance | Security is non-negotiable, performance is iterative |
| 2026-01-30 | Gemini for image processing | Better at batch operations |
| 2026-01-30 | Claude for architecture | Better at understanding Next.js internals |

---

## Rollback Protocol

If any session fails after making changes:

```bash
# Immediate rollback
git checkout .

# If already committed
git revert HEAD

# If multiple commits need rollback
git log --oneline -10  # Find last good commit
git reset --hard <commit-hash>
```

---

## Context Window Safety

### Session Size Limits by Agent

| Agent | Max Files | Max Tool Calls | Safe Scope |
|-------|-----------|----------------|------------|
| Claude Opus | 50 | 100 | Multi-file refactoring |
| Claude Sonnet | 30 | 60 | Single feature implementation |
| Kimi K2.5 | 20 | 50 | Content + copy work |
| Gemini | 40 | 80 | Batch processing, analysis |

### Handoff Protocol

1. Completing agent commits with descriptive message
2. Completing agent documents state in session summary
3. Next agent runs pre-flight check before starting
4. If pre-flight fails, stop and report

---

## Success Metrics

| Metric | Current | Target | Verification Command |
|--------|---------|--------|---------------------|
| Build time | ~5min | <3min | `time pnpm run build` |
| Bundle size | ~250KB | <150KB | `pnpm run build \| grep "First Load"` |
| Lighthouse | ~60 | >90 | Browser Lighthouse audit |
| Test coverage | ~5% | >50% | `pnpm test:coverage` |
| Type errors | ~100 | 0 | `pnpm tsc --noEmit 2>&1 \| wc -l` |

---

*This plan is a living document. Each completed session should update progress markers.*
