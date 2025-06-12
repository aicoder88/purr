import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="mb-4">
                {item.name} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}{" "}
                <button className="text-red-500 ml-4" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg font-bold">Total: ${total.toFixed(2)} CAD</p>
          <Link href="/checkout">
            <button className="mt-6 bg-[#FF3131] text-white px-6 py-2 rounded-lg">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
