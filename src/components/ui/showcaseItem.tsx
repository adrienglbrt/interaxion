import { ProjectWithDirectLinks, VideoLinkObject } from "@/types/interfaces";
import { useMobile } from "@/utils/mobileContext";
import Hls from "hls.js";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Wrapper from "../layout/wrapper";
import AnimatedUnderlineLink from "./animatedUnderlineLink";

// Possible values for rendition: 240p, 360p, 540p, 720p, 1080p, adaptive.
// Note: The current code only supports adaptive rendition. To support mp4 there must be some bypass of the useEffect below
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
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

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

      if (Hls.isSupported() && src) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoElement);
        return () => hls.destroy();
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = src;
      }
    }
  }, [videoSrc, isMobile]);

  useEffect(() => {
    if (project.mainImage.image16by9 && hasLoopVideo) {
      const imgUrl = project.mainImage.image16by9;
      const width = 640;
      const quality = 40;
      setPosterUrl(
        `/_next/image?url=${encodeURIComponent(imgUrl)}&w=${width}&q=${quality}`
      );
    }
  }, [project.mainImage.image16by9, hasLoopVideo]);

  return (
    <li className='relative h-[100svh] w-full snap-start snap-always'>
      {hasLoopVideo && videoSrc ? (
        <>
          <video
            ref={videoRef}
            key={isMobile ? "mobile" : "desktop"} // Force re-render when switching
            loop
            muted
            playsInline
            autoPlay
            preload='auto'
            className='absolute w-full h-full object-cover'
            poster={posterUrl || undefined}
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
