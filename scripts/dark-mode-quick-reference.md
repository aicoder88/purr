# 🌙 Dark Mode Quick Reference Guide

## Validation Command
```bash
npm run validate-dark-mode
```

## Common Patterns (Copy & Paste Ready)

### Text Colors
```css
text-gray-900 dark:text-gray-50      /* Headings */
text-gray-800 dark:text-gray-100     /* Sub-headings */
text-gray-700 dark:text-gray-200     /* Body text */
text-gray-600 dark:text-gray-300     /* Secondary text */
text-gray-500 dark:text-gray-400     /* Metadata */
text-gray-400 dark:text-gray-500     /* Disabled text */
```

### Status Colors
```css
text-green-500 dark:text-green-400   /* Success/checkmarks */
text-green-600 dark:text-green-400   /* Success text */
text-green-700 dark:text-green-300   /* Success emphasis */
text-green-800 dark:text-green-200   /* Success strong */

text-red-600 dark:text-red-400       /* Error/warning */
text-red-700 dark:text-red-300       /* Error emphasis */
text-red-800 dark:text-red-200       /* Error strong */

text-yellow-400 dark:text-yellow-300 /* Stars/ratings */
text-yellow-600 dark:text-yellow-400 /* Warning text */
text-yellow-800 dark:text-yellow-200 /* Warning strong */

text-blue-800 dark:text-blue-200     /* Info content */
text-purple-800 dark:text-purple-200 /* Special content */
text-orange-800 dark:text-orange-200 /* Accent content */
text-indigo-600 dark:text-indigo-400 /* Links */
```

### Background Colors
```css
bg-white dark:bg-gray-800           /* Cards/containers */
bg-gray-50 dark:bg-gray-900         /* Page backgrounds */
bg-gray-100 dark:bg-gray-700        /* Secondary backgrounds */
```

### Border Colors
```css
border-gray-100 dark:border-gray-700 /* Light borders */
border-gray-200 dark:border-gray-600 /* Standard borders */
border-gray-300 dark:border-gray-500 /* Emphasized borders */
```

## Acceptable Exceptions

### Brand Elements (Keep text-white)
- Text on branded gradient backgrounds
- Text on solid color backgrounds (bg-[#5B2EFF], bg-[#FF3131])
- Table headers with brand colors
- Step numbers on gradients

### Technical Elements
- Commented code (`//text-color`)
- Console/terminal text
- Code syntax highlighting

## Scripts Available

### Batch Operations
```bash
node scripts/fix-dark-mode-batch.js     # Mass fixes
node scripts/ultimate-dark-mode-cleanup.js  # Comprehensive cleanup
```

### Targeted Fixes
```bash
node scripts/precision-final-cleanup.js  # Pattern-specific
node scripts/surgical-final-fixes.js     # Exact targeting
```

### Utilities  
```bash
node scripts/fix-location-duplicates.js  # Remove duplicates
node scripts/validate-dark-mode.js       # Direct validation
```

## Current Status: 98.9% Compliant ✅

**Remaining acceptable violations:** 4 (all intentional for brand/design)

## Quick Fix Workflow

1. **Run validation:** `npm run validate-dark-mode`
2. **Identify patterns** in the output
3. **Apply common patterns** from this guide
4. **Test both modes** visually
5. **Re-validate:** `npm run validate-dark-mode`

## Pro Tips

- Always include `dark:` variants for new text colors
- Test components in both light and dark mode
- White text on solid brand colors is acceptable
- Use the established color mappings for consistency
- When in doubt, follow existing patterns in the codebase