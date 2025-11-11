import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { requireAuth } from '@/lib/auth/session';
import AdminLayout from '@/components/admin/AdminLayout';
import SchedulingCalendar from '@/components/admin/SchedulingCalendar';
import { ContentStore } from '@/lib/blog/content-store';
import type { BlogPost } from '@/types/blog';
import { ArrowLeft } from 'lucide-react';

interface SchedulePageProps {
  posts: BlogPost[];
  locale: string;
}

export default function SchedulePage({ posts, locale }: SchedulePageProps) {
  const router = useRouter();

  const handlePostClick = (post: BlogPost) => {
    router.push(`/admin/blog/edit/${post.slug}`);
  };

  return (
    <>
      <Head>
        <title>Scheduled Posts - Blog Admin</title>
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

        <SchedulingCalendar posts={posts} onPostClick={handlePostClick} />
      </AdminLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale }) => {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false
      }
    };
  }

  const store = new ContentStore();
  const posts = await store.getAllPosts(locale || 'en', true);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      locale: locale || 'en'
    }
  };
};
