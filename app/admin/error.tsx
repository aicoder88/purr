'use client';

interface AdminErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: AdminErrorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 bg-gray-900">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm border-gray-700 bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 text-gray-100">Admin dashboard error</h2>
        <p className="mt-2 text-sm text-gray-600 text-gray-300">
          Something went wrong while loading this admin page.
        </p>
        {error.digest ? (
          <p className="mt-2 text-xs text-gray-500 text-gray-400">Ref: {error.digest}</p>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 bg-gray-100 text-gray-900 hover:bg-gray-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
