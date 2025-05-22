import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Container } from "../../components/ui/container";
import { SITE_NAME } from "../../lib/constants";
import NextImage from "../../../components/NextImage";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E0EFC7] bg-[#FFFFFF]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#FFFFFF]/80 shadow-sm">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="group" aria-label="Purrify Home">
              <div className="h-10 w-auto mr-2 flex space-x-2 items-center">
                <img
                  src="/optimized/purrify-logo-icon.webp"
                  alt="Purrify Logo Icon"
                  className="h-full w-auto"
                  width={757}
                  height={896}
                />
                <img
                  src="/optimized/purrify-logo-text.webp"
                  alt="Purrify Logo Text"
                  className="h-full w-auto"
                  width={209}
                  height={96}
                />
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              Home
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
              aria-label="How It Works"
            >
              How It Works
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
              aria-label="About Purrify"
            >
              About
            </Link>
            <Link
              href="/#why-purrify"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
              aria-label="Why Choose Purrify"
            >
              Why Purrify
            </Link>
            <Link
              href="/free"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
              aria-label="Try Free Sample"
            >
              Try Free
            </Link>
            <Link
              href="/#testimonials"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              Testimonials
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              Blog
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="relative bg-[#FFFFFF]/90 border-[#E0EFC7] hover:bg-[#FFFFF5] hover:border-[#E0EFC7] transition-all duration-300 ml-2 hide-for-info-mode"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5 text-[#FF3131]" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-xs text-white shadow-sm">
                0
              </span>
            </Button>
          </nav>

          <div className="md:hidden flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="mr-3 relative bg-[#FFFFFF]/90 border-[#E0EFC7] hover:bg-[#FFFFF5] hover:border-[#E0EFC7] transition-all duration-300 hide-for-info-mode"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5 text-[#FF3131]" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-xs text-white shadow-sm">
                0
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="hover:bg-[#FFFFF5]"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-[#FF3131]" />
              ) : (
                <Menu className="h-6 w-6 text-[#FF3131]" />
              )}
            </Button>
          </div>
        </div>
      </Container>

      {isMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E0EFC7] shadow-lg">
          <div className="space-y-4 px-6 py-6">
            <Link
              href="/"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#how-it-works"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="How It Works"
            >
              How It Works
            </Link>
            <Link
              href="/#about"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="About Purrify"
            >
              About
            </Link>
            <Link
              href="/#why-purrify"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Why Choose Purrify"
            >
              Why Purrify
            </Link>
            <Link
              href="/free"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Try Free Sample"
            >
              Try Free
            </Link>
            <Link
              href="/#testimonials"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="/#contact"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <div className="border-t border-[#E0EFC7] my-2 pt-2">
              <Link
                href="/privacy-policy"
                className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
