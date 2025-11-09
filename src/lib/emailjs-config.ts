/**
 * EmailJS Configuration
 *
 * This module handles EmailJS initialization and configuration.
 * Requires the following environment variables to be set:
 * - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
 * - NEXT_PUBLIC_EMAILJS_SERVICE_ID
 * - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
 * - EMAILJS_PRIVATE_KEY (for server-side email sending)
 */

export const EMAILJS_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  privateKey: process.env.EMAILJS_PRIVATE_KEY || '',
};

// Debug logging (will be visible in Vercel logs)
if (typeof window === 'undefined') {
  console.log('[EmailJS Config Debug]', {
    publicKeySet: !!EMAILJS_CONFIG.publicKey,
    publicKeyLength: EMAILJS_CONFIG.publicKey?.length || 0,
    publicKeyValue: EMAILJS_CONFIG.publicKey ? EMAILJS_CONFIG.publicKey.substring(0, 10) + '...' : 'NOT SET',
    serviceIdSet: !!EMAILJS_CONFIG.serviceId,
    serviceIdValue: EMAILJS_CONFIG.serviceId || 'NOT SET',
    templateIdSet: !!EMAILJS_CONFIG.templateId,
    templateIdValue: EMAILJS_CONFIG.templateId || 'NOT SET',
  });
}

/**
 * Check if EmailJS is properly configured
 */
export const isEmailJSConfigured = (): boolean => {
  return !!(
    EMAILJS_CONFIG.publicKey &&
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.templateId
  );
};

/**
 * Validate EmailJS configuration for server-side operations
 */
export const isEmailJSServerConfigured = (): boolean => {
  return isEmailJSConfigured() && !!EMAILJS_CONFIG.privateKey;
};

/**
 * Initialize EmailJS with the public key
 * Should be called once on app startup
 */
export const initializeEmailJS = async () => {
  if (!isEmailJSConfigured()) {
    console.warn('EmailJS is not properly configured. Check your environment variables.');
    return false;
  }

  try {
    const emailjs = await import('@emailjs/browser');
    emailjs.init(EMAILJS_CONFIG.publicKey);
    return true;
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error);
    return false;
  }
};
