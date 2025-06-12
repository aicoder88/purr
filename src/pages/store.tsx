import ProductCard from "@/components/store/ProductCard";
import { Product } from "@/context/CartContext";

const products: Product[] = [
  { id: "140g", name: "Purrify 140g", price: 24.99, image: "/140g.png" },
  { id: "60g", name: "Purrify 60g", price: 14.99, image: "/60g.png" },
  { id: "20g", name: "Purrify 20g", price: 7.99, image: "/20g.png" },
];

export default function StorePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Purrify Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
