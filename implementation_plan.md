# Implementation Plan - Website Enhancements

This plan outlines the steps to implement the visual and UX improvements approved by the user.

## User Review Required
- [ ] Review the new color palette in action (Deep Coral / Electric Indigo).
- [ ] Approve the new typography (Outfit for headings).

## Proposed Changes

### 1. Foundation: Design System Updates
#### [MODIFY] [tailwind.config.js](file:///Users/macpro/dev/purr/tailwind.config.js)
- Add new color tokens: `deep-coral`, `electric-indigo`, `deep-slate`.
- Add new font families: `outfit` (headings), `satoshi` or `inter` (body).
- Add new animation utilities (mesh gradient movement).

#### [MODIFY] [src/index.css](file:///Users/macpro/dev/purr/src/index.css)
- Update CSS variables for the new theme colors.
- Add mesh gradient utility classes.
- Refine glassmorphism classes.

#### [MODIFY] [pages/_app.tsx](file:///Users/macpro/dev/purr/pages/_app.tsx)
- Import and configure the `Outfit` font using `next/font/google`.

### 2. Component: Hero Section Revamp
#### [MODIFY] [src/components/sections/hero.tsx](file:///Users/macpro/dev/purr/src/components/sections/hero.tsx)
- Implement split-screen layout.
- Add lifestyle image.
- Improve "7 Days" promise visualization.
- Update CTA styling.

### 3. Component: Product Comparison Polish
#### [MODIFY] [src/components/sections/enhanced-product-comparison.tsx](file:///Users/macpro/dev/purr/src/components/sections/enhanced-product-comparison.tsx)
- Simplify badges.
- Highlight subscription option more elegantly.
- Add toggle for "Subscribe" vs "One-time" (optional, if complexity permits).

### 4. Content: Science Section
#### [NEW] [src/components/sections/science-section.tsx](file:///Users/macpro/dev/purr/src/components/sections/science-section.tsx)
- Create a new section explaining the activated carbon technology.
- Use macro imagery/diagrams.

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure no type errors or build failures.

### Manual Verification
- **Visual Check**: Verify the new colors and fonts look good in both Light and Dark modes.
- **Responsiveness**: Check the new Hero and Product Comparison on mobile and desktop.
- **Browser Testing**: Use the browser tool to capture screenshots of the updated homepage.
