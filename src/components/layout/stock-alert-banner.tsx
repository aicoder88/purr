'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export function StockAlertBanner() {
  const locale = useLocale();
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="bg-[#FF3131] text-white border-b border-[#E02828]">
      <div className="container mx-auto px-4 py-4 text-center">
        <p className="text-lg md:text-xl font-extrabold tracking-wide uppercase">
          Out of stock! Taking backorders!
        </p>
        <p className="mt-1 text-base md:text-lg font-bold">
          Purrify is HOT HOT HOT!
        </p>
        <p className="mt-2 text-sm md:text-base">
          It works great and people are finding out just how good!
        </p>
        <p className="text-sm md:text-base">
          But we&apos;re a tiny company, and can&apos;t keep up as of February 2026. We are 2 weeks
          behind on orders, so we are not taking any more at this moment.
        </p>
        <p className="mt-2 text-sm md:text-base">
          <Link
            href={`${localePrefix}/#waitlist`}
            className="font-semibold underline underline-offset-2 hover:text-yellow-100 dark:hover:text-yellow-100 transition-colors"
          >
            Click here to get on the waitlist
          </Link>{' '}
          and you&apos;ll be notified when we are shipping again (Estimated March 3rd).
        </p>
      </div>
    </section>
  );
}
