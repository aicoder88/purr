# Dark Mode Implementation TODO

## Current Status
- **Total Violations**: 425 remaining (reduced from 549 - 22.6% improvement)
- **Files Affected**: 62 files
- **Progress**: Successfully applied systematic dark mode patterns across 79 files

## Remaining Violations by File

### Pages with High Priority (20+ violations each)

**pages/dn.tsx** - Complex data visualization page
- Missing dark variants for `text-gray-200`, `text-red-100`, `text-blue-100`, `text-green-100`
- Color-coded sections need dark mode variants
- Charts and data visualization elements

**Multiple French language pages (pages/fr/)**
- `pages/fr/free.tsx` - 10 violations
- `pages/fr/support/shipping.tsx` - 11 violations 
- `pages/fr/products/compare.tsx` - 10 violations
- `pages/fr/learn/science.tsx` - 10 violations
- `pages/fr/learn/faq.tsx` - 8 violations
- `pages/fr/customers/testimonials.tsx` - 5 violations
- `pages/fr/customers/case-studies.tsx` - 7 violations
- `pages/fr/blog/[slug].tsx` - 7 violations
- `pages/fr/about/our-story.tsx` - 4 violations

### Component Files with Violations

**High Priority Components:**
- `src/components/referrals/ViralReferralSystem.tsx` - Social sharing buttons need `text-white dark:text-gray-100`
- `src/components/reviews/ReviewSystem.tsx` - Button hover states missing dark variants
- `src/components/mobile/FastCheckout.tsx` - Multiple button text colors need dark variants
- `src/components/bundles/SmartBundles.tsx` - Badge colors need dark variants

**Medium Priority Components:**
- `src/components/newsletter/NewsletterSignup.tsx` - Icon colors
- `src/components/sections/benefits.tsx` - Icon colors  
- `src/components/sections/contact.tsx` - Icon colors
- `src/components/sections/cta.tsx` - Text opacity classes
- `src/components/sections/features.tsx` - Icon colors
- `src/components/sections/stores.tsx` - Icon colors
- `src/components/sections/subscription-offer.tsx` - Badge colors
- `src/components/sections/urgency-banner.tsx` - Highlight text colors
- `src/components/social-proof/LivePurchaseNotifications.tsx` - Icon colors
- `src/components/subscription/SubscriptionPlans.tsx` - Badge colors

### Specific Pattern Fixes Needed

**Common Missing Patterns:**
```
❌ text-white (without dark variant)
✅ text-white dark:text-white dark:text-gray-100

❌ text-gray-200 (without dark variant)  
✅ text-gray-200 dark:text-gray-300

❌ text-green-800 (without dark variant)
✅ text-green-800 dark:text-green-200

❌ text-blue-600 (without dark variant)
✅ text-blue-600 dark:text-blue-400

❌ text-yellow-300 (without dark variant)
✅ text-yellow-300 dark:text-yellow-400
```

## Next Session Action Plan

### Phase 1: Complete French Pages (Estimated: 50 violations)
1. Run targeted fixes on all `pages/fr/` files
2. Focus on form elements, navigation, and content sections
3. Apply consistent patterns across all French translations

### Phase 2: Component Deep Dive (Estimated: 200 violations)
1. **Referral System** - Fix social sharing buttons and tier badges
2. **Review System** - Fix button states and user avatars  
3. **Mobile Components** - Fix FastCheckout and MobilePayment
4. **Section Components** - Fix icon colors and CTAs systematically

### Phase 3: Specialized Pages (Estimated: 175 violations)
1. **Data Visualization** (`pages/dn.tsx`) - Fix chart colors and metrics
2. **Customer Pages** - Fix testimonials and case study layouts
3. **Demo Pages** - Fix interactive elements and feature showcases

## Automated Scripts to Use

```bash
# Run comprehensive fixes
node scripts/fix-dark-mode.js

# Target specific directories
node scripts/fix-dark-mode.js 'pages/fr/**/*.tsx'
node scripts/fix-dark-mode.js 'src/components/sections/**/*.tsx'

# Clean up duplicates after fixes  
node scripts/cleanup-dark-mode.js

# Validate progress
npm run validate-dark-mode
```

## Success Metrics for Next Session

**Target**: Reduce from 425 to under 200 violations (50%+ improvement)

**Key Milestones:**
- [ ] All French pages achieve dark mode compliance
- [ ] All section components achieve dark mode compliance  
- [ ] All mobile components achieve dark mode compliance
- [ ] Data visualization pages achieve dark mode compliance

## Notes for Next Developer

- Use the same systematic approach: automated scripts + manual cleanup
- Focus on one category at a time (pages/fr/, then components, then specialized)
- Always run cleanup script after automated fixes to remove duplicates
- Test components in both light and dark modes after fixes
- The pattern library is working well - stick to established conventions

**Most Critical Files to Fix First:**
1. `pages/fr/` directory (user-facing French content)
2. `src/components/referrals/ViralReferralSystem.tsx` (business-critical)
3. `src/components/mobile/FastCheckout.tsx` (conversion-critical)
4. `src/components/reviews/ReviewSystem.tsx` (trust-building)

---
*Generated after Session 3: Reduced violations from 549 → 425 (22.6% improvement)*
*Target for Session 4: 425 → <200 violations (50%+ improvement)*