import { Header } from "./header";
import { Footer } from "./footer";
import ScrollToTopButton from "../ui/scroll-to-top";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTopButton />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
