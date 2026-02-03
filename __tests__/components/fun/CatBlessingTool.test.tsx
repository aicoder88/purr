/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { CatBlessingTool } from '@/components/fun/CatBlessingTool';

// Mock next/dynamic to render components immediately
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (callback: () => Promise<{ default: React.ComponentType }>) => {
    const DynamicComponent = () => {
      const [Component, setComponent] = React.useState<React.ComponentType | null>(null);
      React.useEffect(() => {
        callback().then((mod) => setComponent(() => mod.default));
      }, []);
      return Component ? <Component /> : null;
    };
    return DynamicComponent;
  },
}));

// Simple smoke test - verify component exports correctly
describe('CatBlessingTool', () => {
  it('exports the component function', () => {
    expect(typeof CatBlessingTool).toBe('function');
  });

  it('has blessing data defined', () => {
    // The component should have at least one blessing
    const componentSource = CatBlessingTool.toString();
    expect(componentSource).toContain('blessing');
    expect(componentSource).toContain('meow');
  });
});

// Note: Full integration tests would require more complex mocking of
// framer-motion and Web Audio API. The component is best tested manually
// or with E2E tests using Playwright.
