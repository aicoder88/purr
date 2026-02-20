"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface VideoPlayerState {
  showReplayButton: boolean;
  showPoster: boolean;
  shouldLoadVideo: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
}

export const useVideoPlayer = (dependencies: any[] = []) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const hasEndedRef = useRef(false);

  const [state, setState] = useState<VideoPlayerState>({
    showReplayButton: false,
    showPoster: true,
    shouldLoadVideo: false,
    isPlaying: false,
    isMuted: true, // Default to muted for autoplay
    volume: 1, // Default volume 100%
  });

  // Play video
  const play = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      hasEndedRef.current = false;
      setState(prev => ({ ...prev, isPlaying: true, showReplayButton: false, showPoster: false }));
    } catch {
      // Autoplay blocked - show controls
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  // Pause video
  const pause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      play();
    } else {
      pause();
    }
  }, [play, pause]);

  // Replay from beginning
  const replay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    hasEndedRef.current = false;
    play();
  }, [play]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const newMutedState = !video.muted;
    video.muted = newMutedState;

    // If unmuting, ensure volume is up
    if (!newMutedState && video.volume === 0) {
      video.volume = 1;
    }

    setState(prev => ({
      ...prev,
      isMuted: newMutedState,
      volume: newMutedState ? 0 : (video.volume || 1)
    }));
  }, []);

  // Handle volume change
  const handleVolumeChange = useCallback((newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    video.muted = newVolume === 0;

    setState(prev => ({
      ...prev,
      volume: newVolume,
      isMuted: newVolume === 0
    }));
  }, []);

  // Detect video near end and pause (to prevent auto-loop)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlaying = () => {
      setState(prev => ({ ...prev, showPoster: false, isPlaying: true, showReplayButton: false }));
    };

    const handlePause = () => {
      setState(prev => ({ ...prev, isPlaying: false }));
    };

    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.shouldLoadVideo, JSON.stringify(dependencies)]);

  // Auto-play when video can play (muted)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !state.shouldLoadVideo) return;

    const attemptPlay = () => {
      // Auto-play muted
      video.muted = true;
      play();
    };

    if (video.readyState >= 3) {
      attemptPlay();
    } else {
      video.addEventListener('canplay', attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', attemptPlay);
    };
  }, [state.shouldLoadVideo, play]);

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
    play,
    pause,
    togglePlayPause,
    replay,
    toggleMute,
    handleVolumeChange
  };
};