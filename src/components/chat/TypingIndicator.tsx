'use client';

interface TypingIndicatorProps {
  label: string;
}

export function TypingIndicator({ label }: TypingIndicatorProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
      <span className="sr-only">{label}</span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 dark:bg-gray-400 [animation-delay:-0.3s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 dark:bg-gray-400 [animation-delay:-0.15s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 dark:bg-gray-400" />
    </div>
  );
}
