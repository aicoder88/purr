'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import {
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { SocialPostStatus } from '@/generated/client/client';

interface SocialPostItem {
  id: string;
  content: string;
  platforms: string[];
  status: SocialPostStatus;
  scheduledAt: string | null;
  publishedAt: string | null;
  createdAt: string;
}

interface RecentSubmissionsProps {
  onRefresh?: () => void;
}

const platformIcons: Record<string, React.ElementType> = {
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  blog: FileText
};

const platformColors: Record<string, string> = {
  facebook: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  linkedin: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  twitter: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100',
  instagram: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
  blog: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
};

const statusConfig: Record<SocialPostStatus, {
  label: string;
  color: string;
  icon: React.ElementType
}> = {
  DRAFT: {
    label: 'Draft',
    color: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
    icon: FileText
  },
  SCHEDULED: {
    label: 'Scheduled',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    icon: Calendar
  },
  PUBLISHED: {
    label: 'Published',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    icon: CheckCircle
  },
  FAILED: {
    label: 'Failed',
    color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    icon: XCircle
  }
};

function SubmissionSkeleton() {
  return (
    <div className="animate-pulse p-4 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

export function RecentSubmissions({ onRefresh }: RecentSubmissionsProps) {
  const [posts, setPosts] = useState<SocialPostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<SocialPostStatus | 'all'>('all');

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.set('status', statusFilter);
      }

      const response = await fetch(`/api/admin/ops/social/submissions?${params}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleRefresh = () => {
    fetchPosts();
    onRefresh?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Recent Submissions
        </h2>
        <div className="flex items-center space-x-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as SocialPostStatus | 'all')}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50"
          >
            <option value="all">All</option>
            <option value="DRAFT">Draft</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="PUBLISHED">Published</option>
            <option value="FAILED">Failed</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
        {isLoading ? (
          [1, 2, 3, 4, 5].map((i) => <SubmissionSkeleton key={i} />)
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No submissions yet</p>
            <p className="text-sm mt-1">Create your first post above</p>
          </div>
        ) : (
          posts.map((post, index) => {
            const status = statusConfig[post.status];
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  {/* Platforms */}
                  <div className="flex items-center space-x-1">
                    {post.platforms.map((platform) => {
                      const Icon = platformIcons[platform] || FileText;
                      const colorClass = platformColors[platform] || 'bg-gray-100 text-gray-600';

                      return (
                        <span
                          key={platform}
                          className={`inline-flex items-center p-1.5 rounded ${colorClass}`}
                          title={platform}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                      );
                    })}
                  </div>

                  {/* Status Badge */}
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    <span>{status.label}</span>
                  </span>
                </div>

                {/* Content Preview */}
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">
                  {post.content}
                </p>

                {/* Timestamp */}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {post.publishedAt
                    ? `Published ${formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}`
                    : post.scheduledAt
                      ? `Scheduled for ${new Date(post.scheduledAt).toLocaleDateString()}`
                      : `Created ${formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}`}
                </p>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}

export default RecentSubmissions;
