'use client';

import { HeaderWithSuspense } from './header-suspense';
import { Footer } from './footer';
import { SkipNav } from '../ui/skip-nav';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

interface AppLayoutProps {
    children: React.ReactNode;
}

const PawCursor = dynamic(() => import("../ui/paw-cursor").then(mod => ({ default: mod.PawCursor })), { ssr: false });
const ScrollToTopButton = dynamic(() => import("../ui/scroll-to-top"), { ssr: false });
const MobileFloatingCTA = dynamic(() => import("../ui/MobileFloatingCTA").then(mod => ({ default: mod.MobileFloatingCTA })), { ssr: false });

export function AppLayout({ children }: AppLayoutProps) {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    return (
        <div className="flex flex-col min-h-screen">
            <SkipNav />
            {mounted && (
                <>
                    <PawCursor />
                    <ScrollToTopButton />
                    <MobileFloatingCTA />
                </>
            )}
            <HeaderWithSuspense />
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    );
}
