# Repository Guidelines

## Project Structure & Module Organization
Feature code lives in `src/`, with UI modules under `src/components`, shared helpers in `src/lib`, and locale files in `src/translations`. Legacy Pages Router routes remain in `pages/`, while marketing copy and localized Markdown stay in `content/`. Tests and fixtures are organized as `__tests__/` for Jest, `e2e/` for Playwright, and `test-screenshots/` for golden images. Build utilities sit in `scripts/`, Prisma schema plus migrations in `prisma/`, and deployable assets in `public/`.

## Build, Test, and Development Commands
- `npm run dev`: clears caches via `predev` and starts the hot-reload server.
- `npm run build`: generates the production bundle, then runs sitemap/postbuild hooks; execute before release PRs.
- `npm run start`: serves `.next/` output for smoke tests or Playwright.
- `npm run lint` / `npm run check-types`: enforce ESLint (Next preset) and strict TS diagnostics.
- `npm run test`: runs `__tests__/translation-completeness.test.js` to ensure every locale key exists.
- `npm run test:e2e` (+ `npm run e2e:web`): launches Playwright suites covering checkout, account, and blog funnels.

## Coding Style & Naming Conventions
Use TypeScript everywhere with 2-space indentation, single quotes, and explicit prop/variable names. React components use `.tsx` and PascalCase filenames (`src/components/HeroBanner.tsx`), helpers use `.ts` with camelCase exports, and routes/content use kebab-case. Run `npm run lint -- --fix` and `npx prettier --write` before committing to keep formatting consistent.

## Testing Guidelines
Keep translation fixtures in sync before running Jest or the locale coverage test fails fast. Name Playwright specs descriptively (e.g., `checkout completes single bag`) and mirror top funnels. When adding features, update Jest fixtures under `__tests__/fixtures` and regenerate golden screenshots in `test-screenshots/` as needed. Always run `npm run test` and at least the impacted Playwright specs before pushing.

## Commit & Pull Request Guidelines
Follow Conventional Commits such as `feat(seo): add hreflang tags`, referencing task IDs in parentheses when relevant. PRs must describe user impact, list commands executed (lint, type-check, Jest, Playwright), and link issues. Include screenshots or logs for UX, SEO, or content changes, and update `CHANGELOG.md` or docs touched by the work. Request review only after lint, type, Jest, and Playwright suites pass locally.

## Security & Configuration Tips
Never commit `.env*`; keep secrets in `.env.local` or hosted environment variables. Generate Prisma migrations with `npx prisma migrate dev` and surface destructive steps for review. Asset and sitemap scripts must only write inside `public/` or `reports/` to keep CI artifacts deterministic.
