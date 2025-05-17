# Purrify Website

This is the official website for Purrify, an activated carbon cat litter additive that eliminates odors at the source.

## Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Automatic URL Detection

This project automatically detects the correct URLs for assets and links in both development and production environments:

- In the browser, it uses `window.location.origin` to get the current domain
- In server-side rendering on Vercel, it uses the `VERCEL_URL` environment variable
- As a fallback, it uses relative URLs when neither is available

This approach ensures that the site works correctly in all environments without requiring manual configuration of environment variables.

## Troubleshooting

If you encounter styling or asset loading issues in production:

1. Ensure there are no hardcoded domain references in the codebase
2. Check that the Vercel deployment has access to the `VERCEL_URL` environment variable
3. Clear the Vercel cache and redeploy if necessary
