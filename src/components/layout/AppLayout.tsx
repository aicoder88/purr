import { HeaderWithSuspense } from './header-suspense';
import { Footer } from './footer';
import { SkipNav } from '../ui/skip-nav';
import { AppChrome } from './AppChrome';

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col overflow-x-clip">
            <SkipNav />
            <AppChrome />
            <HeaderWithSuspense />
            <div className="flex-grow">
                {children}
            </div>
            <div className="cv-auto cis-480">
                <Footer />
            </div>
        </div>
    );
}
