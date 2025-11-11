import { useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { requireAuth } from '@/lib/auth/session';
import AdminLayout from '@/components/admin/AdminLayout';
import RichTextEditor from '@/components/admin/RichTextEditor';
import AutoSaveIndicator from '@/components/admin/AutoSaveIndicator';
import { useAutoSave } from '@/hooks/useAutoSave';
import { ContentStore } from '@/lib/blog/content-store';
import { SEOScorer } from '@/lib/blog/seo-scorer';
import type { BlogPost, Category, Tag } from '@/types/blog';
import { ArrowLeft, Save, Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface EditPostPageProps {
  post: BlogPost;
  categories: Category[];
  tags: Tag[];
  locale: string;
}

export default function EditPostPage({ post: initialPost, categories, tags, locale }: EditPostPageProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [title, setTitle] = useState(initialPost.title);
  const [content, setContent] = useState(initialPost.content);
  const [excerpt, setExcerpt] = useState(initialPost.excerpt);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialPost.categories);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialPost.tags);
  const [featuredImage, setFeaturedImage] = useState(initialPost.featuredImage?.url || '');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>(initialPost.status);
  const [scheduledDate, setScheduledDate] = useState<string>(initialPost.scheduledDate || '');

  // Enhanced auto-save functionality
  const performAutoSave = useCallback(async () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    const now = new Date().toISOString();

    const updatedPost: BlogPost = {
      ...initialPost,
      title,
      excerpt: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      content,
      modifiedDate: now,
      status: 'draft',
      featuredImage: {
        url: featuredImage || '/purrify-logo.png',
        alt: title,
        width: 1200,
        height: 630
      },
      categories: selectedCategories,
      tags: selectedTags,
      seo: {
        title: title.substring(0, 60),
        description: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 160),
        keywords: selectedTags
      },
      readingTime: calculateReadingTime(content)
    };

    const response = await fetch('/api/admin/blog/posts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPost)
    });

    if (!response.ok) {
      throw new Error('Failed to auto-save');
    }
  }, [title, content, excerpt, selectedCategories, selectedTags, featuredImage, initialPost]);

  const {
    state: autoSaveState,
    triggerAutoSave,
    saveToLocalStorage,
    loadFromLocalStorage
  } = useAutoSave({
    onSave: performAutoSave,
    delay: 30000,
    localStorageKey: `blog-draft-edit-${initialPost.slug}`
  });

  // Trigger auto-save on content changes
  useEffect(() => {
    triggerAutoSave();
    saveToLocalStorage({
      title,
      content,
      excerpt,
      selectedCategories,
      selectedTags,
      featuredImage,
      status,
      scheduledDate
    });
  }, [title, content, excerpt, selectedCategories, selectedTags, featuredImage, status, scheduledDate]);

  // Offer to restore from localStorage on mount
  useEffect(() => {
    const draft = loadFromLocalStorage();
    if (draft && draft.title && draft.title !== initialPost.title) {
      if (confirm('Found unsaved changes. Would you like to restore them?')) {
        setTitle(draft.title || initialPost.title);
        setContent(draft.content || initialPost.content);
        setExcerpt(draft.excerpt || initialPost.excerpt);
        setSelectedCategories(draft.selectedCategories || initialPost.categories);
        setSelectedTags(draft.selectedTags || initialPost.tags);
        setFeaturedImage(draft.featuredImage || initialPost.featuredImage?.url || '');
      }
    }
  }, []);

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('slug', initialPost.slug);

    const response = await fetch('/api/admin/blog/upload-image', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.url;
  };

  const calculateReadingTime = (text: string): number => {
    const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const handlePreview = async () => {
    try {
      const response = await fetch('/api/admin/blog/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slug: initialPost.slug, locale })
      });

      if (!response.ok) {
        throw new Error('Failed to generate preview');
      }

      const { previewUrl } = await response.json();
      window.open(previewUrl, '_blank');
    } catch (error) {
      toast.error('Failed to generate preview');
      console.error(error);
    }
  };

  const handleSave = async (publishNow = false) => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (!content.trim()) {
      toast.error('Please add some content');
      return;
    }

    setSaving(true);

    try {
      const now = new Date().toISOString();

      const updatedPost: BlogPost = {
        ...initialPost,
        title,
        excerpt: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        content,
        modifiedDate: now,
        status: publishNow ? 'published' : (scheduledDate ? 'scheduled' : status),
        scheduledDate: scheduledDate || undefined,
        featuredImage: {
          url: featuredImage || '/purrify-logo.png',
          alt: title,
          width: 1200,
          height: 630
        },
        categories: selectedCategories,
        tags: selectedTags,
        seo: {
          title: title.substring(0, 60),
          description: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 160),
          keywords: selectedTags
        },
        readingTime: calculateReadingTime(content)
      };

      const response = await fetch('/api/admin/blog/posts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
      });

      if (!response.ok) {
        throw new Error('Failed to save post');
      }

      toast.success(publishNow ? 'Post published!' : 'Post updated');
      router.push('/admin/blog');
    } catch (error) {
      toast.error('Failed to save post');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/admin/blog/posts/${initialPost.slug}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      toast.success('Post deleted');
      router.push('/admin/blog');
    } catch (error) {
      toast.error('Failed to delete post');
      console.error(error);
      setDeleting(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const addTag = (tagId: string) => {
    if (!selectedTags.includes(tagId)) {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const removeTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(id => id !== tagId));
  };

  // Calculate SEO score
  const mockPost: Partial<BlogPost> = {
    title,
    content,
    excerpt,
    seo: {
      title,
      description: excerpt,
      keywords: selectedTags
    },
    categories: selectedCategories,
    tags: selectedTags,
    featuredImage: {
      url: featuredImage,
      alt: title,
      width: 1200,
      height: 630
    }
  };

  const scorer = new SEOScorer();
  const seoScore = title && content ? scorer.calculateScore(mockPost as BlogPost) : null;

  return (
    <>
      <Head>
        <title>Edit: {title} - Blog Admin</title>
      </Head>
      <AdminLayout>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/admin/blog"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Posts</span>
          </Link>
          <div className="flex items-center space-x-3">
            {/* Enhanced auto-save indicator */}
            <AutoSaveIndicator state={autoSaveState} />
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center space-x-2 px-4 py-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete</span>
            </button>
            <button
              onClick={handlePreview}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Eye className="w-5 h-5" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white dark:text-gray-100 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              <span>{status === 'published' ? 'Update' : 'Publish'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add title..."
                className="w-full text-4xl font-bold border-none focus:outline-none focus:ring-0 placeholder-gray-300 dark:placeholder-gray-600 bg-transparent dark:text-gray-100"
              />
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className={title.length >= 50 && title.length <= 60 ? 'text-green-600 dark:text-green-400' : title.length > 60 ? 'text-red-600 dark:text-red-400' : ''}>
                  Title: {title.length} characters {title.length >= 50 && title.length <= 60 && '✓'}
                </span>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <span>
                  Reading time: {calculateReadingTime(content)} min
                </span>
              </div>
            </div>

            {/* Content Editor */}
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your post..."
              onImageUpload={handleImageUpload}
            />

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Excerpt (Optional)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write a short excerpt..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <div className="mt-1 text-sm">
                <span className={excerpt.length >= 150 && excerpt.length <= 160 ? 'text-green-600 dark:text-green-400' : excerpt.length > 160 ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}>
                  {excerpt.length} / 160 characters {excerpt.length >= 150 && excerpt.length <= 160 && '✓'}
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Post Settings</h3>
              
              {/* Status */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published' | 'scheduled')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Scheduled Date */}
              {status === 'scheduled' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Publish Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  />
                  {scheduledDate && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Will publish on {new Date(scheduledDate).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* SEO Score */}
            {seoScore && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">SEO Score</h3>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        seoScore.overall >= 80
                          ? 'bg-green-500'
                          : seoScore.overall >= 60
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${seoScore.overall}%` }}
                    />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {seoScore.overall}
                  </span>
                </div>
                {seoScore.suggestions.length > 0 && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {seoScore.suggestions.slice(0, 3).map((suggestion, i) => (
                      <p key={i}>• {suggestion}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="rounded border-gray-300 dark:border-gray-600 text-purple-600 dark:text-purple-400 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedTags.map((tagId) => {
                  const tag = tags.find(t => t.id === tagId);
                  return tag ? (
                    <span
                      key={tagId}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-sm"
                    >
                      <span>{tag.name}</span>
                      <button
                        onClick={() => removeTag(tagId)}
                        className="hover:text-purple-900 dark:hover:text-purple-100 text-purple-700 dark:text-purple-300"
                      >
                        ×
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    addTag(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              >
                <option value="">Add tag...</option>
                {tags
                  .filter(tag => !selectedTags.includes(tag.id))
                  .map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Featured Image */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Featured Image</h3>
              {featuredImage ? (
                <div className="relative">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    onClick={() => setFeaturedImage('')}
                    className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white dark:text-gray-100 text-xs rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={async () => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = async (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        try {
                          const url = await handleImageUpload(file);
                          setFeaturedImage(url);
                          toast.success('Image uploaded');
                        } catch (error) {
                          toast.error('Failed to upload image');
                        }
                      }
                    };
                    input.click();
                  }}
                  className="w-full px-4 py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-purple-500 transition-colors text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Click to upload
                </button>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params, locale }) => {
  const { authorized } = await requireAuth(req, res);

  if (!authorized) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false
      }
    };
  }

  const slug = params?.slug as string;
  const store = new ContentStore();
  
  try {
    const post = await store.getPost(slug, locale || 'en');
    
    if (!post) {
      return {
        notFound: true
      };
    }

    const categories = await store.getCategories();
    const tags = await store.getTags();

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        categories: JSON.parse(JSON.stringify(categories)),
        tags: JSON.parse(JSON.stringify(tags)),
        locale: locale || 'en'
      }
    };
  } catch (error) {
    console.error('Failed to load post:', error);
    return {
      notFound: true
    };
  }
};
