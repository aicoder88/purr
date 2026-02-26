'use client';

import { useTranslations } from 'next-intl';
import { WaitlistForm } from '@/components/ui/waitlist-form';

export function StockAlertBanner() {
  const t = useTranslations();

  return (
    <section className="border-b border-[#CF3F3F] bg-[#E84A4A] text-gray-950 dark:border-red-300 dark:bg-[#FF9C9C] dark:text-gray-900">
      <div className="container mx-auto px-4 py-5 text-center">
        <p className="text-xl md:text-2xl font-black tracking-tight leading-tight">
          {t('stockAlertBanner.headline')}
        </p>
        <p className="mt-2 text-xs md:text-sm font-semibold leading-snug">
          {t('stockAlertBanner.line1')}
        </p>
        <p className="mt-2 text-xs md:text-sm font-semibold leading-snug">
          {t('stockAlertBanner.line2')}
        </p>
        <p className="mt-2 text-xs md:text-sm font-bold leading-snug">
          {t('stockAlertBanner.line3')}
        </p>
        <div className="mt-4">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
