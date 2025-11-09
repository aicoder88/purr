# Automated Blog Writer

This guide explains how the self-writing blog workflow works, how it complies with the rules in `docs/archive/CLAUDE.md` and `docs/archive/blog.md`, and what you need to configure on Vercel so a new long-form post is published every 3 days.

## What the pipeline does

1. **Topic queue** – `src/data/automated-blog-topics.ts` mirrors the production calendar from `docs/archive/blog.md`. Each topic remembers its locale, hook, keywords, and CTA.
2. **Guideline ingestion** – `src/lib/blog/guidelines.ts` reads the authoritative rules (writing, SEO, image, legal) directly from the documentation so the model always follows the source of truth.
3. **AI generation** – `src/lib/blog/generator.ts` builds a strict JSON prompt, calls Anthropic (default) or OpenAI, validates the response with `zod`, and stores the result via Prisma. The HTML already contains section IDs, FAQ answers, internal/external links, and CTA copy.
4. **Image sourcing** – `src/lib/blog/image-selection.ts` fetches Unsplash images (with the required URL parameters) or falls back to whitelisted assets. Metadata (alt, caption, credit, keywords) is saved in `blog_images`.
5. **Publishing cadence** – `pages/api/cron/generate-blog-post.ts` is triggered by a Vercel Cron job every 3 days. It enforces the interval, requires a secret, and logs failures without crashing the deployment.
6. **Front-end consumption** – `/blog`, `/blog/[slug]`, and `/api/blog-posts` now pull from the `blog_posts` table first, so generated posts appear everywhere automatically. Static/WordPress fallbacks still work if the database is empty.

## Required environment variables

Add these to Vercel (or your local `.env`). See `.env.production.example` for placeholders.

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Existing Postgres connection that Prisma uses. Run a migration after deploying the new schema. |
| `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` | At least one provider is required. Set `BLOG_ANTHROPIC_MODEL` or `BLOG_OPENAI_MODEL` if you want a custom model. |
| `UNSPLASH_ACCESS_KEY` | Needed to request licensed hero/section photos. Fallback images are used if omitted. |
| `AUTOBLOG_CRON_SECRET` | Shared secret the cron route expects in the `x-cron-secret` header (or `?secret=` query). |
| `AUTOBLOG_INTERVAL_DAYS` | Optional override for the 3-day cadence. |

## Database migration

1. Pull production data.
2. Run `npx prisma migrate dev --name add_blog_posts` (or `prisma migrate deploy` in CI) so the new `blog_posts`, `blog_images`, and enums exist.
3. Redeploy so the generated Prisma client is available on Vercel (this happens automatically via `vercel.json` because `npx prisma generate` runs before `next build`).

## Vercel cron configuration

`vercel.json` includes:

```json
"crons": [
  {
    "path": "/api/cron/generate-blog-post",
    "schedule": "0 12 */3 * *",
    "method": "POST"
  }
]
```

In the Vercel dashboard set the same schedule and add the `x-cron-secret: $AUTOBLOG_CRON_SECRET` header to the cron trigger. You can force a manual run via:

```
curl -X POST "https://<your-domain>/api/cron/generate-blog-post?force=true&secret=$AUTOBLOG_CRON_SECRET"
```

The handler skips execution automatically if the last generated post was published < the configured interval.

## Local/one-off generation

1. Ensure the required environment variables are present in `.env`.
2. Run `npm run blog:auto:generate` to create a post immediately using the same generator the cron route calls.
3. Inspect the output in the terminal (ID, slug, hero image). Open `http://localhost:3000/blog/<slug>` after running `npm run dev` or trigger ISR by visiting the page in production.

## Observability & failure modes

- Generator errors propagate back to the API route and return `{ error, details }` so Vercel cron logs show the reason (missing keys, invalid JSON, etc.).
- `AUTOBLOG_CRON_SECRET` prevents unauthorized writes.
- All prompts/responses/guideline snapshots are stored on the `blog_posts` row for auditing (`rawPrompt`, `rawResponse`, `promptContext`).
- Image metadata lives in `blog_images`, so `npm run validate-blog-images` can be extended to check DB-backed posts later.

## Front-end experience

- `/blog` prefers database posts and falls back to WordPress/sample content if none exist yet.
- `/blog/[slug]` now renders hero credits, table of contents, Unsplash galleries, localized CTAs, and FAQ sections whenever that data exists.
- `/api/blog-posts` (used by the homepage blog preview) also sources the latest database entries, keeping the hero section in sync with automation output.

Keep `docs/archive/blog.md` up to date—any change to the rules automatically flows into the generator because it reads the markdown file at runtime.
