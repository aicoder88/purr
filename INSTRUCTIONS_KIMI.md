# Instructions for Kimi K2.5 (Lead Architect)

**Role**: Lead Architect & Migration Coordinator  
**Focus**: App Router Migration (COMPLETED), TypeScript, Performance, Security  
**Why Kimi**: Highest-ranked for complex reasoning, best rate limits for sustained work

---

## 🎉 MIGRATION COMPLETE

**Status**: ✅ **App Router Migration Finished**  
**Date**: 2026-02-01  
**Total Pages Migrated**: 116 pages

### What Was Accomplished

| Phase | Pages | Status |
|-------|-------|--------|
| Phase 1: Core Public | 13 (Products, Learn/FAQ, B2B, Locations, Support) | ✅ Done |
| Phase 2: Marketing & Customer | 13 (Landing pages, B2B Verticals, Customer Portal) | ✅ Done |
| Phase 3: Admin & Affiliate | 33 (Admin Dashboard, Affiliate Portal) | ✅ Done |
| Phase 4: Learn Section | 27 (Guides, Solutions, How-To, Science) | ✅ Done |
| Phase 5: Remaining Pages | 30 (Misc, Legal, Tools, Blog Categories) | ✅ Done |
| Phase 6: Cleanup | Backup & Remove legacy | ✅ Done |

---

## 📊 Current Architecture

### App Router (Active)
```
app/
├── layout.tsx              # Root layout with providers
├── page.tsx                # Homepage
├── error.tsx               # Global error boundary
├── not-found.tsx           # 404 page
├── loading.tsx             # Global loading
├── providers.tsx           # Context providers
├── api/                    # API routes
│   ├── contact/route.ts
│   ├── checkout/route.ts
│   └── ...
├── about/                  # About pages
├── admin/                  # Admin dashboard (16 pages)
├── affiliate/              # Affiliate portal (10 pages)
├── b2b/                    # B2B pages
├── blog/                   # Blog (index + posts)
├── cat-cafes/              # B2B vertical
├── contact/                # Contact page
├── customer/               # Customer portal
├── free-trial/             # Landing pages
├── groomers/               # B2B vertical
├── hospitality/            # B2B vertical
├── invest/                 # Investor relations
├── learn/                  # Educational content (27 pages)
├── locations/              # Location pages
├── products/               # Product pages
├── refer/                  # Referral system
├── retailer/               # Retailer portal
├── reviews/                # Reviews page
├── shelters/               # B2B vertical
├── support/                # Support pages
├── terms/                  # Legal
├── thank-you/              # Post-purchase
├── tools/                  # Utilities
├── veterinarians/          # B2B vertical
└── ...
```

### Pages Router (Legacy - Removed)
Only essential files remain:
- `pages/_app.tsx` - App wrapper (still needed)
- `pages/_document.tsx` - Document structure (still needed)
- `pages/_error.tsx` - Error handling
- `pages/404.tsx` - 404 page (fallback)
- `pages/api/` - API routes (can migrate incrementally)

---

## 🧠 Core Principles (Still Apply)

### 1. Read CLAUDE.md First
**CRITICAL**: Before making any changes, review [CLAUDE.md](CLAUDE.md) for:
- No Fabrication Rule (verify all resources before using)
- Hydration Safety patterns (never return null conditionally)
- pnpm-only package management
- Dark mode requirements

### 2. Session Discipline
When making changes:
1. Run pre-flight check
2. Execute steps in order
3. Run verification command
4. If it **passes**: Commit and report
5. If it **fails**: Diagnose, fix, retry

**Git discipline**: After EVERY successful change:
```bash
git add -A && git commit -m "description"
```

### 3. Rollback on Catastrophic Failure
If changes break the build AND can't fix in 3 attempts:
```bash
git checkout .
```
Report the specific error.

---

## 🧪 Verification Commands

| Action | Command |
|--------|---------|
| Type checking | `pnpm check-types` |
| Linting | `pnpm lint` |
| Full build | `pnpm build` |
| Dev server | `pnpm dev` |
| Test page | `curl -I http://localhost:3000/[path]` |

---

## 📁 Migration Pattern Reference

### Basic Page Migration
```typescript
// app/[path]/page.tsx
import type { Metadata } from 'next';
import { getUserLocale } from '@/lib/locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getUserLocale();
  return {
    title: '...',
    description: '...',
  };
}

export default function PageNamePage() {
  return (
    // Component JSX
  );
}
```

### Dynamic Route Migration
```typescript
// app/blog/[slug]/page.tsx
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  // ... generate metadata
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  // ... fetch and render
}
```

### Client Component Pattern
```typescript
// app/[path]/page.tsx (Server Component)
export { generateMetadata } from './metadata';
export default function Page() {
  return <ClientPage />;
}

// app/[path]/ClientPage.tsx (Client Component)
'use client';
export function ClientPage() {
  const [state, setState] = useState();
  // ... client logic
}
```

---

## 🚨 Emergency Procedures

### Build Broken After Changes
```bash
# Check what changed
git diff --stat

# If fixable, fix it
# If not, rollback
git checkout .
```

### Hydration Errors
See [CLAUDE.md Hydration Safety section](CLAUDE.md#-hydration-safety--authentication).

### TypeScript Errors
```bash
# Get count of errors
pnpm check-types 2>&1 | grep "error TS" | wc -l

# If >50, report to human
```

---

## 📋 Future Work (Post-Migration)

### Optional Improvements
1. **API Routes Migration**: Move `pages/api/` to `app/api/` for consistency
2. **Strict TypeScript**: Enable full strict mode in tsconfig.json
3. **Bundle Optimization**: Run `ANALYZE=true pnpm build` to identify bloat
4. **Security Hardening**: Implement field-level encryption, rate limiting
5. **Performance**: Add React Server Components where possible

### Maintenance Tasks
- Monitor build times
- Keep dependencies updated
- Run SEO validation regularly
- Monitor for hydration errors

---

## 📚 Key Documentation

| Document | Purpose |
|----------|---------|
| [CLAUDE.md](CLAUDE.md) | **Read first**. Core principles, patterns |
| [INSTRUCTIONS_CLAUDE.md](INSTRUCTIONS_CLAUDE.md) | When to use Claude for review |
| [INSTRUCTIONS_GEMINI.md](INSTRUCTIONS_GEMINI.md) | Asset optimization |
| [docs/HYDRATION_SAFETY.md](docs/HYDRATION_SAFETY.md) | Avoid hydration errors |
| [docs/NO_FABRICATION_RULE.md](docs/NO_FABRICATION_RULE.md) | Never fabricate resources |

---

## 🎯 Migration Achievement Summary

- **116 pages** migrated from Pages Router to App Router
- **Zero breaking changes** to functionality
- **All SEO preserved** with generateMetadata
- **TypeScript strict compliance** maintained
- **Backup created** at `backup/pages-router-20260201/`
- **Build passing** with no errors

**The App Router migration is COMPLETE.** 🎉

---

**Last Updated:** 2026-02-01
