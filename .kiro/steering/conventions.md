# Development Conventions

## Coding Style

- **TypeScript everywhere** with strict mode enabled
- **2-space indentation**, single quotes for strings
- **Explicit naming**: descriptive prop and variable names
- **File extensions**: `.tsx` for React components, `.ts` for utilities
- **Formatting**: Run `npm run lint -- --fix` and `npx prettier --write` before commits

## File Naming

- **Components**: PascalCase (e.g., `HeroBanner.tsx`, `OptimizedImage.tsx`)
- **Utilities/Helpers**: camelCase exports in kebab-case files (e.g., `image-utils.ts`)
- **Pages/Routes**: kebab-case (e.g., `trial-size.tsx`, `create-checkout-session.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAutoSave.ts`, `useKeyboardShortcuts.ts`)

## Import Patterns

Always use path aliases, never deep relative imports:

```typescript
// ✅ Correct
import { Button } from '@/components/ui/button'
import { translations } from '@translations/en'

// ❌ Avoid
import { Button } from '../../../components/ui/button'
```

## Testing Requirements

### Before Committing
1. Run `npm run lint` and fix all issues
2. Run `npm run check-types` to verify TypeScript
3. Run `npm run test` for Jest translation tests
4. Run relevant Playwright specs for affected features

### Test Organization
- **Jest tests**: `__tests__/` with fixtures in `__tests__/fixtures`
- **E2E tests**: `e2e/` with descriptive spec names (e.g., `checkout completes single bag`)
- **Screenshots**: `test-screenshots/` for golden image comparisons
- **Translation fixtures**: Must stay in sync or tests fail

### Test Naming
- Playwright specs should mirror user funnels (checkout, account, blog)
- Update golden screenshots when UI changes are intentional

## Translation Management

- All locale keys must exist in `src/translations/en.ts`, `fr.ts`, and `zh.ts`
- Use translation context: `const { t } = useTranslation()`
- Run `npm run test` to verify translation completeness
- Never hardcode user-facing strings

## Image Workflow

1. Add original images to `public/original-images/`
2. Run `npm run optimize-images:enhanced` to generate optimized versions
3. Optimized images appear in `public/optimized/` with multiple formats (AVIF, WebP, JPEG)
4. Metadata stored in `public/image-dimensions.json`
5. Use `OptimizedImage` component or `getImageProps()` helper in code

## API Route Patterns

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Business logic
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Validate method is implicit (only POST requests reach here)
  try {
    const body = await request.json()
    // Business logic
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## Context Patterns

### Translation Context
```typescript
import { useTranslation } from '@/lib/translation-context'

const { t, locale } = useTranslation()
const text = t('key.path')
```

### Theme Context (Dark Mode)
```typescript
import { useTheme } from '@/lib/theme-context'

const { theme, toggleTheme } = useTheme()
// theme is 'light' or 'dark'
```

### Cart Context
```typescript
import { useCart } from '@/lib/cart-context'

const { items, addItem, removeItem, total } = useCart()
```

## Commit Guidelines

Follow Conventional Commits format:

```
feat(seo): add hreflang tags for multilingual support
fix(blog): resolve image loading issue in Safari
docs(readme): update deployment instructions
chore(deps): upgrade Next.js to 15.0.3
```

Scope examples: `seo`, `blog`, `checkout`, `admin`, `i18n`, `perf`

## Pull Request Checklist

Before requesting review:

- [ ] All lint and type checks pass locally
- [ ] Jest tests pass (`npm run test`)
- [ ] Relevant Playwright E2E tests pass
- [ ] PR description explains user impact
- [ ] Screenshots included for UI/UX changes
- [ ] Documentation updated if needed
- [ ] Environment variables documented if added

## Security Best Practices

- **Never commit** `.env`, `.env.local`, or `.env.production` files
- Store secrets in Vercel environment variables or local `.env.local`
- Use `NEXT_PUBLIC_*` prefix only for client-safe variables
- Generate Prisma migrations with `npx prisma migrate dev`
- Review destructive database changes before applying

## Build Artifacts

### Committed to Git
- `public/optimized/` - Optimized images
- `public/image-dimensions.json` - Image metadata
- `public/sitemap.xml` - Generated sitemaps

### Ignored (gitignored)
- `.next/` - Next.js build output
- `node_modules/` - Dependencies
- `.env*` - Environment variables
- `tsconfig.tsbuildinfo` - TypeScript cache

### Output Directories
- Scripts should only write to `public/` or `reports/`
- Keep CI artifacts deterministic

## Pre-Deployment Checklist

1. Run full build: `npm run build`
2. Test production build: `npm run start`
3. Verify all environment variables are set in Vercel
4. Check sitemap generation completed
5. Run SEO health check: `npm run seo:optimize`
6. Verify image optimization completed
7. Test critical user flows in production mode
