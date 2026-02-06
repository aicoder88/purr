# Dark Mode Fix Patterns - Quick Reference

**For agents fixing dark mode issues found by validator v2**

---

## Error Type 1: text-white Without Background

### Detection
```
Error: text-white without dark background - invisible on white backgrounds!
```

### Fix Pattern A: Add Colored Background
```tsx
// ❌ Before
<button className="text-white px-4 py-2 rounded">
  Click me
</button>

// ✅ After - Add colored background
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
  Click me
</button>
```

### Fix Pattern B: Use Proper Light/Dark Text
```tsx
// ❌ Before
<p className="text-white">
  Some content
</p>

// ✅ After - Light/dark text colors
<p className="text-gray-900 dark:text-white">
  Some content
</p>
```

### When to Use Each Pattern
- **Pattern A (Add BG):** Buttons, badges, pills, cards with distinct visual identity
- **Pattern B (Light/Dark):** Body text, headings, general content

---

## Error Type 2: Missing Dark Variant

### Detection
```
Error: Missing dark mode variant for bg-white
Error: Missing dark mode variant for text-gray-900
```

### Fix Pattern: Add dark: Variant

```tsx
// ❌ Before - Backgrounds
<div className="bg-white border border-gray-200">
  Content
</div>

// ✅ After
<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
  Content
</div>

// ❌ Before - Text
<h1 className="text-gray-900 text-3xl font-bold">
  Heading
</h1>

// ✅ After
<h1 className="text-gray-900 dark:text-white text-3xl font-bold">
  Heading
</h1>

// ❌ Before - Borders
<input className="border border-gray-300 rounded" />

// ✅ After
<input className="border border-gray-300 dark:border-gray-700 rounded" />
```

### Standard Pairs

| Light Mode | Dark Mode | Usage |
|------------|-----------|-------|
| `bg-white` | `dark:bg-gray-900` | Page backgrounds, cards |
| `bg-gray-50` | `dark:bg-gray-800` | Secondary backgrounds |
| `bg-gray-100` | `dark:bg-gray-800` | Tertiary backgrounds |
| `text-gray-900` | `dark:text-white` | Headings |
| `text-gray-700` | `dark:text-gray-200` | Body text |
| `text-gray-600` | `dark:text-gray-300` | Muted text |
| `text-gray-500` | `dark:text-gray-400` | Subtle text |
| `border-gray-200` | `dark:border-gray-700` | Subtle borders |
| `border-gray-300` | `dark:border-gray-600` | Standard borders |

---

## Error Type 3: Low Contrast (Light on Light)

### Detection
```
Error: Low contrast in light mode: text-gray-200 on bg-gray-100
```

### Fix Pattern: Use Darker Text

```tsx
// ❌ Before - Unreadable light-on-light
<div className="bg-gray-100 text-gray-200 dark:bg-gray-800 dark:text-gray-700">
  Content
</div>

// ✅ After - Readable contrast in both modes
<div className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
  Content
</div>

// ❌ Before - text-white on bg-white
<div className="bg-white text-white dark:bg-gray-900 dark:text-white">
  Content
</div>

// ✅ After
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  Content
</div>
```

### Light Mode Contrast Rules
- **Never:** Light text (100-400) on light background (white, 50-100)
- **Always:** Dark text (600-900) on light background

---

## Error Type 4: Low Contrast (Dark on Dark)

### Detection
```
Error: Low contrast in dark mode: text-gray-800 on bg-gray-900
```

### Fix Pattern: Use Lighter Text

```tsx
// ❌ Before - Unreadable dark-on-dark
<div className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-800">
  Content
</div>

// ✅ After - Readable contrast in both modes
<div className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
  Content
</div>

// ❌ Before - text-gray-700 on bg-gray-700
<button className="bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-700">
  Click
</button>

// ✅ After
<button className="bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200">
  Click
</button>
```

### Dark Mode Contrast Rules
- **Never:** Dark text (600-900) on dark background (700-900, black)
- **Always:** Light text (100-400, white) on dark background

---

## Special Cases

### Case 1: Hover States

```tsx
// ❌ Before - Missing dark hover
<button className="bg-gray-100 hover:bg-gray-200 text-gray-900">
  Click
</button>

// ✅ After - Complete hover states
<button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white">
  Click
</button>
```

