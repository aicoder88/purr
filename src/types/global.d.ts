// Google Analytics gtag interface - flexible for all gtag events
interface GtagEvent {
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameter?: string;
  custom_parameter_1?: string;
  custom_parameters?: Record<string, unknown>;
  enhanced_conversions?: boolean;
  send_to?: string;
  items?: Array<{
    item_id: string;
    item_name: string;
    quantity: number;
    price: number;
  }>;
  [key: string]: unknown; // Allow any additional properties
}

declare global {
  interface Window {
    hj?: (command: string, ...args: unknown[]) => void;
    clarity?: (command: string, ...args: unknown[]) => void;
    FS?: {
      event: (name: string, payload?: Record<string, unknown>) => void;
      identify: (userId: string, userProperties?: Record<string, unknown>) => void;
      setUserVars: (properties: Record<string, unknown>) => void;
    };
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId?: string,
      config?: GtagEvent
    ) => void;
    dataLayer?: unknown[];
  }
}

// This is necessary to make the file a module
export {};
