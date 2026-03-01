import { useState, useEffect, useCallback } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Zap, Link as LinkIcon, Search } from 'lucide-react';
import type { SEOScore, SEOSuggestion, InternalLinkSuggestion, KeywordCannibalization } from '@/lib/blog/seo-scorer';
import { toast } from 'sonner';

interface EnhancedSEOPanelProps {
  score: SEOScore;
  slug?: string;
  onApplyFix?: (action: string, data: Record<string, unknown>) => void;
}

export default function EnhancedSEOPanel({ score, slug, onApplyFix }: EnhancedSEOPanelProps) {
  const [internalLinks, setInternalLinks] = useState<InternalLinkSuggestion[]>([]);
  const [cannibalization, setCannibalization] = useState<KeywordCannibalization[]>([]);

  const loadInternalLinkSuggestions = useCallback(async () => {
    if (!slug) return;

    if (!slug) return;
    try {
      const response = await fetch('/api/admin/blog/seo-autofix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'suggest-internal-links', slug })
      });

      if (response.ok) {
        const data = await response.json();
        setInternalLinks(data.result || []);
      }
    } catch {
      // Silently fail - suggestions are optional
    }
  }, [slug]);

  const checkCannibalization = useCallback(async () => {
    if (!slug) return;

    if (!slug) return;
    try {
      const response = await fetch('/api/admin/blog/seo-autofix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'check-cannibalization', slug })
      });

      if (response.ok) {
        const data = await response.json();
        setCannibalization(data.result || []);
      }
    } catch {
      // Silently fail - cannibalization check is optional
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      loadInternalLinkSuggestions();
      checkCannibalization();
    }
  }, [slug, loadInternalLinkSuggestions, checkCannibalization]);

  const handleAutoFix = async (suggestion: SEOSuggestion) => {
    if (!suggestion.autoFixable || !suggestion.autoFixAction) return;

    try {
      toast.info('Applying fix...');

      if (onApplyFix) {
        onApplyFix(suggestion.autoFixAction, {});
      }

      toast.success('Fix applied successfully!');
    } catch {
      toast.error('Failed to apply fix');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 text-green-400';
    if (score >= 60) return 'text-yellow-600 text-yellow-400';
    return 'text-red-600 text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 bg-green-900/20';
    if (score >= 60) return 'bg-yellow-100 bg-yellow-900/20';
    return 'bg-red-100 bg-red-900/20';
  };

  const getPriorityIcon = (priority: SEOSuggestion['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-600 text-red-400" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4 text-yellow-600 text-yellow-400" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-blue-600 text-blue-400" />;
    }
  };

  // Sort suggestions by priority
  const sortedSuggestions = [...score.suggestions].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className={`rounded-lg p-6 ${getScoreBgColor(score.overall)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold text-gray-900 text-gray-100">SEO Score</h3>
            <p className="text-sm text-gray-600 text-gray-400 mt-1">
              {score.overall >= 80 ? 'Excellent!' : score.overall >= 60 ? 'Good, but can improve' : 'Needs improvement'}
            </p>
          </div>
          <div className={`text-5xl font-bold ${getScoreColor(score.overall)}`}>
            {score.overall}
          </div>
        </div>
      </div>

      {/* Breakdown by Category */}
      <div className="bg-white bg-gray-800 rounded-lg border border-gray-200 border-gray-700 p-6">
        <h4 className="text-sm font-semibold text-gray-900 text-gray-100 mb-4">Score Breakdown</h4>
        <div className="space-y-3">
          {Object.entries(score.breakdown).map(([category, value]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-sm text-gray-700 text-gray-300 capitalize">{category}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${value >= 80 ? 'bg-green-600' : value >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
                <span className={`text-sm font-medium w-12 text-right ${getScoreColor(value)}`}>
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions with Auto-Fix */}
      <div className="bg-white bg-gray-800 rounded-lg border border-gray-200 border-gray-700 p-6">
        <h4 className="text-sm font-semibold text-gray-900 text-gray-100 mb-4">
          Recommendations ({sortedSuggestions.length})
        </h4>
        <div className="space-y-3">
          {sortedSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 bg-gray-50 bg-gray-900 rounded-lg"
            >
              <div className="mt-0.5">{getPriorityIcon(suggestion.priority)}</div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 text-gray-100">{suggestion.message}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${suggestion.priority === 'high'
                    ? 'bg-red-100 bg-red-900/20 text-red-700 text-red-300'
                    : suggestion.priority === 'medium'
                      ? 'bg-yellow-100 bg-yellow-900/20 text-yellow-700 text-yellow-300'
                      : 'bg-blue-100 bg-blue-900/20 text-blue-700 text-blue-300'
                    }`}>
                    {suggestion.priority}
                  </span>
                  <span className="text-xs text-gray-500 text-gray-400 capitalize">
                    {suggestion.category}
                  </span>
                </div>
              </div>
              {suggestion.autoFixable && (
                <button
                  onClick={() => handleAutoFix(suggestion)}
                  className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-purple-600 text-purple-400 hover:bg-purple-50 hover:bg-purple-900/20 rounded-lg transition-colors"
                >
                  <Zap className="w-3 h-3" />
                  <span>Fix</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Internal Link Suggestions */}
      {internalLinks.length > 0 && (
        <div className="bg-white bg-gray-800 rounded-lg border border-gray-200 border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <LinkIcon className="w-4 h-4 text-gray-600 text-gray-400" />
            <h4 className="text-sm font-semibold text-gray-900 text-gray-100">
              Internal Link Suggestions ({internalLinks.length})
            </h4>
          </div>
          <div className="space-y-3">
            {internalLinks.map((link, index) => (
              <div key={index} className="p-3 bg-gray-50 bg-gray-900 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 text-gray-100">
                      Link to: {link.suggestedPost.title}
                    </p>
                    <p className="text-xs text-gray-600 text-gray-400 mt-1">
                      Anchor text: <span className="font-medium">{link.anchor}</span>
                    </p>
                    <p className="text-xs text-gray-500 text-gray-500 mt-1 italic">
                      {link.context}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 text-gray-400">
                    {Math.round(link.suggestedPost.relevanceScore * 100)}% match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keyword Cannibalization Warning */}
      {cannibalization.length > 0 && (
        <div className="bg-red-50 bg-red-900/20 border border-red-200 border-red-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-4 h-4 text-red-600 text-red-400" />
            <h4 className="text-sm font-semibold text-red-900 text-red-100">
              Keyword Cannibalization Detected
            </h4>
          </div>
          <div className="space-y-3">
            {cannibalization.map((item, index) => (
              <div key={index} className="p-3 bg-white bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-900 text-gray-100 mb-2">
                  Keyword: <span className="text-red-600 text-red-400">{item.keyword}</span>
                </p>
                <p className="text-xs text-gray-600 text-gray-400 mb-2">
                  Competing with {item.competingPosts.length} other post(s):
                </p>
                <ul className="space-y-1">
                  {item.competingPosts.map((post, idx) => (
                    <li key={idx} className="text-xs text-gray-700 text-gray-300">
                      • {post.title} (score: {post.score})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
