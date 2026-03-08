# Cat Litter Pillar Implementation Guide

## Goal

Turn `/learn/cat-litter-guide/` into the single authoritative pillar for broad cat-litter intent, then consolidate overlapping odor-heavy blog posts under it.

Primary outcomes:

- The pillar owns broad head terms: `cat litter`, `kitty litter`, `what is cat litter`, `best kitty litter`, `how often to change litter`, `flushable cat litter`, `how to dispose of litter`, `litter box setup`, `tracking`, `dust`, and beginner-to-intermediate odor questions.
- The blog cluster stops cannibalizing itself on multi-cat, unscented, apartment-smell, and generic odor-control queries.
- The page gets visible trust signals, stable article metadata, and a single schema implementation path.
- The pillar uses photorealistic cinematic imagery with subtle illustrated effects — grounded in real photography, not heavy anime styling.

## Current Repo Findings

The current pillar already exists at `/learn/cat-litter-guide/` and is implemented as a custom learn page:

- [`app/learn/cat-litter-guide/page.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/page.tsx)
- [`app/[locale]/learn/cat-litter-guide/page.tsx`](/Users/macmini/dev/purr/app/[locale]/learn/cat-litter-guide/page.tsx)
- [`app/learn/cat-litter-guide/CatLitterGuidePageContent.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/CatLitterGuidePageContent.tsx)
- [`app/learn/cat-litter-guide/components/GuideCopy.ts`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/components/GuideCopy.ts)

What is already in place:

- H1, quick answer, TOC, litter-type comparison, maintenance, problems, FAQ.
- Article metadata and `BreadcrumbList`.
- `max-image-preview: large` on the route metadata.

What is missing or weak:

- No visible byline, reviewer, or updated date on the pillar itself.
- The route injects schema in two places: page-level JSON-LD in [`app/learn/cat-litter-guide/page.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/page.tsx) and additional schema via `useEnhancedSEO` in [`app/learn/cat-litter-guide/CatLitterGuidePageContent.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/CatLitterGuidePageContent.tsx). That creates drift risk.
- `dateModified` is currently generated with `new Date().toISOString()` on build, which makes every deployment look like a substantive content refresh.
- The current hero and section imagery uses stylized assets such as `/optimized/blog/cat-litter-guide-hero-640w.webp` and `/optimized/blog/cat-litter-comparison-miyazaki-640w.webp`, which is the wrong trust profile for the definitive pillar.
- The current learn-page copy is stored in [`app/learn/cat-litter-guide/components/GuideCopy.ts`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/components/GuideCopy.ts), but the repo rule says user-facing copy should live in `src/translations/*`.

The overlapping blog cluster is real. English slugs alone include:

- `best-cat-litter-multiple-cats`
- `best-cat-litter-multiple-cats-odor-control`
- `best-unscented-cat-litters`
- `best-unscented-cat-litter-sensitive-cats`
- `best-cat-litter-for-apartments`
- `apartment-litter-box-smell-solution`
- `best-litter-odor-remover-small-apartments`
- `how-to-get-rid-of-cat-litter-smell-apartment`
- `how-to-get-rid-of-cat-litter-smell-in-apartment`
- `best-way-to-keep-litter-box-fresh`
- `why-does-my-cats-litter-box-smell-so-bad`
- `why-does-my-house-smell-like-cat-litter`
- `how-to-eliminate-cat-litter-odor`
- `how-to-reduce-litter-box-odor`
- `cat-litter-odour-control-tips`
- `house-smells-like-cat-litter-solutions`
- `best-cat-litter-for-smell`
- `best-cat-litter-odor-control-2026`

## Recommended Architecture

Keep the pillar in `/learn`, but make it the clear top-level owner of broad litter intent.

Use this hierarchy:

- Pillar: `/learn/cat-litter-guide/`
- Child pages that stay live because they satisfy narrower intent:
  - `best-cat-litter-multiple-cats`
  - `best-unscented-cat-litters`
  - `best-cat-litter-for-apartments`
  - `how-to-get-rid-of-cat-litter-smell-in-apartment`
  - `best-covered-litter-boxes-odor-control`
  - `best-self-cleaning-litter-box-odor-control`
  - `best-natural-cat-litter-odor-control`
  - `best-litter-box-location-odour-control`
