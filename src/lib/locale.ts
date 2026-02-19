'use server';

import { cookies, headers } from 'next/headers';
import { Locale, defaultLocale } from '@/i18n/config';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale(): Promise<Locale> {
  const headersStore = await headers();
  const headerLocale = headersStore.get('x-purrify-locale');
  if (headerLocale && ['en', 'fr'].includes(headerLocale)) {
    return headerLocale as Locale;
  }

  const cookieStore = await cookies();
  return (cookieStore.get(COOKIE_NAME)?.value as Locale) || defaultLocale;
}

export async function setUserLocale(locale: Locale): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
}
