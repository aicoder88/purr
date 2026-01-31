import { useVideoPlayer } from './useVideoPlayer';
import Image from 'next/image';

interface HeroVideoProps {
  t: any; // Using any to avoid strict type checking for unused props since we are hardcoding
}

export const HeroVideo = ({ t }: HeroVideoProps) => {
  const { videoRef, mediaContainerRef, state, handleVideoPlay, handleVideoEnded } = useVideoPlayer();

  return (
    <div className="relative group flex flex-col items-center">
      {/* Background Glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700"></div>

      {/* Video Container - Vertical Aspect Ratio */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl dark:shadow-gray-800 group-hover:shadow-[#E0EFC7]/50 dark:group-hover:shadow-[#3694FF]/30 transition duration-300 w-full max-w-sm aspect-[9/16] bg-gray-100 dark:bg-gray-800 mx-auto">

        {/* Replay Button Overlay */}
        {state.showPlayButton && (
          <button
            className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-[#FF3131] focus:ring-offset-2 w-full h-full"
            onClick={handleVideoPlay}
            aria-label="Replay video"
            type="button"
          >
            <div className="bg-white dark:bg-gray-800/90 rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
              {/* Replay Icon */}
              <svg className="w-8 h-8 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
              </svg>
            </div>
          </button>
        )}

        {/* Media Content */}
        <div ref={mediaContainerRef} className="relative w-full h-full">
          {state.showPoster && (
            <Image
              src="/images/purrify-demo-poster.webp"
              alt="How to use Purrify: Pouring activated carbon litter additive onto litter instantly neutralizing odors."
              fill
              className="object-cover"
              sizes="(max-width: 480px) 100vw, 400px"
              priority
            />
          )}

          {state.shouldLoadVideo && (
            <video
              ref={videoRef}
              poster="/images/purrify-demo-poster.webp"
              className="w-full h-full object-cover dark:brightness-90 dark:contrast-100"
              width={406}
              height={720}
              autoPlay
              muted
              playsInline
              preload="metadata"
              aria-label="How to use Purrify: Pouring activated carbon litter additive onto litter to instantly neutralize odors before a cat uses the box."
              role="img"
              tabIndex={-1}
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              crossOrigin="anonymous"
              onPlay={() => state.showPlayButton && handleVideoPlay()}
              onEnded={handleVideoEnded}
            >
              <source src="/videos/purrify-activated-carbon-litter-additive-demo.webm" type="video/webm" />
              <source src="/videos/purrify-activated-carbon-litter-additive-demo.mp4" type="video/mp4" />
              <p>Your browser does not support the video tag.</p>
            </video>
          )}
        </div>
      </div>

      {/* Caption */}
      <div className="mt-6 text-center max-w-lg mx-auto relative z-10">
        <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
          Just Pour. Mix. And Breathe Easy.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          No complex setup. See how easily Purrify works with your existing litter to trap odors instantly.
        </p>
      </div>
    </div>
  );
};