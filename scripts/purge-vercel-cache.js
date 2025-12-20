const fetch = require('node-fetch');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config({ path: '.env.production' });

// Configuration
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'purrify.ca';

// Files to purge from cache
const filesToPurge = [
  '/panel_1.png',
  '/panel_2.png',
  '/panel_3.png',
  '/optimized/panel_1.webp',
  '/optimized/panel_2.webp',
  '/optimized/panel_3.webp',
  '/optimized/panel_1.avif',
  '/optimized/panel_2.avif',
  '/optimized/panel_3.avif',
];

async function purgeCache() {
  if (!VERCEL_TOKEN) {
    console.error('❌ VERCEL_TOKEN not found in .env.production file');
    console.log('Please add your Vercel token to .env.production:');
    console.log('VERCEL_TOKEN=your_token_here');
    process.exit(1);
  }

  console.log('🧹 Purging Vercel cache for specific files...');

  for (const file of filesToPurge) {
    const url = `https://${DOMAIN}${file}`;
    
    try {
      console.log(`Purging cache for: ${url}`);
      
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          urls: [url],
        }),
      };

      // Add team ID if available
      const endpoint = VERCEL_TEAM_ID 
        ? `https://api.vercel.com/v1/projects/${VERCEL_PROJECT_ID}/cache?teamId=${VERCEL_TEAM_ID}`
        : `https://api.vercel.com/v1/projects/${VERCEL_PROJECT_ID}/cache`;
      
      const response = await fetch(endpoint, options);
      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ Successfully purged cache for ${url}`);
      } else {
        console.error(`❌ Failed to purge cache for ${url}:`, data);
      }
    } catch (error) {
      console.error(`❌ Error purging cache for ${url}:`, error);
    }
  }

  console.log('🚀 Cache purge process complete!');
}

// Run the purge function
purgeCache().catch(err => {
  console.error('Error purging cache:', err);
  process.exit(1);
});