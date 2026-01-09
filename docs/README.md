# Purrify Website

This is the official website for Purrify, an activated carbon cat litter additive that eliminates odors at the source.

<!-- Vercel deployment pipeline restored and working! -->

## 📚 Documentation Structure

This project uses a streamlined documentation approach:

### Root Directory (Core Development)
- **CLAUDE.md** - AI development guidelines and constraints
- **AGENTS.md** - Quick developer reference guide
- **CHANGELOG.md** - Active project change log (update with each PR)
- **TODO.md** - Active work queue and priorities
- **README.md** - This file

### /docs Directory (Extended Reference)
- **REFERENCE.md** - Consolidated technical reference
  - Dark mode color standards
  - SEO playbook and implementation
  - JSON-LD structured data guide
  - Site structure and routing
  - Canadian cities list

- **PROJECT_OVERVIEW.md** - Complete system architecture and tech stack
- **PROJECT_HANDOFF.md** - Production status and deployment details
- **FUTURE_ROADMAP.md** - Product roadmap and planned features
- **REVENUE_STRATEGY.md** - Business growth and optimization plan
- **B2B_RETAILERS.md** - B2B/retailer program documentation
- **OPTIMIZATION_GUIDE.md** - Performance and optimization guide

### /docs/archive Directory (Historical Reference)
- **SESSION_ARCHIVES.md** - Consolidated historical session documentation
  - Dark mode improvements
  - Achievement summaries
  - Blog content calendars
  - Translation analysis
  - Week-by-week implementation notes

## Quick Links

**For Active Development:**
- Read: `CLAUDE.md` (project constraints and standards)
- Check: `AGENTS.md` (quick reference guide)
- Update: `CHANGELOG.md` (after each session)

**For Architecture & System Understanding:**
- Read: `docs/PROJECT_OVERVIEW.md` (technical stack)
- Reference: `docs/REFERENCE.md` (technical standards)

**For Business & Strategy:**
- Read: `docs/PROJECT_HANDOFF.md` (production status)
- Review: `docs/REVENUE_STRATEGY.md` (growth plan)
- Check: `docs/B2B_RETAILERS.md` (B2B program)

## Local Development Setup

### MCP Server Configuration (Claude Code)

The project uses MCP (Model Context Protocol) servers for AI-assisted development. The `.mcp.json` file contains placeholder values that need to be configured locally.

#### Supabase MCP Setup

1. Get your Supabase project reference from your [Supabase dashboard](https://supabase.com/dashboard)
2. Generate a personal access token at [Supabase Access Tokens](https://supabase.com/dashboard/account/tokens)
3. Update your local `.mcp.json`:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--read-only",
        "--project-ref=YOUR_PROJECT_REF"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "YOUR_ACCESS_TOKEN"
      }
    }
  }
}
```

**Important:** Never commit actual credentials to `.mcp.json`. The repository version contains placeholders.

#### Database Connection

The `DATABASE_URL` environment variable connects to Supabase PostgreSQL:
- Format: `postgresql://postgres.[project-ref]@aws-0-[region].pooler.supabase.com:5432/postgres`
- Set in `.env.local` for local development
- Set in Vercel environment variables for production

---

## Recent Changes (June 2024)

- Improved language switcher visibility in dark mode.
- Made the cart button easier to tap on mobile devices.
- Changed hero section text to static, with gradient color preserved.
- Updated Purrify 12g (trial size) description and price; clarified it is for one litter box change.
- Replaced 'Add to Cart' with a direct Stripe 'Buy Now' link for the trial size.
- Removed 'Free Purrify' box and combined 'Natural' and 'Cat-Friendly' boxes in the Why Purrify section.
- Improved testimonial readability in dark mode.
- Updated phone number everywhere to 14506636773.
- Added /privacy, /tos, /fr/privacy, and /fr/tos routes as aliases for legal pages.
- Fixed build errors related to circular imports and missing default exports in privacy policy pages.
- Added a valid Privacy Policy page from scratch.

For more details on any change, see commit history or ask the team/AI assistant.
