# Instructions for Kimi K2.5 (Lead Architect)

**Role**: Lead Architect & Primary Executor
**Focus**: Complex Refactoring, Backend Infrastructure, Security, TypeScript, Heavy Lifting
**Why Kimi**: Highest-ranked for complex reasoning, best rate limits for sustained work

---

## 🧠 Core Principles

### 1. Read CLAUDE.md First
**CRITICAL**: Before starting any session, review [CLAUDE.md](CLAUDE.md) for:
- No Fabrication Rule (verify all resources before using)
- Hydration Safety patterns (never return null conditionally)
- pnpm-only package management
- Dark mode requirements

### 2. Session Discipline
When executing sessions:
1. Run the pre-flight check
2. Execute steps in order
3. Run the verification command
4. If it **passes**: Say "Session X.Y.Z complete. Ready for next session."
5. If it **fails**: Diagnose, fix, then retry verification

**Git discipline**: After EVERY successful session:
```bash
git add -A && git commit -m "session X.Y.Z: [description]"
```

### 3. Rollback on Catastrophic Failure
If a session breaks the build AND you can't fix it in 3 attempts:
```bash
git checkout .
```
Report the specific error to the human.

---

## ✅ Migration Status (Reference)

The following has **already been completed**. Use this as reference, not as tasks to do.

| Component | Status | Location |
|-----------|--------|----------|
| App Router Skeleton | ✅ DONE | `app/layout.tsx`, `app/loading.tsx`, `app/error.tsx`, `app/not-found.tsx` |
| Homepage | ✅ DONE | `app/page.tsx` |
| About Page | ✅ DONE | `app/about/page.tsx` |
| Contact Page | ✅ DONE | `app/contact/page.tsx` |
| Science Page | ✅ DONE | `app/science/page.tsx` |
| Blog Index | ✅ DONE | `app/blog/page.tsx` |
| Blog Posts | ✅ DONE | `app/blog/[slug]/page.tsx` |
| API Routes | ✅ DONE | `app/api/**/route.ts` |
| i18n | ✅ DONE | Locale detection in layout |

---

## 🔧 CURRENT PRIORITY: Remaining Work

### Phase 1: Legacy Cleanup ⚠️ HIGH PRIORITY

#### Session 1.A.1: Remove Legacy Pages Router Files

**Requires**: All App Router equivalents confirmed working
**Max files**: 50
**Estimated tool calls**: 30

**Why**: Pages Router files can conflict with App Router. If both exist, behavior is undefined.

**Pre-flight check**:
```bash
cd /Users/macmini/dev/purr
# Check for duplicate routes
ls -la pages/about/ pages/science.tsx pages/contact.tsx 2>/dev/null || echo "Some expected files may be missing"
```

**Steps**:
1. Verify App Router pages function correctly by visiting:
   - `/` (homepage)
   - `/about`
   - `/science`
   - `/contact`
   - `/blog`
   - `/blog/[any-post-slug]`

2. If App Router versions work, delete the Pages Router equivalents:
   ```bash
   # Only delete if App Router version works!
   rm -f pages/about/our-story.tsx pages/science.tsx pages/contact.tsx
   rm -rf pages/blog/*.tsx  # Keep pages/blog if it contains non-page files
   ```

