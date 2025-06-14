import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  return (
    <section className="py-12 bg-gradient-to-br from-[#FFFFFF] to-[#FFFFF5] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#5B2EFF]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#03E46A]/20 rounded-full blur-3xl"></div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-[#E0EFC7]">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
              Stay Updated
            </div>
            <h2 className="text-4xl font-bold mb-4 text-[#5B2EFF]">
              Join Our Cat-Loving Community
            </h2>
            <p className="text-gray-600 text-lg">
              Subscribe to our newsletter for exclusive offers, cat care tips,
              and be the first to know about new Purrify products.
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-5 py-4 rounded-xl border border-[#E0EFC7] focus:ring-[#5B2EFF] focus:border-[#5B2EFF] shadow-sm transition-all duration-300"
              required
            />
            <Button className="bg-gradient-to-r from-[#5B2EFF] to-[#5B2EFF]/80 hover:from-[#5B2EFF]/90 hover:to-[#5B2EFF] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 whitespace-nowrap">
              Subscribe Now
            </Button>
          </form>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-[#5B2EFF] mr-2"
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
              <p className="text-sm text-gray-600">No spam, ever</p>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-[#03E46A] mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-gray-600">Monthly newsletter</p>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-[#FF3131] mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-sm text-gray-600">Unsubscribe anytime</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
