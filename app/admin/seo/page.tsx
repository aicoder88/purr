/**
 * SEO Health Dashboard
 *
 * Admin page for monitoring SEO metrics and getting link suggestions.
 * Uses the SEO APIs to display statistics and recommendations.
 */

"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Search,
  Link2,
  FileText,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Loader2,
  RefreshCw,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SEOStats {
  pages: {
    total: number;
    withEnhancedSEO: number;
    coverage: string;
  };
  clusters: {
    total: number;
    clusters: Array<{
      name: string;
      hubPage: string;
      spokes: number;
      keywords: number;
    }>;
  };
  links: {
    suggestionsTotal: number;
    highPriority: number;
    mediumPriority: number;
    lowPriority: number;
  };
  schema: {
    productPages: number;
    blogPages: number;
    learnPages: number;
    faqEnabled: boolean;
    breadcrumbsEnabled: boolean;
    aggregateRatingEnabled: boolean;
  };
  meta: {
    averageTitleLength: number;
    averageDescriptionLength: number;
    pagesWithTargetKeyword: number;
  };
}

interface LinkSuggestion {
  fromPage: string;
  toPage: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  anchorText?: string;
  context?: string;
}

export default function SEODashboard() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [stats, setStats] = useState<SEOStats | null>(null);
  const [suggestions, setSuggestions] = useState<LinkSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>('high');

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

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, suggestionsRes] = await Promise.all([
        fetch('/api/seo/stats'),
        fetch(`/api/seo/link-suggestions?priority=${selectedPriority === 'all' ? '' : selectedPriority}&limit=20`),
      ]);

      if (statsRes.ok) {
        const statsJson = await statsRes.json();
        if (statsJson.success) setStats(statsJson.data);
      }

      if (suggestionsRes.ok) {
        const suggestionsJson = await suggestionsRes.json();
        if (suggestionsJson.success) setSuggestions(suggestionsJson.data.suggestions);
      }
    } catch (err) {
      console.error('Failed to fetch SEO data:', err);
    }
    setLoading(false);
    setRefreshing(false);
  }, [selectedPriority]);

  useEffect(() => {
    if (isAuthorized) {
      fetchData();
    }
  }, [isAuthorized, fetchData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
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
      <Container className="py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You must be logged in as an admin to view this page.
          </p>
          <Link href="/admin/login">
            <Button>Login</Button>
          </Link>
        </div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-16">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 dark:text-blue-400" />
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading SEO data...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            SEO Health Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor SEO metrics and link optimization opportunities
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          disabled={refreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Page Coverage */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Enhanced SEO Coverage
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                  {stats.pages.coverage}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stats.pages.withEnhancedSEO} / {stats.pages.total} pages
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>

          {/* Link Suggestions */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Link Suggestions
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                  {stats.links.suggestionsTotal}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stats.links.highPriority} high priority
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Link2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          {/* Topic Clusters */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Topic Clusters
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                  {stats.clusters.total}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Hub + spoke structure
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>

          {/* Schema Status */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Rich Results Ready
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                  {stats.schema.productPages}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Products with star ratings
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Schema Features */}
      {stats && (
        <Card className="p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Schema Features Status
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              {stats.schema.aggregateRatingEnabled ? (
                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              )}
              <span className="text-gray-700 dark:text-gray-300">Aggregate Ratings</span>
            </div>
            <div className="flex items-center gap-3">
              {stats.schema.breadcrumbsEnabled ? (
                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              )}
              <span className="text-gray-700 dark:text-gray-300">Breadcrumbs</span>
            </div>
            <div className="flex items-center gap-3">
              {stats.schema.faqEnabled ? (
                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
              )}
              <span className="text-gray-700 dark:text-gray-300">FAQ Schema</span>
            </div>
          </div>
        </Card>
      )}

      {/* Link Suggestions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Internal Link Suggestions
          </h2>
          <div className="flex gap-2">
            {(['all', 'high', 'medium', 'low'] as const).map((priority) => (
              <Button
                key={priority}
                variant={selectedPriority === priority ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPriority(priority)}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {suggestions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No link suggestions found for the selected priority.
          </p>
        ) : (
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
              >
                <Badge
                  variant={
                    suggestion.priority === 'high'
                      ? 'destructive'
                      : suggestion.priority === 'medium'
                      ? 'default'
                      : 'secondary'
                  }
                  className="mt-1"
                >
                  {suggestion.priority}
                </Badge>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-sm">
                    <code className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs truncate max-w-[200px]">
                      {suggestion.fromPage}
                    </code>
                    <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    <code className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs truncate max-w-[200px]">
                      {suggestion.toPage}
                    </code>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {suggestion.reason}
                  </p>
                  {suggestion.anchorText && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Suggested anchor: &ldquo;{suggestion.anchorText}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="https://search.google.com/search-console"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
        >
          <Search className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          <span className="text-gray-700 dark:text-gray-300">Google Search Console</span>
          <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 ml-auto" />
        </a>
        <a
          href="https://search.google.com/test/rich-results"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
        >
          <FileText className="w-5 h-5 text-green-500 dark:text-green-400" />
          <span className="text-gray-700 dark:text-gray-300">Rich Results Test</span>
          <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 ml-auto" />
        </a>
        <Link
          href="/admin/blog"
          className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
        >
          <FileText className="w-5 h-5 text-purple-500 dark:text-purple-400" />
          <span className="text-gray-700 dark:text-gray-300">Blog Management</span>
          <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 ml-auto" />
        </Link>
      </div>
    </Container>
  );
}
