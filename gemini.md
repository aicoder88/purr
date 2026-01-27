# Purrify Development & Content Generation Guidelines

This document serves as a persistent memory and guide for future development and content generation tasks, specifically for the "Purrify" project.

## 🚨 Core Mandates

### 📦 Package Manager: pnpm ONLY
**CRITICAL:** This project uses **pnpm exclusively**. Do NOT use npm or yarn.
*   **Install:** `pnpm install`
*   **Add:** `pnpm add package-name`
*   **Dev:** `pnpm dev`
*   **Run Scripts:** `pnpm script-name`

### 🚫 No Fabrication Rule
**NEVER fabricate or assume the existence of:**
*   ❌ Contact info (phone numbers, emails, addresses)
*   ❌ Social media (handles, hashtags)
*   ❌ File paths (images, PDFs, assets)
*   ❌ URLs (subdomains, pages, external links)
*   **VERIFY FIRST**: Check `public/`, `pages/`, or ask the user.
*   **See**: `docs/NO_FABRICATION_RULE.md`

### 💧 Hydration Safety
**CRITICAL:** Never conditionally return `null` in page components based on client state. This causes hydration mismatches.
*   **Bad:** `if (!session) return null;`
*   **Good:** Use server-side redirects (`getServerSideProps`) or return a loading/error component (`<LoadingSpinner />`).
*   **See**: `docs/HYDRATION_SAFETY.md`

## 🚀 Getting Started

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```
2.  **Set up environment variables:**
    ```bash
    cp .env.local.example .env.local
    # Fill in required variables (DATABASE_URL, NEXTAUTH_SECRET, etc.)
    ```
3.  **Database Setup:**
    ```bash
    pnpm prisma generate
    pnpm prisma migrate dev
    ```
4.  **Run Development Server:**
    ```bash
    pnpm dev
    ```

## 🛠️ Technology Stack

*   **Framework:** Next.js 16 (Pages Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, Radix UI, Framer Motion
*   **Database:** PostgreSQL (via Prisma ORM)
*   **Auth:** NextAuth.js
*   **Payments:** Stripe
*   **Email:** Resend
*   **Testing:** Jest (Unit), Playwright (E2E)
*   **Deployment:** Vercel
*   **AI:** Anthropic Claude (Content), FAL (Images)
*   **Monitoring:** Sentry, Vercel Analytics

## 📁 Project Structure

*   `pages/`: Next.js pages (routing). Kebab-case (`my-page.tsx`).
*   `pages/api/`: API endpoints.
*   `src/components/`: React components. PascalCase (`MyComponent.tsx`).
*   `src/lib/`: Shared utilities. Kebab-case.
*   `src/hooks/`: Custom React hooks (`useHook.ts`).
*   `src/translations/`: i18n translation files.
*   `content/blog/`: Blog posts in JSON format.
*   `public/`: Static assets.
    *   `public/optimized/`: Auto-optimized images.
    *   `public/original-images/`: Source images.
*   `prisma/`: Database schema and migrations.
*   `scripts/`: Maintenance and validation scripts.
*   `e2e/`: Playwright E2E tests.
*   `__tests__/`: Jest unit tests.

## 💻 Development Workflow

### Common Commands
*   `pnpm dev`: Start dev server.
*   `pnpm build`: Production build.
*   `pnpm lint`: Run ESLint.
*   `pnpm check-types`: Run TypeScript check.
*   `pnpm validate-dark-mode`: Check for missing dark mode classes.
*   `pnpm validate-images`: Check image size limits.

### Database (Prisma)
*   `pnpm prisma migrate dev`: Create/apply migrations (Dev).
*   `pnpm prisma generate`: Regenerate client after schema changes.
*   `pnpm prisma studio`: Open database GUI.

### Testing
*   `pnpm test`: Run Jest unit tests.
*   `pnpm test:e2e`: Run Playwright E2E tests.
*   `pnpm test:translations`: Verify translation completeness.

### Pre-Commit Checklist
Before committing, ensure these pass:
```bash
pnpm lint && pnpm check-types && pnpm validate-dark-mode && pnpm validate-images && pnpm validate-hydration
```

## 📝 Commit Message Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): description`

*   `feat`: New feature
*   `fix`: Bug fix
*   `chore`: Build/tooling changes
*   `docs`: Documentation
*   `style`: Formatting (no code change)
*   `refactor`: Code restructuring
*   `test`: Adding/updating tests

**Example:** `feat(blog): add new post about cat litter`

## 🎨 Content & Visuals

### Blog Workflow
1.  **Format:** JSON files in `content/blog/{lang}/`.
2.  **Images:**
    *   Source: `public/original-images/`
    *   Optimize: `pnpm optimize-images:enhanced`
    *   Use: `public/optimized/`
3.  **Generators:**
    *   `pnpm blog:auto:generate`: AI blog post generation.
    *   `pnpm generate-image`: AI image generation.

### Aesthetic Direction
*   **Style**: Studio Ghibli / Anime Aesthetic.
*   **Keywords**: "sparkling clean", "magical atmosphere", "cute cat", "warm lighting".
*   **Vibe**: Premium, charming, inviting. Avoid sterile stock photos.

### Technical Image Standards
*   **Classes**: Inline blog images MUST use:
    ```html
    class="w-full md:w-3/4 mx-auto rounded-xl shadow-lg"
    ```
*   **Dark Mode**: Ensure all UI elements have `dark:` variants.
    *   Text: `text-gray-900 dark:text-gray-50`
    *   Bg: `bg-white dark:bg-gray-900`

## 📊 SEO & Validation

### Validation Scripts
*   `scripts/seo/prebuild-validation.ts`: Lenient, for CI/CD.
*   `scripts/seo/validate-seo-compliance.ts`: Strict, for manual checks.

### Commands
*   `pnpm seo:validate`: Run standard validation.
*   `pnpm seo:validate:strict`: Fail on any error.
*   `pnpm seo:report`: Generate SEO report.
*   `pnpm validate-links`: Check for broken links.
*   `pnpm validate-schemas`: Validate JSON-LD.

## 🌍 Environment Variables

**Required in `.env.local`:**
*   `DATABASE_URL`
*   `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
*   `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
*   `RESEND_API_KEY`
*   `ANTHROPIC_API_KEY`
*   `CRON_SECRET`
*   `NEXT_PUBLIC_SITE_URL`

See `.env.local.example` for the full list.
