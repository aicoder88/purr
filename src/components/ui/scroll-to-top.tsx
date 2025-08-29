import { useEffect, useState, useCallback, useMemo } from "react";

// Throttle function to limit how often a function can be called
const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
) => {
  let inThrottle: boolean;
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      lastRan = Date.now();
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export default function ScrollToTopButton() {
  // Use null as initial state to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsReducedMotion(prefersReducedMotion);
      
      const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches);
      };
      
      // Modern event listener for mediaQueryList if available
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', handleMotionPreferenceChange);
      }
      
      return () => {
        if (mediaQueryList.removeEventListener) {
          mediaQueryList.removeEventListener('change', handleMotionPreferenceChange);
        }
      };
    } catch (error) {
      console.error("Error checking motion preferences:", error);
    }
  }, []);

  // Define the scroll handler using useCallback
  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsVisible(window.scrollY > 300);
    }
  }, []); // setIsVisible is stable

  // Create a memoized throttled version of the scroll handler
  const toggleVisibility = useMemo(
    () => throttle(handleScroll, 100),
    [handleScroll]
  );

  // Set up scroll listener with passive option for better performance
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    
    // Initial check
    toggleVisibility();
    
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [toggleVisibility]);

  // Scroll to top with or without smooth behavior based on user preferences
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: isReducedMotion ? 'auto' : 'smooth'
      });
    }
  };

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white dark:text-gray-100 shadow-lg transition-opacity duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      {/* Simple arrow icon using SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
