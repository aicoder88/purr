# Purrify Website

This is the official website for Purrify, an activated carbon cat litter additive that eliminates odors at the source.

## Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Simplified URL Approach

This project uses relative URLs for all assets and links, which ensures compatibility across all environments:

- Works in local development
- Works in production deployments
- Works in preview deployments
- No environment variables needed

This approach ensures that the site works correctly in all environments without requiring any configuration.

## Troubleshooting

If you encounter styling or asset loading issues in production:

1. Ensure there are no hardcoded domain references in the codebase
2. Check that all URLs are relative (starting with `/`) rather than absolute
3. Clear the Vercel cache and redeploy if necessary
