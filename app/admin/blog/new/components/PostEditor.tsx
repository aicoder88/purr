'use client';

import dynamic from 'next/dynamic';
import { sanitizeText } from '@/lib/security/sanitize';

// Dynamic import for RichTextEditor to reduce initial bundle size
const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-purple-500 dark:border-purple-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-500 dark:text-gray-400">Loading editor...</span>
      </div>
    </div>
  ),
});

interface PostEditorProps {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  excerpt: string;
  setExcerpt: (excerpt: string) => void;
  calculateReadingTime: (text: string) => number;
  handleImageUpload: (file: File) => Promise<string>;
}

export function PostEditor({
  title,
  setTitle,
  content,
  setContent,
  excerpt,
  setExcerpt,
  calculateReadingTime,
  handleImageUpload,
}: PostEditorProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Title */}
      <div>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(sanitizeText(e.target.value))}
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
          name="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(sanitizeText(e.target.value))}
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
  );
}
