import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { Badge } from '../../src/components/ui/badge';
import { useState, useCallback } from 'react';
import type { MouseEvent } from 'react';
import { 
  Smartphone, 
  Shield, 
  Zap, 
  TouchpadIcon as Touch, 
  CreditCard, 
  Star,
  CheckCircle,
  ArrowRight,
  Globe,
  Wifi
} from 'lucide-react';

// Import all Stage 5 components
import { TrustBadges } from '../../src/components/social-proof/TrustBadges';
import { TouchGallery } from '../../src/components/mobile/TouchGallery';
import MobilePayment from '../../src/components/mobile/MobilePayment';
import { FastCheckout } from '../../src/components/mobile/FastCheckout';

const Stage5DemoPage: NextPage = () => {
  const [activeDemo, setActiveDemo] = useState<string>('overview');
  const [showNotifications, setShowNotifications] = useState(true);

  const toggleNotifications = useCallback(() => {
    setShowNotifications(prev => !prev);
  }, []);

  const handleSelectDemo = useCallback((demoId: string) => {
    setActiveDemo(demoId);
  }, []);

  const handleDemoButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const { demoId } = event.currentTarget.dataset;
    if (!demoId) return;
    handleSelectDemo(demoId);
  }, [handleSelectDemo]);

  const handleCardClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const { demoId } = event.currentTarget.dataset;
    if (!demoId) return;
    handleSelectDemo(demoId);
  }, [handleSelectDemo]);

  const handleMobilePaymentSuccess = useCallback((data: unknown) => {
    console.log('Payment success:', data);
  }, []);

  const handleMobilePaymentError = useCallback((error: unknown) => {
    console.error('Payment error:', error);
  }, []);

  const handleDemoCheckoutComplete = useCallback((data: unknown) => {
    console.log('Checkout complete:', data);
  }, []);

  // Sample product images for TouchGallery demo
  const sampleImages = [
    {
      src: '/optimized/purrify-product-1.webp',
      alt: 'Purrify 12g Trial Size',
      caption: 'Perfect for trying Purrify'
    },
    {
      src: '/optimized/purrify-product-2.webp', 
      alt: 'Purrify 150g Regular Size',
      caption: 'Our most popular size'
    },
    {
      src: '/optimized/purrify-product-3.webp',
      alt: 'Purrify 300g Family Size', 
      caption: 'Best value for multiple cats'
    }
  ];

  const features = [
    {
      id: 'social-proof',
      title: 'Social Proof Widgets',
      description: 'Real-time purchase notifications and trust badges',
      icon: Star,
      color: 'bg-yellow-500'
    },
    {
      id: 'mobile-payments',
      title: 'Mobile Payment Options',
      description: 'Apple Pay, Google Pay integration with device detection',
      icon: CreditCard,
      color: 'bg-green-500'
    },
    {
      id: 'fast-checkout',
      title: 'Fast Mobile Checkout',
      description: 'Streamlined checkout with auto-fill and validation',
      icon: Zap,
      color: 'bg-blue-500'
    },
    {
      id: 'touch-gallery',
      title: 'Touch Gesture Gallery',
      description: 'Swipe navigation for product images',
      icon: Touch,
      color: 'bg-purple-500'
    },
    {
      id: 'pwa-features',
      title: 'PWA Capabilities',
      description: 'Offline support, app shortcuts, push notifications',
      icon: Smartphone,
      color: 'bg-indigo-500'
    },
    {
      id: 'trust-badges',
      title: 'Trust & Security',
      description: 'Security badges and satisfaction guarantees',
      icon: Shield,
      color: 'bg-red-500'
    }
  ];

  const renderDemo = () => {
    switch (activeDemo) {
      case 'social-proof':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Social Proof Widgets</h3>
              <p className="text-gray-600 dark:text-gray-300 dark:text-gray-400 mb-6">
                Build customer confidence with real-time purchase notifications and trust badges
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Purchase Notifications</h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 relative min-h-[200px]">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Real-time notifications appear in the bottom-left corner
                  </p>
          <Button 
            onClick={toggleNotifications}
            variant="outline"
          >
            {showNotifications ? 'Hide' : 'Show'} Notifications
          </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Trust Badges</h4>
                <TrustBadges variant="compact" showIcons={true} maxBadges={3} />
              </div>
            </div>
          </div>
        );

      case 'mobile-payments':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Mobile Payment Options</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Seamless payment experience with Apple Pay and Google Pay
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <MobilePayment 
                amount={29.99}
                currency="CAD"
                onPaymentSuccess={handleMobilePaymentSuccess}
                onPaymentError={handleMobilePaymentError}
              />
            </div>
          </div>
        );

      case 'fast-checkout':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Fast Mobile Checkout</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Complete purchases in under 60 seconds with smart auto-fill
              </p>
            </div>
            
            <FastCheckout 
              cartTotal={29.99}
              onCheckoutComplete={handleDemoCheckoutComplete}
            />
          </div>
        );

      case 'touch-gallery':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Touch Gesture Gallery</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Swipe through product images with smooth touch gestures
              </p>
            </div>
            
            <div className="max-w-lg mx-auto">
              <TouchGallery 
                images={sampleImages}
                autoPlay={true}
                showDots={true}
                showArrows={true}
              />
              <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                👆 Try swiping left/right on mobile or use arrow keys
              </div>
            </div>
          </div>
        );

      case 'pwa-features':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">PWA Capabilities</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                App-like experience with offline support and native features
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Wifi className="w-6 h-6 text-blue-600 dark:text-blue-400 dark:text-blue-400" />
                  <h4 className="text-lg font-semibold">Offline Support</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Cached pages work offline</li>
                  <li>• Background sync for forms</li>
                  <li>• Offline page with helpful info</li>
                  <li>• Service worker optimization</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <h4 className="text-lg font-semibold">App Features</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Install as native app</li>
                  <li>• App shortcuts to key pages</li>
                  <li>• Push notifications</li>
                  <li>• Splash screen & icons</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <Button className="bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white dark:text-gray-100 dark:text-gray-100">
                <Smartphone className="w-4 h-4 mr-2" />
                Install Purrify App
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-2">
                Available on mobile browsers that support PWA
              </p>
            </div>
          </div>
        );

      case 'trust-badges':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Trust & Security Badges</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Build customer confidence with security and satisfaction guarantees
              </p>
            </div>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Grid Layout</h4>
                <TrustBadges variant="grid" showIcons={true} />
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Horizontal Layout</h4>
                <TrustBadges variant="horizontal" showIcons={true} maxBadges={4} />
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Compact Layout</h4>
                <TrustBadges variant="compact" showIcons={true} maxBadges={3} />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Stage 5: Advanced Features Overview</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Explore the latest social proof and mobile experience enhancements
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
                  data-demo-id={feature.id}
                  onClick={handleCardClick}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center`}>
                      <feature.icon className="w-5 h-5 text-white dark:text-gray-100" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-50 dark:text-gray-100">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-[#5B2EFF] text-sm font-medium">
                    View Demo
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <NextSeo
        title="Stage 5 Features Demo - Purrify"
        description="Explore the latest social proof and mobile experience enhancements"
        noindex={true}
      />
      
      <Container>
        <div className="py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#5B2EFF] text-white dark:text-gray-100">
              Stage 5 Features
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Advanced Features Demo
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Experience the latest social proof widgets, mobile payment options, 
              PWA capabilities, and enhanced mobile checkout flow.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant={activeDemo === 'overview' ? 'default' : 'outline'}
              data-demo-id="overview"
              onClick={handleDemoButtonClick}
              className={activeDemo === 'overview' ? 'bg-[#5B2EFF] text-white dark:text-gray-100' : ''}
            >
              Overview
            </Button>
            {features.map((feature) => (
              <Button
                key={feature.id}
                variant={activeDemo === feature.id ? 'default' : 'outline'}
                data-demo-id={feature.id}
                onClick={handleDemoButtonClick}
                className={activeDemo === feature.id ? 'bg-[#5B2EFF] text-white dark:text-gray-100' : ''}
              >
                {feature.title}
              </Button>
            ))}
          </div>

          {/* Demo Content */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            {renderDemo()}
          </div>

          {/* Implementation Notes */}
          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 dark:text-blue-100 dark:text-blue-200 mb-3">
              🚀 Implementation Status
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-200 dark:text-blue-200 mb-2">Completed Features:</h4>
                <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Social proof widgets</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Trust badges</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Touch gesture gallery</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Mobile payment components</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Enhanced Features:</h4>
                <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Fast mobile checkout</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> PWA manifest & service worker</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Offline page support</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Integrated on homepage & checkout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Social Proof Notifications - Temporarily disabled */}
      {/* {showNotifications && (
        <PurchaseNotifications 
          position="bottom-left"
          autoHide={true}
          hideDelay={5000}
        />
      )} */}
    </>
  );
};

export default Stage5DemoPage;
