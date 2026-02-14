// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
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
  tracesSampleRate: 1,

  // Enable performance profiling (fixes "performanceMetrics feature not found" error)
  profilesSampleRate: 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
