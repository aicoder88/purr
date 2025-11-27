# TypeScript Code Cleanup Strategy

## Current Status
- **90 TypeScript issues** remaining across 36 files
- **Progress made**: Starting systematic cleanup
- **Strategy**: Focus on high-impact, low-risk fixes first

## Efficient Cleanup Plan

### Phase 1: Quick Wins (Low Risk, High Impact)
1. **Remove unused imports** (20+ files affected)
2. **Remove unused variables** (30+ issues)  
3. **Remove unused function parameters** (15+ issues)
4. **Prefix unused parameters with underscore** (25+ issues)

### Phase 2: Complex Fixes
1. **Fix AI client API compatibility error** (src/lib/blog/ai-client.ts)
2. **Remove unused functions** (5+ functions)
3. **Fix type issues** (3+ type errors)

### Phase 3: Verification
1. Run TypeScript check
2. Run build process
3. Test critical functionality

## Priority Order (by number of issues)
1. `src/components/sections/locations/createCityPage.tsx` - 20 issues
2. `src/components/analytics/ReferralAnalyticsDashboard.tsx` - 7 issues
3. `src/components/referrals/SocialShareTools.tsx` - 5 issues
4. Other files with 1-4 issues each

## Success Metrics
- [ ] All unused identifier issues resolved
- [ ] TypeScript compilation passes without errors
- [ ] Build process completes successfully
- [ ] No functionality broken
- [ ] Code quality improved

## Time Estimate
- Phase 1: 2-3 hours (bulk cleanup)
- Phase 2: 1-2 hours (complex fixes)
- Phase 3: 30 minutes (verification)
- **Total: 4-6 hours for complete cleanup**
