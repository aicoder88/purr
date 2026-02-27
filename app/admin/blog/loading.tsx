export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          ))}
        </div>

        {/* Toolbar Skeleton */}
        <div className="flex items-center gap-4">
          <div className="h-10 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Table Skeleton */}
        <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          {/* Table Header */}
          <div className="flex gap-4 border-b border-gray-200 pb-2 dark:border-gray-700">
            <div className="h-5 w-5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-5 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-5 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-5 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          {/* Table Rows */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <div className="h-5 w-5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-8 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
