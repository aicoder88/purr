'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChatToolUse } from '@/lib/chat/tools';
import { isChatArticleSlug, isChatProductId } from '@/lib/chat/tools';

type ChatLocale = 'en' | 'fr';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  toolUse?: ChatToolUse[];
};

type StreamEvent =
  | { type: 'text_delta'; text: string }
  | { type: 'tool_use'; tool: { name: string; input: Record<string, unknown> } }
  | { type: 'message_stop' }
  | { type: 'error'; error: string };

function createMessageId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function extractSseData(rawEvent: string): string | null {
  const dataLines = rawEvent
    .split('\n')
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.slice('data:'.length).trimStart());

  if (dataLines.length === 0) {
    return null;
  }

  return dataLines.join('\n');
}

function parseToolUse(event: StreamEvent): ChatToolUse | null {
  if (event.type !== 'tool_use') {
    return null;
  }

  if (event.tool.name === 'recommend_product') {
    const { input } = event.tool;
    if (!isChatProductId(input.product_id)) {
      return null;
    }

    if (typeof input.reason !== 'string' || input.reason.trim().length === 0) {
      return null;
    }

    return {
      name: 'recommend_product',
      input: {
        product_id: input.product_id,
        reason: input.reason,
        suggest_autoship: typeof input.suggest_autoship === 'boolean' ? input.suggest_autoship : undefined,
      },
    };
  }

  if (event.tool.name === 'suggest_article') {
    const { input } = event.tool;
    if (!isChatArticleSlug(input.article_slug)) {
      return null;
    }

    if (typeof input.reason !== 'string' || input.reason.trim().length === 0) {
      return null;
    }

    return {
      name: 'suggest_article',
      input: {
        article_slug: input.article_slug,
        reason: input.reason,
      },
    };
  }

  return null;
}

export function useChatStream(locale: ChatLocale) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesRef = useRef<ChatMessage[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const ensureGreeting = useCallback((greeting: string) => {
    setMessages((previous) => {
      if (previous.length > 0) {
        return previous;
      }

      return [
        {
          id: createMessageId(),
          role: 'assistant',
          content: greeting,
        },
      ];
    });
  }, []);

  const reset = useCallback((greeting?: string) => {
    setMessages(() => {
      if (!greeting) {
        return [];
      }

      return [
        {
          id: createMessageId(),
          role: 'assistant',
          content: greeting,
        },
      ];
    });
  }, []);

  const sendMessage = useCallback(
    async (text: string, errorMessage: string) => {
      const trimmed = text.trim();
      if (trimmed.length === 0 || isStreaming) {
        return;
      }

      const userMessage: ChatMessage = {
        id: createMessageId(),
        role: 'user',
        content: trimmed,
      };

      const assistantMessageId = createMessageId();
      setMessages((previous) => [
        ...previous,
        userMessage,
        {
          id: assistantMessageId,
          role: 'assistant',
          content: '',
        },
      ]);

      const historyForApi = [...messagesRef.current, userMessage]
        .map((message) => ({ role: message.role, content: message.content }))
        .slice(-10);

      setIsStreaming(true);

      let streamedText = '';
      const streamedTools: ChatToolUse[] = [];

      const updateAssistantMessage = () => {
        setMessages((previous) =>
          previous.map((message) =>
            message.id === assistantMessageId
              ? {
                ...message,
                content: streamedText,
                toolUse: streamedTools.length > 0 ? [...streamedTools] : undefined,
              }
              : message
          )
        );
      };

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            locale,
            messages: historyForApi,
          }),
        });

        if (!response.ok) {
          throw new Error(`chat_request_failed:${response.status}`);
        }

        if (!response.body) {
          throw new Error('chat_stream_missing');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let streamDone = false;

        while (!streamDone) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          let separatorIndex = buffer.indexOf('\n\n');

          while (separatorIndex !== -1) {
            const rawEvent = buffer.slice(0, separatorIndex);
            buffer = buffer.slice(separatorIndex + 2);

            const payload = extractSseData(rawEvent);
            if (!payload) {
              separatorIndex = buffer.indexOf('\n\n');
              continue;
            }

            if (payload === '[DONE]') {
              streamDone = true;
              break;
            }

            let event: StreamEvent;
            try {
              event = JSON.parse(payload) as StreamEvent;
            } catch {
              separatorIndex = buffer.indexOf('\n\n');
              continue;
            }

            if (event.type === 'text_delta') {
              streamedText += event.text;
              updateAssistantMessage();
              separatorIndex = buffer.indexOf('\n\n');
              continue;
            }

            if (event.type === 'tool_use') {
              const parsedToolUse = parseToolUse(event);
              if (parsedToolUse) {
                streamedTools.push(parsedToolUse);
                updateAssistantMessage();
              }
              separatorIndex = buffer.indexOf('\n\n');
              continue;
            }

            if (event.type === 'error') {
              throw new Error(event.error);
            }

            separatorIndex = buffer.indexOf('\n\n');
          }
        }
      } catch {
        setMessages((previous) =>
          previous.map((message) =>
            message.id === assistantMessageId
              ? {
                ...message,
                content: errorMessage,
                toolUse: undefined,
              }
              : message
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, locale]
  );

  return {
    messages,
    isStreaming,
    sendMessage,
    reset,
    ensureGreeting,
  };
}
