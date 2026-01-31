"use client";

import { useState, useEffect, useRef } from 'react';

interface VideoPlayerState {
  showPlayButton: boolean;
  showPoster: boolean;
  shouldLoadVideo: boolean;
  hasAttemptedPlay: boolean;
  isMuted: boolean;
  volume: number;
}

export const useVideoPlayer = (dependencies: any[] = []) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<VideoPlayerState>({
    showPlayButton: false,
    showPoster: true,
    shouldLoadVideo: false,
    hasAttemptedPlay: false,
    isMuted: true, // Default to muted for autoplay
    volume: 1, // Default volume 100%
  });

  const handleVideoPlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setState(prev => ({ ...prev, showPlayButton: false }));
    } catch (err) {
      // Video autoplay prevented by browser, show manual play button
      setState(prev => ({ ...prev, showPlayButton: true }));
    }
  };

  const handleVideoPlaying = () => {
    setState(prev => ({ ...prev, showPoster: false }));
  };

  const handleVideoError = () => {
    setState(prev => ({ ...prev, showPlayButton: true }));
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMutedState = !state.isMuted;
    video.muted = newMutedState;

    // If unmuting, ensure volume is up
    if (!newMutedState && video.volume === 0) {
      video.volume = 1;
    }

    setState(prev => ({
      ...prev,
      isMuted: newMutedState,
      volume: newMutedState ? 0 : (prev.volume || 1)
    }));
  };

  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    video.muted = newVolume === 0;

    setState(prev => ({
      ...prev,
      volume: newVolume,
      isMuted: newVolume === 0
    }));
  };

  // Setup video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      // Restore state to video element
      video.muted = state.isMuted;
      video.volume = state.volume;

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
  }, [state.hasAttemptedPlay, state.shouldLoadVideo, ...dependencies]);

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

  const handleVideoEnded = () => {
    setState(prev => ({ ...prev, showPlayButton: true }));
  };

  return {
    videoRef,
    mediaContainerRef,
    state,
    handleVideoPlay,
    handleVideoEnded,
    toggleMute,
    handleVolumeChange
  };
};