// EmailJS configuration
export const EMAILJS_CONFIG = {
  // EmailJS credentials
  USER_ID: process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "user_YourEmailJSUserID",
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_i5c914v",
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_chvt6zi",
  // Service name for logging
  SERVICE_NAME: "Gmail"
};