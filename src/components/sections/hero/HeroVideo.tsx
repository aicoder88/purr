"use client";

import { useCallback, useRef, useState } from "react";

interface HeroVideoProps {
  playLabel: string;
  posterAlt: string;
}

export const HeroVideo = ({ playLabel, posterAlt }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoActive, setIsVideoActive] = useState(false);

  const desktopSrc = "/videos/purrify-activated-carbon-litter-additive-demo.mp4";
  const posterSrc = "/optimized/marketing/purrify-demo-poster.webp";

  const activateVideo = useCallback(() => {
    setIsVideoActive(true);
  }, []);

  return (
    <div className="relative w-full max-w-md lg:max-w-xl">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 aspect-[3/4] lg:aspect-[4/5]">
        {isVideoActive ? (
          <video
            ref={videoRef}
            className="hero-video-audio-controls w-full h-full object-cover object-top"
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterSrc}
            aria-label={playLabel}
          >
            <source src={desktopSrc.replace(".mp4", ".webm")} type="video/webm" />
            <source src={desktopSrc} type="video/mp4" />
          </video>
        ) : (
          <button
            type="button"
            onClick={activateVideo}
            className="relative h-full w-full"
            aria-label={playLabel}
          >
            <picture className="block h-full w-full">
              <source srcSet={posterSrc} type="image/webp" />
              <img
                src={posterSrc}
                alt={posterAlt}
                width={406}
                height={720}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </picture>
            <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/10">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg dark:bg-gray-100 dark:text-gray-900">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 translate-x-0.5"
                  fill="currentColor"
                >
                  <path d="M8 5.5v13l10-6.5-10-6.5Z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
