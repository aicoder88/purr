// EmailJS configuration
export const EMAILJS_CONFIG = {
  // EmailJS credentials (using the newer public/private key approach)
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
  PRIVATE_KEY: process.env.NEXT_PUBLIC_EMAILJS_PRIVATE_KEY || "",
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  // Service name for logging
  SERVICE_NAME: "Gmail"
};

// Validation function to check if EmailJS is properly configured
export const isEmailJSConfigured = (): boolean => {
  const isConfigured =
    EMAILJS_CONFIG.PUBLIC_KEY &&
    EMAILJS_CONFIG.SERVICE_ID &&
    EMAILJS_CONFIG.TEMPLATE_ID;
  
  if (!isConfigured) {
    console.error("EmailJS is not properly configured. Please check your environment variables.");
  }
  
  return !!isConfigured;
};