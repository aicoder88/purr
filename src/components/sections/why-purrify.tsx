import { Container } from "@/components/ui/container";
import { Wind, Cat, Clock, Layers, Sparkles, PiggyBank } from "lucide-react"; // Changed Leaf to Sparkles
import SectionHeader from "../ui/section-header";
import NextImage from "../../../components/NextImage";

export function WhyPurrify() {
  const reasons = [
    {
      icon: Wind,
      title: "ODOR ELIMINATION",
      description: "Effectively eliminates unpleasant litter odors at their source. Say goodbye to lingering smells and welcome a fresher home.",
      image: "/micropores_magnified_view.jpeg" // Use local image
    },
    {
      icon: Cat,
      title: "CAT-FRIENDLY",
      description: "Designed with your cat's sensitive nose in mind. Completely pet-friendly for worry-free use.", // Revised description
      image: "/natural-cat-litter.webp" // Changed image
    },
    {
      icon: Clock,
      title: "LONG-LASTING FRESHNESS",
      description: "A single application keeps the litter box odor-free for days. Enjoy continuous freshness without constant scooping or additives.",
      image: "/optimized/fresh.webp" // Using the optimized webp version
    },
    {
      icon: Layers,
      title: "WORKS WITH ANY LITTER",
      description: "Compatible with clay, silica, pine, corn, or any litter type. No need to switch from what your cat already prefers.",
      image: "/clay-cat-litter.webp" // Use local image
    },
    {
      icon: Sparkles, // Changed icon
      title: "HIGH-PURITY CARBON", // Changed title
      description: "Uses the same high-purity activated carbon trusted in water and air purification systems worldwide.", // Revised description
      image: "/carbon_magnified_image.png" // Use local image
    },
    {
      icon: PiggyBank,
      title: "COST-EFFECTIVE",
      description: "Extends the life of your cat litter by preventing odor buildup, saving you money and reducing overall waste.",
      image: "/cost effective.png" // Updated image
    },
  ];

  // Define color themes to cycle through
  const colorThemes = [
    { bgGradient: "from-[#FF3131] to-[#FF3131]/80", textClass: "text-[#FF3131]", shadow: "shadow-red-200/50", border: "border-red-100" },
    { bgGradient: "from-[#5B2EFF] to-[#5B2EFF]/80", textClass: "text-[#5B2EFF]", shadow: "shadow-purple-200/50", border: "border-purple-100" },
    { bgGradient: "from-[#03E46A] to-[#03E46A]/80", textClass: "text-[#03E46A]", shadow: "shadow-green-200/50", border: "border-green-100" },
  ];


  return (
    <section
      className="pt-2 pb-12 bg-gradient-to-br from-orange-50 to-white mb-16"
      id="why-purrify"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* <div className="inline-block px-4 py-1 bg-orange-100 rounded-full text-orange-600 font-medium text-sm mb-4">
            The Science Behind Purrify
          </div> */}
        
          <h2 className="text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent">
            Why Purrify?
          </h2>
          <p className="text-gray-600 text-lg">
            With the Odour-Adsorbing Power of Purrify, you can finally say
            goodbye to unwanted odours and hello to a cleaner, more enjoyable
            living space for you and your beloved pets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => { // Remove the outer map and parenthesis
              const theme = colorThemes[index % 3]; // Cycle through themes
              const IconComponent = reason.icon;
              return (
                <div
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border ${theme.border} transition-all duration-500 hover:${theme.shadow} hover:-translate-y-2 group overflow-hidden flex flex-col`} // Added overflow-hidden and flex
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image Section */}
                  <div className="aspect-video overflow-hidden">
                    <NextImage
                      src={reason.image.replace('/images/fresh.png', '/optimized/fresh.webp')
                            .replace('/cost effective.png', '/optimized/cost effective.webp')
                            .replace('/carbon_magnified_image.png', '/optimized/carbon_magnified_image.webp')
                            .replace('/micropores_magnified_view.jpeg', '/optimized/micropores_magnified_view.webp')}
                      alt={reason.title}
                      width={400}
                      height={225}
                      loading="lazy"
                      className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                        reason.title === "LONG-LASTING FRESHNESS"
                          ? "object-contain p-2" // Use object-contain for the fresh.png image
                          : reason.title === "COST-EFFECTIVE"
                            ? "object-cover object-center" // Ensure the cost effective image is centered and covers properly
                            : "object-cover" // Keep object-cover for other images
                      }`}
                    />
                  </div>
                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow"> {/* Added padding and flex-grow */}
                    <div className="flex items-center mb-4"> {/* Reduced bottom margin */}
                      <div
                        className={`p-3 rounded-full shadow-md mr-3 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r ${theme.bgGradient}`} // Reduced padding and margin
                      >
                        <IconComponent className="h-6 w-6 text-white" /> {/* Reduced icon size */}
                      </div>
                      <h3 className={`font-bold text-xl ${theme.textClass}`}> {/* Reduced title size */}
                        {reason.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm flex-grow"> {/* Reduced text size, added flex-grow */}
                      {reason.description}
                    </p>
                    {/* Learn more link section is completely removed */}
                  </div>
                </div>
              );
            })}
          {/* Remove the extra closing parenthesis and bracket */}
        </div>

        <div className="mt-16 text-center">
          <div className="relative bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 px-12 py-10 rounded-3xl shadow-xl border-2 border-[#FF3131]/30 max-w-4xl mx-auto overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#FF3131]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#5B2EFF]/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center">
              <NextImage
                src="/images/icon-128.png"
                alt="Purrify Logo"
                width={64}
                height={64}
                className="h-16 w-auto mb-4"
              />
              <p className="text-3xl font-bold text-[#5B2EFF] mb-4">
                Make every day a breath of fresh air with Purrify.
              </p>
              <a
                href="#products"
                className="mt-4 inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-[#FF3131]/90 hover:to-[#FF3131] transition-all duration-300 group"
              >
                Try Purrify Today
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
