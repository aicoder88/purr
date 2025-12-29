# Visual Design Patterns

Quick reference for implementing Transcend-style landing pages.

---

## The Core Formula

**35% imagery, 65% text.** An image every 2-3 sections.

**Color rhythm:** White → Tinted → White → Tinted → Solid CTA

**Hierarchy:** Big stat numbers > Headlines > Body text

---

## Image Strategy

### What Transcend Uses
| Type | Count | Purpose |
|------|-------|---------|
| Hero illustration | 1 | Sets tone, shows product |
| Section diagrams | 3-5 | Explains concepts visually |
| Logo marquee | 8-12 | Social proof |
| Testimonial photos | 3-5 | Human connection |
| Feature icons | 6-9 | Scannable benefits |

### What They DON'T Use
- Stock photography of smiling people
- Complex infographics
- Detailed technical diagrams
- Charts or graphs
- Background patterns

### Image Style
- Abstract, illustrated, geometric
- Clean edges, minimal detail
- Brand colors only
- Consistent illustration style across all images

---

## Color System

### Transcend's Palette
```css
--cta-primary: #5f5bf7;      /* Purple - buttons, final CTA bg */
--accent: #1c9ae1;           /* Teal - links, highlights */
--bg-light: #e8f4fc;         /* Light blue - alternating sections */
--bg-medium: #d2ebf9;        /* Medium blue - stats section */
--bg-subtle: #f4f4f5;        /* Near-white - trust bar */
--text-dark: #1c1c1e;        /* Near-black - all body text */
```

### Why It Works
1. **One primary color** (purple) used only for CTAs = instant recognition
2. **Tinted backgrounds** (light blue) break up white without competing
3. **High contrast** dark text on light, white text on dark
4. **No competing accent colors** - everything supports the CTA

### Purrify Equivalent
```css
--cta-primary: #[brand-green];
--accent: #[warm-complement];
--bg-light: #[mint-10%];
--bg-medium: #[mint-20%];
--bg-subtle: #f8f9fa;
--text-dark: #1c1c1e;
```

---

## Section Backgrounds

```
┌─────────────────────────────────────┐
│ Hero              │ White           │
├───────────────────┼─────────────────┤
│ Trust bar         │ Light gray      │
├───────────────────┼─────────────────┤
│ Problem           │ White           │
├───────────────────┼─────────────────┤
│ Solution          │ TINTED          │ ← Color break
├───────────────────┼─────────────────┤
│ Features          │ White           │
├───────────────────┼─────────────────┤
│ Testimonials      │ TINTED          │ ← Color break
├───────────────────┼─────────────────┤
│ Statistics        │ MEDIUM TINT     │ ← Stronger
├───────────────────┼─────────────────┤
│ FAQ               │ White           │
├───────────────────┼─────────────────┤
│ Related           │ Light gray      │
├───────────────────┼─────────────────┤
│ Final CTA         │ SOLID PRIMARY   │ ← Maximum contrast
└───────────────────┴─────────────────┘
```

---

## Statistics Display

**Format:** Giant number + short label

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│   7M+    │  │   $91M   │  │   9/10   │
│ requests │  │  saved   │  │ improved │
└──────────┘  └──────────┘  └──────────┘
```

- Numbers: 48-72px, bold
- Labels: 14-16px, regular weight
- Background: Medium tint color
- Always 3-4 stats in a row

**Purrify examples:**
- "30+" days of freshness
- "50%" less litter changes
- "10,000+" happy cats
- "4.9★" customer rating

---

## Cards & Containers

```css
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 24px;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}
```

- Subtle shadows, not heavy
- Rounded corners (8-16px)
- NO borders
- Light lift on hover

---

## Icons

- Size: 48-80px
- Style: Monochromatic SVG
- Colors: Primary brand color or dark gray
- Placement: Above feature headline
- Consistency: Same line weight, same style family

---

## Buttons

**Primary:**
```css
.btn-primary {
  background: var(--cta-primary);
  color: white;
  border-radius: 9999px;  /* Pill shape */
  padding: 12px 24px;
  font-weight: 500;
}
```

**Secondary:**
```css
.btn-secondary {
  background: transparent;
  color: var(--cta-primary);
  border: 1px solid var(--cta-primary);
  border-radius: 9999px;
}
```

---

## Typography Scale

```
H1:     48px / bold      (page title only)
H2:     36px / semibold  (section headers)
H3:     24px / medium    (card headers)
Body:   18px / regular   (paragraphs)
Small:  14px / regular   (captions, labels)
Stats:  64px / bold      (big numbers)
```

---

## Spacing

```
Section gap:     80-120px
Element gap:     24-40px
Card padding:    24-32px
Max width:       1200-1400px
```

More space = more premium.

---

## Animation

**Use:**
- Fade-up on scroll (subtle, 200ms)
- Hover lift on cards
- Smooth accordion expand
- Marquee scroll (continuous, slow)

**Avoid:**
- Bounce effects
- Heavy parallax
- Auto-play video
- Anything distracting

---

## Badges & Tags

```css
.badge {
  background: var(--bg-light);
  color: var(--text-dark);
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
}
```

Used for:
- "Verified" on testimonials
- "New" or "Popular" on products
- Category tags on content

---

## Diagrams

Keep simple:
- 3-5 steps maximum
- Icons + short labels
- Arrows or lines connecting
- Single color family
- NO complex flowcharts

**Example for Purrify:**
```
[Sprinkle] → [Mix] → [Fresh for 30 days]
```

---

## Mobile Adaptations

- 3-column → 1-column stacking
- Stats: 2x2 grid instead of 4-across
- Reduce section padding to 40-60px
- Hero CTA visible without scroll
- Touch targets: 44px minimum

---

## Anti-Patterns

| Don't | Do |
|-------|-----|
| Stock photos | Custom illustrations |
| Heavy shadows | Subtle shadows |
| Many accent colors | One primary CTA color |
| Complex charts | Big stat numbers |
| Walls of text | Image every 2-3 sections |
| Busy backgrounds | Clean white/tinted |
| Bouncy animations | Subtle fades |
