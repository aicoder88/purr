# Purrify Website

This is the official website for Purrify, an activated carbon cat litter additive that eliminates odors at the source.

## Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

This project uses environment variables for configuration. Make sure to set these up properly for both development and production environments.

### Required Environment Variables

- `NEXT_PUBLIC_SITE_URL`: The base URL of the site (e.g., `https://purrify.ca` or `https://your-preview-url.vercel.app`)

### Setting Up Environment Variables

#### Local Development

Create a `.env.local` file in the root directory with:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Vercel Deployment

When deploying to Vercel, you need to set the `NEXT_PUBLIC_SITE_URL` environment variable in the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add a new variable:
   - Name: `NEXT_PUBLIC_SITE_URL`
   - Value: Your site's URL (e.g., `https://purrify.ca` or the preview URL)
4. Set the environment to "Production" (and optionally "Preview" if you want to use preview URLs)
5. Save the changes
6. Redeploy your site

For preview deployments, Vercel automatically sets the `VERCEL_URL` environment variable. You can use this to dynamically set the `NEXT_PUBLIC_SITE_URL` in your Vercel build settings by adding a build command that exports this variable:

```bash
export NEXT_PUBLIC_SITE_URL=https://$VERCEL_URL && npm run build
```

## Troubleshooting

If you encounter styling or asset loading issues in production:

1. Check that the `NEXT_PUBLIC_SITE_URL` environment variable is correctly set in Vercel
2. Ensure there are no hardcoded domain references in the codebase
3. Clear the Vercel cache and redeploy if necessary
