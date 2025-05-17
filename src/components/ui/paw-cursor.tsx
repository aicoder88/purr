import { useState, useEffect, useRef, useCallback } from "react";
import { FaPaw } from "react-icons/fa";

export function PawCursor() {
  const [paws, setPaws] = useState<
    { x: number; y: number; id: number; rotation: number }[]
  >([]);
  const idRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPawAnimationEnabled, setIsPawAnimationEnabled] = useState(true);
  
  // Performance optimization - disable paw animation on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsPawAnimationEnabled(window.innerWidth > 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Memoize the mouse move handler to prevent unnecessary re-renders
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isPawAnimationEnabled) return;
    
    const { clientX: x, clientY: y } = event;
    
    // Throttle the event handling
    if (timeoutRef.current) return;
    
    timeoutRef.current = setTimeout(() => {
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
    }, 100);
  }, [isPawAnimationEnabled]);

  useEffect(() => {
    if (isPawAnimationEnabled) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleMouseMove, isPawAnimationEnabled]);

  return (
    <>
      {/* Render paws only if animation is enabled */}
      {isPawAnimationEnabled && paws.map((paw) => (
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