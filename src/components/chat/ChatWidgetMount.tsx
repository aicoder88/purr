'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ChatWidget = dynamic(() => import('@/components/chat/ChatWidget'), {
  ssr: false,
});

export function ChatWidgetMount() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mountWidget = () => setShouldMount(true);

    if ('requestIdleCallback' in window) {
      const idleCallbackId = window.requestIdleCallback(mountWidget, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleCallbackId);
    }

    const timeoutId = globalThis.setTimeout(mountWidget, 1500);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  return shouldMount ? <ChatWidget /> : null;
}