3. Do NOT delete:
   - `pages/_app.tsx` (still needed for providers)
   - `pages/_document.tsx` (still needed for document structure)
   - `pages/api/*` (only if not migrated to app/api/)
   - Any pages not yet migrated

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm build 2>&1 | tail -20
```

**Exit criteria**:
- [ ] Build succeeds
- [ ] All App Router pages still accessible
- [ ] No 404s on migrated routes

**On success**:
```bash
git add -A && git commit -m "session 1.A.1: remove legacy pages router files"
```

---

### Phase 2: TypeScript & Code Quality

#### Session 2.1.1: Enable TypeScript Strict Mode

**Requires**: Clean build
**Max files**: 50+
**Estimated tool calls**: 100

**Note**: This may produce many errors. If >100 errors, report count and ask for guidance.

**Steps**:
1. Check current strictness:
```bash
grep -A5 '"compilerOptions"' tsconfig.json | head -10
```

2. If not already strict, update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

3. Run initial check:
```bash
pnpm tsc --noEmit 2>&1 | head -50
```

4. Fix errors in priority order:
   - `src/lib/*` first (core utilities)
   - `src/components/*` second (UI)
   - `app/*` last (routes)

5. Common fixes:
   - Add explicit types to function parameters
   - Handle null/undefined with optional chaining
   - Add return types to exported functions

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm tsc --noEmit 2>&1 | tail -10
```

**Exit criteria**:
- [ ] `pnpm tsc --noEmit` exits with code 0
- [ ] `pnpm build` succeeds

**On success**:
```bash
git add -A && git commit -m "session 2.1.1: enable typescript strict mode"
```

---

### Phase 3: Security Hardening

#### Session 3.1.1: Implement Field-Level Encryption

**Requires**: Session 2.1.1 (strict mode helps catch issues)
**Max files**: 8
**Estimated tool calls**: 40

**Steps**:
1. Check if encryption already exists:
```bash
ls src/lib/encryption.ts 2>/dev/null || echo "Does not exist"
```

2. If it doesn't exist, create `src/lib/encryption.ts`:
```typescript
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

function getKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error('ENCRYPTION_KEY environment variable is required');
  }
  return Buffer.from(key, 'hex');
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

export function decrypt(data: string): string {
  const [ivHex, authTagHex, encrypted] = data.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
```

3. Add to `.env.local.example`:
```
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
ENCRYPTION_KEY=your-64-character-hex-key-here
```

4. Consider adding Prisma middleware for automatic encryption of PII fields.

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm build
```

**On success**:
```bash
git add -A && git commit -m "session 3.1.1: implement field-level encryption"
```

---

#### Session 3.2.1: API Rate Limiting

**Requires**: App Router API routes working
**Max files**: 10
**Estimated tool calls**: 35

**Steps**:
1. Check if rate limiting exists:
```bash
grep -r "ratelimit\|rate-limit" src/lib/ 2>/dev/null || echo "Not found"
```

2. If not present, install dependencies:
```bash
pnpm add @upstash/ratelimit @upstash/redis
```

3. Create `src/lib/rate-limit.ts`:
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export const ratelimit = {
  // General API: 60 requests per minute
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '1 m'),
    analytics: true,
  }),
  
  // Checkout: 10 requests per minute (more restrictive)
  checkout: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
  }),
  
  // Contact form: 5 requests per minute
  contact: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'),
  }),
};

export async function checkRateLimit(
  limiter: typeof ratelimit.api,
  identifier: string
): Promise<{ success: boolean; remaining: number }> {
  const { success, remaining } = await limiter.limit(identifier);
  return { success, remaining };
}
```

4. Apply to sensitive routes in `app/api/checkout/route.ts` and `app/api/contact/route.ts`.

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm build
```

**On success**:
```bash
git add -A && git commit -m "session 3.2.1: implement api rate limiting"
```

---

### Phase 4: Performance Optimization

#### Session 4.1.1: Bundle Analysis and Optimization

**Requires**: Clean build
**Max files**: 15
**Estimated tool calls**: 45

**Steps**:
1. Run bundle analyzer:
```bash
cd /Users/macmini/dev/purr && ANALYZE=true pnpm build
```

2. Identify largest imports in the report.

3. Common optimizations:
   - Replace barrel imports with specific imports:
     ```typescript
     // ❌ Bad
     import { Calendar, Clock, Star } from 'lucide-react';
     
     // ✅ Good
     import Calendar from 'lucide-react/dist/esm/icons/calendar';
     import Clock from 'lucide-react/dist/esm/icons/clock';
     import Star from 'lucide-react/dist/esm/icons/star';
     ```
   
   - Add `dynamic()` for heavy components:
     ```typescript
     import dynamic from 'next/dynamic';
     
     const HeavyChart = dynamic(() => import('./HeavyChart'), {
       loading: () => <ChartSkeleton />,
       ssr: false,
     });
     ```

4. Check First Load JS in build output.

**Verification**:
```bash
cd /Users/macmini/dev/purr && pnpm build 2>&1 | grep "First Load JS"
```
**Target**: Main bundle < 150KB

**On success**:
```bash
git add -A && git commit -m "session 4.1.1: bundle size optimization"
```

---

## 🧪 Verification Commands Reference

| Action | Command |
|--------|---------|
| Full build | `pnpm build` |
| Type checking | `pnpm tsc --noEmit` |
| Linting | `pnpm lint` |
| All validations | `pnpm lint && pnpm check-types && pnpm validate-dark-mode && pnpm validate-hydration` |
| Run dev server | `pnpm dev` |
| Test specific page | `curl -I http://localhost:3000/[path]` |

---

## 🚨 Emergency Procedures

### Build Broken After Changes
```bash
# Check what changed
git diff --stat

# If fixable, fix it
# If not, rollback
git checkout .
```

### Hydration Errors in Production
See [CLAUDE.md Hydration Safety section](CLAUDE.md#-hydration-safety--authentication) for patterns to fix.

### TypeScript Errors Overwhelming
```bash
# Get count of errors
pnpm tsc --noEmit 2>&1 | grep "error TS" | wc -l

# If >100, report to human and ask for prioritization
```

---

## 📋 Session Execution Checklist

Before starting any session:
- [ ] Read the session requirements
- [ ] Run pre-flight check
- [ ] Ensure dev server is running: `pnpm dev`

During session:
- [ ] Follow steps in order
- [ ] Don't touch unrelated code
- [ ] Keep changes minimal and focused

After session:
- [ ] Run verification command
- [ ] If failed: diagnose and fix
- [ ] If passed: commit with proper message
- [ ] Report completion status

---

## 📚 Key Documentation

| Document | Purpose |
|----------|---------|
| [CLAUDE.md](CLAUDE.md) | **Read first**. Core principles, patterns, commands |
| [INSTRUCTIONS_CLAUDE.md](INSTRUCTIONS_CLAUDE.md) | When to use Claude for review |
| [INSTRUCTIONS_GEMINI.md](INSTRUCTIONS_GEMINI.md) | Asset optimization, visual testing |
| [docs/HYDRATION_SAFETY.md](docs/HYDRATION_SAFETY.md) | Avoid hydration errors |
| [docs/NO_FABRICATION_RULE.md](docs/NO_FABRICATION_RULE.md) | Never fabricate resources |

---

**Last Updated:** 2026-01-31
