# TypeScript Code Cleanup Plan

## Issues Summary
- **88 TypeScript unused identifier issues** across **34 files**
- **1 API compatibility error** in AI client

## Cleanup Strategy

### Phase 1: Quick Wins (Unused Imports)
- [ ] Remove unused imports from all files
- [ ] Remove unused variable declarations
- [ ] Remove unused function parameters where safe

### Phase 2: Complex Fixes
- [ ] Fix AI client API compatibility error
- [ ] Address `createCityPage.tsx` (20 issues - highest priority)
- [ ] Fix other location-based components

### Phase 3: Verification
- [ ] Run TypeScript check
- [ ] Test all functionality
- [ ] Ensure no breaking changes

## Files by Priority

### High Priority (Most Issues)
1. `src/components/sections/locations/createCityPage.tsx` - 20 issues
2. `src/components/analytics/ReferralAnalyticsDashboard.tsx` - 7 issues
3. `src/components/referrals/SocialShareTools.tsx` - 5 issues

### Medium Priority
4. `pages/products/trial-size.tsx` - 4 issues
5. `src/components/customer/CustomerSupport.tsx` - 4 issues
6. `src/components/referrals/ViralReferralSystem.tsx` - 4 issues
7. Other files with 1-3 issues each

## Success Criteria
- [ ] All 88 unused identifier issues resolved
- [ ] API compatibility error fixed
- [ ] TypeScript compilation passes
- [ ] No functionality broken
- [ ] Build process completes successfully
