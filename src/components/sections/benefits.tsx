import { Container } from "@/components/ui/container";
import SectionHeader from "../ui/section-header";

export function Benefits() {
  return (
    <section
      className="py-12 bg-gradient-to-br from-[#FFFFFF] to-[#FFFFF5] dark:from-gray-900 dark:to-gray-950 transition-colors duration-300"
      id="benefits"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeader text="Why Choose Purrify" />
          {/* <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
            Why Choose Purrify
          </div> */}
          <h2 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] dark:from-[#FF5050] dark:to-[#3694FF] bg-clip-text text-transparent">
            Benefits of Purrify
          </h2>
          <p className="text-gray-600 text-xl dark:text-gray-300">
            Discover why Purrify is the perfect solution for cat owners who want
            a fresh-smelling home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FFFFFF]/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-[#E0EFC7] transition-all duration-500 hover:shadow-[#E0EFC7]/70 hover:-translate-y-2 group">
            <div className="bg-gradient-to-r from-[#03E46A] to-[#03E46A]/80 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-4 text-[#03E46A]">
              Odor Elimination
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Purrify's advanced formula effectively eliminates unpleasant
              litter box odors at their source. Say goodbye to the lingering
              smells that can permeate your home and welcome a fresher, more
              inviting environment for both you and your furry friend.
            </p>
          </div>

          <div className="bg-[#FFFFFF]/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-[#E0EFC7] transition-all duration-500 hover:shadow-[#E0EFC7]/70 hover:-translate-y-2 group">
            <div className="bg-gradient-to-r from-[#5B2EFF] to-[#5B2EFF]/80 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-4 text-[#5B2EFF]">Simple</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Purrify is formulated with simple coconut shells, activated to
              soak up odor. You can trust that you're providing your cat with a
              clean smelling box environment without exposing them to chemicals
              or toxins.
            </p>
          </div>

          <div className="bg-[#FFFFFF]/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-[#E0EFC7] transition-all duration-500 hover:shadow-[#E0EFC7]/70 hover:-translate-y-2 group">
            <div className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-4 text-[#FF3131]">
              Cost-Effective
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Purrify helps extend the life of your cat's litter by preventing
              odor buildup, which means you'll need to change the litter less
              frequently. This not only saves you money but also reduces waste,
              making it a win-win for both your wallet and the environment.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
