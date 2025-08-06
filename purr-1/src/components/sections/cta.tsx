import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useTranslation } from "../../lib/translation-context";
<<<<<<< HEAD
import Image from "next/image";
=======
import dynamic from "next/dynamic";
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';
>>>>>>> 4a35066 (feat: Complete comprehensive website improvements and optimizations)


export function CTA() {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [stripe, setStripe] = useState<any>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      setStripe(stripeInstance);
    };

    initializeStripe();
  }, []);

  const handleOrderNow = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            id: 'trial-size-17g',
            name: 'Purrify Trial Size (17g)',
            description: '17g of activated carbon cat litter additive',
            price: 699, // $6.99 in cents
            currency: 'CAD',
            quantity: 1,
            image: 'https://purrify.ca/purrify-trial-17g.jpg'
          }],
          customer: { email: '' },
          success_url: `${window.location.origin}${locale === 'fr' ? '/fr' : ''}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}${locale === 'fr' ? '/fr' : ''}/products/trial-size`,
        }),
      });

      if (!response.ok) throw new Error('Failed to create checkout session');
      
      const { sessionId } = await response.json();
      const { error } = await stripe!.redirectToCheckout({ sessionId });
      if (error) throw error;
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="py-12 relative overflow-hidden bg-gradient-to-r from-[#5B2EFF] to-[#03E46A] dark:from-[#3694FF] dark:to-[#FF5050] opacity-90 transition-colors duration-300">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#5B2EFF] to-[#03E46A] dark:from-[#3694FF] dark:to-[#FF5050] opacity-90"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full opacity-10"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white rounded-full opacity-10 animate-pulse"></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 backdrop-blur-sm bg-white/10 dark:bg-black/30 rounded-3xl p-10 border border-white/20 dark:border-[#3694FF]/30 shadow-2xl relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80"
            alt="Happy cat"
            width={800}
            height={800}
            className="absolute top-0 right-0 w-1/3 h-full object-cover opacity-20 rounded-r-3xl"
          />
          <div className="text-white max-w-2xl bg-black/30 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {t.cta?.title || "Ready to Say Goodbye to Litter Box Odors Forever?"}
            </h2>
            <p className="text-white/90 text-lg">
              {t.cta?.subtitle || "Join thousands of happy cat owners who have transformed their homes with Purrify. Try it risk-free with our 30-day satisfaction guarantee."}
            </p>
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src="https://randomuser.me/api/portraits/women/32.jpg"
                    alt="User"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src="https://randomuser.me/api/portraits/men/45.jpg"
                    alt="User"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="User"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="text-white/90 text-sm font-medium">
                {t.cta?.joinText || "Join 1,000+ Happy cat Families - Visit your local store"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 min-w-[200px]">
            <Button
              size="lg"
              onClick={handleOrderNow}
              disabled={isLoading || !stripe}
              className="bg-white text-[#5B2EFF] hover:bg-gray-100 dark:bg-[#3694FF] dark:text-white dark:hover:bg-[#2d7ed8] font-bold py-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 text-lg disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.cta?.processingText || 'Processing...'}
                </>
              ) : (
                t.cta?.buttonText || "ORDER NOW"
              )}
            </Button>

            <p className="text-white/80 text-xs text-center mt-2">
              {t.cta?.guarantee || "30-day money-back guarantee"}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
