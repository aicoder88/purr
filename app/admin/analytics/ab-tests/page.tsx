/**
 * A/B Tests Management Page
 */

"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Target,
  Play,
  Pause,
  CheckCircle,
  Plus,
  Trash2,
  ArrowLeft,
  Loader2,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ABTest {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  status: 'DRAFT' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';
  targetPage: string;
  trafficSplit: number;
  controlName: string;
  variantName: string;
  controlViews: number;
  variantViews: number;
  controlConversions: number;
  variantConversions: number;
  startedAt: string | null;
  endedAt: string | null;
  createdAt: string;
  stats: {
    controlRate: number;
    variantRate: number;
    improvement: number;
    confidence: number;
    winner: 'control' | 'variant' | 'none';
  };
}

export default function ABTestsPage() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [tests, setTests] = useState<ABTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewForm, setShowNewForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    targetPage: '',
    trafficSplit: 50,
  });

  // Check admin auth
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const cookies = document.cookie.split(';');
        const adminCookie = cookies.find(c => c.trim().startsWith('admin-auth='));
        const hasAuth = !!adminCookie || process.env.NODE_ENV === 'development';
        setIsAuthorized(hasAuth);
      } catch {
        setIsAuthorized(false);
      }
    };
    checkAuth();
  }, []);

  const fetchTests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/ab-tests');
      const json = await res.json();
      if (json.success) {
        setTests(json.data);
      }
    } catch (error) {
      console.error('Failed to fetch tests:', error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      fetchTests();
    }
  }, [isAuthorized, fetchTests]);

  const controlTest = async (slug: string, action: string) => {
    try {
      const res = await fetch(`/api/admin/ab-tests/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        fetchTests();
      }
    } catch (error) {
      console.error('Failed to control test:', error);
    }
  };

  const createTest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/ab-tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowNewForm(false);
        setFormData({
          name: '',
          slug: '',
          description: '',
          targetPage: '',
          trafficSplit: 50,
        });
        fetchTests();
      }
    } catch (error) {
      console.error('Failed to create test:', error);
    }
  };

  if (isAuthorized === null) {
    return (
      <Container className="py-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400 dark:text-gray-500" />
      </Container>
    );
  }

  if (!isAuthorized) {
    return (
      <Container className="py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Access Denied
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Admin access required.
        </p>
      </Container>
    );
  }

  const statusColors: Record<string, string> = {
    DRAFT: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    RUNNING: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    PAUSED: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    COMPLETED: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    ARCHIVED: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
  };

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/analytics">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              A/B Tests
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create and manage experiments
            </p>
          </div>
        </div>
        <Button onClick={() => setShowNewForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Test
        </Button>
      </div>

      {/* New Test Form */}
      {showNewForm && (
        <Card className="p-6 mb-8 bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Create New A/B Test
          </h2>
          <form onSubmit={createTest} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Test Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  placeholder="Hero CTA Color Test"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  placeholder="hero-cta-color"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target Page
                </label>
                <input
                  type="text"
                  required
                  value={formData.targetPage}
                  onChange={(e) =>
                    setFormData({ ...formData, targetPage: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  placeholder="/try-free"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Traffic Split (% to Variant)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.trafficSplit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      trafficSplit: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  rows={2}
                  placeholder="Testing green vs orange CTA button..."
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Create Test</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tests List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400 dark:text-gray-500" />
        </div>
      ) : tests.length === 0 ? (
        <Card className="p-12 text-center bg-white dark:bg-gray-800">
          <Target className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No A/B tests yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first experiment to start optimizing.
          </p>
          <Button onClick={() => setShowNewForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Test
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {tests.map((test) => (
            <Card key={test.id} className="p-6 bg-white dark:bg-gray-800">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Test Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {test.name}
                    </h3>
                    <Badge className={statusColors[test.status]}>
                      {test.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {test.description || 'No description'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Page: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{test.targetPage}</code>
                    {' • '}
                    Split: {test.trafficSplit}% variant
                  </p>
                </div>

                {/* Stats */}
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {test.controlName}
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {test.stats.controlRate}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {test.controlConversions}/{test.controlViews}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {test.variantName}
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {test.stats.variantRate}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {test.variantConversions}/{test.variantViews}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Lift
                    </p>
                    <p
                      className={`text-lg font-bold flex items-center justify-center ${
                        test.stats.improvement > 0
                          ? 'text-green-600 dark:text-green-400'
                          : test.stats.improvement < 0
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {test.stats.improvement > 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : test.stats.improvement < 0 ? (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      ) : null}
                      {test.stats.improvement > 0 ? '+' : ''}
                      {test.stats.improvement}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {test.stats.confidence}% conf
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {test.status === 'DRAFT' && (
                    <Button
                      size="sm"
                      onClick={() => controlTest(test.slug, 'start')}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                  {test.status === 'RUNNING' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => controlTest(test.slug, 'pause')}
                    >
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  )}
                  {test.status === 'PAUSED' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => controlTest(test.slug, 'start')}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Resume
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => controlTest(test.slug, 'complete')}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Complete
                      </Button>
                    </>
                  )}
                  {(test.status === 'COMPLETED' ||
                    test.status === 'PAUSED' ||
                    test.status === 'DRAFT') && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      onClick={() => {
                        if (confirm('Archive this test?')) {
                          fetch(`/api/admin/ab-tests/${test.slug}`, {
                            method: 'DELETE',
                          }).then(() => fetchTests());
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Winner indicator */}
              {test.stats.winner !== 'none' && test.stats.confidence >= 90 && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">
                      Winner: {test.stats.winner === 'control' ? test.controlName : test.variantName}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({test.stats.confidence}% confidence)
                    </span>
                  </div>
                </div>
              )}

              {test.stats.confidence > 0 && test.stats.confidence < 90 && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">
                      Need more data for statistical significance (currently {test.stats.confidence}%)
                    </span>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
