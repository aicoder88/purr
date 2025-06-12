import { Product } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <Image src={product.image} alt={product.name} width={400} height={400} className="w-auto h-auto" />
      <h3 className="text-lg font-bold mt-4">{product.name}</h3>
      <p className="mb-4">${product.price.toFixed(2)} CAD</p>
      <button
        className="bg-[#FF3131] text-white px-4 py-2 rounded-lg"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
