# Translation Detective Report

Generated: 2025-08-31T11:23:21.887Z

## Summary

- **Files Scanned**: 256
- **Total Issues Found**: 2268
- **Hardcoded Text Issues**: 2032
- **HTML in Translations**: 20
- **Missing Translation Keys**: 145

## Issues by Severity

### HIGH (376 issues)

- **src/translations/zh.ts:762** - Hardcoded text detected: "FAQ"
  ```
  "查看完整FAQ"
  ```
  💡 *Suggestion: Replace with translation key, e.g., t.ui.faq*

- **src/translations/fr.ts:26** - Hardcoded text detected: "FAQ"
  ```
  "FAQ"
  ```
  💡 *Suggestion: Replace with translation key, e.g., t.ui.faq*

- **src/translations/fr.ts:763** - Hardcoded text detected: "FAQ"
  ```
  "Voir FAQ Complète"
  ```
  💡 *Suggestion: Replace with translation key, e.g., t.ui.faq*

- **src/translations/fr.ts:1** - File uses translations but missing useTranslation import
  ```
  
  ```
  💡 *Suggestion: Add: import { useTranslation } from '../path/to/translation-context';*

- **src/translations/en.ts:16** - Hardcoded text detected: "Testimonials"
  ```
  "Testimonials"
  ```
  💡 *Suggestion: Replace with translation key, e.g., t.ui.testimonials*

- **src/translations/en.ts:27** - Hardcoded text detected: "FAQ"
  ```
  "FAQ"
  ```
  💡 *Suggestion: Replace with translation key, e.g., t.ui.faq*

- **src/translations/en.ts:29** - Hardcoded text detected: "Buy Now"
  ```
  "Buy Now!"
  ```
  💡 *Suggestion: Replace with translation key, e.g., t.ui.buynow*

- **src/translations/en.ts:68** - Hardcoded text detected: "Customer Reviews"
  ```
  "Read 247+ customer reviews"
  ```
  💡 *Suggestion: Replace with translation key, e.g., t.ui.customerreviews*

- **src/translations/en.ts:149** - Hardcoded text detected: "Add to Cart"
  ```
  "Add to Cart"
  ```
  💡 *Suggestion: Replace with translation key, e.g., t.ui.addtocart*

- **src/translations/en.ts:150** - Hardcoded text detected: "Buy Now"
  ```
  "Buy Now"
  ```
  💡 *Suggestion: Replace with translation key, e.g., t.ui.buynow*

... and 366 more HIGH issues

### MEDIUM (1892 issues)

- **src/translations/fr.ts:13** - Potential hardcoded English text detected
  ```
  "Pourquoi Purrify"
  ```
  💡 *Suggestion: Consider using translation key if this text is user-facing*

- **src/translations/fr.ts:14** - Potential hardcoded English text detected
  ```
  "Essai Gratuit"
  ```
  💡 *Suggestion: Consider using translation key if this text is user-facing*

- **src/translations/fr.ts:16** - Potential hardcoded English text detected
  ```
  "Laisser un Avis"
  ```
  💡 *Suggestion: Consider using translation key if this text is user-facing*

- **src/translations/fr.ts:20** - Potential hardcoded English text detected
  ```
  "Conditions d'
  ```
  💡 *Suggestion: Consider using translation key if this text is user-facing*

- **src/translations/fr.ts:23** - Potential hardcoded English text detected
  ```
  "Comparer les Tailles"
  ```
  💡 *Suggestion: Consider using translation key if this text is user-facing*

- **src/translations/fr.ts:24** - Potential hardcoded English text detected
  ```
  "Voir Tous les Produits"
  ```
  💡 *Suggestion: Consider using translation key if this text is user-facing*

- **src/translations/fr.ts:52** - Potential hardcoded English text detected
  ```
  "Cage de furet"
  ```
  💡 *Suggestion: Consider using translation key if this text is user-facing*

- **src/translations/fr.ts:66** - Potential hardcoded English text detected
  ```
  "Acheter les produits Purrify maintenant"
  ```
  💡 *Suggestion: Consider using translation key if this text is user-facing*

- **src/translations/fr.ts:79** - Potential hardcoded English text detected
  ```
  "Respectueux des Chats"
  ```
  💡 *Suggestion: Consider using translation key if this text is user-facing*

- **src/translations/fr.ts:99** - Potential hardcoded English text detected
  ```
  "Purrify Gratuit"
  ```
  💡 *Suggestion: Consider using translation key if this text is user-facing*

... and 1882 more MEDIUM issues

## Most Problematic Files

- **src/translations/en.ts** (280 issues)
- **src/translations/fr.ts** (194 issues)
- **pages/dn.tsx** (135 issues)
- **pages/montreal.tsx** (105 issues)
- **src/lib/seo-utils.ts** (54 issues)
- **src/components/seo/enhanced-structured-data.tsx** (49 issues)
- **src/lib/montreal-seo-config.ts** (46 issues)
- **src/components/seo/comprehensive-structured-data.tsx** (46 issues)
- **src/components/bundles/SmartBundles.tsx** (46 issues)
- **pages/learn/faq.tsx** (45 issues)
