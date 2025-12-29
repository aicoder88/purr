# CLAUDE.md

## Build-Breaking Requirements

**These will fail the build. No exceptions.**

```bash
# Run before commit
npm run lint && npm run check-types && npm run validate-dark-mode && npm run validate-images
```

- **Dark mode on EVERY element** - pair light + dark variants
- **TypeScript strict** - no `any` types, 0 errors
- **ESLint clean** - 0 warnings
- **Image limits enforced** - see limits below

---

## When to Use Specs vs Just Do It

| Situation | Action |
|-----------|--------|
| Bug fix, typo, config change, single file | Just do it |
| User gives explicit implementation details | Just do it |
| New feature spanning multiple files | Use spec workflow |
| Architecture changes | Use spec workflow |
| Unclear requirements | Use spec workflow |

**Spec workflow:** Requirements → Design → Tasks → Execute. Each phase needs approval before proceeding. Store specs in `.specs/[feature-name]/`. See `spec-driven-protocol.md` for full reference.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (Pages Router) + React 19 + TypeScript |
| Styling | Tailwind CSS + Radix UI (shadcn/ui) |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js (JWT, roles: admin/editor/user) |
| Payments | Stripe |
| Blog | TipTap + filesystem JSON (`/content/blog/{locale}/*.json`) |
| Monitoring | Sentry |
| Deploy | Vercel (Node.js 22.x) |

---

## Dark Mode Reference

```css
text-gray-900 dark:text-gray-50        /* Headings */
text-gray-700 dark:text-gray-200       /* Body */
bg-white dark:bg-gray-900              /* Primary bg */
bg-gray-50 dark:bg-gray-800            /* Secondary bg */
border-gray-200 dark:border-gray-700   /* Borders */
text-white dark:text-gray-100          /* CRITICAL: text-white always needs dark */
```

---

## Image Limits

| Directory | Max Size |
|-----------|----------|
| `public/optimized/blog/` | 800×800px (STRICT) |
| `public/optimized/` | 3200×3200px |
| `public/images/products/` | 1200×1800px |

Fix: `sips -Z 800 public/optimized/blog/*.jpg`

---

## Key Patterns

**Translations** - no hardcoded text:
```typescript
const { t, locale } = useTranslation();
return <button>{t('addToCart')}</button>;
```

**Protected API Route:**
```typescript
import { requireAuth } from '@/lib/auth/session';
import { withCSRFProtection } from '@/lib/security/csrf';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';

export default withRateLimit(RATE_LIMITS.CREATE,
  withCSRFProtection(async (req, res) => {
    const session = await requireAuth(req, res, ['admin', 'editor']);
    if (!session) return;
    // Protected logic
  })
);
```

**Dynamic Import:**
```typescript
const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });
```

**Sentry:**
```typescript
import * as Sentry from "@sentry/nextjs";
Sentry.captureException(error);
```

---

## Commands

```bash
npm run dev                    # Start dev server
npm run predev                 # Clear cache if hot reload stuck
npm run build                  # Production build
npm run test:translations      # Check all locales complete
npm run optimize-images:enhanced  # Auto-optimize images
npx prisma studio              # Database GUI
```

---

## Rate Limits

| Type | Window | Max |
|------|--------|-----|
| AUTH | 15 min | 5 |
| CREATE | 1 min | 10 |
| UPLOAD | 1 min | 5 |

---

## ASK FIRST

PWA prompts, push notifications, popups/modals, new third-party integrations, browser permission requests, email capture modals.

---

## Content Rules

No direct competitor comparisons. Use partnership positioning:
- ❌ "Better than local pet stores"
- ✅ "Ask your local pet store to stock Purrify"

---

## CRITICAL: Product Content Verification

**BEFORE writing ANY marketing/product content, ALWAYS:**

1. **Read existing product descriptions first:**
   ```bash
   grep -n "activated carbon\|coconut" src/translations/en.ts | head -20
   ```

2. **Verify product claims against existing content** - NEVER assume or invent:
   - Purrify is **ACTIVATED CARBON** (coconut shell), NOT zeolite
   - Protection lasts **7+ days**, not 30 days
   - Made from **coconut shell activated carbon**

3. **Cross-reference before creating new pages:**
   - Check `siteDescription` in translations
   - Check existing FAQ answers
   - Check product descriptions

4. **NEVER fabricate statistics or social proof:**
   - No invented review counts ("500 reviews")
   - No invented customer counts ("10,000+ happy cats")
   - No invented ratings ("4.9 stars")
   - Use ONLY numbers that exist in the codebase, or omit the section entirely

5. **NEVER reference images that don't exist:**
   ```bash
   # Before using any image path, verify it exists:
   ls -la public/images/path/to/image.webp
   ```
   - Only use images already in the codebase
   - If an image is needed but doesn't exist, note it as `[IMAGE NEEDED: description]`

**NEVER fabricate product ingredients, duration claims, statistics, or image paths.**

---

## Key Paths

| Purpose | Path |
|---------|------|
| Blog content | `/content/blog/{en,fr,zh}/*.json` |
| Translations | `src/translations/{en,fr,zh}.ts` |
| Security middleware | `src/lib/security/` |
| Auth utilities | `src/lib/auth/session.ts` |
| Prisma schema | `prisma/schema.prisma` |

---

## Environment Variables

Required: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `RESEND_API_KEY`, `ANTHROPIC_API_KEY`, `CRON_SECRET`, `NEXT_PUBLIC_SITE_URL`

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Hot reload broken | `npm run predev && npm run dev` |
| Dark mode validation failing | Add missing `dark:*` variants |
| Translation missing | Add to all locale files in `src/translations/` |
