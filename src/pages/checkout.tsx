import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();

  const handleCheckout = async () => {
    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });
    const data = await response.json();
    window.location.href = data.url;
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <button onClick={handleCheckout} className="bg-[#FF3131] text-white px-6 py-2 rounded-lg">
        Pay Now
      </button>
    </div>
  );
}
