import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { buildChatSystemPrompt } from '@/lib/chat/system-prompt';
import { CHAT_TOOLS, CHAT_ARTICLE_SLUGS, CHAT_PRODUCT_IDS } from '@/lib/chat/tools';
import { checkRateLimit, createRateLimitHeaders, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(500),
});

const chatRequestSchema = z.object({
  locale: z.enum(['en', 'fr']).default('en'),
  messages: z.array(chatMessageSchema).min(1).max(10),
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
  const rateLimitResult = await checkRateLimit(clientIp, 'generous');
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

  const anthropic = new Anthropic({ apiKey: anthropicApiKey });
  let anthropicStream: ReturnType<typeof anthropic.messages.stream>;

  try {
    anthropicStream = anthropic.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: buildChatSystemPrompt(validatedBody.locale),
      tools: CHAT_TOOLS,
      messages: validatedBody.messages,
    });
  } catch (error) {
    console.error('Chat stream start failed:', error);
    return NextResponse.json(
      { error: 'Unable to start chat stream.' },
      { status: 500, headers: rateLimitHeaders }
    );
  }

  const encoder = new TextEncoder();
  const pendingTools = new Map<number, PendingTool>();

  const stream = new ReadableStream({
    async start(controller) {
      const pushEvent = (payload: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      };

      try {
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
              pushEvent({
                type: 'tool_use',
                tool: {
                  name: pendingTool.name,
                  input: parsedInput,
                },
              });
            }

            pendingTools.delete(event.index);
            continue;
          }

          if (event.type === 'message_stop') {
            pushEvent({ type: 'message_stop' });
          }
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
