import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/constants";
import SectionHeader from "../ui/section-header";
import NextImage from "../../../components/NextImage";

export function Products() {
  return (
    <section
      className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF]"
      id="products"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <SectionHeader text="FOR EVERY CAT HOUSEHOLD" />
          <h2 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 bg-clip-text text-transparent">
            PICK YOUR PURRIFY POWER LEVEL
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Whether you have one kitten or multiple cats,
            we have the ideal Purrify size for your home.
          </p>
        </div>

        {/* Power Level Indicator */}
        <div className="relative max-w-4xl mx-auto mb-12 px-4">
          <div className="h-3 bg-gradient-to-r from-[#E0EFC7] via-[#FF3131]/60 to-[#FF3131] rounded-full"></div>
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium text-gray-600">Kitten Power</span>
            <span className="text-sm font-medium text-gray-600">Standard Power</span>
            <span className="text-sm font-medium text-gray-600">Maximum Power</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-[#E0EFC7] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(224,239,199,0.5)] hover:-translate-y-2 group relative"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Highlight for recommended product */}
              {index === 1 && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-max px-4 py-1 bg-[#FF3131] text-white font-bold text-sm rounded-full shadow-lg z-10">
                  MOST POPULAR
                </div>
              )}
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF3131]/10 to-[#E0EFC7]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="aspect-square overflow-hidden h-72 bg-gradient-to-b from-white to-[#FFFFF5]">
                  <div className="relative h-full flex items-center justify-center p-6">
                    <NextImage
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full mx-auto transition-transform duration-700 group-hover:scale-110"
                      style={{
                        objectFit: product.image.includes('fresh') || product.image.includes('cost effective')
                          ? 'cover'
                          : 'contain',
                        objectPosition: product.image.includes('fresh') || product.image.includes('cost effective')
                          ? 'center center'
                          : 'center'
                      }}
                      loading="lazy"
                      fetchPriority="auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#FF3131]/20 to-transparent p-4">
                      <p className="text-white font-bold text-base drop-shadow-md">
                        {product.description.split('\n')[0]}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 px-5 py-2 rounded-full shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">{product.size}</span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="font-bold text-2xl mb-3 bg-gradient-to-br from-[#6D28D9] via-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
                    {product.name}
                  </h3>
                  
                  {/* Feature bullets from description */}
                  <div className="space-y-2 mb-4">
                    {product.description.split('\n').map((line, i) => (
                      <div key={i} className="flex items-start">
                        {i > 0 && <div className="text-[#FF3131] mr-2 mt-1">•</div>}
                        <p className={`text-gray-700 ${i === 0 ? 'font-medium text-lg' : ''}`}>{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
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
