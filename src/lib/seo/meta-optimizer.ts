/**
 * Meta tag optimization utilities
 * Optimizes page titles and descriptions for maximum CTR
 */

import {
  LocaleCode,
  OptimizedMetaTitle,
  OptimizedMetaDescription,
  MetaContentValidation,
} from './types';
import { normalizeMetaTitle, normalizeMetaDescription } from '../seo-utils';

// Constants
const META_TITLE_MAX_LENGTH = 60;
const META_TITLE_MIN_LENGTH = 40;
const META_DESCRIPTION_MAX_LENGTH = 155;
const META_DESCRIPTION_MIN_LENGTH = 140;
const TITLE_SUFFIX = ' | Purrify';

/**
 * Optimizes meta title with smart truncation and keyword front-loading
 * - Front-loads target keyword if not already at start
 * - Removes suffix if too long
 * - Truncates to max 60 characters with ellipsis
 *
 * @param title - Raw title text
 * @param targetKeyword - Optional target keyword to front-load
 * @param locale - Optional locale for localization
 * @returns Optimized title with metadata
 */
export function optimizeMetaTitle(
  title: string,
  targetKeyword?: string,
  locale?: LocaleCode
): OptimizedMetaTitle {
  const warnings: string[] = [];
  let optimized = title.trim();

  // 1. Front-load target keyword if not already at start
  if (targetKeyword && targetKeyword.trim()) {
    const keywordLower = targetKeyword.toLowerCase();
    const titleLower = optimized.toLowerCase();

    // Check if keyword exists in title but not at start
    if (titleLower.includes(keywordLower) && !titleLower.startsWith(keywordLower)) {
      // Find keyword position
      const keywordPattern = new RegExp(`\\b${escapeRegExp(targetKeyword)}\\b`, 'i');
      const match = optimized.match(keywordPattern);

      if (match && match.index !== undefined && match.index > 0) {
        // Remove keyword from current position
        const beforeKeyword = optimized.substring(0, match.index).trim();
        const afterKeyword = optimized.substring(match.index + match[0].length).trim();

        // Rebuild with keyword at front
        const remaining = [beforeKeyword, afterKeyword].filter(Boolean).join(' ');
        optimized = remaining ? `${targetKeyword} - ${remaining}` : targetKeyword;
        warnings.push('Moved target keyword to front of title');
      }
    } else if (!titleLower.includes(keywordLower)) {
      // Keyword not in title at all
      warnings.push(`Consider including target keyword "${targetKeyword}" in title`);
    }
  }

  // 2. Check length and truncate if needed
  const originalLength = optimized.length;

  if (optimized.length > META_TITLE_MAX_LENGTH) {
    // Try removing suffix first if present
    if (optimized.includes(TITLE_SUFFIX)) {
      optimized = optimized.replace(TITLE_SUFFIX, '').trim();
      warnings.push('Removed " | Purrify" suffix to fit length limit');
    }

    // Still too long? Truncate
    if (optimized.length > META_TITLE_MAX_LENGTH) {
      optimized = optimized.substring(0, META_TITLE_MAX_LENGTH - 1).trim();
      // Add ellipsis if truncated mid-word
      if (!optimized.endsWith('.') && !optimized.endsWith('!') && !optimized.endsWith('?')) {
        optimized += '…';
      }
      warnings.push(`Truncated title from ${originalLength} to ${optimized.length} characters`);
    }
  }

  // Check if too short
  if (optimized.length < META_TITLE_MIN_LENGTH) {
    warnings.push(`Title is ${optimized.length} characters (optimal: ${META_TITLE_MIN_LENGTH}-${META_TITLE_MAX_LENGTH})`);
  }

  // 3. Use existing normalization for final cleanup
  const normalized = normalizeMetaTitle(optimized);

  return {
    title: normalized,
    isTruncated: normalized.length < originalLength,
    length: normalized.length,
    warnings,
  };
}

/**
 * Optimizes meta description with benefit-driven language and CTAs
 * - Ensures 140-155 character range
 * - Adds CTA if space permits
 * - Validates benefit-driven language
 *
 * @param description - Raw description text
 * @param targetKeyword - Optional target keyword to validate
 * @param locale - Optional locale for localization
 * @returns Optimized description with metadata
 */
