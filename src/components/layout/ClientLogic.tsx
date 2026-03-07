'use client';

import { useEffect } from 'react';
import { initializeConsent } from '@/lib/analytics';
import { captureUTM } from '@/lib/tracking/utm';



/**
 * Capture UTM parameters from URL on initial page load.
 * Stores attribution data for ad spend optimization tracking.
 */
function useUTMCapture() {
    useEffect(() => {
        initializeConsent();
        captureUTM();
    }, []);
}

export function ClientLogic() {
    useUTMCapture();

    return null;
}
