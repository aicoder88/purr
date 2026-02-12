export default function Loading() {
  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-3xl">
        <div className="h-10 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-10/12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
