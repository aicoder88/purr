# Currency System

**Geo-based currency detection** using Vercel Edge headers (`x-vercel-ip-country`):
- US visitors → USD
- All others → CAD (fallback)
- 1:1 price conversion (same numbers, different currency)
- No currency codes displayed (always show `$`)

### Usage in Components
```typescript
import { useCurrency } from '@/lib/currency-context';

function ProductPage() {
  const { currency, formatPrice } = useCurrency();

  // Get price with currency
  const price = getProductPrice('standard', currency);

  // Format price with currency
  const formatted = formatPrice(price, locale);

  return <div>{formatted}</div>;
}
```

### Usage in API Routes
```typescript
import { detectCurrencyFromRequest } from '@/lib/geo/currency-detector';

export async function GET(req: Request) {
  const currency = detectCurrencyFromRequest(req);
  // Use currency in logic
  return Response.json({ currency });
}
```

### Database
- Order model has `currency` field (CAD or USD)
- Always store currency with order for accurate reporting
- Indexed for query performance

### Structured Data (JSON-LD)
Always use dynamic currency in schema markup:
```typescript
const { currency } = useCurrency();

const schema = {
  "@type": "Product",
  "offers": {
    "@type": "Offer",
    "priceCurrency": currency, // Not hardcoded "CAD"
    "price": price
  }
};
```

**Key files:**
- `src/lib/geo/currency-detector.ts` - Server-side detection
- `src/lib/currency-context.tsx` - React context
- `src/lib/pricing.ts` - Pricing functions
- `src/lib/constants.ts` - USD_PRICES map
- `app/layout.tsx` - CurrencyProvider integration (root layout)
