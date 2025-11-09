# Repository Guidelines

## Project Structure & Module Organization
Purrify runs on Next.js 15 with React 19. Core UI and logic live in `src` (`src/components` for feature modules, `src/lib` for shared services, `src/translations` for locale JSON). Legacy Pages Router entries remain in `pages/`, while marketing and blog copy sits in `content/`. Automation utilities live in `scripts/`, database schema/migrations in `prisma/`, and static assets in `public/`. Tests live in `__tests__/` (Jest) and `e2e/` plus `test-screenshots/` (Playwright visual baselines).

## Build, Test, and Development Commands
- `npm run dev` – cleans the webpack cache (`predev`) then starts the dev server with hot reload.
- `npm run build` – production build with generous memory limits and sitemap generation; always run before release PRs.
- `npm run start` – serves the compiled output for smoke testing.
- `npm run lint` / `npm run check-types` – enforce ESLint (Next preset) and strict TypeScript.
- `npm run test` – executes `__tests__/translation-completeness.test.js` to guard locale coverage.
- `npm run test:e2e` – launches Playwright; pair with `npm run e2e:web` if the tests need a running server.

## Coding Style & Naming Conventions
Use TypeScript everywhere (`.tsx` for components, `.ts` for helpers) with 2-space indentation, single quotes, and descriptive prop names. Prefer functional components with local hooks; colocate feature-specific utilities next to their UI to keep imports relative. File names: PascalCase for React components, kebab-case for routes/content, camelCase for helpers. Format via `npm run lint -- --fix` and `npx prettier --write` before committing.

## Testing Guidelines
Unit coverage currently focuses on translation integrity; mirror that pattern when adding string-heavy modules. Playwright specs within `e2e/` should reflect the highest-risk funnels (checkout, subscription flows, blog publishing). Give tests customer-focused names (`checkout completes with single-bag plan`).

## Commit & Pull Request Guidelines
Commits follow Conventional Commit notation (`feat(seo): ...`, `fix(content): ...`). Keep changes scoped, mention related tasks in parentheses, and update `CHANGELOG.md` plus relevant docs. PRs must list commands executed, summarize impact, link to issues, and provide screenshots or logs for UI/SEO changes. Request review only after lint, type checking, Jest, and Playwright all pass locally.

## Security & Configuration Tips
Store secrets exclusively in `.env.local` (never commit) and in the deployment provider’s dashboard. Generate Prisma changes with `npx prisma migrate dev` and have another reviewer confirm destructive steps. Asset optimization or sitemap scripts should write only inside `public/` or `reports/` so CI artifacts stay contained.
