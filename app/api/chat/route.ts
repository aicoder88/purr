import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { buildChatSystemPrompt } from '@/lib/chat/system-prompt';
import { CHAT_TOOLS, CHAT_ARTICLE_SLUGS, CHAT_PRODUCT_IDS } from '@/lib/chat/tools';
import type { RecommendProductToolInput } from '@/lib/chat/tools';
import { upsertFreshnessProfile } from '@/lib/freshness-profile';
import { checkRateLimit, createRateLimitHeaders, getClientIp } from '@/lib/rate-limit';
import { verifyOrigin } from '@/lib/security/origin-check';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const AUTOMATED_TRAFFIC_PATTERN =
  /bot|crawler|spider|preview|facebookexternalhit|Slackbot|WhatsApp|Discordbot|LinkedInBot|Twitterbot|SkypeUriPreview/i;
const CHAT_MAX_HISTORY_MESSAGES = 8;
const CHAT_MAX_TOKENS = 240;

const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(400),
});

const chatRequestSchema = z.object({
  locale: z.enum(['en', 'fr']).default('en'),
  messages: z.array(chatMessageSchema).min(1).max(CHAT_MAX_HISTORY_MESSAGES),
  sessionId: z
    .string()
    .trim()
    .min(8)
    .max(128)
    .regex(/^[A-Za-z0-9_-]+$/)
    .optional(),
});

const recommendProductInputSchema = z.object({
  product_id: z.enum(CHAT_PRODUCT_IDS),
  reason: z.string().trim().min(1).max(200),
  suggest_autoship: z.boolean().optional(),
});

const suggestArticleInputSchema = z.object({
  article_slug: z.enum(CHAT_ARTICLE_SLUGS),
  reason: z.string().trim().min(1).max(200),
});

type PendingTool = {
  name: string;
  initialInput: unknown;
  inputChunks: string[];
};

function getChatModelCandidates(): string[] {
  const candidates = [
    process.env.CHAT_ANTHROPIC_MODEL,
    'claude-haiku-4-5',
    process.env.CHAT_ANTHROPIC_FALLBACK_MODEL,
  ];

  return [...new Set(candidates.filter((candidate): candidate is string => typeof candidate === 'string' && candidate.trim().length > 0))];
}

function parseToolInput(name: string, input: unknown): Record<string, unknown> | null {
  if (name === 'recommend_product') {
    const parsed = recommendProductInputSchema.safeParse(input);
    return parsed.success ? parsed.data : null;
  }

  if (name === 'suggest_article') {
    const parsed = suggestArticleInputSchema.safeParse(input);
    return parsed.success ? parsed.data : null;
  }

  return null;
}

