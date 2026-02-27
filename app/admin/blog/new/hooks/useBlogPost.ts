'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { BlogPost, Category, Tag } from '@/types/blog';
import type { BlogDraftData } from '@/types/blog-draft';
import { useAutoSave } from '@/hooks/useAutoSave';

async function fetchBlogMetadata() {
  const [categoriesResponse, tagsResponse] = await Promise.all([
    fetch('/api/admin/blog/categories'),
    fetch('/api/admin/blog/tags'),
  ]);

  const categories = categoriesResponse.ok ? await categoriesResponse.json() : [];
  const tags = tagsResponse.ok ? await tagsResponse.json() : [];

  return { categories, tags };
}

export function useBlogPost() {
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  // Load categories and tags on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchBlogMetadata();
        setCategories(data.categories);
        setTags(data.tags);
      } catch (error) {
        console.error('Failed to load metadata:', error);
        toast.error('Failed to load categories and tags');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, '-')
      .replaceAll(/^-+|-+$/g, '');
  };

  const calculateReadingTime = (text: string): number => {
    const words = text.replaceAll(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  // Auto-save
  const performAutoSave = useCallback(async () => {
    if (!title.trim() || !content.trim()) return;

    const slug = generateSlug(title);
    const now = new Date().toISOString();

    const post: BlogPost = {
      id: Date.now().toString(),
      slug,
      title,
      excerpt: excerpt || content.replaceAll(/<[^>]*>/g, '').substring(0, 150) + '...',
      content,
      author: { name: 'Purrify Team' },
      publishDate: now,
      modifiedDate: now,
      status: 'draft',
      featuredImage: {
        url: featuredImage || '/optimized/logos/purrify-logo.avif',
        alt: title,
        width: 1200,
        height: 630
      },
      categories: selectedCategories,
      tags: selectedTags,
      locale: 'en',
      translations: {},
      seo: {
        title: title.substring(0, 60),
        description: excerpt || content.replaceAll(/<[^>]*>/g, '').substring(0, 160),
        keywords: selectedTags
      },
      readingTime: calculateReadingTime(content)
    };

    const response = await fetch('/api/admin/blog/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });

    if (!response.ok) throw new Error('Failed to auto-save');
  }, [title, content, excerpt, selectedCategories, selectedTags, featuredImage]);

  const {
    state: autoSaveState,
    triggerAutoSave,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage
  } = useAutoSave<BlogDraftData>({
    onSave: performAutoSave,
    delay: 30000,
    localStorageKey: 'blog-draft-new'
  });

  // Trigger auto-save on content changes
  useEffect(() => {
    if (title || content) {
      triggerAutoSave();
      saveToLocalStorage({
        title, content, excerpt, selectedCategories, selectedTags, featuredImage, status, scheduledDate
      });
    }
  }, [title, content, excerpt, selectedCategories, selectedTags, featuredImage, status, scheduledDate, triggerAutoSave, saveToLocalStorage]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Actions
  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('slug', generateSlug(title || 'untitled'));

    const response = await fetch('/api/admin/blog/upload-image', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to upload image');
    return data.url;
  };

  const handlePreview = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    try {
      const slug = generateSlug(title);
      const response = await fetch('/api/admin/blog/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, locale: 'en' })
      });

      if (!response.ok) throw new Error('Failed to generate preview');
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
      const slug = generateSlug(title);
      const now = new Date().toISOString();

      const post: BlogPost = {
        id: Date.now().toString(),
        slug,
        title,
        excerpt: excerpt || content.replaceAll(/<[^>]*>/g, '').substring(0, 150) + '...',
        content,
        author: { name: 'Purrify Team' },
        publishDate: now,
        modifiedDate: now,
        status: publishNow ? 'published' : (scheduledDate ? 'scheduled' : status),
        scheduledDate: scheduledDate || undefined,
        featuredImage: {
          url: featuredImage || '/optimized/logos/purrify-logo.avif',
          alt: title,
          width: 1200,
          height: 630
        },
        categories: selectedCategories,
        tags: selectedTags,
        locale: 'en',
        translations: {},
        seo: {
          title: title.substring(0, 60),
          description: excerpt || content.replaceAll(/<[^>]*>/g, '').substring(0, 160),
          keywords: selectedTags
        },
        readingTime: calculateReadingTime(content)
      };

      const response = await fetch('/api/admin/blog/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });

      if (!response.ok) throw new Error('Failed to save post');
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

  return {
    // State
    saving, title, setTitle, content, setContent, excerpt, setExcerpt,
    selectedCategories, selectedTags, featuredImage, setFeaturedImage,
    status, setStatus, scheduledDate, setScheduledDate,
    showShortcuts, setShowShortcuts, showAIGenerator, setShowAIGenerator,
    categories, tags, loading, autoSaveState,
    // Actions
    handleImageUpload, handlePreview, handleSave, toggleCategory, addTag, removeTag,
    calculateReadingTime, generateSlug
  };
}
