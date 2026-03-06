'use client';

import dynamic from 'next/dynamic';

const Analytics = dynamic(
  () => import('@vercel/analytics/react').then((mod) => ({ default: mod.Analytics })),
  { ssr: false }
);

const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((mod) => ({ default: mod.SpeedInsights })),
  { ssr: false }
);

const MetaPixel = dynamic(
  () => import('@/components/analytics/MetaPixel').then((mod) => ({ default: mod.MetaPixel })),
  { ssr: false }
);

const ChatWidgetMount = dynamic(
  () => import('@/components/chat/ChatWidgetMount').then((mod) => ({ default: mod.ChatWidgetMount })),
  { ssr: false }
);

interface DeferredThirdPartyMountsProps {
  hasChatWidget: boolean;
}

export function DeferredThirdPartyMounts({
  hasChatWidget,
}: DeferredThirdPartyMountsProps) {
  return (
    <>
      {hasChatWidget ? <ChatWidgetMount /> : null}
      <Analytics />
      <SpeedInsights />
      <MetaPixel />
    </>
  );
}
