'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const LaserCursor = dynamic(
  () => import('../ui/paw-cursor').then((mod) => ({ default: mod.LaserCursor })),
  { ssr: false }
);

const ScrollToTopButton = dynamic(
  () => import('../ui/scroll-to-top'),
  { ssr: false }
);

const MobileFloatingCTA = dynamic(
  () => import('../ui/MobileFloatingCTA').then((mod) => ({ default: mod.MobileFloatingCTA })),
  { ssr: false }
);

export function AppChrome() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) {
      return;
    }

    const markReady = () => {
      setShouldMount(true);
    };

    const onInteraction = () => {
      markReady();
    };

    const interactionEvents: Array<keyof WindowEventMap> = [
      'pointerdown',
      'keydown',
      'touchstart',
      'scroll',
      'mousemove',
    ];

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, onInteraction, { once: true, passive: true });
    });

    return () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, onInteraction);
      });
    };
  }, [shouldMount]);

  if (!shouldMount) {
    return null;
  }

  return (
    <>
      <LaserCursor />
      <ScrollToTopButton />
      <MobileFloatingCTA />
    </>
  );
}
