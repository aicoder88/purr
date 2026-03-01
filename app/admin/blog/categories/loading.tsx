export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 bg-gray-900">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 animate-pulse rounded bg-gray-200 bg-gray-700" />
            <div className="h-8 w-48 animate-pulse rounded bg-gray-200 bg-gray-700" />
          </div>
          <div className="h-10 w-32 animate-pulse rounded bg-gray-200 bg-gray-700" />
        </div>

        {/* Categories List Skeleton */}
        <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-4 border-gray-700 bg-gray-800">
          {/* Header Row */}
          <div className="flex gap-4 border-b border-gray-200 pb-2 border-gray-700">
            <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200 bg-gray-700" />
            <div className="h-5 w-1/4 animate-pulse rounded bg-gray-200 bg-gray-700" />
            <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200 bg-gray-700" />
            <div className="h-5 w-20 animate-pulse rounded bg-gray-200 bg-gray-700" />
          </div>
          {/* Category Rows */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-4">
              <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="h-5 w-1/4 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="flex gap-2">
                <div className="h-8 w-8 animate-pulse rounded bg-gray-200 bg-gray-700" />
                <div className="h-8 w-8 animate-pulse rounded bg-gray-200 bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
