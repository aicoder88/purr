import { redirect } from 'next/navigation';
import { Metadata } from 'next';

/**
 * Redirect page for /support/contact -> /contact
 * FIXED: Uses Next.js server-side redirect for proper 301 handling
 * No meta refresh - prevents "Meta refresh redirect" SEO issue
 */

export const metadata: Metadata = {
  title: 'Contact Us - Purrify',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SupportContactRedirect() {
  // Server-side redirect - sends proper 301 status
  redirect('/contact');
}
