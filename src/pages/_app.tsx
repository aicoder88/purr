import "@/styles/globals.css"; // assuming you already have a globals.css
import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}