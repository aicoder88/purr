'use client';
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ShoppingBag,
  ChevronDown,
  LogOut,
  User as UserIcon,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslation } from "@/lib/translation-context";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
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
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const { t, locale } = useTranslation();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
        setIsAboutDropdownOpen(false);
      } else if (id === "retailers") {
        setIsProductsDropdownOpen(false);
        setIsRetailersDropdownOpen(true);
        setIsLearnDropdownOpen(false);
        setIsAboutDropdownOpen(false);
      } else if (id === "learn") {
        setIsProductsDropdownOpen(false);
        setIsRetailersDropdownOpen(false);
        setIsLearnDropdownOpen(true);
        setIsAboutDropdownOpen(false);
      } else if (id === "about") {
        setIsProductsDropdownOpen(false);
        setIsRetailersDropdownOpen(false);
        setIsLearnDropdownOpen(false);
        setIsAboutDropdownOpen(true);
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
          setIsAboutDropdownOpen(false);
        }
      } else if (id === "retailers") {
        const next = !isRetailersDropdownOpen;
        setIsRetailersDropdownOpen(next);
        if (next) {
          setIsProductsDropdownOpen(false);
          setIsLearnDropdownOpen(false);
          setIsAboutDropdownOpen(false);
        }
      } else if (id === "learn") {
        const next = !isLearnDropdownOpen;
        setIsLearnDropdownOpen(next);
        if (next) {
          setIsProductsDropdownOpen(false);
          setIsRetailersDropdownOpen(false);
          setIsAboutDropdownOpen(false);
        }
      } else if (id === "about") {
        const next = !isAboutDropdownOpen;
        setIsAboutDropdownOpen(next);
        if (next) {
          setIsProductsDropdownOpen(false);
          setIsRetailersDropdownOpen(false);
          setIsLearnDropdownOpen(false);
        }
      }
    },
    [isProductsDropdownOpen, isRetailersDropdownOpen, isLearnDropdownOpen, isAboutDropdownOpen],
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
        if (id === "about") setIsAboutDropdownOpen(false);
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

  // Close mobile menu when pathname changes (route change detection)
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProductsDropdownOpen(false);
    setIsRetailersDropdownOpen(false);
    setIsLearnDropdownOpen(false);
    setIsAboutDropdownOpen(false);
    setExpandedMobileSection(null);
  }, [pathname, searchParams]);

  // Close any open dropdown when clicking outside the header
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Only close if clicking completely outside the header
      if (headerRef.current && !headerRef.current.contains(target)) {
        setIsProductsDropdownOpen(false);
        setIsRetailersDropdownOpen(false);
        setIsLearnDropdownOpen(false);
        setIsAboutDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Navigation items for better organization
  const navigationItems: NavigationItem[] = [
    {
      id: "products",
      label: t.nav?.products || "",
      href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/#products`,
      hasDropdown: true,
      dropdownItems: [
        {
          label: t.nav?.trialSize || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/products/trial-size`,
        },
        {
          label: t.nav?.compareSizes || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/products`,
        },
        {
          label: t.nav?.shipsToUSA || "",
          href: "/us",
        },
      ],
    },
    {
      id: "retailers",
      label: t.nav?.retailers || "",
      href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/retailers`,
      hasDropdown: true,
      dropdownItems: [
        {
          label: t.nav?.retailers || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/retailers`,
        },
        {
          label: t.nav?.wholesalePricing || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/retailers#wholesale-pricing`,
        },
        {
          label: t.nav?.becomePartner || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/retailers#retailer-contact`,
        },
        {
          label: t.nav?.marketingSupport || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/retailers#marketing-support`,
        },
        { label: t.nav?.partnerPrograms || "Partner Programs", isGroupHeader: true },
        {
          label: t.nav?.forGroomers || "For Groomers",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/groomers`,
          indent: true,
        },
        {
          label: t.nav?.forShelters || "For Shelters",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/shelters`,
          indent: true,
        },
        {
          label: t.nav?.affiliateProgram || "Affiliate Program",
          href: "/affiliate",
          indent: true,
        },
        {
          label: t.nav?.b2bInquiry || "B2B Inquiry",
          href: "/b2b",
          indent: true,
        },
      ],
    },
    {
      id: "learn",
      label: t.nav?.learn || "",
      href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn`,
      hasDropdown: true,
      dropdownItems: [
        {
          label: t.nav?.howItWorksPage || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/how-it-works`,
        },
        {
          label: t.nav?.faq || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/faq`,
        },
        {
          label: t.nav?.science || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/science`,
        },
        {
          label: t.nav?.safetyInfo || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/safety`,
        },
        {
          label: t.nav?.activatedCarbonBenefits || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/activated-carbon-benefits`,
        },
        {
          label: t.nav?.catLitterGuide || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/cat-litter-guide`,
        },
        {
          label: t.nav?.howToUse || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/how-to-use-deodorizer`,
        },
        {
          label: t.nav?.technologyComparison || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/activated-carbon-vs-baking-soda-deodorizers`,
        },
        { label: t.nav?.solutions || "", isGroupHeader: true },
        {
          label: t.nav?.ammoniaSmellControl || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/solutions/ammonia-smell-cat-litter`,
          indent: true,
        },
        {
          label: t.nav?.apartmentLiving || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/solutions/apartment-cat-smell-solution`,
          indent: true,
        },
        {
          label: t.nav?.litterBoxOdor || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/solutions/litter-box-smell-elimination`,
          indent: true,
        },
        {
          label: t.nav?.multipleCats || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/solutions/multiple-cats-odor-control`,
          indent: true,
        },
        {
          label: t.nav?.naturalAdditive || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/solutions/natural-cat-litter-additive`,
          indent: true,
        },
        {
          label: t.nav?.seniorCats || "",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : ""}/learn/solutions/senior-cat-litter-solutions`,
          indent: true,
        },
      ],
    },
    {
      id: "blog",
      label: t.nav?.blog || "Blog",
      href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : locale === "es" ? "/es" : ""}/blog`,
    },
    {
      id: "about",
      label: t.nav?.about || "",
      href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : locale === "es" ? "/es" : ""}/about/our-story`,
      hasDropdown: true,
      dropdownItems: [
        {
          label: t.nav?.ourStory || "Our Story",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : locale === "es" ? "/es" : ""}/about/our-story`,
        },
        {
          label: t.nav?.customerReviews || "Reviews",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : locale === "es" ? "/es" : ""}/reviews`,
        },
        {
          label: t.nav?.contact || "Contact",
          href: `${locale === "fr" ? "/fr" : locale === "zh" ? "/zh" : locale === "es" ? "/es" : ""}/contact`,
        },
      ],
    },
  ];

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-brand-green-light/30 dark:border-purple-500/30 bg-white dark:bg-gray-900/90 backdrop-blur-md supports-[backdrop-filter]:bg-white dark:supports-[backdrop-filter]:bg-gray-900/85 shadow-lg transition-all duration-300"
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              prefetch={false}
              className="flex items-center space-x-2 flex-shrink-0"
            >
              <Image
                src="/optimized/logo-light.webp"
                alt="Purrify - Premium Activated Carbon Cat Litter Additive - Home"
                width={120}
                height={40}
                priority
                className="h-10 w-auto filter drop-shadow-sm transition-all duration-300 dark:hidden"
              />
              <Image
                src="/optimized/logo-dark.webp"
                alt="Purrify - Premium Activated Carbon Cat Litter Additive - Home"
                width={120}
                height={40}
                priority
                className="h-10 w-auto filter drop-shadow-sm transition-all duration-300 hidden dark:block"
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
                          (item.id === "learn" && isLearnDropdownOpen) ||
                          (item.id === "about" && isAboutDropdownOpen)
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
                      (item.id === "learn" && isLearnDropdownOpen) ||
                      (item.id === "about" && isAboutDropdownOpen)) && (
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
                                prefetch={false}
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
                    prefetch={false}
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
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-brand-green/10 to-brand-green/5 dark:from-purple-500/20 dark:to-purple-500/10 border border-brand-green/30 dark:border-purple-500/40 rounded-full">
                <div className="w-6 h-6 rounded-full bg-brand-green dark:bg-purple-500 flex items-center justify-center">
                  <UserIcon className="w-3.5 h-3.5 text-white dark:text-gray-100" />
                </div>
                <span className="text-sm font-medium text-brand-green-800 dark:text-purple-300">
                  {session?.user?.email?.split('@')[0] || 'User'}
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
                <span>{t.nav?.signOut || ""}</span>
              </Button>
            )}
            {/* B2C: ORIGINAL BUY NOW BUTTON
            <Button
              onClick={scrollToProducts}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-red to-brand-red/80 hover:from-brand-red/90 hover:to-brand-red text-white dark:text-gray-100 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4" />
              {t.nav?.buyNow || ""}
            </Button>
            */}
            <Button
              asChild
              className="flex items-center gap-2 bg-gradient-to-r from-brand-red to-brand-red/80 hover:from-brand-red/90 hover:to-brand-red text-white dark:text-gray-100 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Link href="/stores" prefetch={false}>
                <MapPin className="w-4 h-4" />
                {t.nav?.findStore || "Find a Store"}
              </Link>
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
              aria-label={t.nav?.toggleMenu || ""}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu - Accordion style */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-brand-green-light/30 dark:border-purple-500/30 bg-white dark:bg-gray-900/95 backdrop-blur-md shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.id}>
                  {item.hasDropdown ? (
                    <>
                      {/* Accordion header - clickable toggle */}
                      <button
                        type="button"
                        onClick={() => setExpandedMobileSection(expandedMobileSection === item.id ? null : item.id)}
                        className="w-full flex items-center justify-between px-3 py-3 min-h-[44px] text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-brand-red dark:hover:text-brand-red-400 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors rounded-md mx-1"
                        aria-expanded={expandedMobileSection === item.id}
                      >
                        <span className="uppercase tracking-wider">{item.label}</span>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${expandedMobileSection === item.id ? "rotate-180" : ""}`}
                        />
                      </button>
                      {/* Accordion content - collapsible */}
                      {expandedMobileSection === item.id && (
                        <div className="pl-2 pb-2 space-y-0.5">
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
                                prefetch={false}
                                className={`block py-3 min-h-[44px] flex items-center text-gray-700 dark:text-gray-200 hover:text-brand-red dark:hover:text-brand-red-400 hover:bg-gray-50 dark:bg-gray-900/80 dark:hover:bg-gray-700/80 transition-colors font-medium rounded-md mx-2 my-0.5 ${dropdownItem.indent ? "pl-8" : "px-6"}`}
                                onClick={closeMenu}
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
                      prefetch={false}
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
                  <div className="px-3 py-3 bg-gradient-to-r from-brand-green/10 to-brand-green/5 dark:from-purple-500/20 dark:to-purple-500/10 border border-brand-green/30 dark:border-purple-500/40 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-brand-green dark:bg-purple-500 flex items-center justify-center">
                          <UserIcon className="w-4 h-4 text-white dark:text-gray-100" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-brand-green-800 dark:text-purple-300 block">
                            {session?.user?.email?.split('@')[0] || 'User'}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{t.nav?.signedIn || ""}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 border-brand-green/30 dark:border-purple-500/40 text-brand-green-800 dark:text-purple-300 hover:bg-brand-green/10 dark:hover:bg-purple-500/20"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t.nav?.signOut || ""}</span>
                    </Button>
                  </div>
                )}
                {/* B2C: ORIGINAL BUY NOW BUTTON
                <Button
                  onClick={handleBuyNowMobile}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-red to-brand-red/80 hover:from-brand-red/90 hover:to-brand-red text-white dark:text-gray-100 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {t.nav?.buyNow || ""}
                </Button>
                */}
                <Button
                  asChild
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-red to-brand-red/80 hover:from-brand-red/90 hover:to-brand-red text-white dark:text-gray-100 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Link href="/stores" prefetch={false} onClick={closeMenu}>
                    <MapPin className="w-4 h-4" />
                    {t.nav?.findStore || "Find a Store"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
