# Repository Guidelines

## Project Structure & Module Organization
- Next.js 15 Pages Router keeps routes inside `pages/`; locale-aware entries live under `pages/[locale]/` while API handlers (Stripe, analytics) stay in `pages/api/`.
- Shared UI components sit in `src/components/{sections,ui,layout}`; structured-data helpers reside in `src/components/seo`.
- Core logic and providers (cart, translation, analytics) belong in `src/lib/`; shared types stay in `src/types` and the root `types.ts`.
- Translation JSON lives in `src/translations/{en,fr,zh}.json`; update all languages together. Static assets land in `public/`, Prisma schema sits at `prisma/schema.prisma`, and automation scripts live under `scripts/`.

## Build, Test, and Development Commands
- `npm run predev && npm run dev` clears caches and boots the local Next.js server.
- `npm run lint`, `npm run check-types`, and `npm run validate-dark-mode` are required gates before commits or PRs.
- `npm test` verifies translation key completeness. `npm run test:e2e` executes Playwright journeys (pass `--headed` as needed).
- `npm run build` followed by `npm run start` smoke-tests the production bundle. Performance tooling: `npm run performance:audit` and `npm run bundle:analyze`. Use image optimizers (`npm run optimize-images`, `npm run optimize-all-images`) and `npm run clear-cache` when builds misbehave.

## Coding Style & Naming Conventions
- TypeScript only; avoid `any`, follow Next.js ESLint, and rely on Prettier defaults (two spaces, single quotes).
- Every Tailwind text/background class needs a matching `dark:` variant. Components/hooks/providers use PascalCase; utilities use camelCase.
- Route copy must come from `useTranslation` and locale JSON—no inline literals.

## Testing Guidelines
- Unit tests run through Jest; keep the translation guard in `__tests__/` green.
- End-to-end flows live in `e2e/*.spec.ts`; name files after the journey (e.g., `checkout-flow.spec.ts`). Run `npm run validate-dark-mode` before committing to guard accessibility.

## Commit & Pull Request Guidelines
- Commit messages follow `Type: concise summary` ≤72 characters. Scope commits narrowly and stage generated files separately.
- PRs must describe changes, link relevant issues, document local verification (lint, tests, e2e), include before/after screenshots for UI shifts, and request review from the maintainer listed in `PROJECT_OVERVIEW.md`.

## Additional Notes
- Record session notes in `CHANGELOG.md`. Maintain WCAG AA contrast and ≥44px touch targets across breakpoints. Coordinate with maintainers before updating sensitive Stripe or analytics routes.
