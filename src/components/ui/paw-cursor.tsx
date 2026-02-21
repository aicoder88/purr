"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { PawPrint } from "lucide-react";

interface PointerPosition {
  x: number;
  y: number;
}

interface PawTrail {
  x: number;
  y: number;
  id: number;
  rotation: number;
}

function addMediaQueryListener(query: MediaQueryList, handler: () => void) {
  if (typeof query.addEventListener === "function") {
    query.addEventListener("change", handler);
    return;
  }

  query.addListener(handler);
}

function removeMediaQueryListener(query: MediaQueryList, handler: () => void) {
  if (typeof query.removeEventListener === "function") {
    query.removeEventListener("change", handler);
    return;
  }

  query.removeListener(handler);
}

export function LaserCursor() {
  const [position, setPosition] = useState<PointerPosition>({ x: 0, y: 0 });
  const [paws, setPaws] = useState<PawTrail[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const positionRef = useRef<PointerPosition>({ x: 0, y: 0 });
  const previousPointerRef = useRef<PointerPosition | null>(null);
  const lastPawTimeRef = useRef(0);
  const pawIdRef = useRef(0);
  const pawTimeoutsRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const PAW_THROTTLE_MS = 120;
  const PAW_LAG_DISTANCE_PX = 96;
  const MIN_DIRECTION_DISTANCE = 2;

  const addPawTrail = useCallback((
    event: MouseEvent,
    previousPosition: PointerPosition
  ) => {
    const now = Date.now();
    if (now - lastPawTimeRef.current < PAW_THROTTLE_MS) {
      return;
    }

    lastPawTimeRef.current = now;

    const pawId = pawIdRef.current++;
    const dx = event.clientX - previousPosition.x;
    const dy = event.clientY - previousPosition.y;
    const directionMagnitude = Math.hypot(dx, dy);
    const hasDirection = directionMagnitude > MIN_DIRECTION_DISTANCE;

    const directionX = hasDirection ? dx / directionMagnitude : 0;
    const directionY = hasDirection ? dy / directionMagnitude : 0;

    const baseX = hasDirection
      ? event.clientX - directionX * PAW_LAG_DISTANCE_PX
      : event.clientX;
    const baseY = hasDirection
      ? event.clientY - directionY * PAW_LAG_DISTANCE_PX
      : event.clientY;

    const jitterX = Math.random() * 10 - 5;
    const jitterY = Math.random() * 10 - 5;
    const baseRotation = hasDirection
      ? (Math.atan2(dy, dx) * 180) / Math.PI + 90
      : 0;
    const rotation = baseRotation + (Math.random() * 16 - 8);

    setPaws((prev) => [
      ...prev.slice(-6),
      {
        x: baseX + jitterX,
        y: baseY + jitterY,
        id: pawId,
        rotation,
      },
    ]);

    const timeoutId = window.setTimeout(() => {
      setPaws((prev) => prev.filter((paw) => paw.id !== pawId));
      pawTimeoutsRef.current = pawTimeoutsRef.current.filter(
        (id) => id !== timeoutId
      );
    }, 800);

    pawTimeoutsRef.current.push(timeoutId);
  }, []);

  const updateCursorPosition = useCallback((event: MouseEvent) => {
    const previousPosition = previousPointerRef.current ?? {
      x: event.clientX,
      y: event.clientY,
    };

    positionRef.current = { x: event.clientX, y: event.clientY };
    previousPointerRef.current = { x: event.clientX, y: event.clientY };
    setIsVisible(true);
    addPawTrail(event, previousPosition);

    if (rafRef.current !== null) {
      return;
    }

    rafRef.current = window.requestAnimationFrame(() => {
      setPosition(positionRef.current);
      rafRef.current = null;
    });
  }, [addPawTrail]);

  useEffect(() => {
    if (typeof globalThis.window === "undefined") return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(any-pointer: fine)");
    const hoverPointerQuery = window.matchMedia("(hover: hover)");

    const checkEnabled = () => {
      setIsEnabled(
        finePointerQuery.matches &&
        hoverPointerQuery.matches &&
        !reducedMotionQuery.matches
      );
    };

    checkEnabled();

    window.addEventListener("resize", checkEnabled);
    addMediaQueryListener(reducedMotionQuery, checkEnabled);
    addMediaQueryListener(finePointerQuery, checkEnabled);
    addMediaQueryListener(hoverPointerQuery, checkEnabled);

    return () => {
      window.removeEventListener("resize", checkEnabled);
      removeMediaQueryListener(reducedMotionQuery, checkEnabled);
      removeMediaQueryListener(finePointerQuery, checkEnabled);
      removeMediaQueryListener(hoverPointerQuery, checkEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      document.body.classList.remove("laser-cursor-enabled");
      if (pawTimeoutsRef.current.length > 0) {
        pawTimeoutsRef.current.forEach((timeoutId) => {
          window.clearTimeout(timeoutId);
        });
        pawTimeoutsRef.current = [];
      }
      previousPointerRef.current = null;
      setPaws([]);
      return;
    }

    document.body.classList.add("laser-cursor-enabled");

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateCursorPosition, { passive: true });
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleMouseLeave);

    return () => {
      document.body.classList.remove("laser-cursor-enabled");
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleMouseLeave);

      if (pawTimeoutsRef.current.length > 0) {
        pawTimeoutsRef.current.forEach((timeoutId) => {
          window.clearTimeout(timeoutId);
        });
        pawTimeoutsRef.current = [];
      }
      previousPointerRef.current = null;

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isEnabled, updateCursorPosition]);

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
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
          <PawPrint className="h-5 w-5 text-brand-green-600 dark:text-brand-green-400 opacity-80" />
        </div>
      ))}
      <div
        className={`absolute rounded-full bg-brand-red-500 dark:bg-brand-red-400 blur-md transition-opacity duration-150 ${
          isVisible ? "opacity-60" : "opacity-0"
        }`}
        style={{
          width: 22,
          height: 22,
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className={`absolute rounded-full bg-brand-red-500 dark:bg-brand-red-400 transition-opacity duration-150 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: 8,
          height: 8,
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 12px rgba(255, 49, 49, 0.85)",
        }}
      />
    </div>
  );
}
