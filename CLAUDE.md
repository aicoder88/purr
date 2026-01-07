# CLAUDE.md

## Pre-Commit Checklist

```bash
npm run lint && npm run check-types && npm run validate-dark-mode && npm run validate-images
```

All four must pass. No exceptions.

---

## Quick Reference

| What | Where |
|------|-------|
| Components | `src/components/` (PascalCase: `MyComponent.tsx`) |
| Pages | `pages/` (kebab-case: `my-page.tsx`) |
| API routes | `pages/api/` (kebab-case: `my-endpoint.ts`) |
| Translations | `src/translations/{en,fr,zh}.ts` |
| Blog content | `/content/blog/{en,fr,zh}/*.json` |
| Tests (unit) | `__tests__/**/*.test.ts` |
| Tests (e2e) | `e2e/**/*.spec.ts` |

---

## Commands

```bash
# Development
npm run dev                       # Start dev server
npm run predev                    # Clear cache (use if hot reload breaks)

# Validation
npm run lint                      # ESLint
npm run check-types               # TypeScript strict
npm run validate-dark-mode        # Check dark: variants
npm run validate-images           # Check image size limits

# Testing
npm test                          # Jest unit tests
npm run test:watch                # Jest watch mode
npm run test:e2e                  # Playwright e2e tests
npm run test:e2e:ui               # Playwright with UI

# Build
npm run build                     # Production build

# Database
npx prisma studio                 # Database GUI
npx prisma migrate dev            # Run migrations

# Debugging
vercel logs <deployment-url>      # View production logs
```

---

## Dark Mode (Required)

Every element needs both light and dark variants:

```css
/* Text */
text-gray-900 dark:text-gray-50        /* Headings */
text-gray-700 dark:text-gray-200       /* Body */
text-white dark:text-gray-100          /* CRITICAL: text-white always needs dark */

/* Backgrounds */
bg-white dark:bg-gray-900              /* Primary */
bg-gray-50 dark:bg-gray-800            /* Secondary */

/* Borders */
border-gray-200 dark:border-gray-700
```

---

## Code Patterns

**Translations** (no hardcoded text):
```typescript
const { t, locale } = useTranslation();
return <button>{t('addToCart')}</button>;
```

**Protected API route**:
```typescript
import { requireAuth } from '@/lib/auth/session';
import { withCSRFProtection } from '@/lib/security/csrf';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';

export default withRateLimit(RATE_LIMITS.CREATE,
  withCSRFProtection(async (req, res) => {
    const session = await requireAuth(req, res, ['admin', 'editor']);
    if (!session) return;
    // handler logic
  })
);
```

**Dynamic import** (for client-only components):
```typescript
const Editor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });
```

**Error logging**:
```typescript
import * as Sentry from "@sentry/nextjs";
Sentry.captureException(error);
```

---

## Image Limits

| Directory | Max Size | Fix Command |
|-----------|----------|-------------|
| `public/optimized/blog/` | 800×800px | `sips -Z 800 public/optimized/blog/*.jpg` |
| `public/optimized/` | 3200×3200px | `sips -Z 3200 <file>` |
| `public/images/products/` | 1200×1800px | `sips -Z 1200 <file>` |

---

## Rate Limits

Configured in `src/lib/security/rate-limit.ts`:

| Type | Window | Max | Use For |
|------|--------|-----|---------|
| AUTH | 15 min | 5 | Login, password reset |
| CREATE | 1 min | 10 | Form submissions, comments |
| UPLOAD | 1 min | 5 | File uploads |

---

## Spec Workflow

| Change Type | Action |
|-------------|--------|
| Bug fix, typo, config, single file | Just do it |
| User gives explicit instructions | Just do it |
| Multi-file feature, architecture, unclear requirements | Use spec workflow |

**Spec workflow**: Create `.specs/[feature-name]/` with requirements → design → tasks. Each phase needs approval.

---

## Ask First

These require explicit user approval before implementing:
- PWA prompts or push notifications
- Popups, modals, or interstitials
- New third-party integrations
- Browser permission requests
- Email capture forms

**Why**: These affect UX significantly and may have legal/privacy implications.

---

## Content Writing

**Before writing ANY product content**, read: `/content/content-guidelines.md`

Critical rules:
- Never use "safe" → use "non-toxic", "food-grade", "pet-friendly"
- Never fabricate statistics, reviews, or image paths
- Product is **activated carbon** (coconut shell), lasts **7+ days**
- No competitor comparisons → use partnership positioning

---

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Yes | Session encryption key |
| `NEXTAUTH_URL` | Yes | App URL for auth callbacks |
| `STRIPE_SECRET_KEY` | Yes | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook verification |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe client key |
| `RESEND_API_KEY` | Yes | Email sending |
| `ANTHROPIC_API_KEY` | Yes | AI content generation |
| `CRON_SECRET` | Yes | Cron job authentication |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Hot reload broken | `npm run predev && npm run dev` |
| Dark mode validation failing | Add missing `dark:*` variants |
| Translation missing | Add key to all files in `src/translations/` |
| Type errors after schema change | `npx prisma generate` |
| E2E tests failing locally | Check `npm run dev` is running |
| Stripe webhooks not working locally | Run `stripe listen --forward-to localhost:3000/api/webhooks/stripe` |

---

## Tech Stack

Next.js 16 (Pages Router) • React 19 • TypeScript • Tailwind CSS • Radix UI • PostgreSQL • Prisma • NextAuth.js • Stripe • TipTap • Sentry • Vercel
