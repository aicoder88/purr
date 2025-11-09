import { useVideoPlayer } from './useVideoPlayer';
import Image from 'next/image';

interface HeroVideoProps {
  t: {
    hero: {
      ariaLabels: {
        playVideo: string;
      };
    };
    homepage: {
      seo: {
        videoDescription: string;
      };
      hero: {
        videoAriaLabel: string;
        videoDescriptions: string;
        videoFallbackText: string;
      };
    };
  };
}

export const HeroVideo = ({ t }: HeroVideoProps) => {
  const { videoRef, mediaContainerRef, state, handleVideoPlay } = useVideoPlayer();

  return (
    <div className="relative group flex flex-col items-center">
      <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700"></div>
      <div className="relative overflow-hidden rounded-3xl shadow-2xl dark:shadow-gray-800 group-hover:shadow-[#E0EFC7]/50 dark:group-hover:shadow-[#3694FF]/30 transition duration-300">
        {state.showPlayButton && (
          <button
            className="absolute inset-0 bg-black/20 rounded-3xl flex items-center justify-center cursor-pointer z-10 border-0 focus:outline-none focus:ring-2 focus:ring-[#FF3131] focus:ring-offset-2"
            onClick={handleVideoPlay}
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
          {state.showPoster && (
            <Image
              src="/optimized/cat_rose_thumbnail.avif"
              alt={t.homepage.seo.videoDescription}
              width={1280}
              height={720}
              className="w-full h-auto rounded-2xl object-contain"
              sizes="(max-width: 480px) 100vw, (max-width: 1024px) 90vw, 960px"
              priority
            />
          )}

          {state.shouldLoadVideo && (
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
              onPlay={() => state.showPlayButton && handleVideoPlay()}
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

      <div className="mt-4"></div>
    </div>
  );
};