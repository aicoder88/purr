"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import BulkActionsToolbar, { type BulkOperation } from '@/components/admin/BulkActionsToolbar';
import HelpBanner from '@/components/admin/HelpBanner';
import type { BlogPost, Category, Tag } from '@/types/blog';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

async function fetchBlogData() {
  const response = await fetch('/api/admin/blog/posts?includeUnpublished=true');
  if (!response.ok) throw new Error('Failed to fetch posts');
  const posts = await response.json();

  const categoriesResponse = await fetch('/api/admin/blog/categories');
  const categories = categoriesResponse.ok ? await categoriesResponse.json() : [];

  const tagsResponse = await fetch('/api/admin/blog/tags');
  const tags = tagsResponse.ok ? await tagsResponse.json() : [];

  return { posts, categories, tags };
}

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  useEffect(() => {
    // Check authentication and load data
    const loadData = async () => {
      try {
        const data = await fetchBlogData();
        setPosts(data.posts);
        setCategories(data.categories);
        setTags(data.tags);
      } catch (error) {
        console.error('Failed to load blog data:', error);
        toast.error('Failed to load blog data');
        // Redirect to login if unauthorized
        if ((error as Error).message.includes('Unauthorized')) {
          router.push('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const togglePostSelection = (slug: string) => {
    setSelectedPosts(prev =>
      prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(p => p.slug));
    }
  };

  const handleBulkOperation = async (operation: BulkOperation) => {
    try {
      const response = await fetch('/api/admin/blog/bulk-operations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          operation,
          postSlugs: selectedPosts
        })
      });

      if (!response.ok) {
        throw new Error('Bulk operation failed');
      }

      const result = await response.json();

      // Update local state based on operation
      if (operation.type === 'delete') {
        setPosts(posts.filter(p => !selectedPosts.includes(p.slug)));
        toast.success(`Deleted ${result.results.successful.length} post(s)`);
      } else if (operation.type === 'changeStatus') {
        setPosts(posts.map(p =>
          selectedPosts.includes(p.slug)
            ? { ...p, status: operation.status }
            : p
        ));
        toast.success(`Updated ${result.results.successful.length} post(s)`);
      } else if (operation.type === 'assignCategories') {
        setPosts(posts.map(p =>
          selectedPosts.includes(p.slug)
            ? { ...p, categories: [...new Set([...p.categories, ...operation.categories])] }
            : p
        ));
        toast.success(`Updated ${result.results.successful.length} post(s)`);
      } else if (operation.type === 'assignTags') {
        setPosts(posts.map(p =>
          selectedPosts.includes(p.slug)
            ? { ...p, tags: [...new Set([...p.tags, ...operation.tags])] }
            : p
        ));
        toast.success(`Updated ${result.results.successful.length} post(s)`);
      }

      if (result.results.failed.length > 0) {
        toast.error(`Failed to update ${result.results.failed.length} post(s)`);
      }

      setSelectedPosts([]);
    } catch (error) {
      console.error('Bulk operation error:', error);
      toast.error('Bulk operation failed');
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/blog/posts/${slug}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setPosts(posts.filter(p => p.slug !== slug));
        setSelectedPosts(selectedPosts.filter(s => s !== slug));
        toast.success('Post deleted successfully');
      } else {
        toast.error('Failed to delete post');
      }
    } catch {
      toast.error('An error occurred');
    }
  };

  const getStatusBadge = (status: BlogPost['status']) => {
    const styles = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      scheduled: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 dark:border-purple-400"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Help Banner */}
      <HelpBanner
        storageKey="blog-posts-help-dismissed"
        title="Quick Tips"
        tips={[
          'Select multiple posts using checkboxes to perform bulk actions',
          'Click "Schedule" in the navigation to view your content calendar',
          'All changes are automatically saved with revision history',
          'Visit the Media library to manage and reuse uploaded images'
        ]}
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">Posts</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{filteredPosts.length} posts</p>
        </div>
        <Link
          href="/admin/blog/new/"
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white dark:text-gray-100 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Post</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft' | 'scheduled')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Select All */}
      {filteredPosts.length > 0 && (
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
            onChange={toggleSelectAll}
            className="rounded border-gray-300 dark:border-gray-600 text-purple-600 dark:text-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Select all
          </span>
        </div>
      )}

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No posts found</p>
          <Link
            href="/admin/blog/new/"
            className="inline-flex items-center space-x-2 mt-4 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
          >
            <Plus className="w-5 h-5" />
            <span>Create your first post</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedPosts.includes(post.slug)}
                  onChange={() => togglePostSelection(post.slug)}
                  className="mt-1 rounded border-gray-300 dark:border-gray-600 text-purple-600 dark:text-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400"
                />

                <div className="flex-1 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="font-heading text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {post.title}
                      </h2>
                      {getStatusBadge(post.status)}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{formatDate(post.publishDate)}</span>
                      <span>•</span>
                      <span>{post.readingTime} min read</span>
                      {post.categories.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{post.categories.join(', ')}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/admin/blog/edit/${post.slug}`}
                      className="p-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bulk Actions Toolbar */}
      <BulkActionsToolbar
        selectedCount={selectedPosts.length}
        onClearSelection={() => setSelectedPosts([])}
        onExecute={handleBulkOperation}
        categories={categories}
        tags={tags}
      />
    </AdminLayout>
  );
}
