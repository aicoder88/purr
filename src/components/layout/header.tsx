import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Container } from "../../components/ui/container";
import { SITE_NAME } from "../../lib/constants";
import NextImage from "../../../components/NextImage";
import { LanguageSwitcher } from "../../components/ui/language-switcher";
import { useTranslation } from "../../lib/translation-context";
import { ShoppingCart } from "../../components/ui/shopping-cart";
import { ThemeToggle } from "../theme/theme-toggle";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, locale } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E0EFC7] dark:border-gray-800 bg-[#FFFFFF]/95 dark:bg-gray-900/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#FFFFFF]/80 dark:supports-[backdrop-filter]:bg-gray-900/80 shadow-sm transition-colors duration-300">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/optimized/purrify-logo-text.webp"
                alt="Purrify"
                width={120}
                height={40}
                className="h-8 w-auto dark:brightness-110 dark:contrast-100"
                priority
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/#how-it-works"
              className="text-gray-600 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors font-medium"
            >
              {t.nav?.howItWorks || "How It Works"}
            </Link>
            <Link
              href="/#about"
              className="text-gray-600 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors font-medium"
            >
              {t.nav?.about || "About"}
            </Link>
            <Link
              href="/#testimonials"
              className="text-gray-600 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors font-medium"
            >
              {t.nav?.testimonials || "Testimonials"}
            </Link>
            <Link
              href="/#contact"
              className="text-gray-600 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors font-medium"
            >
              {t.nav?.contact || "Contact"}
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors font-medium"
            >
              {t.nav?.blog || "Blog"}
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={scrollToProducts}
              className="flex items-center gap-2 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
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
              className="ml-1"
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
          <div className="md:hidden border-t border-[#E0EFC7] dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/#how-it-works"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors font-medium"
                onClick={toggleMenu}
              >
                {t.nav?.howItWorks || "How It Works"}
              </Link>
              <Link
                href="/#about"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors font-medium"
                onClick={toggleMenu}
              >
                {t.nav?.about || "About"}
              </Link>
              <Link
                href="/#testimonials"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors font-medium"
                onClick={toggleMenu}
              >
                {t.nav?.testimonials || "Testimonials"}
              </Link>
              <Link
                href="/#contact"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors font-medium"
                onClick={toggleMenu}
              >
                {t.nav?.contact || "Contact"}
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors font-medium"
                onClick={toggleMenu}
              >
                {t.nav?.blog || "Blog"}
              </Link>
              <Button
                onClick={() => {
                  scrollToProducts();
                  toggleMenu();
                }}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                <ShoppingBag className="w-4 h-4" />
                Buy Now!
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
