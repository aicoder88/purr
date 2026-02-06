export const dynamic = 'force-static';

import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy Purrify | Redirecting...',
  description: 'Redirecting to Purrify products page.',
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * /buy - Redirect to products page
 * Handles common user search intent for buying
 */
export default function BuyPage() {
  redirect('/products');
}
