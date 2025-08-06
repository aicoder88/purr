import { useState, useEffect } from 'react';
import { X, Gift, Star, Mail, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function EmailCapturePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 30 seconds or when user tries to leave
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('purrify-email-popup-seen');
      if (!hasSeenPopup) {
        setIsVisible(true);
      }
    }, 30000);

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        const hasSeenPopup = localStorage.getItem('purrify-email-popup-seen');
        if (!hasSeenPopup) {
          setIsVisible(true);
        }
      }
    };

    // ESC key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      localStorage.setItem('purrify-email-popup-seen', 'true');
      
      // Auto-close after success
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Email submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('purrify-email-popup-seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Popup Content */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF3131] focus:ring-opacity-50"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-gray-600 hover:text-gray-800" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header with Gift */}
            <div className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-white p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-repeat"
                     style={{ 
                       backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M30 30m-20 0a20,20 0 1,1 40,0a20,20 0 1,1 -40,0'/%3E%3C/g%3E%3C/svg%3E\")",
                       backgroundSize: '60px 60px'
                     }}
                ></div>
              </div>
              <div className="relative z-10">
                <Gift className="w-12 h-12 mx-auto mb-3 animate-bounce" />
                <h2 className="text-2xl font-bold mb-2">Get 20% OFF Your First Order!</h2>
                <p className="text-white/90">Plus exclusive cat care tips & early access to new products</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="flex justify-center items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-gray-600 font-medium">4.9/5 from 2,847 reviews</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Join 10,000+ happy cat parents who get exclusive deals and expert tips!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3131] focus:border-transparent outline-none transition-all duration-200"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Getting Your Discount...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Claim My 20% Discount
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center text-xs text-gray-600">
                <div>
                  <div className="font-bold text-[#FF3131]">10,000+</div>
                  <div>Happy Customers</div>
                </div>
                <div>
                  <div className="font-bold text-[#FF3131]">30-Day</div>
                  <div>Money Back</div>
                </div>
                <div>
                  <div className="font-bold text-[#FF3131]">Free</div>
                  <div>Shipping</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to the Purrify Family!</h3>
            <p className="text-gray-600 mb-4">
              Check your email for your 20% discount code and exclusive cat care guide.
            </p>
            <div className="bg-[#FF3131]/10 border border-[#FF3131]/20 rounded-lg p-4">
              <p className="text-[#FF3131] font-medium text-sm">
                🎉 Your discount code: <span className="font-bold">WELCOME20</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
