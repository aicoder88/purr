"use client";

interface HeroVideoProps {
  playLabel: string;
  posterAlt?: string;
}

export const HeroVideo = ({ playLabel }: HeroVideoProps) => {
  const desktopSrc = "/videos/purrify-activated-carbon-litter-additive-demo.mp4";
  const posterSrc = "/optimized/marketing/purrify-demo-poster.webp";

  return (
    <div className="relative w-full max-w-md lg:max-w-xl">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 aspect-[3/4] lg:aspect-[4/5]">
        <video
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
      </div>
    </div>
  );
};
