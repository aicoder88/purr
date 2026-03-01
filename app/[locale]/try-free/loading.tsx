export default function Loading() {
  return (
    <div className="min-h-screen bg-white px-4 py-10 bg-gray-900">
      <div className="mx-auto max-w-2xl">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-4 text-center">
          <div className="mx-auto h-10 w-64 animate-pulse rounded bg-gray-200 bg-gray-700" />
          <div className="mx-auto h-5 w-96 max-w-full animate-pulse rounded bg-gray-200 bg-gray-700" />
        </div>

        {/* Form Skeleton */}
        <div className="space-y-6 rounded-lg border border-gray-200 p-8 border-gray-700">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="h-10 w-full animate-pulse rounded bg-gray-200 bg-gray-700" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="h-10 w-full animate-pulse rounded bg-gray-200 bg-gray-700" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200 bg-gray-700" />
            <div className="h-10 w-full animate-pulse rounded bg-gray-200 bg-gray-700" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200 bg-gray-700" />
            <div className="h-10 w-full animate-pulse rounded bg-gray-200 bg-gray-700" />
          </div>
          <div className="h-12 w-full animate-pulse rounded bg-gray-200 bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
