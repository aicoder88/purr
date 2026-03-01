export default function Loading() {
  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header Skeleton */}
        <div className="mb-12 space-y-4">
          <div className="h-10 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-2">
                <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-12 flex justify-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 w-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          ))}
        </div>
      </div>
    </div>
  );
}
