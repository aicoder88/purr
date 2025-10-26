# Store Logos Configuration

## CRITICAL: DO NOT REMOVE EXTERNAL LOGO URLs

This document explains why store logos use external URLs and how they are configured.

## Why External URLs?

Store logos are loaded from **external URLs** (retailer websites) for the following reasons:

### 1. Legal Compliance
- Using **official branding assets** directly from retailer websites ensures legal compliance
- Avoids trademark/copyright issues by referencing official sources
- Demonstrates partnership positioning (not competitive)

### 2. Brand Accuracy
- Logos are always **up-to-date** with retailer's current branding
- Retailers can update their logos without requiring our code changes
- Prevents stale/outdated branding

### 3. Partnership Positioning
- Shows we're **working WITH** local retailers, not against them
- Aligns with B2B expansion strategy
- Builds trust with retail partners

## Current External Logo URLs

### Chico Pet Boutique
```
https://www.chico.ca/wp-content/themes/boutiquechico/img/chico.svg
```

### Pattes et Griffes
```
https://pattesgriffes.com/static/frontend/Sm/petshop_child/fr_FR/images/fonts/logo.svg
```

## Next.js Configuration

These domains are **whitelisted** in `next.config.js`:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'www.chico.ca',
    },
    {
      protocol: 'https',
      hostname: 'pattesgriffes.com',
    },
    // ... other domains
  ],
  dangerouslyAllowSVG: true,  // Required for external SVG logos
}
```

## Fallback System

The `StoreLogoImage` component in `src/components/sections/stores.tsx` includes a **fallback system**:

1. **Primary**: Load external logo via Next.js Image component
2. **Fallback**: If external logo fails, display generic store icon SVG
3. **Error Handling**: `onError` handler catches loading failures
4. **Unoptimized Mode**: External URLs skip Next.js image optimization to prevent CORS issues

## Code Implementation

```tsx
// Component with fallback
const StoreLogoImage = ({ logoConfig, storeName }) => {
  const [hasError, setHasError] = useState(false);

  if (!logoConfig || hasError) {
    // Fallback SVG icon
    return <svg>...</svg>;
  }

  return (
    <Image
      src={logoConfig.src}
      alt={logoConfig.alt}
      onError={() => setHasError(true)}
      unoptimized={logoConfig.src.startsWith('http')}  // Skip optimization
    />
  );
};
```

## Troubleshooting

### Logo Not Displaying?

1. **Check next.config.js**: Ensure domain is in `remotePatterns`
2. **Check external URL**: Visit the URL directly to verify it's accessible
3. **Check fallback**: Generic icon should display if external fails
4. **Check browser console**: Look for CORS or loading errors
5. **Verify unoptimized flag**: External URLs must use `unoptimized={true}`

### Adding New Store Logo

1. Add domain to `next.config.js` `remotePatterns`
2. Add logo config in `getStoreLogo()` function
3. Set `fallback: true` in logo config
4. Test both logo loading and fallback behavior

## DO NOT:

❌ Download external logos to local `/public/` folder
❌ Remove external URL configurations from next.config.js
❌ Remove fallback handling from StoreLogoImage component
❌ Disable `dangerouslyAllowSVG` in next.config.js

## DO:

✅ Keep external URLs pointing to official retailer websites
✅ Maintain fallback system for graceful degradation
✅ Document any new logo URLs added
✅ Test both successful loading and fallback scenarios

## Related Files

- `src/components/sections/stores.tsx` - Store logo rendering
- `next.config.js` - External domain whitelist
- `pages/stockists.tsx` - Stockist page using store logos
- `pages/montreal.tsx` - Location page using store logos

## Last Updated
2025-10-26 - Added fallback system and comprehensive documentation
