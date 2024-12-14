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
          className='absolute w-full h-full object-contain sm:object-cover'
          onTimeUpdate={handleProgress}
        >
          <source src={mainVideoSrc} type='application/vnd.apple.mpegurl' />
          <source src={mainVideoSrc} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className='absolute bottom-4 left-4 right-4 flex items-center space-x-4 bg-black bg-opacity-20 p-4 rounded-lg'>
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
        className='absolute top-4 right-4 text-white hover:opacity-70 px-4 transition-all duration-300'
        aria-label='Close video'
      >
        Close
      </button>
    </div>
  );
}
