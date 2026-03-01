export default function Loading() {
  return (
    <div className="min-h-screen bg-white bg-gray-900">
      {/* Hero Section Skeleton */}
      <div className="w-full px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="h-12 w-3/4 animate-pulse rounded bg-gray-200 bg-gray-700" />
            <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200 bg-gray-700" />
            <div className="h-12 w-40 animate-pulse rounded-full bg-gray-200 bg-gray-700" />
          </div>
        </div>
      </div>
      
      {/* Content Sections Skeleton */}
      <div className="space-y-16 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="h-8 w-64 animate-pulse rounded bg-gray-200 bg-gray-700" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-64 animate-pulse rounded-lg bg-gray-200 bg-gray-700" />
            <div className="h-64 animate-pulse rounded-lg bg-gray-200 bg-gray-700" />
            <div className="h-64 animate-pulse rounded-lg bg-gray-200 bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
