# Repository Guidelines

## Project Structure & Module Organization
The Pages Router lives in `pages/` with locale-specific routes under `pages/[locale]/` and API handlers in `pages/api/`. Shared interfaces and UI live in `src/components/{sections,ui,layout}` while schema-aware SEO helpers sit in `src/components/seo`. Business logic, providers, and analytics utilities belong in `src/lib/`, with shared types split between `src/types/` and the root `types.ts`. Keep translation sources in `src/translations/{en,fr,zh}.json`, media in `public/`, Prisma schema at `prisma/schema.prisma`, and reusable scripts inside `scripts/`.

## Build, Test, and Development Commands
Run `npm run predev && npm run dev` to clear caches and start the local server. Linting (`npm run lint`), type safety (`npm run check-types`), and dark mode validation (`npm run validate-dark-mode`) are mandatory before submitting work. Use `npm test` to guard translation key coverage, and `npm run test:e2e -- --headed` for Playwright journeys. Ship-ready verification is `npm run build` followed by `npm run start`; performance and bundle health come from `npm run performance:audit` and `npm run bundle:analyze`.

## Coding Style & Naming Conventions
Stick to TypeScript—no `any` unless justified and approved. Prettier defaults (two spaces, single quotes) and the project ESLint config enforce formatting. Components, hooks, and providers use PascalCase; helpers remain camelCase. Tailwind text and background utilities must include a matching `dark:` variant, and UI copy should come from `useTranslation` with keys defined in each language file.

## Testing Guidelines
Jest specs in `__tests__/` protect translation completeness. End-to-end coverage lives in `e2e/*.spec.ts`; name scenarios after the user flow (`checkout-flow.spec.ts`). Always run `npm run validate-dark-mode` after UI-affecting changes to guard accessibility requirements.

## Commit & Pull Request Guidelines
Follow the `Type: concise summary` commit format under 72 characters and stage generated assets separately. Pull requests should describe the change, link issues, and document local verification (lint, types, dark mode, tests, e2e). Include before/after screenshots for visual updates and request review from the maintainer listed in `PROJECT_OVERVIEW.md`. Log noteworthy work in `CHANGELOG.md` and sync with maintainers before altering Stripe or analytics endpoints.

