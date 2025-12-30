import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { PawPrint } from "lucide-react";

// Throttle function to limit how often a function can be called
const throttle = <T extends (event: MouseEvent) => void>(
  func: T,
  limit: number
): ((event: MouseEvent) => void) => {
  let inThrottle = false;
  let lastFunc: ReturnType<typeof setTimeout> | null = null;
  let lastRan = 0;

  return function (this: Window, event: MouseEvent) {
    if (!inThrottle) {
      func.call(this, event);
      lastRan = Date.now();
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    } else if (lastFunc === null) {
      // Only set a new timeout if we don't have one pending
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.call(this, event);
          lastRan = Date.now();
        }
        lastFunc = null;
      }, limit - (Date.now() - lastRan));
    }
  };
};

export function PawCursor() {
  const [paws, setPaws] = useState<
    { x: number; y: number; id: number; rotation: number }[]
  >([]);
  const idRef = useRef(0);
  const [isPawAnimationEnabled, setIsPawAnimationEnabled] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  // Check for reduced motion preference and device capabilities
  useEffect(() => {
    // Safely check if window exists (for SSR)
    if (typeof globalThis.window === 'undefined') return;
    
    try {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsReducedMotion(prefersReducedMotion);
      
      // Disable on mobile and if reduced motion is preferred
      const checkCapabilities = () => {
        const isMobile = window.innerWidth <= 768;
        const shouldEnable = !isMobile && !prefersReducedMotion;
        setIsPawAnimationEnabled(shouldEnable);
      };
      
      checkCapabilities();
      
      // Use passive event listener for better performance
      const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      // Create a throttled version of checkCapabilities that matches ResizeObserverCallback
      const throttledCheckCapabilities = throttle(() => {
        checkCapabilities();
      }, 250);
      
      // Create ResizeObserver with properly typed callback
      const resizeObserver = new ResizeObserver(() => {
        throttledCheckCapabilities(new MouseEvent('resize'));
      });
      
      // Modern event listener for mediaQueryList if available
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', checkCapabilities);
      }
      
      // Observe document body size changes instead of window resize
      resizeObserver.observe(document.body);
      
      return () => {
        if (mediaQueryList.removeEventListener) {
          mediaQueryList.removeEventListener('change', checkCapabilities);
        }
        resizeObserver.disconnect();
      };
    } catch (err) {
      setIsPawAnimationEnabled(false);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isPawAnimationEnabled || isReducedMotion) return;
      
      try {
        const { clientX: x, clientY: y } = e;
        const offsetX = Math.random() * 20 - 10;
        const offsetY = Math.random() * 20 - 10;
        const rotation = Math.random() * 30 - 15;

        setPaws((prev) => {
          const newPaws = [
            ...prev,
            {
              x: x + offsetX,
              y: y + offsetY,
              rotation,
              id: idRef.current++,
            },
          ];
          return newPaws.slice(-3);
        });
      } catch (err) {
        setIsPawAnimationEnabled(false);
      }
    },
    [isPawAnimationEnabled, isReducedMotion]
  );

  const throttledMouseMove = useMemo(
    () => throttle(handleMouseMove, 150),
    [handleMouseMove]
  );

  // Set up and clean up event listeners
  useEffect(() => {
    // Safely check if window exists (for SSR)
    if (typeof globalThis.window === 'undefined') return;
    
    try {
      if (isPawAnimationEnabled && !isReducedMotion) {
        // Use passive event listener for better performance
        window.addEventListener("mousemove", throttledMouseMove, { passive: true });
      }
      
      return () => {
        window.removeEventListener("mousemove", throttledMouseMove);
      };
    } catch (err) {
      setIsPawAnimationEnabled(false);
    }
  }, [throttledMouseMove, isPawAnimationEnabled, isReducedMotion]);

  // Only render if we're in a browser environment and animation is enabled
  if (typeof globalThis.window === 'undefined' || !isPawAnimationEnabled || isReducedMotion) {
    return null;
  }
  
  return (
    <>
      {/* Use React.Fragment to avoid unnecessary DOM nodes */}
      {paws.map((paw) => (
        <span
          key={paw.id}
          className="fixed z-50 pointer-events-none will-change-transform"
          style={{
            top: paw.y,
            left: paw.x,
            transform: `translate(-50%, -50%) rotate(${paw.rotation}deg) scale(0.8)`,
          }}
        >
          <PawPrint className="text-brand-green-700 dark:text-brand-green-400 w-4 h-4 opacity-85" />
        </span>
      ))}
    </>
  );
}
