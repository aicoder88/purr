'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, MapPin, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

interface DropdownItem {
  label: string;
  href?: string;
  isGroupHeader?: boolean;
  indent?: boolean;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

interface HeaderMobileMenuProps {
  navigationItems: NavigationItem[];
  findStoreHref: string;
  findStoreLabel: string;
  toggleMenuLabel: string;
}

const mobileDropdownLinkBase =
  'mx-2 my-0.5 flex min-h-[44px] items-center rounded-md py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-pink dark:bg-gray-900/80 dark:text-gray-200 dark:hover:bg-gray-700/80 dark:hover:text-brand-pink-400';

export function HeaderMobileMenu({
  navigationItems,
  findStoreHref,
  findStoreLabel,
  toggleMenuLabel,
}: HeaderMobileMenuProps) {
  const mobileMenuId = 'mobile-navigation-menu';
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setExpandedMobileSection(null);
  }, [pathname]);

  function toggleMenu() {
    setIsMenuOpen((current) => !current);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleSection(sectionId: string) {
    setExpandedMobileSection((current) => (current === sectionId ? null : sectionId));
  }

  return (
    <>
      <div className="flex items-center space-x-1 md:hidden">
        <LanguageSwitcher />
        <Button
          variant="ghost"
          size="icon"
          className="ml-1 h-11 w-11 p-0"
          onClick={toggleMenu}
          aria-label={toggleMenuLabel}
          aria-controls={mobileMenuId}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isMenuOpen ? (
        <div
          id={mobileMenuId}
          className="absolute inset-x-0 top-full border-t border-brand-green-light/30 bg-white shadow-lg backdrop-blur-md dark:border-purple-500/30 dark:bg-gray-900/95 md:hidden"
        >
          <div className="max-h-[80vh] overflow-y-auto px-2 pb-3 pt-2">
            {navigationItems.map((item) => (
              <div key={item.id}>
                {item.hasDropdown ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleSection(item.id)}
                      className="mx-1 flex min-h-[44px] w-full items-center justify-between rounded-md px-3 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-pink dark:text-gray-200 dark:hover:bg-gray-700/80 dark:hover:text-brand-pink-400"
                      aria-expanded={expandedMobileSection === item.id}
                    >
                      <span className="uppercase tracking-wider">{item.label}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${expandedMobileSection === item.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expandedMobileSection === item.id ? (
                      <div className="space-y-0.5 pb-2 pl-2">
                        {item.dropdownItems?.map((dropdownItem) =>
                          dropdownItem.isGroupHeader ? (
                            <div
                              key={dropdownItem.label}
                              className="mt-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              {dropdownItem.label}
                            </div>
                          ) : (
                            <Link
                              key={dropdownItem.label}
                              href={dropdownItem.href || ''}
                              prefetch={false}
                              className={`${mobileDropdownLinkBase} ${dropdownItem.indent ? 'pl-8' : 'px-6'} font-medium`}
                              onClick={closeMenu}
                            >
                              {dropdownItem.label}
                            </Link>
                          ),
                        )}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="mx-2 my-1 flex min-h-[44px] items-center rounded-md px-3 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-pink dark:bg-gray-900/80 dark:text-gray-200 dark:hover:bg-gray-700/80 dark:hover:text-brand-pink-400"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="mt-2 space-y-2 border-t border-gray-200 pt-2 dark:border-gray-700">
              <Button
                asChild
                className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-brand-pink to-brand-pink/80 font-semibold text-white shadow-md transition-all duration-200 hover:from-brand-pink/90 hover:to-brand-pink hover:shadow-lg dark:from-brand-pink-700 dark:to-brand-pink-600 dark:hover:from-brand-pink-800 dark:hover:to-brand-pink-700"
              >
                <Link href={findStoreHref} prefetch={false} onClick={closeMenu}>
                  <MapPin className="h-4 w-4" />
                  {findStoreLabel}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
