import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth/session';
import AdminLayout from '@/components/admin/AdminLayout';
import MediaLibrary from '@/components/admin/MediaLibrary';
import { ArrowLeft } from 'lucide-react';

export default function MediaPage() {
  return (
    <>
      <Head>
        <title>Media Library - Blog Admin</title>
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

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <MediaLibrary mode="manage" />
        </div>
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
