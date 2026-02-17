// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Disable Sentry in test environment (port 3010) to prevent network timeouts
const isTestEnvironment = process.env.PORT === "3010" || process.env.NODE_ENV === "test";

Sentry.init({
  dsn: isTestEnvironment
    ? undefined
    : "https://417e8c4f09f6ee842bef52a337877258@o4510602036772864.ingest.de.sentry.io/4510602102112336",

  // Integrations for additional features
  integrations: [
    // Send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Enable performance profiling (fixes "performanceMetrics feature not found" error)
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.01 : 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // PII is NOT sent by default (sendDefaultPii is false)
  // beforeSend hook strips any potential PII for EU/locale-specific compliance
  beforeSend(event, hint) {
    // Strip PII for EU locales if needed
    // EU country codes: AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE
    const euLocales = ['de', 'fr', 'es', 'it', 'nl', 'pl', 'sv', 'da', 'fi', 'el', 'cs', 'hu', 'ro', 'sk', 'sl', 'bg', 'hr', 'et', 'lv', 'lt', 'mt', 'ga'];
    
    // Check if the request locale is in EU list
    const requestLocale = event.contexts?.locale || 
                          event.request?.headers?.['accept-language']?.split('-')[0]?.toLowerCase();
    
    if (requestLocale && typeof requestLocale === 'string' && euLocales.includes(requestLocale)) {
      // Remove user data for EU users
      if (event.user) {
        delete event.user.email;
        delete event.user.ip_address;
        delete event.user.username;
        // Keep only non-identifiable user ID if present
        event.user = event.user.id ? { id: event.user.id } : undefined;
      }
      // Remove request headers that might contain PII
      const headers = event.request?.headers;
      if (headers) {
        const headersToRemove = ['cookie', 'authorization', 'x-forwarded-for', 'x-real-ip', 'referer'];
        headersToRemove.forEach(header => delete headers[header]);
      }
    }
    
    return event;
  },
});
