export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 bg-gray-900">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200 bg-gray-700" />
          <div className="h-10 w-32 animate-pulse rounded bg-gray-200 bg-gray-700" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex flex-wrap gap-4">
          <div className="h-10 w-48 animate-pulse rounded bg-gray-200 bg-gray-700" />
          <div className="h-10 w-40 animate-pulse rounded bg-gray-200 bg-gray-700" />
          <div className="h-10 w-36 animate-pulse rounded bg-gray-200 bg-gray-700" />
        </div>

        {/* Orders Table Skeleton */}
        <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-4 border-gray-700 bg-gray-800">
          {/* Table Header */}
          <div className="flex gap-4 border-b border-gray-200 pb-2 border-gray-700">
            <div className="h-5 w-24 animate-pulse rounded bg-gray-200 bg-gray-700" />
            <div className="h-5 w-32 animate-pulse rounded bg-gray-200 bg-gray-700" />
            <div className="h-5 w-24 animate-pulse rounded bg-gray-200 bg-gray-700" />
            <div className="h-5 w-20 animate-pulse rounded bg-gray-200 bg-gray-700" />
            <div className="h-5 w-20 animate-pulse rounded bg-gray-200 bg-gray-700" />
          </div>
          {/* Table Rows */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="h-5 w-32 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="h-5 w-20 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="h-8 w-20 animate-pulse rounded bg-gray-200 bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
