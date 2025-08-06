declare global {
  interface Window {
    hj?: (command: string, ...args: unknown[]) => void;
    clarity?: (command: string, ...args: unknown[]) => void;
    FS?: {
      event: (name: string, payload?: Record<string, unknown>) => void;
      identify: (userId: string, userProperties?: Record<string, unknown>) => void;
      setUserVars: (properties: Record<string, unknown>) => void;
    };
  }
}

// This is necessary to make the file a module
export {};
