# Purrify Content Improvement Master Plan

This document serves as the "source of truth" for completing the visual and content audit of the Purrify website. As context length increases, refer to this guide to resume work consistently.

## Current Progress Snapshot
- **Blog Posts Completed**: 4 / 31
- **Static Pages Completed**: 0 / 22
- **Audit Progress File**: [audit_progress.json](file:///Users/macmini/dev/purr/audit_progress.json) (Updated after every file)

### Completed Files (Batch 1-4)
1. `how-to-get-rid-of-cat-pee-smell-apartment.json` (Ghibli)
2. `how-to-get-rid-of-cat-litter-smell-in-apartment.json` (Ghibli)
3. `how-to-neutralize-ammonia-cat-litter.json` (Realistic/High-Impact)
4. `why-does-my-house-smell-like-cat-litter.json` (Realistic/High-Impact)

---

## The Workflow (Per File)

For every JSON blog post in `content/blog/en/`:

1.  **Analyze Content**: Identify 3-4 key sections that lack visuals or have thin text.
2.  **Generate High-Impact Images**:
    - Use `generate_image` with prompts for **Realistic, Amazing, Interesting, or Fascinating** visuals.
    - Style can be "Mixed Ghibli + Realistic" or "8K Photorealistic".
    - **CRITICAL**: Do NOT include the word "Viral" in the prompts, images, or copy.
3.  **Optimize & Move**:
    - Move generated images from brain folder to `public/optimized/` with descriptive kebab-case names.
    - Copy images to the current brain directory for walkthrough rendering.
4.  **Inject into JSON**:
    - Use `<div class="grid md:grid-cols-2 gap-6 items-center">` for side-by-side text/image layouts.
    - Use `<figure>` for full-width high-impact visuals.
    - Tailor CSS classes (e.g., `bg-blue-50`, `rounded-xl`, `shadow-lg`) to match existing design tokens.
5.  **Update audit_progress.json**:
    - Increment `image_count`.
    - Update `word_count` if expanded.
    - Set `status` to `"good"` and `score` to `5`.
6.  **Update Walkthrough**:
    - Add the new file to `walkthrough.md` with rendered images.

---

## Technical & Style Rules

### Image Style Guidelines
- **No Placeholders**: Every image must be generated and relevant.
- **Aesthetic**: Premium, sun-drenched, high-resolution, or scientific-macro.
- **Tone**: Professional, informative, but visually stunning.
- **No "Viral"**: Avoid the word in all user-facing content.

### Code Injection Reference
When injecting images into the `content` field of JSON files, use the surrounding Tailwind classes to maintain the "premium" feel:
```html
<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6 mb-8">
  <div class="grid md:grid-cols-2 gap-6 items-center">
    <div>
      <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Heading</h3>
      <p class="text-blue-800 dark:text-blue-200">Content goes here...</p>
    </div>
    <img src="/optimized/filename.png" alt="..." class="w-full rounded-lg shadow-sm" />
  </div>
</div>
```

---

## Remaining High-Priority Batch
1. `cat-litter-odor-control-usa.json` (Current Target)
2. `cat-litter-ammonia-health-risks.tsx` (Static Page Transition)
3. `how-activated-carbon-works.tsx` (Static Page Transition)

## Artifact Locations
- **Task List**: [task.md](file:///Users/macmini/.gemini/antigravity/brain/cc36f754-052f-497b-9603-9aebb99fc983/task.md)
- **Visual Proof**: [walkthrough.md](file:///Users/macmini/.gemini/antigravity/brain/cc36f754-052f-497b-9603-9aebb99fc983/walkthrough.md)
