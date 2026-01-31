'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
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

    return (
        <div className="flex flex-col min-h-screen">
            <PawCursor />
            <ScrollToTopButton />
            <MobileFloatingCTA isAppRouter={true} />
            {!hideHeader && <Header isAppRouter={true} />}
            <main className="flex-grow">{children}</main>
            {!hideFooter && <Footer />}
        </div>
    );
}
