# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 🧠 Core Thinking Principles

### 1. Think Before Coding
- **Clarify ambiguity**: If a request could mean A or B, ask "Did you mean A or B?" before writing code.
- **State your plan**: Before multi-file changes, write a 3-line plan: "1. Edit X, 2. Update Y, 3. Verify with Z".
- **Surface tradeoffs**: If there's a simpler approach, say "Option A is faster but less flexible. Option B is more robust. Which do you prefer?"
- **Verify resources exist**: See the "No Fabrication Rule" below—never assume files, URLs, or contact info.

### 2. Simplicity First
- **One-use code stays inline**: Don't extract to a utility unless it's used 2+ times.
- **Prefer stdlib over npm**: If Node.js or the browser can do it natively, don't install a package.
- **Delete dead code**: If your change makes something unused, remove it in the same commit.

### 3. Surgical Changes
- **Match the file's existing style**: If the file uses `function foo()`, don't add `const foo = () =>`.
- **Don't touch unrelated code**: If you see a typo in a comment 50 lines away, mention it—don't fix it silently.
- **Small diffs**: A 10-line change shouldn't produce a 200-line diff.

### 4. Goal-Driven Execution
- **Verify changes work**: Run `pnpm build` or `pnpm lint` after edits. Don't assume success.
- **Loop on failure**: If a command fails, read the error and fix it. Don't move on.
- **Localhost Issues**: Start local server (`pnpm dev`) immediately when localhost pages don't work. Don't try to open more pages.

### 5. Strict Branding & Visuals (UPDATED)
- **Image Storage**: All new images must be stored in `public/images`, then optimized to `public/optimized`. **NO other image folders** allowed (not even for blog).
- **No Labels**: Never use labels on bags or bottles in generated images.
- **No Black Dust**: Never show black clouds or black dust; it looks like dirt.
- **Odor Direction**: Odor must be shown being **sucked IN** to the carbon or trapped inside. Never releasing out.
- **No Product Generation**: NEVER generate images of Purrify bags, boxes, or logos. Use existing assets only.
- **Terminology**: "Purrify" is **granules**, NOT "powder". It is an "additive".
- **Capitalization**: Always "Purrify" (Capitalized).

### 6. Coding Standards (UPDATED)
- **No Hardcoded Text**: All user-facing text must be in `src/translations/*.ts`.
- **Light/Dark Mode**: 
    - text-white must ALWAYS have a colored/dark background.
    - EVERY text element must have a specific color for both modes. 
    - **Never** allow white text on white backgrounds.
    - Example: `text-gray-900 dark:text-white`
    - Validate with `pnpm validate-dark-mode`.

---

## 🚀 Quick Start (New Developers)

```bash
# 1. Install dependencies (MUST use pnpm)
pnpm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your credentials

# 3. Set up database
pnpm prisma generate
pnpm prisma migrate dev

# 4. Start development server
pnpm dev

# 5. Before committing - ALL must pass
pnpm lint && pnpm check-types && pnpm validate-dark-mode && pnpm validate-images && pnpm validate-hydration
```

**First time here?** Read the "No Fabrication Rule" and "Hydration Safety" sections below.

---

## 📦 Package Manager: pnpm ONLY

**CRITICAL:** This project uses **pnpm exclusively**. Do NOT use npm or yarn.

```bash
# ✅ Correct
pnpm install
pnpm add package-name
pnpm dev

# ❌ Never use
npm install
yarn add
```

**Why pnpm?** Dependencies are shared via global content-addressable store at `~/Library/pnpm/store`, saving disk space and improving install speed.

---

## 🚫 CRITICAL: No Fabrication Rule

**NEVER fabricate or assume the existence of:**

