import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { requireAuth } from '@/lib/auth/session';
import OpsLayout from '@/components/admin/ops/OpsLayout';
import { ShoppingCart } from 'lucide-react';

export default function OrdersPage() {
  return (
    <>
      <Head>
        <title>Orders - Purrify Hub</title>
      </Head>
      <OpsLayout>
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50">
            Order Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage customer and retailer orders
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
            Order Dashboard Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            This page will show all orders from both consumer (Stripe) and B2B (retailer)
            channels with filtering and status management.
          </p>
          <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg max-w-sm mx-auto">
            <p className="text-sm text-teal-700 dark:text-teal-300">
              <strong>Coming Features:</strong>
            </p>
            <ul className="text-sm text-teal-600 dark:text-teal-400 mt-2 text-left list-disc list-inside">
              <li>Consumer orders from Stripe</li>
              <li>Retailer wholesale orders</li>
              <li>Status tracking &amp; updates</li>
              <li>Revenue analytics</li>
            </ul>
          </div>
        </div>
      </OpsLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
