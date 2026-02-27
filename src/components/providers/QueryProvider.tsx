/**
 * TanStack Query Provider
 * 
 * Provides React Query context for server state management
 * with optimized defaults for Next.js applications.
 */
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 5 minutes
        staleTime: 1000 * 60 * 5,
        // Keep data in cache for 10 minutes
        gcTime: 1000 * 60 * 10,
        // Retry failed requests 2 times
        retry: 2,
        // Don't refetch on window focus (handled by Next.js)
        refetchOnWindowFocus: false,
        // Refetch on reconnect
        refetchOnReconnect: true,
      },
      mutations: {
        // Retry failed mutations once
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
