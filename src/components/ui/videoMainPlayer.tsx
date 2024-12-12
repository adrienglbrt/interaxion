import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

export default function VideoMainPlayer({
  mainVideoSrc,
  onClose,
}: {
  mainVideoSrc: string;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (videoRef.current && mainVideoSrc) {
      const videoElement = videoRef.current;

      if (Hls.isSupported()) {
        const hls = new Hls();

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.error("Fatal HLS error:", data);
          }
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("HLS manifest parsed, ready to play");
          videoElement
            .play()
            .catch((error) => console.error("Autoplay failed:", error));
        });

        hls.loadSource(mainVideoSrc);
        hls.attachMedia(videoElement);

        return () => {
          hls.destroy();
        };
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = mainVideoSrc;
        videoElement
          .play()
          .catch((error) => console.error("Autoplay failed:", error));
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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const styles = `
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
  }
  input[type="range"]::-moz-range-thumb {
    width: 0;
    height: 0;
    border: none;
  }
`;

  return (
    <div className='relative w-full h-full' ref={containerRef}>
      <div onClick={togglePlay}>
        <video
          ref={videoRef}
          loop
          muted={isMuted}
          playsInline
          autoPlay
          preload='auto'
          className='absolute w-full h-full object-contain'
          onTimeUpdate={handleProgress}
        >
          <source src={mainVideoSrc} type='application/vnd.apple.mpegurl' />
          <source src={mainVideoSrc} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
      <style>{styles}</style>
      <div className='absolute bottom-4 left-4 right-4 flex items-center space-x-4 bg-transparent p-2 rounded'>
        <button
          onClick={togglePlay}
          className='text-white bg-black bg-opacity-25 hover:bg-opacity-50 p-2 rounded focus:outline-none transition-all duration-300'
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <input
          type='range'
          min='0'
          max='100'
          value={progress}
          onChange={handleSeek}
          className='flex-1 h-[2px] appearance-none bg-grey outline-none'
          style={{
            background: `linear-gradient(to right, white ${progress}%, #585858 ${progress}%)`,
          }}
        />
        <button
          onClick={toggleMute}
          className='text-white bg-black bg-opacity-25 hover:bg-opacity-50 p-2 rounded focus:outline-none transition-all duration-300'
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <button
          onClick={toggleFullscreen}
          className='text-white bg-black bg-opacity-25 hover:bg-opacity-50 p-2 rounded focus:outline-none transition-all duration-300'
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>

      <button
        onClick={onClose}
        className='absolute top-4 right-4 text-white bg-black bg-opacity-25 hover:bg-opacity-50 px-4 py-2 rounded-full focus:outline-none transition-all duration-300'
        aria-label='Close video'
      >
        Close
      </button>
    </div>
  );
}
