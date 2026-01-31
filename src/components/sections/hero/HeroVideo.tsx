import { useState, useEffect } from 'react';
import { useVideoPlayer } from './useVideoPlayer';
import Image from 'next/image';

interface HeroVideoProps {
  t: any; // Using any to avoid strict type checking for unused props since we are hardcoding
}

export const HeroVideo = ({ t }: HeroVideoProps) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const { videoRef, mediaContainerRef, state, handleVideoPlay, handleVideoEnded, toggleMute, handleVolumeChange } = useVideoPlayer([isMobile]);

  // Screen size detection for optimized loading
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint usually 1024px
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine video sources based on existing assets (placeholder for new exports)
  // Note: These will be updated once the user provides the new 1920x800 and 1080x1350 files
  const desktopSrc = "/videos/purrify-activated-carbon-litter-additive-demo.mp4";
  const mobileSrc = "/videos/purrify-activated-carbon-litter-additive-demo.mp4"; // User indicated updated video is in same spot

  return (
    <div className="relative group flex flex-col items-center w-full">
      {/* Background Glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700"></div>

      {/* Video Container - Responsive Aspect Ratio */}
      <div className={`relative overflow-hidden rounded-3xl shadow-2xl dark:shadow-gray-800 group-hover:shadow-[#E0EFC7]/50 dark:group-hover:shadow-[#3694FF]/30 transition-all duration-500 w-full bg-gray-100 dark:bg-gray-800 mx-auto
        ${isMobile ? 'aspect-[3/4] w-full max-w-md' : 'h-full min-h-[500px]'}`}
      >

        {/* Replay Button Overlay */}
        {state.showPlayButton && (
          <button
            className="absolute inset-0 bg-black/20 z-20 flex items-center justify-center cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-[#FF3131] focus:ring-offset-2 w-full h-full"
            onClick={handleVideoPlay}
            aria-label="Replay video"
            type="button"
          >
            <div className="bg-white dark:bg-gray-800/90 rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
              </svg>
            </div>
          </button>
        )}

        {/* Volume Control Overlay */}
        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2 group/volume">
          <div className="hidden sm:flex bg-black/40 backdrop-blur-md rounded-full px-3 py-2 items-center gap-2 opacity-0 group-hover/volume:opacity-100 transition-opacity duration-300">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={state.isMuted ? 0 : state.volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-white"
              aria-label="Volume"
            />
          </div>
          <button
            onClick={toggleMute}
            className="bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-2.5 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={state.isMuted ? "Unmute video" : "Mute video"}
          >
            {state.isMuted ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>

        {/* Media Content */}
        <div ref={mediaContainerRef} className="relative w-full h-full">
          {state.showPoster && (
            <Image
              src="/images/purrify-demo-poster.webp"
              alt="How to use Purrify: Pouring activated carbon litter additive onto litter instantly neutralizing odors."
              fill
              className="object-cover"
              sizes="(max-width: 480px) 100vw, 800px"
              priority
            />
          )}

          {state.shouldLoadVideo && isMobile !== null && (
            <video
              key={isMobile ? 'mobile' : 'desktop'} // Force remount on switch to load correct source
              ref={videoRef}
              className="w-full h-full object-cover dark:brightness-90 dark:contrast-100"
              autoPlay
              muted={state.isMuted}
              playsInline
              preload="metadata"
              aria-label="How to use Purrify: Pouring activated carbon litter additive onto litter to instantly neutralize odors."
              role="img"
              tabIndex={-1}
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              crossOrigin="anonymous"
              onEnded={handleVideoEnded}
            >
              <source
                src={isMobile ? mobileSrc.replace('.mp4', '.webm') : desktopSrc.replace('.mp4', '.webm')}
                type="video/webm"
              />
              <source
                src={isMobile ? mobileSrc : desktopSrc}
                type="video/mp4"
              />
              <p>Your browser does not support the video tag.</p>
            </video>
          )}
        </div>
      </div>

      {/* Caption */}
      <div className="mt-6 text-center max-w-2xl mx-auto relative z-10">
        <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
          Just Pour. Mix. And Breathe Easy.
        </p>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          No complex setup. See how easily Purrify works with your existing litter to trap odors instantly.
        </p>
      </div>
    </div>
  );
};