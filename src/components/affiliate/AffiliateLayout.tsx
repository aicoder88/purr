import { ReactNode, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import {
  LayoutDashboard,
  Link as LinkIcon,
  BarChart3,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Copy,
  Check,
  Image
} from 'lucide-react';

interface AffiliateLayoutProps {
  children: ReactNode;
}

export default function AffiliateLayout({ children }: AffiliateLayoutProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const uiCopy =
    locale === 'fr'
      ? { affiliateTitle: 'Affilie Purrify', viewSite: 'Voir le site' }
      : { affiliateTitle: 'Purrify Affiliate', viewSite: 'View Site' };

  const affiliateCode = (session?.user as { affiliateCode?: string })?.affiliateCode || '';

  const navigation = [
    {
      name: t('affiliateDashboard.dashboard') || 'Dashboard',
      href: '/affiliate/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: t('affiliateDashboard.stats.totalClicks') ? 'Links' : 'Links',
      href: '/affiliate/dashboard/links',
      icon: LinkIcon,
    },
    {
      name: 'Stats',
      href: '/affiliate/dashboard/stats',
      icon: BarChart3,
    },
    {
      name: t('affiliateDashboard.assets.title') || 'Assets',
      href: '/affiliate/dashboard/assets',
      icon: Image,
    },
    {
      name: t('affiliateDashboard.payouts') || 'Payouts',
      href: '/affiliate/dashboard/payouts',
      icon: DollarSign,
    },
    {
      name: t('affiliateDashboard.settings') || 'Settings',
      href: '/affiliate/dashboard/settings',
      icon: Settings,
    },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/affiliate/dashboard') {
      return pathname === '/affiliate/dashboard';
    }
    return pathname?.startsWith(href) ?? false;
  };

  const copyCode = async () => {
    if (affiliateCode) {
      await navigator.clipboard.writeText(affiliateCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/affiliate/login' });
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white bg-gray-800 border-b border-gray-200 border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/affiliate/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-gray-100 font-bold text-sm">P</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 text-gray-100">
              {uiCopy.affiliateTitle}
            </span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 text-gray-300 hover:bg-gray-100 hover:bg-gray-700 rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 border-gray-700 bg-white bg-gray-800 py-2">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                        ? 'bg-purple-100 bg-purple-900/30 text-purple-700 text-purple-300'
                        : 'text-gray-700 text-gray-300 hover:bg-gray-100 hover:bg-gray-700'
                      }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 text-gray-300 hover:bg-gray-100 hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                {t('affiliateDashboard.logout') || 'Sign Out'}
              </button>
            </nav>
          </div>
        )}
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white bg-gray-800 border-r border-gray-200 border-gray-700">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200 border-gray-700">
            <Link href="/affiliate/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-gray-100 font-bold text-sm">P</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 text-gray-100">
                {uiCopy.affiliateTitle}
              </span>
            </Link>
          </div>

          {/* Affiliate Code */}
          <div className="px-4 py-4 border-b border-gray-200 border-gray-700">
            <p className="text-xs text-gray-500 text-gray-400 uppercase tracking-wider mb-1">
              {t('affiliateDashboard.overview.yourCode') || 'Your Code'}
            </p>
            <button
              onClick={copyCode}
              className="flex items-center justify-between w-full px-3 py-2 bg-gray-100 bg-gray-700 rounded-lg hover:bg-gray-200 hover:bg-gray-600 transition-colors group"
            >
              <code className="text-sm font-mono text-purple-600 text-purple-400">
                {affiliateCode}
              </code>
              {codeCopied ? (
                <Check className="w-4 h-4 text-green-500 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400 text-gray-500 group-hover:text-gray-600 group-hover:text-gray-300" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                      ? 'bg-purple-100 bg-purple-900/30 text-purple-700 text-purple-300'
                      : 'text-gray-700 text-gray-300 hover:bg-gray-100 hover:bg-gray-700'
                    }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200 border-gray-700">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-purple-100 bg-purple-900/30 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-purple-400 font-semibold">
                  {session?.user?.name?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 text-gray-100 truncate">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-gray-500 text-gray-400 truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link
                href="/"
                target="_blank"
                className="flex-1 flex items-center justify-center px-3 py-2 text-xs text-gray-600 text-gray-300 hover:bg-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                {uiCopy.viewSite}
              </Link>
              <button
                onClick={handleSignOut}
                className="flex-1 flex items-center justify-center px-3 py-2 text-xs text-gray-600 text-gray-300 hover:bg-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <LogOut className="w-3 h-3 mr-1" />
                {t('affiliateDashboard.logout') || 'Sign Out'}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
