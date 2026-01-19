# Hydration Safety Guide

## Overview

This document explains the hydration safety protections in place to prevent React hydration mismatches, a common issue that occurs when server-rendered HTML doesn't match the client-side React tree.

## The Problem

### What is a Hydration Mismatch?

When Next.js renders a page:
1. **Server-Side**: Generates HTML and sends it to the browser
2. **Client-Side**: React "hydrates" the HTML, attaching event handlers and making it interactive

If the server renders one thing and the client renders another, React throws a hydration error.

### The Anti-Pattern

```typescript
// ❌ DANGEROUS: Causes hydration errors
export default function MyPage() {
  const { data: session } = useSession();

  // Problem: Server always renders <Content />
  // Client may render nothing
  if (!session) {
    return null; // Hydration mismatch!
  }

  return <Content />;
}
```

**Why this fails**:
- Server doesn't know about `session` state during SSR
- Server renders `<Content />` for everyone
- Client-side, `useSession` may return `null` initially
- Client conditionally renders nothing
- React sees different trees → Hydration error

## The Solution

We have **three layers of protection** against this issue:

### 1. ESLint Rule (Development)

Catches the pattern during development:

```bash
pnpm lint
```

The `hydration-safe/no-conditional-return-null` rule detects:
- `if (condition) return null;`
- `if (condition) { return null; }`

**Example error**:
```
error: Conditionally returning null causes hydration mismatches.
       Return a component instead: <Loading />, <ErrorPage />, etc.
```

### 2. Validation Script (Pre-Commit)

Scans all page files for the anti-pattern:

```bash
pnpm validate-hydration
```

**Output**:
```
🔍 Validating hydration safety...
✓ No hydration issues found!
  Scanned 118 page files
```

### 3. Documentation (CLAUDE.md)

Comprehensive patterns and examples in `CLAUDE.md` under "Hydration Safety & Authentication Patterns".

## Safe Patterns

### ✅ Pattern 1: Server-Side Redirect (Best)

```typescript
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
};

export default function MyPage({ user }) {
  // Component only renders for authorized users
  return <Content user={user} />;
}
```

**Benefits**:
- Zero hydration risk
- SEO-friendly
- Immediate redirect
- No client-side flash

### ✅ Pattern 2: Loading States

```typescript
export default function MyPage() {
  const { data: session, status } = useSession();

  // Always return a component, never null
  if (status === 'loading') {
    return <LoadingSpinner />; // Component, not null
  }

  if (!session?.user) {
    return <AccessDenied />; // Component, not null
  }

  return <Content user={session.user} />;
}
```

**Benefits**:
- Consistent render tree
- No hydration errors
- Good UX with loading feedback

### ✅ Pattern 3: Error Pages

```typescript
export default function MyPage() {
  const { t } = useTranslation();

  // Handle missing data gracefully
  if (!t.mySection) {
    return (
      <ErrorPage
        title="Page Temporarily Unavailable"
        message="Please try refreshing or come back later."
      />
    ); // Full component, not null
  }

  return <Content />;
}
```

### ✅ Pattern 4: Redirect-Only Pages

```typescript
// getServerSideProps with redirect = component never renders
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/new-url',
      permanent: false,
    },
  };
};

// Safe: component never renders
export default function RedirectPage() {
  return null;
}
```

## Validation in CI/CD

Add to your CI pipeline:

```yaml
- name: Validate Hydration Safety
  run: pnpm validate-hydration
```

## Pre-Commit Hook

The validation runs automatically in the pre-commit checklist:

```bash
pnpm lint && pnpm check-types && pnpm validate-dark-mode && pnpm validate-images && pnpm validate-hydration
```

## Whitelisted Files

Some files are safe to ignore (redirect-only pages):
- `pages/free.tsx`
- `pages/buy.tsx`
- `pages/montreal.tsx`
- `pages/us.tsx`
- And others with `getServerSideProps` redirects

These are whitelisted in `scripts/validate-hydration.js`.

## Code Review Checklist

Before merging any page component:

- [ ] Does the component ever `return null` conditionally?
- [ ] If using client-side auth, does it show loading/error states?
- [ ] Are auth checks in `getServerSideProps` when possible?
- [ ] Does every render path return a valid React element?

## Common Mistakes

### ❌ Mistake 1: Early Return Null

```typescript
if (!data) return null; // DON'T DO THIS
```

**Fix**:
```typescript
if (!data) return <NoDataMessage />; // Return a component
```

### ❌ Mistake 2: Conditional Rendering Based on Client State

```typescript
if (session?.user?.role !== 'admin') return null; // DON'T DO THIS
```

**Fix** (Option A - Server-side):
```typescript
export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session?.user?.role !== 'admin') {
    return { redirect: { destination: '/access-denied' } };
  }
  return { props: {} };
};
```

**Fix** (Option B - Client-side):
```typescript
if (session?.user?.role !== 'admin') {
  return <AccessDenied />; // Return a component
}
```

### ❌ Mistake 3: Forgot Loading State

```typescript
const { data } = useQuery(...);
if (!data) return null; // Race condition!
```

**Fix**:
```typescript
const { data, isLoading } = useQuery(...);
if (isLoading) return <Loading />;
if (!data) return <ErrorMessage />;
```

## Architecture Decision

**Why enforce this?**

1. **Prevents bugs**: Hydration errors are hard to debug
2. **Better UX**: Loading states inform users what's happening
3. **SEO-friendly**: Server-side redirects are better for crawlers
4. **Consistent patterns**: Team follows the same approach

## Historical Context

This protection was added after identifying two pages (`/affiliate.tsx` and `/affiliate/signup.tsx`) that initially had the anti-pattern. The fix involved:

1. Changing `return null` to `return <ErrorPage />`
2. Adding proper translation checks
3. Implementing validation tooling

## Further Reading

- [React Hydration Docs](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Next.js Data Fetching](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props)
- See `CLAUDE.md` "Hydration Safety & Authentication Patterns" section

## Questions?

If you encounter a legitimate use case where you need to conditionally return null:
1. Check if it can be refactored to return a component
2. If it's a redirect-only page, add it to the whitelist in `scripts/validate-hydration.js`
3. Document why the pattern is safe in that specific case