- All other overlapping posts redirect to the pillar (see Section 8 for the firm target list).
- `how-to-eliminate-cat-litter-odor` redirects to the pillar. The pillar's odor subsection absorbs its content rather than maintaining a competing page.

## File-by-File Implementation Plan

## 0. Archive content from posts being redirected

Before redirecting any posts, copy their unique content angles into a reference document so nothing is lost during pillar rewrite.

Create `docs/blog/ODOR-POST-CONTENT-ARCHIVE.md` and record the following angles before retiring the source posts:

**From `best-cat-litter-multiple-cats-odor-control`:**
- Exponential ammonia math: 3 cats = 9x the odor load (not 3x).
- N+1 box rule with specific dosing guidance for multi-cat setups.
- 7-day action plan for high-ammonia households.

**From `best-unscented-cat-litter-sensitive-cats`:**
- Cats have 200M scent receptors vs 5M in humans — fragrances that smell mild to us are overwhelming to cats.
- Fragrance masking agents vs fragrance-free distinction.
- Health implications of scented litters (asthma, upper respiratory irritation).
- 7-day no-stress transition method for sensitive or litter-averse cats.

**From `apartment-litter-box-smell-solution`:**
- Apartments have 3–4× smaller air volume than houses, so ammonia concentrates exponentially.
- HVAC return vent strategy: avoid placing boxes near HVAC returns that pull odor through the whole unit.
- Room-by-room placement table for apartments.
- "Landlord Test" concept: can a stranger smell it when they walk in the door?

**From `best-litter-odor-remover-small-apartments`:**
- Dead-air zones + sealed insulation + proximity to living areas = concentrated ammonia.
- 7-day apartment odor reset protocol.
- Airflow checklist specific to small spaces.

**From `best-way-to-keep-litter-box-fresh`:**
- Football field analogy: 1 gram of activated carbon = surface area of 4 football fields.
- Step-by-step freshness framework: routine → location → deodorizer → litter setup → multi-cat adjustments.

**From `best-cat-litter-for-smell`:**
- Efficacy comparison: activated carbon 92% ammonia reduction vs baking soda 38% vs masking agents 15–20%.
- Masking agents fail within 24–48 hours.
- Litter change frequency table by litter type.

**From `best-cat-litter-odor-control-2026`:**
- No litter fully eliminates ammonia gas on its own — the missing upgrade is an adsorption layer.
- 4 main litter technologies ranked by odor performance.
- Seasonal odor spikes: summer heat raises ammonia volatilization; winter sealing traps it indoors.

**From `why-does-my-cats-litter-box-smell-so-bad`:**
- Cat urine is 5× more concentrated than human urine.
- Obligate carnivore protein diet drives high-nitrogen waste → high ammonia production.
- Four-step freshness protocol (scoop, adsorb, deep clean, replace box on schedule).

**From `why-does-my-house-smell-like-cat-litter`:**
- Olfactory fatigue (nose blindness): residents habituate to the smell; guests detect it immediately on entry.
- Six reasons the whole house smells: fragrance fading, shallow litter depth, poor placement, too few boxes, scratched plastic absorbing urine, hidden off-box accidents.
- Look-alike odor sources that are not litter: mold, sewer gas, rodent residue — rule these out first.
- 5-minute freshness audit checklist.
- Surface area scale visualization: football-field comparison.

**From `house-smells-like-cat-litter-solutions`:**
- Health monitoring as an odor diagnostic: sudden smell increase can indicate UTI, kidney disease, or diabetes.
- Deep cleaning steps for enzyme treatment on walls, carpet, and subfloor.
- Holistic 7-solution framework.

**From `how-to-reduce-litter-box-odor` and `cat-litter-odour-control-tips`:**
- 7 expert-ordered tips (scoop daily, activate carbon, set correct depth, weekly wash, placement, box replacement schedule, skip scented litter).
- Stoichiometry of ammonia: urea breakdown chemistry.
- Industrial carbon applications (hospitals, water treatment, aquariums) as trust anchors.

## 1. Rebuild the pillar content around topic-first intent

Recommended files to edit:

