"use client";

import Image from "next/image";
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
  const logoSrc = "/optimized/logos/purrify-logo.webp";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

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

    const markReady = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        setIsVideoReady(true);
      }
    };

    const attemptAutoplay = () => {
      if (!video.paused) return;
      void video.play().catch(() => {
        // Ignore autoplay failures; the browser may still block playback.
      });
    };

    syncMuteState();
    markReady();
    attemptAutoplay();
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", attemptAutoplay);
    video.addEventListener("canplay", markReady);
    video.addEventListener("volumechange", syncMuteState);

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", attemptAutoplay);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("volumechange", syncMuteState);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 aspect-[4/3] lg:aspect-[6/5]">
        {/* Keep the homepage hero video mounted and autoplaying; do not swap it for click-to-play posters during perf/SEO passes. */}
        <video
          ref={videoRef}
          className="hero-video-audio-controls w-full h-full object-cover object-top"
          controls
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          aria-label={playLabel}
        >
          <source src={desktopWebmSrc} type="video/webm" />
          <source src={desktopSrc} type="video/mp4" />
        </video>
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top,#fffaf0_0%,#fef3f2_45%,#f5f5f4_100%)] transition-opacity duration-300 dark:bg-[radial-gradient(circle_at_top,#1f2937_0%,#111827_45%,#030712_100%)]",
            isVideoReady ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          <div className="flex flex-col items-center gap-4 rounded-[2rem] border border-white/60 bg-white/70 px-8 py-6 shadow-lg backdrop-blur-sm dark:border-gray-200/10 dark:bg-gray-900/60">
            <Image
              src={logoSrc}
              alt=""
              width={164}
              height={52}
              priority
              className="h-auto w-[132px] sm:w-[164px]"
            />
            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-brand-pink/15 dark:bg-white/10">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-brand-red-500/70 dark:bg-brand-yellow/70" />
            </div>
          </div>
        </div>
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
