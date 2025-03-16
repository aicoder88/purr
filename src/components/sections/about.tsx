import { Container } from "@/components/ui/container";

export function About() {
  return (
    <section className="py-12 bg-white" id="about">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FB6A43] font-medium text-sm mb-4">
            The Science Behind Freshness
          </div>
          <h2 className="text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FB6A43] to-[#FB6A43]/80 bg-clip-text text-transparent">
            What is Purrify?
          </h2>
          <p className="text-3xl font-semibold text-[#333333] mb-6">
            "Activated" Coconut Shells!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1612094497465-695aefd77e0b?w=400&q=80"
                  alt="65g bag of activated carbon"
                  className="w-full h-48 object-cover transform hover:scale-110 transition duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1635439028672-f7deae3e9d1d?w=400&q=80"
                  alt="Micropore magnified view of activated carbon"
                  className="w-full h-48 object-cover transform hover:scale-110 transition duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-xl shadow-lg col-span-2">
                <img
                  src="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800&q=80"
                  alt="Cat in clean environment"
                  className="w-full h-48 object-cover transform hover:scale-110 transition duration-500"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              Imagine a home that stays fresh and odor-free without relying on
              harsh chemicals or artificial fragrances.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Traditional solutions? Sprays and scented litters just cover the
              smell, and harsh chemicals probably aren't great for your cat or
              your home.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              <span className="font-bold text-[#FB6A43]">
                Purrify fixes this at the source.
              </span>
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our activated coconut carbon technology absorbs odor molecules
              before they take over your nose, keeping your home fresh and clean
              without sprays, chemicals, or effort.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#FFFFFF] to-[#FFFFF5] p-8 rounded-2xl shadow-xl border border-[#E0EFC7] transform hover:scale-105 transition-all duration-300 flex flex-col items-center">
            <div className="flex items-start space-x-4 mb-6 w-full">
              <div className="bg-gradient-to-r from-[#FB6A43] to-[#FB6A43]/80 p-3 rounded-full shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-1 bg-gradient-to-r from-[#FB6A43] to-[#FB6A43]/80 bg-clip-text text-transparent">
                  No fuss, no mess! Easy peasy.
                </h3>
                <p className="text-gray-600">
                  Simply sprinkle Purrify into your cat's litter and let it work
                  its magic.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl shadow-lg max-w-md mx-auto">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=800&q=80"
                  alt="Cat with Purrify"
                  className="w-full h-auto object-cover transform hover:scale-110 transition duration-500"
                />
                <div className="absolute bottom-0 right-0 p-2 bg-white/80 backdrop-blur-sm rounded-tl-lg">
                  <p className="text-xs font-medium text-[#6A43FB]">
                    Simple to use
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="relative mt-16">
          <div
            className="absolute -top-10 left-1/4 w-8 h-8 bg-[#E0EFC7] rounded-full opacity-50"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-20 right-1/3 w-6 h-6 bg-[#FB6A43]/30 rounded-full opacity-40"
            style={{ animationDuration: "5s" }}
          ></div>
          <div
            className="absolute -bottom-10 right-1/4 w-10 h-10 bg-[#E0EFC7]/70 rounded-full opacity-60"
            style={{ animationDuration: "4s" }}
          ></div>
        </div>
      </Container>
    </section>
  );
}
