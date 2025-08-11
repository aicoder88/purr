# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Purrify is a Next.js e-commerce website for an activated carbon cat litter additive product. The application features:

- Multi-language support (English, French, Chinese)
- E-commerce functionality with Stripe integration
- Blog system for SEO
- Advanced image optimization
- Performance monitoring and analytics
- Internationalization (i18n) with Next.js

## Common Development Commands

### Development
- `npm run dev` - Start development server
- `npm run predev` - Clear webpack cache before dev
- `npm run build` - Build for production (includes prebuild step)
- `npm run start` - Start production server

### Code Quality
- `npm run lint` - Run ESLint
- `npm run check-types` - Run TypeScript type checking

### Performance & Optimization
- `npm run optimize-images` - Optimize individual images
- `npm run optimize-all-images` - Optimize all images in project
- `npm run optimize-performance` - Run performance optimization scripts
- `npm run analyze` - Analyze bundle size with webpack-bundle-analyzer
- `npm run performance:audit` - Run complete performance audit

### Cache Management
- `npm run clear-cache` - Clear webpack cache
- `npm run purge-vercel-cache` - Purge Vercel cache

### SEO & Sitemaps
- `npm run generate-enhanced-sitemap` - Generate comprehensive sitemap
- `npm run seo:optimize` - Run SEO optimization

## Architecture & Key Components

### Framework & Structure
- **Framework**: Next.js 15 (Pages Router)
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context (CartProvider, TranslationProvider)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe integration
- **Deployment**: Vercel

### Directory Structure
- `pages/` - Next.js pages (uses Pages Router, not App Router)
- `src/components/` - React components organized by purpose:
  - `sections/` - Page sections (hero, testimonials, etc.)
  - `ui/` - Reusable UI components (shadcn/ui)
  - `layout/` - Layout components (header, footer)
  - `theme/` - Theme provider and toggle
- `src/lib/` - Utility functions and configurations
- `src/translations/` - i18n translation files
- `scripts/` - Build and optimization scripts
- `prisma/` - Database schema and migrations

### Internationalization
- Uses Next.js i18n with custom TranslationProvider
- Supported locales: `en` (default), `fr`, `zh`
- Translation files in `src/translations/`
- Domain-based locale routing configured in `next.config.js`

### Image Optimization
- Custom image optimization pipeline with Sharp
- Multiple formats: AVIF, WebP, JPG fallbacks
- Optimized images stored in `public/optimized/`
- Original images in `public/original-images/`

### Performance Features
- Advanced webpack optimization with custom chunk splitting
- Aggressive caching headers for static assets
- Image optimization with multiple formats
- Bundle analysis tools
- Performance monitoring

## Database Schema
The application uses Prisma with PostgreSQL and includes:
- User management with NextAuth.js integration
- Product catalog
- Order system with customer data
- Referral system

Key models: User, Product, Order, Customer, OrderItem, Referral

## Key Configuration Files
- `next.config.js` - Extensive Next.js configuration with i18n, image optimization, security headers, and webpack customization
- `tailwind.config.js` - Tailwind configuration with custom theme
- `prisma/schema.prisma` - Database schema
- `vercel.json` - Vercel deployment configuration

## Payment Integration
- Stripe integration for payment processing
- API routes for checkout session creation
- Webhook handling for order fulfillment

## SEO & Analytics
- Next SEO for metadata management
- Google Tag Manager integration
- Structured data for organization/product schema
- Comprehensive sitemap generation
- Vercel Analytics integration

## Testing
No formal test framework is currently set up. The project uses TypeScript for type safety and ESLint for code quality.

## Additional Development Commands

### Dependencies & Analysis
- `npm run find-unused-deps` - Check for unused dependencies using depcheck
- `npm run update-deps` - Update browserslist database
- `npm run analyze-js` - Analyze JavaScript bundle composition
- `npm run bundle:analyze` - Advanced bundle analysis
- `npm run cache:optimize` - Optimize cache configuration

### Image & Asset Management
- `npm run add-image-dimensions` - Add dimensions to image metadata
- `npm run types:supabase` - Generate Supabase types placeholder

## Important Notes

### Pages Router vs App Router
This project uses Next.js **Pages Router**, not the newer App Router. All pages are in the `pages/` directory, not `app/`.

