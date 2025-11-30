# PR Review: aicoder88/purr#11

## Findings
- **Blocker – Inline chat loader script ships invalid JavaScript**  
  `pages/_app.tsx#L207` embeds a literal TypeScript cast (`{ passive: true } as any`) inside the string that is injected via `dangerouslySetInnerHTML`. Once this script runs in the browser it throws a syntax error and the idle loader never executes, so the chat widget will not appear and a console error is emitted on every page load. Drop the `as any` cast (and preferably the third argument entirely) before shipping.

- **Blocker – Retailer JWT secret falls back to a hardcoded default**  
  `pages/api/retailer/login.ts#L8` signs auth tokens with `'your-secret-key-change-in-production'` whenever `RETAILER_JWT_SECRET` is unset. If this ever hits production the fallback effectively makes every issued JWT predictable/forgeable. Fail fast (500) when the secret env var is missing instead of signing with a placeholder.

- **Major – Copy violates “no money-back guarantee” guideline**  
  Multiple strings (e.g. `src/translations/en.ts#L509`, `src/translations/en.ts#L567`, `src/translations/en.ts#L1073`, `src/translations/en.ts#L1264`) promise a “30-day money-back guarantee”. The repository guidelines explicitly forbid money-back claims, so these lines need to be rephrased or removed in every locale before shipping.

## Suggestions / Follow-ups
- Once the blockers are fixed, rerun `npm run test:translations` and spot-check the chat loader in the browser to confirm the idle callback runs without syntax errors.
