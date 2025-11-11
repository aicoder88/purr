import { useState, useEffect, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { requireAuth } from '@/lib/auth/session';
import AdminLayout from '@/components/admin/AdminLayout';
import RichTextEditor from '@/components/admin/RichTextEditor';
import AutoSaveIndicator from '@/components/admin/AutoSaveIndicator';
import HelpBanner from '@/components/admin/HelpBanner';
import AIContentGenerator from '@/components/admin/AIContentGenerator';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { ContentStore } from '@/lib/blog/content-store';
import { SEOScorer } from '@/lib/blog/seo-scorer';
import type { BlogPost, Category, Tag } from '@/types/blog';
import { ArrowLeft, Save, Eye, Keyboard, Sparkles } from 'lucide-react';
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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  // Enhanced auto-save with visual feedback
  const performAutoSave = useCallback(async () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

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
      status: 'draft',
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

    // Save to server
    const response = await fetch('/api/admin/blog/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });

    if (!response.ok) {
      throw new Error('Failed to auto-save');
    }
  }, [title, content, excerpt, selectedCategories, selectedTags, featuredImage, locale]);

  const {
    state: autoSaveState,
    triggerAutoSave,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage
  } = useAutoSave({
    onSave: performAutoSave,
    delay: 30000,
    localStorageKey: 'blog-draft-new'
  });

  // Trigger auto-save on content changes
  useEffect(() => {
    if (title || content) {
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
    }
  }, [title, content, excerpt, selectedCategories, selectedTags, featuredImage, status, scheduledDate]);

  // Load draft from localStorage on mount
  useEffect(() => {
    const draft = loadFromLocalStorage();
    if (draft && draft.title) {
      if (confirm('Found a saved draft. Would you like to restore it?')) {
        setTitle(draft.title || '');
        setContent(draft.content || '');
        setExcerpt(draft.excerpt || '');
        setSelectedCategories(draft.selectedCategories || []);
        setSelectedTags(draft.selectedTags || []);
        setFeaturedImage(draft.featuredImage || '');
        setStatus(draft.status || 'draft');
        setScheduledDate(draft.scheduledDate || '');
      } else {
        clearLocalStorage();
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

  const handlePreview = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    try {
      const slug = generateSlug(title);
      
      // Generate preview token
      const response = await fetch('/api/admin/blog/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slug, locale })
      });

      if (!response.ok) {
        throw new Error('Failed to generate preview');
      }

      const { previewUrl } = await response.json();
      
      // Open preview in new tab
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

  const handleAIGenerate = (generated: { title: string; content: string; excerpt: string }) => {
    setTitle(generated.title);
    setContent(generated.content);
    setExcerpt(generated.excerpt);
    toast.success('AI content applied! Review and edit as needed.');
  };

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 's',
      ctrl: true,
      action: () => handleSave(false),
      description: 'Save draft'
    },
    {
      key: 's',
      ctrl: true,
      shift: true,
      action: () => handleSave(true),
      description: 'Save and publish'
    },
    {
      key: 'p',
      ctrl: true,
      action: handlePreview,
      description: 'Preview post'
    },
    {
      key: '?',
      shift: true,
      action: () => setShowShortcuts(true),
      description: 'Show keyboard shortcuts'
    },
    {
      key: 'Escape',
      action: () => setShowShortcuts(false),
      description: 'Close dialogs'
    }
  ]);

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
        {/* Help Banner */}
        <HelpBanner
          storageKey="blog-new-post-help-dismissed"
          title="Creating Your Post"
          tips={[
            'Your work is auto-saved every 30 seconds - watch the indicator in the header',
            'Aim for an SEO score of 80+ for better search visibility',
            'Use the media library to insert previously uploaded images',
            'Schedule posts for future publication using the status dropdown'
          ]}
          showKeyboardHint
        />

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
              onClick={() => setShowAIGenerator(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span>AI Generate</span>
            </button>
            <button
              onClick={handlePreview}
              disabled={!title.trim()}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
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
                      <p key={i}>• {suggestion.message}</p>
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
                        className="text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100"
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

        {/* AI Content Generator */}
        {showAIGenerator && (
          <AIContentGenerator
            onGenerate={(generated) => {
              setTitle(generated.title);
              setContent(generated.content);
              setExcerpt(generated.excerpt);
              toast.success('AI content applied!');
            }}
            onClose={() => setShowAIGenerator(false)}
          />
        )}

        {/* Keyboard Shortcuts Help Modal */}
        {showShortcuts && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center space-x-2">
                  <Keyboard className="w-5 h-5" />
                  <span>Keyboard Shortcuts</span>
                </h3>
                <button
                  onClick={() => setShowShortcuts(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  ×
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span>Save draft</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+S</kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span>Save and publish</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+Shift+S</kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span>Preview</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+P</kbd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span>Show shortcuts</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Shift+?</kbd>
                </div>
                <div className="flex justify-between py-2">
                  <span>Close dialogs</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Esc</kbd>
                </div>
              </div>
            </div>
          </div>
        )}
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