### Image Optimization Pipeline
- Original images go in `public/original-images/`
- Optimized images are auto-generated in `public/optimized/` 
- Uses Sharp for AVIF, WebP, and JPG formats
- Run image optimization scripts after adding new images

### Stripe Integration
- Checkout sessions created via `/api/create-checkout-session`
- Webhooks handled at `/api/webhooks/stripe`
- Test payments use Stripe test mode

### Translation System
- Custom translation context in `src/lib/translation-context.tsx`
- Translation files: `src/translations/{en,fr,zh}.ts`
- Use `useTranslation` hook for accessing translations
- Domain-based routing: `purrify.ca` (en), `fr.purrify.ca` (fr), `zh.purrify.ca` (zh)

## Development Best Practices

### Dark Mode Compliance (CRITICAL)
**ALWAYS ensure dark mode compatibility when creating new sections, pages, or modifying existing content:**

**Required Pattern:**
- ❌ NEVER use: `text-gray-600`, `text-gray-700`, `text-gray-800`, `text-gray-900` alone
- ✅ ALWAYS use: `text-gray-600 dark:text-gray-300`, `text-gray-700 dark:text-gray-200`, etc.

**Complete Dark Mode Color System:**

#### Text Colors (CRITICAL - MUST ALWAYS INCLUDE DARK VARIANTS)
- `text-gray-900` → `text-gray-900 dark:text-gray-50` (primary headings, highest contrast)
- `text-gray-800` → `text-gray-800 dark:text-gray-100` (secondary headings)
- `text-gray-700` → `text-gray-700 dark:text-gray-200` (body text, important content)
- `text-gray-600` → `text-gray-600 dark:text-gray-300` (secondary text, labels)
- `text-gray-500` → `text-gray-500 dark:text-gray-400` (subtle text, metadata)
- `text-gray-400` → `text-gray-400 dark:text-gray-500` (very subtle text, placeholders)

#### Background Colors
- `bg-white` → `bg-white dark:bg-gray-800` (cards, modals)
- `bg-gray-50` → `bg-gray-50 dark:bg-gray-900` (page backgrounds)
- `bg-gray-100` → `bg-gray-100 dark:bg-gray-700` (input backgrounds)
- `bg-gray-200` → `bg-gray-200 dark:bg-gray-600` (dividers, borders)

#### Border Colors
- `border-gray-100` → `border-gray-100 dark:border-gray-700` (card borders)
- `border-gray-200` → `border-gray-200 dark:border-gray-600` (input borders)
- `border-gray-300` → `border-gray-300 dark:border-gray-500` (emphasized borders)

#### Special Cases for Better Readability
- For critical text that must be highly visible: `text-gray-900 dark:text-gray-50`
- For body text that needs good readability: `text-gray-700 dark:text-gray-200`
- For secondary information: `text-gray-600 dark:text-gray-300`
- For metadata/timestamps: `text-gray-500 dark:text-gray-400`

**Testing Requirement:**
- Test every new component in both light AND dark modes
- Use browser dev tools or theme toggle to verify readability
- Ensure minimum WCAG AA contrast ratios in both modes

### Creating New Sections & Pages (MANDATORY DARK MODE CHECKLIST)

**When creating any new page or section component, follow this checklist:**

#### 1. Text Readability Checklist
- [ ] **Primary headings**: Use `text-gray-900 dark:text-gray-50`
- [ ] **Secondary headings**: Use `text-gray-800 dark:text-gray-100` 
- [ ] **Body text**: Use `text-gray-700 dark:text-gray-200`
- [ ] **Secondary text/labels**: Use `text-gray-600 dark:text-gray-300`
- [ ] **Metadata/subtle text**: Use `text-gray-500 dark:text-gray-400`
- [ ] **Very subtle text**: Use `text-gray-400 dark:text-gray-500`

#### 2. Background & Container Checklist
- [ ] **Page backgrounds**: Use `bg-gray-50 dark:bg-gray-900`
- [ ] **Card/section backgrounds**: Use `bg-white dark:bg-gray-800`
- [ ] **Input backgrounds**: Use `bg-gray-100 dark:bg-gray-700`
- [ ] **Hover states**: Add dark variants (e.g., `hover:bg-gray-100 dark:hover:bg-gray-700`)

