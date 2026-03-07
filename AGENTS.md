# AGENTS.md

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
    - **Art Style**: Hyper-realistic with Miyazaki-style enhancements to make the image fascinating and beautiful. NEVER make images of our product packaging.

    - **Odor**: Must be shown going **IN** to carbon.

## 💻 Coding Standards
- **i18n**: All user-facing text in `src/translations/*.ts`. No hardcoded strings.
- **i18n Attributes**: Never hardcode JSX accessibility/UI copy (`alt`, `aria-label`, `title`, `placeholder`, button/link text). Use translation keys or localized copy objects.
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
pnpm validate-i18n:hardcoded # Hardcoded UI string regression gate (writes reports/i18n-hardcoded-sweep.md)
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


## Skills
A skill is a set of local instructions to follow that is stored in a `SKILL.md` file. Below is the list of skills that can be used. Each entry includes a name, description, and file path so you can open the source for full instructions when using a specific skill.
### Available skills
- skill-creator: Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Codex's capabilities with specialized knowledge, workflows, or tool integrations. (file: /Users/macmini/.codex/skills/.system/skill-creator/SKILL.md)
- skill-installer: Install Codex skills into $CODEX_HOME/skills from a curated list or a GitHub repo path. Use when a user asks to list installable skills, install a curated skill, or install a skill from another repo (including private repos). (file: /Users/macmini/.codex/skills/.system/skill-installer/SKILL.md)
### How to use skills
- Discovery: The list above is the skills available in this session (name + description + file path). Skill bodies live on disk at the listed paths.
- Trigger rules: If the user names a skill (with `$SkillName` or plain text) OR the task clearly matches a skill's description shown above, you must use that skill for that turn. Multiple mentions mean use them all. Do not carry skills across turns unless re-mentioned.
- Missing/blocked: If a named skill isn't in the list or the path can't be read, say so briefly and continue with the best fallback.
- How to use a skill (progressive disclosure):
  1) After deciding to use a skill, open its `SKILL.md`. Read only enough to follow the workflow.
  2) When `SKILL.md` references relative paths (e.g., `scripts/foo.py`), resolve them relative to the skill directory listed above first, and only consider other paths if needed.
  3) If `SKILL.md` points to extra folders such as `references/`, load only the specific files needed for the request; don't bulk-load everything.
  4) If `scripts/` exist, prefer running or patching them instead of retyping large code blocks.
  5) If `assets/` or templates exist, reuse them instead of recreating from scratch.
- Coordination and sequencing:
  - If multiple skills apply, choose the minimal set that covers the request and state the order you'll use them.
  - Announce which skill(s) you're using and why (one short line). If you skip an obvious skill, say why.
- Context hygiene:
  - Keep context small: summarize long sections instead of pasting them; only load extra files when needed.
  - Avoid deep reference-chasing: prefer opening only files directly linked from `SKILL.md` unless you're blocked.
  - When variants exist (frameworks, providers, domains), pick only the relevant reference file(s) and note that choice.
- Safety and fallback: If a skill can't be applied cleanly (missing files, unclear instructions), state the issue, pick the next-best approach, and continue.
