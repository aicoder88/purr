'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ZENDESK_WAITLIST_URL = 'https://purrifyca.zendesk.com/hc/en-us/requests/new?tf_subject=Waitlist%20Request%20-%20Purrify%20Restock&tf_description=Please%20add%20me%20to%20the%20Purrify%20waitlist%20and%20notify%20me%20when%20stock%20is%20back.';

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
        <p className="mt-2 text-sm md:text-base">
          <Link
            href={ZENDESK_WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-gray-950/20 bg-white/80 px-5 py-2 font-black text-gray-950 transition-colors hover:bg-white dark:border-gray-900/20 dark:bg-black/10 dark:text-gray-900 dark:hover:bg-black/20"
          >
            {t('stockAlertBanner.cta')}
          </Link>
        </p>
      </div>
    </section>
  );
}
