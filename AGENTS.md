# Repository Guidelines

## Project Structure & Module Organization
React pages live in `pages/`; locales under `pages/[locale]/`, Stripe/webhooks in `pages/api/`, and long-form content in `pages/blog/` or `pages/learn/`. Shared UI sits in `src/components/{sections,ui,layout,mobile,social-proof,performance}` with SEO helpers in `src/components/seo`. Keep business logic in `src/lib/`, translations in `src/translations/{en,fr,zh,common}.ts`, types in `src/types/` and `types.ts`, schema in `prisma/schema.prisma`, assets in `public/`, and tests in `__tests__/` plus `e2e/`.

## Build, Test, and Development Commands
- `npm run predev && npm run dev`: prep caches and launch dev server; run `npm run clear-cache` if hot reloads stall.
- `npm run lint` + `npm run check-types`: pass ESLint and TS gates.
- `npm run validate-dark-mode` + `npm run validate-blog-images`: enforce theme and media.
- `npm run test:translations` + `npm run test:e2e -- --headed`: cover i18n and journeys.
- `npm run build && npm run start`: production validation.
- `npm run performance:audit` or `npm run analyze`: inspect perf and bundles.

## Coding Style & Naming Conventions
Ship TypeScript only; avoid `any` without approval. Prettier (2 spaces, single quotes) and ESLint set formatting—run lint before commits. Components, hooks, and providers use PascalCase; helpers stay camelCase. Pair text/background Tailwind classes with `dark:` variants. Pull copy through `useTranslation`; never hardcode strings or competitor names.

## Testing Guidelines
Keep Jest specs in `__tests__/` aligned with their feature names. Run `npm run test:translations` to keep en/fr/zh parity and name Playwright specs after each journey. Before a PR, rerun dark-mode and blog-image validators plus the unit or e2e suites touched.

## Commit & Pull Request Guidelines
Use `Type: concise summary` commit messages under 72 chars and stage generated assets separately. PRs must describe the change, link issues, and list local checks (lint, types, dark mode, blog images, translations, unit, e2e). Capture UI diffs with screenshots, log notable work in `CHANGELOG.md`, sync with maintainers before touching Stripe, analytics, or Prisma schema, and respect existing local edits. After merging, confirm the Vercel deployment hits `READY` and spot-check production flows.

## Content & Media Requirements
Blog posts need 3–4 cat-relevant images from approved sources (Unsplash, Pexels, Pixabay) wired into OG/Twitter meta tags. Follow the keyword strategy in `/docs/SEO_KEYWORD_STRATEGY.md` and `/docs/cat odor keywords.xlsx`, avoid money-back guarantee claims, and keep tone brand-safe. Re-run `npm run validate-blog-images` and spot-check responsive layouts whenever copy or assets change.
