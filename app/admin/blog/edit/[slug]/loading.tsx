export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-8 w-56 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-10 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-10 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        {/* Editor Skeleton */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-4">
            <div className="h-12 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-[400px] w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="h-48 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="h-32 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="h-40 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
