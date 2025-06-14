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
    <header className="sticky top-0 z-50 w-full border-b border-[#E0EFC7] bg-[#FFFFFF]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#FFFFFF]/80 shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/purrify-logo-text.png"
                alt="Purrify"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/#how-it-works"
              className="text-gray-600 hover:text-[#FF3131] transition-colors font-medium"
            >
              {t.nav?.howItWorks || "How It Works"}
            </Link>
            <Link
              href="/#about"
              className="text-gray-600 hover:text-[#FF3131] transition-colors font-medium"
            >
              {t.nav?.about || "About"}
            </Link>
            <Link
              href="/#why-purrify"
              className="text-gray-600 hover:text-[#FF3131] transition-colors font-medium"
            >
              {t.nav?.whyPurrify || "Why Purrify"}
            </Link>
            <Link
              href="/#testimonials"
              className="text-gray-600 hover:text-[#FF3131] transition-colors font-medium"
            >
              {t.nav?.testimonials || "Testimonials"}
            </Link>
            <Link
              href="/#contact"
              className="text-gray-600 hover:text-[#FF3131] transition-colors font-medium"
            >
              {t.nav?.contact || "Contact"}
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-[#FF3131] transition-colors font-medium"
            >
              {t.nav?.blog || "Blog"}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              onClick={scrollToProducts}
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4" />
              Buy Now!
            </Button>
            <LanguageSwitcher />
            <ShoppingCart />
          </div>

          <div className="md:hidden flex items-center">
            <div className="flex items-center mr-3">
              <LanguageSwitcher />
            </div>
            <ShoppingCart />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/#how-it-works"
                className="block px-3 py-2 text-gray-600 hover:text-[#FF3131] transition-colors font-medium"
                onClick={toggleMenu}
              >
                {t.nav?.howItWorks || "How It Works"}
              </Link>
              <Link
                href="/#about"
                className="block px-3 py-2 text-gray-600 hover:text-[#FF3131] transition-colors font-medium"
                onClick={toggleMenu}
              >
                {t.nav?.about || "About"}
              </Link>
              <Link
                href="/#why-purrify"
                className="block px-3 py-2 text-gray-600 hover:text-[#FF3131] transition-colors font-medium"
                onClick={toggleMenu}
              >
                {t.nav?.whyPurrify || "Why Purrify"}
              </Link>
              <Link
                href="/#testimonials"
                className="block px-3 py-2 text-gray-600 hover:text-[#FF3131] transition-colors font-medium"
                onClick={toggleMenu}
              >
                {t.nav?.testimonials || "Testimonials"}
              </Link>
              <Link
                href="/#contact"
                className="block px-3 py-2 text-gray-600 hover:text-[#FF3131] transition-colors font-medium"
                onClick={toggleMenu}
              >
                {t.nav?.contact || "Contact"}
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-gray-600 hover:text-[#FF3131] transition-colors font-medium"
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
