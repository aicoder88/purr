/**
 * EmailJS Configuration
 * Provides configuration for sending emails via EmailJS service
 */

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
};

/**
 * Check if EmailJS is properly configured
 * Returns true only if all required environment variables are set
 */
export const isEmailJSConfigured = Boolean(
  EMAILJS_CONFIG.serviceId &&
  EMAILJS_CONFIG.templateId &&
  EMAILJS_CONFIG.publicKey
);

/**
 * Initialize EmailJS with the public key
 * Should be called once on app startup
 */
export const initializeEmailJS = async () => {
  if (!isEmailJSConfigured) {
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
