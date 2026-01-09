# CLAUDE.md

## Pre-Commit Checklist

```bash
pnpm lint && pnpm check-types && pnpm validate-dark-mode && pnpm validate-images
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
pnpm dev                          # Start dev server
pnpm predev                       # Clear cache (use if hot reload breaks)

# Validation
pnpm lint                         # ESLint
pnpm check-types                  # TypeScript strict
pnpm validate-dark-mode           # Check dark: variants
pnpm validate-images              # Check image size limits

# Testing
pnpm test                         # Jest unit tests
pnpm test:watch                   # Jest watch mode
pnpm test:e2e                     # Playwright e2e tests
pnpm test:e2e:ui                  # Playwright with UI

# Build
pnpm build                        # Production build

# Database
pnpm dlx prisma studio            # Database GUI
pnpm dlx prisma migrate dev       # Run migrations

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

/* Interactive states */
hover:bg-gray-100 dark:hover:bg-gray-700
focus:ring-blue-500 dark:focus:ring-blue-400
```

---

## Accessibility

```tsx
/* Focus visible for keyboard navigation */
focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2

/* Interactive elements need labels */
<button aria-label="Close menu">
  <XIcon className="h-5 w-5" />
</button>

/* Form inputs need associated labels */
<label htmlFor="email">Email</label>
<input id="email" type="email" />
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

**Error handling**:
```typescript
import * as Sentry from "@sentry/nextjs";

try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error);
  return res.status(500).json({ error: 'Something went wrong' });
}
```

---

## Testing Patterns

**Unit test structure**:
```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const onSubmit = jest.fn();
    render(<ComponentName onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onSubmit).toHaveBeenCalled();
  });
});
```

**E2E test structure**:
```typescript
test('user can complete checkout', async ({ page }) => {
  await page.goto('/products');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="checkout"]');
  await expect(page.locator('h1')).toContainText('Order Confirmed');
});
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

**Spec workflow**: Create `.specs/[feature-name]/` with requirements → design → tasks. Each phase needs approval. See parent `CLAUDE.md` for full protocol.

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

**Before writing ANY product content**, read: `/docs/BLOG_STYLE_GUIDE.md`

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
| Hot reload broken | `pnpm predev && pnpm dev` |
| Dark mode validation failing | Add missing `dark:*` variants |
| Translation missing | Add key to all files in `src/translations/` |
| Type errors after schema change | `pnpm dlx prisma generate` |
| E2E tests failing locally | Check `pnpm dev` is running |
| Stripe webhooks not working locally | Run `stripe listen --forward-to localhost:3000/api/webhooks/stripe` |
| Module not found after install | `pnpm install --force` |

---

## Tech Stack

Next.js 16 (Pages Router) • React 19 • TypeScript • Tailwind CSS • Radix UI • PostgreSQL • Prisma • NextAuth.js • Stripe • TipTap • Sentry • Vercel