- [`app/learn/cat-litter-guide/CatLitterGuidePageContent.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/CatLitterGuidePageContent.tsx)
- [`app/learn/cat-litter-guide/components/HeroSection.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/components/HeroSection.tsx)
- [`app/learn/cat-litter-guide/components/LitterTypesSection.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/components/LitterTypesSection.tsx)
- [`app/learn/cat-litter-guide/components/MaintenanceSection.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/components/MaintenanceSection.tsx)
- [`app/learn/cat-litter-guide/components/ProblemsSection.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/components/ProblemsSection.tsx)

Copy source recommendation:

- Preferred: move the guide copy into [`src/translations/namespaces/en/learn.json`](/Users/macmini/dev/purr/src/translations/namespaces/en/learn.json) and [`src/translations/namespaces/fr/learn.json`](/Users/macmini/dev/purr/src/translations/namespaces/fr/learn.json).
- Fastest but less compliant: keep using [`app/learn/cat-litter-guide/components/GuideCopy.ts`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/components/GuideCopy.ts) and then schedule a follow-up migration into `src/translations`.

Target section order:

1. H1: `The Complete Cat Litter Guide`
2. Quick answer
3. What cat litter is
4. Cat litter types compared
5. How to choose litter for your cat
6. Litter box size, setup, and placement
7. How often to scoop, wash, and fully change litter
8. How to dispose of litter safely
9. Tracking, dust, and odor
10. When litter issues are actually medical issues
11. FAQ
12. Internal links to narrower child pages

Content changes to make:

- Move the page away from "odor-first" framing. Odor stays important, but it becomes one subsection rather than the organizing principle.
- Add the missing head-term intents directly into the visible page copy:
  - `what is cat litter`
  - `best cat litter for most cats`
  - `how often should you change cat litter`
  - `is flushable litter safe`
  - `how to dispose of kitty litter`
  - `open vs covered litter box`
  - `kitty litter pans` and box-size guidance
- Replace product-first phrasing with system-first phrasing. The page should first solve litter selection, box setup, cleaning, and disposal; product mentions can stay secondary.
- Fold the salvaged content from the archived posts (Section 0) into the appropriate pillar sections:
  - Odor section: nose blindness explanation, exponential ammonia math for multi-cat homes, obligate carnivore chemistry, carbon efficacy comparison (92% vs 38% vs masking), football field surface area analogy, masking failure timeline.
  - Setup section: HVAC vent placement warning, apartment air-volume concentration effect.
  - Medical section: health-flag odor changes (UTI, kidney, diabetes), look-alike odor sources (mold, sewer gas).
  - Maintenance section: 5-minute freshness audit, daily scoop cadence, box replacement schedule.

## 2. Add visible trust signals to the pillar

Reference implementation:

- [`app/[locale]/blog/[slug]/page.tsx`](/Users/macmini/dev/purr/app/[locale]/blog/[slug]/page.tsx)
- [`src/lib/editorial/entities.ts`](/Users/macmini/dev/purr/src/lib/editorial/entities.ts)

Recommended implementation:

- Create a reusable component such as [`app/learn/cat-litter-guide/components/TrustBlock.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/components/TrustBlock.tsx).
- Reuse the same public editorial entities already used by blog posts:
  - author: `Purrify Team`
  - reviewer: `Purrify Science Team`

Visible trust block fields:

- `Written by`
- `Reviewed by`
- `Last updated`
- `How this guide was built`

The "How this guide was built" paragraph should state:

- it was written and edited by humans
- the evidence comes from veterinary guidance, public-health disposal/safety guidance, and the cited studies in the brief
- any AI assistance, if used, only supported drafting or formatting and was human-reviewed before publication

Do not hide this information only in schema. Show it directly under the intro or hero.

## 3. Consolidate the schema implementation

Files involved:

- [`app/learn/cat-litter-guide/page.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/page.tsx)
- [`app/[locale]/learn/cat-litter-guide/page.tsx`](/Users/macmini/dev/purr/app/[locale]/learn/cat-litter-guide/page.tsx)
- [`app/learn/cat-litter-guide/CatLitterGuidePageContent.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/CatLitterGuidePageContent.tsx)

Implementation rule:

- Pick one JSON-LD path for the pillar and remove the duplicate.

Recommended approach:

