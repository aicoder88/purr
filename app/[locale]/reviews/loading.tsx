export default function Loading() {
  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        {/* Header Skeleton */}
        <div className="mb-12 space-y-4 text-center">
          <div className="mx-auto h-10 w-56 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mx-auto h-5 w-96 max-w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Rating Summary Skeleton */}
        <div className="mb-12 flex items-center justify-center gap-8">
          <div className="h-24 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-24 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Reviews List Skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
              <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
