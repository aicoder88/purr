# Purrify Codebase Improvement Plan

> **Version**: 1.0  
> **Date**: 2026-01-30  
> **Est. Timeline**: 12-16 weeks  
> **Team**: Kimi (primary), Gemini (specialized tasks)

---

## Executive Summary

This plan addresses critical technical debt accumulated from rapid feature development. The codebase has **713 TypeScript files**, **97 API routes**, **4 languages**, and runs on a **legacy Pages Router** with modern Next.js 16 + React 19.

**The core insight**: App Router migration is a **foundational prerequisite** that unlocks performance gains, simplifies state management, and enables modern React patterns. Attempting other optimizations first creates double work.

---

## Agent Specialization Guide

| Task Type | Primary Agent | Why |
|-----------|--------------|-----|
| **Architecture refactoring** | Kimi | Better at large-scale structural changes, understanding Next.js internals |
| **Copy writing, content** | Kimi | Superior nuanced writing, brand voice consistency |
| **Security audits** | Kimi | More thorough threat modeling, edge case analysis |
| **Image processing pipelines** | Gemini | Can leverage nano-bananna for batch processing, CV tasks |
| **Data migration scripts** | Gemini | Better at writing reliable bulk data transformations |
| **Component/UI polish** | Kimi | Better aesthetic judgment, accessibility awareness |
| **SEO analysis** | Gemini | Can process large datasets, pattern matching across pages |
| **Testing infrastructure** | Shared | Kimi writes tests, Gemini generates test data |

---

## Phase 1: Foundation (Weeks 1-4) 🔴 MUST DO

> **Why first**: These changes alter the fundamental architecture. Everything else builds on top.

### 1.1 App Router Migration Strategy
**Agent**: Kimi  
**Effort**: 2-3 weeks  
**Impact**: Unlocks RSC, streaming, edge runtime, modern caching

**Why MUST do this first**:
- Server Components eliminate 60%+ of client JS automatically
- Changes how data fetching works (no more `getStaticProps`/`getServerSideProps`)
- Affects every page component's structure
- Doing it later = rewriting components twice

**Migration Strategy** (Incremental):
```
Step 1: Create app/ directory alongside pages/
Step 2: Migrate static marketing pages first (about, science, contact)
Step 3: Migrate blog pages with ISR
Step 4: Migrate product pages with dynamic params
Step 5: Migrate API routes to Route Handlers
Step 6: Remove pages/ after parity achieved
```

**Session Breakdown** (context-safe chunks):
| Session | Task | Files | Est. Time |
|---------|------|-------|-----------|
| 1.1.1 | Setup app/ structure, layout.tsx, loading.tsx | 5 | 2h |
| 1.1.2 | Migrate static pages (about, science, contact) | 3 | 3h |
| 1.1.3 | Migrate learn/ pages with nested layouts | 13 | 4h |
| 1.1.4 | Migrate blog index + detail pages | 29 | 5h |
| 1.1.5 | Migrate product pages | 3 | 3h |
| 1.1.6 | Migrate API routes to Route Handlers | 20 | 6h |
| 1.1.7 | Fix i18n for App Router (next-intl) | 10 | 4h |

**Blockers if not done first**:
- Cannot use Server Components (major perf win)
- Cannot use modern data fetching patterns
- Cannot deploy to edge runtime
- SEO improvements are harder without streaming

---

### 1.2 Database Connection Pooling
**Agent**: Kimi  
**Effort**: 2 days  
**Impact**: Eliminates connection limit errors in serverless

**Why MUST do early**:
- App Router + Serverless = more concurrent connections
- Current setup likely hits limits under load
- Affects all data fetching

```typescript
// Add to prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

// Use @neondatabase/serverless or pg-pool
```

**Session**:
- 1.2.1: Add connection pooling, test with load

---

### 1.3 TypeScript Strict Mode Enforcement
**Agent**: Kimi  
**Effort**: 3-4 days  
**Impact**: Prevents runtime errors, better DX

**Why MUST do before adding features**:
- New code should be strict from the start
- Easier to fix 100 errors now than 500 later
- Required for some modern TypeScript patterns

