# PURR Improvements

**Type:** Next.js 16 - E-Commerce Platform
**Production Ready:** No (55%)

## Summary
E-commerce platform for Purrify products. Needs TypeScript strictness, E2E testing, and documentation.

## Critical Fixes

| Priority | Issue | Fix |
|----------|-------|-----|
| HIGH | TypeScript strict disabled | Enable in tsconfig |
| HIGH | No E2E tests | Set up Playwright |
| HIGH | 46 npm scripts undocumented | Create scripts/README.md |
| MEDIUM | next-auth v4 | Upgrade to v5 |

## Specific Tasks

### 1. Enable TypeScript Strict Mode
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 2. Set Up E2E Testing
```bash
npm install --save-dev @playwright/test
npx playwright install
# Create e2e/ directory with test files
```

### 3. Document npm Scripts
Create `scripts/README.md` documenting all 46 npm scripts

### 4. Upgrade next-auth
```bash
npm install next-auth@5
# Follow migration guide
```

## Recommended Tooling

```bash
# E2E Testing
npm install --save-dev @playwright/test

# Unit Testing
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Type safety
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
```