#### 3. Border & Divider Checklist
- [ ] **Card borders**: Use `border-gray-100 dark:border-gray-700`
- [ ] **Input borders**: Use `border-gray-200 dark:border-gray-600`
- [ ] **Dividers**: Use `border-gray-200 dark:border-gray-600`

#### 4. Interactive Elements Checklist
- [ ] **Button text**: Must have appropriate contrast in both modes
- [ ] **Link colors**: Ensure visibility in both light/dark backgrounds  
- [ ] **Icon colors**: Match surrounding text colors with dark variants
- [ ] **Focus states**: Visible in both modes with proper contrast

#### 5. Special Components Checklist
- [ ] **Forms**: All labels, inputs, and helper text have dark variants
- [ ] **Tables**: Headers, borders, and alternating rows work in dark mode
- [ ] **Cards**: Shadows, borders, and content all have dark variants
- [ ] **Modals/Overlays**: Background overlays and content readable in dark mode

#### 6. Testing Protocol (MANDATORY)
1. **Build the component in light mode first**
2. **Switch to dark mode and verify**:
   - All text is clearly readable
   - No elements disappear or become invisible
   - Contrast meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
3. **Test interactions in both modes**:
   - Hover states
   - Focus states  
   - Active states
4. **Mobile testing**: Verify both modes work on mobile devices

#### 7. Common Dark Mode Mistakes to Avoid
- ❌ Using single gray classes without dark variants
- ❌ Hardcoding white/black colors without considering dark mode
- ❌ Assuming icons will be visible on dark backgrounds
- ❌ Not testing form inputs and placeholders in dark mode
- ❌ Forgetting hover/focus states for dark mode
- ❌ Using low-contrast colors that become invisible in dark mode

#### 8. Quick Dark Mode Validation
**Before committing any new section/page, run this quick check:**
```bash
# 1. Switch browser to dark mode
# 2. Navigate to your new section/page
# 3. Verify you can read ALL text elements
# 4. Check that no UI elements are invisible
# 5. Test any interactive elements (buttons, links, forms)
```

**If ANY element is hard to read or invisible in dark mode, it MUST be fixed before deployment.**

### AUTOMATED ENFORCEMENT SYSTEM

**🚨 CRITICAL: The build process will now FAIL if dark mode violations are detected!**

#### Validation Commands
- `npm run validate-dark-mode` - Run dark mode validation manually
- Validation automatically runs during `npm run build` - **build will FAIL if violations found**

#### What Gets Validated
The automated system checks for these critical patterns:
- ❌ `text-gray-[1-9]00` without `dark:` variant
- ❌ `text-white` without `dark:` variant  
- ❌ `text-red-[1-9]00` without `dark:` variant
- ❌ `text-green-[1-9]00` without `dark:` variant
- ❌ `text-blue-[1-9]00` without `dark:` variant
- ❌ All color classes without dark mode variants

#### Preventing Future Mistakes
**BEFORE creating any new component or editing existing ones:**
1. **Run validation**: `npm run validate-dark-mode`
2. **Fix ALL errors** before continuing
3. **Build will fail** if any dark mode violations exist
4. **No exceptions** - every text element MUST have dark variants

#### How to Ensure You Never Make This Mistake Again

**Step 1: Always Use This Checklist**
When writing ANY className with text colors:
- [ ] Did I add a `dark:` variant?
- [ ] Is the dark variant readable on dark backgrounds?
- [ ] Does it meet WCAG contrast requirements?

**Step 2: Use These Safe Patterns**
Copy-paste these EXACT patterns - don't modify:
```
text-gray-900 dark:text-gray-50    // Headings
text-gray-800 dark:text-gray-100   // Subheadings  
text-gray-700 dark:text-gray-200   // Body text
text-gray-600 dark:text-gray-300   // Secondary text
text-gray-500 dark:text-gray-400   // Subtle text
```

**Step 3: Test Immediately**
After adding ANY text element:
1. Switch browser to dark mode
2. Verify the text is clearly visible
3. Run `npm run validate-dark-mode`

