# Repository Guidelines

## Project Structure & Module Organization
- Next.js 15 Pages Router; keep routing, data fetching, and locale folders in `pages/` (localized entries under `/[locale]/`) and leave Stripe/analytics handlers inside `pages/api/`.
- Shared UI sits in `src/components/{sections,ui,layout}` with structured-data helpers in `src/components/seo`.
- Core logic lives in `src/lib/` (cart + translation contexts, analytics utilities); keep shared types in `src/types` and `types.ts`.
- Translations belong in `src/translations/{en,fr,zh}.json`; update languages together to stay in sync.
- Quality tooling: Jest translation guard in `__tests__/`, Playwright journeys in `e2e/*.spec.ts`, static assets in `public/`, Prisma schema in `prisma/schema.prisma`, automation scripts under `scripts/`.

## Build, Test, and Development Commands
- `npm run predev` && `npm run dev` — clear webpack cache and start the local server.
- `npm run lint`, `npm run check-types`, `npm run validate-dark-mode` — non-negotiable gate before commits or PRs.
- `npm test` — translation completeness; keep running until all keys exist.
- `npm run test:e2e` — Playwright suites (`--headed` or `--project chromium` for debugging).
- `npm run build` followed by `npm run start` — compile and smoke-test the production bundle.
- `npm run performance:audit` or `npm run bundle:analyze` — generate performance/bundle reports in `reports/`.
- `npm run optimize-images` / `npm run optimize-all-images` keep assets lean; use `npm run clear-cache` when builds misbehave.

## Coding Style & Naming Conventions
- TypeScript only; avoid `any`, use React event typings, and follow Next.js ESLint guidance.
- Prettier defaults (two spaces, single quotes); every text/background Tailwind class needs a matching `dark:` variant.
- Components, hooks, and providers stay PascalCase; utilities remain camelCase; context providers live in `src/lib`.
- Pipe customer-facing copy through `useTranslation` and locale JSON—no inline literals.

## Testing & Quality Gates
- Keep Playwright filenames descriptive (e.g. `checkout-flow.spec.ts`) and add specs whenever flows change.
- Run `npm run validate-dark-mode` before every commit and verify each text/background class has a `dark:` partner.
- Record session notes in `CHANGELOG.md`; maintain WCAG AA contrast and ≥44px touch targets across breakpoints.

## Commit & Pull Request Guidelines
- Format subjects as `Type: concise summary` (≤72 chars) and scope each commit to one concern; stage generated artifacts separately.
- PRs must describe changes, link issues, list local verification (`npm run lint`, `npm test`, `npm run test:e2e`, etc.), attach before/after UI captures for visual shifts, and request review from the maintainer in `PROJECT_OVERVIEW.md`.
- Coordinate with maintainers before touching sensitive Stripe or analytics routes in `pages/api/`.
