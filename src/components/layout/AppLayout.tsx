'use client';

import { usePathname } from 'next/navigation';
import { HeaderWithSuspense } from './header-suspense';
import { Footer } from './footer';
import { SkipNav } from '../ui/skip-nav';
import dynamic from 'next/dynamic';

interface AppLayoutProps {
    children: React.ReactNode;
}

const PawCursor = dynamic(() => import("../ui/paw-cursor").then(mod => ({ default: mod.PawCursor })), { ssr: false });
const ScrollToTopButton = dynamic(() => import("../ui/scroll-to-top"), { ssr: false });
const MobileFloatingCTA = dynamic(() => import("../ui/MobileFloatingCTA").then(mod => ({ default: mod.MobileFloatingCTA })), { ssr: false });

export function AppLayout({ children }: AppLayoutProps) {
    const pathname = usePathname();
    const hideFooter = pathname === '/invest' || pathname === '/dn';
    const hideHeader = pathname === '/dn';

    // Disable specialty effects on small screens for better performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <div className="flex flex-col min-h-screen">
            <SkipNav />
            {!isMobile && <PawCursor />}
            <ScrollToTopButton />
            <MobileFloatingCTA />
            {!hideHeader && <HeaderWithSuspense />}
            <main id="main-content" className="flex-grow">{children}</main>
            {!hideFooter && <Footer />}
        </div>
    );
}
