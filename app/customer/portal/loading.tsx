export default function Loading() {
  return (
    <div className="min-h-screen bg-white px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="h-8 w-56 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 md:col-span-2" />
        </div>
      </div>
    </div>
  );
}
