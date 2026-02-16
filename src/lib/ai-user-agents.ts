/**
 * AI User-Agent Detection Library
 * Identifies AI crawlers and bots for GEO (Generative Engine Optimization)
 */

export interface AIUserAgentPattern {
  name: string;
  pattern: RegExp;
  description: string;
}

/**
 * Known AI crawler User-Agent patterns
 * Updated regularly as new AI crawlers emerge
 */
export const AI_USER_AGENTS: AIUserAgentPattern[] = [
  {
    name: 'GPTBot',
    pattern: /GPTBot/i,
    description: 'OpenAI GPT crawler',
  },
  {
    name: 'ChatGPT-User',
    pattern: /ChatGPT-User/i,
    description: 'ChatGPT browsing plugin',
  },
  {
    name: 'PerplexityBot',
    pattern: /PerplexityBot/i,
    description: 'Perplexity AI crawler',
  },
  {
    name: 'Claude-Web',
    pattern: /Claude-Web/i,
    description: 'Anthropic Claude crawler',
  },
  {
    name: 'Google-Extended',
    pattern: /Google-Extended/i,
    description: 'Google AI crawler',
  },
  {
    name: 'BingBot-AI',
    pattern: /BingBot.*AI|AI.*BingBot/i,
    description: 'Bing AI crawler',
  },
  {
    name: 'Meta-ExternalAgent',
    pattern: /Meta-ExternalAgent/i,
    description: 'Meta AI crawler',
  },
  {
    name: 'Amazonbot',
    pattern: /Amazonbot/i,
    description: 'Amazon AI crawler',
  },
  {
    name: 'Applebot-Extended',
    pattern: /Applebot-Extended/i,
    description: 'Apple AI crawler',
  },
  {
    name: 'YouBot',
    pattern: /YouBot/i,
    description: 'You.com AI crawler',
  },
  {
    name: 'ByteSpider',
    pattern: /Bytespider/i,
    description: 'ByteDance (TikTok) crawler',
  },
  {
    name: 'CommonCrawl',
    pattern: /CCBot/i,
    description: 'CommonCrawl (used by many AI models)',
  },
  {
    name: 'OAI-SearchBot',
    pattern: /OAI-SearchBot/i,
    description: 'OpenAI Search crawler',
  },
  {
    name: 'Scrapy',
    pattern: /Scrapy/i,
    description: 'Scrapy bot (often used for AI training data)',
  },
];

/**
 * Check if a User-Agent string is an AI crawler
 */
export function isAICrawler(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  return AI_USER_AGENTS.some((agent) => agent.pattern.test(userAgent));
}

/**
 * Get the name of the AI crawler if detected
 */
export function getAICrawlerName(userAgent: string | null | undefined): string | null {
  if (!userAgent) return null;
  const match = AI_USER_AGENTS.find((agent) => agent.pattern.test(userAgent));
  return match?.name || null;
}

/**
 * Get detailed info about detected AI crawler
 */
export function getAICrawlerInfo(userAgent: string | null | undefined): AIUserAgentPattern | null {
  if (!userAgent) return null;
  return AI_USER_AGENTS.find((agent) => agent.pattern.test(userAgent)) || null;
}

/**
 * Headers that indicate AI/ML API requests
 */
export const AI_API_HEADERS = [
  'x-ai-request',
  'x-llm-request',
  'x-ml-request',
  'x-openai-request',
  'x-anthropic-request',
];

/**
 * Check if request headers indicate AI API usage
 */
export function hasAIRequestHeaders(headers: Headers): boolean {
  return AI_API_HEADERS.some((header) => headers.get(header) !== null);
}

const AIUserAgentUtils = {
  AI_USER_AGENTS,
  AI_API_HEADERS,
  isAICrawler,
  getAICrawlerName,
  getAICrawlerInfo,
  hasAIRequestHeaders,
};

export default AIUserAgentUtils;
