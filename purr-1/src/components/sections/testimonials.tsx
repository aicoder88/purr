import { Container } from "@/components/ui/container";
import { TESTIMONIALS } from "@/lib/constants";
import SectionHeader from "../ui/section-header";
import Image from "next/image";
import { useTranslation } from "../../lib/translation-context";

export function Testimonials() {
  const { t } = useTranslation();
  
  const colorClasses = [
    {
      bg: "bg-[#FF3131]/10 dark:bg-[#FF5050]/10",
      border: "border-[#FF3131]/30 dark:border-[#FF5050]/30",
      text: "text-[#FF3131] dark:text-[#FF5050]",
      icon: "#FF3131",
    },
    {
      bg: "bg-[#5B2EFF]/10 dark:bg-[#3694FF]/10",
      border: "border-[#5B2EFF]/30 dark:border-[#3694FF]/30",
      text: "text-[#5B2EFF] dark:text-[#3694FF]",
      icon: "#5B2EFF",
    },
    {
      bg: "bg-[#03E46A]/10 dark:bg-[#03E46A]/20",
      border: "border-[#03E46A]/30 dark:border-[#03E46A]/40",
      text: "text-[#03E46A] dark:text-[#03E46A]",
      icon: "#03E46A",
    },
  ];

  return (
    <section
      className="py-12 bg-gradient-to-br from-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:to-gray-950 transition-colors duration-300"
      id="testimonials"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
            Customer Love
          </div> */}
          <SectionHeader text=" Customer Love" />
          <h2 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent">
            {t.testimonialsSection?.littersOfLove || "Litters of Love From The Pet Parent Community"}
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            {t.testimonialsSection?.dontJustTakeOurWord || "Don't just take our word for it. Here's what our customers have to say about Purrify."}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => {
                const element = document.getElementById('testimonials');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
              aria-label="View customer testimonials"
            >
              {t.nav.testimonials}
            </button>
            <button
              onClick={() => window.open('https://g.page/r/CUB8bZ_ibMbwEBM/review', '_blank')}
              className="inline-flex items-center px-6 py-3 bg-white text-[#5B2EFF] font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border-2 border-[#5B2EFF] hover:bg-[#5B2EFF] hover:text-white"
              aria-label="Leave a Google review"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t.nav.leaveReview}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.slice(0, 6).map((testimonial, index) => {
            const colorIndex = index % colorClasses.length;
            const colors = colorClasses[colorIndex];

            return (
              <div
                key={`testimonial-${testimonial.name.replace(/\s+/g, '-').toLowerCase()}-${index}`}
                className={`${colors.bg} backdrop-blur-sm p-8 rounded-2xl shadow-xl border ${colors.border} relative transition-all duration-500 hover:shadow-[#E0EFC7]/50 hover:-translate-y-2 group`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`rounded-full border-4 border-white bg-white shadow-lg overflow-hidden w-16 h-16 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Image
                      src={`https://randomuser.me/api/portraits/${testimonial.name.includes("Jean") ||
                        testimonial.name.includes("François") ||
                        testimonial.name.includes("Mathieu") ||
                        testimonial.name.includes("Robert") ||
                        testimonial.name.includes("Stéphane")
                          ? "men"
                          : "women"
                      }/${index + 1}.jpg`}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 11C10 13.2091 8.20914 15 6 15C3.79086 15 2 13.2091 2 11C2 8.79086 3.79086 7 6 7C8.20914 7 10 8.79086 10 11Z"
                      fill={colors.icon}
                    />
                    <path
                      d="M22 11C22 13.2091 20.2091 15 18 15C15.7909 15 14 13.2091 14 11C14 8.79086 15.7909 7 18 7C20.2091 7 22 8.79086 22 11Z"
                      fill={colors.icon}
                    />
                  </svg>
                </div>
                <div className="pt-10">
                  <div className="flex mb-2">
                    {Array(testimonial.stars || 5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                      ))}
                  </div>
                  <p className="text-gray-800 dark:text-gray-100 italic mb-6 leading-relaxed text-sm md:text-base line-clamp-4 md:line-clamp-6">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="flex items-center justify-between">
                    <p
                      className={`font-bold ${colors.text} text-sm md:text-base`}
                    >
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://g.page/r/CUB8bZ_ibMbwEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg text-[#5B2EFF] hover:text-[#5B2EFF]/80 font-medium transition-all duration-300 group"
          >
            {t.testimonialsSection?.readMoreReviews || "Read More Reviews"}
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
      </Container>
    </section>
  );
}
