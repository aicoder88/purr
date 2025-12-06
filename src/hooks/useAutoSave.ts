import { useState, useEffect, useCallback, useRef } from 'react';
import type { AutoSaveState, AutoSaveStatus } from '@/components/admin/AutoSaveIndicator';

interface UseAutoSaveOptions {
  onSave: () => Promise<void>;
  delay?: number; // milliseconds
  localStorageKey?: string;
}

export function useAutoSave<T = unknown>({
  onSave,
  delay = 30000, // 30 seconds default
  localStorageKey
}: UseAutoSaveOptions) {
  const [state, setState] = useState<AutoSaveState>({
    status: 'idle',
    lastSaved: null,
    error: null,
    pendingChanges: false
  });

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const savedIndicatorTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const updateStatus = useCallback((status: AutoSaveStatus, error: string | null = null) => {
    setState(prev => ({
      ...prev,
      status,
      error,
      lastSaved: status === 'saved' ? new Date() : prev.lastSaved,
      pendingChanges: prev.pendingChanges
    }));

    // Clear "saved" indicator after 3 seconds
    if (status === 'saved') {
      if (savedIndicatorTimeoutRef.current) {
        clearTimeout(savedIndicatorTimeoutRef.current);
      }
      savedIndicatorTimeoutRef.current = setTimeout(() => {
        setState(prev => ({
          ...prev,
          status: 'idle'
        }));
      }, 3000);
    }
  }, []);

  const performSave = useCallback(async () => {
    try {
      updateStatus('saving');
      await onSave();
      updateStatus('saved');
      setState(prev => ({ ...prev, pendingChanges: false }));
    } catch (error) {
      console.error('Auto-save failed:', error);
      updateStatus('error', error instanceof Error ? error.message : 'Unknown error');
    }
  }, [onSave, updateStatus]);

  const triggerAutoSave = useCallback(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set pending changes
    setState(prev => ({ ...prev, pendingChanges: true }));

    // Schedule auto-save
    timeoutRef.current = setTimeout(() => {
      performSave();
    }, delay);
  }, [delay, performSave]);

  const saveNow = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    await performSave();
  }, [performSave]);

  const saveToLocalStorage = useCallback((data: T) => {
    if (localStorageKey) {
      try {
        localStorage.setItem(localStorageKey, JSON.stringify({
          data,
          timestamp: new Date().toISOString()
        }));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    }
  }, [localStorageKey]);

  const loadFromLocalStorage = useCallback((): T | null => {
    if (localStorageKey) {
      try {
        const stored = localStorage.getItem(localStorageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          return parsed.data;
        }
      } catch (error) {
        console.error('Failed to load from localStorage:', error);
      }
    }
    return null;
  }, [localStorageKey]);

  const clearLocalStorage = useCallback(() => {
    if (localStorageKey) {
      localStorage.removeItem(localStorageKey);
    }
  }, [localStorageKey]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (savedIndicatorTimeoutRef.current) {
        clearTimeout(savedIndicatorTimeoutRef.current);
      }
    };
  }, []);

  return {
    state,
    triggerAutoSave,
    saveNow,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage
  };
}
