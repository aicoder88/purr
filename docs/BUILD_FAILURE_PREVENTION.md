# Build Failure Prevention Guide

This document outlines common build failures and how to prevent them.

## Quick Reference

**Before every commit:**
```bash
npm run lint                # Must have 0 warnings
npm run check-types         # Must have 0 errors
npm run validate-dark-mode  # Must have 0 violations
npm run validate-images     # Must pass size checks
```

## TypeScript Errors

### 1. Property Name Mismatches (Third-Party APIs)

**Problem:** External APIs (Stripe, etc.) change property names between versions.

**Example Error:**
```
Property 'payment_method_configuration' does not exist on type 'Response<Session>'.
Did you mean 'payment_method_configuration_details'?
```

**Prevention:**
- Always check API documentation for current property names
- Use TypeScript types from official SDKs (e.g., `@stripe/stripe-js`)
- Run type checks after updating dependencies: `npm run check-types`

**Fix:**
```typescript
// ❌ Wrong (old API)
session.payment_method_configuration

// ✅ Correct (current API)
session.payment_method_configuration_details
```

### 2. Missing Optional Properties in Type Definitions

**Problem:** TypeScript can't infer optional properties in object literals.

**Example Error:**
```
Property 'exclude' does not exist on type '{ maxWidth: number; maxHeight: number; }'.
```

**Prevention:**
- Always define explicit interfaces for complex object types
- Use optional properties (`?:`) when appropriate

**Fix:**
```typescript
// ❌ Wrong - TypeScript infers union type
const CONFIG = {
  'dir1': { max: 100, exclude: ['test'] },
  'dir2': { max: 200 }  // No exclude property
};

// ✅ Correct - Explicit interface
interface Config {
  max: number;
  exclude?: string[];  // Optional property
}

const CONFIG: Record<string, Config> = {
  'dir1': { max: 100, exclude: ['test'] },
  'dir2': { max: 200 }
};
```

### 3. Unused Variables

**Problem:** Variables defined but never used cause TypeScript warnings.

**Example Error:**
```
'testOrderData' is assigned a value but never used
'request' is defined but never used
```

**Prevention:**
- Remove unused variables immediately
- If deliberately unused (e.g., destructuring), prefix with `_`: `const { _unused, used } = obj`
- For function parameters, just omit the name: `async () => { ... }`

**Fix:**
```typescript
// ❌ Wrong
test('should work', async ({ request }) => {
  const testData = { foo: 'bar' };
  // Neither used
});

// ✅ Correct - Remove unused vars
test('should work', async () => {
  // Only define what you use
});

// ✅ Alternative - If you might use it later
test('should work', async ({ _request }) => {
  // Underscore prefix signals "deliberately unused"
});
```

### 4. Explicit `any` Types

**Problem:** Using `any` defeats TypeScript's type safety.

**Example Warning:**
```
Unexpected any. Specify a different type @typescript-eslint/no-explicit-any
```

**Prevention:**
- **Never** use `any` - always use proper types
- For error handling, use `unknown` then narrow with `instanceof`
- For middleware handlers, use `NextApiHandler` from `next`
- For union types, define all possibilities explicitly

**Fixes:**

```typescript
// ❌ Wrong - Error handling with any
try {
  await operation();
} catch (error: any) {
  console.error(error.message);
}

// ✅ Correct - Use unknown and narrow
try {
  await operation();
} catch (error) {  // TypeScript defaults to 'unknown'
  console.error(error instanceof Error ? error.message : 'Unknown error');
}

// ❌ Wrong - Handler type as any
const middleware = (handler: any) => withRateLimit(handler);

// ✅ Correct - Use NextApiHandler
import type { NextApiHandler } from 'next';
const middleware = (handler: NextApiHandler) => withRateLimit(handler);

// ❌ Wrong - Any for type assertion
setFilter(e.target.value as any);

// ✅ Correct - Explicit union type
setFilter(e.target.value as 'all' | 'published' | 'draft' | 'scheduled');
```

## ESLint Warnings

### 1. Anonymous Default Exports

**Problem:** ESLint warns about anonymous default exports for maintainability.

**Example Warning:**
```
Assign array to a variable before exporting as module default
```

**Fix:**
```javascript
// ❌ Wrong
export default [
  { /* config */ }
];

// ✅ Correct
const eslintConfig = [
  { /* config */ }
];

export default eslintConfig;
```

### 2. Using `<img>` Instead of `<Image>`

**Problem:** Next.js recommends using `<Image>` for automatic optimization.

**Example Warning:**
```
Using `<img>` could result in slower LCP. Consider using `<Image />` from `next/image`
```

**Prevention:**
- Always use `next/image` for images in React components
- Use appropriate `sizes` attribute based on actual render size

**Fix:**
```tsx
// ❌ Wrong
<img
  src="/path/to/image.jpg"
  alt="Description"
  className="w-full h-32 object-cover"
/>

// ✅ Correct
import Image from 'next/image';

<div className="relative h-32">
  <Image
    src="/path/to/image.jpg"
    alt="Description"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
    quality={75}
  />
</div>
```

**Image Best Practices:**
- Use `fill` for responsive containers
- Specify `sizes` matching actual render dimensions (NOT `100vw` for small images!)
- Use `quality={75}` for most images (85 for hero images only)
- Add `priority` only for above-the-fold images

## Build Failure Checklist

When you encounter a build failure:

1. **Read the error message carefully** - TypeScript errors are usually very specific
2. **Check recent dependency updates** - API changes often break builds
3. **Run type checks locally** - `npm run check-types`
4. **Fix one error at a time** - Don't try to fix everything at once
5. **Test the build** - `npm run build` before committing

## Common Patterns to Remember

### Type-Safe Error Handling
```typescript
try {
  await riskyOperation();
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Unknown error');
  return res.status(500).json({
    error: error instanceof Error ? error.message : 'Internal server error'
  });
}
```

### Type-Safe Middleware
```typescript
import type { NextApiHandler } from 'next';

const withMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Middleware logic
    return handler(req, res);
  };
};
```

### Type-Safe State Updates
```typescript
// Define the type
const [status, setStatus] = useState<'active' | 'inactive' | 'pending'>('pending');

// Type-safe update
<select onChange={(e) => setStatus(e.target.value as 'active' | 'inactive' | 'pending')}>
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
  <option value="pending">Pending</option>
</select>
```

## Pre-Commit Hook

The project uses Husky to run checks before commits. If any fail, the commit is blocked.

**What runs:**
- `npm run lint` - ESLint checks
- `npm run check-types` - TypeScript type checks
- `npm run validate-dark-mode` - Dark mode compliance
- `npm run validate-blog-images` - Image validation

**To bypass (NOT recommended):**
```bash
git commit --no-verify  # Only use for emergencies!
```

## Resources

- **TypeScript Handbook:** https://www.typescriptlang.org/docs/handbook/
- **Next.js Image Optimization:** https://nextjs.org/docs/basic-features/image-optimization
- **ESLint Rules:** https://eslint.org/docs/rules/
- **Project Documentation:** See `/docs/CLAUDE.md` for full guidelines

## Summary

**Key Principles:**
1. ✅ **Always** use explicit types, never `any`
2. ✅ **Always** use `next/image`, never `<img>`
3. ✅ **Always** remove unused variables
4. ✅ **Always** run validation before committing
5. ✅ **Always** check API docs after dependency updates

Following these patterns will prevent 99% of build failures.
