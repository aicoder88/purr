'use client'

import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export type AutoSaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export interface AutoSaveState {
  status: AutoSaveStatus;
  lastSaved: Date | null;
  error: string | null;
  pendingChanges: boolean;
}

interface AutoSaveIndicatorProps {
  state: AutoSaveState;
}

export default function AutoSaveIndicator({ state }: AutoSaveIndicatorProps) {
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    // Update every second
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getTimeSince = (date: Date): string => {
    const seconds = Math.floor((currentTime - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  if (state.status === 'saving') {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Saving...</span>
      </div>
    );
  }

  if (state.status === 'saved' && state.lastSaved) {
    return (
      <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
        <Check className="w-4 h-4" />
        <span>Saved at {formatTime(state.lastSaved)}</span>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="flex items-center space-x-2 text-sm text-red-600 dark:text-red-400">
        <AlertCircle className="w-4 h-4" />
        <span>Save failed - Draft in localStorage</span>
      </div>
    );
  }

  if (state.lastSaved) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Saved {getTimeSince(state.lastSaved)}
      </div>
    );
  }

  return null;
}
