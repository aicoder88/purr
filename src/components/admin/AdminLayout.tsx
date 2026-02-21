import { ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  FolderTree,
  Tag,
  Image as ImageIcon,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  User
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const tabs = [
    { name: 'Posts', href: '/admin/blog', icon: FileText },
    { name: 'Schedule', href: '/admin/blog/schedule', icon: Calendar },
    { name: 'Media', href: '/admin/blog/media', icon: ImageIcon },
    { name: 'Analytics', href: '/admin/blog/analytics', icon: BarChart3 },
    { name: 'Categories', href: '/admin/blog/categories', icon: FolderTree, adminOnly: true },
    { name: 'Tags', href: '/admin/blog/tags', icon: Tag, adminOnly: true },
    { name: 'Settings', href: '/admin/blog/settings', icon: Settings, adminOnly: true }
  ];

  const userRole = session?.user?.role;
  const visibleTabs = tabs.filter(tab => !tab.adminOnly || userRole === 'admin');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Bar */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <Link href="/admin/blog" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 dark:bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white dark:text-gray-100 font-bold text-sm">P</span>
                </div>
                <span className="text-xl font-semibold text-gray-900 dark:text-gray-50">Blog Admin</span>
              </Link>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                View Site
              </Link>
              <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {session?.user?.email}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded">
                  {userRole}
                </span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 -mb-px">
            {visibleTabs.map((tab) => {
              const isActive = pathname === tab.href || 
                (tab.href !== '/admin/blog' && pathname?.startsWith(tab.href));
              const Icon = tab.icon;

              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`
                    flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                    ${isActive
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
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
            <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50">{title}</h1>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
