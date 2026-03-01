export default function Loading() {
  return (
    <div className="min-h-screen bg-white px-4 py-10 bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header Skeleton */}
        <div className="mb-12 space-y-4 text-center">
          <div className="mx-auto h-10 w-64 animate-pulse rounded bg-gray-200 bg-gray-700" />
          <div className="mx-auto h-5 w-96 max-w-full animate-pulse rounded bg-gray-200 bg-gray-700" />
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="space-y-4 rounded-lg border border-gray-200 p-6 border-gray-700">
              <div className="h-8 w-12 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 bg-gray-700" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 bg-gray-700" />
              </div>
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200 bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
