import { useState, useEffect, useRef } from 'react';

interface VideoPlayerState {
  showPlayButton: boolean;
  showPoster: boolean;
  shouldLoadVideo: boolean;
  hasAttemptedPlay: boolean;
}

export const useVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<VideoPlayerState>({
    showPlayButton: false,
    showPoster: true,
    shouldLoadVideo: false,
    hasAttemptedPlay: false
  });

  const handleVideoPlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setState(prev => ({ ...prev, showPlayButton: false }));
    } catch (err) {
      console.log('Video autoplay prevented, showing play button:', err);
      setState(prev => ({ ...prev, showPlayButton: true }));
    }
  };

  const handleVideoPlaying = () => {
    setState(prev => ({ ...prev, showPoster: false }));
  };

  const handleVideoError = () => {
    console.error('Video failed to load');
    setState(prev => ({ ...prev, showPlayButton: true }));
  };

  // Setup video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      if (!state.hasAttemptedPlay) {
        setState(prev => ({ ...prev, hasAttemptedPlay: true }));
        handleVideoPlay();
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handleVideoPlaying);
    video.addEventListener('error', handleVideoError);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handleVideoPlaying);
      video.removeEventListener('error', handleVideoError);
    };
  }, [state.hasAttemptedPlay]);

  // Load video when in viewport
  useEffect(() => {
    if (typeof globalThis.window === 'undefined') return;

    const element = mediaContainerRef.current;
    if (!element) {
      setState(prev => ({ ...prev, shouldLoadVideo: true }));
      return;
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setState(prev => ({ ...prev, shouldLoadVideo: true }));
          observer.disconnect();
        }
      }, { threshold: 0.25 });

      observer.observe(element);
      return () => observer.disconnect();
    } else {
      setState(prev => ({ ...prev, shouldLoadVideo: true }));
    }
  }, []);

  return {
    videoRef,
    mediaContainerRef,
    state,
    handleVideoPlay
  };
};