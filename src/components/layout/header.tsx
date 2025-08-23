import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Container } from "../../components/ui/container";
import { SITE_NAME } from "../../lib/constants";
import NextImage from "../../../components/NextImage";
import { LanguageSwitcher } from "../../components/ui/language-switcher";
import { useTranslation } from "../../lib/translation-context";
import { ShoppingCart } from "../../components/ui/shopping-cart";
import { ThemeToggle } from "../theme/theme-toggle";
import Image from "next/image";
import { useRouter } from "next/router";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isLearnDropdownOpen, setIsLearnDropdownOpen] = useState(false);
  const { t, locale } = useTranslation();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
      setIsProductsDropdownOpen(false);
      setIsLearnDropdownOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // Navigation items for better organization
  const navigationItems = [
    {
      label: t.nav?.products || 'Products',
      href: `${locale === 'fr' ? '/fr' : ''}/#products`,
      hasDropdown: true,
      dropdownItems: [
        { label: '17g Trial Size', href: `${locale === 'fr' ? '/fr' : ''}/products/trial-size` },
        { label: 'Compare Sizes', href: `${locale === 'fr' ? '/fr' : ''}/products/compare` },
        { label: 'View All Products', href: `${locale === 'fr' ? '/fr' : ''}/#products` }
      ]
    },
    {
      label: t.nav?.learn || 'Learn',
      href: `${locale === 'fr' ? '/fr' : ''}/learn`,
      hasDropdown: true,
      dropdownItems: [
        { label: 'How It Works', href: `${locale === 'fr' ? '/fr' : ''}/learn/how-it-works` },
        { label: 'FAQ', href: `${locale === 'fr' ? '/fr' : ''}/learn/faq` },
        { label: 'Science', href: `${locale === 'fr' ? '/fr' : ''}/learn/science` }
      ]
    },
    {
      label: t.nav?.about || 'About',
      href: `${locale === 'fr' ? '/fr' : ''}/about/our-story`
    },
    {
      label: t.nav?.contact || 'Contact',
      href: `${locale === 'fr' ? '/fr' : ''}/support/contact`
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E0EFC7]/30 dark:border-purple-500/30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/85 dark:supports-[backdrop-filter]:bg-gray-900/85 shadow-lg transition-all duration-300">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/optimized/purrify-logo-text.webp"
                alt="Purrify"
                width={120}
                height={40}
                className="h-8 w-auto dark:brightness-125 dark:contrast-110 filter drop-shadow-sm"
                priority
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.hasDropdown ? (
                  <>
                    <button
                      className="flex items-center text-gray-700 dark:text-gray-200 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors font-medium"
                      data-dropdown
                      onMouseEnter={() => {
                        if (item.label === 'Products') setIsProductsDropdownOpen(true);
                        if (item.label === 'Learn') setIsLearnDropdownOpen(true);
                      }}
                      onMouseLeave={(e) => {
                        const relatedTarget = e.relatedTarget as Element;
                        if (!relatedTarget?.closest('[data-dropdown]')) {
                          setTimeout(() => {
                            if (item.label === 'Products') setIsProductsDropdownOpen(false);
                            if (item.label === 'Learn') setIsLearnDropdownOpen(false);
                          }, 500);
                        }
                      }}
                      onClick={() => {
                        if (item.label === 'Products') setIsProductsDropdownOpen(!isProductsDropdownOpen);
                        if (item.label === 'Learn') setIsLearnDropdownOpen(!isLearnDropdownOpen);
                      }}
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {((item.label === 'Products' && isProductsDropdownOpen) || 
                      (item.label === 'Learn' && isLearnDropdownOpen)) && (
                      <div 
                        className="absolute top-full left-0 mt-1 w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-200/50 dark:border-gray-600/50 z-50"
                        onMouseEnter={() => {
                          if (item.label === 'Products') setIsProductsDropdownOpen(true);
                          if (item.label === 'Learn') setIsLearnDropdownOpen(true);
                        }}
                        onMouseLeave={(e) => {
                          const relatedTarget = e.relatedTarget as Element;
                          if (!relatedTarget?.closest('button') && !relatedTarget?.closest('[data-dropdown]')) {
                            setTimeout(() => {
                              if (item.label === 'Products') setIsProductsDropdownOpen(false);
                              if (item.label === 'Learn') setIsLearnDropdownOpen(false);
                            }, 500);
                          }
                        }}
                        data-dropdown
                      >
                        {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                          <Link
                            key={dropdownIndex}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-[#FF3131] dark:hover:text-[#FF5050] hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors rounded-md mx-1 my-1"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 dark:text-gray-200 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={scrollToProducts}
              className="flex items-center gap-2 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4" />
              Buy Now!
            </Button>
            <LanguageSwitcher />
            <ShoppingCart />
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <ShoppingCart />
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 h-11 w-11 p-0"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[#E0EFC7]/30 dark:border-purple-500/30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item, index) => (
                <div key={index}>
                  {item.hasDropdown ? (
                    <>
                      <div className="px-3 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        {item.label}
                      </div>
                      {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          href={dropdownItem.href}
                          className="block px-6 py-3 min-h-[44px] flex items-center text-gray-700 dark:text-gray-200 hover:text-[#FF3131] dark:hover:text-[#FF5050] hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors font-medium rounded-md mx-2 my-1"
                          onClick={closeMenu}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-3 min-h-[44px] flex items-center text-gray-700 dark:text-gray-200 hover:text-[#FF3131] dark:hover:text-[#FF5050] hover:bg-gray-50/80 dark:hover:bg-gray-700/80 transition-colors font-medium rounded-md mx-2 my-1"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Quick Actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                <Button
                  onClick={() => {
                    scrollToProducts();
                    closeMenu();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Buy Now!
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