- Keep page-level schema generation in the route file.
- Remove the article-schema responsibility from `useEnhancedSEO` for this route, or bypass `useEnhancedSEO` schema output on this page and use it only for metadata helpers if needed.

Schema to keep:

- `Article` or `BlogPosting`
- `BreadcrumbList`
- `author`
- `reviewedBy`
- `datePublished`
- `dateModified`
- `image`

Schema to avoid using as a strategy:

- Do not rely on FAQ rich results as the SEO payoff.
- If you keep FAQ schema, treat it as machine readability only.

Important metadata fix:

- Replace `new Date().toISOString()` with a content-controlled `LAST_UPDATED` constant.
- Use the same pattern already established in [`src/lib/seo/sitemap-lastmod.ts`](/Users/macmini/dev/purr/src/lib/seo/sitemap-lastmod.ts) for consistency.
- Only change that date when the article materially changes.

## 4. Upgrade metadata and social image handling

Files to update:

- [`app/learn/cat-litter-guide/page.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/page.tsx)
- [`app/[locale]/learn/cat-litter-guide/page.tsx`](/Users/macmini/dev/purr/app/[locale]/learn/cat-litter-guide/page.tsx)
- [`src/lib/seo/page-images.ts`](/Users/macmini/dev/purr/src/lib/seo/page-images.ts)

Use this metadata direction:

- Title: `Cat Litter Guide: Best Kitty Litter, Box Setup, Cleaning & Disposal`
- H1: `The Complete Cat Litter Guide`
- Meta description: `Learn what kitty litter is, how to choose the best cat litter for your cat, how often to clean and change it, whether flushable litter is safe, and how to stop odor, dust, and tracking.`

Implementation details:

- Replace the current 640px hero asset in metadata with a 1200px-plus image.
- Make the Open Graph and Twitter image the same high-resolution editorial asset.
- Keep `max-image-preview: large`.
- Update [`src/lib/seo/page-images.ts`](/Users/macmini/dev/purr/src/lib/seo/page-images.ts) so internal cards do not keep pointing to the older stylized asset.

## 5. Upgrade the pillar imagery

Paths to update:

- current hero references in [`app/learn/cat-litter-guide/page.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/page.tsx)
- current hero references in [`app/[locale]/learn/cat-litter-guide/page.tsx`](/Users/macmini/dev/purr/app/[locale]/learn/cat-litter-guide/page.tsx)
- image references in [`app/learn/cat-litter-guide/components/HeroSection.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/components/HeroSection.tsx)
- image references in [`app/learn/cat-litter-guide/CatLitterGuidePageContent.tsx`](/Users/macmini/dev/purr/app/learn/cat-litter-guide/CatLitterGuidePageContent.tsx)

### Reuse existing images first

Many images from the posts being consolidated are directly suitable for the pillar. Map existing images to pillar sections before generating new ones:

| Pillar Section | Existing Image to Reuse | Source Post |
|---|---|---|
| Litter types compared | `/optimized/blog/litter-types-comparison-ghibli.webp` | multiple posts |
| How carbon works (odor section) | `/optimized/blog/carbon-trapping-diagram-ghibli.webp` | odour-control-tips, apartment posts |
| Carbon pores / surface area | `/optimized/blog/activated-carbon-macro-obsidian.webp` | multiple |
| Surface area scale visualization | `/optimized/blog/activated-carbon-football-field-scale.webp` | why-does-my-house-smell |
| Microscopic pores detail | `/optimized/blog/microscopic-pores-ghibli.webp` | why-does-my-cats-litter-box |
| Multi-cat setup section | `/optimized/blog/multi-cat-happy-home-ghibli.webp` | multi-cat posts |
| Apartment / placement section | `/optimized/blog/apartment-odor-control-small-space-ghibli.webp` | apartment posts |
| Box placement (bathroom) | `/optimized/blog/hidden-cat-litter-bathroom.webp` | apartment-litter-box-smell-solution |
| Airflow concept | `/optimized/marketing/apartment-airflow-cross-section.webp` | how-to-get-rid-of-cat-litter-smell-in-apartment |
| Scooping / cleaning routine | `/optimized/blog/scooping-routine-ghibli.webp` | cat-litter-odour-control-tips |
| Litter depth science | `/optimized/blog/litter-depth-science.webp` | why-does-my-house-smell |
| Nose blindness concept | `/optimized/blog/nose-blindness-ghibli.webp` | why-does-my-house-smell |
| Before / after results | `/optimized/marketing/before-after.webp` | apartment posts |
| Fresh home result | `/optimized/blog/sparkling-clean-home-ghibli.webp` | multiple |
| Natural litter options | `/optimized/blog/natural-cat-litter.webp` | best-cat-litter-for-smell |

Only generate new images for sections where no usable existing image exists: the hero, disposal guide, open-vs-covered diagram, box-size comparison, cleaning tools still life, tracking mat, and low-entry box.

### New image production rules

- Use photorealistic cinematic photography with subtle illustrated visual effects (soft glowing particles, molecule symbols, or scientific diagram overlays layered into real photography). This matches the established brand direction.
- Keep Miyazaki-style enhancements restrained for this pillar — more grounded composition than blog hero art, but do not abandon the warm illustrated aesthetic entirely.
- No product packaging.
- No generic cat portrait photos.
- Any odor visualization must show odor moving **into** carbon, never out of carbon.
- Create at least 1200px-wide source assets and produce 16:9, 4:3, and 1:1 crops.
- Store originals under `public/images/...` and optimized variants under `public/optimized/...`.

Suggested filenames for new assets only:

- `public/images/blog/cat-litter-guide-hero.jpg`
- `public/images/blog/cat-litter-open-vs-covered-diagram.jpg`
- `public/images/blog/cat-litter-box-size-comparison.jpg`
- `public/images/blog/cat-litter-cleaning-tools.jpg`
- `public/images/blog/cat-litter-disposal-guide.jpg`
- `public/images/blog/cat-litter-mat-tracking.jpg`
- `public/images/blog/cat-litter-low-entry-box.jpg`

Optimize after generation:

- Run `pnpm optimize-images:enhanced`
- Run `pnpm validate-images`

## 6. Image prompts for new assets only

Use these prompts for sections where no existing image is available. Existing images listed in Section 5 do not need regeneration.

Shared prompt suffix for all new image generation:

`photorealistic cinematic photography with subtle illustrated visual effects, soft warm natural light, realistic home materials, practical composition, measured details visible where relevant, cute curious cat behavior, no product packaging, no logo, no text overlay`

Hero image prompt:

`A cute healthy house cat approaching a large open litter box in a bright tidy home corner, full-body cat visible, roomy box with granule litter, mat at the exit, clean walls, natural daylight, soft illustrated light particles in the air suggesting clean fresh environment, composition designed for editorial hero image, 16:9. photorealistic cinematic photography with subtle illustrated visual effects, soft warm natural light, realistic home materials, practical composition, no product packaging, no logo, no text overlay`

Open vs covered prompt:

`Practical side-by-side comparison of an open litter box and a covered litter box in the same room, clear airflow and visibility concept communicated through composition, obvious exit path, realistic cat-care setup, subtle illustrated airflow arrows layered over the scene. photorealistic cinematic photography with subtle illustrated visual effects, soft warm natural light, realistic home materials, practical composition, no product packaging, no logo, no text overlay`

Box size comparison prompt:

`Side-by-side litter box size comparison in a real home setting: one standard retail litter pan beside one oversized storage-tote-style litter box, measurement marks visible on floor tape or ruler, practical cat-care editorial image, easy to understand at a glance. photorealistic cinematic photography with subtle illustrated visual effects, soft warm natural light, realistic home materials, practical composition, no product packaging, no logo, no text overlay`

Cleaning routine prompt:

`Editorial still life of cat litter cleaning tools arranged neatly: scoop, tied trash bag, disposable gloves, mild unscented soap, clean towel, fresh granule litter, sink nearby, realistic pet-care workflow image with strong clarity and trust. photorealistic cinematic photography with subtle illustrated visual effects, soft warm natural light, realistic home materials, practical composition, no product packaging, no logo, no text overlay`

Disposal guide prompt:

`High-trust disposal guide image: cat litter waste going into a sealed trash bag (clear yes), toilet with an X (no), compost bin with an X (no), clean neutral background, obvious visual hierarchy, realistic photographed objects with simple illustrated X and checkmark overlays. photorealistic cinematic photography with subtle illustrated visual effects, soft warm natural light, no product packaging, no logo`

Tracking prompt:

`Litter box exit area with a large textured litter mat catching tracked granules from a cat leaving the box, paws and granules visible, realistic floor texture, practical home setup, image designed to explain tracking reduction. photorealistic cinematic photography with subtle illustrated visual effects, soft warm natural light, realistic home materials, practical composition, no product packaging, no logo, no text overlay`

Low-entry box prompt:

`Senior cat or mobility-limited cat using a low-entry litter box with easy step-in access, calm home environment, practical supportive setup, gentle and respectful composition, strong trust for pet-care guidance. photorealistic cinematic photography with subtle illustrated visual effects, soft warm natural light, realistic home materials, practical composition, no product packaging, no logo, no text overlay`

## 7. Add inline citations instead of hiding them

Implementation direction:

- Put citations where the claim first appears in the body.
- Do not hide the main evidence at the bottom as a generic resources block only.

If you keep the current learn-page architecture, citations will likely be inline links inside the translated copy or small source notes below key paragraphs.

If you migrate the pillar into the blog JSON system later, use the built-in `citations` field already supported by the blog page template.

Minimum evidence areas to cite inline:

- box count and setup
- uncovered vs covered box guidance
- shallow litter depth and cleaning cadence
- medical warning signs
- pregnancy and immunocompromised cleaning safety
- do-not-flush guidance
- do-not-compost-used-litter guidance
- study-backed box-size and litter-preference claims
- 92% ammonia reduction efficacy figure

## 8. Consolidate the blog cluster with redirects

Redirects live in:

- [`config/redirects.js`](/Users/macmini/dev/purr/config/redirects.js)

Content files to review live in:

- [`content/blog/en`](/Users/macmini/dev/purr/content/blog/en)
- [`content/blog/fr`](/Users/macmini/dev/purr/content/blog/fr)

### Firm redirect targets (no ambiguity)

Apply the rule: redirect broad/beginner intent to the pillar; redirect narrow surviving intent to the matching child page.

| Source slug | Redirect target | Reason |
|---|---|---|
| `best-cat-litter-multiple-cats-odor-control` | `/blog/best-cat-litter-multiple-cats/` | Narrower multi-cat child page survives |
| `best-unscented-cat-litter-sensitive-cats` | `/blog/best-unscented-cat-litters/` | Narrower unscented child page survives |
| `apartment-litter-box-smell-solution` | `/blog/how-to-get-rid-of-cat-litter-smell-in-apartment/` | Apartment smell child page survives |
| `best-litter-odor-remover-small-apartments` | `/blog/how-to-get-rid-of-cat-litter-smell-in-apartment/` | Same apartment child page |
| `how-to-get-rid-of-cat-litter-smell-apartment` | `/blog/how-to-get-rid-of-cat-litter-smell-in-apartment/` | Typo/variant slug → canonical |
| `best-way-to-keep-litter-box-fresh` | `/learn/cat-litter-guide/` | Broad maintenance intent → pillar |
| `best-cat-litter-for-smell` | `/learn/cat-litter-guide/` | Broad odor intent → pillar |
| `best-cat-litter-odor-control-2026` | `/learn/cat-litter-guide/` | Broad odor intent → pillar |
| `how-to-reduce-litter-box-odor` | `/learn/cat-litter-guide/` | Broad generic odor → pillar |
| `cat-litter-odour-control-tips` | `/learn/cat-litter-guide/` | Broad tips → pillar |
| `why-does-my-cats-litter-box-smell-so-bad` | `/learn/cat-litter-guide/` | Beginner "why" question → pillar |
| `why-does-my-house-smell-like-cat-litter` | `/learn/cat-litter-guide/` | Broad whole-house smell → pillar |
| `house-smells-like-cat-litter-solutions` | `/learn/cat-litter-guide/` | Broad solutions list → pillar |
| `how-to-eliminate-cat-litter-odor` | `/learn/cat-litter-guide/` | Pillar absorbs odor system content |

### French redirects

For every English redirect, add the equivalent French redirect. Pattern:

- `/fr/blog/{slug}/` → `/fr/learn/cat-litter-guide/` (for pillar targets)
- `/fr/blog/{slug}/` → `/fr/blog/{canonical-child-slug}/` (for child page targets)

The French pillar copy in `GuideCopy.ts` needs the same content depth additions as English.

After redirects are added:

- Update internal links inside surviving blog posts so they point to the pillar for broad litter questions.
- Remove or rewrite any "related posts" sections that still push users into retired duplicates.

## 9. Reposition the surviving child pages under the pillar

The pillar should link out to the surviving child pages as subordinate choices, not peers.

Recommended internal-link blocks:

- "Need a narrower answer?" block near the bottom of the pillar
- in-content links from:
  - multi-cat setup section -> `best-cat-litter-multiple-cats`
  - unscented section -> `best-unscented-cat-litters`
  - apartment section -> `best-cat-litter-for-apartments`
  - apartment smell-fix section -> `how-to-get-rid-of-cat-litter-smell-in-apartment`
  - location/setup section -> `best-litter-box-location-odour-control`

Also update any cluster hubs or topic-cluster definitions that still treat odor pages as top-level peers:

- [`src/lib/seo/topic-clusters.ts`](/Users/macmini/dev/purr/src/lib/seo/topic-clusters.ts)
- [`src/lib/blog/internal-links.ts`](/Users/macmini/dev/purr/src/lib/blog/internal-links.ts)

## 10. Update sitemap and freshness tracking

Review these files after the content is rewritten:

- [`app/sitemap.ts`](/Users/macmini/dev/purr/app/sitemap.ts)
- [`src/lib/seo/sitemap-lastmod.ts`](/Users/macmini/dev/purr/src/lib/seo/sitemap-lastmod.ts)

Implementation notes:

- Keep the pillar in the sitemap with strong priority.
- Make sure `lastmod` comes from content changes, not deployment time.
- If you materially rewrite the pillar, update the tracked source paths used for lastmod so the sitemap reflects real editorial work.

## 11. Rollout order

Recommended sequence:

1. Create `docs/blog/ODOR-POST-CONTENT-ARCHIVE.md` with the full salvage list from Section 0.
2. Rewrite pillar copy and structure, folding in salvaged content.
3. Add visible trust block.
4. Replace schema duplication with one route-level implementation. Fix `dateModified` to use `LAST_UPDATED` constant.
5. Map existing images to pillar sections per Section 5 table. Generate only missing new images.
6. Add redirects for all consolidated pages, including French equivalents.
7. Rewrite surviving child pages so they link back to the pillar.
8. Re-run validation and inspect rendered markup locally.
9. Run `pnpm build` as a final gate — SEO validators run during build.

## 12. Validation Checklist

Run before shipping:

- `pnpm lint`
- `pnpm check-types`
- `pnpm validate-i18n:hardcoded`
- `pnpm validate-images`
- `pnpm validate-hydration`
- `pnpm seo:validate`
- `pnpm build`

Manual checks:

- confirm the pillar shows written-by, reviewed-by, and last-updated above the fold
- confirm only one article schema implementation path is active
- confirm `dateModified` is a hardcoded constant, not `new Date()`
- confirm the page uses a 1200px-plus OG image
- confirm the FAQ section still reads well even if Google ignores FAQ rich results
- confirm all new redirects resolve in one hop
- confirm French redirects exist for every English redirect
- confirm surviving child pages link back to `/learn/cat-litter-guide/`
- confirm existing images from consolidated posts are referenced in pillar sections per the reuse map

## Definition of Done

This project is complete when all of the following are true:

- `/learn/cat-litter-guide/` clearly covers the full beginner-to-intermediate cat-litter topic.
- The pillar has visible editorial trust signals and stable metadata.
- The pillar owns the broad head terms, and duplicate odor-heavy posts no longer compete with it.
- Multi-cat, unscented, apartment, and other narrower pages exist only as distinct child intents.
- All unique content angles from retired posts have been absorbed into the pillar or a surviving child page.
- All existing images from retired posts are either reused in the pillar or explicitly noted as not needed.
- French redirects are in place alongside English redirects.
- The visual presentation supports trust, first-hand utility, and Discover-style image quality.
