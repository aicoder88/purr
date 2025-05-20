import { useState, useEffect, useRef, useCallback } from "react";
import { FaPaw } from "react-icons/fa";

export function PawCursor() {
  const [paws, setPaws] = useState<
    { x: number; y: number; id: number; rotation: number }[]
  >([]);
  const idRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPawAnimationEnabled, setIsPawAnimationEnabled] = useState(false);
  
  // Performance optimization - disable paw animation on mobile
  // Also check if we're in a browser environment to avoid SSR issues
  useEffect(() => {
    // Safely check if window exists (for SSR)
    if (typeof window === 'undefined') return;
    
    try {
      const checkMobile = () => {
        setIsPawAnimationEnabled(window.innerWidth > 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    } catch (error) {
      console.error("Error in PawCursor resize handler:", error);
      setIsPawAnimationEnabled(false);
    }
  }, []);

  // Memoize the mouse move handler to prevent unnecessary re-renders
  const handleMouseMove = useCallback((event: MouseEvent) => {
    // Early return if animation is disabled
    if (!isPawAnimationEnabled) return;
    
    try {
      // Safely access event properties
      if (!event || typeof event.clientX !== 'number' || typeof event.clientY !== 'number') return;
      
      const { clientX: x, clientY: y } = event;
      
      // Throttle the event handling
      if (timeoutRef.current) return;
      
      timeoutRef.current = setTimeout(() => {
        if (timeoutRef.current) {
          timeoutRef.current = null;
          
          // Calculate rotation based on mouse movement
          const rotation = Math.floor(Math.random() * 360);
          
          // Add small random offset to make paws appear more natural
          const offsetX = Math.random() * 20 - 10; // Random offset between -10 and 10
          const offsetY = Math.random() * 20 - 10; // Random offset between -10 and 10
          
          // Limit the number of paws to improve performance
          setPaws((prev) => {
            const newPaws = [...prev, {
              x: x + offsetX,
              y: y + offsetY,
              rotation,
              id: idRef.current++
            }];
            return newPaws.slice(-5); // Only keep the last 5 paws
          });
        }
      }, 100);
    } catch (error) {
      console.error("Error in PawCursor mouse handler:", error);
      // Disable animation if there's an error
      setIsPawAnimationEnabled(false);
    }
  }, [isPawAnimationEnabled]);

  useEffect(() => {
    // Safely check if window exists (for SSR)
    if (typeof window === 'undefined') return;
    
    try {
      if (isPawAnimationEnabled) {
        window.addEventListener("mousemove", handleMouseMove);
      }
      
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    } catch (error) {
      console.error("Error in PawCursor effect:", error);
      setIsPawAnimationEnabled(false);
    }
  }, [handleMouseMove, isPawAnimationEnabled]);

  // Only render if we're in a browser environment and animation is enabled
  if (typeof window === 'undefined' || !isPawAnimationEnabled) {
    return null;
  }
  
  return (
    <>
      {/* Render paws only if animation is enabled */}
      {paws.map((paw) => (
        <span
          key={paw.id}
          className="fixed z-50 pointer-events-none transition-transform duration-300 ease-out"
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