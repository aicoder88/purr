import path from 'node:path';
import fs from 'node:fs/promises';

export interface Keyword {
  term: string;
  searchVolume: number;
  competition: 'low' | 'medium' | 'high';
  difficulty: number;
  category: string;
}

export interface KeywordSuggestion {
  keyword: Keyword;
  relevanceScore: number;
  currentUsage: number;
  recommendedPlacement: ('title' | 'h1' | 'meta-description' | 'content')[];
  compositeScore?: number; // Overall score combining relevance, volume, competition
}

export interface ValidationResult {
  passed: boolean;
  issues: string[];
  warnings: string[];
  keywordDensity: Record<string, number>;
}

export class KeywordOptimizer {
  private keywords: Keyword[] = [];
  private keywordFilePath: string;

  constructor(keywordFilePath?: string) {
    this.keywordFilePath = keywordFilePath || path.join(process.cwd(), 'docs', 'cat-odor-keywords.json');
  }

  /**
   * Load keywords from JSON file
   */
  async loadKeywords(): Promise<Keyword[]> {
    try {
      const fileContent = await fs.readFile(this.keywordFilePath, 'utf-8');
      const data = JSON.parse(fileContent);

      this.keywords = data.map((row: any) => ({
        term: row['Keyword'] || row['keyword'] || '',
        searchVolume: parseInt(row['Volume'] || row['Search Volume'] || row['search_volume'] || '0'),
        competition: this.normalizeCompetition(row['Competitive Density'] || row['Competition'] || row['competition'] || 'medium'),
        difficulty: parseInt(row['Keyword Difficulty'] || row['Difficulty'] || row['difficulty'] || '50'),
        category: row['Topic'] || row['Category'] || row['category'] || 'general'
      })).filter(k => k.term); // Filter out empty keywords

      return this.keywords;
    } catch (error) {
      throw new Error(`Failed to load keywords from ${this.keywordFilePath}: ${error}`);
    }
  }

  /**
   * Get all loaded keywords
   */
  getKeywords(): Keyword[] {
    return this.keywords;
  }

