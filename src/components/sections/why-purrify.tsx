import { Container } from "@/components/ui/container";
import { Wind, Cat, Clock, Layers, Sparkles, PiggyBank } from "lucide-react"; // Changed Leaf to Sparkles
import NextImage from "../../../components/NextImage";
import { useTranslation } from "../../lib/translation-context";

export function WhyPurrify() {
  const { t } = useTranslation();
  
  const reasons = [
    {
      icon: Wind,
      title: t.features.odorElimination.title.toUpperCase(),
      description: t.features.odorElimination.description,
      image: "/optimized/micropores_magnified_view.webp"
    },
    {
      icon: Cat,
      title: t.features.catFriendly.title.toUpperCase(),
      description: t.features.catFriendly.description,
      image: "/optimized/cats-and-filters.webp",
      color: "bg-[#E8F5E9]",
      textColor: "text-[#2E7D32]",
    },
    {
      icon: Clock,
      title: t.features.longLastingFreshness.title.toUpperCase(),
      description: t.features.longLastingFreshness.description,
      image: "/catonbed.jpeg"
    },
    {
      icon: Layers,
      title: t.features.worksWithAnyLitter.title.toUpperCase(),
      description: t.features.worksWithAnyLitter.description,
      image: "/optimized/cat-favorite-litter.png"
    },
    {
      icon: PiggyBank,
      title: t.features.costEffective.title.toUpperCase(),
      description: t.features.costEffective.description,
      image: "/optimized/cost effective.webp",
      color: "bg-[#FFF3E0]",
      textColor: "text-[#E65100]",
    },
    {
      icon: Sparkles,
      title: t.features.beforeAfter.title.toUpperCase(),
      description: t.features.beforeAfter.description,
      image: "/optimized/before after.webp",
      color: "bg-[#F3E5F5]",
      textColor: "text-[#7B1FA2]",
    },
  ];

  // Define enhanced color themes
  const colorThemes = [
    { bgGradient: "from-purple-600 to-purple-500", textClass: "text-purple-600 dark:text-purple-400", shadow: "shadow-purple-500/30", border: "border-purple-200 dark:border-purple-800", hoverBorder: "hover:border-purple-400 dark:hover:border-purple-600" },
    { bgGradient: "from-pink-600 to-pink-500", textClass: "text-pink-600 dark:text-pink-400", shadow: "shadow-pink-500/30", border: "border-pink-200 dark:border-pink-800", hoverBorder: "hover:border-pink-400 dark:hover:border-pink-600" },
    { bgGradient: "from-orange-600 to-orange-500", textClass: "text-orange-600 dark:text-orange-400", shadow: "shadow-orange-500/30", border: "border-orange-200 dark:border-orange-800", hoverBorder: "hover:border-orange-400 dark:hover:border-orange-600" },
  ];

  return (
    <section
      className="relative pt-20 pb-12 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 transition-colors duration-300 overflow-hidden"
      id="why-purrify"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-full mb-8 border border-purple-200 dark:border-purple-800 shadow-lg">
            <span className="text-purple-700 dark:text-purple-300 font-semibold">The Science Behind Purrify</span>
          </div>
        
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent">
            {t.nav.whyPurrify}
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
            Discover why 1,000+ cat owners choose Purrify for a truly fresh-smelling home, without masking odors or using harsh chemicals. 🐱✨
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
              const theme = colorThemes[index % 3];
              const IconComponent = reason.icon;
              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl shadow-2xl border-2 ${theme.border} ${theme.hoverBorder} transition-all duration-500 hover:${theme.shadow} hover:-translate-y-4 group overflow-hidden flex flex-col`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>

                  <div className="aspect-video overflow-hidden h-[200px] sm:h-[225px] flex items-center justify-center relative">
                    <NextImage
                      src={reason.image}
                      alt={reason.title}
                      width={400}
                      height={225}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                      loading={index < 3 ? "eager" : "lazy"}
                      className={"w-full h-full transition-transform duration-700 group-hover:scale-110"}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transform: reason.title.includes('LONG-LASTING FRESHNESS') || reason.title.includes('COST-EFFECTIVE')
                          ? 'scale(1.2)'
                          : 'none'
                      }}
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col flex-grow relative z-10">
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-3 sm:p-4 rounded-2xl shadow-xl mr-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-gradient-to-r ${theme.bgGradient}`}
                      >
                        <IconComponent className="h-6 w-6 text-white dark:text-gray-100" />
                      </div>
                      <h3 className={`font-black text-lg sm:text-xl ${theme.textClass}`}>
                        {reason.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg flex-grow font-medium">
                      {reason.description.split('\n').map((line, i) => (
                        <span key={i} className="block mb-1">{line}</span>
                      ))}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
      
      {/* Enhanced scroll indicator */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-4 z-20 flex justify-center w-full">
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full p-2 shadow-lg">
          <svg
            className="w-8 h-8 animate-bounce"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
