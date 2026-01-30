/**
 * AI Page Renderer
 * Generates clean, high-density Markdown versions of pages for AI crawlers
 * GEO (Generative Engine Optimization) compliance
 */

import { ScientificCitation, ClaimReview } from './scientific-citations';

export interface AIPageContent {
  title: string;
  description: string;
  url: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  content: string;
  citations: ScientificCitation[];
  claims: ClaimReview[];
  keyTakeaways: string[];
  faqs?: Array<{ question: string; answer: string }>;
}

/**
 * Generate a clean markdown version of a page for AI consumption
 * Strips all non-essential UI/CSS elements
 */
export function generateAIMarkdown(page: AIPageContent): string {
  const sections: string[] = [];
  
  // Header with metadata
  sections.push(`# ${page.title}`);
  sections.push('');
  sections.push(`**URL:** ${page.url}`);
  sections.push(`**Description:** ${page.description}`);
  
  if (page.author) {
    sections.push(`**Author:** ${page.author}`);
  }
  
  if (page.publishedDate) {
    sections.push(`**Published:** ${page.publishedDate}`);
  }
  
  if (page.modifiedDate) {
    sections.push(`**Last Modified:** ${page.modifiedDate}`);
  }
  
  sections.push('');
  sections.push('---');
  sections.push('');
  
  // Main content (already markdown)
  sections.push(page.content);
  sections.push('');
  sections.push('---');
  sections.push('');
  
  // Key Takeaways
  if (page.keyTakeaways.length > 0) {
    sections.push('## Key Takeaways');
    sections.push('');
    page.keyTakeaways.forEach((takeaway) => {
      sections.push(`- ${takeaway}`);
    });
    sections.push('');
  }
  
  // Verified Claims
  if (page.claims.length > 0) {
    sections.push('## Fact-Checked Claims');
    sections.push('');
    page.claims.forEach((claim) => {
      sections.push(`### ${claim.claim}`);
      sections.push('');
      sections.push(`**Rating:** ${claim.rating}/5 - ${claim.ratingLabel}`);
      sections.push('');
      sections.push(`**Explanation:** ${claim.explanation}`);
      sections.push('');
      if (claim.citationIds.length > 0) {
        sections.push('**Supporting Evidence:**');
        claim.citationIds.forEach((id) => {
          sections.push(`- [${id}]`);
        });
      }
      sections.push('');
    });
  }
  
  // FAQs
  if (page.faqs && page.faqs.length > 0) {
    sections.push('## Frequently Asked Questions');
    sections.push('');
    page.faqs.forEach((faq, index) => {
      sections.push(`**Q${index + 1}:** ${faq.question}`);
      sections.push('');
      sections.push(`**A:** ${faq.answer}`);
      sections.push('');
    });
  }
  
  // Scientific Citations
  if (page.citations.length > 0) {
    sections.push('## Scientific References');
    sections.push('');
    page.citations.forEach((citation, index) => {
      sections.push(`### [${index + 1}] ${citation.title}`);
      sections.push('');
      sections.push(`**Authors:** ${citation.authors}`);
      sections.push(`**Journal:** ${citation.journal}`);
      sections.push(`**Year:** ${citation.year}`);
      if (citation.doi) {
        sections.push(`**DOI:** ${citation.doi}`);
      }
      if (citation.pmid) {
        sections.push(`**PubMed ID:** ${citation.pmid}`);
      }
      sections.push(`**URL:** ${citation.url}`);
      sections.push(`**Source Type:** ${citation.sourceType}`);
      sections.push('');
      sections.push(`**Summary:** ${citation.summary}`);
      sections.push('');
      if (citation.claims.length > 0) {
        sections.push('**Supports Claims:**');
        citation.claims.forEach((claim) => {
          sections.push(`- ${claim}`);
        });
      }
      sections.push('');
    });
  }
  
  // Footer
  sections.push('---');
  sections.push('');
  sections.push('*This content is optimized for AI consumption and includes structured citations for training and reference purposes.*');
  sections.push(`*Source: ${page.url}*`);
  
  return sections.join('\n');
}

/**
 * Generate a structured JSON version for AI APIs
 */
export function generateAIJSON(page: AIPageContent): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.description,
    url: page.url,
    author: page.author ? {
      '@type': 'Person',
      name: page.author,
    } : undefined,
    datePublished: page.publishedDate,
    dateModified: page.modifiedDate,
    articleBody: page.content,
    citation: page.citations.map((citation) => ({
      '@type': 'ScholarlyArticle',
      headline: citation.title,
      author: citation.authors,
      datePublished: citation.year,
      isPartOf: {
        '@type': 'Periodical',
        name: citation.journal,
      },
      identifier: citation.doi || citation.pmid,
      url: citation.url,
    })),
    claimReview: page.claims.map((claim) => ({
      '@type': 'ClaimReview',
      claimReviewed: claim.claim,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: claim.rating,
        bestRating: 5,
        worstRating: 1,
        alternateName: claim.ratingLabel,
      },
    })),
  };
}

/**
 * Strip HTML tags for plain text extraction
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Convert HTML content to Markdown
 * Basic conversion for AI consumption
 */
export function htmlToMarkdown(html: string): string {
  let markdown = html;
  
  // Headers
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
  
  // Paragraphs
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
  
  // Bold/Strong
  markdown = markdown.replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**');
  
  // Italic/Em
  markdown = markdown.replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, '*$2*');
  
  // Links
  markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  // Lists
  markdown = markdown.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
  markdown = markdown.replace(/<\/(ul|ol)>/gi, '\n');
  
  // Remove remaining tags
  markdown = markdown.replace(/<[^>]+>/g, '');
  
  // Clean up whitespace
  markdown = markdown.replace(/\n\n+/g, '\n\n');
  markdown = markdown.trim();
  
  return markdown;
}

/**
 * Check if request should receive AI-optimized content
 */
export function shouldServeAIVersion(
  userAgent: string | null | undefined,
  url: URL,
  headers: Headers
): boolean {
  // Check for AI query parameter
  if (url.searchParams.get('_ai') === '1') {
    return true;
  }
  
  // Check for AI crawler User-Agent
  const { isAICrawler } = require('./ai-user-agents');
  if (isAICrawler(userAgent)) {
    return true;
  }
  
  // Check for AI request headers
  if (headers.get('X-Accept-Format')?.includes('markdown')) {
    return true;
  }
  
  return false;
}

export default {
  generateAIMarkdown,
  generateAIJSON,
  stripHtml,
  htmlToMarkdown,
  shouldServeAIVersion,
};