export function optimizeMetaDescription(
  description: string,
  targetKeyword?: string,
  locale?: LocaleCode
): OptimizedMetaDescription {
  const warnings: string[] = [];
  let optimized = description.trim();

  // 1. Check for target keyword
  if (targetKeyword && targetKeyword.trim()) {
    const descLower = optimized.toLowerCase();
    const keywordLower = targetKeyword.toLowerCase();

    if (!descLower.includes(keywordLower)) {
      warnings.push(`Consider adding target keyword: "${targetKeyword}"`);
    }
  }

  // 2. Check for benefit-driven language
  const benefitWords = ['stop', 'eliminate', 'instant', 'free', 'proven', 'guaranteed', 'save', 'get', 'discover', 'learn'];
  const hasBenefit = benefitWords.some(word =>
    optimized.toLowerCase().includes(word)
  );

  if (!hasBenefit) {
    warnings.push('Consider adding benefit-driven words (stop, eliminate, instant, free, etc.)');
  }

  const originalLength = optimized.length;

  // 3. Ensure optimal length (140-155 chars)
  if (optimized.length < META_DESCRIPTION_MIN_LENGTH) {
    // Try adding CTA to reach optimal length
    const ctas = [
      'Shop now.',
      'Try it free.',
      'Learn more.',
      'Get started.',
      'See results.',
    ];

    for (const cta of ctas) {
      const withCTA = `${optimized} ${cta}`;
      if (withCTA.length <= META_DESCRIPTION_MAX_LENGTH) {
        optimized = withCTA;
        warnings.push(`Added "${cta}" to reach optimal length`);
        break;
      }
    }

    // Still too short? Warn
    if (optimized.length < META_DESCRIPTION_MIN_LENGTH) {
      warnings.push(`Description is ${optimized.length} characters (optimal: ${META_DESCRIPTION_MIN_LENGTH}-${META_DESCRIPTION_MAX_LENGTH})`);
    }
  }

  if (optimized.length > META_DESCRIPTION_MAX_LENGTH) {
    // Truncate to max length
    optimized = optimized.substring(0, META_DESCRIPTION_MAX_LENGTH - 1).trim();
    // Add ellipsis if truncated mid-sentence
    if (!optimized.endsWith('.') && !optimized.endsWith('!') && !optimized.endsWith('?')) {
      optimized += '…';
    }
    warnings.push(`Truncated description from ${originalLength} to ${optimized.length} characters`);
  }

  // 4. Use existing normalization for final cleanup
  const normalized = normalizeMetaDescription(optimized);

  return {
    description: normalized,
    isTruncated: normalized.length < originalLength,
    length: normalized.length,
    warnings,
  };
}

/**
 * Validates meta content quality and provides scoring
 * Checks for keywords, numbers, year, CTAs, and benefit-driven language
 *
 * @param title - Page title
 * @param description - Page description
 * @param targetKeyword - Optional target keyword
 * @returns Validation result with score (0-100) and suggestions
 */
export function validateMetaContent(
  title: string,
  description: string,
  targetKeyword?: string
): MetaContentValidation {
  const suggestions: string[] = [];
  let score = 100;

  // Title validation (weight: 20 points)
  if (targetKeyword && targetKeyword.trim()) {
    const titleLower = title.toLowerCase();
    const keywordLower = targetKeyword.toLowerCase();

    if (!titleLower.includes(keywordLower)) {
      suggestions.push(`Include target keyword "${targetKeyword}" in title`);
      score -= 20;
    }
  }

  // Benefit-driven language (weight: 15 points)
  const benefitWords = ['stop', 'eliminate', 'instant', 'free', 'proven', 'guaranteed', 'save', 'get', 'discover'];
  const hasBenefit = benefitWords.some(word =>
    title.toLowerCase().includes(word) || description.toLowerCase().includes(word)
  );

  if (!hasBenefit) {
    suggestions.push('Add benefit-driven words (stop, eliminate, instant, free, etc.)');
    score -= 15;
  }

  // Numbers/stats (weight: 10 points)
  const hasNumber = /\d+/.test(title) || /\d+/.test(description);
  if (!hasNumber) {
    suggestions.push('Add numbers for credibility (e.g., "99% effective", "10,000+ customers")');
    score -= 10;
  }

  // Year for freshness (weight: 5 points)
  const currentYear = new Date().getFullYear();
  const hasYear = title.includes(String(currentYear)) || description.includes(String(currentYear));
  if (!hasYear) {
    suggestions.push(`Add current year (${currentYear}) for freshness signal`);
    score -= 5;
  }

  // CTA in description (weight: 10 points)
  const ctaWords = ['try', 'get', 'shop', 'buy', 'learn', 'discover', 'see', 'start', 'find'];
  const hasCTA = ctaWords.some(word => description.toLowerCase().includes(word));
  if (!hasCTA) {
    suggestions.push('Add call-to-action to description (try, get, shop, learn, etc.)');
    score -= 10;
  }

  // Power words (weight: 10 points)
  const powerWords = ['best', 'ultimate', 'complete', 'perfect', 'essential', 'amazing', 'incredible'];
  const hasPowerWord = powerWords.some(word =>
    title.toLowerCase().includes(word) || description.toLowerCase().includes(word)
  );
  if (!hasPowerWord) {
    suggestions.push('Consider adding power words (best, ultimate, complete, perfect, etc.)');
    score -= 10;
  }

  // Emotional appeal (weight: 10 points)
  const emotionalWords = ['love', 'hate', 'fear', 'worry', 'embarrassed', 'happy', 'amazed', 'shocked'];
  const hasEmotion = emotionalWords.some(word =>
    title.toLowerCase().includes(word) || description.toLowerCase().includes(word)
  );
  if (!hasEmotion) {
    suggestions.push('Consider adding emotional appeal words to connect with readers');
    score -= 10;
  }

  // Urgency/scarcity (weight: 10 points)
  const urgencyWords = ['now', 'today', 'limited', 'only', 'hurry', 'fast', 'quick', 'instant'];
  const hasUrgency = urgencyWords.some(word =>
    title.toLowerCase().includes(word) || description.toLowerCase().includes(word)
  );
  if (!hasUrgency) {
    suggestions.push('Consider adding urgency words (now, today, limited, fast, instant)');
    score -= 10;
  }

  // Unique value proposition (weight: 10 points)
  const uvpWords = ['only', 'unique', 'exclusive', 'special', 'different', 'unlike'];
  const hasUVP = uvpWords.some(word =>
    title.toLowerCase().includes(word) || description.toLowerCase().includes(word)
  );
  if (!hasUVP) {
    suggestions.push('Highlight unique value proposition (only, unique, exclusive, etc.)');
    score -= 10;
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score);

  return {
    isValid: score >= 70, // Pass threshold
    score,
    suggestions,
  };
}

/**
 * Helper function to escape special regex characters
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
