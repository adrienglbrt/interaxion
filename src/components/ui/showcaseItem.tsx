import { ProjectWithLoopLinks } from "@/types/video";
import { useMobile } from "@/utils/mobileContext";
import { getVideoLinkByRendition } from "@/utils/vimeoQueries";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Wrapper from "../layout/wrapper";
import AnimatedText from "./animatedText";
import VideoLoop from "./videoLoop";

export default function ShowcaseItem({
  project,
  activeSlide,
  index,
}: {
  project: ProjectWithLoopLinks;
  activeSlide: number;
  index: number;
}) {
  const { isMobile } = useMobile();
  const hasLoopVideo =
    project.videoDirectLinks &&
    project.videoDirectLinks?.loop16by9Links &&
    project.videoDirectLinks?.loop9by16Links;

  const videoSrc = useMemo(() => {
    if (!hasLoopVideo) return null;

    return {
      src16by9: getVideoLinkByRendition(
        project.videoDirectLinks?.loop16by9Links ?? [],
        "adaptive"
      ),
      src9by16: getVideoLinkByRendition(
        project.videoDirectLinks?.loop9by16Links ?? [],
        "adaptive"
      ),
    };
  }, [hasLoopVideo, project.videoDirectLinks]);

  return (
    <li
      className='relative h-[100svh] w-full snap-start snap-always showcase-item'
      data-index={index}
    >
      {hasLoopVideo && videoSrc ? (
        <VideoLoop
          videoSrc={videoSrc}
          isPortrait={isMobile}
          fallbackImage={project?.mainImage.image16by9}
        />
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
        <div className='relative h-full w-full flex items-center justify-start'>
          <Link
            href={`/work/${project?._sys.filename}`}
            className='absolute inset-0'
            aria-label={`View ${project.title}`}
          />
          <h2 className='flex flex-col gap-2 font-serif tracking-wider mix-blend-difference text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl hover:opacity-70 transition-opacity duration-500 cursor-pointer'>
            <AnimatedText
              text={project.brand}
              isVisible={activeSlide === index}
            />
            <AnimatedText
              text={project.title}
              isVisible={activeSlide === index}
            />
          </h2>
        </div>
      </Wrapper>
    </li>
  );
}
