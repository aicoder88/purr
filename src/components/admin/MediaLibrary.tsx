import { useState, useEffect } from 'react';
import { Search, X, Trash2, Check, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import LoadingSpinner from './LoadingSpinner';
import type { MediaItem } from '@/lib/blog/media-library';

interface MediaLibraryProps {
  onSelect?: (url: string) => void;
  onClose?: () => void;
  mode?: 'select' | 'manage';
}

export default function MediaLibrary({ 
  onSelect, 
  onClose,
  mode = 'select'
}: MediaLibraryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'used' | 'unused'>('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/blog/media');
      
      if (!response.ok) {
        throw new Error('Failed to load media');
      }

      const data = await response.json();
      setMedia(data);
    } catch (error) {
      console.error('Error loading media:', error);
      toast.error('Failed to load media library');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const item = media.find(m => m.id === id);
    
    if (!item) return;

    if (item.usedIn.length > 0) {
      toast.error(`Cannot delete: used in ${item.usedIn.length} post(s)`);
      return;
    }

    if (!confirm(`Delete ${item.filename}? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/blog/media/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete media');
      }

      setMedia(media.filter(m => m.id !== id));
      toast.success('Image deleted');
    } catch (error) {
      console.error('Error deleting media:', error);
      toast.error('Failed to delete image');
    }
  };

  const handleSelect = (url: string) => {
    if (onSelect) {
      onSelect(url);
      if (onClose) onClose();
    }
  };

  const filteredMedia = media.filter(item => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.alt?.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply usage filter
    const matchesFilter = 
      filterBy === 'all' ||
      (filterBy === 'used' && item.usedIn.length > 0) ||
      (filterBy === 'unused' && item.usedIn.length === 0);

    return matchesSearch && matchesFilter;
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Media Library
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Filter */}
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as 'all' | 'used' | 'unused')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Images</option>
              <option value="used">Used</option>
              <option value="unused">Unused</option>
            </select>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {filteredMedia.length} {filteredMedia.length === 1 ? 'image' : 'images'}
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" text="Loading media library..." />
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <ImageIcon className="w-16 h-16 mb-4" />
              <p className="text-lg">No images found</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className={`group relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedItem === item.id
                      ? 'ring-2 ring-purple-600'
                      : 'hover:ring-2 hover:ring-purple-400'
                  }`}
                  onClick={() => setSelectedItem(item.id)}
                >
                  {/* Image */}
                  <div className="aspect-square relative">
                    <img
                      src={item.url}
                      alt={item.alt || item.filename}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Selected indicator */}
                    {selectedItem === item.id && (
                      <div className="absolute top-2 right-2 bg-purple-600 text-white rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                    )}

                    {/* Usage badge */}
                    {item.usedIn.length > 0 && (
                      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        Used in {item.usedIn.length}
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {mode === 'select' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(item.url);
                          }}
                          className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
                        >
                          Select
                        </button>
                      )}
                      {mode === 'manage' && item.usedIn.length === 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-2">
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate" title={item.filename}>
                      {item.filename}
                    </p>
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500 dark:text-gray-500">
                      <span>{formatFileSize(item.size)}</span>
                      <span>{formatDate(item.uploadDate)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {mode === 'select' && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const item = media.find(m => m.id === selectedItem);
                if (item) handleSelect(item.url);
              }}
              disabled={!selectedItem}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Insert Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
