import { AnimatePresence } from "framer-motion";
import Hls from "hls.js";
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Volume2,
  VolumeOff,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Loader from "./loader";

// Extend the HTMLVideoElement interface to include webkit-specific methods
interface ExtendedHTMLVideoElement extends HTMLVideoElement {
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
}

// Extend the Document interface to include webkit-specific properties
interface ExtendedDocument extends Document {
  webkitFullscreenElement?: Element | null;
}

export default function VideoMainPlayer({
  mainVideoSrc,
  onClose,
}: {
  mainVideoSrc: string;
  onClose: () => void;
}) {
  const videoRef = useRef<ExtendedHTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (videoRef.current && mainVideoSrc) {
      const videoElement = videoRef.current;

      // Reset loading state
      setIsLoading(true);

      // Function to handle successful video load
      const handleVideoReady = () => {
        setIsLoading(false);
        videoElement.play().catch((error) => {
          console.error("Autoplay prevented or failed:", error);
          setIsLoading(false);
        });
      };

      if (Hls.isSupported()) {
        const hls = new Hls();

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.error("Fatal HLS error:", data);
            setIsLoading(false);
          }
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoElement.play().catch((error) => {
            console.error("Autoplay failed:", error);
            setIsLoading(false);
          });
        });

        hls.loadSource(mainVideoSrc);
        hls.attachMedia(videoElement);

        // Listen for when video is ready to play
        videoElement.addEventListener("canplay", handleVideoReady);

        // Listen for play event to ensure loader disappears
        videoElement.addEventListener("play", handleVideoReady);

        return () => {
          hls.destroy();
          videoElement.removeEventListener("canplay", handleVideoReady);
          videoElement.removeEventListener("play", handleVideoReady);
        };
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = mainVideoSrc;

        videoElement.addEventListener("canplay", handleVideoReady);
        videoElement.addEventListener("play", handleVideoReady);

        videoElement.play().catch((error) => {
          console.error("Autoplay failed:", error);
          setIsLoading(false);
        });

        return () => {
          videoElement.removeEventListener("canplay", handleVideoReady);
          videoElement.removeEventListener("play", handleVideoReady);
        };
      }
    }
  }, [mainVideoSrc]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime =
        (parseFloat(event.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleFullscreen = async () => {
    const videoElement = videoRef.current;
    const containerElement = containerRef.current;

    if (!videoElement || !containerElement) return;

    try {
      if (videoElement.webkitEnterFullscreen) {
        // iOS-specific handling
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else {
          videoElement.webkitEnterFullscreen();
        }
      } else {
        // Standard fullscreen API
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else {
          await containerElement.requestFullscreen();
        }
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const extendedDocument = document as ExtendedDocument;
      setIsFullscreen(
        !!document.fullscreenElement ||
          !!(
            videoRef.current &&
            extendedDocument.webkitFullscreenElement === videoRef.current
          )
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    const hideControls = () => {
      setControlsVisible(false);
    };

    const resetTimer = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      setControlsVisible(true);
      timeoutRef.current = window.setTimeout(hideControls, 3000);
    };

    const handleInteraction = () => {
      resetTimer();
    };

    document.addEventListener("mousemove", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    resetTimer();

    return () => {
      document.removeEventListener("mousemove", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className='relative w-full h-full bg-[#000000]' ref={containerRef}>
      <div onClick={togglePlay}>
        <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
        <video
          ref={videoRef}
          loop
          muted={isMuted}
          playsInline
          autoPlay
          preload='auto'
          className='absolute w-full h-full object-contain sm:object-cover'
          onTimeUpdate={handleProgress}
        >
          <source src={mainVideoSrc} type='application/vnd.apple.mpegurl' />
          <source src={mainVideoSrc} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
      <div
        className={`absolute bottom-4 left-4 right-4 flex items-center space-x-4 bg-black bg-opacity-20 p-4 rounded-lg transition-opacity duration-300 ${
          controlsVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={togglePlay}
          className='hover:opacity-70 transition-all duration-300'
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause strokeWidth={0} fill='white' />
          ) : (
            <Play strokeWidth={0} fill='white' />
          )}
        </button>
        <input
          type='range'
          min='0'
          max='100'
          value={progress}
          onChange={handleSeek}
          className='flex-1 h-1 sm:h-[2px] appearance-none bg-grey cursor-pointer'
          style={{
            background: `linear-gradient(to right, white ${progress}%, #585858 ${progress}%)`,
          }}
        />
        <button
          onClick={toggleMute}
          className='px-2 text-white hover:opacity-70 transition-all duration-300'
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <Volume2 strokeWidth={1.5} />
          ) : (
            <VolumeOff strokeWidth={1.5} />
          )}
        </button>
        <button
          onClick={toggleFullscreen}
          className='px-2 text-white hover:opacity-70 transition-all duration-300'
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 strokeWidth={1.5} />
          ) : (
            <Maximize2 strokeWidth={1.5} />
          )}
        </button>
      </div>

      <button
        onClick={onClose}
        className={`absolute top-8 right-4 text-white hover:opacity-70 px-4 transition-opacity duration-300 ${
          controlsVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-label='Close video'
      >
        Close
      </button>
    </div>
  );
}
