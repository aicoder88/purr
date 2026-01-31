'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('App Router Error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md px-4">
        <h2 className="text-2xl font-bold text-[#5B2EFF] mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We apologize for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131]/70 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
