import { useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { requireAuth } from '@/lib/auth/session';
import AdminLayout from '@/components/admin/AdminLayout';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { ContentStore } from '@/lib/blog/content-store';
import { SEOScorer } from '@/lib/blog/seo-scorer';
import type { BlogPost, Category, Tag } from '@/types/blog';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface NewPostPageProps {
  categories: Category[];
  tags: Tag[];
  locale: string;
}

export default function NewPostPage({ categories, tags, locale }: NewPostPageProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (!title.trim() || !content.trim()) {
      return; // Don't auto-save empty posts
    }

    setAutoSaving(true);

    try {
      const slug = generateSlug(title);
      const now = new Date().toISOString();

      const post: BlogPost = {
        id: Date.now().toString(),
        slug,
        title,
        excerpt: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        content,
        author: {
          name: 'Purrify Team'
        },
        publishDate: now,
        modifiedDate: now,
        status: 'draft', // Always save as draft for auto-save
        featuredImage: {
          url: featuredImage || '/purrify-logo.png',
          alt: title,
          width: 1200,
          height: 630
        },
        categories: selectedCategories,
        tags: selectedTags,
        locale,
        translations: {},
        seo: {
          title: title.substring(0, 60),
          description: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 160),
          keywords: selectedTags
        },
        readingTime: calculateReadingTime(content)
      };

      // Save to localStorage as backup
      localStorage.setItem('blog-draft', JSON.stringify(post));

      // Save to server
      await fetch('/api/admin/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      });

      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
      // Don't show error toast for auto-save failures
    } finally {
      setAutoSaving(false);
    }
  }, [title, content, excerpt, selectedCategories, selectedTags, featuredImage, locale]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      autoSave();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoSave]);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('blog-draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        if (confirm('Found a saved draft. Would you like to restore it?')) {
          setTitle(draft.title || '');
          setContent(draft.content || '');
          setExcerpt(draft.excerpt || '');
          setSelectedCategories(draft.categories || []);
          setSelectedTags(draft.tags || []);
          setFeaturedImage(draft.featuredImage?.url || '');
        }
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, []);

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('slug', generateSlug(title || 'untitled'));

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

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const calculateReadingTime = (text: string): number => {
    const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / 200);
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
      const slug = generateSlug(title);
      const now = new Date().toISOString();

      const post: BlogPost = {
        id: Date.now().toString(),
        slug,
        title,
        excerpt: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        content,
        author: {
          name: 'Purrify Team'
        },
        publishDate: now,
        modifiedDate: now,
        status: publishNow ? 'published' : status,
        featuredImage: {
          url: featuredImage || '/purrify-logo.png',
          alt: title,
          width: 1200,
          height: 630
        },
        categories: selectedCategories,
        tags: selectedTags,
        locale,
        translations: {},
        seo: {
          title: title.substring(0, 60),
          description: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 160),
          keywords: selectedTags
        },
        readingTime: calculateReadingTime(content)
      };

      const response = await fetch('/api/admin/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      });

      if (!response.ok) {
        throw new Error('Failed to save post');
      }

      toast.success(publishNow ? 'Post published!' : 'Post saved as draft');
      router.push('/admin/blog');
    } catch (error) {
      toast.error('Failed to save post');
      console.error(error);
    } finally {
      setSaving(false);
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
        <title>New Post - Blog Admin</title>
      </Head>
      <AdminLayout>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/admin/blog"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Posts</span>
          </Link>
          <div className="flex items-center space-x-3">
            {/* Auto-save indicator */}
            {autoSaving && (
              <span className="text-sm text-gray-500 flex items-center space-x-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Saving...</span>
              </span>
            )}
            {!autoSaving && lastSaved && (
              <span className="text-sm text-gray-500">
                Saved {Math.floor((Date.now() - lastSaved.getTime()) / 1000)}s ago
              </span>
            )}
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              <Eye className="w-5 h-5" />
              <span>Publish</span>
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
                className="w-full text-4xl font-bold border-none focus:outline-none focus:ring-0 placeholder-gray-300"
              />
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span className={title.length >= 50 && title.length <= 60 ? 'text-green-600' : title.length > 60 ? 'text-red-600' : ''}>
                  Title: {title.length} characters {title.length >= 50 && title.length <= 60 && '✓'}
                </span>
                <span className="text-gray-400">•</span>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (Optional)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write a short excerpt..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="mt-1 text-sm">
                <span className={excerpt.length >= 150 && excerpt.length <= 160 ? 'text-green-600' : excerpt.length > 160 ? 'text-red-600' : 'text-gray-500'}>
                  {excerpt.length} / 160 characters {excerpt.length >= 150 && excerpt.length <= 160 && '✓'}
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* SEO Score */}
            {seoScore && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">SEO Score</h3>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
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
                  <span className="text-2xl font-bold text-gray-900">
                    {seoScore.overall}
                  </span>
                </div>
                {seoScore.suggestions.length > 0 && (
                  <div className="text-sm text-gray-600 space-y-1">
                    {seoScore.suggestions.slice(0, 3).map((suggestion, i) => (
                      <p key={i}>• {suggestion}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedTags.map((tagId) => {
                  const tag = tags.find(t => t.id === tagId);
                  return tag ? (
                    <span
                      key={tagId}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm"
                    >
                      <span>{tag.name}</span>
                      <button
                        onClick={() => removeTag(tagId)}
                        className="hover:text-purple-900"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Featured Image</h3>
              {featuredImage ? (
                <div className="relative">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    onClick={() => setFeaturedImage('')}
                    className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
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
                  className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition-colors text-gray-600 hover:text-purple-600"
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
  const categories = await store.getCategories();
  const tags = await store.getTags();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      tags: JSON.parse(JSON.stringify(tags)),
      locale: locale || 'en'
    }
  };
};
