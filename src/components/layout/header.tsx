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
            <Link href="/" className="group">
              <div className="flex items-center space-x-2">
                <NextImage
                  src="/images/icon-64.png"
                  alt="Purrify Logo"
                  width={64}
                  height={64}
                  className="h-8 w-8 object-contain"
                  priority={true}
                />
                <NextImage
                  src="/images/logo-text-120.png"
                  alt="Purrify Logo Text"
                  width={120}
                  height={24}
                  className="h-6 w-[120px] object-contain"
                  priority={true}
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
            >
              How
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              Wow
            </Link>
            <Link
              href="/#why-purrify"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              Why
            </Link>
            <Link
              href="/#products"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              Try
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
            <Button
              variant="outline"
              size="icon"
              className="relative bg-[#FFFFFF]/90 border-[#E0EFC7] hover:bg-[#FFFFF5] hover:border-[#E0EFC7] transition-all duration-300 ml-2 hide-for-info-mode"
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
            >
              How
            </Link>
            <Link
              href="/#about"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Wow
            </Link>
            <Link
              href="/#why-purrify"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Why
            </Link>
            <Link
              href="/#products"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Try
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
          </div>
        </div>
      )}
    </header>
  );
}