**Session Breakdown**:
| Session | Task | Est. Time |
|---------|------|-----------|
| 1.3.1 | Enable strict, fix src/lib/* errors | 3h |
| 1.3.2 | Fix src/components/* errors | 4h |
| 1.3.3 | Fix pages/* errors | 4h |
| 1.3.4 | Fix remaining errors, CI enforcement | 2h |

---

## Phase 2: Security Hardening (Weeks 3-5) 🔴 MUST DO

> **Why now**: Security debt compounds. Data breaches are existential risks.

### 2.1 Customer PII Encryption
**Agent**: Kimi  
**Effort**: 3 days  
**Impact**: Compliance (PIPEDA, GDPR), breach protection

**Critical**: Comments in schema say "Should be encrypted" but aren't.

**Fields to encrypt**:
- Customer.email
- Customer.firstName, lastName
- Customer.address, city, postalCode
- Customer.phone

**Session Breakdown**:
| Session | Task | Est. Time |
|---------|------|-----------|
| 2.1.1 | Implement field-level encryption utility | 2h |
| 2.1.2 | Encrypt Customer model fields | 3h |
| 2.1.3 | Update queries to decrypt automatically | 3h |
| 2.1.4 | Migration for existing data | 2h |
| 2.1.5 | Update exports/reporting to handle encryption | 2h |

---

### 2.2 API Security Audit & Rate Limiting
**Agent**: Kimi  
**Effort**: 4 days  
**Impact**: DDoS protection, abuse prevention

**Current state**: 97 API routes, no unified protection visible.

**Session Breakdown**:
| Session | Task | Est. Time |
|---------|------|-----------|
| 2.2.1 | Audit all API routes for auth/validation | 3h |
| 2.2.2 | Implement Upstash Redis rate limiting | 3h |
| 2.2.3 | Add to sensitive routes (checkout, affiliate) | 3h |
| 2.2.4 | Add request signing for webhooks | 2h |
| 2.2.5 | Security headers audit | 2h |

---

### 2.3 Input Sanitization Standardization
**Agent**: Kimi  
**Effort**: 2 days  
**Impact**: XSS prevention

**Session**:
- 2.3.1: Audit all user input points
- 2.3.2: Standardize on zod schemas for all inputs

---

## Phase 3: Performance (Weeks 5-8) 🟡 SHOULD DO

> **Why after foundation**: Performance optimizations are different in App Router vs Pages Router

### 3.1 Bundle Optimization
**Agent**: Kimi + Gemini (analysis)  
**Effort**: 1 week  
**Impact**: Faster page loads, better Core Web Vitals

**Current issues**:
- recharts imported fully (heavy)
- 321 useState hooks (many could be Server Components)
- 129 useEffect hooks (indicates client-side data fetching)

**Session Breakdown**:
| Session | Task | Agent | Est. Time |
|---------|------|-------|-----------|
| 3.1.1 | Run bundle analyzer, identify bloat | Kimi | 2h |
| 3.1.2 | Replace recharts with custom SVG charts | Kimi | 4h |
| 3.1.3 | Lazy load heavy components | Kimi | 3h |
| 3.1.4 | Optimize Radix UI imports | Kimi | 2h |
| 3.1.5 | Implement dynamic imports for sections | Kimi | 3h |

---

### 3.2 Image Strategy Overhaul
**Agent**: Gemini (processing) + Kimi (integration)  
**Effort**: 1 week  
**Impact**: Better LCP, reduced bandwidth

**Current state**: 157MB public folder, manual optimization scripts

**Session Breakdown**:
| Session | Task | Agent | Est. Time |
|---------|------|-------|-----------|
| 3.2.1 | Audit all images, identify optimization candidates | Gemini | 2h |
| 3.2.2 | Batch convert to WebP/AVIF | Gemini | 3h |
| 3.2.3 | Implement CDN integration (Cloudinary) | Kimi | 4h |
| 3.2.4 | Update next/image configurations | Kimi | 2h |
| 3.2.5 | Fix sparse_images issues from audit_progress.json | Gemini | 4h |

**Gemini's advantage**: Can use nano-bananna or similar for batch CV tasks if needed for image categorization.

---

### 3.3 Database Query Optimization
**Agent**: Kimi  
**Effort**: 3 days  
**Impact**: Faster API responses

**Issues to address**:
- N+1 queries in affiliate/referral aggregations
- Missing indexes on common query patterns
- Heavy dashboard queries

**Session Breakdown**:
| Session | Task | Est. Time |
|---------|------|-----------|
| 3.3.1 | Identify slow queries via logging | 2h |
| 3.3.2 | Add database views for complex aggregations | 3h |
| 3.3.3 | Optimize Prisma queries with `include` | 3h |
| 3.3.4 | Add caching layer for hot data (Redis) | 3h |

---

## Phase 4: Testing & Quality (Weeks 8-10) 🟡 SHOULD DO

> **Why not earlier**: Test patterns differ between Pages and App Router

### 4.1 Testing Infrastructure
**Agent**: Kimi  
**Effort**: 1 week  
**Impact**: Confidence in changes, regression prevention

**Current**: 16 test files, mostly SEO utilities

**Session Breakdown**:
| Session | Task | Est. Time |
|---------|------|-----------|
| 4.1.1 | Setup MSW for API mocking | 3h |
| 4.1.2 | Add component tests for UI primitives | 4h |
| 4.1.3 | Add integration tests for checkout flow | 4h |
| 4.1.4 | Add E2E tests for critical paths | 3h |
| 4.1.5 | Setup coverage reporting in CI | 2h |

---

### 4.2 E2E Test Expansion
**Agent**: Gemini (generating test cases) + Kimi (implementation)  
**Effort**: 3 days  
**Impact**: Catch regressions

**Session**:
- 4.2.1: Generate comprehensive test scenarios (Gemini)
- 4.2.2: Implement critical path tests (Kimi)

---

## Phase 5: Developer Experience (Weeks 10-12) 🟢 NICE TO HAVE

> **Why later**: Nice-to-haves that don't block business value

### 5.1 Consolidate SEO Scripts
**Agent**: Gemini  
**Effort**: 3 days  
**Impact**: Faster builds, less maintenance

**Current**: 25+ SEO scripts scattered in `scripts/seo/`

**Gemini's advantage**: Pattern matching, consolidating similar scripts.

---

### 5.2 Storybook Setup
**Agent**: Kimi  
**Effort**: 2 days  
**Impact**: Component documentation, visual testing

---

### 5.3 Documentation Overhaul
**Agent**: Kimi  
**Effort**: 2 days  
**Impact**: Onboarding, maintenance

Update AGENTS.md with new patterns post-migration.

---

## Phase 6: Content & CMS (Weeks 12-14) 🟢 NICE TO HAVE

> **Why last**: Content migration is disruptive but not blocking

### 6.1 Headless CMS Migration
**Agent**: Kimi  
**Effort**: 2 weeks  
**Impact**: Better content workflows

**Current**: Blog in JSON files, no CMS

**Session Breakdown**:
| Session | Task | Est. Time |
|---------|------|-----------|
| 6.1.1 | Evaluate CMS options (Sanity vs Strapi) | 3h |
| 6.1.2 | Setup CMS instance | 4h |
| 6.1.3 | Write content migration scripts | 6h |
| 6.1.4 | Update frontend to use CMS API | 6h |
| 6.1.5 | Content freeze and migration | 4h |

---

### 6.2 i18n Optimization
**Agent**: Kimi  
**Effort**: 3 days  
**Impact**: Smaller bundles, better loading

**Current**: 3600+ line translation files loaded eagerly

**Session**:
- 6.2.1: Implement lazy loading for translations
- 6.2.2: Move to next-intl for App Router

---

## Phase 7: Advanced Optimizations (Weeks 14-16) 🔵 FUTURE

> **Why future**: Complex, requires previous phases complete

### 7.1 Edge Runtime Migration
**Agent**: Kimi  
**Effort**: 1 week  
**Impact**: Global performance, lower latency

Requires App Router complete.

---

### 7.2 Micro-frontend Architecture
**Agent**: Kimi  
**Effort**: 2-3 weeks  
**Impact**: Independent deployments

Separate admin, affiliate, main site.

---

### 7.3 Real-time Features
**Agent**: Kimi  
**Effort**: 1 week  
**Impact**: Better UX

WebSockets for inventory, live chat.

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| App Router migration breaks SEO | Medium | High | Extensive testing, staged rollout |
| Encryption migration corrupts data | Low | Critical | Full backup, gradual rollout |
| CMS migration loses content | Low | High | Content freeze, verification scripts |
| Performance regressions | Medium | Medium | Lighthouse CI, performance budgets |
| Build time increases | Medium | Medium | Parallel builds, caching |

---

## Success Metrics

| Metric | Current | Target | Phase |
|--------|---------|--------|-------|
| Lighthouse Performance | ~60 | >90 | 3 |
| Bundle size (main) | ~250KB | <150KB | 3 |
| API response p95 | ~500ms | <200ms | 3 |
| Test coverage | ~5% | >70% | 4 |
| Build time | ~5min | <3min | 1, 5 |
| Type errors | ~100 | 0 | 1 |
| Security audit issues | Unknown | 0 critical | 2 |

---

## Execution Checklist

### Before Starting
- [ ] Full database backup
- [ ] Branch protection rules
- [ ] Staging environment ready
- [ ] Rollback plan documented

### Phase 1 Start
- [ ] App Router directory created
- [ ] Feature flags for gradual rollout
- [ ] Monitoring dashboards setup

### Phase 2 Start
- [ ] App Router core pages migrated
- [ ] Encryption keys generated
- [ ] Security audit baseline

### Phase 3 Start
- [ ] Security issues resolved
- [ ] Bundle analyzer integrated
- [ ] Image CDN account setup

### Phase 4 Start
- [ ] Performance baseline recorded
- [ ] MSW setup complete
- [ ] Test data prepared

---

## Appendix: Context Window Management

### Kimi Session Limits
- **Safe**: Component refactoring (<50 files)
- **Safe**: API route migration (5-10 routes)
- **Avoid**: Full App Router migration in one session
- **Avoid**: Database-wide changes

### Gemini Session Limits
- **Safe**: Image batch processing
- **Safe**: Data analysis, SEO auditing
- **Safe**: Test case generation
- **Avoid**: Complex architectural decisions

### Handoff Protocol
1. Kimi defines interface/contracts
2. Gemini implements data processing
3. Kimi integrates results
4. Kimi writes tests
5. Both review

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01-30 | App Router before performance | Performance solutions differ between routers |
| 2026-01-30 | Security before performance | Security is non-negotiable, performance is iterative |
| 2026-01-30 | CMS migration last | Content freeze is disruptive, do when code is stable |
| 2026-01-30 | Gemini for image processing | Better at batch operations, can use specialized tools |
| 2026-01-30 | Kimi for architecture | Better at understanding Next.js internals, trade-offs |

---

*This plan is a living document. Update as constraints change.*
