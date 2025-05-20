import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/constants";
import SectionHeader from "../ui/section-header";
import NextImage from "../../../components/NextImage";

export function Products() {
  return (
    <section
      className="py-12 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF]"
      id="products"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
            For Every Cat Household
          </div> */}
          <SectionHeader text="FOR EVERY CAT HOUSEHOLD" />
          <h2 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 bg-clip-text text-transparent">
            PICK YOUR PURRIFY POWER LEVEL
          </h2>
          <p className="text-gray-600 text-lg">
            Whether you have one kitten or multiple cats,
            we have the ideal Purrify size for your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              className="bg-[#FFFFFF]/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-[#E0EFC7] transition-all duration-500 hover:shadow-[#E0EFC7]/70 hover:-translate-y-2 group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF3131]/10 to-[#E0EFC7]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="aspect-square overflow-hidden h-72">
                  <div className="relative">
                    <NextImage
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-contain mx-auto transition-transform duration-700 group-hover:scale-105 flex items-center justify-center"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <p className="text-white font-bold text-sm">
                        {product.description.split('\n')[0]}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 px-4 py-2 rounded-full shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                  <span className="text-white font-bold">{product.size}</span>
                </div>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="font-bold text-xl mb-2 bg-gradient-to-br from-[#6D28D9] via-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 bg-clip-text text-transparent hide-for-info-mode">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-0 hide-for-info-mode">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white font-bold py-6 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 text-lg hide-for-info-mode">
            VIEW ALL PRODUCTS
          </Button>
        </div>
      </Container>
    </section>
  );
}
