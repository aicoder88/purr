# Instructions for Claude (Content & Edge Cases)

**Role**: Content Quality & Edge Case Handler
**Focus**: Copy polish, nuanced decisions, second-opinion reviews
**Why Claude**: Good for human-like writing quality and careful edge case analysis

---

## 🎯 When to Use Claude

Claude is **NOT the primary executor**. Use Claude for:

1. **Content Review**: After Kimi migrates pages, have Claude review for:
   - Missing SEO metadata
   - Awkward copy that needs polish
   - Accessibility issues

2. **Edge Case Debugging**: When Kimi gets stuck on an obscure issue

3. **Security Review**: Second opinion on encryption/auth implementations

---

## 📋 Optional Sessions

### Session R.1: Post-Migration Content Audit

**Requires**: All of Phase 1 complete
**Trigger**: After Kimi finishes blog migration

**What to do**:
1. Paste this instruction to Claude:

```
Review the migrated blog pages in /Users/macmini/dev/purr/app/blog/ for:

1. SEO metadata completeness:
   - Does every page have title, description?
   - Are Open Graph images set?

2. Copy quality:
   - Any awkward phrasing after migration?
   - Any broken formatting?

3. Accessibility:
   - Do images have alt text?
   - Is heading hierarchy correct (h1 → h2 → h3)?

Report issues in a list format. Do not fix, just report.
```

**Output**: List of issues for Kimi to fix

---

### Session R.2: Security Implementation Review

**Requires**: Session 2.1.1 complete
**Trigger**: After Kimi implements encryption

**What to do**:
1. Paste this instruction to Claude:

```
Review the encryption implementation in /Users/macmini/dev/purr/src/lib/encryption.ts

Check for:
1. Is the key derivation secure?
2. Is the IV properly randomized?
3. Is there a timing attack vulnerability?
4. Are there any edge cases that could leak plaintext?

Also review the Prisma middleware that uses this encryption.

Report any security concerns.
```

**Output**: Security assessment

---

### Session R.3: API Rate Limiting Review

**Requires**: Session 2.2.1 complete
**Trigger**: After Kimi implements rate limiting

**What to do**:
1. Paste this instruction to Claude:

```
Review the rate limiting implementation in /Users/macmini/dev/purr

1. Are the limits appropriate for each endpoint?
2. Can rate limits be bypassed (IP spoofing, etc.)?
3. Is there proper error handling when limits are hit?
4. Are authenticated users handled differently than anonymous?

Report any concerns.
```

---

## 📝 Copy Polish Sessions

### Session C.1: Error Message Polish

**Trigger**: Any time

**What to do**:
1. Ask Claude to review error messages:

```
Search for all user-facing error messages in /Users/macmini/dev/purr

Criteria:
- Are they helpful to the user?
- Do they avoid technical jargon?
- Do they suggest next steps?

Rewrite any poor error messages to be more user-friendly.
```

---

### Session C.2: SEO Content Enhancement

**Trigger**: Before final deployment

**What to do**:
1. Ask Claude to review meta descriptions:

```
Review all generateMetadata() functions in /Users/macmini/dev/purr/app/

For each:
- Is the description compelling (not just descriptive)?
- Is it the right length (150-160 chars)?
- Does it include the primary keyword?

Suggest improvements for weak descriptions.
```

---

## ⚠️ Important Notes

1. **Do NOT give Claude the full migration tasks** - That's Kimi's job
2. **Use Claude for review, not implementation**
3. **Claude has lower rate limits** - Save for quality-focused work
