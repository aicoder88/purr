"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  playLabel: string;
  posterAlt?: string;
}

export const HeroVideo = ({ playLabel }: HeroVideoProps) => {
  const desktopWebmSrc = "/videos/purrify-activated-carbon-litter-additive-demo.webm";
  const desktopSrc = "/videos/purrify-activated-carbon-litter-additive-demo.mp4";
  const posterSrc = "/optimized/marketing/purrify-demo-poster.webp";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleToggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;

    if (!nextMuted && video.volume === 0) {
      video.volume = 1;
    }

    setIsMuted(nextMuted);

    if (!nextMuted && video.paused) {
      void video.play().catch(() => {
        // Ignore autoplay restrictions after explicit user interaction.
      });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncMuteState = () => {
      setIsMuted(video.muted || video.volume === 0);
    };

    syncMuteState();
    video.addEventListener("volumechange", syncMuteState);

    return () => {
      video.removeEventListener("volumechange", syncMuteState);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 aspect-[4/3] lg:aspect-[6/5]">
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
          <source src={desktopWebmSrc} type="video/webm" />
          <source src={desktopSrc} type="video/mp4" />
        </video>
        <button
          type="button"
          onClick={handleToggleMute}
          aria-label={playLabel}
          aria-pressed={!isMuted}
          className="absolute right-4 top-4 z-10 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/70 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 dark:border-gray-200/40 dark:bg-gray-900/70 dark:text-gray-50 dark:hover:bg-gray-900/85 dark:focus-visible:ring-gray-200/80"
        >
          {isMuted ? <VolumeX className="h-7 w-7" aria-hidden="true" /> : <Volume2 className="h-7 w-7" aria-hidden="true" />}
          <span className="sr-only">{playLabel}</span>
        </button>
      </div>
    </div>
  );
};
