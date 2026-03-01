export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 bg-gray-900">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-56 animate-pulse rounded bg-gray-200 bg-gray-700" />
          <div className="h-4 w-80 animate-pulse rounded bg-gray-200 bg-gray-700" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-lg border border-gray-200 bg-white p-6 border-gray-700 bg-gray-800">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="h-8 w-32 animate-pulse rounded bg-gray-200 bg-gray-700" />
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200 bg-gray-700" />
            </div>
          ))}
        </div>

        {/* Charts and Tables Skeleton */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-80 animate-pulse rounded-lg bg-gray-200 bg-gray-700" />
          <div className="h-80 animate-pulse rounded-lg bg-gray-200 bg-gray-700" />
        </div>

        {/* Referral Link Section Skeleton */}
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 border-gray-700 bg-gray-800">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200 bg-gray-700" />
          <div className="h-12 w-full animate-pulse rounded bg-gray-200 bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
