# Master Coordination Plan

> **Version**: 2.2  
> **Date**: 2026-01-30  
> **Status**: Active

---

## 🎯 Agent Assignments (Revised)

| Agent | Primary Role | Why |
|-------|--------------|-----|
| **Kimi K2.5** | Architecture, Backend, Security, Heavy Refactoring | Highest-ranked for reasoning, best rate limits |
| **Claude Opus/Sonnet** | Content polish, Edge cases, Review | Good for nuanced decisions, second opinion |
| **Gemini** | Image processing, Data scripts, SEO audits | Batch operations, pattern matching |

---

## 📋 Execution Order (For Non-Programmers)

### Step 0: Preparation (5 minutes)
1. Open Terminal on your Mac
2. Navigate to project: `cd /Users/macmini/dev/purr`
3. Make sure everything is saved: `git add -A && git commit -m "backup before improvement plan"`
4. Create a new branch: `git checkout -b improvement-plan`

---

### Step 1: Feed Kimi Its Instructions (Session 1.1.1)

**What to do**:
1. Open the Kimi K2.5 chat interface
2. Copy the ENTIRE contents of `INSTRUCTIONS_KIMI.md`
3. Paste it into Kimi
4. Add this prompt at the end:

```
Execute Session 1.1.1 now. The codebase is at /Users/macmini/dev/purr. 
After completion, tell me: "Session 1.1.1 complete. Ready for next session."
```

**Wait for**: Kimi says "Session 1.1.1 complete"

**Why wait**: Session 1.1.1 creates the App Router skeleton. Nothing else can happen until this exists.

---

### Step 2: Parallel Work Begins

**Once Session 1.1.1 is complete, you can run these IN PARALLEL:**

| Agent | Task | How |
|-------|------|-----|
| **Kimi** | Sessions 1.1.2, 1.1.3, 1.1.5 | Keep the same Kimi chat, say "Continue to Session 1.1.2" |
| **Gemini** | Session 3.2.1 (Image Optimization) | Open Gemini, paste `INSTRUCTIONS_GEMINI.md`, say "Execute Session 3.2.1" |

**Important**: 
- Kimi and Gemini work on DIFFERENT folders (no conflict)
- Kimi: `app/`, `pages/api/`, `src/lib/`
- Gemini: `public/`, `scripts/`

---

### Step 3: Wait for Kimi to Finish Core Migration

**Sessions Kimi needs to complete in order**:
1. 1.1.1 ✓ (already done)
2. 1.1.2 (about, science, contact pages)
3. 1.1.3 (blog index and dynamic route)
4. 1.1.5 (API routes)

**After each session, verify**:
```bash
cd /Users/macmini/dev/purr && pnpm run build
```
If it fails, tell Kimi: "Build failed with error: [paste error]"

---

### Step 4: Blog Post Migration (Large Batch)

**What to do**:
1. Continue with Kimi: "Execute Session 1.1.4a"
2. This migrates 14 custom TSX blog posts
3. Wait for completion
4. Verify: `pnpm run build`
5. Then: "Execute Session 1.1.4b" (remaining 14 posts)

**This takes the longest** because there are 28 custom blog posts.

---

### Step 5: i18n and TypeScript Fixes

**After 1.1.4 is done**:
1. Kimi: "Execute Session 1.1.6" (i18n fixes)
2. Kimi: "Execute Session 1.3.1" (TypeScript strict mode)

---

### Step 6: Security Phase

**After Phase 1 complete**:
1. Kimi: "Execute Session 2.1.1" (encryption)
2. Kimi: "Execute Session 2.2.1" (rate limiting)
3. Kimi: "Execute Session 2.3.1" (input validation)

---

### Step 7: Performance & Testing

**After Phase 2 complete**:
1. Kimi: "Execute Session 3.1.1" (bundle optimization)
2. Gemini: "Execute Session 4.2.1" (visual regression testing)

---

### Step 8: Final Verification

**When all sessions are complete**:
```bash
cd /Users/macmini/dev/purr
pnpm run build
pnpm test
```

If both pass:
```bash
git add -A && git commit -m "improvement plan complete"
git checkout main
git merge improvement-plan
```

---

## 🚨 If Something Goes Wrong

**If an agent makes an error**:
1. Tell the agent: "Revert changes and try again"
2. If still broken: `git checkout .` (reverts all uncommitted changes)
3. If committed but broken: `git revert HEAD`

**If you need to stop mid-way**:
1. Note which session you completed
2. `git add -A && git commit -m "paused at session X.Y.Z"`
3. Resume later by telling the agent: "Resume from Session X.Y.Z"

---

## � File Reference

| File | Purpose | Feed to |
|------|---------|---------|
| `MASTER_COORDINATION.md` | This file - your guide | You (human) |
| `INSTRUCTIONS_KIMI.md` | Heavy lifting tasks | Kimi K2.5 |
| `INSTRUCTIONS_CLAUDE.md` | Content review, edge cases | Claude (optional) |
| `INSTRUCTIONS_GEMINI.md` | Image/data processing | Gemini |
