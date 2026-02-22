"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import type { Tag } from '@/types/blog';
import { ArrowLeft, Plus, Edit2, Trash2, Save, X, Tag as TagIcon } from 'lucide-react';
import { toast } from 'sonner';

async function fetchTags() {
  const response = await fetch('/api/admin/blog/tags');
  if (!response.ok) throw new Error('Failed to fetch tags');
  return response.json();
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Tag>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newTag, setNewTag] = useState<Partial<Tag>>({
    name: '',
    slug: '',
  });

  // Load tags on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTags();
        setTags(data);
      } catch (error) {
        console.error('Failed to load tags:', error);
        toast.error('Failed to load tags');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleEdit = (tag: Tag) => {
    setEditingId(tag.id);
    setEditForm(tag);
    setIsAdding(false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editForm.name || !editForm.slug) {
      toast.error('Name and slug are required');
      return;
    }

    try {
      const response = await fetch('/api/admin/blog/tags', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) throw new Error('Failed to update tag');

      const updatedTags = tags.map(tag =>
        tag.id === editingId ? { ...tag, ...editForm } : tag
      );
      setTags(updatedTags);
      setEditingId(null);
      setEditForm({});
      toast.success('Tag updated');
    } catch {
      toast.error('Failed to update tag');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This will not delete posts, but they will lose this tag.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/blog/tags/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete tag');

      setTags(tags.filter(tag => tag.id !== id));
      toast.success('Tag deleted');
    } catch {
      toast.error('Failed to delete tag');
    }
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setNewTag({ name: '', slug: '' });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewTag({ name: '', slug: '' });
  };

  const handleSaveNew = async () => {
    if (!newTag.name || !newTag.slug) {
      toast.error('Name and slug are required');
      return;
    }

    try {
      const tagToCreate = {
        id: newTag.slug,
        name: newTag.name,
        slug: newTag.slug,
        translations: {
          en: newTag.name,
        },
      };

      const response = await fetch('/api/admin/blog/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tagToCreate),
      });

      if (!response.ok) throw new Error('Failed to create tag');

      setTags([...tags, tagToCreate]);
      setIsAdding(false);
      setNewTag({ name: '', slug: '' });
      toast.success('Tag created');
    } catch {
      toast.error('Failed to create tag');
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, '-')
      .replaceAll(/^-+|-+$/g, '');
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 dark:border-purple-400"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/admin/blog/"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Posts</span>
          </Link>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">Tags</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{tags.length} tags</p>
        </div>
        <button
          onClick={handleAddNew}
          disabled={isAdding}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white dark:text-gray-100 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
          <span>New Tag</span>
        </button>
      </div>

      {/* Add New Form */}
      {isAdding && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">New Tag</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={newTag.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setNewTag({
                    ...newTag,
                    name,
                    slug: generateSlug(name),
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                placeholder="Tag name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={newTag.slug}
                onChange={(e) => setNewTag({ ...newTag, slug: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                placeholder="tag-slug"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleSaveNew}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white dark:text-gray-100 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancelAdd}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      {/* Tags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            {editingId === tag.id ? (
              // Edit Mode
              <div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={editForm.slug}
                    onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-purple-600 text-white dark:text-gray-100 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <TagIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="font-heading font-semibold text-gray-900 dark:text-gray-100">
                      {tag.name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleEdit(tag)}
                      className="p-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(tag.id)}
                      className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{tag.slug}</code>
                </p>
              </div>
            )}
          </div>
        ))}

        {tags.length === 0 && !isAdding && (
          <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">No tags yet</p>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              <Plus className="w-5 h-5" />
              <span>Create your first tag</span>
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
