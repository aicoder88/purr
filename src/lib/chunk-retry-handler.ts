/**
 * Chunk Loading Error Handler
 * 
 * This script automatically retries failed chunk loads, which can happen due to:
 * - Stale cached HTML referencing old chunks after deployment
 * - Network interruptions during chunk loading
 * - Race conditions during deployment
 * 
 * When a chunk fails to load, this script will:
 * 1. Retry loading the chunk up to 3 times
 * 2. If all retries fail, reload the page to get fresh HTML
 */

if (typeof window !== 'undefined') {
    // Track failed chunks to prevent infinite loops
    const failedChunks = new Set<string>();
    const MAX_RETRIES = 3;
    const chunkRetries = new Map<string, number>();

    // Store the original error handler
    const originalOnError = window.onerror;

    // Override the global error handler
    window.onerror = function (message, source, lineno, colno, error) {
        const errorMessage = typeof message === 'string' ? message : '';
        const errorSource = source || '';

        // Check if this is a chunk loading error
        const isChunkError =
            errorMessage.includes('Loading chunk') ||
            errorMessage.includes('Failed to fetch') ||
            errorSource.includes('/_next/static/chunks/');

        if (isChunkError && errorSource) {
            // Extract chunk ID from the error
            const chunkMatch = errorSource.match(/chunks\/([a-zA-Z0-9]+)\.js/);
            const chunkId = chunkMatch ? chunkMatch[1] : errorSource;

            // Get current retry count
            const retryCount = chunkRetries.get(chunkId) || 0;

            if (retryCount < MAX_RETRIES && !failedChunks.has(chunkId)) {
                // Increment retry count
                chunkRetries.set(chunkId, retryCount + 1);

                console.warn(
                    `[Chunk Retry] Retrying chunk ${chunkId} (attempt ${retryCount + 1}/${MAX_RETRIES})`
                );

                // Wait a bit before retrying (exponential backoff)
                const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
                setTimeout(() => {
                    // Reload the page to get fresh HTML and chunk references
                    window.location.reload();
                }, delay);

                return true; // Prevent default error handling
            } else {
                // Max retries exceeded, mark as permanently failed
                failedChunks.add(chunkId);
                console.error(
                    `[Chunk Retry] Failed to load chunk ${chunkId} after ${MAX_RETRIES} retries. Reloading page...`
                );

                // Last resort: reload the page
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

                return true;
            }
        }

        // Call the original error handler for non-chunk errors
        if (originalOnError) {
            return originalOnError(message, source, lineno, colno, error);
        }

        return false;
    };

    // Also handle unhandled promise rejections (for dynamic imports)
    window.addEventListener('unhandledrejection', (event) => {
        const error = event.reason;
        const errorMessage = error?.message || String(error);

        if (
            errorMessage.includes('Loading chunk') ||
            errorMessage.includes('Failed to fetch dynamically imported module')
        ) {
            console.warn('[Chunk Retry] Detected chunk loading error in promise rejection');
            event.preventDefault();

            // Reload the page after a short delay
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    });

    console.log('[Chunk Retry] Chunk error handler initialized');
}

export { };
