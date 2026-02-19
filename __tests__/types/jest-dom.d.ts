// Type declarations for @testing-library/jest-dom
// This file ensures TypeScript recognizes jest-dom matchers

import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(...classNames: string[]): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveTextContent(text: string | RegExp): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toHaveValue(value: string | string[]): R;
      toBeChecked(): R;
      toBePartiallyChecked(): R;
      toHaveFocus(): R;
      toContainElement(element: HTMLElement): R;
      toContainHTML(html: string): R;
      toHaveStyle(css: string | Record<string, unknown>): R;
    }
  }
}

export {};
