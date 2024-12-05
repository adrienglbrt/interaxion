import { ProjectWithDirectLinks, VideoLinkObject } from "@/types/interfaces";
import { useMobile } from "@/utils/mobileContext";
import { AnimatePresence } from "framer-motion";
import Hls from "hls.js";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Wrapper from "../layout/wrapper";
import AnimatedUnderlineLink from "./animatedUnderlineLink";
import Loader from "./loader";

function getVideoLinkByRendition(
  videos: VideoLinkObject[],
  rendition: string
): string {
  const video = videos.find((video) => video.rendition === rendition);
  return video ? video.link : "";
}

export default function ShowcaseItem({
  project,
}: {
  project: ProjectWithDirectLinks;
}) {
  const { isMobile } = useMobile();
  const hasLoopVideo =
    project.videoDirectLinks &&
    project.videoDirectLinks?.linksLoop16by9 &&
    project.videoDirectLinks?.linksLoop9by16;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const videoSrc = useMemo(() => {
    if (!hasLoopVideo) return null;

    return {
      src16by9: getVideoLinkByRendition(
        project.videoDirectLinks?.linksLoop16by9 ?? [],
        "adaptive"
      ),
      src9by16: getVideoLinkByRendition(
        project.videoDirectLinks?.linksLoop9by16 ?? [],
        "adaptive"
      ),
    };
  }, [hasLoopVideo, project.videoDirectLinks]);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      const videoElement = videoRef.current;
      const src = isMobile ? videoSrc.src9by16 : videoSrc.src16by9;

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
  }, [videoSrc, isMobile]);

  return (
    <li className='relative h-[100svh] w-full snap-start snap-always'>
      {hasLoopVideo && videoSrc ? (
        <>
          <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
          <video
            ref={videoRef}
            key={isMobile ? "mobile" : "desktop"} // Force re-render when switching
            loop
            muted
            playsInline
            autoPlay
            preload='auto'
            className='absolute w-full h-full object-cover'
          >
            <source
              src={isMobile ? videoSrc.src9by16 : videoSrc.src16by9}
              type='video/mp4'
            />
            Your browser does not support the video tag.
          </video>
        </>
      ) : (
        project?.mainImage.image16by9 && (
          <Image
            src={project?.mainImage.image16by9}
            alt={project?.mainImage.alt ?? project.title}
            fill
            sizes='100vw'
            className='object-cover'
          />
        )
      )}
      <Wrapper>
        <div className='h-full w-full flex items-center justify-start'>
          <div>
            <h2 className='flex flex-col gap-2 font-serif tracking-wider mix-blend-difference text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl'>
              <span>{project.brand}</span>
              <span>{project.title}</span>
            </h2>
            <div className='pt-10'>
              <AnimatedUnderlineLink
                href={`/work/${project?._sys.filename}`}
                className='mix-blend-difference text-white'
              >
                View project
              </AnimatedUnderlineLink>
            </div>
          </div>
        </div>
      </Wrapper>
    </li>
  );
}
