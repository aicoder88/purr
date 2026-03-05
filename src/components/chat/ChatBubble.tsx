'use client';

import type { Locale } from '@/i18n/config';
import { ArticleCard } from '@/components/chat/ArticleCard';
import { ProductCard } from '@/components/chat/ProductCard';
import type { ChatMessage } from '@/components/chat/useChatStream';

interface ChatBubbleProps {
  message: ChatMessage;
  locale: Locale;
  shopNowLabel: string;
  tryAutoshipLabel: string;
  readArticleLabel: string;
  onProductClick?: (productId: string) => void;
}

export function ChatBubble({
  message,
  locale,
  shopNowLabel,
  tryAutoshipLabel,
  readArticleLabel,
  onProductClick,
}: ChatBubbleProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 ${
          isAssistant
            ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
            : 'bg-[#FF3131] text-white dark:text-gray-900'
        }`}
      >
        {message.content ? (
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        ) : null}

        {isAssistant && message.toolUse?.length
          ? message.toolUse.map((tool, index) => {
            if (tool.name === 'recommend_product') {
              return (
                <ProductCard
                  key={`${message.id}-recommend-${index}`}
                  locale={locale}
                  recommendation={tool.input}
                  shopNowLabel={shopNowLabel}
                  tryAutoshipLabel={tryAutoshipLabel}
                  onProductClick={onProductClick}
                />
              );
            }

            return (
              <ArticleCard
                key={`${message.id}-article-${index}`}
                locale={locale}
                article={tool.input}
                readArticleLabel={readArticleLabel}
              />
            );
          })
          : null}
      </div>
    </div>
  );
}
