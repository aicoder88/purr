# Hydration Safety Quick Reference

## 🚨 The Problem

```typescript
// ❌ CAUSES HYDRATION ERROR
if (condition) return null;
```

**Why?** Server renders one thing, client renders another → React mismatch

---

## ✅ The Solutions

### Pattern 1: Server-Side Redirect (Best)

```typescript
export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) return { redirect: { destination: '/login' } };
  return { props: { session } };
};

export default function Page({ session }) {
  return <Content />;
}
```

### Pattern 2: Loading Component

```typescript
export default function Page() {
  const { data, status } = useSession();

  if (status === 'loading') return <Loading />;
  if (!data) return <AccessDenied />;
  return <Content />;
}
```

### Pattern 3: Error Component

```typescript
export default function Page() {
  const { t } = useTranslation();

  if (!t.section) return <ErrorPage />;
  return <Content />;
}
```

---

## 🔍 Validation Commands

```bash
# Check during development
pnpm lint

# Explicit hydration check
pnpm validate-hydration

# Pre-commit (all checks)
pnpm lint && pnpm check-types && pnpm validate-dark-mode && pnpm validate-images && pnpm validate-hydration
```

---

## 📋 Code Review Checklist

- [ ] No `return null` in page components
- [ ] Loading states shown during async operations
- [ ] Auth checks in `getServerSideProps` when possible
- [ ] Every render path returns a React element

---

## 🔧 When You See ESLint Error

**Error Message:**
```
Conditionally returning null causes hydration mismatches.
Return a component instead: <Loading />, <ErrorPage />, etc.
```

**Fix:**
1. Change `return null` → `return <ComponentName />`
2. Or move check to `getServerSideProps`
3. Or add to whitelist if redirect-only page

---

## 📚 Documentation

- `CLAUDE.md` → "Hydration Safety & Authentication Patterns"
- `docs/HYDRATION_SAFETY.md` → Full guide
- `HYDRATION_SAFETY_IMPLEMENTATION.md` → Implementation details

---

## ⚡ Common Mistakes

| ❌ Wrong | ✅ Right |
|----------|----------|
| `if (!data) return null;` | `if (!data) return <NoData />;` |
| `if (loading) return null;` | `if (loading) return <Loading />;` |
| `if (!auth) return null;` | `if (!auth) return <AccessDenied />;` |

---

## 🎯 Remember

**RULE:** Page components should **always** return a React element, **never** `null` conditionally.

**EXCEPTION:** Redirect-only pages with `getServerSideProps` redirect (safe because component never renders).
