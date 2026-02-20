'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ZENDESK_WAITLIST_URL = 'https://purrifyca.zendesk.com/hc/en-us/requests/new?tf_subject=Waitlist%20Request%20-%20Purrify%20Restock&tf_description=Please%20add%20me%20to%20the%20Purrify%20waitlist%20and%20notify%20me%20when%20stock%20is%20back.';

export function StockAlertBanner() {
  const t = useTranslations();

  return (
    <section className="bg-[#FF3131] dark:bg-[#FF9C9C] text-white dark:text-gray-900 border-b border-[#E02828] dark:border-red-300">
      <div className="container mx-auto px-4 py-5 text-center">
        <p className="text-xl md:text-2xl font-black tracking-tight leading-tight">
          {t('stockAlertBanner.headline')}
        </p>
        <p className="mt-2 text-sm md:text-base font-semibold leading-relaxed">
          {t('stockAlertBanner.line1')}
        </p>
        <p className="mt-2 text-sm md:text-base font-semibold leading-relaxed">
          {t('stockAlertBanner.line2')}
        </p>
        <p className="mt-2 text-sm md:text-base font-bold leading-relaxed">
          {t('stockAlertBanner.line3')}
        </p>
        <p className="mt-2 text-sm md:text-base">
          <Link
            href={ZENDESK_WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-5 py-2 font-black bg-white/15 dark:bg-black/10 text-white dark:text-gray-900 border border-white/40 dark:border-gray-900/20 hover:bg-white/25 dark:hover:bg-black/20 transition-colors"
          >
            {t('stockAlertBanner.cta')}
          </Link>
        </p>
      </div>
    </section>
  );
}
