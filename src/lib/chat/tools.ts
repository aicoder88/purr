import type { Tool } from '@anthropic-ai/sdk/resources/messages/messages';

export const CHAT_PRODUCT_IDS = [
  'purrify-12g',
  'purrify-50g',
  'purrify-50g-autoship',
  'purrify-120g',
  'purrify-120g-autoship',
  'purrify-240g',
  'purrify-240g-autoship',
] as const;

export type ChatProductId = (typeof CHAT_PRODUCT_IDS)[number];

export const CHAT_ARTICLE_SLUGS = [
  'why-does-my-cats-litter-box-smell-so-bad',
  'how-to-neutralize-ammonia-cat-litter',
  'activated-carbon-vs-baking-soda-comparison',
  'how-to-get-rid-of-cat-litter-smell-in-apartment',
  'best-cat-litter-multiple-cats-odor-control',
  'best-cat-litter-odor-control-2026',
] as const;

export type ChatArticleSlug = (typeof CHAT_ARTICLE_SLUGS)[number];

export interface RecommendProductToolInput {
  product_id: ChatProductId;
  reason: string;
  suggest_autoship?: boolean;
}

export interface SuggestArticleToolInput {
  article_slug: ChatArticleSlug;
  reason: string;
}

export type ChatToolUse =
  | { name: 'recommend_product'; input: RecommendProductToolInput }
  | { name: 'suggest_article'; input: SuggestArticleToolInput };

export const CHAT_TOOLS = [
  {
    name: 'recommend_product',
    description: 'Recommend a specific Purrify product based on the conversation',
    input_schema: {
      type: 'object',
      properties: {
        product_id: {
          type: 'string',
          enum: [...CHAT_PRODUCT_IDS],
        },
        reason: {
          type: 'string',
          description: 'One sentence reason for this recommendation',
        },
        suggest_autoship: {
          type: 'boolean',
          description: 'Whether to also suggest the autoship variant',
        },
      },
      required: ['product_id', 'reason'],
    },
  },
  {
    name: 'suggest_article',
    description: "Suggest a relevant blog article based on the user's concern",
    input_schema: {
      type: 'object',
      properties: {
        article_slug: {
          type: 'string',
          enum: [...CHAT_ARTICLE_SLUGS],
        },
        reason: {
          type: 'string',
        },
      },
      required: ['article_slug', 'reason'],
    },
  },
] satisfies Tool[];

const AUTOSHIP_VARIANTS: Partial<Record<ChatProductId, ChatProductId>> = {
  'purrify-50g': 'purrify-50g-autoship',
  'purrify-120g': 'purrify-120g-autoship',
  'purrify-240g': 'purrify-240g-autoship',
};

export function getAutoshipVariant(productId: ChatProductId): ChatProductId | null {
  return AUTOSHIP_VARIANTS[productId] ?? null;
}

export function isChatProductId(value: unknown): value is ChatProductId {
  return typeof value === 'string' && CHAT_PRODUCT_IDS.includes(value as ChatProductId);
}

export function isChatArticleSlug(value: unknown): value is ChatArticleSlug {
  return typeof value === 'string' && CHAT_ARTICLE_SLUGS.includes(value as ChatArticleSlug);
}