### Case 2: Focus States

```tsx
// ❌ Before - Missing dark focus
<input className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" />

// ✅ After - Complete focus states
<input className="border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400" />
```

### Case 3: Forms and Inputs

```tsx
// ❌ Before
<input
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-white"
/>

// ✅ After - Complete light/dark support
<input
  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white bg-white dark:bg-gray-900"
/>
```

### Case 4: Gradients

```tsx
// ❌ Before - No dark gradient
<div className="bg-gradient-to-br from-blue-50 to-purple-50">
  Content
</div>

// ✅ After - Dark gradient variant
<div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
  Content
</div>
```

### Case 5: Group Hover

```tsx
// ❌ Before
<div className="group">
  <span className="text-gray-600 group-hover:text-gray-900">
    Text
  </span>
</div>

// ✅ After
<div className="group">
  <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
    Text
  </span>
</div>
```

---

## Verification Checklist

After fixing a file, verify:

- [ ] `pnpm validate-dark-mode` shows 0 errors for the file
- [ ] Visual check in browser (toggle light/dark)
- [ ] All text is readable in both modes
- [ ] Hover states work in both modes
- [ ] Focus states work in both modes
- [ ] No hydration errors in console
- [ ] No TypeScript errors

---

## Common Mistakes to Avoid

### ❌ DON'T: Use same shade in both modes
```tsx
// This won't work - same shade is unreadable in one mode
className="text-gray-500 dark:text-gray-500"
```

### ❌ DON'T: Forget hover/focus variants
```tsx
// Incomplete - hover has no dark variant
className="hover:bg-gray-100 dark:bg-gray-800"
```

### ❌ DON'T: Use arbitrary values without dark variants
```tsx
// Bad - custom colors need dark variants too
className="bg-[#f5f5f5]"  // No dark equivalent
```

### ✅ DO: Use full Tailwind color scale
```tsx
// Good - semantic, has dark variant
className="bg-gray-50 dark:bg-gray-800"
```

### ✅ DO: Match contrast levels
```tsx
// Good - similar contrast in both modes
className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
//         ^^^^^^^^^ Light bg, dark text    ^^^^^^^^^ Dark bg, light text
```

### ✅ DO: Test edge cases
- Forms with placeholder text
- Disabled states
- Loading states
- Error states
- Success states

---

## Quick Reference Tables

### Text Color Pairs

| Element | Light | Dark |
|---------|-------|------|
| Primary heading | `text-gray-900` | `dark:text-white` |
| Secondary heading | `text-gray-800` | `dark:text-gray-100` |
| Body text | `text-gray-700` | `dark:text-gray-200` |
| Muted text | `text-gray-600` | `dark:text-gray-300` |
| Subtle text | `text-gray-500` | `dark:text-gray-400` |
| Disabled text | `text-gray-400` | `dark:text-gray-500` |

### Background Color Pairs

| Element | Light | Dark |
|---------|-------|------|
| Page background | `bg-white` | `dark:bg-gray-900` |
| Card background | `bg-white` | `dark:bg-gray-900` |
| Secondary bg | `bg-gray-50` | `dark:bg-gray-800` |
| Tertiary bg | `bg-gray-100` | `dark:bg-gray-800` |
| Hover bg | `hover:bg-gray-100` | `dark:hover:bg-gray-700` |
| Active bg | `bg-gray-200` | `dark:bg-gray-700` |

### Border Color Pairs

| Element | Light | Dark |
|---------|-------|------|
| Subtle border | `border-gray-200` | `dark:border-gray-700` |
| Standard border | `border-gray-300` | `dark:border-gray-600` |
| Strong border | `border-gray-400` | `dark:border-gray-500` |

---

## Examples by Component Type

### Button
```tsx
<button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
  Primary Action
</button>

<button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors">
  Secondary Action
</button>
```

### Card
```tsx
<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
    Card Title
  </h3>
  <p className="text-gray-600 dark:text-gray-300">
    Card description text
  </p>
</div>
```

### Form
```tsx
<form className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
      Email
    </label>
    <input
      type="email"
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white bg-white dark:bg-gray-900"
    />
  </div>
</form>
```

---

**Note for Agents:** When in doubt, use the Standard Pairs table above. These pairs are proven to work across the entire codebase.
