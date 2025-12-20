// Safe analytics utility with GDPR compliance

export enum ConsentType {
  NECESSARY = 'necessary',
  ANALYTICS = 'analytics',
  MARKETING = 'marketing',
  PREFERENCES = 'preferences'
}

// Check user consent status
export function hasConsent(type: ConsentType): boolean {
  if (typeof globalThis.window === 'undefined') return false;
  
  try {
    // Check for explicit consent (adjust based on your consent management platform)
    const consent = localStorage.getItem('cookieConsent');
    
    // If no consent recorded, assume no consent for analytics/marketing
    if (!consent) {
      return type === ConsentType.NECESSARY;
    }
    
    // Parse consent settings
    if (consent === 'accepted' || consent === 'all') {
      return true;
    }
    
    if (consent === 'rejected' || consent === 'none') {
      return type === ConsentType.NECESSARY;
    }
    
    // Parse granular consent (JSON format)
    try {
      const consentSettings = JSON.parse(consent);
      return consentSettings[type] === true;
    } catch {
      // Fallback: if we can't parse, only allow necessary
      return type === ConsentType.NECESSARY;
    }
  } catch (err) {
    console.error('Error checking consent:', err);
    // Fail safely - only allow necessary cookies
    return type === ConsentType.NECESSARY;
  }
}

// Enhanced analytics with consent checking
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
  if (typeof globalThis.window === 'undefined') return;
  
  // Check for analytics consent before tracking
  if (!hasConsent(ConsentType.ANALYTICS)) {
    console.debug('Analytics tracking blocked: No consent for analytics');
    return;
  }
  
  try {
    if (window.gtag) {
      // Add consent metadata to events
      const eventParams = {
        ...parameters,
        consent_given: true,
        privacy_mode: 'gdpr_compliant',
      };
      
      window.gtag('event', action, eventParams);
    }
  } catch (err) {
    // Silently fail to prevent breaking the app
    console.debug('Analytics tracking failed:', err);
  }
}

export function safeTrackConfig(targetId: string, config: Record<string, unknown>) {
  if (typeof globalThis.window === 'undefined') return;
  
  // Check consent before configuring analytics
  if (!hasConsent(ConsentType.ANALYTICS)) {
    console.debug('Analytics config blocked: No consent for analytics');
    return;
  }
  
  try {
    if (window.gtag) {
      // Add privacy-safe configuration
      const privacyConfig = {
        ...config,
        anonymize_ip: true,
        allow_google_signals: hasConsent(ConsentType.MARKETING),
        allow_ad_personalization_signals: hasConsent(ConsentType.MARKETING),
        cookie_expires: hasConsent(ConsentType.PREFERENCES) ? 7776000 : 3600, // 90 days vs 1 hour
      };
      
      window.gtag('config', targetId, privacyConfig);
    }
  } catch (err) {
    console.debug('Analytics config failed:', err);
  }
}

// Track page views with consent
export function safeTrackPageView(url?: string) {
  if (typeof globalThis.window === 'undefined') return;
  
  if (!hasConsent(ConsentType.ANALYTICS)) {
    console.debug('Page view tracking blocked: No consent for analytics');
    return;
  }
  
  try {
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: url || window.location.pathname,
        anonymize_ip: true,
        allow_google_signals: hasConsent(ConsentType.MARKETING),
      });
    }
  } catch (err) {
    console.debug('Page view tracking failed:', err);
  }
}

// E-commerce tracking with consent
export function safeTrackPurchase(transactionData: {
  transaction_id: string;
  value: number;
  currency: string;
  items: Array<{
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
  }>;
}) {
  if (typeof globalThis.window === 'undefined') return;
  
  if (!hasConsent(ConsentType.ANALYTICS)) {
    console.debug('Purchase tracking blocked: No consent for analytics');
    return;
  }
  
  try {
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        ...transactionData,
        consent_given: true,
        privacy_mode: 'gdpr_compliant',
      });
    }
  } catch (err) {
    console.debug('Purchase tracking failed:', err);
  }
}

// Utility to update consent and reinitialize analytics
export function updateConsent(consentSettings: Record<ConsentType, boolean>) {
  if (typeof globalThis.window === 'undefined') return;
  
  try {
    // Store consent settings
    localStorage.setItem('cookieConsent', JSON.stringify(consentSettings));
    
    // Update gtag consent
    if (window.gtag) {
      (window.gtag as (...args: unknown[]) => void)('consent', 'update', {
        analytics_storage: consentSettings[ConsentType.ANALYTICS] ? 'granted' : 'denied',
        ad_storage: consentSettings[ConsentType.MARKETING] ? 'granted' : 'denied',
        functionality_storage: consentSettings[ConsentType.PREFERENCES] ? 'granted' : 'denied',
        personalization_storage: consentSettings[ConsentType.PREFERENCES] ? 'granted' : 'denied',
      });
    }
    
    // Dispatch custom event for other components to react to consent changes
    window.dispatchEvent(new CustomEvent('consentUpdated', { 
      detail: consentSettings 
    }));
  } catch (err) {
    console.error('Failed to update consent:', err);
  }
}

// Initialize consent mode (call this early in your app)
export function initializeConsent() {
  if (typeof globalThis.window === 'undefined') return;
  
  try {
    // Set default consent state (denied until user chooses)
    if (window.gtag) {
      (window.gtag as (...args: unknown[]) => void)('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        wait_for_update: 500, // Wait 500ms for consent to be updated
      });
    }
    
    // Check for existing consent and apply it
    const existingConsent = localStorage.getItem('cookieConsent');
    if (existingConsent && existingConsent !== 'undefined') {
      try {
        const consentSettings = JSON.parse(existingConsent);
        updateConsent(consentSettings);
      } catch {
        // If parsing fails, treat as simple accept/reject
        if (existingConsent === 'accepted' || existingConsent === 'all') {
          updateConsent({
            [ConsentType.NECESSARY]: true,
            [ConsentType.ANALYTICS]: true,
            [ConsentType.MARKETING]: false, // Conservative default
            [ConsentType.PREFERENCES]: true,
          });
        }
      }
    }
  } catch (err) {
    console.error('Failed to initialize consent:', err);
  }
}
