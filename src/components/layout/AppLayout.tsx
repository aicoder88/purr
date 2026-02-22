'use client';

import { HeaderWithSuspense } from './header-suspense';
import { Footer } from './footer';
import { SkipNav } from '../ui/skip-nav';
import { LaserCursor } from '../ui/paw-cursor';
import ScrollToTopButton from '../ui/scroll-to-top';
import { MobileFloatingCTA } from '../ui/MobileFloatingCTA';
import { StockAlertBanner } from './stock-alert-banner';

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col overflow-x-clip">
            <SkipNav />
            <LaserCursor />
            <ScrollToTopButton />
            <MobileFloatingCTA />
            <HeaderWithSuspense />
            <StockAlertBanner />
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    );
}