- ❌ Contact info (phone numbers, emails, addresses)
- ❌ Social media (handles like @username, hashtags like #BrandName)
- ❌ File paths (images, PDFs, logos, assets)
- ❌ URLs (subdomains, pages, external links)
- ❌ Branding elements (slogans, campaign names)
- ❌ Identifiers (SKUs, tracking codes, API keys)

**Instead:**

1. **VERIFY FIRST**: Check if it exists in the codebase
   ```bash
   ls public/images/               # Check images
   grep -r "@" app/ pages/         # Find social handles
   grep -r "mailto:" app/ pages/   # Find emails
   ```

2. **ASK THE USER**: If you can't verify it exists, ASK before using it
   - "What email should I use here?"
   - "What's the official social media handle?"
   - "Which image should I use for this?"

3. **USE EXISTING ONLY**: Only use verified, existing resources

**Real examples of fabrications to avoid:**
- `@PurrifyPets` (wrong, actual: `@purrifyhq`)
- `#PurrifyFresh` (doesn't exist, no official hashtags)
- `/images/logo.png` (doesn't exist, use `/images/icon-512.png`)
- `hello@purrify.ca` (verify first, don't assume)

**Why this matters:** Fabricated contact info breaks user trust, creates 404s, sends customers to wrong places, and damages SEO. When in doubt, ASK.

See [docs/NO_FABRICATION_RULE.md](docs/NO_FABRICATION_RULE.md) for complete guidelines.

---

## 📁 Project Structure

| Directory | Purpose | Naming Convention |
|-----------|---------|-------------------|
| `app/` | App Router pages (Route groups, layouts, error handling) | `page.tsx`, `layout.tsx` |
| `app/api/` | API routes (Route handlers) | kebab-case: `my-endpoint/route.ts` |
| `app/(main)/` | Main website route group | Subdirectories with `page.tsx` |
| `app/admin/` | Admin dashboard | `page.tsx`, `layout.tsx` |
| `src/components/` | React components | PascalCase: `MyComponent.tsx` |
| `src/lib/` | Shared utilities | kebab-case files, named exports |
| `src/hooks/` | Custom React hooks | `use` prefix: `useMyHook.ts` |
| `src/translations/` | i18n translations | `{en,fr,zh,es}.ts` |
| `content/blog/` | Blog post content | JSON files per language |
| `public/images/` | Static images | See Image Limits section |
| `prisma/` | Database schema | `schema.prisma`, migrations |
| `scripts/` | Utility scripts | See Scripts section |
| `e2e/` | Playwright tests | `*.spec.ts` |
| `__tests__/` | Jest unit tests | `*.test.ts` |
| `docs/` | Extended documentation | Markdown files |

**Auth middleware:** `proxy.ts` (NOT `middleware.ts` - Next.js 16 change)

---

## ⚡ Common Commands

### Development
```bash
pnpm dev                    # Start dev server (localhost:3000)
pnpm predev                 # Clear webpack cache (if hot reload breaks)
pnpm build                  # Production build
pnpm start                  # Start production server
```

### Pre-Commit Validation (ALL must pass)
```bash
pnpm lint                   # ESLint (includes hydration checks)
pnpm check-types            # TypeScript strict mode
pnpm validate-dark-mode     # Check dark: variants exist
pnpm validate-images        # Check image size limits
pnpm validate-hydration     # Check for hydration anti-patterns
```

### Testing
```bash
pnpm test                   # Run Jest unit tests
pnpm test:watch             # Jest watch mode
pnpm test:coverage          # Generate coverage report
pnpm test:translations      # Validate translation completeness

pnpm test:e2e               # Run Playwright e2e tests
pnpm test:e2e:ui            # Playwright with UI
pnpm test:e2e:security      # Security-specific e2e tests
pnpm e2e:web                # Web-only e2e tests
```

### Database (Prisma)
```bash
pnpm prisma studio          # Open database GUI (localhost:5555)
pnpm prisma generate        # Regenerate Prisma client (after schema changes)
pnpm prisma migrate dev     # Create and run new migration
pnpm prisma migrate reset   # Reset database (DESTRUCTIVE - dev only)
```

### Blog Management
```bash
pnpm blog:auto:generate     # Generate blog posts with AI
pnpm blog:migrate           # Migrate blog post format
pnpm repair-blog            # Fix broken blog posts
pnpm validate-blog-images   # Check blog image compliance
```

### Image Management
```bash
pnpm generate-image --prompt "description" --output "filename.jpg"
pnpm optimize-images        # Basic optimization
pnpm optimize-images:enhanced  # Advanced optimization (preferred)
pnpm optimize-images:watch  # Watch and auto-optimize
pnpm validate-images        # Check size limits
```

### SEO & Validation
```bash
pnpm seo:validate           # Lenient validation (same as prebuild)
pnpm seo:validate:strict    # Strict validation (fails on any error)
pnpm seo:validate:report    # Generate detailed SEO report
pnpm seo:health-check       # Overall SEO health
pnpm validate-links         # Check for broken links
pnpm validate-schemas       # Validate JSON-LD structured data
pnpm validate-sitemap       # Validate sitemap integrity
```

### Debugging & Performance
```bash
pnpm analyze                # Bundle size analysis
pnpm bundle:analyze         # Detailed bundle analysis
pnpm performance:audit      # Full performance audit
vercel logs <deployment-url> # View production logs
```

---

## 🗄️ Database Workflow

### Schema Changes
1. Edit `prisma/schema.prisma`
2. Run `pnpm prisma migrate dev --name describe_change`
3. Run `pnpm prisma generate` to update client
4. Restart dev server

### Common Tasks
```bash
# View/edit data in browser
pnpm prisma studio

# Reset database (development only!)
pnpm prisma migrate reset

# Check migration status
pnpm prisma migrate status

# Apply pending migrations (production)
pnpm prisma migrate deploy
```

**Production:** Migrations run automatically via `postinstall` hook in Vercel.

---

## 📝 Blog Content System

### File Structure
```
content/blog/
├── en/*.json          # English posts
├── fr/*.json          # French posts
├── zh/*.json          # Chinese posts
└── es/*.json          # Spanish posts
```

### Manual Blog Post Creation
1. Create JSON file: `content/blog/en/my-post-slug.json`
2. Follow structure in [docs/BLOG_STYLE_GUIDE.md](docs/BLOG_STYLE_GUIDE.md)
3. Add translations in `/fr/`, `/zh/`, `/es/` with same slug
4. Validate: `pnpm validate-blog-images`

### Blog Post Structure
```json
{
  "title": "Post Title (10-100 chars)",
  "slug": "url-friendly-slug",
  "excerpt": "Preview text (50-200 chars)",
  "content": "Full HTML content (2000+ words)",
  "featuredImage": "/optimized/image-name.jpg",
  "publishedAt": "2024-01-27T00:00:00.000Z",
  "category": "cat-health",
  "tags": ["litter-box", "odor-control"],
  "author": "Purrify Team"
}
```

### Word Count Guidelines
- **Tier 1 Listicles:** 2,400-2,800 words
- **Tier 1 Problem-Solve:** 2,200-2,600 words
- **Tier 2 Litter-Specific:** 1,800-2,200 words
- **Tier 3 Lifestyle/Story:** 2,000-2,400 words
- **Tier 4 City-Specific:** 1,600-2,000 words

**See [docs/BLOG_STYLE_GUIDE.md](docs/BLOG_STYLE_GUIDE.md) for complete guidelines.**

---

## 🖼️ Image Workflow

### Image Size Limits
| Directory | Max Dimensions | Fix Command |
|-----------|----------------|-------------|
| `public/optimized/` | 800×800px | `sips -Z 800 public/optimized/*.jpg` |
| `public/optimized/` | 3200×3200px | `sips -Z 3200 <file>` |
| `public/images/products/` | 1200×1800px | `sips -Z 1200 <file>` |

### Workflow: Raw → Optimized → Deployed
1. Place original in `public/original-images/`
2. Run `pnpm optimize-images:enhanced`
3. Optimized image appears in `public/optimized/`
4. Reference optimized path in code: `/optimized/image.jpg`

### AI Image Generation
```bash
pnpm generate-image \
  --prompt "A fluffy orange cat in sunlit window, Studio Ghibli style" \
  --output "blog-hero-cats-sunbathing.jpg"
```

**NEVER generate product images with AI.** Product photos must be real. AI can only edit/improve existing product images.

**OK to generate:** blog heroes, lifestyle scenes, illustrations, diagrams.

**Prompt style:** warm, friendly, fun, cute, beautiful, Studio Ghibli-inspired.

---

## 🌐 Localization (i18n)

### Supported Languages
- `en` - English (default)
- `fr` - French (CA)
- `zh` - Chinese (Simplified)
- `es` - Spanish

### Terminology Rules
- **Purrify is NOT a powder**: Use "granules" or "additive". Never use "powder" when referring to the product.
- **Tone**: Professional yet warm, science-backed but accessible.

### Adding a Translation Key
1. Add to ALL files in `src/translations/`:
   - `en.ts`, `fr.ts`, `zh.ts`, `es.ts`
2. Use the same key structure in each file
3. No hardcoded user-facing text.
4. Validate: `pnpm test:translations`

### Usage in Components
```typescript
import { useTranslation } from '@/hooks/useTranslation';

function MyComponent() {
  const { t, locale } = useTranslation();
  return <button>{t('addToCart')}</button>;
}
```

**NEVER hardcode user-facing text.** Always use translation keys.

---

## 🔐 Admin Panel

### Access Levels
- **Admin:** Full access to all sections
- **Editor:** Content management only (blog, pages)

### Admin Routes
- `/admin/blog` - Blog post management
- `/admin/ops` - Operations dashboard
- `/admin/seo` - SEO monitoring
- `/admin/analytics` - Analytics dashboard

### Login
1. Ensure `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`
2. Visit `/admin/login`
3. Use credentials from env vars

---

## 💳 Stripe Integration

### Local Development Setup
1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Login: `stripe login`
3. Forward webhooks to local:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copy webhook signing secret to `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### Testing Payments Locally
1. Use Stripe test cards: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC

### Debugging Stripe
```bash
# View webhook events
stripe listen --print-secret

# View recent events
stripe events list

# Test webhook locally
stripe trigger payment_intent.succeeded
```

---

## 🎨 Dark Mode (Required)

Every element needs both light and dark variants. The `validate-dark-mode` script enforces this.

### Color Patterns
```css
/* Text */
text-gray-900 dark:text-gray-50        /* Headings */
text-gray-700 dark:text-gray-200       /* Body */
text-white dark:text-gray-100          /* CRITICAL: text-white always needs dark */

/* Backgrounds */
bg-white dark:bg-gray-900              /* Primary */
bg-gray-50 dark:bg-gray-800            /* Secondary */
bg-gray-100 dark:bg-gray-700           /* Tertiary */

/* Borders */
border-gray-200 dark:border-gray-700
border-gray-300 dark:border-gray-600

/* Interactive states */
hover:bg-gray-100 dark:hover:bg-gray-700
focus:ring-blue-500 dark:focus:ring-blue-400
```

### Common Mistakes
❌ `text-white` without `dark:` variant
❌ `bg-white` without `dark:bg-gray-900`
❌ Using fixed colors in gradients (check both modes)

---

## ♿ Accessibility

### Focus States
```tsx
// Visible focus for keyboard navigation
<button className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
  Click me
</button>
```

### ARIA Labels
```tsx
// Icons need labels
<button aria-label="Close menu">
  <XIcon className="h-5 w-5" />
</button>

// Form inputs need associated labels
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

### Semantic HTML
- Use `<button>` for actions, `<a>` for navigation
- Use heading hierarchy (`h1` → `h2` → `h3`)
- Use `<nav>`, `<main>`, `<article>` appropriately

---

## 🚨 Hydration Safety & Authentication

**CRITICAL:** Never conditionally return `null` in page components based on client state. This causes hydration mismatches between server and client.

### ❌ FORBIDDEN Pattern (Hydration Mismatch)

```typescript
// ❌ NEVER DO THIS - Causes hydration errors
export default function MyPage() {
  const { data: session } = useSession();

  // PROBLEM: Server renders <Content />, client may render nothing
  if (session?.user?.status !== 'approved') {
    return null; // ❌ HYDRATION MISMATCH
  }

  return <Content />;
}
```

**Why this fails:** Server always renders `<Content />` during SSR. Client-side code may conditionally render `null`. React expects identical markup but finds different trees, causing hydration errors.

### ✅ SAFE Pattern #1: Server-Side Redirect (Preferred)

```typescript
// ✅ BEST: Redirect happens before component renders
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';

export default async function MyPage() {
  const session = await getSession();

  if (!session?.user || session.user.status !== 'approved') {
    redirect('/login'); // ✅ Server-side redirect, no hydration risk
  }

  // Component always renders for authorized users only
  return <Content user={session.user} />;
}
```

**Benefits:** Zero hydration risk, SEO-friendly, immediate redirect, no client-side flash.

### ✅ SAFE Pattern #2: Loading States (For Client-Side Auth)

```typescript
// ✅ GOOD: Always return a component, never null
export default function MyPage() {
  const { data: session, status } = useSession();

  // Show loading state while checking auth
  if (status === 'loading') {
    return <LoadingSpinner />; // Component, not null
  }

  // Show access denied for unauthorized users
  if (!session?.user || session.user.status !== 'approved') {
    return <AccessDeniedPage />; // Component, not null
  }

  // Show content for authorized users
  return <Content user={session.user} />;
}
```

**Benefits:** Consistent render tree, no hydration errors, good UX with loading feedback.

### ✅ SAFE Pattern #3: Error Pages for Missing Data

```typescript
// ✅ GOOD: Return error component instead of null
export default function MyPage() {
  const { t } = useTranslation();

  // Handle missing translations gracefully
  if (!t.mySection) {
    return (
      <ErrorPage
        title="Page Temporarily Unavailable"
        message="Please try refreshing or come back later."
      />
    ); // Full component, not null
  }

  return <Content />;
}
```

### Code Review Checklist

Before merging any page component:

- [ ] Does the component ever `return null` conditionally?
- [ ] If using client-side auth, does it show loading/error states?
- [ ] Are auth checks done server-side with `redirect()` when possible?
- [ ] Does every render path return a valid React element?

**See [docs/HYDRATION_SAFETY.md](docs/HYDRATION_SAFETY.md) for complete guide.**

---

## 💰 Currency System

**Geo-based currency detection** using Vercel Edge headers (`x-vercel-ip-country`):
- US visitors → USD
- All others → CAD (fallback)
- 1:1 price conversion (same numbers, different currency)
- No currency codes displayed (always show `$`)

### Usage in Components
```typescript
import { useCurrency } from '@/lib/currency-context';

function ProductPage() {
  const { currency, formatPrice } = useCurrency();

  // Get price with currency
  const price = getProductPrice('standard', currency);

  // Format price with currency
  const formatted = formatPrice(price, locale);

  return <div>{formatted}</div>;
}
```

### Usage in API Routes
```typescript
import { detectCurrencyFromRequest } from '@/lib/geo/currency-detector';

export async function GET(req: Request) {
  const currency = detectCurrencyFromRequest(req);
  // Use currency in logic
  return Response.json({ currency });
}
```

### Database
- Order model has `currency` field (CAD or USD)
- Always store currency with order for accurate reporting
- Indexed for query performance

### Structured Data (JSON-LD)
Always use dynamic currency in schema markup:
```typescript
const { currency } = useCurrency();

const schema = {
  "@type": "Product",
  "offers": {
    "@type": "Offer",
    "priceCurrency": currency, // Not hardcoded "CAD"
    "price": price
  }
};
```

**Key files:**
- `src/lib/geo/currency-detector.ts` - Server-side detection
- `src/lib/currency-context.tsx` - React context
- `src/lib/pricing.ts` - Pricing functions
- `src/lib/constants.ts` - USD_PRICES map
- `app/layout.tsx` - CurrencyProvider integration (root layout)

---

## 🔒 Code Patterns

### App Router Code Patterns

```ts
// Server Component (default) - async data fetching
export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}

// Client Component - interactive UI
'use client';
export default function ClientComponent() {
  const [state, setState] = useState();
  return <div>...</div>;
}

// API Route (App Router Route Handler)
export async function GET(req: Request) {
  const data = await fetchData();
  return Response.json(data);
}

// Protected API Route
import { requireAuth } from '@/lib/auth/session';
import { withCSRFProtection } from '@/lib/security/csrf';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';

export async function GET(req: Request) {
  return withRateLimit(RATE_LIMITS.READ,
    withCSRFProtection(async () => {
      const session = await requireAuth(req, ['admin', 'editor']);
      if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });
      // handler logic
      return Response.json(data);
    })
  );
}
```

### Rate Limits
Configured in `src/lib/security/rate-limit.ts`:

| Type | Window | Max | Use For |
|------|--------|-----|---------|
| AUTH | 15 min | 5 | Login, password reset |
| CREATE | 1 min | 10 | Form submissions, comments |
| UPLOAD | 1 min | 5 | File uploads |

### Dynamic Import (Client-Only Components)
```typescript
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('@/components/admin/RichTextEditor'),
  { ssr: false }
);
```

### Error Handling with Sentry
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

## 🧪 Testing Patterns

### When to Write Each Type

| Test Type | When to Use | Location |
|-----------|-------------|----------|
| **Unit Test** | Pure functions, utilities, hooks | `__tests__/` |
| **Integration Test** | API routes, database operations | `__tests__/api/` |
| **E2E Test** | User flows, critical paths | `e2e/` |

### Unit Test Structure
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

### E2E Test Structure
```typescript
test('user can complete checkout', async ({ page }) => {
  await page.goto('/products');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="checkout"]');
  await expect(page.locator('h1')).toContainText('Order Confirmed');
});
```

### Running Specific Tests
```bash
# Single unit test file
pnpm test __tests__/utils/pricing.test.ts

# Single e2e test file
pnpm test:e2e e2e/checkout.spec.ts

# Tests matching pattern
pnpm test -- --testNamePattern="should calculate price"
```

---

## 📊 SEO Validation

### Two Different Scripts - Know the Difference!

| Script | Purpose | Failure Behavior | When to Use |
|--------|---------|------------------|-------------|
| `scripts/seo/prebuild-validation.ts` | **Automated builds** | Only fails on **critical** issues | CI/CD, `prebuild` script |
| `scripts/seo/validate-seo-compliance.ts` | **Manual validation** | Fails on errors when `--fail-on-error` used | Local dev, debugging |

### Correct Prebuild Configuration

```json
"prebuild": "node scripts/validate-no-middleware.js && tsx scripts/seo/prebuild-validation.ts && node scripts/vercel-prebuild.js"
```

**Why:** `prebuild-validation.ts` is lenient by design. It allows builds to proceed with non-critical issues (orphan pages, image warnings) but fails only on critical SEO problems.

### Manual Validation Commands

```bash
# Lenient validation (same as prebuild)
pnpm seo:validate

# Strict validation (fails on any error)
pnpm seo:validate:strict

# Generate detailed report
pnpm seo:validate:report

# Specific validations
pnpm seo:validate:images       # Image alt text, sizes
pnpm seo:validate:canonicals   # Canonical URL issues
pnpm seo:validate:reviews      # Review schema validation
```

### Common Issue: Build Failing on Orphan Pages

If builds fail with "85+ pages with 0 incoming links detected":

**Cause:** Using `validate-seo-compliance.ts --fail-on-error` in prebuild script

**Solution:** Use `prebuild-validation.ts` instead (see correct config above)

**Emergency bypass:** Set `SKIP_SEO_VALIDATION=true` environment variable

---

## 📝 Content Writing & Copywriting

**Before writing ANY customer-facing copy**, read: [docs/BLOG_STYLE_GUIDE.md](docs/BLOG_STYLE_GUIDE.md)

### Product Rules
- **Never use "safe"** → use "non-toxic", "food-grade", "pet-friendly"
- **Never fabricate** statistics, reviews, or image paths
- Product is **activated carbon** (coconut shell), lasts **7+ days**
- **No competitor comparisons** → use partnership positioning

### The Greased Slide Principle

Every piece of copy must flow like a **greased slide**. Once readers start, they can't stop.

**The goal:** "I only meant to skim the headline... but I read every word."

### Voice & Feel

Write like a **warm nuzzle from a cat**—comforting, genuine, impossible to ignore.

Blend these masters:

| Copywriter | What to Channel |
|------------|-----------------|
| **John Carlton** | Brutal directness. No throat-clearing. Get to the point like a punch. |
| **Gary Halbert** | Swagger and showmanship. Make every sentence sizzle. Inject personality. |
| **Gary Bencivenga** | Elegant proof. Stack credibility so high doubt crumbles. |
| **David Ogilvy** | Sophisticated clarity. Respect the reader's intelligence. |
| **Lorrie Morgan-Ferrero** | Feminine warmth. Conversational flow. Write like you're talking to a friend. |

### The Greased Slide Checklist

Before publishing any copy:

- [ ] **Headline hooks instantly** — Would you stop scrolling?
- [ ] **First line earns the second** — Does it create a question that demands an answer?
- [ ] **Every sentence pulls forward** — Read it aloud. Any friction? Any place to stop?
- [ ] **Bullets are mini-headlines** — Each one should make them hungry for more
- [ ] **Subheads re-hook scanners** — Someone skimming should get pulled back in
- [ ] **One clear action** — They know exactly what to do next
- [ ] **Zero wasted words** — If it doesn't earn its place, cut it

### What Kills the Slide

❌ **Throat-clearing intros** — "In today's world..." DELETE.
❌ **Corporate speak** — "Leverage synergies" makes people leave.
❌ **Weak verbs** — "Is," "was," "seems." Find the verb with muscle.
❌ **Buried leads** — The best sentence is hiding in paragraph three. Move it up.
❌ **Features without benefits** — They don't care what it does. They care what it does *for them*.
❌ **Long blocks of text** — Walls of words are walls to escape. Break it up.

---

## 🛠️ Common Scripts Reference

### Validation Scripts
```bash
# Dark mode compliance
pnpm validate-dark-mode

# Hydration safety patterns
pnpm validate-hydration

# Image size limits
pnpm validate-images

# Translation completeness
pnpm test:translations

# Link integrity
pnpm validate-links

# Structured data schemas
pnpm validate-schemas
```

### SEO Scripts
```bash
# SEO health check
pnpm seo:health-check

# Keyword analysis
pnpm seo:keywords

# Internal link analysis
pnpm seo:analyze-links

# Link equity optimization
pnpm seo:optimize-links
```

### Emergency/Repair Scripts
```bash
# Fix broken blog posts
pnpm repair-blog

# Clear webpack cache
pnpm clear-cache

# Purge Vercel cache
pnpm purge-vercel-cache
```

### Build Scripts
```bash
# Analyze bundle size
pnpm analyze

# Production build
pnpm build

# Performance audit
pnpm performance:audit
```

---

## 🌍 Environment Variables

### Required for Development

| Variable | Required | Purpose | Example |
|----------|----------|---------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection | `postgresql://...` |
| `NEXTAUTH_SECRET` | Yes | Session encryption key | Random 32+ chars |
| `NEXTAUTH_URL` | Yes | App URL for auth | `http://localhost:3000` |
| `STRIPE_SECRET_KEY` | Yes | Stripe API key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Yes | Webhook verification | `whsec_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe client key | `pk_test_...` |
| `RESEND_API_KEY` | Yes | Email sending | `re_...` |
| `ANTHROPIC_API_KEY` | Yes | AI content generation | `sk-ant-...` |
| `CRON_SECRET` | Yes | Cron job auth | Random string |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL | `https://www.purrify.ca` |

### Optional Development

| Variable | Purpose |
|----------|---------|
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `EDITOR_EMAIL` | Editor login email |
| `EDITOR_PASSWORD` | Editor login password |
| `GOOGLE_SHEETS_CLIENT_EMAIL` | Form submissions |
| `GOOGLE_SHEETS_PRIVATE_KEY` | Form submissions |

**Setup:** Copy `.env.local.example` to `.env.local` and fill in values.

---

## 🚧 Troubleshooting

### Hot Reload / Dev Server Issues

| Issue | Solution |
|-------|----------|
| Hot reload not working | `pnpm predev && pnpm dev` |
| Module not found after install | `pnpm install --force` |
| Port 3000 already in use | `lsof -ti:3000 \| xargs kill -9` then `pnpm dev` |
| Webpack cache issues | `pnpm clear-cache && pnpm dev` |

### Build Issues

| Issue | Solution |
|-------|----------|
| Build failing with SEO validation | Use `prebuild-validation.ts` not `validate-seo-compliance.ts` in prebuild |
| "Both middleware.ts and proxy.ts detected" | Delete `middleware.ts`, use only `proxy.ts` (Next.js 16) |
| Out of memory during build | Increase Node memory: `NODE_OPTIONS="--max-old-space-size=4096" pnpm build` |
| Type errors after schema change | `pnpm prisma generate` then restart dev server |

### Validation Failures

| Issue | Solution |
|-------|----------|
| Dark mode validation failing | Add missing `dark:*` variants (especially for `text-white`, `bg-white`) |
| Hydration validation failing | Replace conditional `return null` with components (see Hydration Safety) |
| Image validation failing | Resize images: `sips -Z 800 public/optimized/*.jpg` |
| Translation missing | Add key to ALL files in `src/translations/` |

### Database Issues

| Issue | Solution |
|-------|----------|
| Prisma Client not generated | `pnpm prisma generate` |
| Migration failed | Check `prisma/migrations` for conflicts, may need `pnpm prisma migrate reset` |
| Can't connect to database | Check `DATABASE_URL` in `.env.local`, verify network access |

### Testing Issues

| Issue | Solution |
|-------|----------|
| E2E tests failing locally | Ensure `pnpm dev` is running in another terminal |
| Jest tests hanging | May have open handles, check for missing `done()` or unresolved promises |
| Playwright browser not found | `pnpm playwright install` |

### Stripe Issues

| Issue | Solution |
|-------|----------|
| Webhooks not working locally | Run `stripe listen --forward-to localhost:3000/api/webhooks/stripe` |
| Payment test failing | Use test card `4242 4242 4242 4242` with any future date and CVC |
| Webhook signature error | Update `STRIPE_WEBHOOK_SECRET` from `stripe listen` output |

### Production Issues

| Issue | Solution |
|-------|----------|
| 500 errors in production | Check `vercel logs <deployment-url>` |
| Environment variable not available | Verify it's set in Vercel dashboard under Settings → Environment Variables |
| Stale content showing | Run `pnpm purge-vercel-cache` or clear in Vercel dashboard |

---

## 🎯 Ask Before Implementing

These features require explicit user approval before implementing:

- PWA prompts or push notifications
- Popups, modals, or interstitials
- New third-party integrations
- Browser permission requests
- Email capture forms
- Cookie consent banners

**Why:** These affect UX significantly and may have legal/privacy implications.

---

## 📚 Key Documentation Files

| File | Purpose |
|------|---------|
| [docs/BLOG_STYLE_GUIDE.md](docs/BLOG_STYLE_GUIDE.md) | Complete blog writing guide |
| [docs/NO_FABRICATION_RULE.md](docs/NO_FABRICATION_RULE.md) | Never fabricate info |
| [docs/HYDRATION_SAFETY.md](docs/HYDRATION_SAFETY.md) | Avoid hydration errors |
| [docs/OPTIMIZED_IMAGES.md](docs/OPTIMIZED_IMAGES.md) | Image optimization guide |
| [docs/README.md](docs/README.md) | Documentation structure |

---

## 🏗️ Tech Stack

**Framework:** Next.js 16 (App Router) • React 19 • TypeScript

**Styling:** Tailwind CSS • Radix UI • Framer Motion

**Database:** PostgreSQL (Supabase) • Prisma ORM

**Auth:** NextAuth.js (credentials + sessions)

**Payments:** Stripe (checkout + webhooks)

**Email:** Resend

**Content:** TipTap (rich text editor)

**i18n:** Custom translation system (4 languages)

**Testing:** Jest (unit) • Playwright (e2e)

**Monitoring:** Sentry • Vercel Analytics

**Deployment:** Vercel

**AI:** Anthropic Claude (content generation)

---

## 🎓 Learning Resources

### New to the Project?
1. Read this file completely
2. Review [docs/NO_FABRICATION_RULE.md](docs/NO_FABRICATION_RULE.md)
3. Review [docs/HYDRATION_SAFETY.md](docs/HYDRATION_SAFETY.md)
4. Set up local environment (see Quick Start)
5. Run all validations to ensure setup is correct

### Understanding the Codebase?
- `src/lib/` - Core utilities (auth, currency, pricing, security)
- `src/components/` - Reusable React components
- `app/` - Next.js App Router pages (routing)
- `app/api/` - API route handlers
- `src/translations/` - i18n strings

### Making Your First Change?
1. Create a feature branch: `git checkout -b feature/my-change`
2. Make your changes
3. Run all validations (see Pre-Commit Checklist)
4. Test locally
5. Commit with descriptive message
6. Push and create PR

---

## 🔄 App Router Migration Notes

### Key Differences from Pages Router

| Feature | Pages Router | App Router |
|---------|--------------|------------|
| **Components** | Client by default | Server by default |
| **Client Components** | No directive needed | `'use client'` directive required |
| **Data Fetching** | `getServerSideProps`, `getStaticProps` | Direct async/await in Server Components |
| **API Routes** | `pages/api/*.ts` with `handler(req, res)` | `app/api/*/route.ts` with `GET/POST/PUT/DELETE` |
| **SEO/Metadata** | `next-seo` or `<Head>` | Native `Metadata` API in `layout.tsx`/`page.tsx` |
| **Layouts** | `_app.tsx`, `_document.tsx` | Nested `layout.tsx` files |
| **Navigation** | `useRouter()` from `next/router` | `redirect()` from `next/navigation` |

### Server Components (Default)
- Can be async
- Can fetch data directly
- Cannot use hooks or browser APIs
- Smaller bundle size

### Client Components
- Must add `'use client'` at top of file
- Can use hooks and browser APIs
- Can have event handlers and state
- Interactivity only when needed

### Metadata API
```typescript
// In layout.tsx or page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
};
```

---

**Last Updated:** 2026-02-03
