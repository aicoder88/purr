# French Translation Completeness Checklist

Use this checklist to close French translation gaps across page namespaces and blog posts without guessing what "complete" means.

## Command

Run:

```bash
corepack pnpm validate-fr:completeness
```

The audit writes:

- `reports/fr-translation-completeness.json`
- `reports/fr-translation-completeness.md`

## What The Audit Enforces

1. Every English namespace file in `src/translations/namespaces/en/` has a French counterpart.
2. Every English translation key exists in the matching French namespace file.
3. French namespace values are not empty strings.
4. Every English blog slug in `content/blog/en/` exists in `content/blog/fr/`.
5. Shared English/French blog posts keep the same JSON structure and leaf types.
6. French blog posts keep `locale: "fr"` and preserve the English slug.
7. The audit flags likely English leakage in French strings.
8. The audit warns on truncated French SEO text and suspiciously short French article bodies.

## Current Known Gaps

These were already present before the audit was added:

- Missing French blog slug: `content/blog/fr/fresh-step-vs-arm-hammer-comparison.json`
- Missing keys in `src/translations/namespaces/fr/common.json`
- Missing keys in `src/translations/namespaces/fr/home.json`
- Missing keys in `src/translations/namespaces/fr/learn.json`

## Execution Order

1. Run the audit and open `reports/fr-translation-completeness.md`.
2. Fix namespace errors first.
3. Add any missing French blog files to restore slug parity.
4. Fix structural mismatches inside existing French blog JSON files.
5. Resolve warning-level issues:
   - English copy leaks
   - Truncated SEO titles and descriptions
   - Unusually short French article bodies
   - Empty `translations` maps when they should carry alternates
6. Re-run the audit until it exits cleanly.
7. After the audit is stable, consider promoting `validate-fr:completeness` into CI or `prebuild`.

## Notes

- The audit compares French content against English source-of-truth files only.
- It is intentionally stricter than the existing SEO meta tests, which cover only a subset of content.
- It runs with plain Node.js so it can execute even when project dependencies are not installed.
