// Safe analytics utility to prevent client-side exceptions
export function safeTrackEvent(
  action: string,
  parameters?: {
    event_category?: string;
    event_label?: string;
    value?: number;
    custom_parameter_1?: string;
    [key: string]: unknown;
  }
) {
  if (typeof window === 'undefined') return;
  
  try {
    if (window.gtag) {
      window.gtag('event', action, parameters);
    }
  } catch (error) {
    // Silently fail to prevent breaking the app
    console.debug('Analytics tracking failed:', error);
  }
}

export function safeTrackConfig(targetId: string, config: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  
  try {
    if (window.gtag) {
      window.gtag('config', targetId, config);
    }
  } catch (error) {
    console.debug('Analytics config failed:', error);
  }
}