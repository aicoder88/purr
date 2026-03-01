export default function Loading() {
  return (
    <div className="min-h-screen bg-white px-4 py-10 bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header Skeleton */}
        <div className="mb-12 space-y-4 text-center">
          <div className="mx-auto h-10 w-48 animate-pulse rounded bg-gray-200 bg-gray-700" />
          <div className="mx-auto h-5 w-80 max-w-full animate-pulse rounded bg-gray-200 bg-gray-700" />
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4 rounded-lg border border-gray-200 p-6 border-gray-700">
              <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200 bg-gray-700" />
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="flex items-center justify-between pt-4">
                <div className="h-6 w-20 animate-pulse rounded bg-gray-200 bg-gray-700" />
                <div className="h-10 w-28 animate-pulse rounded bg-gray-200 bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
