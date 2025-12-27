// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// Sentry disabled in development to prevent memory issues
if (process.env.NODE_ENV === 'production') {
  import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn: "https://417e8c4f09f6ee842bef52a337877258@o4510602036772864.ingest.de.sentry.io/4510602102112336",
      integrations: [],
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
    });
  });
}

export const onRouterTransitionStart = undefined;
