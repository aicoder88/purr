"use client";

import { useRef } from "react";

interface HeroVideoProps {
  playLabel: string;
}

export const HeroVideo = ({ playLabel }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const desktopSrc = "/videos/purrify-activated-carbon-litter-additive-demo.mp4";

  return (
    <div className="relative w-full max-w-md lg:max-w-xl">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 aspect-[3/4] lg:aspect-[4/5]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover object-top"
          controls
          autoPlay
          muted
          loop
          playsInline
          poster="/optimized/marketing/purrify-demo-poster.webp"
          aria-label={playLabel}
        >
          <source src={desktopSrc.replace(".mp4", ".webm")} type="video/webm" />
          <source src={desktopSrc} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

