import { useCallback, useEffect, useState } from 'react';

export function SkipNav() {
  const [isVisible, setIsVisible] = useState(false);

  const showSkipLinksForKeyboard = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      setIsVisible(true);
    }
  }, []);

  const hideSkipLinks = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', showSkipLinksForKeyboard);
    document.addEventListener('click', hideSkipLinks);

    return () => {
      document.removeEventListener('keydown', showSkipLinksForKeyboard);
      document.removeEventListener('click', hideSkipLinks);
    };
  }, [hideSkipLinks, showSkipLinksForKeyboard]);

  if (!isVisible) return null;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 bg-white dark:bg-gray-800 focus:text-black dark:text-gray-100 focus:rounded focus:shadow-lg focus:border-2 focus:border-[#FF3131] dark:focus:border-[#FF5050] font-medium transition-all"
        onClick={hideSkipLinks}
      >
        Skip to main content
      </a>
      <a
        href="#products"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-40 focus:z-50 focus:px-4 focus:py-2 bg-white dark:bg-gray-800 focus:text-black dark:text-gray-100 focus:rounded focus:shadow-lg focus:border-2 focus:border-[#FF3131] dark:focus:border-[#FF5050] font-medium transition-all"
        onClick={hideSkipLinks}
      >
        Skip to products
      </a>
      <a
        href="#testimonials"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-64 focus:z-50 focus:px-4 focus:py-2 bg-white dark:bg-gray-800 focus:text-black dark:text-gray-100 focus:rounded focus:shadow-lg focus:border-2 focus:border-[#FF3131] dark:focus:border-[#FF5050] font-medium transition-all"
        onClick={hideSkipLinks}
      >
        Skip to testimonials
      </a>
    </>
  );
}
