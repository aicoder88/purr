// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://417e8c4f09f6ee842bef52a337877258@o4510602036772864.ingest.de.sentry.io/4510602102112336",

  // Minimal integrations to reduce overhead
  integrations: [],

  // Reduce trace sampling in development
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0,

  // Disable logs in development
  enableLogs: process.env.NODE_ENV === 'production',

  // Disable replay to reduce overhead
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // Only send PII in production
  sendDefaultPii: process.env.NODE_ENV === 'production',
});

// Disable router transition tracking in development
export const onRouterTransitionStart = process.env.NODE_ENV === 'production'
  ? Sentry.captureRouterTransitionStart
  : undefined;
