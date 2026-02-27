# Purrify

> Activated carbon cat litter additive — eliminate odors, keep the litter you love.

**Live Site:** [purrify.ca](https://purrify.ca)

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Database:** PostgreSQL + [Prisma ORM](https://www.prisma.io/)
- **Auth:** [NextAuth.js v5](https://next-auth.js.org/)
- **Payments:** [Stripe](https://stripe.com/)
- **Email:** [Resend](https://resend.com/)
- **i18n:** [next-intl](https://next-intl-docs.vercel.app/)
- **Server State:** [TanStack Query](https://tanstack.com/query)

---

## Quick Start

### Prerequisites

- Node.js 22.x (see `.nvmrc`)
- pnpm 10.x
- PostgreSQL database

### Installation

```bash
# Clone and install
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your secrets

# Generate Prisma client
pnpm prisma generate

# Start development server
pnpm dev
```

The dev server starts at `http://localhost:3000`.

---

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── [locale]/          # Localized pages (en, fr)
│   └── ...
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   │   └── queries/      # TanStack Query hooks
│   ├── lib/              # Utilities & shared code
│   │   ├── webhooks/     # Webhook handlers
│   │   └── api-client.ts # Typed API client
│   ├── translations/     # i18n translations
│   └── generated/        # Generated code (Prisma, etc.)
├── prisma/
│   └── schema.prisma     # Database schema
├── content/blog/         # Blog content (JSON)
├── public/
│   └── optimized/        # Optimized images
└── scripts/              # Build & automation scripts
```

---

## Key Commands

### Development

```bash
pnpm dev              # Start dev server (webpack)
pnpm dev:turbo        # Start dev server (Turbopack)
pnpm build            # Production build
pnpm start            # Start production server
```

### Code Quality

```bash
pnpm lint             # ESLint
pnpm check-types      # TypeScript type check
pnpm check-types:unused  # Find unused identifiers
```

### Validation (Run before commits)

```bash
pnpm validate-i18n:hardcoded   # Check for hardcoded strings
pnpm validate-dark-mode        # Validate dark mode coverage
pnpm validate-images           # Check image sizes
pnpm validate-hydration        # E2E hydration tests
pnpm seo:validate              # SEO compliance check
```

### Testing

```bash
pnpm test             # Jest unit tests
pnpm test:e2e         # Playwright E2E tests
pnpm test:coverage    # Coverage report
```

### Database

```bash
pnpm prisma generate        # Regenerate client
pnpm prisma migrate dev     # Create migration
pnpm prisma studio          # Database GUI
```

### Content & Images

```bash
pnpm generate-image --prompt "..." --output "file.jpg"
pnpm optimize-images:enhanced
pnpm blog:auto:generate
```

---

## Environment Variables

See `.env.local.example` for required variables:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection |
| `STRIPE_SECRET_KEY` | Stripe payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook verification |
| `NEXTAUTH_SECRET` | Auth encryption |
| `RESEND_API_KEY` | Email delivery |
| `UPSTASH_REDIS_REST_URL` | Rate limiting |

---

## Architecture Highlights

### API Client (`src/lib/api-client.ts`)

Type-safe fetch wrapper with automatic error handling and toast integration.

```typescript
import apiClient from '@/lib/api-client';

const { data } = await apiClient.get('/api/leads');
const { data: created } = await apiClient.post('/api/leads', leadData);
```

### TanStack Query Hooks (`src/hooks/queries/`)

Server state management with caching, optimistic updates, and background refetching.

```typescript
import { useLeads, useUpdateLeadStatus } from '@/hooks/queries';

const { data, isLoading } = useLeads({ page: 1, status: 'NEW' });
const updateStatus = useUpdateLeadStatus();
```

### Stripe Webhooks (`src/lib/webhooks/stripe/`)

Modular webhook processing with separate handlers for each event type:
- `checkout.session.completed`
- `checkout.session.expired`

### i18n

- All user-facing text in `src/translations/{en,fr}.ts`
- No hardcoded strings (enforced by `validate-i18n:hardcoded`)
- RTL support ready (currently en/fr only)

### Image Optimization

- Store originals in `public/images/`
- Optimized versions in `public/optimized/`
- Multi-format support (AVIF, WebP, JPG)

---

## Code Standards

1. **i18n:** All UI text must use translation keys
2. **Dark Mode:** Every element needs `dark:` variant
3. **Hydration Safety:** Never conditionally return `null` in pages (use `notFound()`)
4. **Type Safety:** Strict TypeScript, no `any`
5. **Branding:** "Purrify" is granules (not powder), capitalized

See [CLAUDE.md](./CLAUDE.md) for detailed guidelines.

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Build Configuration

- `next.config.js` - Build optimization, redirects
- `config/headers.js` - Security headers
- `config/images.js` - Image optimization settings

---

## Monitoring

- **Analytics:** Vercel Analytics + Speed Insights
- **Web Vitals:** CoreWebVitals component tracks LCP, FID, CLS
- **Error Tracking:** (Recommended: Sentry)
- **SEO:** Built-in SEO validation in CI

---

## License

Private - All rights reserved

---

## Support

For issues or questions, contact: hello@purrify.ca
