import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SITE_NAME } from "@/lib/constants";

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
            <Link to="/" className="group">
              <div className="h-10 w-auto mr-2 flex space-x-2 items-center">
                <img
                  src="/purrify-logo-icon.png"
                  alt="Purrify Logo"
                  className="h-full w-auto"
                />
                <img
                  src="/purrify-logo-text.png"
                  alt="Purrify Logo"
                  className="h-full w-auto"
                />
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              Home
            </a>
            <a
              href="/#products"
              // onClick={}
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              Products
            </a>
            <a
              href="/#features"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              Features
            </a>
            <a
              href="/#benefits"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              Benefits
            </a>
            <a
              href="/#calculator"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              Savings Calculator
            </a>
            <a
              href="/#testimonials"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              Testimonials
            </a>
            <a
              href="/#contact"
              className="text-sm font-medium transition-colors hover:text-[#FF3131] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FF3131] after:transition-all after:duration-300"
            >
              Contact
            </a>
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
              to="/"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/#products"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/#features"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/#benefits"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Benefits
            </Link>
            <Link
              to="/#calculator"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Savings Calculator
            </Link>
            <Link
              to="/#testimonials"
              className="block text-sm font-medium transition-colors hover:text-[#FF3131] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              to="/#contact"
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
