import { AnimatePresence } from "framer-motion";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import Loader from "./loader";

export default function VideoLoop({
  videoSrc,
  isPortrait,
}: {
  videoSrc: { src16by9: string; src9by16: string };
  isPortrait: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      const videoElement = videoRef.current;
      const src = isPortrait ? videoSrc.src9by16 : videoSrc.src16by9;

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

      if (Hls.isSupported() && src) {
        const hls = new Hls();

        // Reset loading state on any critical errors
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.error("Fatal HLS error:", data);
            setIsLoading(false);
          }
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // Prepare for playback
          hls.startLoad();
        });

        hls.loadSource(src);
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
        videoElement.src = src;

        // Multiple event listeners for robust loading state
        videoElement.addEventListener("canplay", handleVideoReady);
        videoElement.addEventListener("play", handleVideoReady);

        videoElement.addEventListener("error", () => {
          console.error("Video load error");
          setIsLoading(false);
        });

        return () => {
          videoElement.removeEventListener("canplay", handleVideoReady);
          videoElement.removeEventListener("play", handleVideoReady);
        };
      }
    }
  }, [videoSrc, isPortrait]);
  return (
    <div className='z-10'>
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        autoPlay
        preload='auto'
        className='absolute w-full h-full object-cover'
      >
        <source
          src={isPortrait ? videoSrc.src9by16 : videoSrc.src16by9}
          type='video/mp4'
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
