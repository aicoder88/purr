// Global type declarations for optimization libraries

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      load: (pixelId: string) => void;
      page: () => void;
      track: (event: string, data?: Record<string, unknown>) => void;
    };
    dataLayer?: Array<Record<string, unknown>>;
  }

  interface CSSStyleDeclaration {
    webkitOverflowScrolling?: string;
  }

  interface Navigator {
    vibrate?: (pattern: number | number[]) => boolean;
  }
}

export {};