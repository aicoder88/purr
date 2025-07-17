import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useTranslation } from "../../lib/translation-context";

export function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setSubmitStatus({
        success: false,
        message: "Please enter your email address."
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: responseData.message || (t.newsletter?.successMessage || "Thank you for subscribing!")
        });
        setEmail(""); // Clear the form on success
      } else {
        setSubmitStatus({
          success: false,
          message: responseData.message || (t.newsletter?.errorMessage || "An error occurred. Please try again.")
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: t.newsletter?.errorMessage || "An error occurred. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-[#FFFFFF] to-[#FFFFF5] dark:from-gray-900 dark:to-gray-950 relative overflow-hidden transition-colors duration-300">
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#5B2EFF]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#03E46A]/20 rounded-full blur-3xl"></div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-[#E0EFC7] dark:border-gray-800">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1 bg-[#E0EFC7] dark:bg-[#3694FF]/20 rounded-full text-[#FF3131] dark:text-[#3694FF] font-medium text-sm mb-4">
              Stay Updated
            </div>
            <h2 className="text-4xl font-bold mb-4 text-[#5B2EFF] dark:text-[#3694FF]">
              Join Our Cat-Loving Community
            </h2>
            <p className="text-gray-600 text-lg dark:text-gray-300">
              Subscribe to our newsletter for exclusive offers, cat care tips,
              and be the first to know about new Purrify products.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder={t.newsletter?.placeholder || "Your email address"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-5 py-4 rounded-xl border border-[#E0EFC7] focus:ring-[#5B2EFF] focus:border-[#5B2EFF] shadow-sm transition-all duration-300"
              required
              disabled={isSubmitting}
            />
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#5B2EFF] to-[#5B2EFF]/80 hover:from-[#5B2EFF]/90 hover:to-[#5B2EFF] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Subscribing..." : (t.newsletter?.buttonText || "Subscribe Now")}
            </Button>
          </form>

          {/* Status message */}
          {submitStatus.message && (
            <div
              className={`mt-4 p-4 rounded-lg text-center ${
                submitStatus.success
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
              role="alert"
              aria-live="polite"
            >
              {submitStatus.message}
            </div>
          )}

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