function mergeToolInput(pendingTool: PendingTool): Record<string, unknown> | null {
  const inputChunk = pendingTool.inputChunks.join('');
  const parsedChunk = inputChunk.length > 0
    ? (() => {
      try {
        return JSON.parse(inputChunk);
      } catch {
        return pendingTool.initialInput;
      }
    })()
    : pendingTool.initialInput;

  return parseToolInput(pendingTool.name, parsedChunk);
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || '';

  if (!verifyOrigin(request)) {
    return NextResponse.json(
      { error: 'Forbidden.' },
      { status: 403 }
    );
  }

  if (AUTOMATED_TRAFFIC_PATTERN.test(userAgent)) {
    return NextResponse.json(
      { error: 'Automated traffic is not allowed.' },
      { status: 403 }
    );
  }

  const rateLimitResult = await checkRateLimit(clientIp, 'sensitive');
  const rateLimitHeaders = createRateLimitHeaders(rateLimitResult);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: rateLimitHeaders }
    );
  }

  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicApiKey) {
    return NextResponse.json(
      { error: 'Chat is not configured.' },
      { status: 503, headers: rateLimitHeaders }
    );
  }

  let validatedBody: z.infer<typeof chatRequestSchema>;
  try {
    const body = await request.json();
    const parsed = chatRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request payload.', details: parsed.error.issues },
        { status: 400, headers: rateLimitHeaders }
      );
    }
    validatedBody = parsed.data;
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400, headers: rateLimitHeaders }
    );
  }

  if (validatedBody.sessionId) {
    const sessionRateLimitResult = await checkRateLimit(`chat:${validatedBody.sessionId}`, 'standard');
    if (!sessionRateLimitResult.success) {
      return NextResponse.json(
        { error: 'This chat session is sending messages too quickly. Please slow down.' },
        { status: 429, headers: createRateLimitHeaders(sessionRateLimitResult) }
      );
    }
  }

  const anthropic = new Anthropic({ apiKey: anthropicApiKey });
  const modelCandidates = getChatModelCandidates();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const pushEvent = (payload: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      };

      try {
        let streamFinished = false;
        let streamFailedError: unknown = null;

        for (const model of modelCandidates) {
          const pendingTools = new Map<number, PendingTool>();
          let emittedOutput = false;

          try {
            const anthropicStream = anthropic.messages.stream({
              model,
              max_tokens: CHAT_MAX_TOKENS,
              system: buildChatSystemPrompt(validatedBody.locale),
              tools: CHAT_TOOLS,
              messages: validatedBody.messages,
            });

            for await (const event of anthropicStream) {
              if (event.type === 'content_block_start' && event.content_block.type === 'tool_use') {
                pendingTools.set(event.index, {
                  name: event.content_block.name,
                  initialInput: event.content_block.input,
                  inputChunks: [],
                });
                continue;
              }

              if (event.type === 'content_block_delta') {
                if (event.delta.type === 'text_delta') {
                  emittedOutput = true;
                  pushEvent({ type: 'text_delta', text: event.delta.text });
                  continue;
                }

                if (event.delta.type === 'input_json_delta') {
                  const pendingTool = pendingTools.get(event.index);
                  if (pendingTool) {
                    pendingTool.inputChunks.push(event.delta.partial_json);
                  }
                }
                continue;
              }

              if (event.type === 'content_block_stop') {
                const pendingTool = pendingTools.get(event.index);
                if (!pendingTool) {
                  continue;
                }

                const parsedInput = mergeToolInput(pendingTool);
                if (parsedInput) {
                  emittedOutput = true;
                  let latestRecommendation: RecommendProductToolInput | null = null;
                  if (pendingTool.name === 'recommend_product') {
                    const parsedRecommendation = recommendProductInputSchema.safeParse(parsedInput);
                    latestRecommendation = parsedRecommendation.success ? parsedRecommendation.data : null;
                  }
                  pushEvent({
                    type: 'tool_use',
                    tool: {
                      name: pendingTool.name,
                      input: parsedInput,
                    },
                  });

                  if (latestRecommendation && validatedBody.sessionId) {
                    void upsertFreshnessProfile({
                      sessionId: validatedBody.sessionId,
                      locale: validatedBody.locale,
                      source: 'chat',
                      recommendedProductId: latestRecommendation.product_id,
                      recommendationReason: latestRecommendation.reason,
                      confidence: 70,
                    }).catch((profileError) => {
                      console.error('Unable to persist chat freshness profile:', profileError);
                    });
                  }
                }

                pendingTools.delete(event.index);
                continue;
              }

              if (event.type === 'message_stop') {
                emittedOutput = true;
                pushEvent({ type: 'message_stop' });
              }
            }

            streamFinished = true;
            streamFailedError = null;
            break;
          } catch (error) {
            streamFailedError = error;
            console.error(`Chat stream failed for model ${model}:`, error);
            if (emittedOutput) {
              break;
            }
          }
        }

        if (!streamFinished) {
          throw streamFailedError ?? new Error('chat_stream_failed');
        }
      } catch (error) {
        console.error('Chat stream failed:', error);
        pushEvent({ type: 'error', error: 'stream_failed' });
      } finally {
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    },
  });

  const headers = new Headers(rateLimitHeaders);
  headers.set('Content-Type', 'text/event-stream');
  headers.set('Cache-Control', 'no-cache, no-transform');
  headers.set('Connection', 'keep-alive');

  return new Response(stream, {
    headers,
  });
}
