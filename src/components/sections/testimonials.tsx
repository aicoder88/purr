import { Container } from "@/components/ui/container";
import { TESTIMONIALS } from "@/lib/constants";
// import SectionHeader from "../ui/section-header";

export function Testimonials() {
  const colorClasses = [
    {
      bg: "bg-[#FF3131]/10",
      border: "border-[#FF3131]/30",
      text: "text-[#FF3131]",
      icon: "#FF3131",
    },
    {
      bg: "bg-[#5B2EFF]/10",
      border: "border-[#5B2EFF]/30",
      text: "text-[#5B2EFF]",
      icon: "#5B2EFF",
    },
    {
      bg: "bg-[#03E46A]/10",
      border: "border-[#03E46A]/30",
      text: "text-[#03E46A]",
      icon: "#03E46A",
    },
  ];

  return (
    <section
      className="py-12 bg-gradient-to-br from-[#FFFFF5] to-[#FFFFFF]"
      id="testimonials"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
            Customer Love
          </div> */}
          <SectionHeader text=" Customer Love" />
          <h2 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent">
            Litters of Love From The Pet Parent Community
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to
            say about Purrify.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.slice(0, 6).map((testimonial, index) => {
            const colorIndex = index % colorClasses.length;
            const colors = colorClasses[colorIndex];

            return (
              <div
                key={index}
                className={`${colors.bg} backdrop-blur-sm p-8 rounded-2xl shadow-xl border ${colors.border} relative transition-all duration-500 hover:shadow-[#E0EFC7]/50 hover:-translate-y-2 group`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`rounded-full border-4 border-white bg-white shadow-lg overflow-hidden w-16 h-16 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <img
                      src={`https://randomuser.me/api/portraits/${
                        testimonial.name.includes("Jean") ||
                        testimonial.name.includes("François") ||
                        testimonial.name.includes("Mathieu") ||
                        testimonial.name.includes("Robert") ||
                        testimonial.name.includes("Stéphane")
                          ? "men"
                          : "women"
                      }/${index + 1}.jpg`}
                      alt={testimonial.name}
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
                  <p className="text-gray-600 italic mb-6 leading-relaxed text-sm md:text-base line-clamp-4 md:line-clamp-6">
                    "{testimonial.text}"
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
            href="#"
            className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg text-[#5B2EFF] hover:text-[#5B2EFF]/80 font-medium transition-all duration-300 group"
          >
            Read More Reviews
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
