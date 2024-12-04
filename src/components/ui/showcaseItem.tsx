import { ProjectWithDirectLinks, VideoLinkObject } from "@/types/interfaces";
import { useMobile } from "@/utils/mobileContext";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Wrapper from "../layout/wrapper";

// Possible values for rendition: 240p, 360p, 540p, 720p, 1080p, adaptive
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

  const videoSrc = useMemo(() => {
    if (!hasLoopVideo) return null;

    return {
      src16by9: getVideoLinkByRendition(
        project.videoDirectLinks?.linksLoop16by9 ?? [],
        "720p"
      ),
      src9by16: getVideoLinkByRendition(
        project.videoDirectLinks?.linksLoop9by16 ?? [],
        "720p"
      ),
    };
  }, [hasLoopVideo, project.videoDirectLinks]);

  return (
    <li className='relative h-[100svh] w-full snap-start snap-always'>
      {hasLoopVideo && videoSrc ? (
        <video
          key={isMobile ? "mobile" : "desktop"} // Force re-render when switching
          loop
          muted
          playsInline
          autoPlay
          className='absolute w-full h-full object-cover'
          poster={project.mainImage.image16by9}
        >
          <source
            src={isMobile ? videoSrc.src9by16 : videoSrc.src16by9}
            type='video/mp4'
          />
        </video>
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
          <Link href={`/work/${project?._sys.filename}`} scroll={false}>
            <h2 className='flex flex-col gap-2 font-serif mix-blend-difference text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl'>
              <span>{project.brand}</span>
              <span>{project.title}</span>
            </h2>
          </Link>
        </div>
      </Wrapper>
    </li>
  );
}
