import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { FaPaw } from "react-icons/fa";

// Throttle function to limit how often a function can be called
const throttle = <T extends (...args: any[]) => void>(
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
    if (typeof window === 'undefined') return;
    
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
      const resizeObserver = new ResizeObserver(throttle(checkCapabilities, 250));
      
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
    } catch (error) {
      console.error("Error in PawCursor initialization:", error);
      setIsPawAnimationEnabled(false);
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isPawAnimationEnabled || isReducedMotion) return;

      try {
        if (!event || typeof event.clientX !== 'number' || typeof event.clientY !== 'number') return;

        const { clientX: x, clientY: y } = event;
        const rotation = Math.floor(Math.random() * 360);
        const offsetX = Math.random() * 20 - 10;
        const offsetY = Math.random() * 20 - 10;

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
      } catch (error) {
        console.error("Error in PawCursor mouse handler:", error);
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
    if (typeof window === 'undefined') return;
    
    try {
      if (isPawAnimationEnabled && !isReducedMotion) {
        // Use passive event listener for better performance
        window.addEventListener("mousemove", throttledMouseMove, { passive: true });
      }
      
      return () => {
        window.removeEventListener("mousemove", throttledMouseMove);
      };
    } catch (error) {
      console.error("Error in PawCursor effect:", error);
      setIsPawAnimationEnabled(false);
    }
  }, [throttledMouseMove, isPawAnimationEnabled, isReducedMotion]);

  // Only render if we're in a browser environment and animation is enabled
  if (typeof window === 'undefined' || !isPawAnimationEnabled || isReducedMotion) {
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
          <FaPaw className="text-[#FF3131] w-4 h-4 opacity-70" />
        </span>
      ))}
    </>
  );
}