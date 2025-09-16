import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, useCallback } from "react";
import { HeroImage } from "@/components/performance/OptimizedImage";

import { scrollToSection } from "@/lib/utils";

import { useTranslation } from "../../lib/translation-context";

import Link from "next/link";



export function Hero() {
  const { t, locale } = useTranslation();

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasAttemptedPlay, setHasAttemptedPlay] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const mediaContainerRef = useRef<HTMLDivElement>(null);



  // Initialize component and video on mount
  useEffect(() => {
    setIsVisible(true);
    setIsVideoLoaded(true); // Show video immediately
  }, []);

  // Handle video play attempts
  const handleVideoPlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    
    try {
      await video.play();
      setShowPlayButton(false);
    } catch (error) {
      console.log('Video autoplay prevented, showing play button:', error);
      setShowPlayButton(true);
    }
  };

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      if (!hasAttemptedPlay) {
        setHasAttemptedPlay(true);
        handleVideoPlay();
      }
    };

    const handlePlaying = () => {
      setShowPoster(false);
    };

    const handleError = () => {
      console.error('Video failed to load');
      setShowPlayButton(true);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('error', handleError);
    };
  }, [hasAttemptedPlay]);

  // Load video sources only when in viewport (reduce LCP pressure)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = mediaContainerRef.current;
    if (!el) {
      // Fallback: if no ref, load immediately
      setShouldLoadVideo(true);
      return;
    }
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setShouldLoadVideo(true);
          io.disconnect();
        }
      }, { threshold: 0.25 });
      io.observe(el);
      return () => io.disconnect();
    } else {
      setShouldLoadVideo(true);
    }
  }, []);

  return (
    <section className="relative w-full pt-20 pb-16 overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300" style={{ willChange: 'auto' }}>
      
      {/* Decorative elements - optimized for GPU acceleration */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF3131]/20 dark:bg-[#FF5050]/10 rounded-full blur-3xl" style={{ transform: 'translateZ(0)', willChange: 'auto' }}></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#E0EFC7]/30 dark:bg-[#3694FF]/10 rounded-full blur-3xl" style={{ transform: 'translateZ(0)', willChange: 'auto' }}></div>
      <div className="absolute top-40 right-20 w-20 h-20 bg-[#5B2EFF]/20 dark:bg-[#5B2EFF]/10 rounded-full blur-xl" style={{ transform: 'translateZ(0)', willChange: 'auto' }}></div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="block bg-gradient-to-r from-[#1E1B4B] to-[#1E1B4B]/80 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {t.hero.eliminateCatOdors}
              </span>
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 50%, #A78BFA 100%)",
                  lineHeight: "1.3"
                }}
              >
                {t.hero.instantly}
              </span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-2xl">
              {t.hero.description}
            </p>
            
            {/* Social Proof Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white dark:text-white dark:text-white text-sm font-bold">
                    MJ
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white dark:text-white text-sm font-bold">
                    SK
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-white dark:border-gray-800 flex items-center justify-center text-white dark:text-white text-sm font-bold">
                    TC
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-gray-50">{t.hero.socialProof.trustNumber}</span>
                  <br />{t.hero.socialProof.trustText}
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400 dark:text-yellow-400">
                  ★★★★★
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                  {t.hero.socialProof.ratingText}
                </span>
              </div>
            </div>
            <div className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Button
                onClick={() => scrollToSection("products")}
                size="lg"
                className="bg-gradient-to-r from-[#FF3131] to-[#FF5050] hover:from-[#E02B2B] hover:to-[#FF4040] text-white dark:text-white font-bold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border-0 transform hover:-translate-y-1 min-w-[200px]"
                aria-label={t.hero.ariaLabels.shopNow}
              >
                {t.hero.buttons.shopNow}
              </Button>
              <Button
                onClick={() => scrollToSection("testimonials")}
                size="lg"
                variant="outline"
                className="bg-white dark:bg-gray-800 text-[#FF3131] dark:text-[#FF5050] font-bold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border-2 border-[#FF3131] dark:border-[#FF5050] hover:bg-[#FF3131] dark:hover:bg-[#FF5050] hover:text-white dark:hover:text-white transform hover:-translate-y-1 min-w-[200px]"
                aria-label={t.hero.ariaLabels.reviews}
              >
                {t.hero.buttons.reviews}
              </Button>
            </div>
          </div>
          
          <div className="relative group flex flex-col items-center">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl dark:shadow-gray-800 group-hover:shadow-[#E0EFC7]/50 dark:group-hover:shadow-[#3694FF]/30 transition duration-300">
              {showPlayButton && (
                <button 
                  className="absolute inset-0 bg-black/20 rounded-3xl flex items-center justify-center cursor-pointer z-10 border-0 focus:outline-none focus:ring-2 focus:ring-[#FF3131] focus:ring-offset-2"
                  onClick={async () => {
                    const video = videoRef.current;
                    if (!video) return;
                    
                    try {
                      await video.play();
                      setShowPlayButton(false);
                    } catch (error) {
                      console.log('Manual video play failed:', error);
                    }
                  }}
                  aria-label={t.hero.ariaLabels.playVideo}
                  type="button"
                >
                  <div className="bg-white dark:bg-gray-800/90 rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </button>
              )}
              <div ref={mediaContainerRef} className="relative w-full max-w-2xl mx-auto" style={{ aspectRatio: '16/9', maxWidth: '100%' }}>
                {showPoster && (
                  <HeroImage
                    src="/optimized/cat_rose_thumbnail.webp"
                    alt={t.homepage.seo.videoDescription}
                    width={1280}
                    height={720}
                    className="w-full h-auto rounded-2xl object-contain"
                    sizes="(max-width: 1024px) 100vw, 960px"
                  />
                )}

                {shouldLoadVideo && (
                  <video
                    ref={videoRef}
                    poster="/optimized/cat_rose_thumbnail.webp"
                    className="w-full h-full rounded-2xl object-contain group-hover:scale-105 transition duration-700 dark:brightness-90 dark:contrast-100"
                    width={1280}
                    height={720}
                    autoPlay
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={t.homepage.hero.videoAriaLabel}
                    role="img"
                    loop
                    tabIndex={-1}
                    itemScope
                    itemType="https://schema.org/VideoObject"
                    controls={false}
                    disablePictureInPicture
                    disableRemotePlayback
                    crossOrigin="anonymous"
                    onPlay={() => setShowPlayButton(false)}
                  >
                    <source src="/videos/cat_rose_optimized.webm" type="video/webm" />
                    <source src="/videos/cat_rose_optimized.mp4" type="video/mp4" />
                    <meta itemProp="thumbnailUrl" content="/optimized/cat_rose_thumbnail.webp" />
                    <meta itemProp="uploadDate" content="2023-09-01T08:00:00+08:00" />
                    <meta itemProp="duration" content="PT30S" />
                    <track kind="descriptions" src="/videos/cat_rose_description.vtt" srcLang="en" label={t.homepage.hero.videoDescriptions} />
                    {t.homepage.hero.videoFallbackText}
                  </video>
                )}
              </div>
            </div>
            
            {/* Feature Showcase - HIDDEN */}
            {/*
            <div className="mt-8 mb-6 w-full">
              <div className="bg-[#FFFFFF]/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#E0EFC7]/30 dark:border-gray-700 transition-all duration-500 max-w-2xl mx-auto hover:shadow-[#E0EFC7]/50 dark:hover:shadow-[#3694FF]/30 hover:-translate-y-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-[#FF3131]/5 to-[#5B2EFF]/5 dark:from-[#FF5050]/10 dark:to-[#3694FF]/10">
                    <div className="w-10 h-10 mb-2 rounded-full bg-[#FF3131]/10 dark:bg-[#FF5050]/20 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-5 h-5 text-[#FF3131] dark:text-[#FF5050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold mb-1 dark:text-white dark:text-gray-100">{t.benefits.molecular.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{t.benefits.molecular.description}</p>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-[#5B2EFF]/5 to-[#FF3131]/5 dark:from-[#3694FF]/10 dark:to-[#FF5050]/10">
                    <div className="w-10 h-10 mb-2 rounded-full bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-5 h-5 text-[#5B2EFF] dark:text-[#3694FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold mb-1 dark:text-white dark:text-gray-100">{t.benefits.sevenDayFreshness.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{t.benefits.sevenDayFreshness.description}</p>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-[#FF3131]/5 to-[#5B2EFF]/5 dark:from-[#FF5050]/10 dark:to-[#3694FF]/10">
                    <div className="w-10 h-10 mb-2 rounded-full bg-[#FF3131]/10 dark:bg-[#FF5050]/20 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-5 h-5 text-[#FF3131] dark:text-[#FF5050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold mb-1 dark:text-white dark:text-gray-100">{t.benefits.natural.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{t.benefits.natural.description}</p>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-[#5B2EFF]/5 to-[#FF3131]/5 dark:from-[#3694FF]/10 dark:to-[#FF5050]/10">
                    <div className="w-10 h-10 mb-2 rounded-full bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-5 h-5 text-[#5B2EFF] dark:text-[#3694FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold mb-1 dark:text-white dark:text-gray-100">{t.benefits.universalFit.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{t.benefits.universalFit.description}</p>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-[#FF3131]/5 to-[#5B2EFF]/5 dark:from-[#FF5050]/10 dark:to-[#3694FF]/10">
                    <div className="w-10 h-10 mb-2 rounded-full bg-[#FF3131]/10 dark:bg-[#FF5050]/20 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-5 h-5 text-[#FF3131] dark:text-[#FF5050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold mb-1 dark:text-white dark:text-gray-100">{t.benefits.highlyRated.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{t.benefits.highlyRated.description}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-center items-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 dark:text-yellow-300 dark:text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{t.homepage.hero.highlyRated}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 dark:text-green-400 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{t.homepage.hero.moneyBackGuarantee}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 dark:text-blue-300 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                    </svg>
                    <span>{t.homepage.hero.freeShippingCanada}</span>
                  </div>
                </div>
              </div>
            </div>
            */}
            
            {/* Empty div to maintain spacing */}
            <div className="mt-4"></div>
          </div>
        </div>
      </Container>
      
      {/* Full width scroll indicator arrow only */}
      <div className="w-full -mt-4 text-center flex flex-col items-center">
        <svg
          className="w-6 h-6 text-[#0072CE] dark:text-[#3694FF] animate-bounce bg-white dark:bg-gray-800/80 dark:bg-gray-800/80 rounded-full p-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
