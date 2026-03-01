'use client';

import Image from 'next/image';
import type { Category, Tag } from '@/types/blog';
// SEO Score type
type SEOScore = {
  overall: number;
  suggestions: Array<{ message: string }>;
};
import { toast } from 'sonner';

interface PostSidebarProps {
  status: 'draft' | 'published' | 'scheduled';
  setStatus: (status: 'draft' | 'published' | 'scheduled') => void;
  scheduledDate: string;
  setScheduledDate: (date: string) => void;
  seoScore: SEOScore | null;
  categories: Category[];
  selectedCategories: string[];
  toggleCategory: (categoryId: string) => void;
  tags: Tag[];
  selectedTags: string[];
  addTag: (tagId: string) => void;
  removeTag: (tagId: string) => void;
  featuredImage: string;
  setFeaturedImage: (url: string) => void;
  handleImageUpload: (file: File) => Promise<string>;
}

export function PostSidebar({
  status,
  setStatus,
  scheduledDate,
  setScheduledDate,
  seoScore,
  categories,
  selectedCategories,
  toggleCategory,
  tags,
  selectedTags,
  addTag,
  removeTag,
  featuredImage,
  setFeaturedImage,
  handleImageUpload,
}: PostSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Post Settings */}
      <div className="bg-white bg-gray-800 rounded-lg shadow-sm border border-gray-200 border-gray-700 p-4">
        <h3 className="font-heading font-semibold text-gray-900 text-gray-100 mb-3">Post Settings</h3>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'draft' | 'published' | 'scheduled')}
            className="w-full px-3 py-2 border border-gray-300 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white bg-gray-900 text-gray-900 text-gray-100"
          >
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Scheduled Date */}
        {status === 'scheduled' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-2">
              Publish Date & Time
            </label>
            <input
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              className="w-full px-3 py-2 border border-gray-300 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white bg-gray-900 text-gray-900 text-gray-100"
            />
            {scheduledDate && (
              <p className="mt-1 text-xs text-gray-500 text-gray-400">
                Will publish on {new Date(scheduledDate).toLocaleString()}
              </p>
            )}
          </div>
        )}
      </div>

      {/* SEO Score */}
      {seoScore && (
        <div className="bg-white bg-gray-800 rounded-lg shadow-sm border border-gray-200 border-gray-700 p-4">
          <h3 className="font-heading font-semibold text-gray-900 text-gray-100 mb-3">SEO Score</h3>
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex-1 bg-gray-200 bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${seoScore.overall >= 80
                  ? 'bg-green-500'
                  : seoScore.overall >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                  }`}
                style={{ width: `${seoScore.overall}%` }}
              />
            </div>
            <span className="text-2xl font-bold text-gray-900 text-gray-100">
              {seoScore.overall}
            </span>
          </div>
          {seoScore.suggestions.length > 0 && (
            <div className="text-sm text-gray-600 text-gray-400 space-y-1">
              {seoScore.suggestions.slice(0, 3).map((suggestion, i) => (
                <p key={i}>• {suggestion.message}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Categories */}
      <div className="bg-white bg-gray-800 rounded-lg shadow-sm border border-gray-200 border-gray-700 p-4">
        <h3 className="font-heading font-semibold text-gray-900 text-gray-100 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                className="rounded border-gray-300 border-gray-600 text-purple-600 text-purple-400 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700 text-gray-300">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white bg-gray-800 rounded-lg shadow-sm border border-gray-200 border-gray-700 p-4">
        <h3 className="font-heading font-semibold text-gray-900 text-gray-100 mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedTags.map((tagId) => {
            const tag = tags.find(t => t.id === tagId);
            return tag ? (
              <span
                key={tagId}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-100 bg-purple-900/30 text-purple-700 text-purple-300 rounded text-sm"
              >
                <span>{tag.name}</span>
                <button
                  onClick={() => removeTag(tagId)}
                  className="text-purple-700 text-purple-300 hover:text-purple-900 hover:text-purple-100"
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
          className="w-full px-3 py-2 border border-gray-300 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white bg-gray-900 text-gray-900 text-gray-100"
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
      <div className="bg-white bg-gray-800 rounded-lg shadow-sm border border-gray-200 border-gray-700 p-4">
        <h3 className="font-heading font-semibold text-gray-900 text-gray-100 mb-3">Featured Image</h3>
        {featuredImage ? (
          <div className="relative h-32">
            <Image
              src={featuredImage}
              alt="Featured"
              fill
              className="object-cover rounded"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <button
              onClick={() => setFeaturedImage('')}
              className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-gray-100 text-xs rounded hover:bg-red-700 z-10"
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
                    const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
                    toast.error(errorMessage);
                  }
                }
              };
              input.click();
            }}
            className="w-full px-4 py-8 border-2 border-dashed border-gray-300 border-gray-700 rounded-lg hover:border-purple-500 transition-colors text-gray-600 text-gray-400 hover:text-purple-600 hover:text-purple-400"
          >
            Click to upload
          </button>
        )}
      </div>
    </div>
  );
}
