import { useState } from 'react';
import { Trash2, FileText, Calendar, Tag, Folder, X } from 'lucide-react';
import { toast } from 'sonner';

export type BulkOperation =
  | { type: 'delete' }
  | { type: 'changeStatus'; status: 'published' | 'draft' | 'scheduled' }
  | { type: 'assignCategories'; categories: string[] }
  | { type: 'assignTags'; tags: string[] };

interface BulkActionsToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onExecute: (operation: BulkOperation) => Promise<void>;
  categories?: Array<{ id: string; name: string }>;
  tags?: Array<{ id: string; name: string }>;
}

export default function BulkActionsToolbar({
  selectedCount,
  onClearSelection,
  onExecute,
  categories = [],
  tags = []
}: BulkActionsToolbarProps) {
  const [executing, setExecuting] = useState(false);
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [showTagSelect, setShowTagSelect] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleExecute = async (operation: BulkOperation) => {
    setExecuting(true);
    try {
      await onExecute(operation);
      onClearSelection();
    } catch (error) {
      console.error('Bulk operation failed:', error);
    } finally {
      setExecuting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete ${selectedCount} post(s)? This action cannot be undone.`)) {
      return;
    }
    await handleExecute({ type: 'delete' });
  };

  const handleChangeStatus = async (status: 'published' | 'draft' | 'scheduled') => {
    await handleExecute({ type: 'changeStatus', status });
  };

  const handleAssignCategories = async () => {
    if (selectedCategories.length === 0) {
      toast.error('Please select at least one category');
      return;
    }
    await handleExecute({ type: 'assignCategories', categories: selectedCategories });
    setShowCategorySelect(false);
    setSelectedCategories([]);
  };

  const handleAssignTags = async () => {
    if (selectedTags.length === 0) {
      toast.error('Please select at least one tag');
      return;
    }
    await handleExecute({ type: 'assignTags', tags: selectedTags });
    setShowTagSelect(false);
    setSelectedTags([]);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50">
      <div className="flex items-center space-x-4">
        {/* Selection count */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {selectedCount} selected
          </span>
          <button
            onClick={onClearSelection}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Clear selection"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Change Status */}
          <div className="relative">
            <button
              onClick={() => setShowCategorySelect(false)}
              className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              disabled={executing}
            >
              <FileText className="w-4 h-4" />
              <span>Status</span>
            </button>
            <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[150px] hidden group-hover:block">
              <button
                onClick={() => handleChangeStatus('published')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Publish
              </button>
              <button
                onClick={() => handleChangeStatus('draft')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Draft
              </button>
            </div>
          </div>

          {/* Assign Categories */}
          {categories.length > 0 && (
            <button
              onClick={() => {
                setShowCategorySelect(!showCategorySelect);
                setShowTagSelect(false);
              }}
              className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              disabled={executing}
            >
              <Folder className="w-4 h-4" />
              <span>Categories</span>
            </button>
          )}

          {/* Assign Tags */}
          {tags.length > 0 && (
            <button
              onClick={() => {
                setShowTagSelect(!showTagSelect);
                setShowCategorySelect(false);
              }}
              className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              disabled={executing}
            >
              <Tag className="w-4 h-4" />
              <span>Tags</span>
            </button>
          )}

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={executing}
            className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Category Selection Popup */}
      {showCategorySelect && (
        <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium mb-2">Select Categories</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, category.id]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                    }
                  }}
                  className="rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm">{category.name}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end space-x-2 mt-3">
            <button
              onClick={() => {
                setShowCategorySelect(false);
                setSelectedCategories([]);
              }}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleAssignCategories}
              className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Tag Selection Popup */}
      {showTagSelect && (
        <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium mb-2">Select Tags</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {tags.map((tag) => (
              <label key={tag.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTags([...selectedTags, tag.id]);
                    } else {
                      setSelectedTags(selectedTags.filter(id => id !== tag.id));
                    }
                  }}
                  className="rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm">{tag.name}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end space-x-2 mt-3">
            <button
              onClick={() => {
                setShowTagSelect(false);
                setSelectedTags([]);
              }}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleAssignTags}
              className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
