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
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="h-10 w-auto mr-2">
                <img
                  src="/purrify-logo.svg"
                  alt="Purrify Logo"
                  className="h-full w-auto"
                />
              </div>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-[#FB6A43] to-[#FB6A43]/80 bg-clip-text text-transparent group-hover:from-[#FB6A43]/90 group-hover:to-[#FB6A43] transition-all duration-300">
                {SITE_NAME}
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-[#FB6A43] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FB6A43] after:transition-all after:duration-300"
            >
              Home
            </Link>
            <Link
              to="/#products"
              className="text-sm font-medium transition-colors hover:text-[#FB6A43] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FB6A43] after:transition-all after:duration-300"
            >
              Products
            </Link>
            <Link
              to="/#features"
              className="text-sm font-medium transition-colors hover:text-[#FB6A43] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FB6A43] after:transition-all after:duration-300"
            >
              Features
            </Link>
            <Link
              to="/#benefits"
              className="text-sm font-medium transition-colors hover:text-[#FB6A43] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FB6A43] after:transition-all after:duration-300"
            >
              Benefits
            </Link>
            <Link
              to="/#calculator"
              className="text-sm font-medium transition-colors hover:text-[#FB6A43] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FB6A43] after:transition-all after:duration-300"
            >
              Savings Calculator
            </Link>
            <Link
              to="/#testimonials"
              className="text-sm font-medium transition-colors hover:text-[#FB6A43] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FB6A43] after:transition-all after:duration-300"
            >
              Testimonials
            </Link>
            <Link
              to="/#contact"
              className="text-sm font-medium transition-colors hover:text-[#FB6A43] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#FB6A43] after:transition-all after:duration-300"
            >
              Contact
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="relative bg-[#FFFFFF]/90 border-[#E0EFC7] hover:bg-[#FFFFF5] hover:border-[#E0EFC7] transition-all duration-300 ml-2"
            >
              <ShoppingCart className="h-5 w-5 text-[#FB6A43]" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#FB6A43] to-[#FB6A43]/80 text-xs text-white shadow-sm">
                0
              </span>
            </Button>
          </nav>

          <div className="md:hidden flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="mr-3 relative bg-[#FFFFFF]/90 border-[#E0EFC7] hover:bg-[#FFFFF5] hover:border-[#E0EFC7] transition-all duration-300"
            >
              <ShoppingCart className="h-5 w-5 text-[#FB6A43]" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#FB6A43] to-[#FB6A43]/80 text-xs text-white shadow-sm">
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
                <X className="h-6 w-6 text-[#FB6A43]" />
              ) : (
                <Menu className="h-6 w-6 text-[#FB6A43]" />
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
              className="block text-sm font-medium transition-colors hover:text-[#FB6A43] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/#products"
              className="block text-sm font-medium transition-colors hover:text-[#FB6A43] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/#features"
              className="block text-sm font-medium transition-colors hover:text-[#FB6A43] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/#benefits"
              className="block text-sm font-medium transition-colors hover:text-[#FB6A43] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Benefits
            </Link>
            <Link
              to="/#calculator"
              className="block text-sm font-medium transition-colors hover:text-[#FB6A43] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Savings Calculator
            </Link>
            <Link
              to="/#testimonials"
              className="block text-sm font-medium transition-colors hover:text-[#FB6A43] py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              to="/#contact"
              className="block text-sm font-medium transition-colors hover:text-[#FB6A43] py-2"
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
