import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ShoppingBag,
  ChevronDown,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Container } from "../../components/ui/container";
import { LanguageSwitcher } from "../../components/ui/language-switcher";
import { useTranslation } from "../../lib/translation-context";
import { ThemeToggle } from "../theme/theme-toggle";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isRetailersDropdownOpen, setIsRetailersDropdownOpen] = useState(false);
  const [isLearnDropdownOpen, setIsLearnDropdownOpen] = useState(false);
  const { t, locale } = useTranslation();
  const router = useRouter();
  const headerRef = useRef<HTMLElement | null>(null);
  const { data: session } = useSession();

  // Shared handlers to avoid recreating inline functions in JSX
  const handleNavMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const id = (e.currentTarget.dataset.menuId as string) || "";
      if (id === "products") {
        setIsProductsDropdownOpen(true);
        setIsRetailersDropdownOpen(false);
        setIsLearnDropdownOpen(false);
      } else if (id === "retailers") {
        setIsProductsDropdownOpen(false);
        setIsRetailersDropdownOpen(true);
        setIsLearnDropdownOpen(false);
      } else if (id === "learn") {
        setIsProductsDropdownOpen(false);
        setIsRetailersDropdownOpen(false);
        setIsLearnDropdownOpen(true);
      }
    },
    [],
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const id = (e.currentTarget.dataset.menuId as string) || "";
      if (id === "products") {
        const next = !isProductsDropdownOpen;
        setIsProductsDropdownOpen(next);
        if (next) {
          setIsRetailersDropdownOpen(false);
          setIsLearnDropdownOpen(false);
        }
      } else if (id === "retailers") {
        const next = !isRetailersDropdownOpen;
        setIsRetailersDropdownOpen(next);
        if (next) {
          setIsProductsDropdownOpen(false);
          setIsLearnDropdownOpen(false);
        }
      } else if (id === "learn") {
        const next = !isLearnDropdownOpen;
        setIsLearnDropdownOpen(next);
        if (next) {
          setIsProductsDropdownOpen(false);
          setIsRetailersDropdownOpen(false);
        }
      }
    },
    [isProductsDropdownOpen, isRetailersDropdownOpen, isLearnDropdownOpen],
  );

  const handleNavKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const id = (e.currentTarget.dataset.menuId as string) || "";
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        // Delegate to click handler for toggling
        // Create a synthetic event object compatible with handleNavClick
        handleNavClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
      }
      if (e.key === "Escape") {
        if (id === "products") setIsProductsDropdownOpen(false);
        if (id === "retailers") setIsRetailersDropdownOpen(false);
        if (id === "learn") setIsLearnDropdownOpen(false);
      }
    },
    [handleNavClick],
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const scrollToProducts = useCallback(() => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  }, [closeMenu]);

  const handleBuyNowMobile = useCallback(() => {
    scrollToProducts();
    closeMenu();
  }, [scrollToProducts, closeMenu]);

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
      setIsProductsDropdownOpen(false);
      setIsRetailersDropdownOpen(false);
      setIsLearnDropdownOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  // Close any open dropdown when clicking outside the header
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Only close if clicking completely outside the header
      if (headerRef.current && !headerRef.current.contains(target)) {
        setIsProductsDropdownOpen(false);
        setIsRetailersDropdownOpen(false);
        setIsLearnDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Navigation items for better organization
  const navigationItems: NavigationItem[] = [
    {
      id: "products",
      label: t.nav?.products || "Products",
      href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/#products`,
      hasDropdown: true,
      dropdownItems: [
        {
          label: t.nav?.trialSize || "12g Trial Size",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/products/trial-size`,
        },
        {
          label: t.nav?.compareSizes || "Compare Sizes",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/products/compare`,
        },
        {
          label: t.nav?.viewAllProducts || "View All Products",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/#products`,
        },
      ],
    },
    {
      id: "retailers",
      label: t.nav?.retailers || "For Retailers",
      href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/retailers`,
      hasDropdown: true,
      dropdownItems: [
        {
          label: t.nav?.retailers || "For Retailers",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/retailers`,
        },
        {
          label: t.nav?.wholesalePricing || "Wholesale Pricing",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/retailers#wholesale-pricing`,
        },
        {
          label: t.nav?.becomePartner || "Become a Partner",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/retailers#retailer-contact`,
        },
        {
          label: t.nav?.marketingSupport || "Marketing Support",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/retailers#marketing-support`,
        },
      ],
    },
    {
      id: "learn",
      label: t.nav?.learn || "Learn",
      href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn`,
      hasDropdown: true,
      dropdownItems: [
        {
          label: t.nav?.howItWorksPage || "How It Works",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/how-it-works`,
        },
        {
          label: t.nav?.faq || "FAQ",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/faq`,
        },
        {
          label: t.nav?.science || "Science",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/science`,
        },
        {
          label: "Safety Info",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/safety`,
        },
        {
          label: "Activated Carbon Benefits",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/activated-carbon-benefits`,
        },
        {
          label: "Cat Litter Guide",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/cat-litter-guide`,
        },
        {
          label: "How to Use",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/how-to-use-deodorizer`,
        },
        {
          label: "Technology Comparison",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/activated-carbon-vs-baking-soda-deodorizers`,
        },
        { label: "Solutions", isGroupHeader: true },
        {
          label: "Ammonia Smell Control",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/solutions/ammonia-smell-cat-litter`,
          indent: true,
        },
        {
          label: "Apartment Living",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/solutions/apartment-cat-smell-solution`,
          indent: true,
        },
        {
          label: "Litter Box Odor",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/solutions/litter-box-smell-elimination`,
          indent: true,
        },
        {
          label: "Multiple Cats",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/solutions/multiple-cats-odor-control`,
          indent: true,
        },
        {
          label: "Natural Additive",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/solutions/natural-cat-litter-additive`,
          indent: true,
        },
        {
          label: "Senior Cats",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/solutions/senior-cat-litter-solutions`,
          indent: true,
        },
      ],
    },
    {
      id: "about",
      label: t.nav?.about || "About",
      href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/about/our-story`,
    },
  ];

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-brand-green-light/30 dark:border-purple-500/30 bg-white dark:bg-gray-800/90 dark:bg-gray-900/90 backdrop-blur-md supports-[backdrop-filter]:bg-white dark:bg-gray-800/85 dark:supports-[backdrop-filter]:bg-gray-900/85 shadow-lg transition-all duration-300"
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 flex-shrink-0"
            >
              <Image
                src="/optimized/logo-text-240.webp"
                alt="Purrify - Premium Activated Carbon Cat Litter Additive - Home"
                width={120}
                height={40}
                priority
                unoptimized
                className="h-8 w-auto filter drop-shadow-sm transition-all duration-300 dark:hidden"
              />
              <Image
                src="/optimized/purrify-dark-mode-logo.webp"
                alt="Purrify - Premium Activated Carbon Cat Litter Additive - Home"
                width={120}
                height={40}
                priority
                unoptimized
                className="h-8 w-auto filter drop-shadow-sm transition-all duration-300 hidden dark:block"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.hasDropdown ? (
                  <>
                    <button
                      id={`dropdown-${item.id}`}
                      className="flex items-center text-gray-700 dark:text-gray-200 hover:text-brand-red dark:hover:text-brand-red-400 focus:text-brand-red dark:focus:text-brand-red-400 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-red-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 rounded-sm"
                      data-dropdown
                      data-menu-id={item.id}
                      aria-expanded={
                        (item.id === "products" && isProductsDropdownOpen) ||
                        (item.id === "retailers" && isRetailersDropdownOpen) ||
                        (item.id === "learn" && isLearnDropdownOpen)
                          ? "true"
                          : "false"
                      }
                      aria-haspopup="true"
                      onMouseEnter={handleNavMouseEnter}
                      // Do not auto-dismiss on mouse leave
                      onClick={handleNavClick}
                      onKeyDown={handleNavKeyDown}
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {((item.id === "products" && isProductsDropdownOpen) ||
                      (item.id === "retailers" && isRetailersDropdownOpen) ||
                      (item.id === "learn" && isLearnDropdownOpen)) && (
                      <div
                        className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-200 dark:border-gray-600/50 z-50 w-64 max-h-96 overflow-y-auto p-2"
                        role="menu"
                        aria-labelledby={`dropdown-${item.id}`}
                        data-dropdown
                      >
                        {item.dropdownItems?.map((dropdownItem) =>
                          dropdownItem.isGroupHeader ? (
                            <div
                              key={dropdownItem.label}
                              className="px-4 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2 first:mt-0"
                            >
                              {dropdownItem.label}
                            </div>
                          ) : (
                            <Link
                              key={dropdownItem.label}
                              href={dropdownItem.href || ""}
                              className={`block py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-brand-red dark:hover:text-brand-red-400 focus:text-brand-red dark:focus:text-brand-red-400 hover:bg-gray-50 dark:bg-gray-900/80 dark:hover:bg-gray-700/80 focus:bg-gray-50 dark:focus:bg-gray-700/80 transition-colors rounded-md mx-1 my-0.5 focus:outline-none focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-red-400 focus:ring-offset-1 ${dropdownItem.indent ? "pl-6" : "px-4"}`}
                              role="menuitem"
                            >
                              {dropdownItem.label}
                            </Link>
                          ),
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 dark:text-gray-200 hover:text-brand-red dark:hover:text-brand-red-400 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            {session?.user && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <UserIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {session.user.email}
                </span>
              </div>
            )}
            {session?.user && (
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                variant="ghost"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            )}
            <Button
              onClick={scrollToProducts}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-red to-brand-red/80 hover:from-brand-red/90 hover:to-brand-red text-white dark:text-white dark:text-gray-100 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4" />
              {t.nav?.buyNow || "Buy Now!"}
            </Button>
            <LanguageSwitcher />
          </div>

          <div className="flex md:hidden items-center space-x-1">
            <ThemeToggle />
            {session?.user && (
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                variant="ghost"
                size="icon"
                className="h-11 w-11 p-0"
                aria-label="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
            <LanguageSwitcher />
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
          <div className="md:hidden border-t border-brand-green-light/30 dark:border-purple-500/30 bg-white dark:bg-gray-800/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.id}>
                  {item.hasDropdown ? (
                    <>
                      <div className="px-3 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        {item.label}
                      </div>
                      {item.dropdownItems?.map((dropdownItem) =>
                        dropdownItem.isGroupHeader ? (
                          <div
                            key={dropdownItem.label}
                            className="px-4 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2"
                          >
                            {dropdownItem.label}
                          </div>
                        ) : (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href || ""}
                            className={`block py-3 min-h-[44px] flex items-center text-gray-700 dark:text-gray-200 hover:text-brand-red dark:hover:text-brand-red-400 hover:bg-gray-50 dark:bg-gray-900/80 dark:hover:bg-gray-700/80 transition-colors font-medium rounded-md mx-2 my-1 ${dropdownItem.indent ? "pl-8" : "px-6"}`}
                            onClick={closeMenu}
                          >
                            {dropdownItem.label}
                          </Link>
                        ),
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-3 min-h-[44px] flex items-center text-gray-700 dark:text-gray-200 hover:text-brand-red dark:hover:text-brand-red-400 hover:bg-gray-50 dark:bg-gray-900/80 dark:hover:bg-gray-700/80 transition-colors font-medium rounded-md mx-2 my-1"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Quick Actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 space-y-2">
                {session?.user && (
                  <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <UserIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        {session.user.email}
                      </span>
                    </div>
                    <Button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      variant="ghost"
                      className="w-full flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                )}
                <Button
                  onClick={handleBuyNowMobile}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-red to-brand-red/80 hover:from-brand-red/90 hover:to-brand-red text-white dark:text-white dark:text-gray-100 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {t.nav?.buyNow || "Buy Now!"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
