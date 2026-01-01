import { useState, useEffect, useRef, useCallback } from "react";
import { PawPrint } from "lucide-react";

interface Paw {
  x: number;
  y: number;
  id: number;
  rotation: number;
}

export function PawCursor() {
  const [paws, setPaws] = useState<Paw[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const idRef = useRef(0);
  const lastMoveTime = useRef(0);
  const THROTTLE_MS = 120;

  // Check if paw animation should be enabled
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkEnabled = () => {
      const isMobile = window.innerWidth <= 768;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      setIsEnabled(!isMobile && !prefersReducedMotion);
    };

    checkEnabled();

    // Listen for resize and motion preference changes
    window.addEventListener("resize", checkEnabled);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", checkEnabled);

    return () => {
      window.removeEventListener("resize", checkEnabled);
      motionQuery.removeEventListener("change", checkEnabled);
    };
  }, []);

  // Handle mouse move - create paw trails
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastMoveTime.current < THROTTLE_MS) return;
    lastMoveTime.current = now;

    const newId = idRef.current++;
    const offsetX = Math.random() * 16 - 8;
    const offsetY = Math.random() * 16 - 8;
    const rotation = Math.random() * 40 - 20;

    setPaws((prev) => [
      ...prev.slice(-6),
      {
        x: e.clientX + offsetX,
        y: e.clientY + offsetY,
        id: newId,
        rotation,
      },
    ]);

    // Remove paw after animation completes
    setTimeout(() => {
      setPaws((prev) => prev.filter((p) => p.id !== newId));
    }, 800);
  }, []);

  // Set up mouse move listener
  useEffect(() => {
    if (!isEnabled) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isEnabled, handleMouseMove]);

  // Don't render anything if disabled or no paws
  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {paws.map((paw) => (
        <div
          key={paw.id}
          className="absolute animate-paw-fade"
          style={{
            left: paw.x,
            top: paw.y,
            transform: `translate(-50%, -50%) rotate(${paw.rotation}deg)`,
          }}
        >
          <PawPrint className="w-5 h-5 text-brand-green-600 dark:text-brand-green-400" />
        </div>
      ))}
    </div>
  );
}
