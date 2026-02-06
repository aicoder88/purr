import { Resend } from 'resend';

// Use environment variable or a dummy key for build/dev if missing
// This prevents "Missing API key" errors during build time
export const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');
