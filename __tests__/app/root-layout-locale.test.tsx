import type { ReactElement, ReactNode } from 'react';

const headersMock = jest.fn();
const setRequestLocaleMock = jest.fn();
const getScopedMessagesMock = jest.fn();

jest.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
}));

jest.mock('next/headers', () => ({
  headers: () => headersMock(),
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: (locale: string) => setRequestLocaleMock(locale),
}));

jest.mock('@/i18n/scoped-messages', () => ({
  getScopedMessages: (...args: unknown[]) => getScopedMessagesMock(...args),
}));

jest.mock('../../app/providers', () => ({
  Providers: ({
    children,
  }: {
    children: ReactNode;
    locale: string;
    messages: Record<string, unknown>;
  }) => <>{children}</>,
}));

jest.mock('@/components/layout/AppLayout', () => ({
  AppLayout: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

jest.mock('@/components/performance/DeferredThirdPartyMounts', () => ({
  DeferredThirdPartyMounts: () => null,
}));

describe('RootLayout locale handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    headersMock.mockResolvedValue(new Headers([['x-pathname', '/fr/']]));
    getScopedMessagesMock.mockResolvedValue({
      accessibility: {
        gtmNoscriptTitle: 'Google Tag Manager',
      },
    });
  });

  it('pins the request locale to the active pathname locale', async () => {
    const { default: RootLayout } = await import('../../app/layout');
    const ui = await RootLayout({ children: <div>content</div> }) as ReactElement<{ lang: string }>;

    expect(setRequestLocaleMock).toHaveBeenCalledWith('fr');
    expect(getScopedMessagesMock).toHaveBeenCalledWith('fr', ['root']);
    expect(ui.props.lang).toBe('fr');
  });
});
