# CLAUDE.md

> **Tech Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Supabase (PostgreSQL), Prisma, NextAuth.js, Stripe, Resend.

## 🧠 Core Thinking Principles
1. **Think Before Coding**: Clarify ambiguity, state your plan, surface tradeoffs.
2. **Simplicity First**: One-use code inline, prefer stdlib, delete dead code.
3. **Surgical Changes**: Match existing style, don't touch unrelated code, small diffs.
4. **Goal-Driven Execution**: Verify changes, loop on failure, fix localhost immediately.

## 🛡️ Project Rules
- **Package Manager**: `pnpm` ONLY. (Enforced by `preinstall`).
- **No Fabrication**: NEVER assume existence of contact info, URLs, or assets. Verify first, then ask. [Details](docs/NO_FABRICATION_RULE.md)
- **Hydration Safety**: NEVER conditionally return `null` in page components. Use `redirect()` or error components. [Details](docs/HYDRATION_SAFETY.md)
- **Branding**:
    - "Purrify" is **granules**, NOT "powder".
    - Capitalized "Purrify".
    - **Art Style**: Ghibli-reality fusion, vibrant Miyazaki colors. No product image generation.
    - **Odor**: Must be shown going **IN** to carbon.

## 💻 Coding Standards
- **i18n**: All user-facing text in `src/translations/*.ts`. No hardcoded strings.
- **Dark Mode**: Every element needs `dark:` variant. `text-white` needs `dark:text-gray-900`. Validate with `pnpm validate-dark-mode`.
- **Images**: Store in `public/images`, optimize to `public/optimized`. [Limits](docs/OPTIMIZED_IMAGES.md)
- **Env Vars**: See `.env.local.example` for required variables.

## 🛠️ Commands

### Development & Database
```bash
pnpm dev                    # Start server
pnpm build                  # Production build
pnpm prisma generate        # Update client
pnpm prisma migrate dev     # Create migration
pnpm prisma studio          # GUI
```

### Validation (Run before commit)
```bash
pnpm lint                   # ESLint
pnpm check-types            # TypeScript
pnpm validate-dark-mode     # UI checks
pnpm validate-images        # Size limits
pnpm validate-hydration     # Safety check
pnpm seo:validate           # SEO check
```

### Testing
```bash
pnpm test                   # Jest unit tests
pnpm test:e2e               # Playwright E2E
pnpm test:translations      # i18n completeness
```

### Content & Images
```bash
pnpm generate-image --prompt "desc" --output "file.jpg"
pnpm optimize-images:enhanced
pnpm blog:auto:generate
pnpm repair-blog            # Fix broken blog posts
```

### Troubleshooting
- **SEO Orphan Pages Build Failure**: Use `scripts/seo/prebuild-validation.ts` or set `SKIP_SEO_VALIDATION=true`.
- **Hot Reload Issues**: Run `pnpm predev && pnpm dev`.

## 📂 Project Structure
| Path | Purpose |
|------|---------|
| `app/` | App Router pages & API routes |
| `src/components/` | React components (PascalCase) |
| `src/lib/` | Utilities (kebab-case) |
| `src/translations/` | `{en,fr,zh,es}.ts` |
| `content/blog/` | JSON posts per language |
| `public/optimized/` | Optimized images (use these) |
| `docs/` | Documentation |

## 📚 Documentation Index
| Topic | File |
|-------|------|
| Blog Writing | [docs/BLOG_STYLE_GUIDE.md](docs/BLOG_STYLE_GUIDE.md) |
| Currency Logic | [docs/CURRENCY_SYSTEM.md](docs/CURRENCY_SYSTEM.md) |
| Stripe Setup | [docs/STRIPE_SETUP.md](docs/STRIPE_SETUP.md) |
| Hydration Safety | [docs/HYDRATION_SAFETY.md](docs/HYDRATION_SAFETY.md) |
| Fabrication Rule | [docs/NO_FABRICATION_RULE.md](docs/NO_FABRICATION_RULE.md) |
