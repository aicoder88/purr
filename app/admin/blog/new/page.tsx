"use client";

import dynamic from 'next/dynamic';
import AdminLayout from '@/components/admin/AdminLayout';
import HelpBanner from '@/components/admin/HelpBanner';
import { SEOScorer } from '@/lib/blog/seo-scorer';
import type { BlogPost } from '@/types/blog';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

// Custom hook
import { useBlogPost } from './hooks/useBlogPost';

// Local components
import { PostHeader } from './components/PostHeader';
import { PostEditor } from './components/PostEditor';
import { PostSidebar } from './components/PostSidebar';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { LoadingState } from './components/LoadingState';

// Dynamic imports
const AIContentGenerator = dynamic(() => import('@/components/admin/AIContentGenerator'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-purple-500 dark:border-purple-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-500 dark:text-gray-400">Loading AI assistant...</span>
      </div>
    </div>
  ),
});

export default function NewPostPage() {
  const {
    saving, title, setTitle, content, setContent, excerpt, setExcerpt,
    selectedCategories, selectedTags, featuredImage, setFeaturedImage,
    status, setStatus, scheduledDate, setScheduledDate,
    showShortcuts, setShowShortcuts, showAIGenerator, setShowAIGenerator,
    categories, tags, loading, autoSaveState,
    handleImageUpload, handlePreview, handleSave, toggleCategory, addTag, removeTag,
    calculateReadingTime
  } = useBlogPost();

  // Keyboard shortcuts
  useKeyboardShortcuts([
    { key: 's', ctrl: true, action: () => handleSave(false), description: 'Save draft' },
    { key: 's', ctrl: true, shift: true, action: () => handleSave(true), description: 'Save and publish' },
    { key: 'p', ctrl: true, action: handlePreview, description: 'Preview post' },
    { key: '?', shift: true, action: () => setShowShortcuts(true), description: 'Show keyboard shortcuts' },
    { key: 'Escape', action: () => setShowShortcuts(false), description: 'Close dialogs' }
  ]);

  // Calculate SEO score
  const mockPost: Partial<BlogPost> = {
    title, content, excerpt,
    seo: { title, description: excerpt, keywords: selectedTags },
    categories: selectedCategories, tags: selectedTags,
    featuredImage: { url: featuredImage, alt: title, width: 1200, height: 630 }
  };
  const scorer = new SEOScorer();
  const seoScore = title && content ? scorer.calculateScore(mockPost as BlogPost) : null;

  if (loading) return <LoadingState />;

  return (
    <AdminLayout>
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

      <PostHeader
        autoSaveState={autoSaveState}
        saving={saving}
        title={title}
        onSave={handleSave}
        onPreview={handlePreview}
        onShowAIGenerator={() => setShowAIGenerator(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PostEditor
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          excerpt={excerpt}
          setExcerpt={setExcerpt}
          calculateReadingTime={calculateReadingTime}
          handleImageUpload={handleImageUpload}
        />

        <PostSidebar
          status={status}
          setStatus={setStatus}
          scheduledDate={scheduledDate}
          setScheduledDate={setScheduledDate}
          seoScore={seoScore}
          categories={categories}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          tags={tags}
          selectedTags={selectedTags}
          addTag={addTag}
          removeTag={removeTag}
          featuredImage={featuredImage}
          setFeaturedImage={setFeaturedImage}
          handleImageUpload={handleImageUpload}
        />
      </div>

      {showAIGenerator && (
        <AIContentGenerator
          onGenerate={(generated) => {
            setTitle(generated.title);
            setContent(generated.content);
            setExcerpt(generated.excerpt);
          }}
          onClose={() => setShowAIGenerator(false)}
        />
      )}

      {showShortcuts && <KeyboardShortcutsModal onClose={() => setShowShortcuts(false)} />}
    </AdminLayout>
  );
}
