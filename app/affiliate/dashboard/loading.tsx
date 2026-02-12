export default function Loading() {
  return (
    <div className="min-h-screen bg-white px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="h-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
