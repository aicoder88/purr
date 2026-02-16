/**
 * Link Suggestion Panel
 * Admin component for reviewing and managing internal link suggestions
 */

import React, { useState, useEffect } from 'react';
import {
  LinkGraphAnalyzer,
  LinkSuggestionEngine,
  buildGraphFromHTML,
} from '@/lib/seo/link-graph-analyzer';
import { LinkSuggestion } from '@/lib/seo/types';

interface LinkSuggestionPanelProps {
  /**
   * Array of pages with HTML content
   */
  pages?: Array<{ path: string; html: string }>;

  /**
   * Current page path (optional - if provided, shows suggestions for this page only)
   */
  currentPage?: string;

  /**
   * Domain for internal link detection
   */
  domain?: string;

  /**
   * Callback when a suggestion is accepted
   */
  onAcceptSuggestion?: (suggestion: LinkSuggestion, sourcePath: string) => void;

  /**
   * Callback when a suggestion is rejected
   */
  onRejectSuggestion?: (suggestion: LinkSuggestion, sourcePath: string) => void;
}

type TabType = 'suggestions' | 'issues' | 'stats';

export function LinkSuggestionPanel({
  pages = [],
  currentPage,
  domain = 'purrify.ca',
  onAcceptSuggestion,
  onRejectSuggestion,
}: LinkSuggestionPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('suggestions');
  const [analyzer, setAnalyzer] = useState<LinkGraphAnalyzer | null>(null);
  const [suggestions, setSuggestions] = useState<Map<string, LinkSuggestion[]>>(
    new Map()
  );
  const [pagesNeedingLinks, setPagesNeedingLinks] = useState<
    Array<{
      page: string;
      issue: 'orphan' | 'weak' | 'low-authority';
      currentLinks: number;
      authorityScore: number;
      suggestedSources: string[];
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  // Build graph and generate suggestions
  useEffect(() => {
    if (pages.length === 0) {
      setLoading(false);
      return;
    }

    try {
      // Build link graph
      const graphAnalyzer = buildGraphFromHTML(pages, domain);
      setAnalyzer(graphAnalyzer);

      // Create suggestion engine
      const graph = graphAnalyzer.getAllNodes();
      const suggestionEngine = new LinkSuggestionEngine(graph);

      // Generate full report
      const report = suggestionEngine.getFullReport();
      setSuggestions(report.suggestions);
      setPagesNeedingLinks(report.pagesNeedingLinks);

      setLoading(false);
    } catch (error) {
      console.error('Failed to build link graph:', error);
      setLoading(false);
    }
  }, [pages, domain]);

  const handleAccept = (suggestion: LinkSuggestion, sourcePath: string) => {
    if (onAcceptSuggestion) {
      onAcceptSuggestion(suggestion, sourcePath);
    }

    // Remove from suggestions
    setSuggestions((prev) => {
      const updated = new Map(prev);
      const pageSuggestions = updated.get(sourcePath) || [];
      updated.set(
        sourcePath,
        pageSuggestions.filter((s) => s.targetPage !== suggestion.targetPage)
      );
      if (updated.get(sourcePath)?.length === 0) {
        updated.delete(sourcePath);
      }
      return updated;
    });
  };

  const handleReject = (suggestion: LinkSuggestion, sourcePath: string) => {
    if (onRejectSuggestion) {
      onRejectSuggestion(suggestion, sourcePath);
    }

    // Remove from suggestions
    setSuggestions((prev) => {
      const updated = new Map(prev);
      const pageSuggestions = updated.get(sourcePath) || [];
      updated.set(
        sourcePath,
        pageSuggestions.filter((s) => s.targetPage !== suggestion.targetPage)
      );
      if (updated.get(sourcePath)?.length === 0) {
        updated.delete(sourcePath);
      }
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
        <p className="text-gray-600 dark:text-gray-400">
          No pages provided for link analysis.
        </p>
      </div>
    );
  }

  const stats = analyzer?.getStats();
  const filteredSuggestions = currentPage
    ? new Map([[currentPage, suggestions.get(currentPage) || []]])
    : suggestions;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Internal Link Suggestions
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          AI-powered recommendations to improve your internal linking structure
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'suggestions'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
          >
            Suggestions ({filteredSuggestions.size})
          </button>
          <button
            onClick={() => setActiveTab('issues')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'issues'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
          >
            Issues ({pagesNeedingLinks.length})
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'stats'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
          >
            Statistics
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'suggestions' && (
          <SuggestionsTab
            suggestions={filteredSuggestions}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )}

        {activeTab === 'issues' && (
          <IssuesTab pagesNeedingLinks={pagesNeedingLinks} />
        )}

        {activeTab === 'stats' && <StatsTab stats={stats} />}
      </div>
    </div>
  );
}

// Suggestions Tab Component
function SuggestionsTab({
  suggestions,
  onAccept,
  onReject,
}: {
  suggestions: Map<string, LinkSuggestion[]>;
  onAccept: (suggestion: LinkSuggestion, sourcePath: string) => void;
  onReject: (suggestion: LinkSuggestion, sourcePath: string) => void;
}) {
  if (suggestions.size === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          No link suggestions available. Your internal linking structure looks
          good!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Array.from(suggestions.entries()).map(([sourcePath, pageSuggestions]) => (
        <div
          key={sourcePath}
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
        >
          <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-3">
            {sourcePath}
          </h3>

          <div className="space-y-3">
            {pageSuggestions.map((suggestion) => (
              <div
                key={suggestion.targetPage}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${suggestion.priority === 'high'
                          ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          : suggestion.priority === 'medium'
                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                          }`}
                      >
                        {suggestion.priority}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                        Score: {suggestion.relevanceScore}
                      </span>
                    </div>

                    <div className="mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Link to:{' '}
                      </span>
                      <code className="text-sm font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded text-blue-600 dark:text-blue-400">
                        {suggestion.targetPage}
                      </code>
                    </div>

                    <div className="mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Anchor text:{' '}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                        "{suggestion.anchorText}"
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {suggestion.reason}
                    </p>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => onAccept(suggestion, sourcePath)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white dark:text-gray-50 rounded text-sm font-medium focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => onReject(suggestion, sourcePath)}
                      className="px-3 py-1 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-sm font-medium focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Issues Tab Component
function IssuesTab({
  pagesNeedingLinks,
}: {
  pagesNeedingLinks: Array<{
    page: string;
    issue: 'orphan' | 'weak' | 'low-authority';
    currentLinks: number;
    authorityScore: number;
    suggestedSources: string[];
  }>;
}) {
  if (pagesNeedingLinks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          No issues found. All pages have adequate internal links!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pagesNeedingLinks.map((page) => (
        <div
          key={page.page}
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-900 dark:text-gray-50">
                {page.page}
              </code>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${page.issue === 'orphan'
                ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                : page.issue === 'weak'
                  ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                }`}
            >
              {page.issue === 'orphan'
                ? 'Orphan Page'
                : page.issue === 'weak'
                  ? 'Weak Links'
                  : 'Low Authority'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Incoming Links:
              </span>
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-50">
                {page.currentLinks}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Authority Score:
              </span>
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-50">
                {page.authorityScore}
              </span>
            </div>
          </div>

          {page.suggestedSources.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-2">
                Suggested source pages:
              </p>
              <ul className="space-y-1">
                {page.suggestedSources.map((source) => (
                  <li
                    key={source}
                    className="text-sm text-blue-600 dark:text-blue-400 font-mono"
                  >
                    {source}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Stats Tab Component
function StatsTab({
  stats,
}: {
  stats:
  | {
    totalPages: number;
    orphanPages: number;
    weakPages: number;
    deadEndPages: number;
    averageIncomingLinks: number;
    averageOutgoingLinks: number;
    totalLinks: number;
  }
  | undefined;
}) {
  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          No statistics available.
        </p>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Pages',
      value: stats.totalPages,
      color: 'blue',
    },
    {
      label: 'Total Links',
      value: stats.totalLinks,
      color: 'green',
    },
    {
      label: 'Orphan Pages',
      value: stats.orphanPages,
      color: 'red',
    },
    {
      label: 'Weak Pages',
      value: stats.weakPages,
      color: 'yellow',
    },
    {
      label: 'Dead End Pages',
      value: stats.deadEndPages,
      color: 'orange',
    },
    {
      label: 'Avg Incoming Links',
      value: stats.averageIncomingLinks.toFixed(1),
      color: 'purple',
    },
    {
      label: 'Avg Outgoing Links',
      value: stats.averageOutgoingLinks.toFixed(1),
      color: 'indigo',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statCards.map((card) => (
        <div
          key={card.label}
          className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
        >
          <dt className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {card.label}
          </dt>
          <dd className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            {card.value}
          </dd>
        </div>
      ))}
    </div>
  );
}
