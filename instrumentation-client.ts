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

      // Enable performance profiling (fixes "performanceMetrics feature not found" error)
      profilesSampleRate: 0.1,

      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,

      // Filter out third-party script errors that we can't control
      beforeSend(event, hint) {
        const error = hint?.originalException;
        const errorMessage = error instanceof Error ? error.message : String(error);

        // Ignore errors from third-party chat plugins and injected scripts
        const ignoredPatterns = [
          'Illegal invocation',       // Facebook chat plugin
          'chat_plugin.js',           // Chat plugins
          'inject_content.js',        // Browser extension injections
          'invalid origin',           // Privacy browser blocking analytics
          'ResizeObserver loop',      // Browser timing issue
          'Network request failed',   // Blocked tracking requests
          'Script error',             // Cross-origin script errors
          'fbclid',                   // Facebook click ID tracking issues
        ];

        if (ignoredPatterns.some(pattern =>
          errorMessage?.includes(pattern) ||
          event.exception?.values?.some(v => v.value?.includes(pattern)) ||
          event.request?.url?.includes(pattern)
        )) {
          return null; // Drop the event
        }

        return event;
      },
    });
  });
}

export const onRouterTransitionStart = undefined;
