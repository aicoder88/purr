'use client';

import { useEffect, useRef } from 'react';
import { trackTikTokClientEvent } from '@/lib/tiktok-tracking';
import { getProductPrice } from '@/lib/pricing';

export function TryFreeClient({ children }: { children: React.ReactNode }) {
  const viewTracked = useRef(false);
  const productKey = 'trial';
  const productName = 'Purrify Trial Size (12g)';
  const numericPrice = getProductPrice(productKey);

  useEffect(() => {
    if (viewTracked.current) return;
    viewTracked.current = true;

    trackTikTokClientEvent('ViewContent', {
      content_id: productKey,
      content_name: productName,
      content_type: 'product',
      value: numericPrice,
      currency: 'CAD',
    });
  }, [numericPrice]);

  return <>{children}</>;
}
