import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  description?: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export function VideoPlayer({
  src,
  poster,
  title,
  description,
  autoPlay = false,
  muted = true,
  controls = true,
  className,
  onPlay,
  onPause,
  onEnded
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoading(false);
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [onPlay, onPause, onEnded]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const restart = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play();
  };

  if (hasError) {
    return (
      <div className={cn(
        'relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden',
        className
      )}>
        <div className="aspect-video flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 dark:text-red-400 mb-2">❌</div>
            <p className="text-gray-600 dark:text-gray-300">Failed to load video</p>
            <button
              onClick={handleReload}
              className="mt-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'relative bg-black rounded-lg overflow-hidden group',
      className
    )}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full aspect-video object-cover"
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        playsInline
        preload="metadata"
        aria-label={title}
      >
        <source src={src} type="video/mp4" />
        <p className="text-white dark:text-gray-100">
          Your browser does not support the video tag.
        </p>
      </video>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white dark:border-gray-100 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Play Button Overlay */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
          <button
            onClick={togglePlay}
            className="w-16 h-16 bg-white/90 dark:bg-gray-100/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-50 transition-colors shadow-lg"
            aria-label="Play video"
          >
            <Play className="w-8 h-8 text-gray-900 dark:text-gray-800 ml-1" />
          </button>
        </div>
      )}

      {/* Custom Controls */}
      {controls && !isLoading && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Progress Bar */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={togglePlay}
                className="text-white dark:text-gray-100 hover:text-gray-300 dark:hover:text-gray-300 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>

              <button
                onClick={restart}
                className="text-white dark:text-gray-100 hover:text-gray-300 dark:hover:text-gray-300 transition-colors"
                aria-label="Restart video"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={toggleMute}
                className="text-white dark:text-gray-100 hover:text-gray-300 dark:hover:text-gray-300 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <span className="text-white dark:text-gray-100 text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <button
              onClick={toggleFullscreen}
              className="text-white dark:text-gray-100 hover:text-gray-300 dark:hover:text-gray-300 transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Video Info */}
      {(title || description) && (
        <div className="absolute top-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/60 rounded-lg p-3 backdrop-blur-sm">
            {title && (
              <h3 className="text-white dark:text-gray-100 font-semibold text-lg mb-1">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-white/90 dark:text-gray-200 text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Accessibility Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          border: 2px solid #000;
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          border: 2px solid #000;
        }
      `}</style>
    </div>
  );
}

// Video Gallery Component for multiple videos
interface VideoGalleryProps {
  videos: Array<{
    id: string;
    src: string;
    poster?: string;
    title: string;
    description?: string;
    category?: string;
  }>;
  className?: string;
}

export function VideoGallery({ videos, className }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [filter, setFilter] = useState<string>('all');

  const handleFilterChange = useCallback((category: string) => {
    setFilter(category);
  }, []);

  const handleVideoSelect = useCallback((video: any) => {
    setSelectedVideo(video);
  }, []);

  const categories = ['all', ...new Set(videos.map(v => v.category).filter(Boolean))] as string[];
  const filteredVideos = filter === 'all'
    ? videos
    : videos.filter(v => v.category === filter);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                filter === category
                  ? 'bg-blue-600 text-white dark:text-gray-100'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
            >
              {category === 'all' ? 'All Videos' : category}
            </button>
          ))}
        </div>
      )}

      {/* Main Video Player */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VideoPlayer
            src={selectedVideo.src}
            poster={selectedVideo.poster}
            title={selectedVideo.title}
            description={selectedVideo.description}
            className="w-full"
          />
        </div>

        {/* Video List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredVideos.map(video => (
            <div
              key={video.id}
              onClick={() => handleVideoSelect(video)}
              className={cn(
                'flex space-x-3 p-3 rounded-lg cursor-pointer transition-colors',
                selectedVideo.id === video.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700'
                  : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
            >
              {video.poster && (
                <img
                  src={video.poster}
                  alt={video.title}
                  className="w-16 h-12 object-cover rounded flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 dark:text-gray-50 text-sm line-clamp-2">
                  {video.title}
                </h4>
                {video.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-xs mt-1 line-clamp-2">
                    {video.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}