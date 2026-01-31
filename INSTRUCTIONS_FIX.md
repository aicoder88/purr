# Emergency Fix Instructions for Kimi

**Role**: Firefighter
**Priority**: CRITICAL
**Context**: Phase 1 migration caused regressions found by Gemini.

---

## 🚨 Session 1.1.X: Fix Phase 1 Regressions

**Pre-flight check**:
```bash
curl -I http://localhost:3000/about
# Currently returning 404
```

### Issue 1: `/about` 404 Not Found
**Diagnosis**: The page likely isn't exporting the default component correctly, or `page.tsx` is being ignored in favor of a conflicting `pages/` route.

**Steps**:
1. Check if `pages/about/` or `pages/about.tsx` still exists. If so, DELETE IT. App Router pages are ignored if Pages Router equivalents exist.
2. Verify `app/about/page.tsx` has `export default function`.

### Issue 2: Blog 500 Error (Invalid Time Value)
**Diagnosis**: `RangeError: Invalid time value` in `app/blog/page.tsx`.
**Cause**: One or more JSON files in `content/blog/en/` has a date format that specific JS runtime doesn't like, or it's missing.

**Steps**:
1. Open `app/blog/page.tsx`.
2. Wrap the date parsing logic in a `try/catch` block or use a safer parser.
3. Log which file is causing the error so we can fix the JSON data source.
4. **Fix**: Ensure date parsing handles the string format present in JSON files (likely ISO 8601).

**Verification**:
```bash
# Verify About Page
curl -I http://localhost:3000/about
# Should return 200

# Verify Blog Index
curl -I http://localhost:3000/blog
# Should return 200
```

**Exit criteria**:
- [ ] `/about` loads cleanly
- [ ] `/blog` loads cleanly without 500 error
- [ ] Build succeeds

**On success**:
```bash
git add -A && git commit -m "fix(phase1): resolve about 404 and blog date parsing error"
```
