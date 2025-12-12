import { useState } from 'react';
import { X, Lightbulb, Keyboard } from 'lucide-react';

interface HelpBannerProps {
  storageKey: string;
  title: string;
  tips: string[];
  showKeyboardHint?: boolean;
}

export default function HelpBanner({ 
  storageKey, 
  title, 
  tips,
  showKeyboardHint = false 
}: HelpBannerProps) {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(storageKey) === 'true';
  });

  const handleDismiss = () => {
    localStorage.setItem(storageKey, 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-heading font-semibold text-purple-900 dark:text-purple-100">{title}</h3>
          </div>
          <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-200">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          {showKeyboardHint && (
            <div className="mt-3 flex items-center space-x-2 text-xs text-purple-700 dark:text-purple-300">
              <Keyboard className="w-4 h-4" />
              <span>Press <kbd className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/40 rounded">Shift+?</kbd> to see all keyboard shortcuts</span>
            </div>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="ml-4 text-purple-400 dark:text-purple-500 hover:text-purple-600 dark:hover:text-purple-200"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
