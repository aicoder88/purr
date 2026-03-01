import { ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Store,
  ShoppingCart,
  Share2,
  LogOut,
  User,
  ExternalLink,
  UserPlus
} from 'lucide-react';

interface OpsLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function OpsLayout({ children, title }: OpsLayoutProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const tabs = [
    { name: 'Dashboard', href: '/admin/ops', icon: LayoutDashboard },
    { name: 'Leads', href: '/admin/ops/leads', icon: Users },
    { name: 'Retailers', href: '/admin/ops/retailers', icon: Store },
    { name: 'Orders', href: '/admin/ops/orders', icon: ShoppingCart },
    { name: 'Social', href: '/admin/ops/social', icon: Share2 },
    { name: 'Affiliates', href: '/admin/ops/affiliates', icon: UserPlus }
  ];

  const userRole = (session?.user as { role?: string })?.role;

  const isActiveTab = (href: string) => {
    if (href === '/admin/ops') {
      return pathname === '/admin/ops';
    }
    return pathname?.startsWith(href) ?? false;
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-gray-900">
      {/* Top Bar */}
      <header className="bg-white bg-gray-800 border-b border-gray-200 border-gray-700 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <Link href="/admin/ops" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-500 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-gray-100 font-bold text-sm">P</span>
                </div>
                <span className="text-xl font-semibold text-gray-900 text-gray-50">Purrify Hub</span>
              </Link>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/blog"
                className="text-sm text-gray-600 text-gray-300 hover:text-gray-900 hover:text-gray-100 flex items-center space-x-1"
              >
                <span>Blog Admin</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link
                href="/"
                target="_blank"
                className="text-sm text-gray-600 text-gray-300 hover:text-gray-900 hover:text-gray-100 flex items-center space-x-1"
              >
                <span>View Site</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 bg-gray-700">
                <User className="w-4 h-4 text-gray-600 text-gray-300" />
                <span className="text-sm font-medium text-gray-900 text-gray-100">
                  {session?.user?.email}
                </span>
                <span className="text-xs text-gray-500 text-gray-400 ml-2 px-2 py-0.5 bg-teal-100 bg-teal-900/30 text-teal-700 text-teal-300 rounded">
                  {userRole}
                </span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 text-gray-300 hover:text-gray-900 hover:text-gray-100 hover:bg-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 -mb-px">
            {tabs.map((tab) => {
              const isActive = isActiveTab(tab.href);
              const Icon = tab.icon;

              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`
                    flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                    ${isActive
                      ? 'border-teal-500 text-teal-600 text-teal-400'
                      : 'border-transparent text-gray-600 text-gray-400 hover:text-gray-900 hover:text-gray-200 hover:border-gray-300 hover:border-gray-600'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {title && (
          <div className="mb-6">
            <h1 className="font-heading text-3xl font-bold text-gray-900 text-gray-50">{title}</h1>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
