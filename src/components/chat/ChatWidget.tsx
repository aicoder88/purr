'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, SendHorizontal, Sparkles, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { gtmEvent } from '@/lib/gtm-events';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { useChatStream } from '@/components/chat/useChatStream';

const EXCLUDED_ROUTE_PREFIXES = ['/admin', '/retailer', '/affiliate'] as const;

function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|fr)(?=\/|$)/, '');
  return stripped.length > 0 ? stripped : '/';
}

export default function ChatWidget() {
  const t = useTranslations();
  const locale = useLocale() === 'fr' ? 'fr' : 'en';
  const pathname = usePathname() || '/';
  const normalizedPath = useMemo(() => stripLocalePrefix(pathname), [pathname]);

  const [isOpen, setIsOpen] = useState(false);
  const [isFabVisible, setIsFabVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [draft, setDraft] = useState('');

  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const trackedRecommendationsRef = useRef<Set<string>>(new Set());

  const { messages, isStreaming, sendMessage, ensureGreeting } = useChatStream(locale);

  const isExcludedRoute = EXCLUDED_ROUTE_PREFIXES.some((prefix) =>
    normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`)
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (isExcludedRoute) {
      setIsOpen(false);
      setIsFabVisible(false);
      return;
    }

    const isPriorityPath = normalizedPath === '/' || normalizedPath.startsWith('/products');
    const delayMs = isPriorityPath ? 1000 : 3000;

    setIsFabVisible(false);
    const timer = window.setTimeout(() => {
      setIsFabVisible(true);
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [isExcludedRoute, normalizedPath]);

  useEffect(() => {
    ensureGreeting(t('chat.greeting'));
  }, [ensureGreeting, t]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) {
        return;
      }

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute('aria-hidden'));

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !scrollContainerRef.current) {
      return;
    }

    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
  }, [isOpen, messages, isStreaming]);

  useEffect(() => {
    for (const message of messages) {
      if (message.role !== 'assistant' || !message.toolUse) {
        continue;
      }

      for (const tool of message.toolUse) {
        if (tool.name !== 'recommend_product') {
          continue;
        }

        const trackingKey = `${message.id}:${tool.input.product_id}`;
        if (trackedRecommendationsRef.current.has(trackingKey)) {
          continue;
        }

        trackedRecommendationsRef.current.add(trackingKey);
        gtmEvent('chat_product_recommended', {
          locale,
          product_id: tool.input.product_id,
        });
      }
    }
  }, [locale, messages]);

  const openChat = () => {
    setIsOpen(true);
    gtmEvent('chat_open', {
      locale,
      path: normalizedPath,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draft.trim();
    if (text.length === 0 || isStreaming) {
      return;
    }

    setDraft('');
    gtmEvent('chat_message_sent', {
      locale,
      message_length: text.length,
    });
    await sendMessage(text, t('chat.errorMessage'));
  };

  if (isExcludedRoute) {
    return null;
  }

  return (
    <>
      {!isOpen && isFabVisible ? (
        <button
          type="button"
          aria-label={t('chat.fabAriaLabel')}
          onClick={openChat}
          className={`fixed bottom-36 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-xl ring-1 ring-gray-900/10 transition-all hover:bg-black ${prefersReducedMotion
              ? ''
              : 'translate-y-0 opacity-100 duration-300 hover:-translate-y-0.5 hover:shadow-2xl'
            } dark:bg-white dark:text-gray-900 dark:ring-white/10 dark:hover:bg-gray-50 md:bottom-6 md:right-6`}
        >
          <Sparkles className="h-4 w-4 text-[#FF3131]" aria-hidden="true" />
          <span>{t('chat.fabLabel')}</span>
        </button>
      ) : null}

      {isOpen ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t('chat.panelTitle')}
          className={`fixed inset-x-2 bottom-2 z-50 flex h-[60vh] max-h-[60vh] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 md:inset-x-auto md:bottom-4 md:right-4 md:h-[500px] md:max-h-[500px] md:w-[400px] ${prefersReducedMotion ? '' : 'animate-in slide-in-from-bottom-4 duration-300'
            }`}
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-gray-700 dark:text-gray-300" aria-hidden="true" />
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t('chat.panelTitle')}</p>
            </div>
            <button
              type="button"
              aria-label={t('chat.closeAriaLabel')}
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div ref={scrollContainerRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message}
                locale={locale}
                shopNowLabel={t('chat.shopNow')}
                tryAutoshipLabel={t('chat.tryAutoship')}
                readArticleLabel={t('chat.readArticle')}
                onProductClick={(productId) =>
                  gtmEvent('chat_product_clicked', {
                    locale,
                    product_id: productId,
                  })
                }
              />
            ))}
            {isStreaming ? <TypingIndicator label={t('chat.typingLabel')} /> : null}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-gray-200 px-3 py-3 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={t('chat.inputPlaceholder')}
                disabled={isStreaming}
                className="h-10 flex-1 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-gray-400"
              />
              <Button type="submit" size="icon" disabled={isStreaming || draft.trim().length === 0} aria-label={t('chat.sendAriaLabel')}>
                <SendHorizontal className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{t('chat.poweredBy')}</p>
          </form>
        </div>
      ) : null}
    </>
  );
}
