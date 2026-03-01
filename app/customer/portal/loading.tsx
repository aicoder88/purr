export default function Loading() {
  return (
    <div className="min-h-screen bg-white px-4 py-8 bg-gray-900">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 animate-pulse rounded bg-gray-200 bg-gray-700" />
            <div className="h-4 w-64 animate-pulse rounded bg-gray-200 bg-gray-700" />
          </div>
          <div className="h-10 w-32 animate-pulse rounded bg-gray-200 bg-gray-700" />
        </div>

        {/* Dashboard Cards Skeleton */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-32 animate-pulse rounded-lg bg-gray-200 bg-gray-700" />
          <div className="h-32 animate-pulse rounded-lg bg-gray-200 bg-gray-700" />
          <div className="h-32 animate-pulse rounded-lg bg-gray-200 bg-gray-700" />
        </div>

        {/* Content Section Skeleton */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-64 animate-pulse rounded-lg bg-gray-200 bg-gray-700" />
          <div className="h-64 animate-pulse rounded-lg bg-gray-200 bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
