export function SkipNav() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 bg-white dark:bg-gray-800 focus:text-black dark:focus:text-white focus:rounded focus:shadow-lg focus:border-2 focus:border-[#FF3131] dark:focus:border-[#FF5050] font-medium transition-all"
      >
        Skip to main content
      </a>
      <a
        href="#products"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-40 focus:z-50 focus:px-4 focus:py-2 bg-white dark:bg-gray-800 focus:text-black dark:focus:text-white focus:rounded focus:shadow-lg focus:border-2 focus:border-[#FF3131] dark:focus:border-[#FF5050] font-medium transition-all"
      >
        Skip to products
      </a>
      <a
        href="#testimonials"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-64 focus:z-50 focus:px-4 focus:py-2 bg-white dark:bg-gray-800 focus:text-black dark:focus:text-white focus:rounded focus:shadow-lg focus:border-2 focus:border-[#FF3131] dark:focus:border-[#FF5050] font-medium transition-all"
      >
        Skip to testimonials
      </a>
    </>
  );
}
