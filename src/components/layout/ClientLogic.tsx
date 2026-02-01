'use client';

import { useEffect } from 'react';
import { captureUTM } from '@/lib/tracking/utm';

/**
 * Suppress known benign errors from third-party scripts.
 * These errors occur when privacy-focused browsers (DuckDuckGo, Brave, Firefox with ETP)
 * block cross-origin requests from analytics/tracking scripts.
 * The errors are harmless but pollute error monitoring.
 */
function useSuppressThirdPartyErrors() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            const errorMessage = event.reason?.message || String(event.reason);

            // Known benign errors from third-party scripts blocked by privacy browsers
            const benignErrors = [
                'invalid origin',      // Vercel Analytics blocked by DuckDuckGo/Brave
                'Script error',        // Cross-origin script errors
                'ResizeObserver loop', // Common browser timing issue
                'Network request failed', // Blocked tracking requests
            ];

            const isBenignError = benignErrors.some(pattern =>
                errorMessage.toLowerCase().includes(pattern.toLowerCase())
            );

            if (isBenignError) {
                // Prevent the error from propagating to Sentry
                event.preventDefault();
                // Only log in development
                if (process.env.NODE_ENV === 'development') {
                    console.debug('[Suppressed third-party error]', errorMessage);
                }
            }
        };

        window.addEventListener('unhandledrejection', handleUnhandledRejection);
        return () => window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    }, []);
}

/**
 * Cleanup any stale service workers that may be causing cache issues.
 * This runs once on app load to ensure old SW caches don't persist.
 */
function useServiceWorkerCleanup() {
    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                for (const registration of registrations) {
                    registration.unregister().then((success) => {
                        if (success) {
                            console.log('[SW Cleanup] Unregistered stale service worker');
                        }
                    });
                }
            });
            // Also clear caches that service workers may have created
            if ('caches' in window) {
                caches.keys().then((cacheNames) => {
                    cacheNames.forEach((cacheName) => {
                        caches.delete(cacheName).then((success) => {
                            if (success) {
                                console.log(`[Cache Cleanup] Deleted cache: ${cacheName}`);
                            }
                        });
                    });
                });
            }
        }
    }, []);
}

/**
 * Capture UTM parameters from URL on initial page load.
 * Stores attribution data for ad spend optimization tracking.
 */
function useUTMCapture() {
    useEffect(() => {
        captureUTM();
    }, []);
}

export function ClientLogic() {
    useServiceWorkerCleanup();
    useSuppressThirdPartyErrors();
    useUTMCapture();

    return null;
}
