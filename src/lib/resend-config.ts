/**
 * Resend Email Configuration
 *
 * This module handles Resend email service initialization and configuration.
 * Requires the following environment variable to be set:
 * - RESEND_API_KEY (server-side only, for API route usage)
 */

export const RESEND_CONFIG = {
  apiKey: process.env.RESEND_API_KEY || '',
  fromEmail: 'support@purrify.ca',
  fromName: 'Purrify Support',
  toEmail: 'support@purrify.ca',
};

// Debug logging (will be visible in Vercel logs)
if (typeof window === 'undefined') {
  console.log('[Resend Config Debug]', {
    apiKeySet: !!RESEND_CONFIG.apiKey,
    apiKeyLength: RESEND_CONFIG.apiKey?.length || 0,
    apiKeyPrefix: RESEND_CONFIG.apiKey ? RESEND_CONFIG.apiKey.substring(0, 8) + '...' : 'NOT SET',
    fromEmail: RESEND_CONFIG.fromEmail,
    toEmail: RESEND_CONFIG.toEmail,
  });
}

/**
 * Check if Resend is properly configured
 */
export const isResendConfigured = (): boolean => {
  return !!RESEND_CONFIG.apiKey && RESEND_CONFIG.apiKey.startsWith('re_');
};
