'use client';

import { useEffect } from 'react';
import { captureUTM } from '@/lib/tracking/utm';



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
    useUTMCapture();

    return null;
}
