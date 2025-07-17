import { Header } from "./header";
import { Footer } from "./footer";
import dynamic from "next/dynamic";

interface LayoutProps {
  children: React.ReactNode;
}

// Dynamically import PawCursor and ScrollToTopButton for better code splitting
const PawCursor = dynamic(() => import("../ui/paw-cursor").then(mod => ({ default: mod.PawCursor })), { ssr: false });
const ScrollToTopButton = dynamic(() => import("../ui/scroll-to-top"), { ssr: false });

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <PawCursor />
      <ScrollToTopButton />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
