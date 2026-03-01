export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Skeleton */}
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

        {/* Dashboard Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          ))}
        </div>

        {/* Charts Section Skeleton */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-80 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-80 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Data Table Skeleton */}
        <div className="space-y-3">
          <div className="h-8 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
