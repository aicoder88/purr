# Sentry Data Processing Agreement (DPA)

## Overview

This document outlines how Sentry is configured for the Purrify application regarding data privacy and Personally Identifiable Information (PII) handling.

## Data Processing Agreement Status

✅ **Sentry DPA is in place** - Functional Software, Inc. (Sentry) provides a Data Processing Agreement that complies with GDPR requirements for EU data processing.

## Configuration

### PII Handling

- **`sendDefaultPii: false`** (default) - Sentry does NOT automatically collect user PII
- **`beforeSend` hook** - Custom filtering logic strips sensitive data for EU users

### What Data IS Collected

| Data Type | Collected | Notes |
|-----------|-----------|-------|
| Error stack traces | ✅ Yes | Essential for debugging |
| Console logs (log/warn/error) | ✅ Yes | Configured via integration |
| Performance traces | ✅ Yes | Sampled at 10% in production |
| Performance profiles | ✅ Yes | Sampled at 1% in production |
| User ID (anonymous) | ✅ Yes | Only non-identifiable ID |
| Browser/Device type | ✅ Yes | General user agent info |
| URL/Route information | ✅ Yes | Where errors occurred |

### What Data is NOT Collected (Stripped)

| Data Type | EU Users | Non-EU Users | Notes |
|-----------|----------|--------------|-------|
| Email addresses | ❌ Stripped | ⚠️ May be present | Stripped for EU users |
| IP addresses | ❌ Stripped | ⚠️ May be present | Stripped for EU users |
| Usernames | ❌ Stripped | ⚠️ May be present | Stripped for EU users |
| Cookies | ❌ Stripped | ⚠️ May be present | Stripped for EU users |
| Authorization headers | ❌ Stripped | ⚠️ May be present | Stripped for EU users |
| Referer headers | ❌ Stripped | ⚠️ May be present | Stripped for EU users |

## EU Locale Detection

The following language codes trigger PII stripping:

- German (`de`)
- French (`fr`)
- Spanish (`es`)
- Italian (`it`)
- Dutch (`nl`)
- Polish (`pl`)
- Swedish (`sv`)
- Danish (`da`)
- Finnish (`fi`)
- Greek (`el`)
- Czech (`cs`)
- Hungarian (`hu`)
- Romanian (`ro`)
- Slovak (`sk`)
- Slovenian (`sl`)
- Bulgarian (`bg`)
- Croatian (`hr`)
- Estonian (`et`)
- Latvian (`lv`)
- Lithuanian (`lt`)
- Maltese (`mt`)
- Irish (`ga`)

## Configuration Files

- `sentry.server.config.ts` - Server-side error tracking configuration
- `sentry.edge.config.ts` - Edge runtime (middleware) error tracking configuration

## Related Documentation

- [Sentry DPA](https://sentry.io/legal/dpa/)
- [Sentry Privacy Policy](https://sentry.io/privacy/)
- [Sentry Next.js SDK Configuration](https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/)
