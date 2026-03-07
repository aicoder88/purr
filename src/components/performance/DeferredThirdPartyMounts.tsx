'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Analytics = dynamic(
  () => import('@vercel/analytics/react').then((mod) => ({ default: mod.Analytics })),
  { ssr: false }
);

const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((mod) => ({ default: mod.SpeedInsights })),
  { ssr: false }
);

const ChatWidgetMount = dynamic(
  () => import('@/components/chat/ChatWidgetMount').then((mod) => ({ default: mod.ChatWidgetMount })),
  { ssr: false }
);

interface DeferredThirdPartyMountsProps {
  hasChatWidget: boolean;
  gtmId?: string;
}

function useDeferredThirdPartyReady(delayMs: number = 2500) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) {
      return;
    }

    let timeoutId: number | undefined;
    let idleId: number | undefined;

    const markReady = () => {
      setIsReady(true);
    };

    const onInteraction = () => {
      markReady();
    };

    const supportsIdleCallback = typeof window.requestIdleCallback === 'function';

    if (supportsIdleCallback) {
      idleId = window.requestIdleCallback(markReady, { timeout: delayMs });
    } else {
      timeoutId = window.setTimeout(markReady, delayMs);
    }

    const interactionEvents: Array<keyof WindowEventMap> = [
      'pointerdown',
      'keydown',
      'touchstart',
      'scroll',
    ];

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, onInteraction, { once: true, passive: true });
    });

    return () => {
      if (typeof idleId === 'number' && supportsIdleCallback) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, onInteraction);
      });
    };
  }, [delayMs, isReady]);

  return isReady;
}

export function DeferredThirdPartyMounts({
  hasChatWidget,
  gtmId,
}: DeferredThirdPartyMountsProps) {
  const isReady = useDeferredThirdPartyReady();

  useEffect(() => {
    if (!isReady || !gtmId || typeof document === 'undefined') {
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[data-purrify-gtm="${gtmId}"]`);
    if (existingScript) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || ((...args: unknown[]) => {
      window.dataLayer?.push(args);
    }) as Window['gtag'];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    script.dataset.purrifyGtm = gtmId;
    script.setAttribute('data-cfasync', 'false');
    document.head.appendChild(script);
  }, [gtmId, isReady]);

  return (
    <>
      {isReady && hasChatWidget ? <ChatWidgetMount /> : null}
      {isReady ? <Analytics /> : null}
      {isReady ? <SpeedInsights /> : null}
    </>
  );
}
