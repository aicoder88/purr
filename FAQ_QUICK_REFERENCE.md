# FAQ & Question Content Quick Reference

## Quick File Locations

### Main FAQ Files
- **FAQ Page (Dedicated):** `/Users/macpro/dev/purr/pages/learn/faq.tsx`
- **FAQ Component (Reusable):** `/Users/macpro/dev/purr/src/components/sections/faq.tsx`
- **FAQ Translations:** `/Users/macpro/dev/purr/src/translations/{en,fr,zh}.ts`

### How-To Pages with Q&A
- **How to Use Deodorizer:** `/Users/macpro/dev/purr/pages/learn/how-to-use-deodorizer.tsx`
- **Blog: How to Use:** `/Users/macpro/dev/purr/pages/blog/how-to-use-cat-litter-deodorizer.tsx`

### Educational Pages with Embedded Q&A
- **How It Works:** `/Users/macpro/dev/purr/pages/learn/how-it-works.tsx` (4 FAQs)
- **Most Powerful Absorber:** `/Users/macpro/dev/purr/pages/blog/most-powerful-odor-absorber.tsx` (3 FAQs)

---

## FAQ Content Matrix

| Page | Location | Type | Q&A Count | Schema | Features |
|------|----------|------|-----------|--------|----------|
| FAQ Main | `/learn/faq` | Dedicated Page | 12 | FAQPage | Searchable, Categorized, Sortable |
| How It Works | `/learn/how-it-works` | Embedded | 4 | Article | Educational context |
| How to Use | `/learn/how-to-use-deodorizer` | Guide + FAQ | 5 steps + 3 Q&A | HowTo | Troubleshooting |
| Most Powerful | `/blog/most-powerful-odor-absorber` | Blog + FAQ | 3 | Article | Comparison focused |
| Blog How-To | `/blog/how-to-use-cat-litter-deodorizer` | Blog | HowTo steps | HowTo | Step-by-step |

---

## Question Types by Page

### Product Questions (7 items)
1. What is Purrify?
2. How does it work?
3. Is it safe?
4. How much to use?
5. How long does it last?
6. Works with all litter?
7. Will cat notice?

### Usage Questions (3+ items)
1. How to apply?
2. How often to reapply?
3. Can combine with other products?

### Safety/Special Use
1. For rodents?
2. For kittens?
3. Ingestion concerns?

---

## Structured Data Reference

### FAQPage Schema (Main FAQ)
```
@context: schema.org
@type: FAQPage
mainEntity: [Array of Question objects]
```
**Location:** Automatically generated in `/pages/learn/faq.tsx`

### HowTo Schema (How-To Pages)
```
@context: schema.org
@type: HowTo
name, description, image, totalTime, estimatedCost, supply[], step[]
```
**Locations:** 
- `/pages/learn/how-to-use-deodorizer.tsx`
- `/pages/blog/how-to-use-cat-litter-deodorizer.tsx`

### Article Schema (Educational)
```
@context: schema.org
@type: Article
headline, description, image, author, datePublished, dateModified
```
**Locations:** Most blog posts and learn pages

---

## Translation Keys for FAQ

```typescript
// Main FAQ section
t.faq.title
t.faq.commonQuestions
t.faq.subtitle
t.faq.stillHaveQuestions
t.faq.contactTeam
t.faq.forMoreInfo
t.faq.items[] // Array of { question, answer, link? }

// FAQ page specific
t.faq.faqPage.questions[]
```

---

## Component Integration

### Using FAQ Component
```tsx
import { FAQ } from '@/components/sections/faq';

// Basic usage
<FAQ />

// With structured data
<FAQ includeStructuredData={true} />
```

### Accordion Component Used
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
```

---

## Dark Mode Support

All FAQ components include dark mode support:
- Light mode: `bg-white dark:bg-gray-800`
- Text: `text-gray-900 dark:text-gray-100`
- Borders: `border-[#E0EFC7] dark:border-gray-700`

---

## SEO Best Practices Implemented

✓ FAQPage schema for featured snippets
✓ HowTo schema for how-to pages
✓ Proper heading hierarchy
✓ Keyword-rich titles
✓ Internal linking between related content
✓ Breadcrumb navigation
✓ Meta descriptions
✓ Open Graph tags
✓ Canonical URLs
✓ Language alternates

---

## Common Update Scenarios

### Updating FAQ Content
1. Edit `/src/translations/en.ts` (English)
2. Edit `/src/translations/fr.ts` (French)
3. Edit `/src/translations/zh.ts` (Chinese)
4. Also update `/pages/learn/faq.tsx` hardcoded items (backup)
5. Test in all 3 languages
6. Verify schema IDs are unique

### Adding New How-To Page
1. Create new file in `/pages/blog/` or `/pages/learn/`
2. Include HowTo schema with steps
3. Add related articles at bottom
4. Include troubleshooting Q&A section
5. Add images for each step
6. Update translations if needed

### Adding Blog Post with Q&A
1. Create blog post in `/pages/blog/`
2. Include FAQ array with question/answer pairs
3. Generate Question schema in additionalMetaTags or script tag
4. Add to RelatedArticles component references
5. Include proper keywords in title

---

## Testing Checklist

- [ ] Search functionality works
- [ ] Category filters work
- [ ] Accordion opens/closes smoothly
- [ ] Dark mode displays correctly
- [ ] Mobile responsive (tested at 375px, 768px, 1024px)
- [ ] Keyboard navigation accessible (Tab, Enter, Arrow keys)
- [ ] Schema validates at schema.org validator
- [ ] Related articles appear
- [ ] Links to /learn/safety work
- [ ] CTA button links work
- [ ] Contact section displays correctly

---

## Performance Notes

- FAQ component uses lazy loaded accordion (Radix UI optimized)
- No extra API calls needed (all data in component/translations)
- Images use Next Image for optimization
- Search is client-side (no backend calls)
- Schema generation is automatic at build time

---

## Accessibility Features

- Accordion keyboard navigation (ARIA compliant)
- Proper heading levels (h1 > h2 > h3)
- Color contrast meets WCAG AA standards
- All buttons have proper aria-labels
- Links have descriptive text
- Images have alt text

