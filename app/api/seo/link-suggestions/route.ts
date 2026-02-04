/**
 * Link Suggestions API
 * GET /api/seo/link-suggestions
 *
 * Returns internal link suggestions for a given page or all pages
 * Used by admin tools to improve internal linking structure
 */

export const revalidate = 3600;

import {
  generateLinkSuggestions,
  getSuggestionsForPage,
  getSuggestionsToPage,
  prioritizeSuggestions,
  groupSuggestionsByPage,
  LinkSuggestion,
} from '@/lib/seo/link-suggestions';

interface LinkSuggestionsResponse {
  success: boolean;
  data?: {
    suggestions: LinkSuggestion[];
    total: number;
    highPriority: number;
    mediumPriority: number;
    lowPriority: number;
  };
  grouped?: Record<string, LinkSuggestion[]>;
  error?: string;
}

export async function GET(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const direction = searchParams.get('direction');
    const grouped = searchParams.get('grouped');
    const priority = searchParams.get('priority');
    const limit = searchParams.get('limit');

    let suggestions: LinkSuggestion[];

    // Get suggestions based on parameters
    if (page && typeof page === 'string') {
      if (direction === 'to') {
        // Get pages that should link TO this page
        suggestions = getSuggestionsToPage(page);
      } else {
        // Default: Get pages this page should link TO
        suggestions = getSuggestionsForPage(page);
      }
    } else {
      // Get all suggestions
      suggestions = generateLinkSuggestions();
    }

    // Filter by priority if specified
    if (priority && typeof priority === 'string') {
      const validPriorities = ['high', 'medium', 'low'];
      if (validPriorities.includes(priority)) {
        suggestions = suggestions.filter((s) => s.priority === priority);
      }
    }

    // Prioritize suggestions
    suggestions = prioritizeSuggestions(suggestions);

    // Apply limit
    if (limit && typeof limit === 'string') {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        suggestions = suggestions.slice(0, limitNum);
      }
    }

    // Calculate counts by priority
    const highPriority = suggestions.filter((s) => s.priority === 'high').length;
    const mediumPriority = suggestions.filter((s) => s.priority === 'medium').length;
    const lowPriority = suggestions.filter((s) => s.priority === 'low').length;

    const response: LinkSuggestionsResponse = {
      success: true,
      data: {
        suggestions,
        total: suggestions.length,
        highPriority,
        mediumPriority,
        lowPriority,
      },
    };

    // Group by page if requested
    if (grouped === 'true') {
      const groupedMap = groupSuggestionsByPage(suggestions);
      response.grouped = Object.fromEntries(groupedMap);
    }

    return Response.json(response);
  } catch (error) {
    console.error('Link suggestions error:', error);
    return Response.json({
      success: false,
      error: 'Internal server error generating link suggestions',
    }, { status: 500 });
  }
}
