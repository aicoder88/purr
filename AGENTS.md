# Repository Guidelines

## Project Structure & Module Organization
Purrify ships on the Next.js Pages Router. Keep routing, data fetching, and locale-aware entry points inside `pages/`, while reusable UI and logic live in `src/components/` and `src/lib/`. Internationalized copy sits in `src/translations/` with structural types in `types.ts`; when you add a key, update en/fr/zh together. Static assets belong in `public/`, Prisma schema updates stay in `prisma/schema.prisma`, automation lives under `scripts/`, and Playwright/e2e helpers stay in `e2e/` alongside the Jest translation safety net in `__tests__/`.

## Build, Test, and Development Commands
- `npm run dev` – starts the dev server (runs `predev` first to clear the webpack cache).
- `npm run lint` / `npm run check-types` / `npm run validate-dark-mode` – mandatory trio before every PR; fail fast on ESLint, TypeScript, or dark-mode regressions.
- `npm test` – runs the translation completeness suite; resolve every warning by filling the referenced keys before merging.
- `npm run test:e2e` – executes Playwright specs; use `--headed` or `--project chromium` to debug CI-only flakes.
- `npm run build` / `npm run start` – production bundle build and smoke test (includes sitemap prebuild and enhanced sitemap generation).
- `npm run performance:audit` – full SEO/bundle/cache optimization pass with HTML/JSON reports in `reports/`.

## Coding Style & Naming Conventions
TypeScript is the default—prefer explicit interfaces over `any`, follow Prettier (two spaces, single quotes), and honour Next.js ESLint guidance. Components, hooks, and providers stay PascalCase; utilities remain camelCase. Tailwind classes must include matching `dark:` variants on every text or background element to satisfy the mandatory dark-mode validator.

## Dark Mode, i18n & Content Rules
All customer-facing copy flows through `useTranslation`; never inline strings. Maintain locale parity in en/fr/zh and avoid competitor brand references. Treat Stripe and analytics routes under `pages/api/` as protected; coordinate with maintainers before modifying payment logic. Uphold WCAG AA contrast and mobile tap targets ≥44px for every new UI change.

## Testing Guidelines
Use Playwright for customer journeys; keep specs named `*.spec.ts` in `e2e/`. Run `npm test` whenever you touch translations and copy the console’s missing-key list into your workflow until it’s empty. Extend the Jest assertions when you introduce new critical sections or placeholder formats.

## Commit & Pull Request Guidelines
Stick to the existing `Type: concise summary` convention (`Refactor:`, `Docs:`, `Perf:`) and keep subjects under 72 characters. Each commit should cover one concern—stage rebuilt assets or report updates separately. PRs must outline the change, link issues, list local verification (`npm run lint`, `npm test`, `npm run test:e2e`, etc.), and include before/after screenshots for UI shifts. Request a review from the maintainer in `PROJECT_OVERVIEW.md` and wait for approval before merging.