  /**
   * Filter keywords by category
   */
  getKeywordsByCategory(category: string): Keyword[] {
    return this.keywords.filter(k => 
      k.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Filter keywords by competition level
   */
  getKeywordsByCompetition(competition: 'low' | 'medium' | 'high'): Keyword[] {
    return this.keywords.filter(k => k.competition === competition);
  }

  /**
   * Get high-value keywords (high volume, low competition)
   */
  getHighValueKeywords(limit: number = 20): Keyword[] {
    return this.keywords
      .filter(k => k.competition === 'low' || k.competition === 'medium')
      .sort((a, b) => {
        // Sort by search volume descending, then difficulty ascending
        if (b.searchVolume !== a.searchVolume) {
          return b.searchVolume - a.searchVolume;
        }
        return a.difficulty - b.difficulty;
      })
      .slice(0, limit);
  }

  /**
   * Suggest keywords based on content and category
   */
  async suggestKeywords(
    content: string, 
    category?: string, 
    limit: number = 10
  ): Promise<KeywordSuggestion[]> {
    if (this.keywords.length === 0) {
      await this.loadKeywords();
    }

    let relevantKeywords = this.keywords;

    // Filter by category if provided
    if (category) {
      relevantKeywords = relevantKeywords.filter(k => 
        k.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Prioritize low/medium competition
    relevantKeywords = relevantKeywords.filter(k => 
      k.competition === 'low' || k.competition === 'medium'
    );

    // Sort by search volume
    relevantKeywords.sort((a, b) => b.searchVolume - a.searchVolume);

    // Calculate relevance and create suggestions
    const suggestions: KeywordSuggestion[] = relevantKeywords
      .slice(0, limit * 2) // Get more than needed for filtering
      .map(keyword => {
        const relevanceScore = this.calculateRelevance(content, keyword.term);
        const currentUsage = this.countOccurrences(content, keyword.term);
        const recommendedPlacement = this.getRecommendedPlacements(content, keyword.term);

        return {
          keyword,
          relevanceScore,
          currentUsage,
          recommendedPlacement
        };
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);

    return suggestions;
  }

  /**
   * Get smart keyword suggestions with advanced filtering
   * Prioritizes keywords based on relevance, search volume, and competition
   */
  async getSmartSuggestions(
    content: string,
    options: {
      category?: string;
      minSearchVolume?: number;
      maxDifficulty?: number;
      excludeUsed?: boolean;
      limit?: number;
    } = {}
  ): Promise<KeywordSuggestion[]> {
    const {
      category,
      minSearchVolume = 100,
      maxDifficulty = 70,
      excludeUsed = false,
      limit = 10
    } = options;

    if (this.keywords.length === 0) {
      await this.loadKeywords();
    }

    let relevantKeywords = this.keywords;

    // Apply filters
    if (category) {
      relevantKeywords = relevantKeywords.filter(k => 
        k.category.toLowerCase() === category.toLowerCase()
      );
    }

    relevantKeywords = relevantKeywords.filter(k => 
      k.searchVolume >= minSearchVolume &&
      k.difficulty <= maxDifficulty &&
      (k.competition === 'low' || k.competition === 'medium')
    );

    // Calculate suggestions
    const suggestions: KeywordSuggestion[] = relevantKeywords
      .map(keyword => {
        const relevanceScore = this.calculateRelevance(content, keyword.term);
        const currentUsage = this.countOccurrences(content, keyword.term);
        const recommendedPlacement = this.getRecommendedPlacements(content, keyword.term);

        // Calculate composite score (relevance + search volume + competition)
        const volumeScore = Math.min(keyword.searchVolume / 1000, 50);
        const competitionScore = keyword.competition === 'low' ? 20 : 10;
        const difficultyScore = Math.max(0, 30 - keyword.difficulty / 3);
        const compositeScore = relevanceScore * 0.4 + volumeScore * 0.3 + competitionScore * 0.2 + difficultyScore * 0.1;

        return {
          keyword,
          relevanceScore,
          currentUsage,
          recommendedPlacement,
          compositeScore
        };
      })
      .filter(suggestion => {
        // Optionally exclude keywords already used
        if (excludeUsed && suggestion.currentUsage > 0) {
          return false;
        }
        return true;
      })
      .sort((a, b) => (b.compositeScore || 0) - (a.compositeScore || 0))
      .slice(0, limit);

    return suggestions;
  }

  /**
   * Get keyword opportunities - high-value keywords not currently used
   */
  async getKeywordOpportunities(
    content: string,
    category?: string,
    limit: number = 5
  ): Promise<KeywordSuggestion[]> {
    const suggestions = await this.getSmartSuggestions(content, {
      category,
      excludeUsed: true,
      limit: limit * 2
    });

    // Filter for high-value opportunities
    return suggestions
      .filter(s => s.keyword.searchVolume > 500)
      .slice(0, limit);
  }

  /**
   * Validate keyword usage in content
   */
  async validateKeywordUsage(
    content: string, 
    targetKeywords: string[]
  ): Promise<ValidationResult> {
    const issues: string[] = [];
    const warnings: string[] = [];
    const keywordDensity: Record<string, number> = {};

    const contentLower = content.toLowerCase();
    const title = this.extractTitle(content);
    const firstParagraph = this.extractFirstParagraph(content);
    const headings = this.extractHeadings(content);

    for (const keyword of targetKeywords) {
      const keywordLower = keyword.toLowerCase();
      const density = this.calculateKeywordDensity(content, keyword);
      keywordDensity[keyword] = density;

      // Check if keyword appears in title
      if (!title.toLowerCase().includes(keywordLower)) {
        warnings.push(`Keyword "${keyword}" not found in title`);
      }

      // Check if keyword appears in first paragraph
      if (!firstParagraph.toLowerCase().includes(keywordLower)) {
        warnings.push(`Keyword "${keyword}" not found in first paragraph`);
      }

      // Check if keyword appears in at least one heading
      const inHeading = headings.some(h => h.toLowerCase().includes(keywordLower));
      if (!inHeading) {
        warnings.push(`Keyword "${keyword}" not found in any heading`);
      }

      // Check keyword density
      if (density > 3) {
        issues.push(`Keyword "${keyword}" density is ${density.toFixed(2)}% (exceeds 3% threshold)`);
      } else if (density < 0.5) {
        warnings.push(`Keyword "${keyword}" density is ${density.toFixed(2)}% (consider using more)`);
      }
    }

    return {
      passed: issues.length === 0,
      issues,
      warnings,
      keywordDensity
    };
  }

  /**
   * Calculate keyword density as percentage
   */
  calculateKeywordDensity(content: string, keyword: string): number {
    const words = content.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const keywordWords = keyword.toLowerCase().split(/\s+/);
    
    if (words.length === 0) return 0;

    let occurrences = 0;
    
    // For multi-word keywords, search for the phrase
    if (keywordWords.length > 1) {
      const contentText = content.toLowerCase();
      const regex = new RegExp(keyword.toLowerCase().replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = contentText.match(regex);
      occurrences = matches ? matches.length : 0;
    } else {
      // For single-word keywords
      occurrences = words.filter(w => w === keyword.toLowerCase()).length;
    }

    return (occurrences / words.length) * 100;
  }

  /**
   * Calculate relevance score between content and keyword
   * Uses multiple factors: exact matches, word presence, position, and frequency
   */
  private calculateRelevance(content: string, keyword: string): number {
    const contentLower = content.toLowerCase();
    const keywordLower = keyword.toLowerCase();
    const keywordWords = keywordLower.split(/\s+/);

    let score = 0;

    // 1. Exact phrase match in content (40 points)
    if (contentLower.includes(keywordLower)) {
      score += 40;
      
      // Bonus for multiple exact matches
      const exactMatches = this.countOccurrences(content, keyword);
      score += Math.min(exactMatches * 5, 15);
    }

    // 2. Individual keyword words present (25 points)
    const wordsPresent = keywordWords.filter(word => 
      contentLower.includes(word)
    ).length;
    score += (wordsPresent / keywordWords.length) * 25;

    // 3. Keyword in title (15 points)
    const title = this.extractTitle(content);
    if (title.toLowerCase().includes(keywordLower)) {
      score += 15;
    }

    // 4. Keyword in headings (10 points)
    const headings = this.extractHeadings(content);
    const inHeading = headings.some(h => h.toLowerCase().includes(keywordLower));
    if (inHeading) {
      score += 10;
    }

    // 5. Keyword in first paragraph (10 points)
    const firstParagraph = this.extractFirstParagraph(content);
    if (firstParagraph.toLowerCase().includes(keywordLower)) {
      score += 10;
    }

    // 6. Semantic similarity bonus (check for related terms)
    const semanticScore = this.calculateSemanticSimilarity(content, keyword);
    score += semanticScore;

    return Math.min(score, 100);
  }

  /**
   * Calculate semantic similarity based on related terms
   */
  private calculateSemanticSimilarity(content: string, keyword: string): number {
    const contentLower = content.toLowerCase();
    const relatedTerms = this.getRelatedTerms(keyword);
    
    let matchCount = 0;
    for (const term of relatedTerms) {
      if (contentLower.includes(term.toLowerCase())) {
        matchCount++;
      }
    }

    // Up to 10 points for semantic similarity
    return Math.min((matchCount / relatedTerms.length) * 10, 10);
  }

  /**
   * Get related terms for a keyword (simple implementation)
   */
  private getRelatedTerms(keyword: string): string[] {
    const relatedTermsMap: Record<string, string[]> = {
      'cat litter': ['litter box', 'cat box', 'kitty litter', 'feline'],
      'odor': ['smell', 'scent', 'stink', 'fragrance', 'aroma'],
      'eliminate': ['remove', 'destroy', 'neutralize', 'get rid of'],
      'activated carbon': ['charcoal', 'carbon filter', 'absorbent'],
      'deodorizer': ['air freshener', 'odor eliminator', 'smell remover'],
    };

    const keywordLower = keyword.toLowerCase();
    
    // Find related terms
    for (const [key, terms] of Object.entries(relatedTermsMap)) {
      if (keywordLower.includes(key)) {
        return terms;
      }
    }

    // Return keyword variations as fallback
    return [
      keyword.replace(/s$/, ''), // singular
      keyword + 's', // plural
      keyword.replaceAll(/-/g, ' '), // space variant
      keyword.replaceAll(/\s/g, '-'), // hyphen variant
    ].filter(term => term !== keyword);
  }

  /**
   * Count occurrences of keyword in content
   */
  private countOccurrences(content: string, keyword: string): number {
    const contentLower = content.toLowerCase();
    const keywordLower = keyword.toLowerCase();
    const regex = new RegExp(keywordLower.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = contentLower.match(regex);
    return matches ? matches.length : 0;
  }

  /**
   * Get recommended placements for keyword
   */
  private getRecommendedPlacements(
    content: string, 
    keyword: string
  ): ('title' | 'h1' | 'meta-description' | 'content')[] {
    const placements: ('title' | 'h1' | 'meta-description' | 'content')[] = [];
    const contentLower = content.toLowerCase();
    const keywordLower = keyword.toLowerCase();

    const title = this.extractTitle(content);
    const headings = this.extractHeadings(content);

    // Recommend title if not present
    if (!title.toLowerCase().includes(keywordLower)) {
      placements.push('title');
    }

    // Recommend H1 if not present
    const h1Present = headings.some(h => h.toLowerCase().includes(keywordLower));
    if (!h1Present) {
      placements.push('h1');
    }

    // Always recommend meta-description
    placements.push('meta-description');

    // Recommend content if usage is low
    const occurrences = this.countOccurrences(content, keyword);
    if (occurrences < 3) {
      placements.push('content');
    }

    return placements;
  }

  /**
   * Extract title from content (looks for # heading or first line)
   */
  private extractTitle(content: string): string {
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) {
        return trimmed.substring(2);
      }
      if (trimmed.length > 0 && !trimmed.startsWith('#')) {
        return trimmed;
      }
    }
    return '';
  }

  /**
   * Extract first paragraph from content
   */
  private extractFirstParagraph(content: string): string {
    const lines = content.split('\n');
    let paragraph = '';
    let foundContent = false;

    for (const line of lines) {
      const trimmed = line.trim();
      
      // Skip headings
      if (trimmed.startsWith('#')) {
        foundContent = true;
        continue;
      }

      // Start collecting paragraph
      if (foundContent && trimmed.length > 0) {
        paragraph += trimmed + ' ';
        
        // Stop at first paragraph break
        if (paragraph.length > 100) {
          break;
        }
      }
    }

    return paragraph.trim();
  }

  /**
   * Extract all headings from content
   */
  private extractHeadings(content: string): string[] {
    const headings: string[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#')) {
        const heading = trimmed.replace(/^#+\s*/, '');
        headings.push(heading);
      }
    }

    return headings;
  }

  /**
   * Normalize competition value
   */
  private normalizeCompetition(value: string): 'low' | 'medium' | 'high' {
    const lower = value.toLowerCase();
    if (lower.includes('low')) return 'low';
    if (lower.includes('high')) return 'high';
    return 'medium';
  }
}
