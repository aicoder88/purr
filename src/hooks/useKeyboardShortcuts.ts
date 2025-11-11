import { useEffect } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;
        const metaMatch = shortcut.meta ? event.metaKey : !event.metaKey;

        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          ctrlMatch &&
          shiftMatch &&
          altMatch &&
          metaMatch
        ) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
}

// Common shortcuts
export const SHORTCUTS = {
  SAVE: { key: 's', ctrl: true, description: 'Save' },
  SAVE_AND_PUBLISH: { key: 's', ctrl: true, shift: true, description: 'Save and Publish' },
  PREVIEW: { key: 'p', ctrl: true, description: 'Preview' },
  ESCAPE: { key: 'Escape', description: 'Close/Cancel' },
  SEARCH: { key: 'k', ctrl: true, description: 'Search' },
  NEW_POST: { key: 'n', ctrl: true, description: 'New Post' },
  HELP: { key: '?', shift: true, description: 'Show Shortcuts' }
};
