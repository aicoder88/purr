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
- No environment variables needed for basic functionality

This approach ensures that the site works correctly in all environments without requiring any configuration.

## Google Sheets Integration for Free Giveaway Form

The free giveaway form at `/free` integrates with Google Sheets to store form submissions. To set up this integration:

1. Create a Google Cloud project at https://console.cloud.google.com/
2. Enable the Google Sheets API for your project
3. Create a service account with permission to edit Google Sheets
4. Generate a JSON key for the service account
5. Create a Google Sheet and share it with the service account email (with Editor permissions)
6. Update the following environment variables in `.env.local` and `.env.production`:

```
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
```

The spreadsheet ID can be found in the URL of your Google Sheet:
`https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

The form will automatically append new submissions to the sheet with the following columns:
- Full Name
- Email Address
- Cat Names (comma-separated)
- Timestamp

## Troubleshooting

If you encounter styling or asset loading issues in production:

1. Ensure there are no hardcoded domain references in the codebase
2. Check that all URLs are relative (starting with `/`) rather than absolute
3. Clear the Vercel cache and redeploy if necessary

For Google Sheets integration issues:
1. Verify that the service account has proper permissions on the spreadsheet
2. Check that the private key is properly formatted with newline characters (`\n`)
3. Ensure the spreadsheet ID is correct
4. Check server logs for detailed error messages
