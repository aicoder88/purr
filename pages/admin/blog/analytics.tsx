import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth/session';
import AdminLayout from '@/components/admin/AdminLayout';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import { ArrowLeft } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <>
      <Head>
        <title>Analytics - Blog Admin</title>
      </Head>
      <AdminLayout>
        <div className="mb-6">
          <Link
            href="/admin/blog"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Posts</span>
          </Link>
        </div>

        <AnalyticsDashboard />
      </AdminLayout>
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
