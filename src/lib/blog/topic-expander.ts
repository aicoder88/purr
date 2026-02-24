import { z } from 'zod';
import { callAi } from './ai-client';
import type { BlogTopic, Locale } from './types';
import { topicKeyForKeyword } from './keyword-queue';
import type { KeywordEntry } from './keyword-queue';

const ExpandedTopicSchema = z.object({
  title: z.string().min(10),
  slug: z.string().min(3),
  primaryKeyword: z.string().min(3),
  secondaryKeywords: z.array(z.string()).min(2),
  intent: z.string().min(5),
  hook: z.string().min(20),
  shareability: z.string().min(10),
  contentAngle: z.string().min(10),
  targetAudience: z.string().min(10),
  cta: z.string().min(10),
});

/**
 * Takes a raw keyword + locale from the keyword queue and uses AI
 * to expand it into a full BlogTopic ready for the generator pipeline.
 */
export async function expandKeywordToTopic(entry: KeywordEntry): Promise<BlogTopic> {
  const locale = (entry.locale ?? 'en') as Locale;

  const prompt = `You are a blog strategist for Purrify, a premium activated-carbon cat litter deodorizer brand.

Given the target keyword below, generate a complete blog topic brief as JSON.

Target keyword: "${entry.keyword}"
Locale: ${locale}

Return a JSON object with these fields:
- title: SEO-optimised blog title (50-70 chars) incorporating the keyword
- slug: URL-safe slug derived from the title (lowercase, hyphens only)
- primaryKeyword: the main keyword to target (may refine the input keyword)
- secondaryKeywords: array of 3-5 related long-tail keywords
- intent: reader search intent (e.g. "High intent – problem solution")
- hook: compelling opening hook (1-2 sentences with a data point or bold claim)
- shareability: what makes this post shareable (1 sentence)
- contentAngle: the unique angle or perspective (1-2 sentences)
- targetAudience: who this post is for (1 sentence)
- cta: call-to-action tying back to Purrify products (1 sentence)

${locale === 'fr' ? 'Write all fields in French.' : 'Write all fields in English.'}

Output clean JSON only, no markdown fences.`;

  const response = await callAi([
    {
      role: 'system',
      content: 'You are a blog strategist. Output clean JSON only.',
    },
    {
      role: 'user',
      content: prompt,
    },
  ]);

  let parsed: z.infer<typeof ExpandedTopicSchema>;
  try {
    const json = JSON.parse(response.text);
    parsed = ExpandedTopicSchema.parse(json);
  } catch (error) {
    throw new Error(`Failed to expand keyword "${entry.keyword}": ${(error as Error).message}`);
  }

  return {
    key: topicKeyForKeyword(entry.keyword),
    locale,
    title: parsed.title,
    slug: parsed.slug,
    primaryKeyword: parsed.primaryKeyword,
    secondaryKeywords: parsed.secondaryKeywords,
    intent: parsed.intent,
    hook: parsed.hook,
    shareability: parsed.shareability,
    contentAngle: parsed.contentAngle,
    targetAudience: parsed.targetAudience,
    cta: parsed.cta,
  };
}
