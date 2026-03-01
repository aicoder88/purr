'use client';

import Link from 'next/link';
import { ArrowLeft, Save, Eye, Sparkles } from 'lucide-react';
import AutoSaveIndicator from '@/components/admin/AutoSaveIndicator';
import type { AutoSaveState } from '@/components/admin/AutoSaveIndicator';

interface PostHeaderProps {
  autoSaveState: AutoSaveState;
  saving: boolean;
  title: string;
  onSave: (publishNow: boolean) => void;
  onPreview: () => void;
  onShowAIGenerator: () => void;
}

export function PostHeader({
  autoSaveState,
  saving,
  title,
  onSave,
  onPreview,
  onShowAIGenerator,
}: PostHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <Link
        href="/admin/blog/"
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Posts</span>
      </Link>
      <div className="flex items-center space-x-3">
        {/* Enhanced auto-save indicator */}
        <AutoSaveIndicator state={autoSaveState} />
        <button
          onClick={onShowAIGenerator}
          className="flex items-center space-x-2 px-4 py-2 border border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          <span>AI Generate</span>
        </button>
        <button
          onClick={onPreview}
          disabled={!title.trim()}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <Eye className="w-5 h-5" />
          <span>Preview</span>
        </button>
        <button
          onClick={() => onSave(false)}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>Save Draft</span>
        </button>
        <button
          onClick={() => onSave(true)}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white dark:text-gray-100 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          <span>Publish</span>
        </button>
      </div>
    </div>
  );
}
