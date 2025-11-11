import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { requireAuth } from '@/lib/auth/session';
import AdminLayout from '@/components/admin/AdminLayout';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

export default function AnalyticsPage() {
  return (
    <>
      <Head>
        <title>Analytics - Blog Admin</title>
      </Head>
      <AdminLayout>
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