**Step 4: No Shortcuts**
- ❌ Never think "I'll add dark mode later"
- ❌ Never assume existing colors will work
- ❌ Never skip the validation step
- ✅ ALWAYS add dark variants immediately

### UX Interaction Guidelines

**Dropdown Menus:**
- Use minimum 500ms delay for `onMouseLeave` timeouts
- Always include `data-dropdown` attributes for proper hover detection
- Test dropdown navigation flow on both desktop and mobile

**Social Proof Elements:**
- Purchase notifications: 45-75 second intervals (not faster)
- Initial delays: 2-3 minutes after page load
- Maximum 3 concurrent notifications
- Always include close/dismiss functionality

**Interactive Elements:**
- Hover states should have 300-500ms transition delays
- Focus states must be visible and accessible
- Touch targets minimum 44px for mobile

### Content & Legal Guidelines

**Brand Name Usage:**
- ❌ NEVER mention competitor brand names directly in content
- ✅ Use generic terms: "baking soda additives", "traditional solutions"
- ✅ Compare technologies, not branded products
- ✅ Focus on ingredient science rather than product names

**Content Patterns:**
- Blog titles: "Technology vs Technology" instead of "Brand vs Brand"
- Descriptions: Focus on benefits and ingredients
- Links/URLs: Use descriptive technology names

**Examples:**
- ❌ "Purrify vs Arm & Hammer"
- ✅ "Activated Carbon vs Baking Soda Cat Litter Additives"

### Component Development Standards

**Text Content Rules:**
1. Every text element MUST have dark mode variant
2. Use semantic color names from brand palette when possible
3. Avoid hardcoded gray values without dark variants
4. Always consider contrast ratios

**Component Testing Checklist:**
- [ ] Light mode readability
- [ ] Dark mode readability  
- [ ] Mobile responsiveness
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Interactive state feedback

### Performance Guidelines

**Social Proof Components:**
- Limit notification frequency to prevent user annoyance
- Use `useState` and `useEffect` properly to prevent memory leaks
- Implement proper cleanup in component unmount
- Consider user preferences for reduced motion

**Animation Timing:**
- Page load animations: 300-500ms
- Hover effects: 200-300ms
- Dropdown delays: 500ms minimum
- Modal transitions: 200-400ms

## Known Issues & Solutions

### Common Problems Found:
1. **Missing Dark Mode Variants**: Systematic issue across many components
2. **Dropdown Menu Too Fast**: 150ms timeout was too quick for users
3. **Purchase Notifications Too Frequent**: 15-25 seconds was annoying
4. **Brand Name Legal Risk**: Direct competitor mentions in content

### When Making Changes:
- Always run `npm run lint` and `npm run check-types` after changes
- Test components in both light and dark themes
- Check mobile responsiveness
- Verify accessibility with keyboard navigation
- Consider performance impact of interactive elements

## Change Logging Requirements

### MANDATORY: Log All Changes
Every development session MUST be documented in `/CHANGELOG.md` using this format:

```markdown
## [YYYY-MM-DD] - [Brief Session Description]
### Issues Found
- [Problem description with context]

### Changes Made
- [File]: [Change description] - [Reason]

### Impact
- [User/Developer impact]

### Testing Done
- [Verification steps]
```

### What to Log
**Always document:**
- 🔴 **Critical**: Bug fixes, security issues, accessibility problems
- 🟡 **Important**: UX improvements, performance optimizations, new features
- 🟢 **Minor**: Text changes, styling tweaks, configuration updates

**File-level changes:**
- Which files were modified
- What specific changes were made
- Why the change was necessary
- Line numbers for significant modifications

### Benefits of Change Logging
1. **Debugging**: Quick reference for when issues were introduced
2. **Knowledge Transfer**: Future developers understand historical decisions
3. **Pattern Recognition**: Identify recurring problems and solutions
4. **Quality Control**: Track testing and validation steps
5. **Legal/Compliance**: Document brand name changes, accessibility fixes

### Integration with Development Workflow
```bash
# After making changes:
1. Test your changes
2. Run npm run lint && npm run check-types  
3. Document in CHANGELOG.md
4. Commit with descriptive message referencing changelog entry
```

This creates a comprehensive audit trail for all codebase modifications.