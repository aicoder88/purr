import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useTranslation } from "../../lib/translation-context";
import Image from "next/image";
import { GRADIENTS, COLORS } from "@/lib/theme-utils";

interface DecorativeElementProps {
  className: string;
  style?: React.CSSProperties;
}

const DecorativeElement = ({ className, style }: DecorativeElementProps) => (
  <div className={`bg-white dark:bg-gray-800 rounded-full opacity-10 ${className}`} style={style} />
);

const CustomerAvatar = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      className="w-full h-full object-cover"
    />
  </div>
);

const customerAvatars = [
  "https://randomuser.me/api/portraits/women/32.jpg",
  "https://randomuser.me/api/portraits/men/45.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg"
];

export function CTA() {
  const { t } = useTranslation();

  return (
    <section className={`py-12 relative overflow-hidden ${GRADIENTS.background.cta} opacity-90 dark:opacity-95 transition-colors duration-300`}>
      {/* Background overlay */}
      <div className={`absolute inset-0 ${GRADIENTS.background.cta} opacity-90`} />

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <DecorativeElement className="absolute top-10 left-10 w-40 h-40" />
        <DecorativeElement className="absolute bottom-10 right-10 w-60 h-60" />
        <DecorativeElement className="absolute top-1/2 left-1/4 w-20 h-20 animate-pulse" />
        <DecorativeElement
          className="absolute bottom-1/3 right-1/3 w-32 h-32 animate-pulse"
          style={{ animationDuration: "3s" }}
        />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 backdrop-blur-sm bg-white dark:bg-gray-800/10 dark:bg-gray-900/30 rounded-3xl p-10 border border-white/20 dark:border-[#3694FF]/30 shadow-2xl relative overflow-hidden">

          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80"
            alt={t.homepage.altText.happyCatAlt}
            width={800}
            height={800}
            className="absolute top-0 right-0 w-1/3 h-full object-cover opacity-20 rounded-r-3xl"
          />

          {/* Content section */}
          <div className="text-white dark:text-gray-100 max-w-2xl bg-black/30 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {t.cta?.title || "Ready to Say Goodbye to Litter Box Odors Forever?"}
            </h2>

            <p className="text-white dark:text-gray-100/90 text-lg">
              {t.cta?.subtitle || "Join 1,000+ happy customers who have transformed their homes with Purrify. Try it risk-free with our 30-day satisfaction guarantee."}
            </p>

            {/* Social proof */}
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-4">
                {customerAvatars.map((src, index) => (
                  <CustomerAvatar
                    key={index}
                    src={src}
                    alt={t.homepage.altText.userAvatar}
                  />
                ))}
              </div>
              <p className="text-white dark:text-gray-100/90 text-sm font-medium">
                {t.cta?.joinText || "Join 1,000+ Happy cat Families - Visit your local store"}
              </p>
            </div>
          </div>

          {/* CTA Button section */}
          <div className="flex flex-col gap-4 min-w-[200px]">
            <Button
              size="lg"
              className={`${COLORS.surface.light} text-[#5B2EFF] hover:bg-gray-100 dark:bg-[#3694FF] dark:text-white dark:text-gray-100 font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg`}
            >
              {t.cta?.buttonText || "ORDER NOW"}
            </Button>

            <p className="text-white dark:text-white dark:text-gray-100/80 text-xs text-center mt-2">
              {t.cta?.guarantee || "30-day money-back guarantee"}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
