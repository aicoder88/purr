import { useEffect, useState } from 'react';

export function SkipNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsVisible(true);
      }
    };

    const handleClick = () => {
      setIsVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white dark:focus:bg-gray-800 focus:text-black focus:dark:text-white dark:text-gray-100 focus:rounded focus:shadow-lg focus:border-2 focus:border-[#FF3131] dark:focus:border-[#FF5050] font-medium transition-all"
        onClick={() => setIsVisible(false)}
      >
        Skip to main content
      </a>
      <a
        href="#products"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-40 focus:z-50 focus:px-4 focus:py-2 focus:bg-white dark:focus:bg-gray-800 focus:text-black focus:dark:text-white dark:text-gray-100 focus:rounded focus:shadow-lg focus:border-2 focus:border-[#FF3131] dark:focus:border-[#FF5050] font-medium transition-all"
        onClick={() => setIsVisible(false)}
      >
        Skip to products
      </a>
      <a
        href="#testimonials"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-64 focus:z-50 focus:px-4 focus:py-2 focus:bg-white dark:focus:bg-gray-800 focus:text-black focus:dark:text-white dark:text-gray-100 focus:rounded focus:shadow-lg focus:border-2 focus:border-[#FF3131] dark:focus:border-[#FF5050] font-medium transition-all"
        onClick={() => setIsVisible(false)}
      >
        Skip to testimonials
      </a>
    </>
  );
} 